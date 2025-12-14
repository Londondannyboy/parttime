import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { RateDistribution } from '@/components/RateDistribution'

export const metadata: Metadata = {
  title: 'Fractional CMO Salary UK 2025 - Day Rates, Annual Earnings & Pay Guide',
  description: 'Fractional CMO salary guide for 2025. UK day rates £700-£1,400. Annual earnings £110k-£220k. Compare rates by location, industry and experience.',
  keywords: 'fractional cmo salary, fractional cmo day rate, fractional cmo pay, part time cmo salary, fractional cmo uk salary',
  openGraph: {
    title: 'Fractional CMO Salary UK 2025 - Complete Pay Guide',
    description: 'Fractional CMO salary guide. UK day rates £700-£1,400. Annual earnings £110k-£220k.',
  },
}

const salaryData = {
  dayRates: [
    { level: 'Entry-level Fractional CMO', range: '£600-£800/day', annual: '£90k-£125k', experience: '10-12 years' },
    { level: 'Mid-level Fractional CMO', range: '£800-£1,100/day', annual: '£125k-£175k', experience: '12-18 years' },
    { level: 'Senior Fractional CMO', range: '£1,100-£1,400/day', annual: '£175k-£220k', experience: '18+ years' },
  ],
  byLocation: [
    { location: 'London (Shoreditch/Tech City)', range: '£900-£1,400/day', premium: '+20%' },
    { location: 'London (City/Canary Wharf)', range: '£850-£1,200/day', premium: '+15%' },
    { location: 'Manchester', range: '£700-£1,000/day', premium: 'Base' },
    { location: 'Birmingham', range: '£650-£950/day', premium: '-5%' },
    { location: 'Edinburgh', range: '£700-£1,000/day', premium: 'Base' },
    { location: 'Bristol', range: '£700-£1,000/day', premium: 'Base' },
    { location: 'Remote UK', range: '£650-£950/day', premium: '-10%' },
  ],
  byIndustry: [
    { industry: 'B2B SaaS', range: '£1,000-£1,400/day', demand: 'Very High' },
    { industry: 'DTC / E-commerce', range: '£900-£1,300/day', demand: 'Very High' },
    { industry: 'FinTech', range: '£900-£1,250/day', demand: 'High' },
    { industry: 'HealthTech / MedTech', range: '£850-£1,150/day', demand: 'High' },
    { industry: 'Marketplaces', range: '£850-£1,200/day', demand: 'High' },
    { industry: 'Professional Services', range: '£700-£1,000/day', demand: 'Medium' },
    { industry: 'Non-profit / Social Enterprise', range: '£600-£850/day', demand: 'Low' },
  ],
}

