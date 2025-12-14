import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { HireProcessStepper } from '@/components/HireProcessStepper'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Product Leadership UK | Hire Part-Time Product Executives',
  description: 'Hire fractional product leaders for your business. Part-time CPOs, VPs of Product, and Product Directors. Expert product leadership without full-time cost.',
  keywords: 'fractional product, fractional product director, part-time product executive, fractional vp product, hire product leader',
  alternates: { canonical: 'https://fractional.quest/fractional-product' },
}

export default function FractionalProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* 3D Knowledge Graph Background */}
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Product" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-purple-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Functional Leadership</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-purple-400">Product</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access senior product leadership without the full-time commitment. From CPOs to Product Directors, find the right level of expertise for your growth stage.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-purple-500 text-white font-bold uppercase tracking-wider hover:bg-purple-400 transition-colors">Find Product Leadership</Link>
                <Link href="/fractional-cpo-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CPO Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional Product Leadership</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Product-led companies need strong product leadership to succeed. Fractional product leaders bring strategic product thinking, team leadership, and execution experience—without requiring a full-time hire.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Fractional CPO', description: 'C-level product leadership for strategy and vision.', link: '/fractional-cpo-services' },
              { title: 'VP of Product', description: 'Senior product leadership for roadmap and team management.', link: '#contact' },
              { title: 'Product Director', description: 'Hands-on product leadership for growing product teams.', link: '#contact' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-gray-50 border border-gray-200 hover:border-purple-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">What Fractional Product Leaders Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Product Strategy', description: 'Define product vision, strategy, and positioning in the market.' },
              { title: 'Roadmap Planning', description: 'Build and prioritise product roadmaps aligned with business goals.' },
              { title: 'Team Leadership', description: 'Lead, mentor, and develop product managers and designers.' },
              { title: 'Customer Discovery', description: 'Run customer research to validate problems and solutions.' },
              { title: 'Product Operations', description: 'Implement product processes, tools, and measurement frameworks.' },
              { title: 'Stakeholder Management', description: 'Align product decisions with engineering, sales, and leadership.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-purple-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <HireProcessStepper accentColor="purple" />
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Product Leadership</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your product challenges and we'll match you with the right fractional product executive.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-purple-500 text-white font-bold uppercase tracking-wider hover:bg-purple-400 transition-colors">Get Started</Link>
            <Link href="/fractional-cpo-services" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Learn About Fractional CPOs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
