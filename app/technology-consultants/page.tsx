import { Metadata } from 'next'
import Link from 'next/link'
import { VideoHeroBackground } from '@/components/VideoHeroBackground'

export const revalidate = 3600
const HERO_VIDEO_PLAYBACK_ID = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

export const metadata: Metadata = {
  title: 'Hire Technology Consultants UK | Fractional Tech Experts',
  description: 'Hire experienced technology consultants on a fractional basis. Expert tech professionals for architecture, engineering leadership, and digital transformation. Available part-time.',
  keywords: 'technology consultants, hire tech consultant, fractional technology expert, it consultant uk, technical strategy consultant',
  alternates: { canonical: 'https://fractional.quest/technology-consultants' },
}

export default function TechnologyConsultantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <VideoHeroBackground playbackId={HERO_VIDEO_PLAYBACK_ID} fallbackGradient={true} />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-blue-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Popular Roles</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Technology<br /><span className="text-blue-400">Consultants</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Hire experienced technology professionals on a fractional basis. Get expert technical strategy and architecture without the cost of a full technology team.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-blue-500 text-white font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">Find a Consultant</Link>
                <Link href="/fractional-cto-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CTO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What Technology Consultants Do</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Technology consultants help businesses make the right technical decisions, build great products, and scale their engineering capabilities. On a fractional basis, they bring CTO-level expertise without the full-time commitment.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { title: 'Technical Strategy', description: 'Define technology roadmaps, architecture, and build vs buy decisions.' },
              { title: 'Architecture Review', description: 'Evaluate and improve system design, scalability, and security.' },
              { title: 'Team Building', description: 'Recruit, structure, and develop high-performing engineering teams.' },
              { title: 'Vendor Selection', description: 'Evaluate technology partners, platforms, and tools.' },
              { title: 'Technical Due Diligence', description: 'Assess technology for M&A, investment, or partnership decisions.' },
              { title: 'Digital Transformation', description: 'Modernise legacy systems and adopt cloud-native approaches.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 border-l-4 border-blue-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">When to Hire a Technology Consultant</h2>
          <div className="space-y-4">
            {[
              'Building a new product and need architectural guidance',
              'Scaling engineering team and need leadership expertise',
              'Evaluating build vs buy decisions for key systems',
              'Preparing for technical due diligence (M&A or fundraising)',
              'Migrating to cloud or modernising legacy systems',
              'Need senior technical perspective without full-time CTO',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-200">
                <span className="text-blue-500 font-bold">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find a Technology Consultant</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your technical needs and we'll match you with experienced technology professionals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-blue-500 text-white font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">Get Started</Link>
            <Link href="/fractional-technology" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Explore Tech Leadership</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
