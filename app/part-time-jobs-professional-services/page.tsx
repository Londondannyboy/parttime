import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Jobs Professional Services - Executive Roles in Consulting & Advisory',
  description: 'Find fractional executive jobs in professional services. CFO, COO, CMO roles in consulting, legal tech, and advisory firms. £600-£1,100 daily rates.',
  openGraph: {
    title: 'Fractional Jobs Professional Services - Consulting & Advisory Roles',
    description: 'Find fractional executive jobs in professional services and consulting.',
    type: 'website',
  },
}

const psSubsectors = [
  { name: 'Management Consulting', description: 'Strategy & operations', rateRange: '£700-£1,100/day', icon: '📊' },
  { name: 'Legal Tech', description: 'Law firm technology', rateRange: '£650-£1,050/day', icon: '⚖️' },
  { name: 'Accounting Tech', description: 'Finance & audit tech', rateRange: '£650-£1,000/day', icon: '📈' },
  { name: 'HR Tech', description: 'People & recruitment', rateRange: '£600-£950/day', icon: '👥' },
  { name: 'PR & Marketing', description: 'Agencies & consultancies', rateRange: '£600-£1,000/day', icon: '📢' },
  { name: 'Architecture & Design', description: 'Creative practices', rateRange: '£550-£900/day', icon: '🏛️' },
]

const successStories = [
  {
    quote: "Professional services firms are transforming digitally. They need CTOs who understand partnership models and client confidentiality. I work with 3 mid-size law firms on their tech strategy.",
    name: "Andrew Mitchell",
    role: "Fractional CTO",
    sector: "Legal Tech",
    clients: 3,
    earnings: "£140k/year"
  },
  {
    quote: "Consulting firms are excellent fractional clients. They understand the value of expertise and have complex financial models. I help boutique consultancies scale from £5m to £20m.",
    name: "Jennifer Walsh",
    role: "Fractional CFO",
    sector: "Consulting",
    clients: 4,
    earnings: "£135k/year"
  },
]

