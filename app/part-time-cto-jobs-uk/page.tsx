import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createDbQuery } from '@/lib/db'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { FAQ, CTO_FAQS } from '@/components/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { DesktopOnly } from '@/components/DesktopOnly'
import { IR35Calculator } from '@/components/IR35Calculator'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CTO Jobs UK | Part-Time CTO Roles',
  description: 'Fractional CTO jobs UK - Find part-time Chief Technology Officer positions paying £850-£1,600/day. Browse live CTO roles for experienced tech leaders.',
  keywords: 'fractional cto jobs uk, fractional cto jobs, part time cto jobs, fractional cto uk, cto jobs uk, part time chief technology officer',
  openGraph: {
    title: 'Fractional CTO Jobs UK | Part-Time CTO Roles',
    description: 'Fractional CTO jobs UK - Find part-time CTO positions paying £850-£1,600/day.',
    images: ['/images/fractional-cto-jobs-uk.jpg'],
  },
}

async function getEngineeringStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Engineering'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Engineering' AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 35, remoteCount: 20 }
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true AND role_category = 'Engineering' AND company_name IS NOT NULL
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 8
    `
    return companies.map((c: any) => c.company_name)
  } catch {
    return []
  }
}

export default async function FractionalCtoJobsUkPage() {
  const [stats, companies] = await Promise.all([getEngineeringStats(), getFeaturedCompanies()])

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Hero with 3D Knowledge Graph */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CTO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-blue-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Technology Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CTO<br />
                <span className="text-blue-400">Jobs UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                <strong className="text-white">Fractional CTO jobs UK</strong> for experienced technology leaders.
                Part-time Chief Technology Officer roles paying £850-£1,600/day.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-blue-400">{stats.total}+</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Live Roles</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">£1,100</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Avg Day Rate</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">{stats.remoteCount}</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Remote</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#jobs" className="px-8 py-4 bg-blue-500 text-white font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">
                  Browse Jobs Now
                </Link>
                <Link href="/fractional-jobs-tech" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Tech Industry Jobs
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
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">How Much Can You Earn as a Fractional CTO?</h2>
          </div>
          <RoleCalculator role="cto" />
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engineering & CTO Jobs</h2>
            </div>
            <p className="text-gray-500">Pre-filtered to Engineering. Change filters to explore.</p>
          </div>
          <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-200 p-8"><div className="animate-pulse space-y-4"><div className="h-10 bg-gray-200 rounded w-1/3"></div><div className="grid grid-cols-2 gap-4"><div className="h-48 bg-gray-200 rounded"></div><div className="h-48 bg-gray-200 rounded"></div></div></div></div>}>
            <EmbeddedJobBoard defaultDepartment="Engineering" pageSlug="fractional-cto-jobs-uk" jobsPerPage={10} title="Latest Engineering & CTO Jobs" allJobsLinkText="View All Engineering Jobs" />
          </Suspense>
        </div>
      </section>

      {/* CTO Jobs Knowledge Graph - Desktop Only */}
      <DesktopOnly>
        <section className="py-16 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Interactive Network</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">CTO Jobs Knowledge Graph</h2>
              <p className="text-gray-400 mt-2">Explore CTO roles, skills, and companies in 3D</p>
            </div>
            <JobsGraph3D roleFilter="CTO" limit={25} height="500px" />
          </div>
        </section>
      </DesktopOnly>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who's Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black">Companies Seeking CTOs</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-blue-400 transition-colors cursor-default">{company}</span>
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
              Everything You Need to Know About<br /><span className="text-blue-600">Fractional CTO Jobs UK</span>
            </h2>
            <div className="w-24 h-1 bg-blue-500"></div>
          </div>
          <figure className="mb-16 -mx-6 lg:-mx-16">
            <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Fractional CTO jobs UK - technology executive reviewing code and architecture" className="w-full h-80 md:h-96 object-cover" />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">Technology leaders across the UK are embracing fractional work</figcaption>
          </figure>
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Fractional CTO jobs</strong> represent the new frontier of technology leadership. Part-time Chief Technology Officer positions where experienced leaders provide strategic technical guidance to multiple companies simultaneously—delivering world-class expertise at a fraction of the cost.
            </p>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">The Rise of Fractional CTO Jobs UK</h3>
            <p>The UK market for <strong>fractional CTO jobs UK</strong> has grown significantly, driven by non-technical founders, digital transformation initiatives, and the need for expert technical due diligence. Companies that previously couldn't afford senior tech leadership now access world-class CTOs paying £850-£1,600 per day rather than £180,000-£350,000 annually.</p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-blue-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">"Non-technical founders access CTO expertise without diluting equity or committing to £200k+ salaries."</p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Why Fractional CTO Jobs Are Booming</h3>
            <ul className="space-y-3">
              <li><strong>Non-technical founders:</strong> First-time founders need technical leadership without equity dilution</li>
              <li><strong>Digital transformation:</strong> Traditional businesses need strategic tech guidance</li>
              <li><strong>Technical due diligence:</strong> VCs require independent tech assessment</li>
              <li><strong>Team scaling:</strong> Companies need CTOs to build teams from 2 to 20+</li>
              <li><strong>Architecture decisions:</strong> Critical build vs buy decisions require experience</li>
            </ul>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Fractional CTO Jobs</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Startup CTO', desc: 'Building MVP & hiring first engineers', rate: '£1,000-£1,400/day' },
                { title: 'Scale-up CTO', desc: 'Scaling architecture & building teams', rate: '£1,100-£1,500/day' },
                { title: 'Due Diligence CTO', desc: 'Technical assessment for M&A', rate: '£1,200-£1,600/day' },
                { title: 'Transformation CTO', desc: 'Leading digital transformation', rate: '£950-£1,300/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-blue-600 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Requirements for Fractional CTO Jobs</h3>
            <ul className="space-y-2">
              <li>15+ years of software engineering experience</li>
              <li>5+ years in CTO, VP Engineering, or Technical Director roles</li>
              <li>Experience scaling engineering teams (5 to 50+)</li>
              <li>Broad technology stack knowledge</li>
              <li>Strong communication with non-technical stakeholders</li>
            </ul>
          </article>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">UK Tax</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">IR35: Inside vs Outside</h2>
            <p className="text-gray-600 mt-4">As a fractional CTO, your IR35 status significantly impacts your take-home pay</p>
          </div>
          <IR35Calculator defaultDayRate={1100} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CTO Jobs UK</h2>
          </div>
          <FAQ items={CTO_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Ready?</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Find Your Next<br /><span className="text-blue-400">Fractional CTO Role</span></h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Create your profile and get matched with companies seeking fractional technology leadership.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-blue-500 text-white font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">Create Profile</Link>
            <Link href="/fractional-jobs-tech" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Tech Jobs</Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/fractional-jobs-tech" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Tech Industry Jobs</Link>
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">CMO Jobs UK</Link>
              <Link href="/fractional-cfo-jobs-uk" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">CFO Jobs UK</Link>
              <Link href="/fractional-coo-jobs-uk" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">COO Jobs UK</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
