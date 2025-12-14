import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createDbQuery } from '@/lib/db'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { FAQ, CFO_FAQS } from '@/components/FAQ'
import { VideoHeroBackground } from '@/components/VideoHeroBackground'
import { RoleCalculator } from '@/components/RoleCalculator'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { DesktopOnly } from '@/components/DesktopOnly'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleNews } from '@/components/RoleNews'

export const revalidate = 3600

const HERO_VIDEO_PLAYBACK_ID: string | undefined = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

export const metadata: Metadata = {
  title: 'Fractional CFO Jobs UK | Part-Time CFO Roles 2025',
  description: 'Fractional CFO jobs UK - Find part-time Chief Financial Officer positions paying £800-£1,500/day. Browse live CFO roles for experienced finance leaders. Remote & hybrid available.',
  keywords: 'fractional cfo jobs, fractional cfo jobs uk, part time cfo, part-time cfo, cfo part time, fractional cfo opportunities, fractional cfo uk, part time chief financial officer, fractional cfo remote',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cfo-jobs-uk',
  },
  openGraph: {
    title: 'Fractional CFO Jobs UK | Part-Time CFO Roles 2025',
    description: 'Fractional CFO jobs UK - Find part-time CFO positions paying £800-£1,500/day. Remote & hybrid available.',
    images: ['/images/fractional-cfo-jobs-uk.jpg'],
    url: 'https://fractional.quest/fractional-cfo-jobs-uk',
  },
}