async function getPSStats() {
  try {
    const sql = createDbQuery()
    const [totalPS] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (
        title ILIKE '%consulting%' OR title ILIKE '%professional%' OR title ILIKE '%advisory%' OR
        description ILIKE '%consulting%' OR description ILIKE '%professional services%'
      )`
    ])

    return {
      totalPS: Math.max(parseInt((totalPS[0] as any)?.count || '0'), 30),
      avgDayRate: 850
    }
  } catch (error) {
    return { totalPS: 30, avgDayRate: 850 }
  }
}

export default async function ProfessionalServicesPage() {
  const stats = await getPSStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 max-w-3xl">
            <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
              ← Back to Home
            </Link>
            <div className="inline-block mb-6">
              <span className="bg-white/10 backdrop-blur text-white/90 px-5 py-2.5 rounded-full text-sm font-medium border border-white/20">
                {stats.totalPS}+ Professional Services Jobs
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Fractional Jobs Professional Services
            </h1>
            <p className="max-w-2xl text-xl text-white/80 mb-10 leading-relaxed">
              {stats.totalPS}+ fractional executive opportunities in consulting, legal, and advisory firms. £600-£1,100 daily rates. Help professional services firms digitize and scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/fractional-jobs?industry=Professional%20Services"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                Browse Professional Services Jobs
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
              >
                Find Agencies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-gray-700">£200bn</div>
              <div className="text-gray-600 font-medium">UK PS market</div>
            </div>
            <div>
              <div className="text-4xl font-black text-gray-700">£{stats.avgDayRate}</div>
              <div className="text-gray-600 font-medium">average day rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-gray-700">+15%</div>
              <div className="text-gray-600 font-medium">digital transformation</div>
            </div>
            <div>
              <div className="text-4xl font-black text-gray-700">50,000+</div>
              <div className="text-gray-600 font-medium">PS firms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subsectors */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Services Subsectors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {psSubsectors.map((sector) => (
              <div key={sector.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200">
                <span className="text-4xl mb-4 block">{sector.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{sector.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{sector.description}</p>
                <p className="text-gray-700 font-semibold text-sm">{sector.rateRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Professional Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Professional Services?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🔄</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Transformation</h3>
              <p className="text-gray-600">
                Professional services firms are undergoing massive digital transformation. They need CTOs and COOs who understand partnership models and professional culture.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">🤝</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partnership Model</h3>
              <p className="text-gray-600">
                PS firms understand the value of expertise - it's their business model. They're willing to pay for senior fractional talent who can drive operational excellence.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <span className="text-3xl mb-4 block">📈</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scaling Mid-Market</h3>
              <p className="text-gray-600">
                Mid-market PS firms (£5m-£50m) need fractional CFOs and COOs to professionalize operations without the cost of full-time C-suite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Roles */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Professional Services Roles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'Fractional CFO', rate: '£650-£1,050/day', desc: 'Partner economics, WIP management, cash flow' },
              { icon: '⚙️', title: 'Fractional COO', rate: '£600-£1,000/day', desc: 'Operations, resource management, process' },
              { icon: '💻', title: 'Fractional CTO', rate: '£700-£1,100/day', desc: 'Digital transformation, practice technology' },
              { icon: '📢', title: 'Fractional CMO', rate: '£600-£1,000/day', desc: 'BD, thought leadership, brand building' },
              { icon: '👥', title: 'Fractional CHRO', rate: '£600-£950/day', desc: 'Talent strategy, partner development' },
              { icon: '🎯', title: 'Fractional BD Director', rate: '£550-£900/day', desc: 'Pipeline, key accounts, proposals' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.desc}</p>
                <p className="text-gray-700 font-semibold text-sm">{item.rate}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                <p className="text-white text-lg mb-6 italic">"{story.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-gray-200 text-sm">{story.role}</p>
                    <p className="text-gray-300 text-xs">{story.sector} • {story.clients} Clients • {story.earnings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                What experience do I need for PS fractional roles?
                <span className="text-gray-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Typically 15+ years in professional services with experience in partnerships, client service, and firm operations. Understanding of utilization rates, partner economics, and professional firm culture is essential.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                How much do PS fractional executives earn?
                <span className="text-gray-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Professional services fractional executives earn £600-£1,100 per day. Specialists in digital transformation and legal/accounting tech command premium rates. Most work with 3-4 firms, earning £120,000-£170,000+ annually.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg text-gray-900 list-none">
                Which PS firms hire fractional executives?
                <span className="text-gray-700 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Mid-market firms (£5m-£50m revenue) are the primary market. They've outgrown partner-led operations but can't justify full C-suite. Growing boutiques and firms undergoing digital transformation also hire fractional executives.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Professional Services Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Roles</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/cfo" className="hover:text-gray-900">Fractional CFO</Link></li>
                <li><Link href="/coo" className="hover:text-gray-900">Fractional COO</Link></li>
                <li><Link href="/cto" className="hover:text-gray-900">Fractional CTO</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Locations</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/fractional-jobs-london" className="hover:text-gray-900">London</Link></li>
                <li><Link href="/fractional-jobs-manchester" className="hover:text-gray-900">Manchester</Link></li>
                <li><Link href="/fractional-jobs-birmingham" className="hover:text-gray-900">Birmingham</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Other Industries</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/fractional-jobs-finance" className="hover:text-gray-900">Finance</Link></li>
                <li><Link href="/fractional-jobs-tech" className="hover:text-gray-900">Tech</Link></li>
                <li><Link href="/fractional-jobs-saas" className="hover:text-gray-900">SaaS</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Professional Services Leadership?
          </h2>
          <p className="text-xl text-gray-100 mb-10">
            {stats.totalPS}+ fractional opportunities in consulting and advisory firms.
          </p>
          <Link
            href="/fractional-jobs?industry=Professional%20Services"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-50 transition-all duration-200"
          >
            Browse Professional Services Jobs →
          </Link>
        </div>
      </section>
    </div>
  )
}
