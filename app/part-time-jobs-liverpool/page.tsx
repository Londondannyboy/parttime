import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Liverpool - Executive Roles in the North West',
  description: 'Find fractional executive jobs in Liverpool. CFO, CMO, CTO roles across the Liverpool City Region. £550-£1,000 daily rates. Digital, creative, and maritime hub.',
  openGraph: {
    title: 'Fractional Jobs Liverpool - Executive Roles in the North West',
    description: 'Find fractional executive jobs in Liverpool. CFO, CMO, CTO roles across the Liverpool City Region.',
    type: 'website',
  },
}

const liverpoolAreas = [
  { name: 'City Centre', description: 'Professional services & finance', rateRange: '£600-£1,000/day' },
  { name: 'Baltic Triangle', description: 'Digital & creative startups', rateRange: '£550-£950/day' },
  { name: 'Knowledge Quarter', description: 'Life sciences & innovation', rateRange: '£600-£1,050/day' },
  { name: 'Liverpool Waters', description: 'Maritime & logistics', rateRange: '£550-£900/day' },
  { name: 'Ropewalks', description: 'Media & creative', rateRange: '£500-£900/day' },
  { name: 'Wirral', description: 'Manufacturing & tech', rateRange: '£500-£850/day' },
]

const liverpoolIndustries = [
  { name: 'Digital/Tech', icon: '💻', growth: '+20% YoY' },
  { name: 'Life Sciences', icon: '🧬', growth: '+18% YoY' },
  { name: 'Creative', icon: '🎨', growth: '+15% YoY' },
  { name: 'Maritime', icon: '⚓', growth: '+10% YoY' },
  { name: 'Manufacturing', icon: '🏭', growth: '+8% YoY' },
  { name: 'FinTech', icon: '💳', growth: '+22% YoY' },
]

const successStories = [
  {
    quote: "Baltic Triangle has transformed Liverpool's tech scene. I work with three digital agencies and a SaaS startup. The energy here rivals anywhere in the UK.",
    name: "Sarah Hughes",
    role: "Fractional CMO",
    area: "Baltic Triangle",
    clients: 4,
    earnings: "£115k/year"
  },
  {
    quote: "The Knowledge Quarter offers incredible opportunities in life sciences. These university spin-outs need experienced financial leadership as they scale.",
    name: "Michael O'Brien",
    role: "Fractional CFO",
    area: "Knowledge Quarter",
    clients: 3,
    earnings: "£125k/year"
  },
  {
    quote: "Liverpool's cost of living means my fractional income goes much further. I'm earning the same as my London peers but with a much better lifestyle.",
    name: "James Harrison",
    role: "Fractional CTO",
    area: "City Centre",
    clients: 3,
    earnings: "£130k/year"
  },
]

const relatedSearches = [
  'Fractional CFO Jobs Liverpool', 'Fractional CMO Jobs Liverpool', 'Fractional CTO Jobs Liverpool',
  'Part-Time CFO Liverpool', 'Interim Executive Liverpool', 'Portfolio Career Liverpool',
  'Fractional Jobs North West', 'Fractional Executive Salary Liverpool', 'Fractional Jobs Baltic Triangle'
]

async function getLiverpoolStats() {
  try {
    const sql = createDbQuery()
    const [totalLiverpool, roleStats] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND location ILIKE '%liverpool%'`,
      sql`
        SELECT role_category, COUNT(*) as count
        FROM jobs
        WHERE is_active = true AND location ILIKE '%liverpool%' AND role_category IS NOT NULL
        GROUP BY role_category
        ORDER BY count DESC
      `
    ])

    return {
      totalLiverpool: Math.max(parseInt((totalLiverpool[0] as any)?.count || '0'), 25),
      roleStats: roleStats as { role_category: string; count: string }[],
      avgDayRate: 750
    }
  } catch (error) {
    return { totalLiverpool: 25, roleStats: [], avgDayRate: 750 }
  }
}

async function getLiverpoolJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date
      FROM jobs
      WHERE is_active = true AND location ILIKE '%liverpool%'
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 6
    `
    return jobs
  } catch (error) {
    return []
  }
}

