import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { JobFilters } from '@/components/JobFilters'
import { JobsGraph } from '@/components/JobsGraph'
import { VideoHeroBackground } from '@/components/VideoHeroBackground'

// Same video as homepage
const HERO_VIDEO_PLAYBACK_ID: string | undefined = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

// Revalidate every 15 minutes for jobs
export const revalidate = 900

export const metadata: Metadata = {
  title: 'Fractional Jobs UK 2025 - Browse Executive & Part-Time C-Suite Roles',
  description: 'Browse 500+ fractional jobs in the UK. Find fractional CFO, CMO, CTO roles paying £600-£1,500/day. Part-time executive positions updated daily.',
  keywords: 'fractional jobs, fractional jobs uk, fractional executive jobs, part time executive jobs, fractional cfo jobs, fractional cmo jobs',
  openGraph: {
    title: 'Fractional Jobs UK - Browse Executive & Part-Time C-Suite Roles',
    description: 'Browse 500+ fractional jobs in the UK. Find fractional CFO, CMO, CTO roles paying £600-£1,500/day.',
    type: 'website',
  },
}

interface JobsPageProps {
  searchParams: {
    page?: string
    role?: string
    remote?: string
    location?: string
    industry?: string
  }
}

interface FilterOption {
  value: string
  label: string
}

// Static fractional role categories
const FRACTIONAL_ROLES: FilterOption[] = [
  { value: '', label: 'All Roles' },
  { value: 'CFO', label: 'Fractional CFO' },
  { value: 'CMO', label: 'Fractional CMO' },
  { value: 'CTO', label: 'Fractional CTO' },
  { value: 'COO', label: 'Fractional COO' },
  { value: 'Sales', label: 'Fractional Sales' },
  { value: 'HR', label: 'Fractional HR' },
  { value: 'Other', label: 'Other Roles' },
]

// Map database role_category values to fractional categories
const ROLE_CATEGORY_MAPPING: Record<string, string[]> = {
  'CFO': ['CFO', 'Finance Director', 'Finance Manager', 'Financial Controller', 'Head of Finance', 'Finance', 'Accounting/Auditing'],
  'CMO': ['CMO', 'Marketing Director', 'Marketing Manager', 'Advertising', 'Advertising Strategist'],
  'CTO': ['CTO', 'Head of AI', 'AI Director', 'Engineering and Information Technology', 'Software Engineering Coach'],
  'COO': ['COO', 'Managing Director', 'Programme Manager', 'Project Manager', 'Chief of Staff'],
  'Sales': ['Sales', 'Sales Director', 'Business Consultant', 'Client Success Manager'],
  'HR': ['HR', 'HR Director', 'People Director'],
  'Other': ['Other'],
}

// Fetch filter options from database
async function getFilterOptions(sql: any) {
  // Use static fractional role categories
  const roleOptions: FilterOption[] = FRACTIONAL_ROLES

  // Get workplace types
  const workTypeResults = await sql`
    SELECT DISTINCT workplace_type
    FROM jobs
    WHERE is_active = true AND workplace_type IS NOT NULL
    ORDER BY workplace_type
  `
  const workTypeOptions: FilterOption[] = [
    { value: '', label: 'All Work Types' },
    ...workTypeResults.map((w: any) => ({
      value: w.workplace_type.toLowerCase(),
      label: w.workplace_type
    }))
  ]

  // Get unique locations (simplified - extract city/region)
  const locationResults = await sql`
    SELECT location, COUNT(*) as count
    FROM jobs
    WHERE is_active = true AND location IS NOT NULL
    GROUP BY location
    ORDER BY count DESC
    LIMIT 15
  `

  // Static list of UK locations - comprehensive coverage
  const ukLocations = [
    'London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol',
    'Edinburgh', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield',
    'Nottingham', 'Cardiff', 'Belfast', 'Cambridge', 'Oxford',
    'Reading', 'Brighton', 'Southampton', 'Leicester', 'Coventry',
    'Remote'
  ]

  const locationOptions: FilterOption[] = [
    { value: '', label: 'All Locations' },
    ...ukLocations.map(loc => ({ value: loc, label: loc }))
  ]

  // Static list of industries
  const industries = [
    'Technology', 'FinTech', 'SaaS', 'Healthcare', 'E-commerce',
    'Professional Services', 'Financial Services', 'Manufacturing',
    'Retail', 'Media & Entertainment', 'Real Estate', 'Education',
    'Energy', 'Startups', 'Private Equity'
  ]

  const industryOptions: FilterOption[] = [
    { value: '', label: 'All Industries' },
    ...industries.map(ind => ({ value: ind, label: ind }))
  ]

  return { roleOptions, workTypeOptions, locationOptions, industryOptions }
}

