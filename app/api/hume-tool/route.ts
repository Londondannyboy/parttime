import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

/**
 * Hume EVI Tool Endpoint
 *
 * This endpoint is called by Hume when the voice assistant needs to:
 * - Get user profile information
 * - Search for jobs
 * - Get user skills
 * - Save user preferences
 *
 * The user_id is passed as a session variable when connecting to Hume.
 */

interface HumeToolRequest {
  type: string
  tool_type: string
  tool_call_id: string
  name: string
  parameters: string // JSON string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('[Hume Tool] Received:', JSON.stringify(body, null, 2))

    // Handle tool calls
    if (body.type === 'tool_call' || body.name) {
      const toolName = body.name || body.tool_name
      const params = typeof body.parameters === 'string'
        ? JSON.parse(body.parameters)
        : body.parameters || {}

      console.log(`[Hume Tool] Executing: ${toolName}`, params)

      let result: string

      switch (toolName) {
        case 'get_user_profile':
          result = await getUserProfile(params.user_id)
          break

        case 'get_user_skills':
          result = await getUserSkills(params.user_id)
          break

        case 'search_jobs':
          result = await searchJobs(params)
          break

        case 'save_user_preference':
          result = await saveUserPreference(params)
          break

        case 'get_job_details':
          result = await getJobDetails(params.job_id)
          break

        default:
          result = `Unknown tool: ${toolName}`
      }

      console.log(`[Hume Tool] Result for ${toolName}:`, result.substring(0, 200))

      // Return in Hume's expected format
      return NextResponse.json({
        type: 'tool_response',
        tool_call_id: body.tool_call_id || 'unknown',
        content: result
      })
    }

    // If not a tool call, return error
    return NextResponse.json(
      { error: 'Invalid request - expected tool_call' },
      { status: 400 }
    )
  } catch (error) {
    console.error('[Hume Tool] Error:', error)
    return NextResponse.json(
      {
        type: 'tool_response',
        tool_call_id: 'error',
        content: `Error processing request: ${error}`
      },
      { status: 500 }
    )
  }
}

// ============ Tool Implementations ============

async function getUserProfile(userId: string): Promise<string> {
  if (!userId) {
    return "No user ID provided. The user may not be logged in."
  }

  try {
    const results = await sql`
      SELECT
        first_name,
        last_name,
        email,
        current_country,
        destination_countries,
        budget_monthly,
        timeline,
        relocation_motivation as interests
      FROM users
      WHERE neon_auth_id = ${userId}
      LIMIT 1
    `

    if (results.length === 0) {
      return "No profile found for this user. They appear to be new."
    }

    const p = results[0]
    const parts = []

    if (p.first_name) parts.push(`Name: ${p.first_name} ${p.last_name || ''}`.trim())
    if (p.current_country) parts.push(`Location: ${p.current_country}`)
    if (p.interests) parts.push(`Interests: ${p.interests}`)
    if (p.timeline) parts.push(`Timeline: ${p.timeline}`)
    if (p.budget_monthly) parts.push(`Budget: £${p.budget_monthly}/day`)
    if (p.destination_countries) {
      const countries = Array.isArray(p.destination_countries)
        ? p.destination_countries.join(', ')
        : p.destination_countries
      parts.push(`Interested locations: ${countries}`)
    }

    return parts.length > 0
      ? parts.join('. ')
      : "Profile exists but has no details filled in yet."
  } catch (error) {
    console.error('[getUserProfile] Error:', error)
    return "Unable to fetch profile at this time."
  }
}

async function getUserSkills(userId: string): Promise<string> {
  if (!userId) {
    return "No user ID provided."
  }

  try {
    // First get the internal user ID
    const userResult = await sql`
      SELECT id FROM users WHERE neon_auth_id = ${userId} LIMIT 1
    `

    if (userResult.length === 0) {
      return "User not found."
    }

    const internalId = userResult[0].id

    const skills = await sql`
      SELECT skill_name, skill_level, years_experience
      FROM user_skills
      WHERE user_id = ${internalId}
      ORDER BY years_experience DESC NULLS LAST
      LIMIT 10
    `

    if (skills.length === 0) {
      return "No skills recorded yet. Ask them about their professional expertise."
    }

    const skillList = skills.map(s => {
      let desc = s.skill_name
      if (s.years_experience) desc += ` (${s.years_experience} years)`
      if (s.skill_level) desc += ` - ${s.skill_level}`
      return desc
    }).join(', ')

    return `Skills: ${skillList}`
  } catch (error) {
    console.error('[getUserSkills] Error:', error)
    return "Unable to fetch skills at this time."
  }
}

