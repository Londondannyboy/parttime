import { Metadata } from 'next'
import Link from 'next/link'
import { VideoHeroBackground } from '@/components/VideoHeroBackground'

export const revalidate = 3600
const HERO_VIDEO_PLAYBACK_ID = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

export const metadata: Metadata = {
  title: 'Hire Cybersecurity Consultants UK | Fractional Security Experts',
  description: 'Hire experienced cybersecurity consultants on a fractional basis. Expert security professionals for compliance, risk assessment, and security programmes. Available part-time.',
  keywords: 'cybersecurity consultants, hire cybersecurity consultant, fractional security expert, cybersecurity consultant uk, information security consultant',
  alternates: { canonical: 'https://fractional.quest/cybersecurity-consultants' },
}

export default function CybersecurityConsultantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <VideoHeroBackground playbackId={HERO_VIDEO_PLAYBACK_ID} fallbackGradient={true} />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-red-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Popular Roles</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Cybersecurity<br /><span className="text-red-400">Consultants</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Hire experienced cybersecurity professionals on a fractional basis. Get expert security guidance without the cost of a full-time security team.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-red-500 text-white font-bold uppercase tracking-wider hover:bg-red-400 transition-colors">Find a Consultant</Link>
                <Link href="/fractional-ciso-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CISO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What Cybersecurity Consultants Do</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Cybersecurity consultants help organisations protect their systems, data, and reputation from cyber threats. On a fractional basis, they provide expert guidance without the overhead of full-time security staff.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { title: 'Security Assessments', description: 'Evaluate your security posture, identify vulnerabilities, and prioritise remediation.' },
              { title: 'Compliance Support', description: 'Achieve SOC 2, ISO 27001, PCI-DSS, GDPR, and other security certifications.' },
              { title: 'Incident Response', description: 'Prepare for and respond to security incidents with proven methodologies.' },
              { title: 'Security Architecture', description: 'Design secure systems, networks, and cloud infrastructure.' },
              { title: 'Penetration Testing', description: 'Test your defences with authorised simulated attacks.' },
              { title: 'Security Training', description: 'Educate your team on security awareness and best practices.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 border-l-4 border-red-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">When to Hire a Cybersecurity Consultant</h2>
          <div className="space-y-4">
            {[
              'Preparing for SOC 2 or ISO 27001 certification',
              'Responding to customer security questionnaires',
              'Building a security programme from scratch',
              'Assessing security after a breach or incident',
              'Preparing for enterprise customer requirements',
              'Meeting investor due diligence requirements',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-200">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find a Cybersecurity Consultant</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your security needs and we'll match you with experienced cybersecurity professionals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-red-500 text-white font-bold uppercase tracking-wider hover:bg-red-400 transition-colors">Get Started</Link>
            <Link href="/fractional-security" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Explore Security Leadership</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
