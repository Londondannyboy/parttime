import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { HireProcessStepper } from '@/components/HireProcessStepper'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Security Leadership UK | Hire Part-Time Security Executives',
  description: 'Hire fractional security leaders for your business. Part-time CISOs, Security Directors, and InfoSec Managers. Expert security leadership without full-time cost.',
  keywords: 'fractional security, fractional security director, part-time security executive, fractional ciso, hire security leader',
  alternates: { canonical: 'https://fractional.quest/fractional-security' },
}

export default function FractionalSecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* 3D Knowledge Graph Background */}
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Security" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-red-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Functional Leadership</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-red-400">Security</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access senior security leadership without the full-time commitment. From CISOs to Security Directors, find the right level of security expertise for your risk profile.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-red-500 text-white font-bold uppercase tracking-wider hover:bg-red-400 transition-colors">Find Security Leadership</Link>
                <Link href="/fractional-ciso-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CISO Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional Security Leadership</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Cyber security is a board-level concern, but not every company can afford a full-time CISO. Fractional security leaders provide the expertise to build security programmes, achieve compliance, and manage risk—on a part-time basis.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { title: 'Fractional CISO', description: 'C-level security leadership for strategy and governance.', link: '/fractional-ciso-services' },
              { title: 'Security Director', description: 'Senior security leadership for operations and compliance.', link: '#contact' },
              { title: 'InfoSec Manager', description: 'Hands-on security operations and team leadership.', link: '#contact' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-gray-50 border border-gray-200 hover:border-red-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">What Fractional Security Leaders Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Security Strategy', description: 'Develop security programmes aligned with business risk and goals.' },
              { title: 'Compliance', description: 'Achieve and maintain SOC 2, ISO 27001, PCI-DSS, GDPR compliance.' },
              { title: 'Risk Management', description: 'Assess, prioritise, and mitigate security risks.' },
              { title: 'Incident Response', description: 'Build and test incident response plans and capabilities.' },
              { title: 'Security Operations', description: 'Implement security tools, monitoring, and vulnerability management.' },
              { title: 'Vendor Assessment', description: 'Evaluate third-party security and manage supply chain risk.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-red-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <HireProcessStepper accentColor="red" />
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Security Leadership</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your security challenges and we'll match you with the right fractional security executive.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-red-500 text-white font-bold uppercase tracking-wider hover:bg-red-400 transition-colors">Get Started</Link>
            <Link href="/fractional-ciso-services" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Learn About Fractional CISOs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
