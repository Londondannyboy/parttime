import { Metadata } from 'next'
import Link from 'next/link'
import { VideoHeroBackground } from '@/components/VideoHeroBackground'

export const revalidate = 3600
const HERO_VIDEO_PLAYBACK_ID = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

export const metadata: Metadata = {
  title: 'Hire Operations Consultants UK | Fractional Operations Experts',
  description: 'Hire experienced operations consultants on a fractional basis. Expert operations professionals for scaling, process improvement, and efficiency. Available part-time.',
  keywords: 'operations consultants, hire operations consultant, fractional operations expert, operations consultant uk, business operations consultant',
  alternates: { canonical: 'https://fractional.quest/operations-consultants' },
}

export default function OperationsConsultantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <VideoHeroBackground playbackId={HERO_VIDEO_PLAYBACK_ID} fallbackGradient={true} />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-orange-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Popular Roles</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Operations<br /><span className="text-orange-400">Consultants</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Hire experienced operations professionals on a fractional basis. Get expert operational strategy and execution without the cost of a full operations team.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-orange-500 text-black font-bold uppercase tracking-wider hover:bg-orange-400 transition-colors">Find a Consultant</Link>
                <Link href="/fractional-coo-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional COO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What Operations Consultants Do</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Operations consultants help businesses run more efficiently, scale sustainably, and build systems that work. On a fractional basis, they bring COO-level expertise without the full-time commitment.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { title: 'Process Design', description: 'Create efficient, scalable operational processes and workflows.' },
              { title: 'Systems Implementation', description: 'Select and implement operational tools and platforms.' },
              { title: 'Team Structure', description: 'Design organisational structures that support growth.' },
              { title: 'Performance Management', description: 'Build KPIs, dashboards, and accountability frameworks.' },
              { title: 'Vendor Management', description: 'Optimise supplier relationships and negotiate better terms.' },
              { title: 'Cost Optimisation', description: 'Identify and implement operational efficiencies.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 border-l-4 border-orange-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">When to Hire an Operations Consultant</h2>
          <div className="space-y-4">
            {[
              'Scaling rapidly and operations are struggling to keep up',
              'Need to improve efficiency and reduce operational costs',
              'Implementing new systems or tools across the organisation',
              'Building operational infrastructure for the first time',
              'Preparing for rapid growth or market expansion',
              'Need senior operational guidance without full-time COO',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-200">
                <span className="text-orange-500 font-bold">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find an Operations Consultant</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your operational needs and we'll match you with experienced operations professionals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-orange-500 text-black font-bold uppercase tracking-wider hover:bg-orange-400 transition-colors">Get Started</Link>
            <Link href="/fractional-operations" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Explore Operations Leadership</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
