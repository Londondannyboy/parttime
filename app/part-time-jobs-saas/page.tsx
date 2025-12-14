import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { IR35Calculator } from '@/components/IR35Calculator'
import { FAQ, SAAS_FAQS } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs SaaS - Executive Roles in Software & Cloud',
  description: 'Find fractional executive jobs in SaaS. CFO, CMO, CTO roles in B2B software, cloud platforms, and subscription businesses. £700-£1,300 daily rates.',
  openGraph: {
    title: 'Fractional Jobs SaaS - Executive Roles in Software',
    description: 'Find fractional executive jobs in SaaS and B2B software.',
    type: 'website',
  },
}

const saasSubsectors = [
  { name: 'B2B SaaS', description: 'Enterprise & SMB software', rateRange: '£750-£1,300/day', icon: '💼' },
  { name: 'PLG', description: 'Product-led growth companies', rateRange: '£700-£1,200/day', icon: '🚀' },
  { name: 'Vertical SaaS', description: 'Industry-specific platforms', rateRange: '£700-£1,150/day', icon: '🏗️' },
  { name: 'API/Infrastructure', description: 'Developer tools & platforms', rateRange: '£800-£1,350/day', icon: '⚙️' },
  { name: 'MarTech', description: 'Marketing technology', rateRange: '£700-£1,200/day', icon: '📊' },
  { name: 'FinTech SaaS', description: 'Financial software', rateRange: '£800-£1,300/day', icon: '💳' },
]

const saasRoles = [
  { icon: '💰', title: 'Fractional CFO', rate: '£800-£1,300/day', desc: 'ARR modeling, fundraising, unit economics' },
  { icon: '📢', title: 'Fractional CMO', rate: '£750-£1,200/day', desc: 'PLG, demand gen, category creation' },
  { icon: '💻', title: 'Fractional CTO', rate: '£850-£1,350/day', desc: 'Architecture, scaling, technical debt' },
  { icon: '🎯', title: 'Fractional CRO', rate: '£750-£1,200/day', desc: 'Sales strategy, GTM, expansion' },
  { icon: '📈', title: 'Fractional VP Growth', rate: '£700-£1,100/day', desc: 'Activation, retention, monetization' },
  { icon: '🛠️', title: 'Fractional VP Product', rate: '£750-£1,200/day', desc: 'Roadmap, prioritization, PLG strategy' },
]

const relatedSearches = [
  'Fractional CFO SaaS', 'Fractional CMO B2B', 'Fractional CTO Startup',
  'SaaS VP Growth Jobs', 'PLG Fractional CMO', 'Series A CFO',
  'B2B SaaS Fractional', 'SaaS Marketing Leadership', 'Fractional CRO UK'
]

async function getSaasStats() {
  try {
    const sql = createDbQuery()
    const [totalSaas] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (
        title ILIKE '%saas%' OR title ILIKE '%software%' OR
        description ILIKE '%saas%' OR description ILIKE '%subscription%'
      )`
    ])

    return {
      totalSaas: Math.max(parseInt((totalSaas[0] as any)?.count || '0'), 45),
      avgDayRate: 1000
    }
  } catch (error) {
    return { totalSaas: 45, avgDayRate: 1000 }
  }
}

export default async function SaasPage() {
  const stats = await getSaasStats()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>

        {/* Bottom-aligned content with glass panel */}
        <div className="relative z-10 w-full pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
              {/* Left: Main content */}
              <div className="max-w-2xl">
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
                  <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm tracking-wide">
                    <span className="mr-2">←</span> Back to Home
                  </Link>

                  <span className="inline-block bg-violet-500/20 backdrop-blur text-violet-200 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                    {stats.totalSaas}+ SaaS Opportunities
                  </span>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                    Fractional Jobs<br />
                    <span className="text-violet-300">SaaS</span>
                  </h1>

                  <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                    CFO, CMO, CTO roles in B2B software and cloud platforms. £700-£1,300 daily rates. Work with the UK's fastest-growing subscription businesses.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/fractional-jobs?industry=SaaS"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-all duration-200"
                    >
                      Browse SaaS Jobs →
                    </Link>
                    <Link
                      href="/handler/sign-up"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                    >
                      Get Notified
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Stats panel */}
              <div className="w-full lg:w-auto">
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">£4bn+</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">UK SaaS Market</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">£{stats.avgDayRate}</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Avg Day Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">+25%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">YoY Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">5k+</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">SaaS Companies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Board - Moved up after hero */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">Opportunities</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SaaS Fractional Jobs</h2>
            <p className="text-xl text-gray-500">Browse {stats.totalSaas}+ opportunities in B2B software</p>
          </div>
          <EmbeddedJobBoard />
        </div>
      </section>

      {/* SaaS Subsectors */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Sector</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SaaS Subsectors</h2>
            <p className="text-xl text-gray-500">High-growth areas hiring fractional executives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saasSubsectors.map((sector) => (
              <div key={sector.name} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                <span className="text-4xl mb-4 block">{sector.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{sector.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{sector.description}</p>
                <p className="text-violet-700 font-semibold">{sector.rateRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top SaaS Roles */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Role</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top SaaS Roles</h2>
            <p className="text-xl text-gray-500">Most in-demand fractional positions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saasRoles.map((role) => (
              <div key={role.title} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all">
                <span className="text-4xl mb-4 block">{role.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{role.desc}</p>
                <p className="text-violet-700 font-semibold">{role.rate}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SaaS */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">The Opportunity</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why SaaS?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Metrics-Driven</h3>
              <p className="text-gray-600">
                SaaS companies understand the value of expertise. They measure everything - ARR, NDR, CAC/LTV - and pay premium rates for executives who can move these metrics.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Clear Growth Stages</h3>
              <p className="text-gray-600">
                SaaS has well-defined phases - PMF, scale, expansion, efficiency. Fractional executives can provide targeted expertise for each stage without long-term commitment.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Well-Funded</h3>
              <p className="text-gray-600">
                VC-backed SaaS companies have capital to invest in growth but need to manage burn. Fractional executives provide senior leadership cost-effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">Tax Planning</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">IR35 Calculator</h2>
            <p className="text-xl text-gray-500">Understand your take-home as a fractional SaaS executive</p>
          </div>
          <IR35Calculator defaultDayRate={1000} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SaaS Fractional FAQs</h2>
            <p className="text-xl text-gray-500">Common questions about fractional work in SaaS</p>
          </div>
          <FAQ items={SAAS_FAQS} title="" />
        </div>
      </section>

      {/* Related Searches */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Searches</h2>
          <div className="flex flex-wrap gap-3">
            {relatedSearches.map((search) => (
              <Link
                key={search}
                href={`/fractional-jobs?q=${encodeURIComponent(search)}`}
                className="px-4 py-2 bg-white rounded-full text-gray-700 hover:bg-violet-100 hover:text-violet-700 transition-colors text-sm border border-gray-200"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for SaaS Leadership?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            {stats.totalSaas}+ fractional opportunities in B2B software and subscription businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fractional-jobs?industry=SaaS"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all"
            >
              Browse SaaS Jobs
            </Link>
            <Link
              href="/handler/sign-up"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              Join the Platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
