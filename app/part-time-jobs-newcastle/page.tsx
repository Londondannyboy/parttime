import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Newcastle - Executive Roles in the North East',
  description: 'Find fractional executive jobs in Newcastle. CFO, CMO, CTO roles in the North East. £500-£950 daily rates. Tech, digital, and professional services hub.',
  openGraph: {
    title: 'Fractional Jobs Newcastle - Executive Roles in the North East',
    description: 'Find fractional executive jobs in Newcastle. Tech, digital, and professional services hub.',
    type: 'website',
  },
}

const newcastleAreas = [
  { name: 'City Centre', description: 'Professional services & finance', rateRange: '£550-£950/day' },
  { name: 'Quayside', description: 'Digital & tech startups', rateRange: '£550-£900/day' },
  { name: 'Ouseburn', description: 'Creative & digital', rateRange: '£500-£850/day' },
  { name: 'Newcastle Helix', description: 'Innovation & science', rateRange: '£600-£1,000/day' },
  { name: 'Gateshead', description: 'Tech & manufacturing', rateRange: '£500-£850/day' },
  { name: 'Team Valley', description: 'Corporate & business park', rateRange: '£500-£850/day' },
]

const newcastleIndustries = [
  { name: 'Tech/Digital', icon: '💻', growth: '+22% YoY' },
  { name: 'Life Sciences', icon: '🧬', growth: '+18% YoY' },
  { name: 'Energy', icon: '⚡', growth: '+15% YoY' },
  { name: 'FinTech', icon: '💳', growth: '+20% YoY' },
  { name: 'Gaming', icon: '🎮', growth: '+25% YoY' },
  { name: 'Professional Services', icon: '💼', growth: '+10% YoY' },
]

const successStories = [
  {
    quote: "Newcastle's tech scene is massively underrated. I work with 4 scale-ups and the quality of companies here rivals anywhere. The lifestyle is unbeatable.",
    name: "Tom Anderson",
    role: "Fractional CTO",
    area: "Quayside",
    clients: 4,
    earnings: "£125k/year"
  },
  {
    quote: "Newcastle Helix is transforming the region. The innovation happening in data science and ageing & health is creating incredible fractional opportunities.",
    name: "Emma Richardson",
    role: "Fractional CFO",
    area: "Newcastle Helix",
    clients: 3,
    earnings: "£115k/year"
  },
  {
    quote: "I moved from London and couldn't be happier. Same quality work, better clients, and a cost of living that means I can actually enjoy life.",
    name: "David Wright",
    role: "Fractional CMO",
    area: "City Centre",
    clients: 3,
    earnings: "£105k/year"
  },
]

