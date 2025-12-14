import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Part-Time CFO Jobs UK 2025 - Flexible Chief Financial Officer Roles',
  description: 'Find part-time CFO jobs in the UK. Flexible Chief Financial Officer positions paying £800-£1,500/day. Work 1-3 days per week with growing companies.',
  keywords: 'part time cfo, part-time cfo, part time chief financial officer, part time cfo jobs, flexible cfo roles',
  openGraph: {
    title: 'Part-Time CFO Jobs UK - Flexible Chief Financial Officer Roles',
    description: 'Find part-time CFO jobs in the UK. Flexible CFO positions paying £800-£1,500/day.',
  },
}

async function getCfoStats() {
  try {
    const sql = createDbQuery()
    const result = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (role_category ILIKE '%cfo%' OR title ILIKE '%cfo%' OR title ILIKE '%chief financial%')`
    return parseInt((result[0] as any)?.count || '0')
  } catch {
    return 45
  }
}

async function getCfoJobs() {
  try {
    const sql = createDbQuery()
    return await sql`
      SELECT id, slug, title, company_name, location, compensation, posted_date
      FROM jobs
      WHERE is_active = true AND (role_category ILIKE '%cfo%' OR title ILIKE '%cfo%' OR title ILIKE '%chief financial%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 4
    `
  } catch {
    return []
  }
}

export default async function PartTimeCfoPage() {
  const [jobCount, jobs] = await Promise.all([getCfoStats(), getCfoJobs()])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with 3D Knowledge Graph Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CFO" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
            <Link href="/" className="text-white/70 hover:text-white mb-6 inline-block">← Back to Home</Link>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Part-Time CFO Jobs UK</h1>
            <p className="text-xl text-white/80 mb-8">
              Flexible Chief Financial Officer roles for experienced finance professionals. Work 1-3 days per week earning £800-£1,500 per day.
            </p>
            <div className="flex gap-4">
              <Link href="/part-time-jobs?role=CFO" className="px-8 py-4 bg-white text-emerald-900 rounded-lg font-semibold hover:bg-emerald-50">
                Browse {jobCount}+ CFO Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - 750+ words */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg prose-emerald">
          <h2>What is a Part-Time CFO?</h2>
          <p>
            A <strong>part-time CFO</strong> (also known as a part-time CFO or outsourced CFO) is an experienced Chief Financial Officer who provides strategic financial leadership to companies on a flexible, part-time basis. Rather than committing to a single full-time role, part-time CFOs typically work with multiple clients, dedicating 1-3 days per week to each engagement.
          </p>
          <p>
            The demand for <strong>part-time CFO jobs</strong> in the UK has grown significantly over the past five years, driven by the rise of startups, scale-ups, and SMEs that need senior financial expertise but cannot justify or afford a full-time hire. Companies typically engage a part-time CFO when they reach Series A funding, need to prepare financial models for investors, or require board-level financial reporting.
          </p>

          <h2>Part-Time CFO vs Full-Time CFO</h2>
          <p>
            The key difference between a part-time CFO and a traditional full-time CFO lies in the engagement model. A full-time CFO works exclusively for one company, typically earning £150,000-£300,000 annually plus benefits. A <strong>part-time Chief Financial Officer</strong>, by contrast, works with 2-4 clients simultaneously, charging day rates of £800-£1,500.
          </p>
          <p>
            For many experienced CFOs, the part-time model offers significant advantages: higher effective hourly earnings, greater variety in work, portfolio diversification, and improved work-life balance. For companies, hiring a part-time CFO provides access to senior talent at a fraction of the cost of a full-time hire.
          </p>

          <h2>Who Hires Part-Time CFOs?</h2>
          <p>
            <strong>Part-time CFO jobs</strong> are most common in the following company types:
          </p>
          <ul>
            <li><strong>Venture-backed startups</strong> - Companies at Series A or B stage that need fundraising support, financial modelling, and investor relations expertise</li>
            <li><strong>Private equity portfolio companies</strong> - PE firms often require part-time CFOs to strengthen finance functions across their investments</li>
            <li><strong>Scale-ups</strong> - Fast-growing companies (£5-50m revenue) that have outgrown their bookkeeper but aren't ready for a full-time CFO</li>
            <li><strong>SMEs preparing for exit</strong> - Business owners planning a sale who need to professionalise their finances</li>
            <li><strong>Turnaround situations</strong> - Companies in financial distress that need experienced leadership</li>
          </ul>

          <h2>Part-Time CFO Salary and Day Rates</h2>
          <p>
            <strong>Part-time CFO</strong> compensation in the UK typically ranges from £800 to £1,500 per day, depending on experience, industry specialisation, and location. London-based roles command premium rates, with City and Canary Wharf engagements often paying £1,200-£1,500 per day.
          </p>
          <p>
            A part-time CFO working 2-3 days per week across multiple clients can realistically earn £150,000-£250,000 annually. The most experienced part-time CFOs with strong networks and repeat clients can earn significantly more.
          </p>

          <h2>Key Responsibilities</h2>
          <p>Part-time CFO responsibilities typically include:</p>
          <ul>
            <li>Financial strategy development and execution</li>
            <li>Cash flow forecasting and management</li>
            <li>Fundraising support and investor relations</li>
            <li>Board reporting and financial governance</li>
            <li>Budget creation and monitoring</li>
            <li>Financial systems and process improvement</li>
            <li>Team leadership and finance function development</li>
            <li>M&A support and due diligence</li>
          </ul>

          <h2>How to Become a Part-Time CFO</h2>
          <p>
            Transitioning to a <strong>part-time CFO career</strong> typically requires 15+ years of finance experience, including at least 5 years in senior leadership roles. Most successful part-time CFOs hold professional qualifications (ACA, ACCA, CIMA) and have experience across multiple industries.
          </p>
          <p>
            Building a portfolio of clients takes time. Many part-time CFOs start by taking on one or two part-time engagements alongside consulting work, gradually building their client base through referrals and networking. Platforms like <Link href="/part-time-jobs">Part-Time Quest</Link> can help connect experienced CFOs with companies seeking part-time finance leadership.
          </p>

          <h2>Part-Time CFO Jobs in London</h2>
          <p>
            London remains the UK's largest market for <strong>part-time CFO jobs</strong>, accounting for approximately 60% of all part-time finance roles. The City, Shoreditch, and Canary Wharf are particularly active markets, with strong demand from fintech, SaaS, and PE-backed companies.
          </p>
          <p>
            Outside London, Manchester, Birmingham, Edinburgh, and Bristol all have growing part-time CFO markets, though day rates are typically 15-25% lower than London equivalents.
          </p>
        </div>
      </article>

      {/* Latest Jobs */}
      {jobs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Part-Time CFO Jobs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job: any) => (
                <Link
                  key={job.id}
                  href={`/job/${job.slug}`}
                  className="bg-white rounded-xl p-6 border hover:border-emerald-300 hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company_name}</p>
                  <p className="text-gray-600 text-sm">{job.location}</p>
                  {job.compensation && <p className="text-emerald-700 font-semibold mt-2">{job.compensation}</p>}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/part-time-jobs?role=CFO" className="px-8 py-4 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800">
                View All CFO Jobs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Internal Links */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Pages</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/part-time-cfo-salary" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-semibold text-gray-900">Part-Time CFO Salary Guide →</span>
            </Link>
            <Link href="/part-time-jobs-london" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-semibold text-gray-900">CFO Jobs London →</span>
            </Link>
            <Link href="/part-time-cmo" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-semibold text-gray-900">Part-Time CMO Jobs →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
