import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { IR35Calculator } from '@/components/IR35Calculator'
import { FAQ, TECH_FAQS } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Tech Jobs UK - CTO, VP Engineering, Tech Director Roles',
  description: 'Find fractional tech jobs in the UK. Fractional CTO, VP Engineering, Tech Director roles. £900-£1,500 daily rates. SaaS, FinTech, HealthTech opportunities.',
  openGraph: {
    title: 'Fractional Tech Jobs UK - CTO, VP Engineering, Tech Director Roles',
    description: 'Find fractional technology leadership roles across the UK.',
    type: 'website',
  },
}

const techRoles = [
  { name: 'Fractional CTO', description: 'Strategic technology leadership', rateRange: '£1,000-£1,500/day', demand: 'Very High' },
  { name: 'Fractional VP Engineering', description: 'Engineering team leadership', rateRange: '£900-£1,300/day', demand: 'High' },
  { name: 'Fractional Tech Director', description: 'Technical strategy & delivery', rateRange: '£850-£1,200/day', demand: 'High' },
  { name: 'Fractional Head of Product', description: 'Product strategy & roadmap', rateRange: '£800-£1,200/day', demand: 'High' },
  { name: 'Fractional CISO', description: 'Security & compliance leadership', rateRange: '£950-£1,400/day', demand: 'Growing' },
  { name: 'Fractional Data Lead', description: 'Data strategy & analytics', rateRange: '£850-£1,250/day', demand: 'Growing' },
]

const techSectors = [
  { name: 'SaaS/Cloud', icon: '☁️', growth: '+28% YoY', description: 'B2B software companies' },
  { name: 'FinTech', icon: '💳', growth: '+22% YoY', description: 'Financial technology' },
  { name: 'HealthTech', icon: '🏥', growth: '+25% YoY', description: 'Healthcare technology' },
  { name: 'E-commerce', icon: '🛒', growth: '+18% YoY', description: 'Online retail & marketplaces' },
  { name: 'AI/ML', icon: '🤖', growth: '+35% YoY', description: 'Artificial intelligence' },
  { name: 'Cybersecurity', icon: '🔐', growth: '+30% YoY', description: 'Security solutions' },
]

const techSkills = [
  'Cloud Architecture (AWS/GCP/Azure)', 'DevOps & Platform Engineering', 'AI/ML Implementation',
  'Data Engineering', 'API & Integration Strategy', 'Security & Compliance',
  'Team Scaling & Hiring', 'Technical Due Diligence', 'Legacy Modernization'
]

const relatedSearches = [
  'Fractional CTO Jobs UK', 'Fractional VP Engineering', 'Part-Time CTO London',
  'Fractional Tech Director', 'Fractional CISO Jobs', 'Startup CTO Jobs',
  'SaaS Fractional CTO', 'FinTech Fractional CTO', 'Fractional Head of Engineering'
]

async function getTechStats() {
  try {
    const sql = createDbQuery()
    const [total, avgRateResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (role_category ILIKE '%tech%' OR role_category ILIKE '%CTO%' OR role_category ILIKE '%engineering%' OR title ILIKE '%CTO%' OR title ILIKE '%tech%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS INTEGER)) as avg FROM jobs WHERE is_active = true AND (role_category ILIKE '%tech%' OR role_category ILIKE '%CTO%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`
    ])
    return {
      total: parseInt((total[0] as any)?.count || '0'),
      avgDayRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '1100'))
    }
  } catch (error) {
    return { total: 45, avgDayRate: 1100 }
  }
}

export default async function TechJobsPage() {
  const stats = await getTechStats()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Technology" limit={30} height="100%" isHero={true} showOverlay={true} />
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

                  <span className="inline-block bg-blue-500/20 backdrop-blur text-blue-200 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                    {stats.total}+ Tech Leadership Roles
                  </span>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                    Fractional<br />
                    <span className="text-blue-300">Tech</span> Jobs UK
                  </h1>

                  <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                    Fractional CTO, VP Engineering, Tech Director positions. £900-£1,500 daily rates across SaaS, FinTech, and HealthTech.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/fractional-jobs?industry=Technology"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-all duration-200"
                    >
                      Browse Tech Jobs →
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
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">25%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">of All Roles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">£{stats.avgDayRate}</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Avg Day Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">+28%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">YoY Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">65%</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Remote Work</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fractional Tech Jobs</h2>
            <p className="text-xl text-gray-500">Browse {stats.total}+ tech leadership opportunities</p>
          </div>
          <EmbeddedJobBoard defaultDepartment="Engineering" />
        </div>
      </section>

      {/* Tech Roles */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Role</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fractional Tech Roles</h2>
            <p className="text-xl text-gray-500">Technology leadership positions available</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techRoles.map((role) => (
              <div key={role.name} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{role.description}</p>
                <p className="text-blue-700 font-semibold mb-1">{role.rateRange}</p>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Demand: {role.demand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Sectors */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">By Sector</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech Sectors Hiring</h2>
            <p className="text-xl text-gray-500">Industries with highest demand for fractional tech leaders</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techSectors.map((sector) => (
              <div key={sector.name} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-all">
                <span className="text-4xl mb-3 block">{sector.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{sector.name}</h3>
                <p className="text-blue-700 text-sm font-semibold mb-1">{sector.growth}</p>
                <p className="text-gray-600 text-xs">{sector.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Skills */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">Skills</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">In-Demand Tech Skills</h2>
            <p className="text-xl text-gray-500">Skills that command premium fractional rates</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techSkills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-gray-50 rounded-full text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Tech */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">The Opportunity</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Fractional Tech Leadership?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Startup-Ready</h3>
              <p className="text-gray-600">
                Startups and scale-ups can't always afford a £200k+ full-time CTO. Fractional tech leaders provide senior expertise at a fraction of the cost.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Rates</h3>
              <p className="text-gray-600">
                Tech leadership commands the highest fractional rates. CTOs with cloud, AI, or security expertise can earn £1,200-£1,500/day.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Remote-First</h3>
              <p className="text-gray-600">
                65% of fractional tech roles are fully remote or hybrid. Work with clients across the UK and Europe from anywhere.
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
            <p className="text-xl text-gray-500">Understand your take-home as a fractional tech leader</p>
          </div>
          <IR35Calculator defaultDayRate={1100} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech Fractional FAQs</h2>
            <p className="text-xl text-gray-500">Common questions about fractional tech roles</p>
          </div>
          <FAQ items={TECH_FAQS} title="" />
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
                className="px-4 py-2 bg-gray-50 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm border border-gray-200"
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
            Ready for Fractional Tech Leadership?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            {stats.total}+ CTO, VP Engineering, and Tech Director opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fractional-jobs?role=CTO"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all"
            >
              Browse Tech Jobs
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
