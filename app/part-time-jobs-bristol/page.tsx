import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Bristol - Executive Roles in the South West',
  description: 'Find fractional executive jobs in Bristol and the South West. CFO, CMO, CTO roles. £650-£1,100 daily rates. Tech, aerospace, and creative industries.',
  openGraph: {
    title: 'Fractional Jobs Bristol - Executive Roles in the South West',
    description: 'Find fractional executive jobs in Bristol and across the South West.',
    type: 'website',
  },
}

const bristolAreas = [
  { name: 'Bristol City Centre', description: 'Professional services', rateRange: '£700-£1,100/day' },
  { name: 'Temple Quarter', description: 'Tech & enterprise', rateRange: '£750-£1,100/day' },
  { name: 'Harbourside', description: 'Creative & media', rateRange: '£650-£1,000/day' },
  { name: 'Filton', description: 'Aerospace & defence', rateRange: '£800-£1,200/day' },
  { name: 'Bath', description: 'Tech & heritage', rateRange: '£700-£1,050/day' },
  { name: 'Swindon', description: 'Corporate & financial', rateRange: '£650-£950/day' },
]

const bristolIndustries = [
  { name: 'Aerospace', icon: '✈️', growth: '+10% YoY' },
  { name: 'Tech/SaaS', icon: '💻', growth: '+22% YoY' },
  { name: 'Creative', icon: '🎨', growth: '+15% YoY' },
  { name: 'FinTech', icon: '💳', growth: '+18% YoY' },
  { name: 'Cleantech', icon: '🌱', growth: '+25% YoY' },
  { name: 'Media', icon: '📺', growth: '+12% YoY' },
]

const relatedSearches = [
  'Fractional CFO Jobs Bristol', 'Fractional CTO Jobs Bristol', 'Fractional CMO Jobs South West',
  'Part-Time CFO Bristol', 'Interim Executive Bristol', 'Portfolio Career Bristol',
  'Fractional Jobs Bath', 'Fractional Jobs Swindon', 'Fractional Executive Salary Bristol'
]

async function getBristolStats() {
  try {
    const sql = createDbQuery()
    const [total, avgRateResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (location ILIKE '%bristol%' OR location ILIKE '%south west%' OR location ILIKE '%bath%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS INTEGER)) as avg FROM jobs WHERE is_active = true AND (location ILIKE '%bristol%' OR location ILIKE '%south west%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`
    ])
    return {
      total: parseInt((total[0] as any)?.count || '0'),
      avgDayRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '875'))
    }
  } catch (error) {
    return { total: 15, avgDayRate: 875 }
  }
}

async function getBristolJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date
      FROM jobs
      WHERE is_active = true AND (location ILIKE '%bristol%' OR location ILIKE '%south west%' OR location ILIKE '%bath%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 6
    `
    return jobs
  } catch (error) {
    return []
  }
}

export default async function BristolPage() {
  const [stats, jobs] = await Promise.all([getBristolStats(), getBristolJobs()])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 py-20 md:py-32 overflow-hidden">
        {/* 3D Knowledge Graph */}
        <div className="absolute inset-0">
          <JobsGraph3D locationFilter="bristol" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
            ← Back to Home
          </Link>
          <div className="inline-block mb-6">
            <span className="bg-purple-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-purple-500/30">
              {stats.total}+ Jobs in the South West
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Fractional Jobs Bristol
          </h1>
          <img src="/logo.svg" alt="Fractional Jobs Bristol - Executive roles in the South West" className="hidden" width={1} height={1} />
          <p className="max-w-2xl text-xl text-purple-100 mb-10 leading-relaxed">
            {stats.total}+ fractional executive opportunities across Bristol and the South West. £650-£1,100 daily rates. Aerospace, tech, and creative sectors thriving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fractional-jobs?location=Bristol"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-purple-900 hover:bg-purple-50 transition-all duration-200"
            >
              Browse Bristol Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-purple-700">5%</div>
              <div className="text-gray-600 font-medium">of UK fractional roles</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-700">6th</div>
              <div className="text-gray-600 font-medium">largest UK market</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-700">+22%</div>
              <div className="text-gray-600 font-medium">YoY market growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jobs Across the South West</h2>
            <p className="text-xl text-gray-600">Find fractional roles from Bristol to Bath</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bristolAreas.map((area) => (
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Bristol Industries</h2>
            <p className="text-xl text-gray-600">Key sectors hiring fractional executives</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {bristolIndustries.map((industry) => (
              <div key={industry.name} className="bg-gray-50 rounded-xl p-6 text-center">
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-purple-700 text-sm font-semibold">{industry.growth}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bristol */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Bristol?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">✈️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aerospace Hub</h3>
              <p className="text-gray-600">
                Home to Airbus, Rolls-Royce, and 100+ aerospace companies. Premium rates for fractional CFOs and CTOs with aerospace experience.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Creative City</h3>
              <p className="text-gray-600">
                Bristol's creative and media sector is thriving - from Aardman Animations to digital agencies. Perfect for fractional CMOs.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Green Tech Leader</h3>
              <p className="text-gray-600">
                Bristol was European Green Capital 2015. Cleantech and sustainability sectors are booming with 25% YoY growth in fractional roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs */}
      {(jobs as any[]).length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Bristol Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(jobs as any[]).map((job: any) => (
                <Link key={job.id} href={`/fractional-job/${job.slug}`}>
                  <JobCard
                    title={job.title}
                    company={job.company_name}
                    location={job.location || 'Bristol'}
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
                href="/fractional-jobs?location=Bristol"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-all"
              >
                View All South West Jobs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Bristol FAQs</h2>
          <div className="space-y-6">
            <details className="group bg-white rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do fractional executives earn in Bristol?
                <span className="text-purple-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Bristol fractional executives typically earn £650-£1,100 per day. Aerospace and tech roles command the highest rates, often matching London levels for specialist expertise.
              </p>
            </details>
            <details className="group bg-white rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Is Bristol good for fractional tech roles?
                <span className="text-purple-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes - Bristol's tech scene has grown significantly with Temple Quarter Enterprise Zone. Companies like Just Eat, OVO Energy, and numerous scale-ups hire fractional CTOs and tech leaders.
              </p>
            </details>
            <details className="group bg-white rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How easy is it to work with London clients from Bristol?
                <span className="text-purple-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600">
                Very easy. Bristol is 1hr 45min from London Paddington by train. Many fractional executives maintain clients in both cities, benefiting from Bristol's lower costs and quality of life.
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
            Ready to Work in Bristol?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            {stats.total}+ fractional opportunities across Bristol, Bath, and the South West
          </p>
          <Link
            href="/fractional-jobs?location=Bristol"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-purple-900 hover:bg-purple-50 transition-all"
          >
            Browse Bristol Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