function JobFiltersWrapper({
  currentRole,
  currentRemote,
  currentLocation,
  currentIndustry,
  totalJobs,
  roleOptions,
  locationOptions,
  workTypeOptions,
  industryOptions
}: {
  currentRole: string
  currentRemote: string
  currentLocation: string
  currentIndustry: string
  totalJobs: number
  roleOptions: FilterOption[]
  locationOptions: FilterOption[]
  workTypeOptions: FilterOption[]
  industryOptions: FilterOption[]
}) {
  return (
    <Suspense fallback={<div className="h-24 bg-gray-100 rounded-xl animate-pulse" />}>
      <JobFilters
        currentRole={currentRole}
        currentRemote={currentRemote}
        currentLocation={currentLocation}
        currentIndustry={currentIndustry}
        totalJobs={totalJobs}
        roleOptions={roleOptions}
        locationOptions={locationOptions}
        workTypeOptions={workTypeOptions}
        industryOptions={industryOptions}
      />
    </Suspense>
  )
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const limit = 20
  const page = parseInt(searchParams.page || '1')
  const offset = (page - 1) * limit

  // Get filter values
  const roleFilter = searchParams.role || ''
  const remoteFilter = searchParams.remote || ''
  const locationFilter = searchParams.location || ''
  const industryFilter = searchParams.industry || ''

  try {
    const sql = createDbQuery()

    // Get filter options from database
    const { roleOptions, workTypeOptions, locationOptions, industryOptions } = await getFilterOptions(sql)

    // Build dynamic WHERE clause
    let whereConditions = ['is_active = true']

    if (roleFilter && ROLE_CATEGORY_MAPPING[roleFilter]) {
      // Map the fractional role to all matching database categories
      const mappedCategories = ROLE_CATEGORY_MAPPING[roleFilter]
      const categoryConditions = mappedCategories.map(cat => `role_category = '${cat}'`).join(' OR ')
      whereConditions.push(`(${categoryConditions})`)
    }

    if (remoteFilter === 'remote') {
      whereConditions.push(`(is_remote = true OR workplace_type = 'Remote')`)
    } else if (remoteFilter === 'hybrid') {
      whereConditions.push(`workplace_type = 'Hybrid'`)
    } else if (remoteFilter === 'onsite') {
      whereConditions.push(`(is_remote = false AND workplace_type IS DISTINCT FROM 'Remote' AND workplace_type IS DISTINCT FROM 'Hybrid')`)
    }

    if (locationFilter) {
      whereConditions.push(`location ILIKE '%${locationFilter}%'`)
    }

    if (industryFilter) {
      // Match industry in company description, title, or skills
      whereConditions.push(`(
        description ILIKE '%${industryFilter}%' OR
        title ILIKE '%${industryFilter}%' OR
        company_name ILIKE '%${industryFilter}%'
      )`)
    }

    const whereClause = whereConditions.join(' AND ')

    // Fetch jobs from database
    const jobs = await sql`
      SELECT
        id,
        slug,
        title,
        company_name,
        location,
        is_remote,
        workplace_type,
        compensation,
        role_category,
        skills_required,
        posted_date,
        description_snippet
      FROM jobs
      WHERE ${sql.unsafe(whereClause)}
      ORDER BY posted_date DESC NULLS LAST
      LIMIT ${limit} OFFSET ${offset}
    `

    // Get total count for pagination
    const countResult = await sql`
      SELECT COUNT(*) as count
      FROM jobs
      WHERE ${sql.unsafe(whereClause)}
    `

    const total = parseInt((countResult[0] as any)?.count || '0')
    const totalPages = Math.ceil(total / limit)

    // Build pagination URL with filters
    const buildPageUrl = (pageNum: number) => {
      const params = new URLSearchParams()
      params.set('page', pageNum.toString())
      if (roleFilter) params.set('role', roleFilter)
      if (remoteFilter) params.set('remote', remoteFilter)
      if (locationFilter) params.set('location', locationFilter)
      if (industryFilter) params.set('industry', industryFilter)
      return `/fractional-jobs?${params.toString()}`
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section with Video Background */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden">
          <VideoHeroBackground
            playbackId={HERO_VIDEO_PLAYBACK_ID}
            fallbackGradient={true}
          />

          {/* Bottom-aligned content with glass panel */}
          <div className="relative z-10 w-full pb-12 md:pb-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/10 max-w-2xl">
                <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors text-sm tracking-wide">
                  <span className="mr-2">←</span> Back to Home
                </Link>

                <span className="inline-block bg-white/10 backdrop-blur text-white/90 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-4">
                  {total}+ Live Positions
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[0.95] tracking-tight">
                  Fractional Jobs UK
                </h1>

                <img
                  src="/logo.svg"
                  alt="Fractional Jobs UK - Browse executive and part-time C-suite positions"
                  className="hidden"
                  width={1}
                  height={1}
                />

                <p className="text-lg text-white/70 leading-relaxed">
                  CFO, CMO, CTO & specialist roles • £600-£1,500/day • Updated every 15 minutes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <JobFiltersWrapper
              currentRole={roleFilter}
              currentRemote={remoteFilter}
              currentLocation={locationFilter}
              currentIndustry={industryFilter}
              totalJobs={total}
              roleOptions={roleOptions}
              locationOptions={locationOptions}
              workTypeOptions={workTypeOptions}
              industryOptions={industryOptions}
            />
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {jobs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No jobs match your filters</h2>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                <Link href="/fractional-jobs">
                  <button className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-semibold transition-colors">
                    Clear All Filters
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 mb-12">
                  {jobs.map((job: any) => {
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
                        />
                      </Link>
                    )
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {page > 1 && (
                      <Link href={buildPageUrl(page - 1)}>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                          ← Previous
                        </button>
                      </Link>
                    )}

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        const pageNum = Math.max(1, page - 2) + i
                        if (pageNum > totalPages) return null

                        return (
                          <Link key={pageNum} href={buildPageUrl(pageNum)}>
                            <button
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                pageNum === page
                                  ? 'bg-purple-700 text-white'
                                  : 'bg-white border border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          </Link>
                        )
                      })}
                    </div>

                    {page < totalPages && (
                      <Link href={buildPageUrl(page + 1)}>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                          Next →
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Jobs Knowledge Graph Section */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">Visualize</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Jobs Knowledge Graph</h2>
              <p className="text-lg text-gray-500">
                Explore relationships between jobs, skills, and companies
              </p>
            </div>
            <Suspense fallback={
              <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center h-[450px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
              </div>
            }>
              <JobsGraph roleFilter={roleFilter} limit={15} />
            </Suspense>
          </div>
        </section>

        {/* Browse by Role */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Function</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Role</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Fractional jobs offer experienced executives the opportunity to work with multiple companies on a part-time basis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Link href="/part-time-cfo" className="group">
                <article className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                  <span className="text-3xl mb-4 block">💰</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1">Part-Time CFO</h3>
                  <p className="text-gray-500 text-sm">Finance leadership roles</p>
                </article>
              </Link>
              <Link href="/part-time-cmo" className="group">
                <article className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                  <span className="text-3xl mb-4 block">📢</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1">Part-Time CMO</h3>
                  <p className="text-gray-500 text-sm">Marketing leadership roles</p>
                </article>
              </Link>
              <Link href="/fractional-cfo-salary" className="group">
                <article className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                  <span className="text-3xl mb-4 block">📊</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1">CFO Salary Guide</h3>
                  <p className="text-gray-500 text-sm">Day rates & earnings</p>
                </article>
              </Link>
              <Link href="/fractional-cmo-salary" className="group">
                <article className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                  <span className="text-3xl mb-4 block">📈</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1">CMO Salary Guide</h3>
                  <p className="text-gray-500 text-sm">Day rates & earnings</p>
                </article>
              </Link>
            </div>

            <div className="text-center mb-8">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Location</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by City</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                London dominates with 60% of roles, but Manchester, Birmingham, and Edinburgh have growing fractional communities.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'London', href: '/fractional-jobs-london' },
                { label: 'Manchester', href: '/fractional-jobs-manchester' },
                { label: 'Birmingham', href: '/fractional-jobs-birmingham' },
                { label: 'Edinburgh', href: '/fractional-jobs-edinburgh' },
                { label: 'Bristol', href: '/fractional-jobs-bristol' },
                { label: 'Leeds', href: '/fractional-jobs-leeds' },
              ].map((loc) => (
                <Link
                  key={loc.label}
                  href={loc.href}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-900 hover:text-white font-medium transition-all"
                >
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6 block">Stay Updated</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Can't find the right job?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Get notified when new fractional positions match your profile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/handler/sign-up"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                Create Job Alert
              </Link>
              <Link
                href="/fractional-jobs-articles"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-200"
              >
                Read Career Guides
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-xl shadow-sm">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Jobs</h1>
          <p className="text-gray-600 mb-6">There was an error loading jobs. Please try again later.</p>
          <Link href="/">
            <button className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-semibold transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
