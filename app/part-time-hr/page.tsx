import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { HireProcessStepper } from '@/components/HireProcessStepper'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional HR Leadership UK | Hire Part-Time HR Executives',
  description: 'Hire fractional HR leaders for your business. Part-time CHROs, HR Directors, and People Leaders. Expert HR leadership without full-time cost.',
  keywords: 'fractional hr, fractional hr director, part-time hr executive, fractional people leader, hire hr leader',
  alternates: { canonical: 'https://fractional.quest/fractional-hr' },
}

export default function FractionalHRPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* 3D Knowledge Graph Background */}
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="HR" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-pink-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Functional Leadership</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-pink-400">HR</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access senior HR leadership without the full-time commitment. From CHROs to HR Directors, find the right level of expertise for your growth stage.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-pink-500 text-white font-bold uppercase tracking-wider hover:bg-pink-400 transition-colors">Find HR Leadership</Link>
                <Link href="/fractional-chro-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CHRO Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional HR Leadership</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">People challenges don't wait for you to hire a full-time HR leader. Fractional HR executives bring the expertise to build culture, hire great people, and navigate complex people issues—on a part-time basis.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Fractional CHRO', description: 'C-level HR leadership for strategy and culture transformation.', link: '/fractional-chro-services' },
              { title: 'HR Director', description: 'Senior HR leadership for policy, compliance, and team building.', link: '#contact' },
              { title: 'People Partner', description: 'Hands-on HR support for growing teams.', link: '#contact' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-gray-50 border border-gray-200 hover:border-pink-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">What Fractional HR Leaders Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'People Strategy', description: 'Develop HR strategies aligned with business goals and growth plans.' },
              { title: 'Talent Acquisition', description: 'Build recruiting processes and employer brand to attract top talent.' },
              { title: 'Culture Development', description: 'Shape company culture, values, and employee engagement programmes.' },
              { title: 'Performance Management', description: 'Implement performance reviews, feedback, and development frameworks.' },
              { title: 'HR Operations', description: 'Set up HR systems, policies, and compliance programmes.' },
              { title: 'Employee Relations', description: 'Navigate complex people issues, restructuring, and legal matters.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-pink-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <HireProcessStepper accentColor="pink" />
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find HR Leadership</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your people challenges and we'll match you with the right fractional HR executive.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-pink-500 text-white font-bold uppercase tracking-wider hover:bg-pink-400 transition-colors">Get Started</Link>
            <Link href="/fractional-chro-services" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Learn About Fractional CHROs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
