import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { HireProcessStepper } from '@/components/HireProcessStepper'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Data Leadership UK | Hire Part-Time Data Executives',
  description: 'Hire fractional data leaders for your business. Part-time CDOs, VPs of Data, and Analytics Directors. Expert data leadership without full-time cost.',
  keywords: 'fractional data, fractional data director, part-time data executive, fractional vp analytics, hire data leader, fractional cdo',
  alternates: { canonical: 'https://fractional.quest/fractional-data' },
}

export default function FractionalDataPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* 3D Knowledge Graph Background */}
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Data" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-cyan-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Functional Leadership</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-cyan-400">Data</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access senior data leadership without the full-time commitment. From CDOs to Analytics Directors, find the right level of data expertise for your growth stage.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-cyan-500 text-white font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors">Find Data Leadership</Link>
                <Link href="/fractional-cdo-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CDO Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional Data Leadership</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Data is your competitive advantage—but only if you can use it effectively. Fractional data leaders help you build data capabilities, implement analytics, and make data-driven decisions without the cost of a full-time data executive.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Fractional CDO', description: 'C-level data leadership for strategy and governance.', link: '/fractional-cdo-services' },
              { title: 'VP of Data', description: 'Senior data leadership for infrastructure and analytics.', link: '#contact' },
              { title: 'Analytics Director', description: 'Hands-on analytics leadership and team building.', link: '#contact' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-gray-50 border border-gray-200 hover:border-cyan-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">What Fractional Data Leaders Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Data Strategy', description: 'Define data vision, roadmap, and how data enables business goals.' },
              { title: 'Data Infrastructure', description: 'Design and implement data platforms, warehouses, and pipelines.' },
              { title: 'Analytics & BI', description: 'Build dashboards, reports, and self-service analytics capabilities.' },
              { title: 'Data Governance', description: 'Establish data quality, security, and compliance frameworks.' },
              { title: 'AI & ML Strategy', description: 'Evaluate and implement AI/ML opportunities for the business.' },
              { title: 'Team Building', description: 'Recruit and develop data engineers, analysts, and scientists.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-cyan-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <HireProcessStepper accentColor="cyan" />
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Data Leadership</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your data challenges and we'll match you with the right fractional data executive.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-cyan-500 text-white font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors">Get Started</Link>
            <Link href="/fractional-cdo-services" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Learn About Fractional CDOs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
