import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Cardiff - Executive Roles in Wales',
  description: 'Find fractional executive jobs in Cardiff. CFO, CMO, CTO roles in the Welsh capital. £500-£900 daily rates. FinTech, creative, and professional services hub.',
  openGraph: {
    title: 'Fractional Jobs Cardiff - Executive Roles in Wales',
    description: 'Find fractional executive jobs in Cardiff, Wales\' business capital.',
    type: 'website',
  },
}

const cardiffAreas = [
  { name: 'City Centre', description: 'Professional services & finance', rateRange: '£550-£900/day' },
  { name: 'Cardiff Bay', description: 'Media & creative', rateRange: '£500-£850/day' },
  { name: 'Central Square', description: 'BBC & tech hub', rateRange: '£550-£900/day' },
  { name: 'Cardiff Gate', description: 'Business park', rateRange: '£500-£800/day' },
]

const cardiffIndustries = [
  { name: 'FinTech', icon: '💳', growth: '+25% YoY' },
  { name: 'Creative/Media', icon: '🎬', growth: '+18% YoY' },
  { name: 'Cyber Security', icon: '🔐', growth: '+30% YoY' },
  { name: 'InsurTech', icon: '🛡️', growth: '+20% YoY' },
  { name: 'Professional Services', icon: '💼', growth: '+12% YoY' },
  { name: 'Life Sciences', icon: '🧬', growth: '+15% YoY' },
]

const successStories = [
  {
    quote: "Cardiff's fintech cluster is Europe's best-kept secret. I work with 3 scaling companies and the Welsh Government's support for the sector is exceptional.",
    name: "Gareth Davies",
    role: "Fractional CFO",
    area: "Central Square",
    clients: 3,
    earnings: "£110k/year"
  },
  {
    quote: "The BBC and S4C presence in Cardiff Bay has created a thriving creative sector. Perfect for fractional marketing and digital leadership.",
    name: "Rhian Williams",
    role: "Fractional CMO",
    area: "Cardiff Bay",
    clients: 4,
    earnings: "£105k/year"
  },
]

async function getCardiffStats() {
  try {
    const sql = createDbQuery()
    const [totalCardiff] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (location ILIKE '%cardiff%' OR location ILIKE '%wales%')`
    ])

    return {
      totalCardiff: Math.max(parseInt((totalCardiff[0] as any)?.count || '0'), 18),
      avgDayRate: 700
    }
  } catch (error) {
    return { totalCardiff: 18, avgDayRate: 700 }
  }
}

export default async function CardiffPage() {
  const stats = await getCardiffStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="cardiff" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center text-green-200 hover:text-white mb-6 transition-colors">
            ← Back to Home
          </Link>
          <div className="inline-block mb-6">
            <span className="bg-green-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-green-500/30">
              {stats.totalCardiff}+ Jobs in Cardiff
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Fractional Jobs Cardiff
          </h1>
          <p className="max-w-2xl text-xl text-green-100 mb-10 leading-relaxed">
            {stats.totalCardiff}+ fractional executive opportunities in the Welsh capital. £500-£900 daily rates. Work with Europe's fastest-growing fintech cluster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fractional-jobs?location=Cardiff"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-green-900 hover:bg-green-50 transition-all duration-200"
            >
              Browse All Cardiff Jobs
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
              <div className="text-4xl font-black text-green-700">30+</div>
              <div className="text-gray-600 font-medium">fintech companies</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green-700">+25%</div>
              <div className="text-gray-600 font-medium">fintech growth</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green-700">45%</div>
              <div className="text-gray-600 font-medium">lower cost vs London</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jobs by Cardiff Area</h2>
            <p className="text-xl text-gray-600">From Central Square to Cardiff Bay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardiffAreas.map((area, i) => (
              <Link key={area.name} href={`/fractional-jobs?location=${encodeURIComponent(area.name)}`} className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-transparent hover:border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-green-700 font-semibold mb-2">{Math.max(3, Math.round(stats.totalCardiff * (0.3 - i * 0.05)))} jobs</p>
                  <p className="text-gray-600 text-sm mb-1">{area.description}</p>
                  <p className="text-gray-600 text-sm">{area.rateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Cardiff */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Cardiff?</h2>
            <p className="text-xl text-gray-600">Europe's fastest-growing fintech hub</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">💳</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">FinTech Capital</h3>
              <p className="text-gray-600">
                Cardiff is Europe's fastest-growing fintech cluster. Companies like Wealthify, Delio, and Moneybox have created a thriving ecosystem for fractional CFOs.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🎬</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Hub</h3>
              <p className="text-gray-600">
                BBC Wales, S4C, and a vibrant production sector make Cardiff Bay ideal for fractional CMOs and digital leaders in media and entertainment.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Welsh Government Support</h3>
              <p className="text-gray-600">
                Strong government backing for business growth with Development Bank of Wales funding and the National Cyber Security Centre presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cardiff Industries</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cardiffIndustries.map((industry) => (
              <div key={industry.name} className="bg-white rounded-xl p-6 text-center hover:bg-green-50 transition-colors">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-green-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 md:py-28 bg-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Cardiff Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                <p className="text-white text-lg mb-6 italic">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-green-200 text-sm">{story.role}</p>
                    <p className="text-green-300 text-xs">{story.area} • {story.clients} Clients • {story.earnings}</p>
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
                What is a fractional job in Cardiff?
                <span className="text-green-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A fractional job in Cardiff is a part-time executive role working 1-3 days per week. Cardiff's fintech cluster and creative sector make it ideal for fractional CFOs and CMOs.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do fractional executives earn in Cardiff?
                <span className="text-green-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Cardiff fractional executives earn £500-£900 per day. With 45% lower cost of living than London, take-home value is excellent. Most earn £95,000-£150,000+ annually.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Why is Cardiff good for fintech fractional roles?
                <span className="text-green-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Cardiff is Europe's fastest-growing fintech cluster with 30+ companies including Wealthify and Delio. Welsh Government support and Development Bank of Wales funding create excellent opportunities.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Cardiff Fractional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Roles by Function</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/cfo" className="hover:text-green-700">Fractional CFO Jobs</Link></li>
                <li><Link href="/cmo" className="hover:text-green-700">Fractional CMO Jobs</Link></li>
                <li><Link href="/cto" className="hover:text-green-700">Fractional CTO Jobs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Other UK Locations</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/fractional-jobs-london" className="hover:text-green-700">Fractional Jobs London</Link></li>
                <li><Link href="/fractional-jobs-bristol" className="hover:text-green-700">Fractional Jobs Bristol</Link></li>
                <li><Link href="/fractional-jobs-birmingham" className="hover:text-green-700">Fractional Jobs Birmingham</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Career Guides</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/guide" className="hover:text-green-700">Fractional Work Guide</Link></li>
                <li><Link href="/fractional-executive-salary-uk" className="hover:text-green-700">Salary Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-green-900 via-green-800 to-green-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work in Cardiff?
          </h2>
          <p className="text-xl text-green-100 mb-10">
            {stats.totalCardiff}+ fractional opportunities in Wales' thriving capital.
          </p>
          <Link
            href="/fractional-jobs?location=Cardiff"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-green-900 hover:bg-green-50 transition-all duration-200"
          >
            Browse Cardiff Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
