import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { JobFilters } from '@/components/JobFilters'

// Revalidate every 15 minutes for jobs
export const revalidate = 900

export const metadata: Metadata = {
  title: 'Fractional Jobs UK - Executive & Specialist Roles',
  description: 'Browse fractional executive positions in the UK. Find CFO, CMO, CTO, and specialist roles.',
  openGraph: {
    title: 'Fractional Jobs UK - Executive & Specialist Roles',
    description: 'Browse fractional executive positions in the UK. Find CFO, CMO, CTO, and specialist roles.',
    type: 'website',
  },
}

interface JobsPageProps {
  searchParams: {
    page?: string
    role?: string
    remote?: string
    location?: string
  }
}

interface FilterOption {
  value: string
  label: string
}

// Fetch filter options from database
async function getFilterOptions(sql: any) {
  // Get role categories
  const roleResults = await sql`
    SELECT DISTINCT role_category
    FROM jobs
    WHERE is_active = true AND role_category IS NOT NULL
    ORDER BY role_category
  `
  const roleOptions: FilterOption[] = [
    { value: '', label: 'All Roles' },
    ...roleResults.map((r: any) => ({
      value: r.role_category,
      label: r.role_category === 'CFO' ? 'CFO - Finance' :
             r.role_category === 'CMO' ? 'CMO - Marketing' :
             r.role_category === 'CTO' ? 'CTO - Technology' :
             r.role_category === 'COO' ? 'COO - Operations' :
             r.role_category === 'HR' ? 'HR Director' :
             r.role_category === 'Sales' ? 'Sales Director' :
             r.role_category
    }))
  ]

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

  // Extract main location names
  const locationSet = new Set<string>()
  locationResults.forEach((l: any) => {
    const loc = l.location as string
    if (loc.toLowerCase().includes('london')) locationSet.add('London')
    else if (loc.toLowerCase().includes('manchester')) locationSet.add('Manchester')
    else if (loc.toLowerCase().includes('remote')) locationSet.add('Remote')
    else if (loc.toLowerCase().includes('birmingham')) locationSet.add('Birmingham')
    else if (loc.toLowerCase().includes('edinburgh')) locationSet.add('Edinburgh')
    else if (loc.toLowerCase().includes('leeds')) locationSet.add('Leeds')
    else if (loc.toLowerCase().includes('bristol')) locationSet.add('Bristol')
  })

  const locationOptions: FilterOption[] = [
    { value: '', label: 'All Locations' },
    ...Array.from(locationSet).sort().map(loc => ({ value: loc, label: loc }))
  ]

  return { roleOptions, workTypeOptions, locationOptions }
}

function JobFiltersWrapper({
  currentRole,
  currentRemote,
  currentLocation,
  totalJobs,
  roleOptions,
  locationOptions,
  workTypeOptions
}: {
  currentRole: string
  currentRemote: string
  currentLocation: string
  totalJobs: number
  roleOptions: FilterOption[]
  locationOptions: FilterOption[]
  workTypeOptions: FilterOption[]
}) {
  return (
    <Suspense fallback={<div className="h-24 bg-gray-100 rounded-xl animate-pulse" />}>
      <JobFilters
        currentRole={currentRole}
        currentRemote={currentRemote}
        currentLocation={currentLocation}
        totalJobs={totalJobs}
        roleOptions={roleOptions}
        locationOptions={locationOptions}
        workTypeOptions={workTypeOptions}
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

  try {
    const sql = createDbQuery()

    // Get filter options from database
    const { roleOptions, workTypeOptions, locationOptions } = await getFilterOptions(sql)

    // Build dynamic WHERE clause
    let whereConditions = ['is_active = true']

    if (roleFilter) {
      whereConditions.push(`role_category = '${roleFilter}'`)
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
      return `/fractional-jobs?${params.toString()}`
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-16 relative overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Link href="/" className="inline-flex items-center text-purple-200 hover:text-white mb-4 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Fractional Jobs UK
            </h1>
            <p className="text-xl text-purple-100 mb-2">
              Executive & Specialist Roles
            </p>
            <p className="text-purple-200">
              {total}+ opportunities • Updated every 15 minutes
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 -mt-8 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <JobFiltersWrapper
              currentRole={roleFilter}
              currentRemote={remoteFilter}
              currentLocation={locationFilter}
              totalJobs={total}
              roleOptions={roleOptions}
              locationOptions={locationOptions}
              workTypeOptions={workTypeOptions}
            />
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* CTA Section */}
        <section className="py-16 bg-white border-t">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Can't find the right role?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get notified when new fractional positions match your profile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-semibold transition-colors">
                  Create Job Alert
                </button>
              </Link>
              <Link href="/articles">
                <button className="px-8 py-3 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-50 font-semibold transition-colors">
                  Read Career Guides
                </button>
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
