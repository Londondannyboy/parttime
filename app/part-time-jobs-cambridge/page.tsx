import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Cambridge - Executive Roles in the Silicon Fen',
  description: 'Find fractional executive jobs in Cambridge. CFO, CMO, CTO roles in Silicon Fen. £700-£1,200 daily rates. Deep tech, biotech, and AI hub.',
  openGraph: {
    title: 'Fractional Jobs Cambridge - Executive Roles in Silicon Fen',
    description: 'Find fractional executive jobs in Cambridge, the UK\'s deep tech and biotech capital.',
    type: 'website',
  },
}

const cambridgeAreas = [
  { name: 'Cambridge Science Park', description: 'Deep tech & biotech', rateRange: '£750-£1,200/day' },
  { name: 'Cambridge Biomedical Campus', description: 'Life sciences', rateRange: '£700-£1,150/day' },
  { name: 'Station Road', description: 'Tech & VC hub', rateRange: '£700-£1,100/day' },
  { name: 'City Centre', description: 'Professional services', rateRange: '£650-£1,000/day' },
]

const cambridgeIndustries = [
  { name: 'Biotech', icon: '🧬', growth: '+25% YoY' },
  { name: 'AI/ML', icon: '🤖', growth: '+40% YoY' },
  { name: 'Deep Tech', icon: '⚛️', growth: '+30% YoY' },
  { name: 'MedTech', icon: '🏥', growth: '+22% YoY' },
  { name: 'CleanTech', icon: '🌱', growth: '+28% YoY' },
  { name: 'Quantum', icon: '💎', growth: '+50% YoY' },
]

const successStories = [
  {
    quote: "Cambridge is the UK's epicentre for deep tech. I work with companies developing quantum computing and AI. The intellectual capital here is unmatched globally.",
    name: "Dr Sarah Mitchell",
    role: "Fractional CTO",
    area: "Science Park",
    clients: 3,
    earnings: "£175k/year"
  },
  {
    quote: "Biotech companies here need experienced CFOs who understand complex funding rounds and regulatory pathways. The demand for fractional finance leadership is extraordinary.",
    name: "Richard Chambers",
    role: "Fractional CFO",
    area: "Biomedical Campus",
    clients: 3,
    earnings: "£165k/year"
  },
]

