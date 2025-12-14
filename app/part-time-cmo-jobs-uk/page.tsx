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

const HERO_VIDEO_PLAYBACK_ID: string | undefined = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

export const metadata: Metadata = {
  title: 'Part-Time CMO Jobs UK | Flexible Chief Marketing Officer Roles',
  description: 'Part-time CMO jobs UK - Find flexible Chief Marketing Officer positions paying £700-£1,400/day. Browse live part-time CMO roles for experienced marketing leaders. Remote & hybrid available.',
  keywords: 'part time cmo jobs, part-time cmo jobs uk, part time chief marketing officer, cmo part time, flexible cmo roles, part time cmo uk, part-time cmo opportunities',
  alternates: {
    canonical: 'https://fractional.quest/part-time-cmo-jobs-uk',
  },
  openGraph: {
    title: 'Part-Time CMO Jobs UK | Flexible Chief Marketing Officer Roles',
    description: 'Part-time CMO jobs UK - Find flexible CMO positions paying £700-£1,400/day. Remote & hybrid available.',
    url: 'https://fractional.quest/part-time-cmo-jobs-uk',
  },
}

async function getMarketingStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Marketing'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Marketing' AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 38, remoteCount: 15 }
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

export default async function PartTimeCmoJobsUkPage() {
  const [stats, companies] = await Promise.all([getMarketingStats(), getFeaturedCompanies()])

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
              <span className="inline-block bg-amber-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Marketing Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Part-Time CMO<br />
                <span className="text-amber-400">Jobs UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                <strong className="text-white">Part-time CMO jobs UK</strong> for experienced marketing leaders.
                Flexible Chief Marketing Officer roles paying £700-£1,400/day.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-amber-400">{stats.total}+</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Live Roles</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">£950</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Avg Day Rate</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">{stats.remoteCount}</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Remote</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#jobs" className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">
                  Browse Jobs Now
                </Link>
                <Link href="/fractional-cmo-salary" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
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
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">How Much Can You Earn as a Part-Time CMO?</h2>
          </div>
          <RoleCalculator role="cmo" />
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Part-Time CMO Jobs</h2>
            </div>
            <p className="text-gray-500">Pre-filtered to Marketing. Change filters to explore.</p>
          </div>
          <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-200 p-8"><div className="animate-pulse space-y-4"><div className="h-10 bg-gray-200 rounded w-1/3"></div><div className="grid grid-cols-2 gap-4"><div className="h-48 bg-gray-200 rounded"></div><div className="h-48 bg-gray-200 rounded"></div></div></div></div>}>
            <EmbeddedJobBoard defaultDepartment="Marketing" pageSlug="part-time-cmo-jobs-uk" jobsPerPage={10} title="Latest Part-Time CMO Jobs" allJobsLinkText="View All CMO Jobs" />
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

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who's Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black">Companies Seeking Part-Time CMOs</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-amber-400 transition-colors cursor-default">{company}</span>
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
              Everything You Need to Know About<br /><span className="text-amber-600">Part-Time CMO Jobs UK</span>
            </h2>
            <div className="w-24 h-1 bg-amber-500"></div>
          </div>
          <figure className="mb-16 -mx-6 lg:-mx-16">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Part-time CMO jobs UK - marketing executive leading brand strategy meeting"
              title="Part-time CMO jobs UK"
              className="w-full h-80 md:h-96 object-cover"
            />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">Marketing leaders across the UK are embracing part-time and flexible work arrangements</figcaption>
          </figure>
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Part-time CMO jobs</strong> represent flexible marketing leadership at its best. Experienced Chief Marketing Officers working with companies on a 1-3 day per week basis—delivering strategic marketing expertise without the full-time commitment.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">What is a Part-Time CMO?</h3>
            <p>
              A <strong>part-time CMO</strong> (also known as a fractional CMO) is a senior marketing executive who provides strategic marketing leadership to companies on a flexible basis. Rather than committing to a single full-time role, part-time CMOs typically work with multiple clients, dedicating 1-3 days per week to each engagement.
            </p>
            <p>
              The demand for <strong>part-time CMO jobs UK</strong> has grown significantly, particularly among startups, scale-ups, and SMEs that need experienced marketing leadership but cannot justify a full-time CMO salary of £120,000-£200,000.
            </p>

            <div className="bg-gray-50 p-8 my-10 border-l-4 border-amber-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">"Part-time CMO jobs deliver the same strategic marketing expertise as full-time roles at a fraction of the cost—typically £1,500-£4,500/week vs £10,000+ monthly for full-time."</p>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Part-Time CMO vs Full-Time CMO</h3>
            <p>
              The key difference lies in engagement structure. A full-time CMO works exclusively for one company, earning £120,000-£200,000 annually. A <strong>part-time Chief Marketing Officer</strong> works with 2-4 clients simultaneously, charging day rates of £700-£1,400.
            </p>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Part-Time CMO</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 1-3 days per week per client</li>
                  <li>• £700-£1,400/day rates</li>
                  <li>• Multiple clients simultaneously</li>
                  <li>• Flexible, project-based</li>
                  <li>• Contractor/limited company</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Full-Time CMO</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 5 days per week, one company</li>
                  <li>• £120,000-£200,000 salary</li>
                  <li>• Single employer focus</li>
                  <li>• Permanent employment</li>
                  <li>• PAYE with benefits</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Who Hires Part-Time CMOs?</h3>
            <ul className="space-y-3">
              <li><strong>B2B SaaS companies:</strong> Fast-growing software businesses needing demand generation and product marketing</li>
              <li><strong>Venture-backed startups:</strong> Seed to Series B companies requiring marketing strategy</li>
              <li><strong>E-commerce brands:</strong> DTC companies needing customer acquisition expertise</li>
              <li><strong>Professional services firms:</strong> Consultancies building their own marketing function</li>
              <li><strong>Companies in transition:</strong> Businesses undergoing rebrand or market expansion</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Part-Time CMO Services</h3>
            <p>Typical <strong>part-time CMO</strong> responsibilities include:</p>
            <ul className="space-y-2">
              <li><strong>Marketing Strategy:</strong> Go-to-market plans, brand positioning, growth strategies</li>
              <li><strong>Team Leadership:</strong> Managing internal teams and external agencies</li>
              <li><strong>Brand Development:</strong> Brand identity, messaging, market positioning</li>
              <li><strong>Digital Marketing:</strong> Paid acquisition, SEO, content, social media</li>
              <li><strong>Demand Generation:</strong> Lead generation systems and conversion funnels</li>
              <li><strong>Marketing Technology:</strong> Martech stack selection and implementation</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Part-Time CMO Jobs</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'B2B SaaS CMO', desc: 'Demand generation & product marketing', rate: '£900-£1,300/day' },
                { title: 'Brand CMO', desc: 'Brand building & market positioning', rate: '£850-£1,200/day' },
                { title: 'Growth CMO', desc: 'Customer acquisition & scaling', rate: '£950-£1,400/day' },
                { title: 'DTC CMO', desc: 'E-commerce & performance marketing', rate: '£800-£1,200/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-amber-600 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Part-Time CMO Salary UK</h3>
            <p>
              <strong>Part-time CMO</strong> day rates in the UK typically range from £700 to £1,400 per day. London-based roles command premium rates, with Shoreditch tech startups and City financial services firms often paying £1,000-£1,400 daily.
            </p>
            <p>
              A part-time CMO working with 2-3 clients at 2 days per week each can realistically earn £140,000-£200,000 annually. CMOs with strong B2B SaaS or DTC experience can command premium rates.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Part-Time CMO Jobs London</h3>
            <p>
              London dominates the UK market for <strong>part-time CMO jobs</strong>, with approximately 55% of all flexible marketing leadership roles based in the capital. Shoreditch and the broader Tech City area are particularly active.
            </p>
            <p>
              Manchester, Birmingham, and Bristol also have growing part-time CMO markets. Remote and hybrid arrangements are increasingly common, expanding opportunities beyond traditional geographic boundaries.
            </p>

            <div className="bg-amber-50 p-6 border border-amber-200 rounded-lg my-8 not-prose">
              <p className="text-amber-800 font-medium mb-3">Looking for fractional CMO positions?</p>
              <Link href="/fractional-cmo-jobs-uk" className="inline-flex items-center text-amber-700 font-bold hover:text-amber-900">
                Browse Fractional CMO Jobs UK →
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Remote Part-Time CMO Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Remote Work</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Remote Part-Time CMO Jobs</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p>
              <strong>Remote part-time CMO</strong> roles have grown significantly since 2020. Many companies now offer fully remote or hybrid part-time CMO positions, allowing marketing leaders to work with businesses across the UK without geographical constraints.
            </p>
            <p>
              Currently, approximately <strong>{stats.remoteCount} of our {stats.total} marketing roles</strong> offer remote or hybrid working. Filter by "Remote" in our job board to see available remote part-time CMO opportunities.
            </p>
            <div className="bg-black text-white p-6 rounded-lg my-8 not-prose">
              <p className="text-gray-300 mb-3">Browse remote CMO positions:</p>
              <Link href="/remote" className="inline-flex items-center text-amber-400 font-bold hover:text-amber-300">
                View Remote Jobs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">UK Tax</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">IR35: Inside vs Outside</h2>
            <p className="text-gray-600 mt-4">As a part-time CMO, your IR35 status significantly impacts your take-home pay</p>
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

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Part-Time CMO Jobs UK FAQ</h2>
          </div>
          <FAQ items={CMO_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Ready?</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Find Your Next<br /><span className="text-amber-400">Part-Time CMO Role</span></h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Create your profile and get matched with companies seeking part-time marketing leadership.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">Create Profile</Link>
            <Link href="/fractional-cmo-salary" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Salary Guide</Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Fractional CMO Jobs</Link>
              <Link href="/fractional-cmo-salary" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">CMO Salary Guide</Link>
              <Link href="/part-time-cfo-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Part-Time CFO Jobs</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">CTO Jobs UK</Link>
              <Link href="/fractional-coo-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">COO Jobs UK</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
