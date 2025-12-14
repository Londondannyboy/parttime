import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Edinburgh - Executive Roles in Scotland',
  description: 'Find fractional executive jobs in Edinburgh and Scotland. CFO, CMO, CTO roles. £700-£1,200 daily rates. Scotland\'s leading fractional market.',
  openGraph: {
    title: 'Fractional Jobs Edinburgh - Executive Roles in Scotland',
    description: 'Find fractional executive jobs in Edinburgh and across Scotland.',
    type: 'website',
  },
}

const edinburghAreas = [
  { name: 'Edinburgh City Centre', description: 'Financial services & legal', rateRange: '£750-£1,200/day' },
  { name: 'Leith', description: 'Tech startups & creative', rateRange: '£700-£1,100/day' },
  { name: 'Edinburgh Park', description: 'Corporate & tech HQs', rateRange: '£750-£1,150/day' },
  { name: 'Glasgow', description: 'Manufacturing & services', rateRange: '£650-£1,050/day' },
  { name: 'Aberdeen', description: 'Energy & oil/gas', rateRange: '£800-£1,300/day' },
  { name: 'Dundee', description: 'Gaming & digital', rateRange: '£600-£950/day' },
]

const scottishIndustries = [
  { name: 'Financial Services', icon: '🏦', growth: '+10% YoY' },
  { name: 'Energy/Oil & Gas', icon: '⚡', growth: '+12% YoY' },
  { name: 'Tech/Gaming', icon: '🎮', growth: '+18% YoY' },
  { name: 'Life Sciences', icon: '🧬', growth: '+15% YoY' },
  { name: 'Whisky/Food & Drink', icon: '🥃', growth: '+8% YoY' },
  { name: 'Renewables', icon: '💨', growth: '+22% YoY' },
]

const relatedSearches = [
  'Fractional CFO Jobs Edinburgh', 'Fractional CTO Jobs Scotland', 'Fractional CMO Jobs Glasgow',
  'Part-Time CFO Edinburgh', 'Interim Executive Scotland', 'Portfolio Career Edinburgh',
  'Fractional Jobs Glasgow', 'Fractional Jobs Aberdeen', 'Fractional Executive Salary Scotland'
]

async function getEdinburghStats() {
  try {
    const sql = createDbQuery()
    const [total, avgRateResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (location ILIKE '%edinburgh%' OR location ILIKE '%scotland%' OR location ILIKE '%glasgow%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS INTEGER)) as avg FROM jobs WHERE is_active = true AND (location ILIKE '%edinburgh%' OR location ILIKE '%scotland%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`
    ])
    return {
      total: parseInt((total[0] as any)?.count || '0'),
      avgDayRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '900'))
    }
  } catch (error) {
    return { total: 20, avgDayRate: 900 }
  }
}

async function getEdinburghJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date
      FROM jobs
      WHERE is_active = true AND (location ILIKE '%edinburgh%' OR location ILIKE '%scotland%' OR location ILIKE '%glasgow%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 6
    `
    return jobs
  } catch (error) {
    return []
  }
}

export default async function EdinburghPage() {
  const [stats, jobs] = await Promise.all([getEdinburghStats(), getEdinburghJobs()])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-20 md:py-32 overflow-hidden">
        {/* 3D Knowledge Graph */}
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="edinburgh" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
            ← Back to Home
          </Link>
          <div className="inline-block mb-6">
            <span className="bg-purple-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-purple-500/30">
              {stats.total}+ Jobs in Scotland
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Fractional Jobs Edinburgh</h1>
          <img src="/logo.svg" alt="Fractional Jobs Edinburgh - Executive roles in Scotland" className="hidden" width={1} height={1} />
          
          <p className="max-w-2xl text-xl text-purple-100 mb-10 leading-relaxed">
            {stats.total}+ fractional executive opportunities across Scotland. £700-£1,200 daily rates. Financial services, energy, and tech sectors leading demand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fractional-jobs?location=Edinburgh"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-purple-900 hover:bg-purple-50 transition-all duration-200"
            >
              Browse Edinburgh Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-purple-700">8%</div>
              <div className="text-gray-600 font-medium">of UK fractional roles</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-700">4th</div>
              <div className="text-gray-600 font-medium">largest UK market</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-700">+15%</div>
              <div className="text-gray-600 font-medium">YoY market growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jobs Across Scotland</h2>
            <p className="text-xl text-gray-600">Find fractional roles from Edinburgh to Aberdeen</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {edinburghAreas.map((area) => (
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Scottish Industries</h2>
            <p className="text-xl text-gray-600">Key sectors hiring fractional executives</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {scottishIndustries.map((industry) => (
              <div key={industry.name} className="bg-gray-50 rounded-xl p-6 text-center">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-purple-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Edinburgh */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Edinburgh?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🏦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Hub</h3>
              <p className="text-gray-600">
                Edinburgh is Europe's 4th largest financial centre with major asset managers, banks, and insurance companies.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Energy Sector</h3>
              <p className="text-gray-600">
                Aberdeen's oil & gas and Scotland's renewables sector offer premium fractional rates for energy expertise.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🏔️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality of Life</h3>
              <p className="text-gray-600">
                World-class city with lower costs than London. Perfect for portfolio careers with work-life balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs */}
      {(jobs as any[]).length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Scottish Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(jobs as any[]).map((job: any) => (
                <Link key={job.id} href={`/fractional-job/${job.slug}`}>
                  <JobCard
                    title={job.title}
                    company={job.company_name}
                    location={job.location || 'Edinburgh'}
                    isRemote={job.is_remote}
                    compensation={job.compensation}
                    roleCategory={job.role_category}
                    skills={job.skills_required || []}
                  />
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/fractional-jobs?location=Edinburgh"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-all"
              >
                View All Scottish Jobs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Edinburgh FAQs</h2>
          <div className="space-y-6">
            <details className="group bg-white rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do fractional executives earn in Edinburgh?
                <span className="text-purple-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Edinburgh fractional executives typically earn £700-£1,200 per day. Financial services and energy roles command premium rates, often matching London levels.
              </p>
            </details>
            <details className="group bg-white rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Is Edinburgh a good base for fractional work?
                <span className="text-purple-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes - Edinburgh combines a strong local market with easy access to London (4.5hr train or 1hr flight). Many fractional executives maintain clients in both markets.
              </p>
            </details>
            <details className="group bg-white rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                What about Aberdeen for fractional roles?
                <span className="text-purple-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Aberdeen offers some of the highest day rates in the UK for energy sector expertise. Fractional CFOs and CTOs with oil & gas experience can earn £1,000-£1,500/day.
              </p>
            </details>
          </div>
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
            Ready to Work in Scotland?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            {stats.total}+ fractional opportunities across Edinburgh, Glasgow, and Aberdeen
          </p>
          <Link
            href="/fractional-jobs?location=Edinburgh"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-purple-900 hover:bg-purple-50 transition-all"
          >
            Browse Scottish Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
