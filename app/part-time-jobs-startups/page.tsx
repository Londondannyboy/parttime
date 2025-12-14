import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { IR35Calculator } from '@/components/IR35Calculator'
import { FAQ, STARTUPS_FAQS } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs for Startups UK - CFO, CTO, CMO for Scale-ups',
  description: 'Find fractional executive jobs at startups and scale-ups. Fractional CFO, CTO, CMO for Series A-C companies. £800-£1,300 daily rates. Equity options available.',
  openGraph: {
    title: 'Fractional Jobs for Startups UK - CFO, CTO, CMO for Scale-ups',
    description: 'Find fractional executive jobs at UK startups and scale-ups.',
    type: 'website',
  },
}

const startupStages = [
  { name: 'Pre-Seed/Seed', description: 'Early stage, product-market fit', rateRange: '£600-£900/day', equity: 'Often 0.5-2%' },
  { name: 'Series A', description: 'Growth stage, scaling team', rateRange: '£800-£1,100/day', equity: 'Sometimes 0.25-1%' },
  { name: 'Series B', description: 'Rapid scaling, expansion', rateRange: '£900-£1,200/day', equity: 'Rarely' },
  { name: 'Series C+', description: 'Pre-IPO/exit preparation', rateRange: '£1,000-£1,400/day', equity: 'Rarely' },
  { name: 'PE-Backed', description: 'Portfolio company support', rateRange: '£900-£1,300/day', equity: 'Sometimes' },
  { name: 'Bootstrapped', description: 'Profitable, no external funding', rateRange: '£700-£1,000/day', equity: 'Sometimes' },
]

const startupRoles = [
  { name: 'Fractional CFO', icon: '💰', description: 'Fundraising, board reporting, finance ops' },
  { name: 'Fractional CTO', icon: '💻', description: 'Tech strategy, team building, architecture' },
  { name: 'Fractional CMO', icon: '📢', description: 'Growth marketing, brand, demand gen' },
  { name: 'Fractional COO', icon: '⚙️', description: 'Operations, scaling, process design' },
  { name: 'Fractional CPO', icon: '🎯', description: 'Product strategy, roadmap, user research' },
  { name: 'Fractional CHRO', icon: '👥', description: 'People ops, culture, hiring strategy' },
]

const startupSectors = [
  { name: 'FinTech', icon: '💳', count: '45+ roles' },
  { name: 'HealthTech', icon: '🏥', count: '30+ roles' },
  { name: 'SaaS/B2B', icon: '☁️', count: '55+ roles' },
  { name: 'E-commerce/D2C', icon: '🛒', count: '25+ roles' },
  { name: 'CleanTech', icon: '🌱', count: '20+ roles' },
  { name: 'EdTech', icon: '📚', count: '15+ roles' },
]

const relatedSearches = [
  'Fractional CFO Startups', 'Fractional CTO Scale-up', 'Startup CMO Jobs',
  'Series A Fractional Executive', 'PE Backed Fractional CFO', 'VC Portfolio Fractional',
  'Fractional Executive Equity', 'Part-Time CTO Startup', 'Scale-up CFO Jobs'
]

async function getStartupStats() {
  try {
    const sql = createDbQuery()
    const [total, avgRateResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (company_name ILIKE '%startup%' OR description_snippet ILIKE '%series%' OR description_snippet ILIKE '%scale-up%' OR description_snippet ILIKE '%venture%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS INTEGER)) as avg FROM jobs WHERE is_active = true AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`
    ])
    return {
      total: Math.max(parseInt((total[0] as any)?.count || '0'), 80),
      avgDayRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '950'))
    }
  } catch (error) {
    return { total: 80, avgDayRate: 950 }
  }
}

export default async function StartupJobsPage() {
  const stats = await getStartupStats()

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

                  <span className="inline-block bg-orange-500/20 backdrop-blur text-orange-200 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                    {stats.total}+ Startup & Scale-up Roles
                  </span>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                    Fractional Jobs<br />
                    <span className="text-orange-300">Startups</span>
                  </h1>

                  <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                    Fractional CFO, CTO, CMO for Series A-C companies. £800-£1,300 daily rates plus potential equity. Join high-growth companies.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/fractional-jobs?industry=Startups"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-all duration-200"
                    >
                      Browse Startup Jobs →
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
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">60%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">At Startups</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">£{stats.avgDayRate}</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Avg Day Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">25%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Offer Equity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">70%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Remote-Friendly</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Startup Fractional Jobs</h2>
            <p className="text-xl text-gray-500">Browse {stats.total}+ opportunities at startups and scale-ups</p>
          </div>
          <EmbeddedJobBoard />
        </div>
      </section>

      {/* Startup Stages */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Stage</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Roles by Company Stage</h2>
            <p className="text-xl text-gray-500">Find opportunities at your preferred stage</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startupStages.map((stage) => (
              <div key={stage.name} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stage.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{stage.description}</p>
                <p className="text-orange-600 font-semibold mb-1">{stage.rateRange}</p>
                <p className="text-gray-600 text-sm">Equity: {stage.equity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Roles */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Role</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fractional Roles at Startups</h2>
            <p className="text-xl text-gray-500">Executive positions startups need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {startupRoles.map((role) => (
              <div key={role.name} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all">
                <span className="text-4xl mb-3 block">{role.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{role.name}</h3>
                <p className="text-gray-600 text-xs">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Sectors */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Sector</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Startup Sectors Hiring</h2>
            <p className="text-xl text-gray-500">High-growth industries</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {startupSectors.map((sector) => (
              <div key={sector.name} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
                <span className="text-4xl mb-3 block">{sector.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{sector.name}</h3>
                <p className="text-orange-600 text-sm font-semibold">{sector.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Startups */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">The Opportunity</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work with Startups?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Equity Upside</h3>
              <p className="text-gray-600">
                25% of startup fractional roles include equity. A successful exit could multiply your earnings significantly beyond day rates.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">High Impact</h3>
              <p className="text-gray-600">
                Shape strategy and build from scratch. Your decisions directly impact company trajectory. More autonomy than corporate roles.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast-Paced</h3>
              <p className="text-gray-600">
                Move quickly, learn constantly. Work with ambitious founders and talented teams building the next generation of companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">Tax Planning</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">IR35 Calculator</h2>
            <p className="text-xl text-gray-500">Understand your take-home as a fractional at a startup</p>
          </div>
          <IR35Calculator defaultDayRate={950} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Startup Fractional FAQs</h2>
            <p className="text-xl text-gray-500">Common questions about fractional work at startups</p>
          </div>
          <FAQ items={STARTUPS_FAQS} title="" />
        </div>
      </section>

      {/* Related Searches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Searches</h2>
          <div className="flex flex-wrap gap-3">
            {relatedSearches.map((search) => (
              <Link
                key={search}
                href={`/fractional-jobs?q=${encodeURIComponent(search)}`}
                className="px-4 py-2 bg-gray-50 rounded-full text-gray-700 hover:bg-orange-100 hover:text-orange-700 transition-colors text-sm border border-gray-200"
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
            Ready to Join a Startup?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            {stats.total}+ fractional opportunities at startups and scale-ups
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fractional-jobs"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all"
            >
              Browse Startup Jobs
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
