import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { RateDistribution } from '@/components/RateDistribution'

export const metadata: Metadata = {
  title: 'Fractional CFO Salary UK 2025 - Day Rates, Annual Earnings & Pay Guide',
  description: 'Fractional CFO salary guide for 2025. UK day rates £800-£1,500. Annual earnings £120k-£250k. Compare rates by location, industry and experience level.',
  keywords: 'fractional cfo salary, fractional cfo day rate, fractional cfo pay, part time cfo salary, fractional cfo earnings uk',
  openGraph: {
    title: 'Fractional CFO Salary UK 2025 - Complete Pay Guide',
    description: 'Fractional CFO salary guide. UK day rates £800-£1,500. Annual earnings £120k-£250k.',
  },
}

const salaryData = {
  dayRates: [
    { level: 'Entry-level Fractional CFO', range: '£700-£900/day', annual: '£100k-£140k', experience: '10-15 years' },
    { level: 'Mid-level Fractional CFO', range: '£900-£1,200/day', annual: '£140k-£190k', experience: '15-20 years' },
    { level: 'Senior Fractional CFO', range: '£1,200-£1,500/day', annual: '£190k-£250k', experience: '20+ years' },
  ],
  byLocation: [
    { location: 'London (City/Canary Wharf)', range: '£1,000-£1,500/day', premium: '+25%' },
    { location: 'London (Shoreditch/Tech City)', range: '£900-£1,300/day', premium: '+15%' },
    { location: 'Manchester', range: '£800-£1,100/day', premium: 'Base' },
    { location: 'Birmingham', range: '£750-£1,050/day', premium: '-5%' },
    { location: 'Edinburgh', range: '£800-£1,100/day', premium: 'Base' },
    { location: 'Bristol', range: '£800-£1,100/day', premium: 'Base' },
    { location: 'Remote UK', range: '£750-£1,000/day', premium: '-10%' },
  ],
  byIndustry: [
    { industry: 'Private Equity / VC Portfolio', range: '£1,200-£1,600/day', demand: 'Very High' },
    { industry: 'FinTech', range: '£1,100-£1,400/day', demand: 'Very High' },
    { industry: 'SaaS / Tech', range: '£1,000-£1,300/day', demand: 'High' },
    { industry: 'Healthcare / Pharma', range: '£950-£1,250/day', demand: 'Medium' },
    { industry: 'E-commerce / Retail', range: '£850-£1,150/day', demand: 'High' },
    { industry: 'Manufacturing', range: '£800-£1,050/day', demand: 'Medium' },
    { industry: 'Professional Services', range: '£800-£1,100/day', demand: 'Medium' },
  ],
}

