import { Metadata } from 'next'
import Link from 'next/link'
import { dbQuery } from '@/lib/db'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'

export const revalidate = 3600 // Revalidate every hour

interface JobDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  try {
    // Decode the slug to get the job title
    const title = decodeURIComponent(params.slug).replace(/-/g, ' ').toUpperCase()

    const result = await dbQuery(
      `SELECT title, company_name FROM jobs WHERE title ILIKE '%${title}%' LIMIT 1`
    )

    const job = result[0]

    return {
      title: `${job?.title || 'Job'} at ${job?.company_name || 'Company'} | Fractional.Quest`,
      description: `View detailed information about this fractional executive role. Apply now or save for later.`,
      openGraph: {
        title: `${job?.title || 'Job'} at ${job?.company_name || 'Company'}`,
        description: `Fractional executive opportunity on Fractional.Quest`,
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: 'Job Details | Fractional.Quest',
      description: 'View job details and apply today.',
    }
  }
}

export async function generateStaticParams() {
  try {
    const jobs = await dbQuery(
      `SELECT title FROM jobs WHERE is_active = true AND is_fractional = true LIMIT 100`
    )

    return jobs.map((job: any) => ({
      slug: encodeURIComponent(job.title.toLowerCase().replace(/\s+/g, '-')),
    }))
  } catch (error) {
    return []
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  try {
    // Decode the slug to get the job title
    const title = decodeURIComponent(params.slug).replace(/-/g, ' ').toUpperCase()

    const result = await dbQuery(
      `
      SELECT
        id,
        title,
        company_name,
        location,
        workplace_type,
        compensation,
        posted_date,
        full_description,
        requirements,
        responsibilities,
        benefits,
        skills_required,
        seniority_level,
        about_company,
        about_team,
        is_remote,
        url
      FROM jobs
      WHERE title ILIKE '%${title}%' AND is_active = true
      LIMIT 1
      `
    )

    if (!result || result.length === 0) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-6">This job posting may have expired or been removed.</p>
            <Link href="/fractionaljobsuk">
              <Button>Browse All Jobs</Button>
            </Link>
          </div>
        </div>
      )
    }

    const job = result[0]

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/fractionaljobsuk" className="text-purple-700 hover:text-purple-900 mb-4 inline-block">
              ← Back to Jobs
            </Link>

            <div className="flex gap-3 mb-4">
              {job.is_remote && (
                <Badge variant="success">Remote</Badge>
              )}
              {job.seniority_level && (
                <Badge variant="primary">{job.seniority_level}</Badge>
              )}
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-3">{job.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{job.company_name}</p>

            <div className="flex flex-wrap gap-6 text-gray-600">
              {job.location && <span>📍 {job.location}</span>}
              {job.compensation && <span>💰 {job.compensation}</span>}
              {job.workplace_type && <span>🏢 {job.workplace_type}</span>}
              {job.posted_date && (
                <span>
                  📅{' '}
                  {new Date(job.posted_date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {job.full_description && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Role</h2>
                  <div className="prose prose-lg max-w-none text-gray-600">
                    {job.full_description}
                  </div>
                </section>
              )}

              {job.about_company && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Company</h2>
                  <p className="text-gray-600">{job.about_company}</p>
                </section>
              )}

              {job.about_team && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Team</h2>
                  <p className="text-gray-600">{job.about_team}</p>
                </section>
              )}

              {job.responsibilities && job.responsibilities.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp: string, i: number) => (
                      <li key={i} className="flex gap-3 text-gray-600">
                        <span className="text-purple-700">✓</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex gap-3 text-gray-600">
                        <span className="text-purple-700">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex gap-3 text-gray-600">
                        <span className="text-purple-700">🎁</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>

                {job.url && (
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" className="w-full" size="lg">
                      View Original Post
                    </Button>
                  </a>
                )}

                {job.skills_required && job.skills_required.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills_required.map((skill: string) => (
                        <Badge key={skill} variant="primary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-2">💡 Tip</h3>
                  <p className="text-sm text-gray-600">
                    Similar to this role? Browse other {job.seniority_level} positions or set up job alerts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-purple-700 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to apply?</h2>
            <p className="text-lg text-purple-100 mb-6">
              Join hundreds of executives finding their next fractional opportunity.
            </p>
            <Button variant="secondary" size="lg">
              Apply Now
            </Button>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching job:', error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Job</h1>
          <p className="text-gray-600 mb-6">There was an error loading this job. Please try again.</p>
          <Link href="/fractionaljobsuk">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      </div>
    )
  }
}
