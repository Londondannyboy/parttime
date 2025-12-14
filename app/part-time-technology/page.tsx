import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { HireProcessStepper } from '@/components/HireProcessStepper'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Technology Leadership UK | Hire Part-Time Tech Executives',
  description: 'Hire fractional technology leaders for your business. Part-time CTOs, CIOs, VPs of Engineering. Expert tech leadership without full-time cost.',
  keywords: 'fractional technology, fractional tech director, part-time technology executive, fractional vp engineering, hire tech leader',
  alternates: { canonical: 'https://fractional.quest/fractional-technology' },
}

export default function FractionalTechnologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* 3D Knowledge Graph Background */}
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Technology" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-blue-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Functional Leadership</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-blue-400">Technology</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access senior technology leadership without the full-time commitment. From CTOs to VPs of Engineering, find the right level of technical expertise for your growth stage.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-blue-500 text-white font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">Find Tech Leadership</Link>
                <Link href="/fractional-cto-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CTO Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional Technology Leadership</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Technology decisions shape your company's future. Fractional technology leaders bring deep technical expertise and leadership experience—helping you make the right architectural decisions, build great teams, and ship quality products.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Fractional CTO', description: 'C-level technical leadership for strategy and architecture.', link: '/fractional-cto-services' },
              { title: 'Fractional CIO', description: 'IT leadership for enterprise systems and digital transformation.', link: '/fractional-cio-services' },
              { title: 'VP of Engineering', description: 'Engineering leadership for team scaling and delivery.', link: '#contact' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-gray-50 border border-gray-200 hover:border-blue-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">What Fractional Technology Leaders Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Technical Strategy', description: 'Define technology vision, architecture, and build vs buy decisions.' },
              { title: 'Team Building', description: 'Recruit, develop, and lead high-performing engineering teams.' },
              { title: 'Architecture Review', description: 'Evaluate and improve system architecture, scalability, and security.' },
              { title: 'Vendor Selection', description: 'Select technology partners, tools, and platforms.' },
              { title: 'Engineering Process', description: 'Implement development methodologies, CI/CD, and quality practices.' },
              { title: 'Technical Due Diligence', description: 'Support M&A and investment processes with technical evaluation.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-blue-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <HireProcessStepper accentColor="blue" />
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Technology Leadership</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your technology challenges and we'll match you with the right fractional tech executive.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-blue-500 text-white font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">Get Started</Link>
            <Link href="/fractional-cto-services" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Learn About Fractional CTOs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
