import { Metadata } from 'next'
import Link from 'next/link'
import { VideoHeroBackground } from '@/components/VideoHeroBackground'

export const revalidate = 3600
const HERO_VIDEO_PLAYBACK_ID = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

export const metadata: Metadata = {
  title: 'Hire Marketing Consultants UK | Fractional Marketing Experts',
  description: 'Hire experienced marketing consultants on a fractional basis. Expert marketing professionals for strategy, brand, digital, and growth. Available part-time.',
  keywords: 'marketing consultants, hire marketing consultant, fractional marketing expert, marketing consultant uk, marketing strategy consultant',
  alternates: { canonical: 'https://fractional.quest/marketing-consultants' },
}

export default function MarketingConsultantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <VideoHeroBackground playbackId={HERO_VIDEO_PLAYBACK_ID} fallbackGradient={true} />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-amber-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Popular Roles</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Marketing<br /><span className="text-amber-400">Consultants</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Hire experienced marketing professionals on a fractional basis. Get expert marketing strategy and execution without the cost of a full marketing team.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">Find a Consultant</Link>
                <Link href="/fractional-cmo-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CMO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What Marketing Consultants Do</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Marketing consultants help businesses attract customers, build brands, and drive growth. On a fractional basis, they bring senior marketing expertise without the commitment of a full-time hire.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { title: 'Marketing Strategy', description: 'Develop comprehensive marketing plans aligned with business objectives.' },
              { title: 'Brand Development', description: 'Create and refine brand positioning, messaging, and visual identity.' },
              { title: 'Digital Marketing', description: 'Manage SEO, PPC, social media, and content marketing programmes.' },
              { title: 'Demand Generation', description: 'Build lead generation funnels and customer acquisition campaigns.' },
              { title: 'Marketing Operations', description: 'Implement marketing technology, automation, and analytics.' },
              { title: 'Agency Management', description: 'Select, brief, and manage marketing agencies and freelancers.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 border-l-4 border-amber-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">When to Hire a Marketing Consultant</h2>
          <div className="space-y-4">
            {[
              'Launching a new product or entering new markets',
              'Need marketing expertise but not ready for full-time hire',
              'Rebranding or repositioning your company',
              'Scaling marketing operations and need senior guidance',
              'Want to audit and improve marketing performance',
              'Building marketing team and need interim leadership',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-200">
                <span className="text-amber-500 font-bold">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find a Marketing Consultant</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your marketing needs and we'll match you with experienced marketing professionals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">Get Started</Link>
            <Link href="/fractional-marketing" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Explore Marketing Leadership</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
