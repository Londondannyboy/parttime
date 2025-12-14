import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createDbQuery } from '@/lib/db'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { FAQ, CMO_FAQS } from '@/components/FAQ'
import { VideoHeroBackground } from '@/components/VideoHeroBackground'
import { RoleCalculator } from '@/components/RoleCalculator'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { DesktopOnly } from '@/components/DesktopOnly'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleNews } from '@/components/RoleNews'

export const revalidate = 3600

// Mux video - professional executive theme
const HERO_VIDEO_PLAYBACK_ID: string | undefined = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

export const metadata: Metadata = {
  title: 'Fractional CMO Jobs UK | Part-Time CMO Roles',
  description: 'Fractional CMO jobs UK - Find part-time Chief Marketing Officer positions paying £700-£1,400/day. Browse live CMO roles for experienced marketing leaders.',
  keywords: 'fractional cmo jobs uk, fractional cmo jobs, part time cmo jobs, fractional cmo uk, cmo jobs uk, part time chief marketing officer',
  openGraph: {
    title: 'Fractional CMO Jobs UK | Part-Time CMO Roles',
    description: 'Fractional CMO jobs UK - Find part-time CMO positions paying £700-£1,400/day.',
    images: ['/images/fractional-cmo-jobs-uk.jpg'],
  },
}

