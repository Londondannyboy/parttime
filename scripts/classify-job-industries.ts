/**
 * Classify jobs by industry using Pydantic AI Gateway
 * Run: npx tsx scripts/classify-job-industries.ts
 */

import { neon } from '@neondatabase/serverless'
import { z } from 'zod'

const sql = neon(process.env.DATABASE_URL!)
const GATEWAY_URL = process.env.GATEWAY_URL || 'https://gateway.pydantic.dev/proxy/chat/'
const GATEWAY_API_KEY = process.env.PYDANTIC_AI_GATEWAY_API_KEY

// Valid industry enum values from the database
const INDUSTRIES = [
  'Technology',
  'FinTech',
  'SaaS',
  'Healthcare',
  'E-commerce',
  'Professional Services',
  'Financial Services',
  'Manufacturing',
  'Retail',
  'Media',
  'Real Estate',
  'Education',
  'Energy',
  'Recruitment',
  'Other'
] as const

const IndustryClassification = z.object({
  industry: z.enum(INDUSTRIES),
  confidence: z.number().min(0).max(1),
  reasoning: z.string()
})

type IndustryClassification = z.infer<typeof IndustryClassification>

interface JobToClassify {
  id: string
  company_name: string
  title: string
  about_company: string | null
}

async function classifyIndustry(job: JobToClassify): Promise<IndustryClassification> {
  const prompt = `Classify this company into exactly ONE industry category.

Company: ${job.company_name}
Job Title: ${job.title}
About Company: ${job.about_company || 'Not provided'}

Industry categories (choose exactly one):
- Technology: Pure tech companies, software, hardware, IT services
- FinTech: Financial technology, payment processing, investment tech platforms
- SaaS: Software-as-a-service companies
- Healthcare: Medical, pharmaceutical, life sciences, health tech
- E-commerce: Online retail, marketplaces
- Professional Services: Consulting, legal, accounting, agencies, recruitment firms
- Financial Services: Banks, investment firms, insurance, fund managers
- Manufacturing: Physical goods production
- Retail: Physical or luxury goods retail
- Media: Advertising, marketing agencies, content production, entertainment
- Real Estate: Property, real estate services
- Education: Schools, training, EdTech, educational institutions
- Energy: Oil, gas, renewables, utilities
- Recruitment: Staffing agencies, executive search firms
- Other: Aviation, travel, hospitality, non-profits, etc.

Important guidance:
- Recruitment agencies and staffing firms → "Recruitment"
- Marketing/advertising agencies → "Media"
- Accountancy firms → "Professional Services"
- Colleges and training providers → "Education"
- Aviation/private jets → "Other"
- Crypto/blockchain finance → "FinTech"

Respond with JSON: {"industry": "CategoryName", "confidence": 0.0-1.0, "reasoning": "brief explanation"}`

  const response = await fetch(GATEWAY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GATEWAY_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'google-gla:gemini-1.5-flash',
      messages: [{
        role: 'user',
        content: prompt
      }],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content

  if (!text) {
    throw new Error('No response from AI')
  }

  return IndustryClassification.parse(JSON.parse(text))
}

async function main() {
  if (!GATEWAY_API_KEY) {
    console.error('PYDANTIC_AI_GATEWAY_API_KEY required')
    process.exit(1)
  }

  console.log('Fetching jobs to classify...')

  const jobs = await sql`
    SELECT id, company_name, title, about_company
    FROM jobs
    WHERE is_active = true
    ORDER BY company_name
  ` as JobToClassify[]

  console.log(`Found ${jobs.length} jobs to classify`)

  let updated = 0
  let errors = 0
  const stats: Record<string, number> = {}

  for (const job of jobs) {
    try {
      const classification = await classifyIndustry(job)

      // Update the job
      await sql`
        UPDATE jobs
        SET industry = ${classification.industry}
        WHERE id = ${job.id}
      `

      stats[classification.industry] = (stats[classification.industry] || 0) + 1
      updated++

      console.log(`✓ ${job.company_name}: ${classification.industry} (${(classification.confidence * 100).toFixed(0)}%)`)

      // Rate limiting - small delay between requests
      await new Promise(r => setTimeout(r, 100))

    } catch (error) {
      console.error(`✗ ${job.company_name}: ${error}`)
      errors++
    }
  }

  console.log('\n=== Classification Complete ===')
  console.log(`Updated: ${updated}`)
  console.log(`Errors: ${errors}`)
  console.log('\nDistribution:')
  Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([industry, count]) => {
      console.log(`  ${industry}: ${count}`)
    })
}

main().catch(console.error)