async function searchJobs(params: {
  role_type?: string
  location?: string
  remote?: boolean
  limit?: number
}): Promise<string> {
  try {
    const rolePattern = params.role_type ? `%${params.role_type}%` : '%'
    const locationPattern = params.location ? `%${params.location}%` : '%'
    const limit = params.limit || 5

    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, is_remote,
        salary_min, salary_max, salary_currency
      FROM jobs
      WHERE is_active = true
        AND (is_fractional = true OR LOWER(title) LIKE '%fractional%')
        AND LOWER(title) LIKE LOWER(${rolePattern})
        AND LOWER(COALESCE(location, '')) LIKE LOWER(${locationPattern})
      ORDER BY posted_date DESC NULLS LAST
      LIMIT ${limit}
    `

    if (jobs.length === 0) {
      const roleText = params.role_type ? `${params.role_type} ` : ''
      const locationText = params.location ? ` in ${params.location}` : ''
      return `No ${roleText}fractional roles found${locationText} currently. Try a broader search.`
    }

    const jobDescriptions = jobs.map(j => {
      let desc = `${j.title} at ${j.company_name}`
      if (j.location) desc += `, ${j.location}`
      if (j.is_remote) desc += ' (Remote)'
      if (j.salary_min || j.salary_max) {
        const symbol = j.salary_currency === 'USD' ? '$' : '£'
        if (j.salary_min && j.salary_max) {
          desc += ` - ${symbol}${j.salary_min}-${j.salary_max}/day`
        }
      }
      // Add link to job (using slug for SEO-friendly URLs)
      if (j.slug) desc += ` - View at fractional.quest/job/${j.slug}`
      return desc
    }).join('. ')

    return `Found ${jobs.length} roles: ${jobDescriptions}`
  } catch (error) {
    console.error('[searchJobs] Error:', error)
    return "Unable to search jobs at this time."
  }
}

async function saveUserPreference(params: {
  user_id: string
  field: string
  value: string
}): Promise<string> {
  if (!params.user_id) {
    return "Cannot save - no user ID provided."
  }

  const allowedFields = ['interests', 'timeline', 'budget_monthly', 'current_country']

  if (!allowedFields.includes(params.field)) {
    return `Cannot update ${params.field}. Allowed fields: ${allowedFields.join(', ')}`
  }

  try {
    // Update specific field based on whitelisted name
    switch (params.field) {
      case 'interests':
        await sql`UPDATE users SET relocation_motivation = ${params.value} WHERE neon_auth_id = ${params.user_id}`
        break
      case 'timeline':
        await sql`UPDATE users SET timeline = ${params.value} WHERE neon_auth_id = ${params.user_id}`
        break
      case 'budget_monthly':
        await sql`UPDATE users SET budget_monthly = ${params.value} WHERE neon_auth_id = ${params.user_id}`
        break
      case 'current_country':
        await sql`UPDATE users SET current_country = ${params.value} WHERE neon_auth_id = ${params.user_id}`
        break
    }

    return `Saved ${params.field}: ${params.value}`
  } catch (error) {
    console.error('[saveUserPreference] Error:', error)
    return "Unable to save preference at this time."
  }
}

async function getJobDetails(jobId: string): Promise<string> {
  if (!jobId) {
    return "No job ID provided."
  }

  try {
    const results = await sql`
      SELECT
        title, company_name, location, is_remote,
        salary_min, salary_max, salary_currency,
        description, requirements, url
      FROM jobs
      WHERE id = ${jobId}
      LIMIT 1
    `

    if (results.length === 0) {
      return "Job not found."
    }

    const j = results[0]
    let desc = `${j.title} at ${j.company_name}. `
    if (j.location) desc += `Location: ${j.location}. `
    if (j.is_remote) desc += `Remote work available. `
    if (j.salary_min || j.salary_max) {
      const symbol = j.salary_currency === 'USD' ? '$' : '£'
      desc += `Salary: ${symbol}${j.salary_min || '?'}-${j.salary_max || '?'}/day. `
    }
    if (j.description) {
      // Truncate for voice
      const shortDesc = j.description.substring(0, 300)
      desc += `Description: ${shortDesc}...`
    }

    return desc
  } catch (error) {
    console.error('[getJobDetails] Error:', error)
    return "Unable to fetch job details at this time."
  }
}

// Also support GET for testing
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    tools: [
      'get_user_profile',
      'get_user_skills',
      'search_jobs',
      'save_user_preference',
      'get_job_details'
    ],
    usage: 'POST tool calls from Hume EVI'
  })
}
