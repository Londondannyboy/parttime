import { Metadata } from 'next'
import Link from 'next/link'
import { dbQuery } from '@/lib/db'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'

export const revalidate = 900 // Revalidate every 15 minutes

export const metadata: Metadata = {
  title: 'Fractional Jobs UK - Executive & Specialist Roles',
  description: 'Browse 500+ fractional executive positions in the UK. Find CFO, CMO, CTO, and specialist roles with flexible day rates.',
  openGraph: {
    title: 'Fractional Jobs UK - Executive & Specialist Roles',
    description: 'Browse 500+ fractional executive positions in the UK.',
    type: 'website',
  },
}

interface JobsPageProps {
  searchParams: {
    location?: string
    role?: string
    remote?: string
    page?: string
  }
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const limit = 20
  const page = parseInt(searchParams.page || '1')
  const offset = (page - 1) * limit

  try {
    // Fetch jobs from database
    let query = `
      SELECT
        id,
        title,
        company_name,
        location,
        workplace_type,
        compensation,
        posted_date,
        skills_required,
        seniority_level,
        is_remote
      FROM jobs
      WHERE is_active = true
        AND is_fractional = true
    `

    if (searchParams.location) {
      query += ` AND location ILIKE '%${searchParams.location}%'`
    }

    if (searchParams.role) {
      query += ` AND title ILIKE '%${searchParams.role}%'`
    }

    if (searchParams.remote === 'true') {
      query += ` AND is_remote = true`
    }

    query += ` ORDER BY posted_date DESC LIMIT ${limit} OFFSET ${offset}`

    const jobs = await dbQuery(query)

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as count
      FROM jobs
      WHERE is_active = true
        AND is_fractional = true
    `

    if (searchParams.location) {
      countQuery += ` AND location ILIKE '%${searchParams.location}%'`
    }

    if (searchParams.role) {
      countQuery += ` AND title ILIKE '%${searchParams.role}%'`
    }

    if (searchParams.remote === 'true') {
      countQuery += ` AND is_remote = true`
    }

    const countResult = await dbQuery(countQuery)
    const total = countResult[0]?.count || 0
    const totalPages = Math.ceil(total / limit)

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-50 to-purple-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Fractional Jobs UK
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {total}+ active opportunities for fractional executives and specialists
            </p>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form className="flex gap-2">
                <input
                  type="text"
                  name="role"
                  placeholder="Search by role..."
                  defaultValue={searchParams.role}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <Button type="submit" size="md">
                  Search
                </Button>
              </form>

              <input
                type="text"
                name="location"
                placeholder="Location..."
                defaultValue={searchParams.location}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />

              <label className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="remote"
                  value="true"
                  defaultChecked={searchParams.remote === 'true'}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Remote Only</span>
              </label>
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No jobs found matching your criteria.</p>
                <Link href="/fractionaljobsuk">
                  <Button className="mt-4">View All Jobs</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-12">
                  {jobs.map((job: any) => (
                    <Card key={job.id} hoverable className="cursor-pointer">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex gap-2 mb-2">
                            {job.is_remote && (
                              <Badge variant="success" size="sm">
                                Remote
                              </Badge>
                            )}
                            {job.seniority_level && (
                              <Badge variant="primary" size="sm">
                                {job.seniority_level}
                              </Badge>
                            )}
                          </div>

                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {job.title}
                          </h2>

                          <p className="text-gray-600 mb-3">{job.company_name}</p>

                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            {job.location && (
                              <span className="flex items-center gap-1">
                                📍 {job.location}
                              </span>
                            )}
                            {job.compensation && (
                              <span className="flex items-center gap-1">
                                💰 {job.compensation}
                              </span>
                            )}
                            {job.posted_date && (
                              <span className="flex items-center gap-1">
                                📅{' '}
                                {new Date(job.posted_date).toLocaleDateString('en-GB', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            )}
                          </div>

                          {job.skills_required && job.skills_required.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {job.skills_required.slice(0, 3).map((skill: string) => (
                                <Badge key={skill} variant="gray" size="sm">
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills_required.length > 3 && (
                                <Badge variant="gray" size="sm">
                                  +{job.skills_required.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        <Link href={`/job/${encodeURIComponent(job.title.toLowerCase().replace(/\s+/g, '-'))}`}>
                          <Button variant="primary">View Details</Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {page > 1 && (
                      <Link href={`/fractionaljobsuk?page=${page - 1}`}>
                        <Button variant="ghost">← Previous</Button>
                      </Link>
                    )}

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        const pageNum = Math.max(1, page - 2) + i
                        if (pageNum > totalPages) return null

                        return (
                          <Link key={pageNum} href={`/fractionaljobsuk?page=${pageNum}`}>
                            <Button
                              variant={pageNum === page ? 'primary' : 'ghost'}
                              size="sm"
                            >
                              {pageNum}
                            </Button>
                          </Link>
                        )
                      })}
                    </div>

                    {page < totalPages && (
                      <Link href={`/fractionaljobsuk?page=${page + 1}`}>
                        <Button variant="ghost">Next →</Button>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Jobs</h1>
          <p className="text-gray-600 mb-6">
            There was an error loading the jobs. Please try again later.
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }
}
