import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { CompanyLogoLarge } from '@/components/CompanyLogo'

export const revalidate = 3600 // Revalidate every hour

interface CompanyPageProps {
  params: Promise<{ domain: string }>
}

interface BrandColor {
  hex: string
  type: string
  brightness: number
}

interface BrandData {
  colors: BrandColor[]
  logos: Record<string, string>
  description: string | null
  founded: number | null
  employees: number | null
  industries: string[] | null
  quality_score: string | null
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { domain } = await params
  const sql = createDbQuery()

  const [company] = await sql`
    SELECT DISTINCT company_name
    FROM jobs
    WHERE company_domain = ${domain} AND is_active = true
    LIMIT 1
  `

  if (!company) {
    return { title: 'Company Not Found' }
  }

  return {
    title: `${company.company_name} Jobs | Fractional.Quest`,
    description: `Browse fractional and part-time jobs at ${company.company_name}. Find executive roles, day rates, and flexible opportunities.`,
    openGraph: {
      title: `${company.company_name} - Fractional Jobs`,
      description: `Browse fractional and part-time jobs at ${company.company_name}`,
      type: 'website',
    },
  }
}

async function getCompanyData(domain: string) {
  const sql = createDbQuery()

  // Get all jobs for this company
  const jobs = await sql`
    SELECT
      id, slug, title, company_name, location, city, is_remote,
      workplace_type, compensation, role_category, seniority_level,
      skills_required, posted_date, description_snippet, company_domain
    FROM jobs
    WHERE company_domain = ${domain} AND is_active = true
    ORDER BY posted_date DESC NULLS LAST
  `

  if (jobs.length === 0) {
    return null
  }

  // Get brand data if available
  const [brandData] = await sql`
    SELECT colors, logos, description, founded, employees, industries, quality_score
    FROM company_brands
    WHERE domain = ${domain}
    LIMIT 1
  `

  // Get company stats
  const companyName = jobs[0].company_name
  const roleCategories = [...new Set(jobs.map((j: any) => j.role_category).filter(Boolean))]
  const locations = [...new Set(jobs.map((j: any) => j.city || j.location).filter(Boolean))]

  return {
    name: companyName,
    domain,
    jobs,
    stats: {
      totalJobs: jobs.length,
      roleCategories,
      locations,
    },
    brand: brandData as BrandData | undefined
  }
}

