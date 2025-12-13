import { Metadata } from 'next'
import Link from 'next/link'
import { VideoHeroBackground } from '@/components/VideoHeroBackground'

export const revalidate = 3600
const HERO_VIDEO_PLAYBACK_ID = "qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"

export const metadata: Metadata = {
  title: 'Hire Finance Consultants UK | Fractional Finance Experts',
  description: 'Hire experienced finance consultants on a fractional basis. Expert financial professionals for FP&A, fundraising, and financial strategy. Available part-time.',
  keywords: 'finance consultants, hire finance consultant, fractional finance expert, finance consultant uk, financial strategy consultant',
  alternates: { canonical: 'https://fractional.quest/finance-consultants' },
}

export default function FinanceConsultantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <VideoHeroBackground playbackId={HERO_VIDEO_PLAYBACK_ID} fallbackGradient={true} />
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm"><span className="mr-2">←</span> Back to Home</Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-emerald-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Popular Roles</span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9]">Finance<br /><span className="text-emerald-400">Consultants</span></h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-8">Hire experienced finance professionals on a fractional basis. Get expert financial strategy, planning, and analysis without the cost of a full finance team.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors">Find a Consultant</Link>
                <Link href="/fractional-cfo-services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Fractional CFO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">What Finance Consultants Do</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">Finance consultants help businesses make better financial decisions, raise capital, and build robust financial operations. On a fractional basis, they bring CFO-level expertise without the full-time commitment.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { title: 'Financial Planning', description: 'Build budgets, forecasts, and financial models for better decision-making.' },
              { title: 'Fundraising Support', description: 'Prepare for and execute funding rounds with investor-ready materials.' },
              { title: 'Cash Management', description: 'Optimise cash flow, working capital, and treasury operations.' },
              { title: 'Financial Reporting', description: 'Create board packs, management accounts, and investor reports.' },
              { title: 'Systems Implementation', description: 'Select and implement accounting and financial planning systems.' },
              { title: 'M&A Support', description: 'Financial due diligence, valuation, and deal support.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 border-l-4 border-emerald-500">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">When to Hire a Finance Consultant</h2>
          <div className="space-y-4">
            {[
              'Preparing for a funding round or investor meetings',
              'Need financial expertise but not ready for full-time CFO',
              'Building financial models for strategic decisions',
              'Implementing new accounting or planning systems',
              'Preparing for audit or improving financial controls',
              'Navigating M&A transactions or exit planning',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-200">
                <span className="text-emerald-500 font-bold">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find a Finance Consultant</h2>
          <p className="text-xl text-gray-400 mb-10">Tell us about your financial needs and we'll match you with experienced finance professionals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors">Get Started</Link>
            <Link href="/fractional-finance" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">Explore Finance Leadership</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
