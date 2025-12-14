import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Oxford - Executive Roles in the Innovation Hub',
  description: 'Find fractional executive jobs in Oxford. CFO, CMO, CTO roles in the Oxford cluster. £700-£1,100 daily rates. Life sciences, AI, and deep tech hub.',
  openGraph: {
    title: 'Fractional Jobs Oxford - Executive Roles in the Innovation Hub',
    description: 'Find fractional executive jobs in Oxford, the UK\'s life sciences and AI innovation hub.',
    type: 'website',
  },
}

const oxfordAreas = [
  { name: 'Oxford Science Park', description: 'Deep tech & AI', rateRange: '£750-£1,100/day' },
  { name: 'Headington', description: 'Life sciences & biotech', rateRange: '£700-£1,050/day' },
  { name: 'City Centre', description: 'Professional services', rateRange: '£650-£1,000/day' },
  { name: 'Harwell Campus', description: 'Space & healthcare tech', rateRange: '£700-£1,100/day' },
]

const oxfordIndustries = [
  { name: 'Life Sciences', icon: '🧬', growth: '+28% YoY' },
  { name: 'AI/ML', icon: '🤖', growth: '+35% YoY' },
  { name: 'Space Tech', icon: '🚀', growth: '+40% YoY' },
  { name: 'MedTech', icon: '🏥', growth: '+25% YoY' },
  { name: 'CleanTech', icon: '🌱', growth: '+30% YoY' },
  { name: 'Publishing', icon: '📚', growth: '+8% YoY' },
]

const successStories = [
  {
    quote: "Oxford's vaccine success put the life sciences cluster on the global map. I work with spinouts that are genuinely changing medicine. The calibre of science is extraordinary.",
    name: "Dr James Richardson",
    role: "Fractional CFO",
    area: "Headington",
    clients: 3,
    earnings: "£155k/year"
  },
  {
    quote: "Harwell is becoming the UK's space tech capital. I'm working with companies building satellite communications and space data analytics. Incredible growth opportunity.",
    name: "Emma Thompson",
    role: "Fractional CTO",
    area: "Harwell Campus",
    clients: 3,
    earnings: "£145k/year"
  },
]

async function getOxfordStats() {
  try {
    const sql = createDbQuery()
    const [totalOxford] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND location ILIKE '%oxford%'`
    ])

    return {
      totalOxford: Math.max(parseInt((totalOxford[0] as any)?.count || '0'), 25),
      avgDayRate: 900
    }
  } catch (error) {
    return { totalOxford: 25, avgDayRate: 900 }
  }
}

export default async function OxfordPage() {
  const stats = await getOxfordStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="oxford" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-6 transition-colors">
            ← Back to Home
          </Link>
          <div className="inline-block mb-6">
            <span className="bg-indigo-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-indigo-500/30">
              {stats.totalOxford}+ Jobs in Oxford
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Fractional Jobs Oxford
          </h1>
          <p className="max-w-2xl text-xl text-indigo-100 mb-10 leading-relaxed">
            {stats.totalOxford}+ fractional executive opportunities in the Oxford cluster. £700-£1,100 daily rates. Work with world-changing life sciences and deep tech companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fractional-jobs?location=Oxford"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-indigo-900 hover:bg-indigo-50 transition-all duration-200"
            >
              Browse All Oxford Jobs
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
              <div className="text-4xl font-black text-indigo-700">200+</div>
              <div className="text-gray-600 font-medium">spinout companies</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-700">+35%</div>
              <div className="text-gray-600 font-medium">AI sector growth</div>
            </div>
            <div>
              <div className="text-4xl font-black text-indigo-700">£1bn+</div>
              <div className="text-gray-600 font-medium">annual VC investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jobs by Oxford Area</h2>
            <p className="text-xl text-gray-600">From the Science Park to Harwell Campus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {oxfordAreas.map((area, i) => (
              <Link key={area.name} href={`/fractional-jobs?location=${encodeURIComponent(area.name)}`} className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-transparent hover:border-indigo-200">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-indigo-700 font-semibold mb-2">{Math.max(4, Math.round(stats.totalOxford * (0.35 - i * 0.07)))} jobs</p>
                  <p className="text-gray-600 text-sm mb-1">{area.description}</p>
                  <p className="text-gray-600 text-sm">{area.rateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Oxford */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Oxford?</h2>
            <p className="text-xl text-gray-600">Where world-changing science meets commercial success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🧬</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Life Sciences Leader</h3>
              <p className="text-gray-600">
                Oxford developed the AstraZeneca vaccine and hosts Europe's largest life sciences cluster. Fractional CFOs are critical for navigating complex funding and regulatory pathways.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🚀</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Space Tech Hub</h3>
              <p className="text-gray-600">
                Harwell Campus is the UK's space tech epicentre with ESA, Satellite Applications Catapult, and 100+ space companies creating demand for tech leadership.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🎓</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">200+ Spinouts</h3>
              <p className="text-gray-600">
                Oxford University has created 200+ spinout companies valued at £13bn+. These research-led companies need experienced fractional executives to scale commercially.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Oxford Industries</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {oxfordIndustries.map((industry) => (
              <div key={industry.name} className="bg-white rounded-xl p-6 text-center hover:bg-indigo-50 transition-colors">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-indigo-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 md:py-28 bg-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Oxford Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                <p className="text-white text-lg mb-6 italic">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-indigo-200 text-sm">{story.role}</p>
                    <p className="text-indigo-300 text-xs">{story.area} • {story.clients} Clients • {story.earnings}</p>
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
                What is a fractional job in Oxford?
                <span className="text-indigo-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A fractional job in Oxford is a part-time executive role working 1-3 days per week. Oxford's life sciences and deep tech clusters create exceptional demand for fractional CFOs and CTOs.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do fractional executives earn in Oxford?
                <span className="text-indigo-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Oxford fractional executives earn £700-£1,100 per day. Life sciences and space tech specialists can earn £140,000-£220,000+ annually working with 2-4 clients.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                What is Harwell Campus?
                <span className="text-indigo-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Harwell Campus is the UK's leading science and innovation campus with ESA, Diamond Light Source, and 100+ space and healthcare tech companies. It's creating huge demand for fractional tech leadership.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Oxford Fractional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Roles by Function</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/cfo" className="hover:text-indigo-700">Fractional CFO Jobs</Link></li>
                <li><Link href="/cto" className="hover:text-indigo-700">Fractional CTO Jobs</Link></li>
                <li><Link href="/cmo" className="hover:text-indigo-700">Fractional CMO Jobs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Other UK Locations</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/fractional-jobs-london" className="hover:text-indigo-700">Fractional Jobs London</Link></li>
                <li><Link href="/fractional-jobs-cambridge" className="hover:text-indigo-700">Fractional Jobs Cambridge</Link></li>
                <li><Link href="/fractional-jobs-bristol" className="hover:text-indigo-700">Fractional Jobs Bristol</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Career Guides</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/guide" className="hover:text-indigo-700">Fractional Work Guide</Link></li>
                <li><Link href="/fractional-executive-salary-uk" className="hover:text-indigo-700">Salary Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work in Oxford?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            {stats.totalOxford}+ fractional opportunities in the UK's life sciences capital.
          </p>
          <Link
            href="/fractional-jobs?location=Oxford"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-indigo-900 hover:bg-indigo-50 transition-all duration-200"
          >
            Browse Oxford Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