// Helper to get the best header color from brand colors
function getHeaderColors(brand?: BrandData) {
  if (!brand?.colors || brand.colors.length === 0) {
    return {
      backgroundColor: '#1f2937', // gray-800 fallback
      textColor: 'white',
      accentColor: '#a855f7' // purple-500
    }
  }

  // Find the dark color for background (prefer type 'dark' or lowest brightness)
  const darkColor = brand.colors.find(c => c.type === 'dark')
    || brand.colors.reduce((darkest, c) => c.brightness < darkest.brightness ? c : darkest)

  // Find accent color
  const accentColor = brand.colors.find(c => c.type === 'accent')?.hex || '#a855f7'

  // Determine text color based on background brightness
  const textColor = darkColor.brightness < 128 ? 'white' : '#1f2937'

  return {
    backgroundColor: darkColor.hex,
    textColor,
    accentColor
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { domain } = await params
  const company = await getCompanyData(domain)

  if (!company) {
    notFound()
  }

  const { backgroundColor, textColor, accentColor } = getHeaderColors(company.brand)
  const textOpacity = textColor === 'white' ? 'text-white/70' : 'text-gray-600'

  return (
    <div className="min-h-screen bg-white">
      {/* Company Header - Uses brand colors */}
      <section
        style={{ backgroundColor }}
        className="transition-colors"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <Link
            href="/fractional-jobs"
            className={`inline-flex items-center ${textOpacity} hover:opacity-100 mb-8 transition-colors text-sm`}
            style={{ color: textColor }}
          >
            <span className="mr-2">&larr;</span> Back to Jobs
          </Link>

          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <CompanyLogoLarge
              companyDomain={domain}
              companyName={company.name}
            />

            <div className="flex-1">
              <h1
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: textColor }}
              >
                {company.name}
              </h1>

              {/* Company description from brand data */}
              {company.brand?.description && (
                <p
                  className="text-lg mb-3 max-w-2xl"
                  style={{ color: textColor, opacity: 0.8 }}
                >
                  {company.brand.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-3">
                <span style={{ color: textColor, opacity: 0.7 }}>
                  {company.stats.totalJobs} open {company.stats.totalJobs === 1 ? 'position' : 'positions'}
                </span>

                {company.brand?.founded && (
                  <span style={{ color: textColor, opacity: 0.7 }}>
                    Founded {company.brand.founded}
                  </span>
                )}

                {company.brand?.employees && (
                  <span style={{ color: textColor, opacity: 0.7 }}>
                    {company.brand.employees.toLocaleString()}+ employees
                  </span>
                )}
              </div>

              {/* Industry tags */}
              {company.brand?.industries && company.brand.industries.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {company.brand.industries.slice(0, 3).map((industry: string) => (
                    <span
                      key={industry}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: accentColor,
                        color: 'white'
                      }}
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              )}

              {company.domain && (
                <a
                  href={`https://${company.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: accentColor }}
                >
                  {company.domain}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div
              className="backdrop-blur rounded-lg p-4"
              style={{ backgroundColor: `${textColor === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}
            >
              <div className="text-3xl font-bold" style={{ color: textColor }}>{company.stats.totalJobs}</div>
              <div style={{ color: textColor, opacity: 0.6 }} className="text-sm">Open Roles</div>
            </div>
            <div
              className="backdrop-blur rounded-lg p-4"
              style={{ backgroundColor: `${textColor === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}
            >
              <div className="text-3xl font-bold" style={{ color: textColor }}>{company.stats.roleCategories.length}</div>
              <div style={{ color: textColor, opacity: 0.6 }} className="text-sm">Departments</div>
            </div>
            <div
              className="backdrop-blur rounded-lg p-4"
              style={{ backgroundColor: `${textColor === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}
            >
              <div className="text-3xl font-bold" style={{ color: textColor }}>{company.stats.locations.length}</div>
              <div style={{ color: textColor, opacity: 0.6 }} className="text-sm">Locations</div>
            </div>
            <div
              className="backdrop-blur rounded-lg p-4"
              style={{ backgroundColor: `${textColor === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}
            >
              <div className="text-3xl font-bold flex items-center gap-1">
                <svg className="w-6 h-6" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={{ color: textColor, opacity: 0.6 }} className="text-sm">Verified Company</div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Tags */}
      {company.stats.roleCategories.length > 0 && (
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 mr-2">Hiring in:</span>
              {company.stats.roleCategories.map((category: string) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Jobs List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Open Positions at {company.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.jobs.map((job: any) => {
              const postedDate = job.posted_date ? new Date(job.posted_date) : null
              const postedDaysAgo = postedDate
                ? Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24))
                : undefined

              return (
                <Link key={job.id} href={`/fractional-job/${job.slug}`}>
                  <JobCard
                    title={job.title}
                    company={job.company_name}
                    location={job.location || 'Location TBD'}
                    isRemote={job.is_remote || job.workplace_type === 'Remote'}
                    compensation={job.compensation}
                    roleCategory={job.role_category}
                    skills={job.skills_required || []}
                    postedDaysAgo={postedDaysAgo}
                    companyDomain={job.company_domain}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in {company.name}?
          </h2>
          <p className="text-gray-600 mb-8">
            Set up job alerts to get notified when new positions open up.
          </p>
          <Link
            href="/handler/sign-up"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-all"
          >
            Create Job Alert
          </Link>
        </div>
      </section>
    </div>
  )
}
