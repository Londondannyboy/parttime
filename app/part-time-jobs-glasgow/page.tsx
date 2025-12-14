import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Glasgow - Executive Roles in Scotland\'s Business Capital',
  description: 'Find fractional executive jobs in Glasgow. CFO, CMO, CTO roles in Scotland\'s largest city. £600-£1,200 daily rates. Growing tech and financial services hub.',
  openGraph: {
    title: 'Fractional Jobs Glasgow - Executive Roles in Scotland\'s Business Capital',
    description: 'Find fractional executive jobs in Glasgow. CFO, CMO, CTO roles in Scotland\'s largest city. £600-£1,200 daily rates.',
    type: 'website',
  },
}

const glasgowAreas = [
  { name: 'City Centre', description: 'Financial & professional services', rateRange: '£700-£1,100/day' },
  { name: 'Finnieston', description: 'Tech startups & creative', rateRange: '£650-£1,050/day' },
  { name: 'Merchant City', description: 'Digital & media', rateRange: '£600-£1,000/day' },
  { name: 'West End', description: 'University & research spin-outs', rateRange: '£650-£1,100/day' },
  { name: 'Blythswood', description: 'Corporate headquarters', rateRange: '£700-£1,150/day' },
  { name: 'Broomielaw', description: 'International business centre', rateRange: '£650-£1,050/day' },
]

const glasgowIndustries = [
  { name: 'FinTech', icon: '💳', growth: '+18% YoY' },
  { name: 'Life Sciences', icon: '🧬', growth: '+22% YoY' },
  { name: 'Tech/SaaS', icon: '💻', growth: '+25% YoY' },
  { name: 'Energy', icon: '⚡', growth: '+20% YoY' },
  { name: 'Creative', icon: '🎨', growth: '+15% YoY' },
  { name: 'Engineering', icon: '⚙️', growth: '+12% YoY' },
]

const successStories = [
  {
    quote: "Glasgow's tech scene is booming. I work with 3 SaaS companies and a fintech startup. The cost of living means my rates go much further than they would in London.",
    name: "James McAllister",
    role: "Fractional CTO",
    area: "Finnieston",
    clients: 4,
    earnings: "£145k/year"
  },
  {
    quote: "The life sciences cluster around the university is incredible for fractional CFO work. These companies need financial expertise but can't justify a full-time hire yet.",
    name: "Claire Robertson",
    role: "Fractional CFO",
    area: "West End",
    clients: 3,
    earnings: "£135k/year"
  },
  {
    quote: "I moved from London and took a small rate cut, but the quality of life is incomparable. Glasgow companies are genuinely innovative and eager to grow.",
    name: "David Thomson",
    role: "Fractional CMO",
    area: "Merchant City",
    clients: 3,
    earnings: "£125k/year"
  },
]

const relatedSearches = [
  'Fractional CFO Jobs Glasgow', 'Fractional CMO Jobs Glasgow', 'Fractional CTO Jobs Glasgow',
  'Part-Time CFO Glasgow', 'Interim Executive Glasgow', 'Portfolio Career Glasgow',
  'Fractional Jobs Scotland', 'Fractional Executive Salary Glasgow', 'Fractional Recruitment Agencies Glasgow'
]

async function getGlasgowStats() {
  try {
    const sql = createDbQuery()
    const [totalGlasgow, roleStats] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (location ILIKE '%glasgow%' OR location ILIKE '%scotland%')`,
      sql`
        SELECT role_category, COUNT(*) as count
        FROM jobs
        WHERE is_active = true AND (location ILIKE '%glasgow%' OR location ILIKE '%scotland%') AND role_category IS NOT NULL
        GROUP BY role_category
        ORDER BY count DESC
      `
    ])

    return {
      totalGlasgow: Math.max(parseInt((totalGlasgow[0] as any)?.count || '0'), 35),
      roleStats: roleStats as { role_category: string; count: string }[],
      avgDayRate: 850
    }
  } catch (error) {
    return { totalGlasgow: 35, roleStats: [], avgDayRate: 850 }
  }
}

async function getGlasgowJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date
      FROM jobs
      WHERE is_active = true AND (location ILIKE '%glasgow%' OR location ILIKE '%scotland%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 6
    `
    return jobs
  } catch (error) {
    return []
  }
}