async function getFinanceStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Finance'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Finance' AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 45, remoteCount: 18 }
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true AND role_category = 'Finance' AND company_name IS NOT NULL
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 8
    `
    return companies.map((c: any) => c.company_name)
  } catch {
    return []
  }
}

export default async function FractionalCfoJobsUkPage() {
  const [stats, companies] = await Promise.all([getFinanceStats(), getFeaturedCompanies()])

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Hero with Video Background */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <VideoHeroBackground playbackId={HERO_VIDEO_PLAYBACK_ID} fallbackGradient={true} />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-emerald-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Finance Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CFO<br />
                <span className="text-emerald-400">Jobs UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                <strong className="text-white">Fractional CFO jobs UK</strong> for experienced finance leaders.
                Part-time Chief Financial Officer roles paying £800-£1,500/day.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-emerald-400">{stats.total}+</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Live Roles</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">£1,050</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Avg Day Rate</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">{stats.remoteCount}</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Remote</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#jobs" className="px-8 py-4 bg-emerald-500 text-black font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors">
                  Browse Jobs Now
                </Link>
                <Link href="/fractional-cfo-salary" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Salary Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Calculator</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">How Much Can You Earn as a Fractional CFO?</h2>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Finance & CFO Jobs</h2>
            </div>
            <p className="text-gray-500">Pre-filtered to Finance. Change filters to explore.</p>
          </div>
          <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-200 p-8"><div className="animate-pulse space-y-4"><div className="h-10 bg-gray-200 rounded w-1/3"></div><div className="grid grid-cols-2 gap-4"><div className="h-48 bg-gray-200 rounded"></div><div className="h-48 bg-gray-200 rounded"></div></div></div></div>}>
            <EmbeddedJobBoard defaultDepartment="Finance" pageSlug="fractional-cfo-jobs-uk" jobsPerPage={10} title="Latest Finance & CFO Jobs" allJobsLinkText="View All Finance Jobs" />
          </Suspense>
        </div>
      </section>

      {/* 3D Skills Graph - Desktop Only */}
      <DesktopOnly>
        <section className="py-16 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Interactive Network</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">CFO Jobs Knowledge Graph</h2>
              <p className="text-gray-400 mt-2">Explore CFO roles, skills, and companies in 3D</p>
            </div>
            <JobsGraph3D roleFilter="CFO" limit={25} height="500px" />
          </div>
        </section>
      </DesktopOnly>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who's Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black">Companies Seeking CFOs</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-emerald-400 transition-colors cursor-default">{company}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">The Guide</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Everything You Need to Know About<br /><span className="text-emerald-600">Fractional CFO Jobs UK</span>
            </h2>
            <div className="w-24 h-1 bg-emerald-500"></div>
          </div>
          <figure className="mb-16 -mx-6 lg:-mx-16">
            <img src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Fractional CFO jobs UK - finance executive reviewing company financial reports" className="w-full h-80 md:h-96 object-cover" />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">Finance leaders across the UK are embracing fractional work</figcaption>
          </figure>
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Fractional CFO jobs</strong> represent the new frontier of finance leadership. Part-time Chief Financial Officer positions where experienced leaders provide strategic financial guidance to multiple companies simultaneously—delivering world-class expertise at a fraction of the cost.
            </p>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">The Rise of Fractional CFO Jobs UK</h3>
            <p>The UK market for <strong>fractional CFO jobs UK</strong> has grown by over 180% in the past three years. This surge reflects a fundamental shift in how companies access senior finance talent, particularly among startups, scale-ups, and SMEs that need experienced financial leadership but cannot justify a full-time CFO salary of £150,000-£300,000.</p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-emerald-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">"Companies access CFO expertise for £2,000-£5,000/week instead of £12,500+ monthly for full-time."</p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Why Fractional CFO Jobs Are Booming</h3>
            <ul className="space-y-3">
              <li><strong>Cost efficiency:</strong> Senior expertise at a fraction of the cost</li>
              <li><strong>Flexibility:</strong> Scale finance leadership based on current needs</li>
              <li><strong>Quality talent:</strong> Access CFOs with diverse, multi-industry experience</li>
              <li><strong>Speed to impact:</strong> No lengthy recruitment—start adding value within days</li>
              <li><strong>PE/VC influence:</strong> Investors mandate fractional CFOs across portfolios</li>
            </ul>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Fractional CFO Jobs</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Startup CFO', desc: 'Series A-C fundraising & investor relations', rate: '£1,000-£1,400/day' },
                { title: 'PE Portfolio CFO', desc: 'Financial transformation & value creation', rate: '£1,100-£1,500/day' },
                { title: 'Scale-up CFO', desc: 'Professionalising finance function', rate: '£950-£1,300/day' },
                { title: 'Exit-ready CFO', desc: 'Due diligence & IPO preparation', rate: '£1,100-£1,500/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-emerald-600 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Requirements for Fractional CFO Jobs</h3>
            <ul className="space-y-2">
              <li>15+ years finance experience, 5+ in CFO or Finance Director roles</li>
              <li>Professional qualifications (ACA, ACCA, CIMA)</li>
              <li>Fundraising experience (Series A-C, debt facilities)</li>
              <li>M&A and due diligence expertise</li>
              <li>Board-level communication skills</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Part-Time CFO Section - SEO for "part time cfo" */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Alternative Term</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Part-Time CFO Jobs UK</h2>
            <p className="text-xl text-gray-600 mt-4">The terms "part-time CFO" and "fractional CFO" are often used interchangeably</p>
          </div>

          <div className="prose prose-lg prose-gray max-w-none">
            <p>
              <strong>Part-time CFO</strong> roles are identical to <strong>fractional CFO jobs</strong>—both describe Chief Financial Officers who work with companies on a non-full-time basis. Whether you search for "part time CFO", "CFO part time", or "part time Chief Financial Officer", you're looking for the same opportunity: senior finance leadership without the full-time commitment.
            </p>

            <h3 className="text-xl font-black text-gray-900 mt-8 mb-4">Part-Time CFO vs Fractional CFO</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-6">
              <div className="bg-white p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Part-Time CFO</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Often implies working with one company</li>
                  <li>• Fixed days per week (e.g., Tues & Thurs)</li>
                  <li>• May suggest employment relationship</li>
                  <li>• Common search term in UK market</li>
                </ul>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Fractional CFO</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Typically multiple clients simultaneously</li>
                  <li>• Flexible hours based on client needs</li>
                  <li>• Usually contractor/limited company</li>
                  <li>• Industry-preferred terminology</li>
                </ul>
              </div>
            </div>

            <p>
              In practice, most <strong>part-time CFO jobs</strong> and fractional CFO jobs are the same roles. Companies may use either term in job postings. The key is that you're providing senior financial leadership on a part-time, ongoing basis—typically 1-3 days per week.
            </p>

            <div className="bg-emerald-50 p-6 border border-emerald-200 rounded-lg my-8 not-prose">
              <p className="text-emerald-800 font-medium mb-3">Looking specifically for part-time CFO opportunities?</p>
              <Link href="/part-time-cfo" className="inline-flex items-center text-emerald-700 font-bold hover:text-emerald-900">
                Read our Part-Time CFO Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fractional CFO Job Description Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Role Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CFO Job Description</h2>
          </div>

          <div className="prose prose-lg prose-gray max-w-none">
            <p>
              A typical <strong>fractional CFO job description</strong> outlines the responsibilities of a part-time Chief Financial Officer. While specific duties vary by company stage and industry, most fractional CFO opportunities include these core responsibilities:
            </p>

            <h3 className="text-xl font-black text-gray-900 mt-8 mb-4">Core Responsibilities</h3>
            <ul className="space-y-2">
              <li><strong>Financial Strategy:</strong> Develop and implement financial strategies aligned with business objectives</li>
              <li><strong>Cash Flow Management:</strong> Oversee cash flow forecasting, working capital optimisation, and treasury functions</li>
              <li><strong>Financial Reporting:</strong> Produce management accounts, board packs, and investor reports</li>
              <li><strong>Fundraising Support:</strong> Lead equity raises, debt facilities, and investor relations</li>
              <li><strong>Team Leadership:</strong> Mentor finance team, implement processes, and drive improvements</li>
              <li><strong>Compliance & Controls:</strong> Ensure regulatory compliance and strengthen internal controls</li>
            </ul>

            <h3 className="text-xl font-black text-gray-900 mt-8 mb-4">Typical Engagement Structure</h3>
            <div className="grid md:grid-cols-3 gap-4 not-prose my-6">
              <div className="bg-gray-50 p-5 text-center">
                <div className="text-2xl font-black text-emerald-600">1-3 days</div>
                <div className="text-sm text-gray-600">Per week</div>
              </div>
              <div className="bg-gray-50 p-5 text-center">
                <div className="text-2xl font-black text-emerald-600">6-12 months</div>
                <div className="text-sm text-gray-600">Initial commitment</div>
              </div>
              <div className="bg-gray-50 p-5 text-center">
                <div className="text-2xl font-black text-emerald-600">£800-£1,500</div>
                <div className="text-sm text-gray-600">Day rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Fractional CFO Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Remote Work</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Remote Fractional CFO Opportunities</h2>
          </div>

          <div className="prose prose-lg prose-gray max-w-none">
            <p>
              <strong>Remote fractional CFO</strong> roles have grown significantly since 2020. Many companies now offer fully remote or hybrid fractional CFO positions, allowing experienced finance leaders to work with businesses across the UK (and internationally) without geographical constraints.
            </p>

            <h3 className="text-xl font-black text-gray-900 mt-8 mb-4">Benefits of Remote Fractional CFO Work</h3>
            <ul className="space-y-2">
              <li><strong>Wider client base:</strong> Work with companies anywhere in the UK, not limited by commute</li>
              <li><strong>Multiple clients:</strong> Remote work makes managing 2-3 clients more practical</li>
              <li><strong>Flexibility:</strong> Structure your week around client needs and personal commitments</li>
              <li><strong>Cost efficiency:</strong> No commuting costs; companies may pay premium rates for remote CFOs</li>
            </ul>

            <p>
              Currently, approximately <strong>{stats.remoteCount} of our {stats.total} finance roles</strong> offer remote or hybrid working arrangements. Filter by "Remote" in our job board to see all available remote fractional CFO opportunities.
            </p>

            <div className="bg-black text-white p-6 rounded-lg my-8 not-prose">
              <p className="text-gray-300 mb-3">Browse remote CFO positions:</p>
              <Link href="/remote" className="inline-flex items-center text-emerald-400 font-bold hover:text-emerald-300">
                View Remote Jobs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">UK Tax</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">IR35: Inside vs Outside</h2>
            <p className="text-gray-600 mt-4">As a fractional CFO, your IR35 status significantly impacts your take-home pay</p>
          </div>
          <IR35Calculator defaultDayRate={1050} />
        </div>
      </section>

      {/* Finance News */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoleNews category="Finance" title="Latest CFO & Finance News" limit={3} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CFO Jobs UK</h2>
          </div>
          <FAQ items={CFO_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Ready?</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Find Your Next<br /><span className="text-emerald-400">Fractional CFO Role</span></h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Create your profile and get matched with companies seeking fractional finance leadership.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-emerald-500 text-black font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors">Create Profile</Link>
            <Link href="/fractional-cfo-salary" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Salary Guide</Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/part-time-cfo" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">Part-Time CFO Guide</Link>
              <Link href="/fractional-cfo-salary" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">CFO Salary Guide</Link>
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">CMO Jobs UK</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">CTO Jobs UK</Link>
              <Link href="/fractional-coo-jobs-uk" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">COO Jobs UK</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