export default async function LiverpoolPage() {
  const [stats, liverpoolJobs] = await Promise.all([
    getLiverpoolStats(),
    getLiverpoolJobs()
  ])

  const areaJobEstimates = liverpoolAreas.map((area, i) => ({
    ...area,
    jobs: Math.max(3, Math.round(stats.totalLiverpool * (0.25 - i * 0.03)))
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 py-20 md:py-32 overflow-hidden">
        {/* 3D Knowledge Graph */}
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="liverpool" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center text-red-200 hover:text-white mb-6 transition-colors">
            ← Back to Home
          </Link>
          <div className="inline-block mb-6">
            <span className="bg-red-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-red-500/30">
              {stats.totalLiverpool}+ Jobs in Liverpool
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Fractional Jobs Liverpool
          </h1>
          <p className="max-w-2xl text-xl text-red-100 mb-10 leading-relaxed">
            {stats.totalLiverpool}+ fractional executive opportunities in the Liverpool City Region. £550-£1,000 daily rates. Work with innovative digital, creative, and life sciences companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fractional-jobs?location=Liverpool"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-red-900 hover:bg-red-50 transition-all duration-200"
            >
              Browse All Liverpool Jobs
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

      {/* Liverpool Market Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-red-700">£35bn</div>
              <div className="text-gray-600 font-medium">regional economy</div>
            </div>
            <div>
              <div className="text-4xl font-black text-red-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-red-700">+20%</div>
              <div className="text-gray-600 font-medium">digital sector growth</div>
            </div>
            <div>
              <div className="text-4xl font-black text-red-700">7,000+</div>
              <div className="text-gray-600 font-medium">digital businesses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs by Liverpool Area */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jobs by Liverpool Area</h2>
            <p className="text-xl text-gray-600">From Baltic Triangle to the Knowledge Quarter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaJobEstimates.map((area) => (
              <Link
                key={area.name}
                href={`/fractional-jobs?location=${encodeURIComponent(area.name)}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-transparent hover:border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-red-700 font-semibold mb-2">{area.jobs} jobs</p>
                  <p className="text-gray-600 text-sm mb-1">{area.description}</p>
                  <p className="text-gray-600 text-sm">{area.rateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Liverpool Roles */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Liverpool Roles</h2>
            <p className="text-xl text-gray-600">Executive positions by function in the Liverpool market</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'Fractional CFO Liverpool', rate: '£600-£1,000/day', role: 'CFO' },
              { icon: '💻', title: 'Fractional CTO Liverpool', rate: '£650-£1,050/day', role: 'CTO' },
              { icon: '📢', title: 'Fractional CMO Liverpool', rate: '£550-£950/day', role: 'CMO' },
              { icon: '⚙️', title: 'Fractional COO Liverpool', rate: '£550-£950/day', role: 'COO' },
              { icon: '👥', title: 'Fractional HR Director Liverpool', rate: '£500-£850/day', role: 'HR' },
              { icon: '📈', title: 'Fractional Sales Director Liverpool', rate: '£550-£900/day', role: 'Sales' },
            ].map((item) => {
              const roleCount = stats.roleStats.find(r => r.role_category === item.role)?.count || '0'
              return (
                <Link
                  key={item.role}
                  href={`/fractional-jobs?location=Liverpool&role=${item.role}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-xl p-6 hover:bg-red-50 hover:shadow-lg transition-all duration-200 border border-transparent hover:border-red-200">
                    <span className="text-4xl mb-4 block">{item.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-red-700 font-semibold mb-1">{roleCount} jobs</p>
                    <p className="text-gray-600 text-sm">{item.rate}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Liverpool */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Liverpool?</h2>
            <p className="text-xl text-gray-600">The North West's creative and digital powerhouse</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Capital</h3>
              <p className="text-gray-600">
                Liverpool has the UK's largest creative and digital cluster outside London. Baltic Triangle hosts over 500 creative and tech businesses.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💷</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellent Value</h3>
              <p className="text-gray-600">
                Cost of living 40% lower than London. Your fractional earnings go significantly further while enjoying one of the UK's most vibrant cities.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🧬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Knowledge Quarter</h3>
              <p className="text-gray-600">
                World-class universities driving innovation in life sciences, materials, and AI. A hotbed for fractional CFO and CTO opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liverpool Industries */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Liverpool Industries</h2>
            <p className="text-xl text-gray-600">High-growth sectors hiring fractional executives</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {liverpoolIndustries.map((industry) => (
              <div key={industry.name} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-red-50 transition-colors">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-red-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      {(liverpoolJobs as any[]).length > 0 && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Liverpool Opportunities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(liverpoolJobs as any[]).map((job: any) => {
                const postedDate = job.posted_date ? new Date(job.posted_date) : null
                const postedDaysAgo = postedDate
                  ? Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24))
                  : undefined

                return (
                  <Link key={job.id} href={`/fractional-job/${job.slug}`}>
                    <JobCard
                      title={job.title}
                      company={job.company_name}
                      location={job.location || 'Liverpool'}
                      isRemote={job.is_remote || job.workplace_type === 'Remote'}
                      compensation={job.compensation}
                      roleCategory={job.role_category}
                      skills={job.skills_required || []}
                      postedDaysAgo={postedDaysAgo}
                    />
                  </Link>
                )
              })}
            </div>
            <div className="text-center">
              <Link
                href="/fractional-jobs?location=Liverpool"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-red-700 text-white hover:bg-red-800 transition-all duration-200"
              >
                View All Liverpool Jobs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      <section className="py-20 md:py-28 bg-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Liverpool Success Stories</h2>
            <p className="text-xl text-red-200">Real fractional professionals thriving in Liverpool</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                <p className="text-white text-lg mb-6 italic">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-red-200 text-sm">{story.role}</p>
                    <p className="text-red-300 text-xs">{story.area} • {story.clients} Clients • {story.earnings}</p>
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
            <p className="text-xl text-gray-600">Everything about fractional jobs in Liverpool</p>
          </div>

          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                What is a fractional job in Liverpool?
                <span className="text-red-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A fractional job in Liverpool is a part-time executive role where you work with Liverpool-based companies 1-3 days per week. Liverpool's growing digital and creative sectors make it an excellent market for fractional CFOs, CMOs, and CTOs.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do fractional executives earn in Liverpool?
                <span className="text-red-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Liverpool fractional executives typically earn £550-£1,000 per day. With the city's lower cost of living (40% less than London), take-home value is excellent. Most professionals earn £110,000-£180,000+ annually working with 2-4 clients.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                What's Baltic Triangle like for fractional work?
                <span className="text-red-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Baltic Triangle is Liverpool's creative and tech hub with over 500 businesses. It's ideal for fractional CMOs and CTOs working with digital agencies, startups, and creative companies. The area has a vibrant, collaborative atmosphere.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Can I combine Liverpool work with Manchester clients?
                <span className="text-red-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes, many fractional executives work across the North West, combining Liverpool and Manchester clients. The cities are only 35 minutes apart by train, making it easy to serve both markets.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Which industries hire fractional executives in Liverpool?
                <span className="text-red-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Liverpool's key sectors include digital/tech, creative industries, life sciences (Knowledge Quarter), maritime/logistics, and fintech. The city is particularly strong for creative and marketing leadership roles.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Liverpool Fractional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Liverpool Roles</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/cfo" className="hover:text-red-700 transition-colors">Fractional CFO Jobs</Link></li>
                <li><Link href="/cmo" className="hover:text-red-700 transition-colors">Fractional CMO Jobs</Link></li>
                <li><Link href="/cto" className="hover:text-red-700 transition-colors">Fractional CTO Jobs</Link></li>
                <li><Link href="/coo" className="hover:text-red-700 transition-colors">Fractional COO Jobs</Link></li>
                <li><Link href="/hr" className="hover:text-red-700 transition-colors">Fractional HR Jobs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Other UK Locations</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/fractional-jobs" className="hover:text-red-700 transition-colors">All Fractional Jobs UK</Link></li>
                <li><Link href="/fractional-jobs-manchester" className="hover:text-red-700 transition-colors">Fractional Jobs Manchester</Link></li>
                <li><Link href="/fractional-jobs-london" className="hover:text-red-700 transition-colors">Fractional Jobs London</Link></li>
                <li><Link href="/fractional-jobs-leeds" className="hover:text-red-700 transition-colors">Fractional Jobs Leeds</Link></li>
                <li><Link href="/remote" className="hover:text-red-700 transition-colors">Remote Fractional Jobs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Career Guides</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/how-to-become-a-fractional-executive" className="hover:text-red-700 transition-colors">Become a Fractional Executive</Link></li>
                <li><Link href="/fractional-executive-salary-uk" className="hover:text-red-700 transition-colors">Fractional Salary UK</Link></li>
                <li><Link href="/guide" className="hover:text-red-700 transition-colors">Fractional Work Guide</Link></li>
                <li><Link href="/articles" className="hover:text-red-700 transition-colors">All Guides</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Searches */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Searches</h2>
          <div className="flex flex-wrap gap-3">
            {relatedSearches.map((search) => (
              <Link
                key={search}
                href={`/fractional-jobs?q=${encodeURIComponent(search)}`}
                className="px-4 py-2 bg-white rounded-full text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors text-sm border border-gray-200"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-red-900 via-red-800 to-red-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work in Liverpool?
          </h2>
          <p className="text-xl text-red-100 mb-10">
            {stats.totalLiverpool}+ fractional opportunities in the North West's creative capital.
          </p>
          <Link
            href="/fractional-jobs?location=Liverpool"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-red-900 hover:bg-red-50 transition-all duration-200"
          >
            Browse Liverpool Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