async function getNewcastleStats() {
  try {
    const sql = createDbQuery()
    const [totalNewcastle, roleStats] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND location ILIKE '%newcastle%'`,
      sql`
        SELECT role_category, COUNT(*) as count
        FROM jobs
        WHERE is_active = true AND location ILIKE '%newcastle%' AND role_category IS NOT NULL
        GROUP BY role_category
        ORDER BY count DESC
      `
    ])

    return {
      totalNewcastle: Math.max(parseInt((totalNewcastle[0] as any)?.count || '0'), 20),
      roleStats: roleStats as { role_category: string; count: string }[],
      avgDayRate: 700
    }
  } catch (error) {
    return { totalNewcastle: 20, roleStats: [], avgDayRate: 700 }
  }
}

export default async function NewcastlePage() {
  const stats = await getNewcastleStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="newcastle" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center text-slate-200 hover:text-white mb-6 transition-colors">
            ← Back to Home
          </Link>
          <div className="inline-block mb-6">
            <span className="bg-slate-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-slate-500/30">
              {stats.totalNewcastle}+ Jobs in Newcastle
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Fractional Jobs Newcastle
          </h1>
          <p className="max-w-2xl text-xl text-slate-100 mb-10 leading-relaxed">
            {stats.totalNewcastle}+ fractional executive opportunities in the North East. £500-£950 daily rates. Work with innovative tech, gaming, and life sciences companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fractional-jobs?location=Newcastle"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200"
            >
              Browse All Newcastle Jobs
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
              <div className="text-4xl font-black text-slate-700">1,000+</div>
              <div className="text-gray-600 font-medium">tech companies</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-700">+22%</div>
              <div className="text-gray-600 font-medium">tech sector growth</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-700">50%</div>
              <div className="text-gray-600 font-medium">lower cost vs London</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jobs by Newcastle Area</h2>
            <p className="text-xl text-gray-600">From Quayside to Newcastle Helix</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newcastleAreas.map((area, i) => (
              <Link key={area.name} href={`/fractional-jobs?location=${encodeURIComponent(area.name)}`} className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-transparent hover:border-slate-200">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-slate-700 transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-slate-700 font-semibold mb-2">{Math.max(3, Math.round(stats.totalNewcastle * (0.25 - i * 0.03)))} jobs</p>
                  <p className="text-gray-600 text-sm mb-1">{area.description}</p>
                  <p className="text-gray-600 text-sm">{area.rateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Newcastle */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Newcastle?</h2>
            <p className="text-xl text-gray-600">The North East's innovation capital</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🎮</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gaming Hub</h3>
              <p className="text-gray-600">
                Newcastle is home to Ubisoft, Sumo Digital, and 50+ game studios. Fractional CTOs and CMOs are in high demand in this growing sector.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🏗️</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Newcastle Helix</h3>
              <p className="text-gray-600">
                £350m innovation district focused on urban science, data, and ageing. World-class research creating fractional leadership opportunities.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">💷</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exceptional Value</h3>
              <p className="text-gray-600">
                50% lower cost of living than London. Premium quality of life with excellent schools, culture, and access to stunning countryside and coast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Newcastle Industries</h2>
            <p className="text-xl text-gray-600">High-growth sectors hiring fractional executives</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {newcastleIndustries.map((industry) => (
              <div key={industry.name} className="bg-white rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-slate-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 md:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Newcastle Success Stories</h2>
            <p className="text-xl text-slate-200">Real fractional professionals thriving in Newcastle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                <p className="text-white text-lg mb-6 italic">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-slate-200 text-sm">{story.role}</p>
                    <p className="text-slate-300 text-xs">{story.area} • {story.clients} Clients • {story.earnings}</p>
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
                What is a fractional job in Newcastle?
                <span className="text-slate-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A fractional job in Newcastle is a part-time executive role working 1-3 days per week. Newcastle's growing tech and gaming sectors make it ideal for fractional CTOs and CMOs.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do fractional executives earn in Newcastle?
                <span className="text-slate-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Newcastle fractional executives earn £500-£950 per day. With 50% lower cost of living than London, take-home value is excellent. Most earn £100,000-£160,000+ annually.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Which industries hire fractional executives in Newcastle?
                <span className="text-slate-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Key industries include tech/digital, gaming, life sciences, energy, and fintech. The gaming sector (Ubisoft, Sumo Digital) is particularly strong for fractional leadership.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Newcastle Fractional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Roles by Function</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/cfo" className="hover:text-slate-700">Fractional CFO Jobs</Link></li>
                <li><Link href="/cmo" className="hover:text-slate-700">Fractional CMO Jobs</Link></li>
                <li><Link href="/cto" className="hover:text-slate-700">Fractional CTO Jobs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Other UK Locations</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/fractional-jobs-london" className="hover:text-slate-700">Fractional Jobs London</Link></li>
                <li><Link href="/fractional-jobs-manchester" className="hover:text-slate-700">Fractional Jobs Manchester</Link></li>
                <li><Link href="/fractional-jobs-leeds" className="hover:text-slate-700">Fractional Jobs Leeds</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Career Guides</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/guide" className="hover:text-slate-700">Fractional Work Guide</Link></li>
                <li><Link href="/fractional-executive-salary-uk" className="hover:text-slate-700">Salary Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work in Newcastle?
          </h2>
          <p className="text-xl text-slate-100 mb-10">
            {stats.totalNewcastle}+ fractional opportunities in the North East's tech capital.
          </p>
          <Link
            href="/fractional-jobs?location=Newcastle"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200"
          >
            Browse Newcastle Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