async function getMarketingStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, avgRateResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Marketing'`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS INTEGER)) as avg FROM jobs WHERE is_active = true AND role_category = 'Marketing' AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Marketing' AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      avgRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '950')),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 38, avgRate: 950, remoteCount: 15 }
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true AND role_category = 'Marketing' AND company_name IS NOT NULL
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 8
    `
    return companies.map((c: any) => c.company_name)
  } catch {
    return []
  }
}

export default async function FractionalCmoJobsUkPage() {
  const [stats, companies] = await Promise.all([getMarketingStats(), getFeaturedCompanies()])

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Hero with Video Background */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <VideoHeroBackground
          playbackId={HERO_VIDEO_PLAYBACK_ID}
          fallbackGradient={true}
        />

        {/* Hero Content */}
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>

            {/* Editorial Typography */}
            <div className="max-w-4xl">
              <span className="inline-block bg-amber-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Marketing Leadership
              </span>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CMO<br />
                <span className="text-amber-400">Jobs UK</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                <strong className="text-white">Fractional CMO jobs UK</strong> for experienced marketing leaders.
                Part-time Chief Marketing Officer roles paying £700-£1,400/day.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-amber-400">{stats.total}+</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Live Roles</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">£{stats.avgRate}</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Avg Day Rate</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">{stats.remoteCount}</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Remote</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#jobs"
                  className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
                >
                  Browse Jobs Now
                </Link>
                <Link
                  href="/fractional-cmo-salary"
                  className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  Salary Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section - Impressive Feature Right After Hero */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Calculator</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              How Much Can You Earn as a Fractional CMO?
            </h2>
          </div>
          <RoleCalculator role="cmo" />
        </div>
      </section>

      {/* JOBS SECTION - What They Came For */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Marketing & CMO Jobs</h2>
            </div>
            <p className="text-gray-500">Pre-filtered to Marketing. Change filters to explore.</p>
          </div>

          <Suspense fallback={
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          }>
            <EmbeddedJobBoard
              defaultDepartment="Marketing"
              pageSlug="fractional-cmo-jobs-uk"
              jobsPerPage={10}
              title="Latest Marketing & CMO Jobs"
              allJobsLinkText="View All Marketing Jobs"
            />
          </Suspense>
        </div>
      </section>

      {/* CMO Jobs Knowledge Graph - Desktop Only */}
      <DesktopOnly>
        <section className="py-16 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Interactive Network</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">CMO Jobs Knowledge Graph</h2>
              <p className="text-gray-400 mt-2">Explore CMO roles, skills, and companies in 3D</p>
            </div>
            <JobsGraph3D roleFilter="CMO" limit={25} height="500px" />
          </div>
        </section>
      </DesktopOnly>

      {/* Companies Hiring - Editorial Style */}
      {companies.length > 0 && (
        <section className="py-16 bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who's Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black">Companies Seeking CMOs</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span
                  key={index}
                  className="text-xl md:text-2xl font-light text-gray-400 hover:text-amber-400 transition-colors cursor-default"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Content Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Lead-in */}
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">The Guide</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Everything You Need to Know About<br />
              <span className="text-amber-600">Fractional CMO Jobs UK</span>
            </h2>
            <div className="w-24 h-1 bg-amber-500"></div>
          </div>

          {/* SEO Image - Editorial Style */}
          <figure className="mb-16 -mx-6 lg:-mx-16">
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Fractional CMO jobs UK - marketing executive leading strategy meeting with team"
              className="w-full h-80 md:h-96 object-cover"
            />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
              Marketing leaders across the UK are embracing fractional work
            </figcaption>
          </figure>

          {/* Article Content - Editorial Typography */}
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Fractional CMO jobs</strong> represent the new frontier of marketing leadership. Part-time Chief Marketing Officer positions where experienced leaders provide strategic guidance to multiple companies simultaneously—delivering world-class expertise at a fraction of the cost.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">The Rise of Fractional CMO Jobs UK</h3>
            <p>
              The UK market for <strong>fractional CMO jobs UK</strong> has exploded, with a 200% year-on-year increase in searches. Startups, scale-ups, and SMEs are accessing senior marketing talent without the £120,000-£200,000 annual cost of a full-time Chief Marketing Officer.
            </p>

            <div className="bg-gray-50 p-8 my-10 border-l-4 border-amber-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Companies access CMO expertise for £1,500-£4,000/week instead of £10,000+ monthly for full-time."
              </p>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Why Fractional CMO Jobs Are Booming</h3>
            <ul className="space-y-3">
              <li><strong>Cost efficiency:</strong> Senior expertise at a fraction of the cost</li>
              <li><strong>Diverse experience:</strong> CMOs bringing insights from multiple industries</li>
              <li><strong>Immediate impact:</strong> No lengthy onboarding—strategy from day one</li>
              <li><strong>Scalability:</strong> Flex engagement based on business needs</li>
              <li><strong>VC expectations:</strong> Professional marketing leadership post-Series A</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Fractional CMO Jobs</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'B2B SaaS CMO', desc: 'Demand generation & pipeline acceleration', rate: '£1,000-£1,400/day' },
                { title: 'DTC/E-commerce CMO', desc: 'Customer acquisition & brand building', rate: '£900-£1,300/day' },
                { title: 'Startup CMO', desc: 'Building marketing foundations Series A-C', rate: '£850-£1,200/day' },
                { title: 'Growth Marketing CMO', desc: 'Performance-focused CAC/LTV optimisation', rate: '£900-£1,300/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-amber-600 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CMO Jobs by Location</h3>
            <p>London leads with 55% of roles, but opportunities exist nationwide:</p>
            <ul className="space-y-2">
              <li><strong>London Tech City:</strong> £900-£1,400/day</li>
              <li><strong>Manchester:</strong> £700-£1,000/day</li>
              <li><strong>Bristol & Edinburgh:</strong> £700-£1,000/day</li>
              <li><strong>Remote UK:</strong> £650-£950/day</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Requirements for Fractional CMO Jobs</h3>
            <ul className="space-y-2">
              <li>12-15+ years marketing experience, 5+ in senior leadership</li>
              <li>Proven track record of revenue/pipeline growth</li>
              <li>Deep channel expertise (performance, brand, PLG, ABM)</li>
              <li>Team building and management experience</li>
              <li>Board-level communication skills</li>
            </ul>
          </article>
        </div>
      </section>

      {/* IR35 Calculator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">UK Tax</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              IR35: Inside vs Outside
            </h2>
            <p className="text-gray-600 mt-4">
              As a fractional CMO, your IR35 status significantly impacts your take-home pay
            </p>
          </div>
          <IR35Calculator defaultDayRate={950} />
        </div>
      </section>

      {/* Marketing News */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoleNews category="Marketing" title="Latest CMO & Marketing News" limit={3} />
        </div>
      </section>

      {/* FAQ Section - Editorial Style */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Common Questions About Fractional CMO Jobs UK
            </h2>
          </div>
          <FAQ items={CMO_FAQS} title="" />
        </div>
      </section>

      {/* CTA Section - Bold Editorial */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Ready?</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Find Your Next<br />
            <span className="text-amber-400">Fractional CMO Role</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Create your profile and get matched with companies seeking fractional marketing leadership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/handler/sign-up"
              className="px-10 py-5 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              Create Profile
            </Link>
            <Link
              href="/fractional-cmo-salary"
              className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Salary Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages - Minimal */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/part-time-cmo" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Part-Time CMO Guide</Link>
              <Link href="/fractional-cmo-salary" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">CMO Salary Guide</Link>
              <Link href="/fractional-jobs-london" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Jobs London</Link>
              <Link href="/fractional-cfo-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">CFO Jobs UK</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">CTO Jobs UK</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
