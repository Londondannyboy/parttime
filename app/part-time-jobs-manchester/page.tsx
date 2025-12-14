import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { IR35Calculator } from '@/components/IR35Calculator'
import { FAQ, MANCHESTER_FAQS } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Manchester - Executive Roles in the North West',
  description: 'Find fractional executive jobs in Manchester. CFO, CMO, CTO roles across Greater Manchester. £700-£1,200 daily rates. Tech, media, and finance hub.',
  openGraph: {
    title: 'Fractional Jobs Manchester - Executive Roles in the North West',
    description: 'Find fractional executive jobs in Manchester and Greater Manchester.',
    type: 'website',
  },
}

const manchesterAreas = [
  { name: 'Manchester City Centre', description: 'Professional services & FinTech', rateRange: '£750-£1,200/day' },
  { name: 'MediaCityUK/Salford', description: 'Media & broadcasting', rateRange: '£700-£1,100/day' },
  { name: 'Spinningfields', description: 'Financial & legal services', rateRange: '£800-£1,200/day' },
  { name: 'Northern Quarter', description: 'Creative & digital', rateRange: '£650-£1,000/day' },
  { name: 'Airport City', description: 'Corporate & logistics', rateRange: '£700-£1,050/day' },
  { name: 'Liverpool', description: 'Maritime & creative', rateRange: '£650-£1,000/day' },
]

const manchesterIndustries = [
  { name: 'Tech/Digital', icon: '💻', growth: '+25% YoY' },
  { name: 'Media', icon: '📺', growth: '+18% YoY' },
  { name: 'FinTech', icon: '💳', growth: '+20% YoY' },
  { name: 'E-commerce', icon: '🛒', growth: '+22% YoY' },
  { name: 'Healthcare', icon: '🏥', growth: '+15% YoY' },
  { name: 'Manufacturing', icon: '🏭', growth: '+8% YoY' },
]

const relatedSearches = [
  'Fractional CFO Jobs Manchester', 'Fractional CTO Jobs Manchester', 'Fractional CMO Jobs North West',
  'Part-Time CFO Manchester', 'Interim Executive Manchester', 'Portfolio Career Manchester',
  'Fractional Jobs MediaCity', 'Fractional Jobs Liverpool', 'Fractional Executive Salary Manchester'
]

async function getManchesterStats() {
  try {
    const sql = createDbQuery()
    const [total, avgRateResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (location ILIKE '%manchester%' OR location ILIKE '%north west%' OR location ILIKE '%liverpool%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS INTEGER)) as avg FROM jobs WHERE is_active = true AND (location ILIKE '%manchester%' OR location ILIKE '%north west%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`
    ])
    return {
      total: parseInt((total[0] as any)?.count || '0'),
      avgDayRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '900'))
    }
  } catch (error) {
    return { total: 30, avgDayRate: 900 }
  }
}

export default async function ManchesterPage() {
  const stats = await getManchesterStats()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="manchester" limit={30} height="100%" isHero={true} showOverlay={true} />
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

                  <span className="inline-block bg-white/10 backdrop-blur text-white/90 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                    {stats.total}+ Live Opportunities
                  </span>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                    Fractional Jobs<br />
                    <span className="text-white/90">Manchester</span>
                  </h1>

                  <img
                    src="/images/fractional-jobs-manchester.svg"
                    alt="Fractional Jobs Manchester - Executive recruitment opportunities in the North West"
                    className="hidden"
                    width={1}
                    height={1}
                  />

                  <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                    CFO, CMO, CTO roles across Greater Manchester. £700-£1,200 daily rates. The UK's fastest-growing tech hub outside London.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/fractional-jobs?location=Manchester"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-all duration-200"
                    >
                      Browse Manchester Jobs →
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
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">12%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">UK Market Share</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">£{stats.avgDayRate}</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Avg Day Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">3rd</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">UK Market</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">+25%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">YoY Growth</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Manchester Fractional Jobs</h2>
            <p className="text-xl text-gray-500">Browse {stats.total}+ live opportunities in Greater Manchester</p>
          </div>
          <EmbeddedJobBoard defaultLocation="Manchester" />
        </div>
      </section>

      {/* Areas */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fractional Jobs Manchester by Area</h2>
            <p className="text-xl text-gray-600">Find fractional roles from the City to MediaCity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manchesterAreas.map((area) => (
              <div key={area.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-gray-600 text-sm mb-1">{area.description}</p>
                <p className="text-purple-700 font-semibold">{area.rateRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Manchester Industries</h2>
            <p className="text-xl text-gray-600">Key sectors hiring fractional executives</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {manchesterIndustries.map((industry) => (
              <div key={industry.name} className="bg-gray-50 rounded-xl p-6 text-center">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-purple-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Manchester */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Manchester?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tech Powerhouse</h3>
              <p className="text-gray-600">
                Manchester has the UK's largest tech ecosystem outside London. 25% YoY growth in fractional tech roles.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">📺</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Media Capital</h3>
              <p className="text-gray-600">
                MediaCityUK hosts BBC, ITV, and dozens of production companies. Perfect for fractional CMOs in media.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connected City</h3>
              <p className="text-gray-600">
                2hr to London, excellent Northern connections. Work with clients across the UK from Manchester.
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
            <p className="text-xl text-gray-500">Understand your take-home as a fractional executive in Manchester</p>
          </div>
          <IR35Calculator defaultDayRate={900} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-xl text-gray-500">About fractional work in Manchester</p>
          </div>
          <FAQ items={MANCHESTER_FAQS} title="" />
        </div>
      </section>

      {/* Related Searches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Searches</h2>
          <div className="flex flex-wrap gap-3">
            {relatedSearches.map((search) => (
              <Link
                key={search}
                href={`/fractional-jobs?q=${encodeURIComponent(search)}`}
                className="px-4 py-2 bg-gray-50 rounded-full text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors text-sm"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work in Manchester?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            {stats.total}+ fractional opportunities across Manchester, MediaCity, and Liverpool
          </p>
          <Link
            href="/fractional-jobs?location=Manchester"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-purple-900 hover:bg-purple-50 transition-all"
          >
            Browse Manchester Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
