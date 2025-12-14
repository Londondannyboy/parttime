import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Services UK | Part-Time Executive Leadership',
  description: 'Access fractional executive services for your business. Part-time CFOs, CMOs, CTOs and more. Get senior leadership without full-time commitment or cost.',
  keywords: 'fractional services, fractional executive services, part-time executive, fractional leadership, fractional services uk',
  alternates: { canonical: 'https://fractional.quest/fractional-services' },
}

export default function FractionalServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-emerald-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Executive Services</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-emerald-400">Services</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access senior executive talent on a part-time basis. Get the leadership expertise your business needs without the full-time cost or commitment.</p>
              <Link href="#services" className="px-8 py-4 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors inline-block">Explore Services</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What Are Fractional Services?</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Fractional services provide businesses access to experienced executives who work part-time—typically 1-3 days per week. Instead of hiring a full-time executive, you get senior expertise at a fraction of the cost.</p>
          <p className="text-gray-600 mb-6">This model is ideal for growing businesses that need strategic leadership but aren't ready for (or don't need) full-time executive hires. Fractional executives bring experience from multiple companies and industries, offering perspective that full-time hires often lack.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-gray-50 text-center">
              <div className="text-4xl font-black text-emerald-500 mb-2">60%</div>
              <p className="text-gray-600 text-sm">Cost savings vs full-time</p>
            </div>
            <div className="p-6 bg-gray-50 text-center">
              <div className="text-4xl font-black text-emerald-500 mb-2">1-3</div>
              <p className="text-gray-600 text-sm">Days per week typical</p>
            </div>
            <div className="p-6 bg-gray-50 text-center">
              <div className="text-4xl font-black text-emerald-500 mb-2">2 wks</div>
              <p className="text-gray-600 text-sm">Average time to start</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Available Fractional Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Fractional CFO', description: 'Financial strategy, fundraising, and FP&A leadership.', link: '/fractional-cfo-services', color: 'emerald' },
              { title: 'Fractional CMO', description: 'Marketing strategy, brand, and growth leadership.', link: '/fractional-cmo-services', color: 'amber' },
              { title: 'Fractional CTO', description: 'Technical strategy, architecture, and engineering leadership.', link: '/fractional-cto-services', color: 'blue' },
              { title: 'Fractional COO', description: 'Operations, scaling, and process leadership.', link: '/fractional-coo-services', color: 'orange' },
              { title: 'Fractional CPO', description: 'Product strategy, roadmap, and team leadership.', link: '/fractional-cpo-services', color: 'purple' },
              { title: 'Fractional CHRO', description: 'People strategy, culture, and HR leadership.', link: '/fractional-chro-services', color: 'pink' },
              { title: 'Fractional CRO', description: 'Revenue strategy, sales, and GTM leadership.', link: '/fractional-cro-services', color: 'green' },
              { title: 'Fractional CISO', description: 'Security strategy, compliance, and risk leadership.', link: '/fractional-ciso-services', color: 'red' },
              { title: 'Fractional CDO', description: 'Data strategy, analytics, and AI leadership.', link: '/fractional-cdo-services', color: 'cyan' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-white border border-gray-200 hover:border-emerald-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Who Uses Fractional Services?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Startups & Scale-ups', description: 'Need senior expertise but can\'t justify full-time executive salaries.' },
              { title: 'SMEs', description: 'Want strategic leadership in specific functions without full-time overhead.' },
              { title: 'PE Portfolio Companies', description: 'Need rapid value creation with experienced operators.' },
              { title: 'Companies in Transition', description: 'Facing strategic challenges that need expert guidance.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 border-l-4 border-emerald-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Fractional Executive Services</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us what leadership expertise you need and we'll match you with experienced fractional executives.</p>
          <Link href="/handler/sign-up" className="px-10 py-5 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors inline-block">Get Started</Link>
        </div>
      </section>
    </div>
  )
}