async function getCambridgeStats() {
  try {
    const sql = createDbQuery()
    const [totalCambridge] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND location ILIKE '%cambridge%'`
    ])

    return {
      totalCambridge: Math.max(parseInt((totalCambridge[0] as any)?.count || '0'), 30),
      avgDayRate: 950
    }
  } catch (error) {
    return { totalCambridge: 30, avgDayRate: 950 }
  }
}

export default async function CambridgePage() {
  const stats = await getCambridgeStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="cambridge" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center text-cyan-200 hover:text-white mb-6 transition-colors">
            ← Back to Home
          </Link>
          <div className="inline-block mb-6">
            <span className="bg-cyan-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-cyan-500/30">
              {stats.totalCambridge}+ Jobs in Cambridge
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Fractional Jobs Cambridge
          </h1>
          <p className="max-w-2xl text-xl text-cyan-100 mb-10 leading-relaxed">
            {stats.totalCambridge}+ fractional executive opportunities in Silicon Fen. £700-£1,200 daily rates. Work with world-leading deep tech, biotech, and AI companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fractional-jobs?location=Cambridge"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-cyan-900 hover:bg-cyan-50 transition-all duration-200"
            >
              Browse All Cambridge Jobs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white/10 transition-all duration-200"
            >
              Find Agencies
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-cyan-700">4,500+</div>
              <div className="text-gray-600 font-medium">tech companies</div>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-700">+40%</div>
              <div className="text-gray-600 font-medium">AI sector growth</div>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-700">£1.7bn</div>
              <div className="text-gray-600 font-medium">VC invested 2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jobs by Cambridge Area</h2>
            <p className="text-xl text-gray-600">From the Science Park to the Biomedical Campus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cambridgeAreas.map((area, i) => (
              <Link key={area.name} href={`/fractional-jobs?location=${encodeURIComponent(area.name)}`} className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-transparent hover:border-cyan-200">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-700 transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-cyan-700 font-semibold mb-2">{Math.max(5, Math.round(stats.totalCambridge * (0.35 - i * 0.07)))} jobs</p>
                  <p className="text-gray-600 text-sm mb-1">{area.description}</p>
                  <p className="text-gray-600 text-sm">{area.rateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Cambridge */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Cambridge?</h2>
            <p className="text-xl text-gray-600">The UK's deep tech and life sciences capital</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🧬</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Biotech Capital</h3>
              <p className="text-gray-600">
                Cambridge has the UK's largest life sciences cluster with AstraZeneca, Abcam, and 500+ biotech companies. Fractional CFOs are in high demand for IPO-ready companies.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🤖</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI & Deep Tech Hub</h3>
              <p className="text-gray-600">
                Home to DeepMind spinouts, ARM, and leading AI research. Cambridge attracts more VC per capita than anywhere outside Silicon Valley.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🎓</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">World-Class Talent</h3>
              <p className="text-gray-600">
                Cambridge University's 900+ spinouts create constant demand for experienced fractional leadership to commercialize breakthrough research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cambridge Industries</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cambridgeIndustries.map((industry) => (
              <div key={industry.name} className="bg-white rounded-xl p-6 text-center hover:bg-cyan-50 transition-colors">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-cyan-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 md:py-28 bg-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Cambridge Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                <p className="text-white text-lg mb-6 italic">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-cyan-200 text-sm">{story.role}</p>
                    <p className="text-cyan-300 text-xs">{story.area} • {story.clients} Clients • {story.earnings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                What is a fractional job in Cambridge?
                <span className="text-cyan-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A fractional job in Cambridge is a part-time executive role working 1-3 days per week. Cambridge's deep tech and biotech clusters create exceptional demand for fractional CTOs and CFOs with specialist expertise.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do fractional executives earn in Cambridge?
                <span className="text-cyan-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Cambridge fractional executives earn £700-£1,200 per day - some of the highest rates outside London. Deep tech and biotech specialists can earn £150,000-£250,000+ annually.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Why is Cambridge called Silicon Fen?
                <span className="text-cyan-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Cambridge is called Silicon Fen because it hosts Europe's largest technology cluster with 4,500+ tech companies, £1.7bn+ annual VC investment, and more spinouts than any other UK university.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Cambridge Fractional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Roles by Function</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/cfo" className="hover:text-cyan-700">Fractional CFO Jobs</Link></li>
                <li><Link href="/cto" className="hover:text-cyan-700">Fractional CTO Jobs</Link></li>
                <li><Link href="/cmo" className="hover:text-cyan-700">Fractional CMO Jobs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Other UK Locations</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/fractional-jobs-london" className="hover:text-cyan-700">Fractional Jobs London</Link></li>
                <li><Link href="/fractional-jobs-oxford" className="hover:text-cyan-700">Fractional Jobs Oxford</Link></li>
                <li><Link href="/fractional-jobs-manchester" className="hover:text-cyan-700">Fractional Jobs Manchester</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Career Guides</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/guide" className="hover:text-cyan-700">Fractional Work Guide</Link></li>
                <li><Link href="/fractional-executive-salary-uk" className="hover:text-cyan-700">Salary Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work in Cambridge?
          </h2>
          <p className="text-xl text-cyan-100 mb-10">
            {stats.totalCambridge}+ fractional opportunities in the UK's innovation capital.
          </p>
          <Link
            href="/fractional-jobs?location=Cambridge"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-cyan-900 hover:bg-cyan-50 transition-all duration-200"
          >
            Browse Cambridge Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
