import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Consulting UK | Part-Time Expert Consultants',
  description: 'Access fractional consulting services for your business. Expert consultants in finance, marketing, technology, and operations. Part-time expertise, full-time results.',
  keywords: 'fractional consulting, fractional consultants, part-time consulting, fractional consulting services, fractional consulting uk',
  alternates: { canonical: 'https://fractional.quest/fractional-consulting' },
}

export default function FractionalConsultingPage() {
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
              <span className="inline-block bg-indigo-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Consulting Services</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-indigo-400">Consulting</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access expert consultants on a fractional basis. Get strategic advice and hands-on support from experienced professionals without the cost of traditional consulting.</p>
              <Link href="#contact" className="px-8 py-4 bg-indigo-500 text-white font-bold uppercase tracking-wider hover:bg-indigo-400 transition-colors inline-block">Find Consultants</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What is Fractional Consulting?</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Fractional consulting provides ongoing access to expert consultants who work with you part-time on a retained basis. Unlike traditional consulting projects with defined end dates, fractional consultants become an extension of your team.</p>
          <p className="text-gray-600 mb-6">This model combines the expertise of top consultants with the continuity and relationship depth of an employee. You get strategic advice and hands-on execution from someone who deeply understands your business.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Fractional vs Traditional Consulting</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-bold">Aspect</th>
                  <th className="p-4 text-left font-bold text-indigo-700">Fractional Consulting</th>
                  <th className="p-4 text-left font-bold">Traditional Consulting</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-4 font-medium">Engagement</td><td className="p-4">Ongoing, retained</td><td className="p-4">Project-based</td></tr>
                <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Cost Model</td><td className="p-4">Monthly retainer</td><td className="p-4">Day rates or project fees</td></tr>
                <tr className="border-b"><td className="p-4 font-medium">Relationship</td><td className="p-4">Deep, ongoing partnership</td><td className="p-4">Transactional</td></tr>
                <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Knowledge</td><td className="p-4">Builds over time</td><td className="p-4">Limited by project scope</td></tr>
                <tr className="border-b"><td className="p-4 font-medium">Accountability</td><td className="p-4">Shared outcomes</td><td className="p-4">Deliverable-focused</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Consulting Areas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Finance Consulting', description: 'FP&A, fundraising, M&A support, financial transformation.', link: '/finance-consultants' },
              { title: 'Marketing Consulting', description: 'Strategy, brand, digital marketing, demand generation.', link: '/marketing-consultants' },
              { title: 'Technology Consulting', description: 'Architecture, digital transformation, tech strategy.', link: '/technology-consultants' },
              { title: 'Operations Consulting', description: 'Process improvement, scaling, efficiency.', link: '/operations-consultants' },
              { title: 'Security Consulting', description: 'Cybersecurity, compliance, risk management.', link: '/cybersecurity-consultants' },
              { title: 'Executive Consulting', description: 'C-level advisory, board support, strategy.', link: '/fractional-services' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-gray-50 border border-gray-200 hover:border-indigo-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Fractional Consultants</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us what expertise you need and we'll match you with experienced fractional consultants.</p>
          <Link href="/handler/sign-up" className="px-10 py-5 bg-indigo-500 text-white font-bold uppercase tracking-wider hover:bg-indigo-400 transition-colors inline-block">Get Started</Link>
        </div>
      </section>
    </div>
  )
}
