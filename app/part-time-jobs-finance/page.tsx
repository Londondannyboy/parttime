import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { IR35Calculator } from '@/components/IR35Calculator'
import { FAQ, FINANCE_FAQS } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Finance Jobs UK - CFO, FD, Finance Director Roles',
  description: 'Find fractional finance jobs in the UK. Fractional CFO, Finance Director, FD roles. £800-£1,400 daily rates. PE-backed, startups, and SMEs.',
  openGraph: {
    title: 'Fractional Finance Jobs UK - CFO, FD, Finance Director Roles',
    description: 'Find fractional finance leadership roles across the UK.',
    type: 'website',
  },
}

const financeRoles = [
  { name: 'Fractional CFO', description: 'Strategic finance leadership', rateRange: '£900-£1,400/day', demand: 'Very High' },
  { name: 'Fractional Finance Director', description: 'Financial operations & reporting', rateRange: '£750-£1,100/day', demand: 'High' },
  { name: 'Fractional FP&A Director', description: 'Financial planning & analysis', rateRange: '£700-£1,000/day', demand: 'High' },
  { name: 'Fractional Controller', description: 'Accounting & controls', rateRange: '£600-£900/day', demand: 'Medium' },
  { name: 'Fractional Treasury Director', description: 'Cash & risk management', rateRange: '£800-£1,200/day', demand: 'Growing' },
  { name: 'Fractional M&A Director', description: 'Deals & transactions', rateRange: '£1,000-£1,500/day', demand: 'High' },
]

const financeSectors = [
  { name: 'PE-Backed', icon: '📈', growth: '+30% YoY', description: 'Private equity portfolio' },
  { name: 'Scale-ups', icon: '🚀', growth: '+25% YoY', description: 'Series A-C companies' },
  { name: 'SMEs', icon: '🏢', growth: '+15% YoY', description: 'Established SMEs' },
  { name: 'FinTech', icon: '💳', growth: '+28% YoY', description: 'Financial technology' },
  { name: 'E-commerce', icon: '🛒', growth: '+20% YoY', description: 'Online retail' },
  { name: 'SaaS', icon: '☁️', growth: '+22% YoY', description: 'Software companies' },
]

const financeSkills = [
  'Fundraising & Investor Relations', 'Board Reporting', 'Financial Modelling',
  'M&A & Due Diligence', 'Cash Flow Management', 'ERP Implementation',
  'PE/VC Reporting', 'IPO Preparation', 'International Finance'
]

const relatedSearches = [
  'Fractional CFO Jobs UK', 'Fractional Finance Director', 'Part-Time CFO London',
  'Fractional FD Jobs', 'PE Backed Fractional CFO', 'Startup CFO Jobs',
  'Fractional CFO Day Rate', 'Fractional Finance Jobs Remote', 'SaaS Fractional CFO'
]

async function getFinanceStats() {
  try {
    const sql = createDbQuery()
    const [total, avgRateResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (role_category ILIKE '%CFO%' OR role_category ILIKE '%finance%' OR title ILIKE '%CFO%' OR title ILIKE '%finance%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS INTEGER)) as avg FROM jobs WHERE is_active = true AND (role_category ILIKE '%CFO%' OR role_category ILIKE '%finance%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`
    ])
    return {
      total: parseInt((total[0] as any)?.count || '0'),
      avgDayRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '1050'))
    }
  } catch (error) {
    return { total: 60, avgDayRate: 1050 }
  }
}

export default async function FinanceJobsPage() {
  const stats = await getFinanceStats()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Finance" limit={30} height="100%" isHero={true} showOverlay={true} />
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

                  <span className="inline-block bg-emerald-500/20 backdrop-blur text-emerald-200 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                    {stats.total}+ Finance Leadership Roles
                  </span>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                    Fractional<br />
                    <span className="text-emerald-300">Finance</span> Jobs UK
                  </h1>

                  <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                    Fractional CFO, Finance Director, FD positions. £800-£1,400 daily rates across PE-backed companies, startups, and SMEs.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/fractional-jobs?industry=Financial Services"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-all duration-200"
                    >
                      Browse Finance Jobs →
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
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">35%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">of All Roles</div>
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
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">45%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">PE-Backed</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fractional Finance Jobs</h2>
            <p className="text-xl text-gray-500">Browse {stats.total}+ finance leadership opportunities</p>
          </div>
          <EmbeddedJobBoard defaultDepartment="Finance" />
        </div>
      </section>

      {/* Finance Roles */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Role</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fractional Finance Roles</h2>
            <p className="text-xl text-gray-500">Finance leadership positions available</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeRoles.map((role) => (
              <div key={role.name} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{role.description}</p>
                <p className="text-emerald-700 font-semibold mb-1">{role.rateRange}</p>
                <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Demand: {role.demand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Sector</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sectors Hiring Finance Leaders</h2>
            <p className="text-xl text-gray-500">Company types with highest demand</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {financeSectors.map((sector) => (
              <div key={sector.name} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-all">
                <span className="text-4xl mb-3 block">{sector.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{sector.name}</h3>
                <p className="text-emerald-700 text-sm font-semibold mb-1">{sector.growth}</p>
                <p className="text-gray-600 text-xs">{sector.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Skills */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">Skills</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">In-Demand Finance Skills</h2>
            <p className="text-xl text-gray-500">Skills that command premium rates</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {financeSkills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-gray-50 rounded-full text-gray-700 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Finance */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">The Opportunity</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Fractional CFO?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">PE/VC Demand</h3>
              <p className="text-gray-600">
                45% of fractional CFO roles are with PE-backed companies. Investors demand senior finance expertise their portfolio companies can't afford full-time.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Highest Demand</h3>
              <p className="text-gray-600">
                CFO/Finance Director is the most common fractional role, accounting for 35% of all positions. Every growing company needs financial leadership.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Clear Value</h3>
              <p className="text-gray-600">
                Fractional CFOs deliver measurable ROI - improved cash flow, successful fundraises, and exit readiness. Value is easy to demonstrate.
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
            <p className="text-xl text-gray-500">Understand your take-home as a fractional finance leader</p>
          </div>
          <IR35Calculator defaultDayRate={1050} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Finance Fractional FAQs</h2>
            <p className="text-xl text-gray-500">Common questions about fractional finance roles</p>
          </div>
          <FAQ items={FINANCE_FAQS} title="" />
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
                className="px-4 py-2 bg-gray-50 rounded-full text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors text-sm border border-gray-200"
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
            Ready for Fractional Finance Leadership?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            {stats.total}+ CFO, Finance Director, and FD opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fractional-jobs?role=CFO"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all"
            >
              Browse Finance Jobs
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
