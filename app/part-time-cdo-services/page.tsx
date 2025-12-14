import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ } from '@/components/FAQ'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

const CDO_SERVICE_FAQS = [
  {
    question: 'What is a Fractional CDO?',
    answer: 'A Fractional CDO (Chief Data Officer) is an experienced data executive who works with your company part-time, typically 1-3 days per week. You get strategic data leadership, analytics expertise, and data governance without the cost of a full-time executive.',
  },
  {
    question: 'When should my company hire a Fractional CDO?',
    answer: 'Consider hiring a fractional CDO when: you\'re not getting value from your data; you need to build data infrastructure; you\'re preparing for AI/ML initiatives; you have data quality or governance issues; or you need to monetise or productise your data.',
  },
  {
    question: 'How much does a Fractional CDO cost?',
    answer: 'Fractional CDOs typically charge £900-£1,500 per day in the UK. At 2 days per week, this translates to roughly £90,000-£150,000 annually—compared to £180,000-£280,000+ for a full-time CDO.',
  },
  {
    question: 'What does a Fractional CDO do?',
    answer: 'A Fractional CDO develops data strategy, builds analytics capabilities, ensures data quality and governance, leads AI/ML initiatives, creates data products, manages data teams, and ensures the organisation becomes truly data-driven.',
  },
  {
    question: 'How is a CDO different from a Head of Analytics?',
    answer: 'A Head of Analytics focuses on analysis and reporting—answering questions with data. A CDO has broader responsibility for the entire data function: strategy, infrastructure, governance, quality, and ensuring data drives business value. They operate at the executive level.',
  },
  {
    question: 'Can a Fractional CDO help prepare for AI initiatives?',
    answer: 'Yes—AI readiness is a key CDO responsibility. A fractional CDO can assess your data maturity, build the data infrastructure needed for AI, establish data quality practices, and develop the governance frameworks that AI requires.',
  },
]

export const metadata: Metadata = {
  title: 'Fractional CDO Services UK | Hire a Part-Time Chief Data Officer',
  description: 'Hire a Fractional CDO for your business. Access senior data leadership at a fraction of full-time cost. Expert CDOs for data strategy, analytics, AI readiness, and data governance. Start within days.',
  keywords: 'fractional cdo, fractional cdo services, hire fractional cdo, part time cdo, fractional chief data officer, fractional cdo uk, fractional data director',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cdo-services',
  },
  openGraph: {
    title: 'Fractional CDO Services UK | Hire a Part-Time Chief Data Officer',
    description: 'Hire a Fractional CDO for your business. Senior data leadership at a fraction of full-time cost.',
    images: ['/images/fractional-cdo-services.jpg'],
    url: 'https://fractional.quest/fractional-cdo-services',
  },
}

export default function FractionalCDOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CDO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-cyan-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Data Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CDO<br />
                <span className="text-cyan-400">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional CDO</strong> to unlock your data.
                Senior data leadership, analytics strategy, and AI readiness—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-cyan-400">50%</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">1-3</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Days/Week</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">AI Ready</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Expertise</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-cyan-500 text-black font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors">
                  Hire a Fractional CDO
                </Link>
                <Link href="#responsibilities" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional CDO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional CDO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional CDO</strong> (Chief Data Officer) is an experienced data executive who works with your company on a part-time basis—typically 1-3 days per week. You get strategic data leadership, analytics expertise, and data governance without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike data analysts who answer specific questions, a fractional CDO builds the entire data function. They create data strategy, build infrastructure, establish governance, and transform the organisation into one that uses data to drive decisions.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-cyan-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Data is the new oil, but only if you can refine it. A fractional CDO turns raw data into business fuel."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">From Data Rich to Data Driven</h3>
            <p>
              Many companies are data rich but insight poor. They collect vast amounts of data but cannot use it effectively. Decisions are still made on gut feel, reports take weeks, and data quality is questionable.
            </p>
            <p>
              A fractional CDO bridges this gap. They build the systems, processes, and culture that turn data into competitive advantage—enabling faster decisions, better predictions, and AI-powered innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section id="responsibilities" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional CDO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional CDO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Data Strategy',
                description: 'Develop data strategy aligned with business objectives. Define how data will create value and competitive advantage.',
                icon: '🎯',
              },
              {
                title: 'Analytics & BI',
                description: 'Build analytics capabilities—dashboards, reports, and self-service BI. Ensure the business has the insights it needs.',
                icon: '📊',
              },
              {
                title: 'Data Infrastructure',
                description: 'Design and implement data architecture—warehouses, lakes, pipelines, and platforms that scale.',
                icon: '🏗️',
              },
              {
                title: 'Data Governance',
                description: 'Establish data governance frameworks—quality, security, privacy, and compliance. Ensure data is trustworthy and compliant.',
                icon: '🔒',
              },
              {
                title: 'AI & ML Readiness',
                description: 'Prepare the organisation for AI. Build the data foundations, infrastructure, and practices that AI requires.',
                icon: '🤖',
              },
              {
                title: 'Data Team',
                description: 'Build and lead the data team—analysts, engineers, scientists. Define roles, hire key talent, and develop capabilities.',
                icon: '👥',
              },
              {
                title: 'Data Culture',
                description: 'Drive data literacy and data-driven culture. Ensure decisions across the organisation are informed by data.',
                icon: '🧠',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-cyan-300 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Timing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional CDO?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'Data Not Delivering Value',
                description: "You have lots of data but can't use it effectively. Reports are slow, insights are limited, and decisions are still based on gut feel.",
                timing: 'Before competitors out-data you',
              },
              {
                scenario: 'Preparing for AI',
                description: "Want to implement AI/ML but your data isn't ready. Need to build the foundations before AI can deliver value.",
                timing: '6-12 months before AI',
              },
              {
                scenario: 'Scaling Data Function',
                description: 'Growing from ad-hoc analysis to a proper data team. Need leadership to structure the function and hire right.',
                timing: 'When team exceeds 3',
              },
              {
                scenario: 'Data Quality Crisis',
                description: "Can't trust your data. Different sources give different answers, and no one knows what's accurate.",
                timing: 'ASAP',
              },
              {
                scenario: 'Regulatory Compliance',
                description: 'Need to meet GDPR, data protection, or industry-specific data requirements. Need governance expertise.',
                timing: 'Before audits',
              },
              {
                scenario: 'Data Monetisation',
                description: 'Want to create data products or monetise your data assets. Need strategic leadership to identify and execute opportunities.',
                timing: 'At opportunity identification',
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-cyan-600 uppercase tracking-wider">{item.timing}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time CDO</h2>
          </div>
          <ServiceComparisonTable role="CDO" accentColor="blue" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional CDO</h2>
          </div>
          <HireProcessStepper accentColor="blue" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={CDO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-cyan-400">Fractional CDO?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us about your data challenges and we'll match you with pre-vetted fractional CDOs who have solved them before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-cyan-500 text-black font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors">
              Find a Fractional CDO
            </Link>
            <Link href="/fractional-cdo-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a CDO Looking for Roles
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
              <Link href="/fractional-cto-services" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors">Fractional CTO</Link>
              <Link href="/fractional-cio-services" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors">Fractional CIO</Link>
              <Link href="/fractional-ciso-services" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors">Fractional CISO</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
