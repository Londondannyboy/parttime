import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ, COO_SERVICE_FAQS } from '@/components/FAQ'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { RoleCalculator } from '@/components/RoleCalculator'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional COO Services UK | Hire a Part-Time COO',
  description: 'Hire a Fractional COO for your business. Access senior operations leadership at a fraction of full-time cost. Expert COOs for scaling, process optimisation, and operational excellence. Start within days.',
  keywords: 'fractional coo, fractional coo services, hire fractional coo, part time coo, fractional chief operating officer, fractional coo uk, fractional operations director',
  alternates: {
    canonical: 'https://fractional.quest/fractional-coo-services',
  },
  openGraph: {
    title: 'Fractional COO Services UK | Hire a Part-Time COO',
    description: 'Hire a Fractional COO for your business. Senior operations leadership at a fraction of full-time cost.',
    images: ['/images/fractional-coo-services.jpg'],
    url: 'https://fractional.quest/fractional-coo-services',
  },
}

export default function FractionalCOOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="COO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-orange-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Operations Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional COO<br />
                <span className="text-orange-400">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional COO</strong> to scale your operations.
                Senior operational leadership, process excellence, and scaling expertise—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-orange-400">55%</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">1-3</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Days/Week</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">7 Days</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">To Start</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-orange-500 text-black font-bold uppercase tracking-wider hover:bg-orange-400 transition-colors">
                  Hire a Fractional COO
                </Link>
                <Link href="#calculator" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional COO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional COO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional COO</strong> is an experienced Chief Operating Officer who works with your company on a part-time basis—typically 1-3 days per week. You get the operational leadership, scaling expertise, and process optimisation skills of a senior COO without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike operations consultants who advise from the sidelines, a fractional COO becomes your operational leader. They attend leadership meetings, manage cross-functional initiatives, build operational infrastructure, and take ownership of execution—just not five days a week.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-orange-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "A fractional COO frees the CEO to focus on strategy and growth while ensuring the business runs smoothly."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">When the CEO is Doing Too Much</h3>
            <p>
              In many growing companies, the CEO is handling operations by default—managing projects, solving operational fires, and coordinating between teams. This takes time away from strategy, fundraising, and business development.
            </p>
            <p>
              A fractional COO takes operational responsibility off the CEO's plate. They bring structure, systems, and accountability so the CEO can focus on what only they can do: leading the company's vision and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional COO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional COO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Operational Strategy',
                description: 'Design and implement the operating model that supports your growth. Align operations with business strategy and ensure execution excellence.',
                icon: '🎯',
              },
              {
                title: 'Process Optimisation',
                description: 'Identify bottlenecks, streamline workflows, and implement efficient processes. Build the operational infrastructure that scales.',
                icon: '⚙️',
              },
              {
                title: 'Team & Structure',
                description: 'Design organisational structure, define roles, and build high-performing teams. Ensure the right people are in the right positions.',
                icon: '👥',
              },
              {
                title: 'Project Management',
                description: 'Lead critical initiatives and cross-functional projects. Ensure key programmes are delivered on time and on budget.',
                icon: '📋',
              },
              {
                title: 'Systems & Tools',
                description: 'Select and implement operational systems—CRM, ERP, project management, and communication tools that enable productivity.',
                icon: '🛠️',
              },
              {
                title: 'Metrics & KPIs',
                description: 'Define operational KPIs, build dashboards, and create accountability frameworks. Make operations data-driven.',
                icon: '📊',
              },
              {
                title: 'Vendor Management',
                description: 'Manage key supplier relationships, negotiate contracts, and optimise the partner ecosystem for cost and quality.',
                icon: '🤝',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-orange-300 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Hire a Fractional COO?</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Free Your CEO',
                description: 'Let your CEO focus on strategy, fundraising, and growth instead of day-to-day operations. A fractional COO handles execution so leadership can lead.',
                stat: '50%',
                statLabel: 'CEO Time Freed',
              },
              {
                title: 'Cost Efficiency',
                description: 'Access COO-level expertise at 40-60% less than a full-time hire. Pay only for the time you need—typically £75,000-£140,000 per year versus £180,000+ for full-time.',
                stat: '55%',
                statLabel: 'Cost Savings',
              },
              {
                title: 'Scale Faster',
                description: 'Fractional COOs have scaled companies before. They know what operational infrastructure you need at each stage and can implement it quickly.',
                stat: '2x',
                statLabel: 'Scaling Speed',
              },
              {
                title: 'Immediate Impact',
                description: 'Skip months of recruitment. A fractional COO can start within days, diagnose operational issues quickly, and begin implementing improvements.',
                stat: '7',
                statLabel: 'Days to Start',
              },
              {
                title: 'Cross-Company Experience',
                description: 'Fractional COOs work across multiple businesses. They bring best practices, benchmarks, and proven playbooks from diverse operational challenges.',
                stat: '5+',
                statLabel: 'Companies Seen',
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-6 p-6 bg-gray-50 border-l-4 border-orange-500">
                <div className="flex-shrink-0 text-center">
                  <div className="text-3xl font-black text-orange-600">{benefit.stat}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{benefit.statLabel}</div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Hire */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Timing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional COO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none mb-8">
            <p>
              The right time to hire a fractional COO depends on your operational challenges. Here are the most common scenarios:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'CEO Overwhelmed with Operations',
                description: 'If the CEO is spending more time managing operations than leading strategy, it\'s time for a COO to take the operational load.',
                timing: 'Before burnout',
              },
              {
                scenario: 'Rapid Growth',
                description: 'Scaling fast and operations are struggling to keep up. Processes are breaking, quality is slipping, and the team is stretched thin.',
                timing: 'At 50%+ growth',
              },
              {
                scenario: 'Post-Funding Scale',
                description: 'You\'ve raised capital and need to scale quickly. Investors expect operational excellence and the ability to execute on growth plans.',
                timing: 'Immediately after close',
              },
              {
                scenario: 'Operational Chaos',
                description: 'Things are falling through the cracks. Projects are delayed, communication is broken, and there\'s no clear accountability.',
                timing: 'As soon as possible',
              },
              {
                scenario: 'Preparing for Exit',
                description: 'M&A buyers and IPO investors want to see operational maturity. A fractional COO can professionalise operations for due diligence.',
                timing: '12-18 months before',
              },
              {
                scenario: 'Building Infrastructure',
                description: 'You need to implement systems, processes, and structures but lack the expertise. A fractional COO can build the foundation.',
                timing: 'Before it becomes urgent',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-orange-600 uppercase tracking-wider">{item.timing}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Calculator</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How Much Does a Fractional COO Cost?</h2>
            <p className="text-gray-600 mt-4">Compare the cost of fractional vs full-time COO</p>
          </div>
          <RoleCalculator role="coo" />
          <div className="mt-8 prose prose-gray max-w-none">
            <h3 className="text-xl font-bold text-gray-900">Typical Fractional COO Pricing</h3>
            <ul className="text-gray-600">
              <li><strong>Day Rate:</strong> £750-£1,400 per day (depending on experience and complexity)</li>
              <li><strong>Monthly Retainer:</strong> £3,000-£5,500 for 1-2 days per week</li>
              <li><strong>Annual Cost:</strong> £75,000-£140,000 (vs £180,000+ for full-time)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time COO</h2>
            <p className="text-gray-600 mt-4">Choose the right model for your needs</p>
          </div>
          <ServiceComparisonTable role="COO" accentColor="orange" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional COO</h2>
            <p className="text-gray-600 mt-4">From first conversation to start date in as little as 7 days</p>
          </div>
          <HireProcessStepper accentColor="orange" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={COO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-orange-400">Fractional COO?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us about your operational challenges and we'll match you with pre-vetted fractional COOs who have solved them before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-orange-500 text-black font-bold uppercase tracking-wider hover:bg-orange-400 transition-colors">
              Find a Fractional COO
            </Link>
            <Link href="/fractional-coo-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a COO Looking for Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related Services</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/fractional-cfo-services" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Fractional CFO</Link>
              <Link href="/fractional-cmo-services" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Fractional CMO</Link>
              <Link href="/fractional-cto-services" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Fractional CTO</Link>
              <Link href="/fractional-coo-jobs-uk" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">COO Jobs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