export default function FractionalCmoSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-800 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-purple-200 hover:text-white mb-6 inline-block">← Back to Home</Link>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Fractional CMO Salary UK 2025</h1>
          <p className="text-xl text-purple-100 mb-8">
            Complete guide to fractional CMO pay rates, day rates, and annual earnings in the UK market.
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-purple-700">£950</div>
              <div className="text-gray-600">Average Day Rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-700">£150k</div>
              <div className="text-gray-600">Average Annual</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-700">2-3</div>
              <div className="text-gray-600">Days Per Client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Rate Distribution from Jobs */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-2 block">Live Market Data</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">CMO Day Rate Distribution</h2>
            <p className="text-gray-400 mt-2 text-sm">From current job listings</p>
          </div>
          <Suspense fallback={
            <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          }>
            <RateDistribution height="400px" roleFilter="CMO" />
          </Suspense>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg prose-purple mb-12">
            <h2>Fractional CMO Salary Overview</h2>
            <p>
              <strong>Fractional CMO salary</strong> in the UK varies based on experience, specialisation, location, and the types of clients you work with. Unlike traditional full-time CMO roles with annual salaries of £100,000-£180,000, fractional CMOs charge day rates—typically £700 to £1,400 per day in 2025.
            </p>
            <p>
              The <strong>fractional CMO UK salary</strong> model often delivers higher total compensation than full-time equivalents. A fractional CMO working with 2-3 clients at 2 days each can earn £150,000-£200,000 annually while maintaining flexibility and variety that full-time roles don't offer.
            </p>
          </div>

          {/* Day Rates by Experience */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fractional CMO Day Rates by Experience</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="text-left p-4 font-semibold text-gray-900">Level</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Day Rate</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Annual (Est.)</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.dayRates.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4 font-medium text-gray-900">{row.level}</td>
                      <td className="p-4 text-purple-700 font-semibold">{row.range}</td>
                      <td className="p-4 text-gray-700">{row.annual}</td>
                      <td className="p-4 text-gray-600">{row.experience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mt-4">*Annual estimates based on 155 billable days per year</p>
          </div>

          {/* By Location */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fractional CMO Salary by Location</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="text-left p-4 font-semibold text-gray-900">Location</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Day Rate Range</th>
                    <th className="text-left p-4 font-semibold text-gray-900">vs Average</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.byLocation.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4 font-medium text-gray-900">{row.location}</td>
                      <td className="p-4 text-purple-700 font-semibold">{row.range}</td>
                      <td className="p-4 text-gray-600">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* By Industry */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fractional CMO Rates by Industry</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="text-left p-4 font-semibold text-gray-900">Industry</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Day Rate Range</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.byIndustry.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4 font-medium text-gray-900">{row.industry}</td>
                      <td className="p-4 text-purple-700 font-semibold">{row.range}</td>
                      <td className="p-4 text-gray-600">{row.demand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="prose prose-lg prose-purple">
            <h2>What Affects Fractional CMO Salary?</h2>
            <p>Several factors influence <strong>fractional CMO earnings</strong>:</p>
            <ul>
              <li><strong>B2B vs B2C experience</strong> - B2B SaaS expertise commands highest rates due to demand</li>
              <li><strong>Track record</strong> - Proven results (pipeline growth, CAC reduction) add 15-25% premium</li>
              <li><strong>Industry specialisation</strong> - Deep vertical expertise (FinTech, HealthTech) pays more</li>
              <li><strong>Channel expertise</strong> - Performance marketing, PLG, or brand specialists earn premium rates</li>
              <li><strong>Team size managed</strong> - Experience scaling teams adds to your value proposition</li>
            </ul>

            <h2>Fractional CMO vs Full-Time CMO Salary</h2>
            <p>
              A full-time CMO at a Series A/B startup typically earns £120,000-£160,000 plus equity. A <strong>fractional CMO</strong> earning £1,000/day for 150 days achieves £150,000—comparable cash with more flexibility. The trade-off is equity: full-time roles often include meaningful stock options that fractional arrangements typically don't.
            </p>
            <p>
              However, fractional CMOs can mitigate this by negotiating advisory equity or working with multiple companies, diversifying their portfolio exposure while maintaining higher cash compensation.
            </p>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Fractional CMO Opportunities?</h2>
          <p className="text-purple-100 mb-8">Browse live CMO roles or create your profile to get matched with companies.</p>
          <div className="flex justify-center gap-4">
            <Link href="/fractional-jobs?role=CMO" className="px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-50">
              Browse CMO Jobs
            </Link>
            <Link href="/part-time-cmo" className="px-8 py-4 border-2 border-white rounded-lg font-semibold hover:bg-white/10">
              Part-Time CMO Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Salary Guides</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/fractional-cfo-salary" className="px-4 py-2 bg-white rounded-lg border hover:border-emerald-300">Fractional CFO Salary →</Link>
            <Link href="/fractional-jobs-london" className="px-4 py-2 bg-white rounded-lg border hover:border-purple-300">London CMO Jobs →</Link>
            <Link href="/part-time-cmo" className="px-4 py-2 bg-white rounded-lg border hover:border-purple-300">Part-Time CMO Guide →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
