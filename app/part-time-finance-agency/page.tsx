import { Metadata } from 'next'
import Link from 'next/link'
import { JobsGraph3D } from '@/components/JobsGraph3D'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Finance Agency UK | Part-Time Finance Support',
  description: 'Access fractional finance agency services. Part-time CFO support, FP&A, and financial strategy. Finance expertise without full-time overhead.',
  keywords: 'fractional finance agency, part-time finance agency, fractional finance services, fractional cfo services uk',
  alternates: { canonical: 'https://fractional.quest/fractional-finance-agency' },
}

export default function FractionalFinanceAgencyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D categoryFilter="Finance" limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-emerald-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Finance Agency</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Fractional<br /><span className="text-emerald-400">Finance Agency</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Access finance expertise on a fractional basis. Get CFO-level financial strategy, planning, and operations without the cost of a full-time finance team.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors">Get Started</Link>
                <Link href="/fractional-cfo-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CFO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional Finance Agency?</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">A fractional finance agency provides comprehensive financial leadership and operations on a part-time basis. You get CFO-level expertise, financial planning, and operational support without the overhead of building a full finance team.</p>
          <p className="text-gray-600 mb-6">This model is ideal for growing businesses that need sophisticated financial capabilities but aren't ready for (or don't need) a full-time CFO and finance department.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Finance Services Available</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'CFO Services', description: 'Strategic financial leadership, board reporting, and investor relations.' },
              { title: 'Financial Planning & Analysis', description: 'Budgeting, forecasting, financial modelling, and variance analysis.' },
              { title: 'Fundraising Support', description: 'Pitch deck development, investor materials, and funding round execution.' },
              { title: 'Cash Management', description: 'Cash flow forecasting, working capital optimisation, and treasury.' },
              { title: 'Financial Operations', description: 'Accounting oversight, month-end close, and financial controls.' },
              { title: 'M&A Support', description: 'Financial due diligence, valuation, and deal structuring.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-emerald-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Fractional vs Traditional Finance Options</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-bold">Aspect</th>
                  <th className="p-4 text-left font-bold text-emerald-700">Fractional Finance</th>
                  <th className="p-4 text-left font-bold">Full-Time CFO + Team</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-4 font-medium">Annual Cost</td><td className="p-4">£40,000-£120,000</td><td className="p-4">£200,000-£400,000+</td></tr>
                <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Time to Start</td><td className="p-4">1-2 weeks</td><td className="p-4">3-6 months</td></tr>
                <tr className="border-b"><td className="p-4 font-medium">Expertise Level</td><td className="p-4">Senior, diverse experience</td><td className="p-4">Single company focus</td></tr>
                <tr className="border-b bg-gray-50"><td className="p-4 font-medium">Flexibility</td><td className="p-4">Scale up/down as needed</td><td className="p-4">Fixed headcount</td></tr>
                <tr className="border-b"><td className="p-4 font-medium">Risk</td><td className="p-4">Monthly commitment</td><td className="p-4">Employment commitment</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Get Fractional Finance Support</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your financial needs and we'll match you with the right fractional finance expertise.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors">Get Started</Link>
            <Link href="/fractional-finance" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Finance Leadership</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