export default function FractionalCfoSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 to-emerald-800 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-emerald-200 hover:text-white mb-6 inline-block">← Back to Home</Link>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Fractional CFO Salary UK 2025</h1>
          <p className="text-xl text-emerald-100 mb-8">
            Complete guide to fractional CFO pay rates, day rates, and annual earnings in the UK market.
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-emerald-700">£1,050</div>
              <div className="text-gray-600">Average Day Rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-emerald-700">£165k</div>
              <div className="text-gray-600">Average Annual</div>
            </div>
            <div>
              <div className="text-4xl font-black text-emerald-700">2-3</div>
              <div className="text-gray-600">Days Per Client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Rate Distribution from Jobs */}
      <section className="py-12 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2 block">Live Market Data</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">CFO Day Rate Distribution</h2>
            <p className="text-gray-400 mt-2 text-sm">From current job listings</p>
          </div>
          <Suspense fallback={
            <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
              <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
          }>
            <RateDistribution height="400px" roleFilter="CFO" />
          </Suspense>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg prose-emerald mb-12">
            <h2>Fractional CFO Salary Overview</h2>
            <p>
              <strong>Fractional CFO salary</strong> in the UK varies significantly based on experience, location, industry specialisation, and client portfolio. Unlike full-time CFO roles with fixed annual salaries, fractional CFOs charge day rates—typically ranging from £800 to £1,500 per day in 2025.
            </p>
            <p>
              The <strong>fractional CFO pay</strong> model offers higher effective hourly earnings than most full-time positions. A fractional CFO working 3 days per week at £1,100/day earns approximately £170,000 annually—comparable to a full-time CFO at a Series B startup, but with significantly more flexibility.
            </p>
          </div>

          {/* Day Rates by Experience */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fractional CFO Day Rates by Experience</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-emerald-50">
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
                      <td className="p-4 text-emerald-700 font-semibold">{row.range}</td>
                      <td className="p-4 text-gray-700">{row.annual}</td>
                      <td className="p-4 text-gray-600">{row.experience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mt-4">*Annual estimates based on 160 billable days per year</p>
          </div>

          {/* By Location */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fractional CFO Salary by Location</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-emerald-50">
                    <th className="text-left p-4 font-semibold text-gray-900">Location</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Day Rate Range</th>
                    <th className="text-left p-4 font-semibold text-gray-900">vs Average</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.byLocation.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4 font-medium text-gray-900">{row.location}</td>
                      <td className="p-4 text-emerald-700 font-semibold">{row.range}</td>
                      <td className="p-4 text-gray-600">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* By Industry */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fractional CFO Rates by Industry</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-emerald-50">
                    <th className="text-left p-4 font-semibold text-gray-900">Industry</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Day Rate Range</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.byIndustry.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4 font-medium text-gray-900">{row.industry}</td>
                      <td className="p-4 text-emerald-700 font-semibold">{row.range}</td>
                      <td className="p-4 text-gray-600">{row.demand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="prose prose-lg prose-emerald">
            <h2>Factors Affecting Fractional CFO Salary</h2>
            <p>Several factors influence <strong>fractional CFO earnings</strong>:</p>
            <ul>
              <li><strong>Qualifications</strong> - ACA/ACCA/CIMA qualified CFOs command 10-15% higher rates</li>
              <li><strong>Fundraising experience</strong> - Series A-C experience adds £100-200/day premium</li>
              <li><strong>Industry specialisation</strong> - Deep sector expertise (FinTech, PE) commands premium rates</li>
              <li><strong>Client portfolio</strong> - Established fractional CFOs with referral networks earn more</li>
              <li><strong>Scope of work</strong> - Roles requiring M&A, fundraising, or turnaround expertise pay more</li>
            </ul>

            <h2>Full-Time CFO vs Fractional CFO Salary</h2>
            <p>
              Comparing <strong>fractional CFO salary</strong> to full-time equivalents requires considering total compensation and working patterns. A full-time CFO at a Series B startup might earn £150,000-£200,000 plus equity. A fractional CFO earning £1,100/day for 150 days achieves £165,000—similar cash compensation with more flexibility and typically better effective hourly rate.
            </p>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Fractional CFO Opportunities?</h2>
          <p className="text-emerald-100 mb-8">Browse live CFO roles or create your profile to get matched with companies.</p>
          <div className="flex justify-center gap-4">
            <Link href="/fractional-jobs?role=CFO" className="px-8 py-4 bg-white text-emerald-900 rounded-lg font-semibold hover:bg-emerald-50">
              Browse CFO Jobs
            </Link>
            <Link href="/part-time-cfo" className="px-8 py-4 border-2 border-white rounded-lg font-semibold hover:bg-white/10">
              Part-Time CFO Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Salary Guides</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/fractional-cmo-salary" className="px-4 py-2 bg-white rounded-lg border hover:border-purple-300">Fractional CMO Salary →</Link>
            <Link href="/fractional-jobs-london" className="px-4 py-2 bg-white rounded-lg border hover:border-purple-300">London CFO Jobs →</Link>
            <Link href="/part-time-cfo" className="px-4 py-2 bg-white rounded-lg border hover:border-purple-300">Part-Time CFO Guide →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
