import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { IR35Calculator } from '@/components/IR35Calculator'
import { FAQ, HEALTHCARE_FAQS } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Healthcare - Executive Roles in HealthTech & Life Sciences',
  description: 'Find fractional executive jobs in healthcare. CFO, CMO, CTO roles in HealthTech, MedTech, and Life Sciences. £700-£1,300 daily rates. UK\'s fastest-growing sector.',
  openGraph: {
    title: 'Fractional Jobs Healthcare - Executive Roles in HealthTech & Life Sciences',
    description: 'Find fractional executive jobs in healthcare and life sciences UK.',
    type: 'website',
  },
}

const healthcareSubsectors = [
  { name: 'HealthTech', description: 'Digital health platforms', rateRange: '£800-£1,300/day', icon: '💻' },
  { name: 'MedTech', description: 'Medical devices & diagnostics', rateRange: '£750-£1,200/day', icon: '🩺' },
  { name: 'BioTech', description: 'Drug discovery & therapeutics', rateRange: '£850-£1,400/day', icon: '🧬' },
  { name: 'Pharma Services', description: 'Clinical trials & research', rateRange: '£750-£1,200/day', icon: '💊' },
  { name: 'Digital Therapeutics', description: 'Software as medical device', rateRange: '£800-£1,300/day', icon: '📱' },
  { name: 'Healthcare AI', description: 'Diagnostics & drug discovery', rateRange: '£900-£1,400/day', icon: '🤖' },
]

const healthcareRoles = [
  { icon: '💰', title: 'Fractional CFO Healthcare', rate: '£850-£1,300/day', desc: 'Fundraising, Series A-D, IPO preparation' },
  { icon: '💻', title: 'Fractional CTO HealthTech', rate: '£800-£1,300/day', desc: 'Platform architecture, regulatory tech' },
  { icon: '📢', title: 'Fractional CMO MedTech', rate: '£750-£1,200/day', desc: 'Go-to-market, clinical marketing' },
  { icon: '⚙️', title: 'Fractional COO BioTech', rate: '£800-£1,250/day', desc: 'Operations, manufacturing scale-up' },
  { icon: '🔬', title: 'Fractional CSO', rate: '£900-£1,400/day', desc: 'Scientific strategy, R&D leadership' },
  { icon: '📋', title: 'Fractional Regulatory', rate: '£800-£1,200/day', desc: 'FDA/MHRA submissions, compliance' },
]

const healthcareHubs = [
  { name: 'Cambridge', companies: '500+ life sciences', specialty: 'Biotech & Drug Discovery' },
  { name: 'Oxford', companies: '200+ companies', specialty: 'Vaccines & Therapeutics' },
  { name: 'London', companies: 'Golden Triangle', specialty: 'HealthTech & Digital Health' },
  { name: 'Manchester', companies: 'Health Innovation', specialty: 'MedTech & Diagnostics' },
]

const relatedSearches = [
  'Fractional CFO Healthcare', 'Fractional CTO HealthTech', 'MedTech Fractional CMO',
  'BioTech Fractional Executive', 'Life Sciences CFO', 'Digital Health Fractional',
  'Fractional CSO UK', 'Cambridge Fractional', 'Pharma Fractional Jobs'
]

async function getHealthcareStats() {
  try {
    const sql = createDbQuery()
    const [totalHealthcare] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (
        title ILIKE '%health%' OR title ILIKE '%med%' OR title ILIKE '%bio%' OR
        description ILIKE '%healthcare%' OR description ILIKE '%medical%' OR description ILIKE '%pharma%'
      )`
    ])

    return {
      totalHealthcare: Math.max(parseInt((totalHealthcare[0] as any)?.count || '0'), 40),
      avgDayRate: 1050
    }
  } catch (error) {
    return { totalHealthcare: 40, avgDayRate: 1050 }
  }
}

export default async function HealthcarePage() {
  const stats = await getHealthcareStats()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Healthcare" limit={30} height="100%" isHero={true} showOverlay={true} />
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

                  <span className="inline-block bg-teal-500/20 backdrop-blur text-teal-200 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                    {stats.totalHealthcare}+ Healthcare Opportunities
                  </span>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                    Fractional Jobs<br />
                    <span className="text-teal-300">Healthcare</span>
                  </h1>

                  <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                    CFO, CMO, CTO roles in HealthTech, MedTech, and Life Sciences. £700-£1,300 daily rates. The UK's fastest-growing sector.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/fractional-jobs?industry=Healthcare"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-all duration-200"
                    >
                      Browse Healthcare Jobs →
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
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">£8bn+</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">UK Life Sciences</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">£{stats.avgDayRate}</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Avg Day Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">+35%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">YoY Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">6k+</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Companies</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthcare Fractional Jobs</h2>
            <p className="text-xl text-gray-500">Browse {stats.totalHealthcare}+ opportunities in life sciences</p>
          </div>
          <EmbeddedJobBoard />
        </div>
      </section>

      {/* Healthcare Subsectors */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Sector</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthcare Subsectors</h2>
            <p className="text-xl text-gray-500">High-growth areas hiring fractional executives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthcareSubsectors.map((sector) => (
              <div key={sector.name} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                <span className="text-4xl mb-4 block">{sector.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{sector.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{sector.description}</p>
                <p className="text-teal-700 font-semibold">{sector.rateRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Roles */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Role</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Healthcare Roles</h2>
            <p className="text-xl text-gray-500">Most in-demand fractional positions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthcareRoles.map((role) => (
              <div key={role.title} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all">
                <span className="text-4xl mb-4 block">{role.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{role.desc}</p>
                <p className="text-teal-700 font-semibold">{role.rate}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Hubs */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Location</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">UK Healthcare Hubs</h2>
            <p className="text-xl text-gray-500">Where the opportunities are</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthcareHubs.map((hub) => (
              <Link key={hub.name} href={`/fractional-jobs-${hub.name.toLowerCase()}`} className="group">
                <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors mb-2">
                    {hub.name}
                  </h3>
                  <p className="text-teal-700 font-semibold text-sm mb-2">{hub.companies}</p>
                  <p className="text-gray-600 text-sm">{hub.specialty}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Healthcare */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">The Opportunity</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Healthcare?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Massive Growth</h3>
              <p className="text-gray-600">
                UK life sciences has seen record investment of £8bn+ annually. HealthTech alone has grown 35% YoY, creating exceptional demand for experienced leadership.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💷</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Rates</h3>
              <p className="text-gray-600">
                Healthcare fractional roles command premium rates of £700-£1,400/day due to specialist knowledge requirements in regulatory, clinical, and technical domains.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect Fit</h3>
              <p className="text-gray-600">
                Healthcare companies often need senior expertise for specific phases - fundraising, regulatory approval, commercial launch - making fractional arrangements ideal.
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
            <p className="text-xl text-gray-500">Understand your take-home as a healthcare fractional executive</p>
          </div>
          <IR35Calculator defaultDayRate={1050} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthcare Fractional FAQs</h2>
            <p className="text-xl text-gray-500">Common questions about fractional work in healthcare</p>
          </div>
          <FAQ items={HEALTHCARE_FAQS} title="" />
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
                className="px-4 py-2 bg-gray-50 rounded-full text-gray-700 hover:bg-teal-100 hover:text-teal-700 transition-colors text-sm border border-gray-200"
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
            Ready for Healthcare Leadership?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            {stats.totalHealthcare}+ fractional opportunities in the UK's fastest-growing sector
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fractional-jobs?industry=Healthcare"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all"
            >
              Browse Healthcare Jobs
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