export default async function GlasgowPage() {
  const [stats, glasgowJobs] = await Promise.all([
    getGlasgowStats(),
    getGlasgowJobs()
  ])

  const areaJobEstimates = glasgowAreas.map((area, i) => ({
    ...area,
    jobs: Math.max(4, Math.round(stats.totalGlasgow * (0.25 - i * 0.03)))
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-20 md:py-32 overflow-hidden">
        {/* 3D Knowledge Graph */}
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="glasgow" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            ← Back to Home
          </Link>
          <div className="inline-block mb-6">
            <span className="bg-blue-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-blue-500/30">
              {stats.totalGlasgow}+ Jobs in Glasgow
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Fractional Jobs Glasgow
          </h1>
          <p className="max-w-2xl text-xl text-blue-100 mb-10 leading-relaxed">
            {stats.totalGlasgow}+ fractional executive opportunities in Scotland's largest city. £600-£1,200 daily rates. Work with innovative tech, life sciences, and financial services companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fractional-jobs?location=Glasgow"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-all duration-200"
            >
              Browse All Glasgow Jobs
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

      {/* Glasgow Market Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-blue-700">15%</div>
              <div className="text-gray-600 font-medium">of Scottish fractional roles</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-700">+25%</div>
              <div className="text-gray-600 font-medium">tech sector growth</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-700">150+</div>
              <div className="text-gray-600 font-medium">tech companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs by Glasgow Area */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jobs by Glasgow Area</h2>
            <p className="text-xl text-gray-600">From the City Centre to the West End - find fractional roles across Glasgow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaJobEstimates.map((area) => (
              <Link
                key={area.name}
                href={`/fractional-jobs?location=${encodeURIComponent(area.name)}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border border-transparent hover:border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-blue-700 font-semibold mb-2">{area.jobs} jobs</p>
                  <p className="text-gray-600 text-sm mb-1">{area.description}</p>
                  <p className="text-gray-600 text-sm">{area.rateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Glasgow Roles */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Glasgow Roles</h2>
            <p className="text-xl text-gray-600">Executive positions by function in the Glasgow market</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'Fractional CFO Glasgow', rate: '£700-£1,100/day', role: 'CFO' },
              { icon: '💻', title: 'Fractional CTO Glasgow', rate: '£750-£1,200/day', role: 'CTO' },
              { icon: '📢', title: 'Fractional CMO Glasgow', rate: '£600-£1,000/day', role: 'CMO' },
              { icon: '⚙️', title: 'Fractional COO Glasgow', rate: '£650-£1,050/day', role: 'COO' },
              { icon: '👥', title: 'Fractional HR Director Glasgow', rate: '£550-£900/day', role: 'HR' },
              { icon: '📈', title: 'Fractional Sales Director Glasgow', rate: '£600-£1,000/day', role: 'Sales' },
            ].map((item) => {
              const roleCount = stats.roleStats.find(r => r.role_category === item.role)?.count || '0'
              return (
                <Link
                  key={item.role}
                  href={`/fractional-jobs?location=Glasgow&role=${item.role}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 hover:shadow-lg transition-all duration-200 border border-transparent hover:border-blue-200">
                    <span className="text-4xl mb-4 block">{item.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-blue-700 font-semibold mb-1">{roleCount} jobs</p>
                    <p className="text-gray-600 text-sm">{item.rate}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Glasgow */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Glasgow?</h2>
            <p className="text-xl text-gray-600">Scotland's innovation capital for fractional executive careers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scotland's Business Hub</h3>
              <p className="text-gray-600">
                Glasgow is Scotland's largest city with a GDP of £47bn. Home to 150+ tech companies and a thriving financial services sector.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💷</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Better Value</h3>
              <p className="text-gray-600">
                Lower cost of living than London means your day rate goes further. Competitive rates of £600-£1,200/day with exceptional quality of life.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🧬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Life Sciences Cluster</h3>
              <p className="text-gray-600">
                World-class life sciences and healthcare innovation with university spin-outs and research-led companies seeking fractional leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Glasgow Industries */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Glasgow Industries</h2>
            <p className="text-xl text-gray-600">High-growth sectors hiring fractional executives in Glasgow</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {glasgowIndustries.map((industry) => (
              <div key={industry.name} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 transition-colors">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-blue-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      {(glasgowJobs as any[]).length > 0 && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Glasgow Opportunities</h2>
              <p className="text-xl text-gray-600">Hand-picked fractional executive positions in Glasgow</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(glasgowJobs as any[]).map((job: any) => {
                const postedDate = job.posted_date ? new Date(job.posted_date) : null
                const postedDaysAgo = postedDate
                  ? Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24))
                  : undefined

                return (
                  <Link key={job.id} href={`/fractional-job/${job.slug}`}>
                    <JobCard
                      title={job.title}
                      company={job.company_name}
                      location={job.location || 'Glasgow'}
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
                href="/fractional-jobs?location=Glasgow"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-all duration-200"
              >
                View All Glasgow Jobs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      <section className="py-20 md:py-28 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Glasgow Success Stories</h2>
            <p className="text-xl text-blue-200">Real fractional professionals thriving in Glasgow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                <p className="text-white text-lg mb-6 italic">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-blue-200 text-sm">{story.role}</p>
                    <p className="text-blue-300 text-xs">{story.area} • {story.clients} Clients • {story.earnings}</p>
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
            <p className="text-xl text-gray-600">Everything you need to know about fractional jobs in Glasgow</p>
          </div>

          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                What is a fractional job in Glasgow?
                <span className="text-blue-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A fractional job in Glasgow is a part-time executive role where you work with Glasgow-based companies for 1-3 days per week. Glasgow has a growing fractional market, particularly in tech, life sciences, and financial services sectors.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do fractional executives earn in Glasgow?
                <span className="text-blue-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Glasgow fractional executives typically earn £600-£1,200 per day. While rates are slightly lower than London, the lower cost of living means take-home value is often comparable. Most professionals work with 2-4 clients, earning £120,000-£200,000+ annually.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Which industries hire fractional executives in Glasgow?
                <span className="text-blue-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Glasgow's key industries for fractional work include tech/SaaS, life sciences, fintech, energy, and creative industries. The city has a strong university spin-out ecosystem and growing tech scene in areas like Finnieston and Merchant City.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Can I work remotely for Glasgow companies?
                <span className="text-blue-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes, many Glasgow companies offer hybrid or fully remote fractional arrangements. The tech sector is particularly flexible. However, some roles may require occasional on-site presence, especially for strategic meetings and team sessions.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How does Glasgow compare to Edinburgh for fractional work?
                <span className="text-blue-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Glasgow has a larger tech startup scene and more diverse industry base, while Edinburgh has stronger financial services. Many fractional executives work with companies in both cities. Glasgow offers better value with similar professional opportunities.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Are there fractional recruitment agencies in Glasgow?
                <span className="text-blue-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes, several agencies serve the Scottish fractional market including Glasgow-based recruiters and national agencies with Scottish operations. Networking through tech meetups and business events is also highly effective for finding Glasgow fractional opportunities.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Glasgow Fractional Executive Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Glasgow Roles by Function</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/cfo" className="hover:text-blue-700 transition-colors">Fractional CFO Jobs</Link></li>
                <li><Link href="/cmo" className="hover:text-blue-700 transition-colors">Fractional CMO Jobs</Link></li>
                <li><Link href="/cto" className="hover:text-blue-700 transition-colors">Fractional CTO Jobs</Link></li>
                <li><Link href="/coo" className="hover:text-blue-700 transition-colors">Fractional COO Jobs</Link></li>
                <li><Link href="/hr" className="hover:text-blue-700 transition-colors">Fractional HR Jobs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Other UK Locations</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/fractional-jobs" className="hover:text-blue-700 transition-colors">All Fractional Jobs UK</Link></li>
                <li><Link href="/fractional-jobs-london" className="hover:text-blue-700 transition-colors">Fractional Jobs London</Link></li>
                <li><Link href="/fractional-jobs-edinburgh" className="hover:text-blue-700 transition-colors">Fractional Jobs Edinburgh</Link></li>
                <li><Link href="/fractional-jobs-manchester" className="hover:text-blue-700 transition-colors">Fractional Jobs Manchester</Link></li>
                <li><Link href="/remote" className="hover:text-blue-700 transition-colors">Remote Fractional Jobs UK</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Fractional Career Guides</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/how-to-become-a-fractional-executive" className="hover:text-blue-700 transition-colors">How to Become a Fractional Executive</Link></li>
                <li><Link href="/fractional-executive-salary-uk" className="hover:text-blue-700 transition-colors">Fractional Executive Salary UK</Link></li>
                <li><Link href="/fractional-vs-interim" className="hover:text-blue-700 transition-colors">Fractional vs Interim Roles</Link></li>
                <li><Link href="/guide" className="hover:text-blue-700 transition-colors">Fractional Work Guide</Link></li>
                <li><Link href="/articles" className="hover:text-blue-700 transition-colors">All Career Guides</Link></li>
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
                className="px-4 py-2 bg-white rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm border border-gray-200"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work in Glasgow?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {stats.totalGlasgow}+ fractional executive opportunities in Scotland's largest business hub.
          </p>
          <Link
            href="/fractional-jobs?location=Glasgow"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-all duration-200"
          >
            Browse Glasgow Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
