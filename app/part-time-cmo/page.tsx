import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Part-Time CMO Jobs UK 2025 - Flexible Chief Marketing Officer Roles',
  description: 'Find part-time CMO jobs in the UK. Flexible Chief Marketing Officer positions paying £700-£1,400/day. Work 1-3 days per week with startups and scale-ups.',
  keywords: 'part time cmo, part-time cmo, part time chief marketing officer, part time cmo jobs, flexible cmo roles, part-time cmo services',
  openGraph: {
    title: 'Part-Time CMO Jobs UK - Flexible Chief Marketing Officer Roles',
    description: 'Find part-time CMO jobs in the UK. Flexible CMO positions paying £700-£1,400/day.',
  },
}

async function getCmoStats() {
  try {
    const sql = createDbQuery()
    const result = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (role_category ILIKE '%cmo%' OR title ILIKE '%cmo%' OR title ILIKE '%chief marketing%' OR title ILIKE '%marketing director%')`
    return parseInt((result[0] as any)?.count || '0')
  } catch {
    return 38
  }
}

async function getCmoJobs() {
  try {
    const sql = createDbQuery()
    return await sql`
      SELECT id, slug, title, company_name, location, compensation, posted_date
      FROM jobs
      WHERE is_active = true AND (role_category ILIKE '%cmo%' OR title ILIKE '%cmo%' OR title ILIKE '%chief marketing%' OR title ILIKE '%marketing director%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 4
    `
  } catch {
    return []
  }
}

export default async function PartTimeCmoPage() {
  const [jobCount, jobs] = await Promise.all([getCmoStats(), getCmoJobs()])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with 3D Knowledge Graph Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CMO" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
            <Link href="/" className="text-white/70 hover:text-white mb-6 inline-block">← Back to Home</Link>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Part-Time CMO Jobs UK</h1>
            <p className="text-xl text-white/80 mb-8">
              Flexible Chief Marketing Officer roles for experienced marketing leaders. Work 1-3 days per week earning £700-£1,400 per day.
            </p>
            <div className="flex gap-4">
              <Link href="/part-time-jobs?role=CMO" className="px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-50">
                Browse {jobCount}+ CMO Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - 750+ words */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg prose-purple">
          <h2>What is a Part-Time CMO?</h2>
          <p>
            A <strong>part-time CMO</strong> (also known as a part-time CMO or outsourced CMO) is a senior marketing executive who provides strategic marketing leadership to companies on a flexible, part-time basis. Instead of working full-time for a single organisation, part-time CMOs typically engage with multiple clients, dedicating 1-3 days per week to each company.
          </p>
          <p>
            The <strong>part-time CMO</strong> model has gained significant traction in the UK, particularly among startups, scale-ups, and SMEs that need experienced marketing leadership but cannot justify the £120,000-£200,000 annual cost of a full-time Chief Marketing Officer. A part-time CMO brings the same strategic expertise at a fraction of the cost.
          </p>

          <h2>Part-Time CMO vs Full-Time CMO</h2>
          <p>
            The fundamental difference between a <strong>part-time CMO</strong> and a traditional full-time CMO is the engagement structure. A full-time CMO commits exclusively to one company, earning a fixed salary plus benefits. A part-time Chief Marketing Officer works with multiple clients, charging day rates typically ranging from £700 to £1,400.
          </p>
          <p>
            For senior marketing professionals, the part-time model offers compelling benefits: higher effective earnings, diverse challenges across multiple brands, the ability to choose clients and projects, and better work-life balance. Companies benefit from access to senior expertise without the overhead of a full-time executive hire.
          </p>

          <h2>Part-Time CMO Services</h2>
          <p>
            <strong>Part-time CMO services</strong> typically encompass the full scope of strategic marketing leadership:
          </p>
          <ul>
            <li><strong>Marketing strategy development</strong> - Creating comprehensive go-to-market plans, brand positioning, and growth strategies</li>
            <li><strong>Team leadership</strong> - Managing and mentoring internal marketing teams and external agencies</li>
            <li><strong>Brand development</strong> - Building and evolving brand identity, messaging, and market positioning</li>
            <li><strong>Digital marketing oversight</strong> - Guiding paid acquisition, SEO, content marketing, and social media strategies</li>
            <li><strong>Demand generation</strong> - Building scalable lead generation systems and conversion funnels</li>
            <li><strong>Marketing technology</strong> - Selecting and implementing martech stacks and analytics</li>
            <li><strong>Board reporting</strong> - Providing marketing updates and ROI analysis to leadership</li>
          </ul>

          <h2>Who Needs a Part-Time CMO?</h2>
          <p>
            <strong>Part-time CMO jobs</strong> are most prevalent in the following company types:
          </p>
          <ul>
            <li><strong>B2B SaaS companies</strong> - Fast-growing software businesses needing demand generation expertise and product marketing leadership</li>
            <li><strong>Venture-backed startups</strong> - Companies at Seed to Series B stage that need marketing strategy but can't afford a full-time CMO</li>
            <li><strong>E-commerce brands</strong> - DTC companies requiring customer acquisition and retention expertise</li>
            <li><strong>Professional services firms</strong> - Consultancies and agencies looking to build their own marketing function</li>
            <li><strong>Companies in transition</strong> - Businesses undergoing rebrand, market expansion, or preparing for exit</li>
          </ul>

          <h2>Part-Time CMO Salary and Day Rates</h2>
          <p>
            <strong>Part-time CMO</strong> compensation in the UK typically ranges from £700 to £1,400 per day. London-based roles generally command higher rates, with Shoreditch tech startups and City financial services firms often paying £1,000-£1,400 daily.
          </p>
          <p>
            A part-time CMO working with 2-3 clients at 2 days per week each can realistically earn £140,000-£200,000 annually. CMOs with strong B2B SaaS or DTC experience, particularly those with proven track records of scaling companies, can command premium rates.
          </p>

          <h2>How to Become a Part-Time CMO</h2>
          <p>
            Transitioning to a <strong>part-time CMO career</strong> typically requires 12-15+ years of marketing experience, including significant time in senior leadership roles (VP Marketing, Marketing Director, or CMO). The most successful part-time CMOs have deep expertise in specific areas—such as B2B SaaS growth, brand building, or performance marketing—that make them highly valuable to target clients.
          </p>
          <p>
            Building a part-time practice takes time. Many part-time CMOs start with one or two engagements while consulting or between full-time roles, gradually building their client portfolio through referrals, networking, and platforms like <Link href="/part-time-jobs">Part-Time Quest</Link>.
          </p>

          <h2>Part-Time CMO Jobs in London</h2>
          <p>
            London dominates the UK market for <strong>part-time CMO jobs</strong>, with approximately 55% of all part-time marketing leadership roles based in the capital. Shoreditch and the broader Tech City area are particularly active, given the concentration of startups and scale-ups requiring marketing leadership.
          </p>
          <p>
            Manchester, Birmingham, and Bristol also have growing part-time CMO markets, particularly for companies in creative industries, e-commerce, and professional services. Remote and hybrid arrangements are increasingly common, expanding opportunities beyond traditional geographic boundaries.
          </p>
        </div>
      </article>

      {/* Latest Jobs */}
      {jobs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Part-Time CMO Jobs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job: any) => (
                <Link
                  key={job.id}
                  href={`/job/${job.slug}`}
                  className="bg-white rounded-xl p-6 border hover:border-purple-300 hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company_name}</p>
                  <p className="text-gray-600 text-sm">{job.location}</p>
                  {job.compensation && <p className="text-purple-700 font-semibold mt-2">{job.compensation}</p>}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/part-time-jobs?role=CMO" className="px-8 py-4 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800">
                View All CMO Jobs →
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
            <Link href="/part-time-cmo-salary" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-semibold text-gray-900">Part-Time CMO Salary Guide →</span>
            </Link>
            <Link href="/part-time-jobs-london" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-semibold text-gray-900">CMO Jobs London →</span>
            </Link>
            <Link href="/part-time-cfo" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="font-semibold text-gray-900">Part-Time CFO Jobs →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
