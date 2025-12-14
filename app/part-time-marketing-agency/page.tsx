import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Marketing Agency UK | Part-Time Marketing Support',
  description: 'Access fractional marketing agency services. Part-time marketing strategy, campaigns, and execution. Agency expertise without full agency retainers.',
  keywords: 'fractional marketing agency, part-time marketing agency, fractional marketing services, fractional marketing support uk',
  alternates: { canonical: 'https://fractional.quest/fractional-marketing-agency' },
}

export default function FractionalMarketingAgencyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Marketing" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-amber-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Marketing Agency</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-amber-400">Marketing Agency</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access marketing agency expertise on a fractional basis. Get strategic marketing leadership and execution without the overhead of traditional agency retainers.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">Get Started</Link>
                <Link href="/fractional-cmo-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CMO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional Marketing Agency?</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">A fractional marketing agency provides ongoing marketing strategy and execution on a part-time, retained basis. Instead of expensive full-service agency retainers, you get focused marketing support tailored to your specific needs and budget.</p>
          <p className="text-gray-600 mb-6">This model is perfect for growing businesses that need professional marketing but can't justify £15-30k monthly agency fees. You get senior marketing talent working as an extension of your team.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Marketing Services Available</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Marketing Strategy', description: 'Comprehensive marketing plans, positioning, and go-to-market strategy.' },
              { title: 'Brand Development', description: 'Brand positioning, messaging, visual identity, and brand guidelines.' },
              { title: 'Content Marketing', description: 'Content strategy, creation, and distribution across channels.' },
              { title: 'Digital Marketing', description: 'SEO, paid media, social media, and email marketing.' },
              { title: 'Demand Generation', description: 'Lead generation, nurturing programmes, and conversion optimisation.' },
              { title: 'Marketing Operations', description: 'MarTech implementation, automation, and analytics.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-amber-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Fractional vs Traditional Marketing Agency</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-bold">Aspect</th>
                  <th className="p-4 text-left font-bold text-amber-700">Fractional Agency</th>
                  <th className="p-4 text-left font-bold">Traditional Agency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-4 font-medium">Monthly Investment</td><td className="p-4">£3,000-£10,000</td><td className="p-4">£15,000-£50,000+</td></tr>
                <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Contract Length</td><td className="p-4">Monthly, flexible</td><td className="p-4">6-12 months minimum</td></tr>
                <tr className="border-b"><td className="p-4 font-medium">Senior Access</td><td className="p-4">Direct with experts</td><td className="p-4">Account managers</td></tr>
                <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Customisation</td><td className="p-4">Tailored to needs</td><td className="p-4">Packaged services</td></tr>
                <tr className="border-b"><td className="p-4 font-medium">Integration</td><td className="p-4">Part of your team</td><td className="p-4">External partner</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Get Fractional Marketing Support</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your marketing needs and we'll match you with the right fractional marketing expertise.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">Get Started</Link>
            <Link href="/fractional-marketing" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Marketing Leadership</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
