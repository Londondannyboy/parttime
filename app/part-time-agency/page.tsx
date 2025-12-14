import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Agency UK | Part-Time Agency Services',
  description: 'Access fractional agency services for your business. Part-time agency support for marketing, creative, and strategy. Agency expertise without full retainers.',
  keywords: 'fractional agency, fractional agency services, part-time agency, fractional marketing agency, fractional agency uk',
  alternates: { canonical: 'https://fractional.quest/fractional-agency' },
}

export default function FractionalAgencyPage() {
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
              <span className="inline-block bg-violet-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Agency Services</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-violet-400">Agency</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access agency-level expertise on a fractional basis. Get strategic and creative support without the overhead of traditional agency retainers.</p>
              <Link href="#contact" className="px-8 py-4 bg-violet-500 text-white font-bold uppercase tracking-wider hover:bg-violet-400 transition-colors inline-block">Find Agency Support</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional Agency?</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">A fractional agency provides ongoing access to agency-level talent and services on a part-time, retained basis. Instead of large monthly retainers for full agency services, you access the specific expertise you need at a fraction of the cost.</p>
          <p className="text-gray-600 mb-6">This model works particularly well for growing businesses that need strategic and creative support but don't have the budget for traditional agency relationships—or don't need the full breadth of agency services.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Fractional vs Traditional Agency</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-bold">Aspect</th>
                  <th className="p-4 text-left font-bold text-violet-700">Fractional Agency</th>
                  <th className="p-4 text-left font-bold">Traditional Agency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-4 font-medium">Monthly Cost</td><td className="p-4">£2,000-£8,000</td><td className="p-4">£10,000-£50,000+</td></tr>
                <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Commitment</td><td className="p-4">Flexible, monthly</td><td className="p-4">6-12 month contracts</td></tr>
                <tr className="border-b"><td className="p-4 font-medium">Focus</td><td className="p-4">Specific needs</td><td className="p-4">Full-service</td></tr>
                <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Relationship</td><td className="p-4">Direct with experts</td><td className="p-4">Account managed</td></tr>
                <tr className="border-b"><td className="p-4 font-medium">Flexibility</td><td className="p-4">High</td><td className="p-4">Limited by scope</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Fractional Agency Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Fractional Marketing Agency', description: 'Strategy, campaigns, content, and demand generation on a part-time basis.', link: '/fractional-marketing-agency' },
              { title: 'Fractional Creative Agency', description: 'Brand, design, and creative direction without full creative retainer.', link: '#contact' },
              { title: 'Fractional Digital Agency', description: 'Web, SEO, PPC, and digital marketing support as needed.', link: '#contact' },
              { title: 'Fractional PR Agency', description: 'Media relations, communications, and reputation management.', link: '#contact' },
            ].map((item, i) => (
              <Link key={i} href={item.link} className="block p-6 bg-gray-50 border border-gray-200 hover:border-violet-500 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Fractional Agency Support</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us what agency expertise you need and we'll match you with the right fractional support.</p>
          <Link href="/handler/sign-up" className="px-10 py-5 bg-violet-500 text-white font-bold uppercase tracking-wider hover:bg-violet-400 transition-colors inline-block">Get Started</Link>
        </div>
      </section>
    </div>
  )
}
