import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { JobFilters } from '@/components/JobFilters'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { JobsSunburst } from '@/components/JobsSunburst'
import { SkillsRadar } from '@/components/SkillsRadar'
import { DesktopOnly } from '@/components/DesktopOnly'

// Revalidate every 15 minutes for jobs
export const revalidate = 900

export const metadata: Metadata = {
  title: 'Part-Time Jobs UK 2025 - Browse Executive & Part-Time C-Suite Roles',
  description: 'Browse part-time executive jobs in the UK. Find part-time CFO, CMO, CTO roles paying £600-£1,500/day. Flexible executive positions updated regularly.',
  keywords: 'part-time jobs, part-time jobs uk, part-time executive jobs, flexible executive jobs, part-time cfo jobs, part-time cmo jobs',
  openGraph: {
    title: 'Part-Time Jobs UK - Browse Executive & Flexible C-Suite Roles',
    description: 'Browse part-time executive jobs in the UK. Find part-time CFO, CMO, CTO roles paying £600-£1,500/day.',
    type: 'website',
  },
}

interface JobsPageProps {
  searchParams: Promise<{
    page?: string
    role?: string
    location?: string
    industry?: string
  }>
}

interface FilterOption {
  value: string
  label: string
}

// Functional department categories (matches database ENUM)
const ROLE_CATEGORIES: FilterOption[] = [
  { value: '', label: 'All Departments' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Sales', label: 'Sales' },
  { value: 'HR', label: 'HR' },
  { value: 'Product', label: 'Product' },
  { value: 'Design', label: 'Design' },
  { value: 'Data', label: 'Data' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Customer Success', label: 'Customer Success' },
  { value: 'Other', label: 'Other' },
]

// Location options (matches database ENUM)
const LOCATIONS: FilterOption[] = [
  { value: '', label: 'All Locations' },
  { value: 'London', label: 'London' },
  { value: 'Manchester', label: 'Manchester' },
  { value: 'Birmingham', label: 'Birmingham' },
  { value: 'Leeds', label: 'Leeds' },
  { value: 'Bristol', label: 'Bristol' },
  { value: 'Edinburgh', label: 'Edinburgh' },
  { value: 'Glasgow', label: 'Glasgow' },
  { value: 'Liverpool', label: 'Liverpool' },
  { value: 'Newcastle', label: 'Newcastle' },
  { value: 'Sheffield', label: 'Sheffield' },
  { value: 'Cambridge', label: 'Cambridge' },
  { value: 'Oxford', label: 'Oxford' },
  { value: 'Cardiff', label: 'Cardiff' },
  { value: 'Belfast', label: 'Belfast' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Other UK', label: 'Other UK' },
]

// Industry options (matches database ENUM)
const INDUSTRIES: FilterOption[] = [
  { value: '', label: 'All Industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'FinTech', label: 'FinTech' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Professional Services', label: 'Professional Services' },
  { value: 'Financial Services', label: 'Financial Services' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Media', label: 'Media' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Education', label: 'Education' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Recruitment', label: 'Recruitment' },
  { value: 'Other', label: 'Other' },
]

// Fetch filter options
function getFilterOptions() {
  return {
    roleOptions: ROLE_CATEGORIES,
    locationOptions: LOCATIONS,
    industryOptions: INDUSTRIES
  }
}

function JobFiltersWrapper({
  currentRole,
  currentLocation,
  currentIndustry,
  totalJobs,
  roleOptions,
  locationOptions,
  industryOptions
}: {
  currentRole: string
  currentLocation: string
  currentIndustry: string
  totalJobs: number
  roleOptions: FilterOption[]
  locationOptions: FilterOption[]
  industryOptions: FilterOption[]
}) {
  return (
    <Suspense fallback={<div className="h-24 bg-gray-100 rounded-xl animate-pulse" />}>
      <JobFilters
        currentRole={currentRole}
        currentLocation={currentLocation}
        currentIndustry={currentIndustry}
        totalJobs={totalJobs}
        roleOptions={roleOptions}
        locationOptions={locationOptions}
        industryOptions={industryOptions}
      />
    </Suspense>
  )
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  // Await searchParams (required in Next.js 15+)
  const params = await searchParams

  const limit = 20
  const page = parseInt(params.page || '1')
  const offset = (page - 1) * limit

  // Get filter values
  const roleFilter = params.role || ''
  const locationFilter = params.location || ''
  const industryFilter = params.industry || ''

  try {
    const sql = createDbQuery()

    // Get filter options (static ENUMs)
    const { roleOptions, locationOptions, industryOptions } = getFilterOptions()

    // Build dynamic WHERE clause
    let whereConditions = ['is_active = true']

    if (roleFilter) {
      // Direct match against database ENUM
      whereConditions.push(`role_category = '${roleFilter}'`)
    }

    if (locationFilter) {
      // Direct match against city ENUM
      whereConditions.push(`city = '${locationFilter}'`)
    }

    if (industryFilter) {
      // Direct match against industry ENUM
      whereConditions.push(`industry = '${industryFilter}'`)
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
        description_snippet,
        company_domain
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
      if (locationFilter) params.set('location', locationFilter)
      if (industryFilter) params.set('industry', industryFilter)
      return `/part-time-jobs?${params.toString()}`
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section with 3D Knowledge Graph Background */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <JobsGraph3D limit={30} height="100%" isHero={true} showOverlay={true} />
          </div>

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
                  Part-Time Jobs UK
                </h1>

                <img
                  src="/logo.svg"
                  alt="Part-Time Jobs UK - Browse executive and flexible C-suite positions"
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

        {/* Sunburst Role Explorer - Desktop Only */}
        <DesktopOnly>
          <section className="py-16 bg-gray-950">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2 block">Explore Hierarchy</span>
                <h2 className="text-3xl md:text-4xl font-black text-white">Role Explorer</h2>
                <p className="text-gray-400 mt-2">Click to drill down through roles, companies, and jobs</p>
              </div>
              <Suspense fallback={
                <div className="flex items-center justify-center h-96 bg-gray-900 rounded-xl">
                  <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                </div>
              }>
                <JobsSunburst height="500px" />
              </Suspense>
            </div>
          </section>
        </DesktopOnly>

        {/* Skills Radar - Desktop Only */}
        <DesktopOnly>
          <section className="py-16 bg-gray-900">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-2 block">Skills Analysis</span>
                <h2 className="text-3xl md:text-4xl font-black text-white">Compare Role Skills</h2>
                <p className="text-gray-400 mt-2">See which skills matter most across C-suite roles</p>
              </div>
              <Suspense fallback={
                <div className="flex items-center justify-center h-96 bg-gray-950 rounded-xl">
                  <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                </div>
              }>
                <SkillsRadar height="500px" />
              </Suspense>
            </div>
          </section>
        </DesktopOnly>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <JobFiltersWrapper
              currentRole={roleFilter}
              currentLocation={locationFilter}
              currentIndustry={industryFilter}
              totalJobs={total}
              roleOptions={roleOptions}
              locationOptions={locationOptions}
              industryOptions={industryOptions}
            />
          </div>
        </section>

        {/* Jobs List - Dark section with 3D Knowledge Graph */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0">
              <JobsGraph3D limit={30} height="100%" isHero={true} showOverlay={true} />
            </div>
            <div className="absolute inset-0 bg-gray-900/85" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            {jobs.length === 0 ? (
              <div className="text-center py-16 bg-white/10 backdrop-blur rounded-xl border border-white/20">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-white mb-2">No jobs match your filters</h2>
                <p className="text-gray-300 mb-6">Try adjusting your search criteria</p>
                <Link href="/part-time-jobs">
                  <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black font-semibold transition-colors">
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
                      <Link key={job.id} href={`/part-time-job/${job.slug}`}>
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {page > 1 && (
                      <Link href={buildPageUrl(page - 1)}>
                        <button className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 font-medium transition-colors">
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
                                  ? 'bg-white text-gray-900'
                                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
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
                        <button className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 font-medium transition-colors">
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

        {/* 3D Jobs Knowledge Graph - Desktop Only */}
        <DesktopOnly>
          <section className="py-20 md:py-28 bg-gray-950">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-sm text-gray-400 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Interactive 3D Network
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Jobs Knowledge Graph</h2>
                <p className="text-lg text-gray-400">
                  Explore relationships between jobs, skills, and companies in 3D
                </p>
              </div>
              <Suspense fallback={
                <div className="rounded-xl p-6 flex items-center justify-center h-[550px]" style={{ background: 'radial-gradient(ellipse at center, #111827 0%, #030712 100%)' }}>
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-600/30 border-t-gray-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-sm">Loading 3D network...</p>
                  </div>
                </div>
              }>
                <JobsGraph3D roleFilter={roleFilter} limit={20} height="550px" />
              </Suspense>
            </div>
          </section>
        </DesktopOnly>

        {/* Browse by Role - Dark section */}
        <section className="py-20 md:py-28 bg-gray-900">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 block">By Function</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse by Role</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Fractional jobs offer experienced executives the opportunity to work with multiple companies on a part-time basis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Link href="/part-time-cfo" className="group">
                <article className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                  <span className="text-3xl mb-4 block">💰</span>
                  <h3 className="font-bold text-white group-hover:text-white transition-colors mb-1">Part-Time CFO</h3>
                  <p className="text-gray-400 text-sm">Finance leadership roles</p>
                </article>
              </Link>
              <Link href="/part-time-cmo" className="group">
                <article className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                  <span className="text-3xl mb-4 block">📢</span>
                  <h3 className="font-bold text-white group-hover:text-white transition-colors mb-1">Part-Time CMO</h3>
                  <p className="text-gray-400 text-sm">Marketing leadership roles</p>
                </article>
              </Link>
              <Link href="/fractional-cfo-salary" className="group">
                <article className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                  <span className="text-3xl mb-4 block">📊</span>
                  <h3 className="font-bold text-white group-hover:text-white transition-colors mb-1">CFO Salary Guide</h3>
                  <p className="text-gray-400 text-sm">Day rates & earnings</p>
                </article>
              </Link>
              <Link href="/fractional-cmo-salary" className="group">
                <article className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                  <span className="text-3xl mb-4 block">📈</span>
                  <h3 className="font-bold text-white group-hover:text-white transition-colors mb-1">CMO Salary Guide</h3>
                  <p className="text-gray-400 text-sm">Day rates & earnings</p>
                </article>
              </Link>
            </div>

            <div className="text-center mb-8">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 block">By Location</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse by City</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
                  className="px-5 py-2.5 bg-white/10 text-white rounded-full hover:bg-white hover:text-gray-900 font-medium transition-all"
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
            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black font-semibold transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
