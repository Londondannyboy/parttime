import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ } from '@/components/FAQ'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

const CRO_SERVICE_FAQS = [
  {
    question: 'What is a Fractional CRO?',
    answer: 'A Fractional CRO (Chief Revenue Officer) is an experienced revenue leader who works with your company part-time, typically 1-3 days per week. You get strategic revenue leadership across sales, marketing, and customer success without the cost of a full-time executive.',
  },
  {
    question: 'When should my company hire a Fractional CRO?',
    answer: 'Consider hiring a fractional CRO when: sales and marketing are misaligned; you\'re struggling to scale revenue predictably; you need to professionalise your go-to-market; you\'re preparing for fundraising and need revenue credibility; or you\'re transitioning to a new revenue model.',
  },
  {
    question: 'How much does a Fractional CRO cost?',
    answer: 'Fractional CROs typically charge £900-£1,500 per day in the UK. At 2 days per week, this translates to roughly £90,000-£150,000 annually—compared to £200,000-£300,000+ for a full-time CRO.',
  },
  {
    question: 'What does a Fractional CRO do?',
    answer: 'A Fractional CRO aligns sales, marketing, and customer success; develops revenue strategy; builds go-to-market playbooks; implements revenue operations; manages pipeline and forecasting; and drives predictable revenue growth.',
  },
  {
    question: 'How is a CRO different from a VP of Sales?',
    answer: 'A VP of Sales focuses on the sales team and closing deals. A CRO has broader responsibility across the entire revenue engine—sales, marketing, customer success, and revenue operations. They optimise the full customer journey, not just the sales process.',
  },
  {
    question: 'Can a Fractional CRO help with sales and marketing alignment?',
    answer: 'Yes—alignment is one of the primary reasons to hire a fractional CRO. They create shared metrics, unified processes, and collaborative structures that ensure sales and marketing work together effectively to drive revenue.',
  },
]

export const metadata: Metadata = {
  title: 'Fractional CRO Services UK | Hire a Part-Time Chief Revenue Officer',
  description: 'Hire a Fractional CRO for your business. Access senior revenue leadership at a fraction of full-time cost. Expert CROs for go-to-market strategy, sales leadership, and revenue growth. Start within days.',
  keywords: 'fractional cro, fractional cro services, hire fractional cro, part time cro, fractional chief revenue officer, fractional cro uk, fractional revenue director',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cro-services',
  },
  openGraph: {
    title: 'Fractional CRO Services UK | Hire a Part-Time Chief Revenue Officer',
    description: 'Hire a Fractional CRO for your business. Senior revenue leadership at a fraction of full-time cost.',
    images: ['/images/fractional-cro-services.jpg'],
    url: 'https://fractional.quest/fractional-cro-services',
  },
}

export default function FractionalCROServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CRO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-green-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Revenue Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CRO<br />
                <span className="text-green-400">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional CRO</strong> to accelerate your revenue.
                Senior revenue leadership across sales, marketing, and customer success—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-green-400">50%</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">1-3</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Days/Week</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">2x</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Revenue Growth</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-green-500 text-black font-bold uppercase tracking-wider hover:bg-green-400 transition-colors">
                  Hire a Fractional CRO
                </Link>
                <Link href="#responsibilities" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional CRO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional CRO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional CRO</strong> (Chief Revenue Officer) is an experienced revenue executive who works with your company on a part-time basis—typically 1-3 days per week. You get strategic leadership across your entire revenue engine—sales, marketing, and customer success—without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike a VP of Sales who focuses only on selling, a fractional CRO takes a holistic view of revenue. They align all customer-facing functions, optimise the full buyer journey, and build the systems for predictable, scalable revenue growth.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-green-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "A fractional CRO connects the dots between marketing, sales, and customer success to create a true revenue machine."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Beyond Siloed Sales and Marketing</h3>
            <p>
              In many companies, sales and marketing operate as separate functions with different goals and metrics. This creates friction, blame games, and leaked revenue. A fractional CRO breaks down these silos, creating unified revenue operations that drive predictable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section id="responsibilities" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional CRO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional CRO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Revenue Strategy',
                description: 'Develop comprehensive revenue strategy. Define go-to-market approach, pricing, packaging, and the path to revenue targets.',
                icon: '🎯',
              },
              {
                title: 'Sales & Marketing Alignment',
                description: 'Break down silos between sales and marketing. Create shared metrics, unified processes, and collaborative culture.',
                icon: '🤝',
              },
              {
                title: 'Revenue Operations',
                description: 'Build RevOps infrastructure—CRM, automation, reporting, and processes that enable predictable revenue.',
                icon: '⚙️',
              },
              {
                title: 'Pipeline Management',
                description: 'Implement pipeline discipline. Create forecasting processes, deal reviews, and the visibility needed to hit targets.',
                icon: '📊',
              },
              {
                title: 'Go-to-Market Playbooks',
                description: 'Develop repeatable GTM playbooks—sales processes, marketing campaigns, and customer success motions that scale.',
                icon: '📋',
              },
              {
                title: 'Team Leadership',
                description: 'Lead and develop revenue teams across sales, marketing, and customer success. Hire key roles and build capability.',
                icon: '👥',
              },
              {
                title: 'Customer Success',
                description: 'Ensure customer success drives expansion revenue. Build retention and upsell motions that maximise customer lifetime value.',
                icon: '❤️',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-green-300 transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Hire a Fractional CRO?</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Unified Revenue Leadership',
                description: 'Get one leader accountable for the entire revenue engine. No more finger-pointing between sales and marketing—just aligned growth.',
                stat: '1',
                statLabel: 'Revenue Leader',
              },
              {
                title: 'Cost Efficiency',
                description: 'Access CRO-level expertise at 40-60% less than a full-time hire. Pay only for the time you need—typically £90,000-£150,000 per year versus £250,000+ for full-time.',
                stat: '50%',
                statLabel: 'Cost Savings',
              },
              {
                title: 'Faster Revenue Growth',
                description: 'Fractional CROs have scaled revenue before. They know what works, can avoid common mistakes, and accelerate your path to targets.',
                stat: '2x',
                statLabel: 'Revenue Growth',
              },
              {
                title: 'Predictable Pipeline',
                description: 'Build the systems and processes for predictable revenue. Know what\'s coming, forecast accurately, and hit targets consistently.',
                stat: '95%',
                statLabel: 'Forecast Accuracy',
              },
              {
                title: 'Proven Playbooks',
                description: 'Fractional CROs bring playbooks from multiple companies. They know what GTM motions work for businesses like yours.',
                stat: '10+',
                statLabel: 'GTM Playbooks',
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-6 p-6 bg-gray-50 border-l-4 border-green-500">
                <div className="flex-shrink-0 text-center">
                  <div className="text-3xl font-black text-green-600">{benefit.stat}</div>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional CRO?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'Sales & Marketing Misalignment',
                description: 'Sales blames marketing for bad leads. Marketing blames sales for not closing. You need someone to align both functions around revenue.',
                timing: 'Before it gets worse',
              },
              {
                scenario: 'Unpredictable Revenue',
                description: 'You\'re missing forecasts, pipeline is chaotic, and you don\'t know if you\'ll hit targets. Time for revenue discipline.',
                timing: 'ASAP',
              },
              {
                scenario: 'Scaling Go-to-Market',
                description: 'You\'ve found PMF and need to scale revenue. Time to professionalise GTM with proven playbooks and processes.',
                timing: 'Post-PMF',
              },
              {
                scenario: 'Preparing for Fundraising',
                description: 'Investors want to see strong revenue leadership and predictable growth. A fractional CRO provides credibility and structure.',
                timing: '3-6 months before raise',
              },
              {
                scenario: 'New Market Entry',
                description: 'Launching into new segments or geographies. Need strategic revenue leadership to develop and execute GTM.',
                timing: 'At strategy phase',
              },
              {
                scenario: 'Transition Between Revenue Models',
                description: 'Moving from founder-led sales to a sales team, or from outbound to inbound, or enterprise to PLG.',
                timing: 'Before the transition',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-green-600 uppercase tracking-wider">{item.timing}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time CRO</h2>
          </div>
          <ServiceComparisonTable role="CRO" accentColor="emerald" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional CRO</h2>
          </div>
          <HireProcessStepper accentColor="emerald" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={CRO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-green-400">Fractional CRO?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us about your revenue challenges and we'll match you with pre-vetted fractional CROs who have solved them before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-green-500 text-black font-bold uppercase tracking-wider hover:bg-green-400 transition-colors">
              Find a Fractional CRO
            </Link>
            <Link href="/fractional-cro-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a CRO Looking for Roles
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
              <Link href="/fractional-cmo-services" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Fractional CMO</Link>
              <Link href="/fractional-coo-services" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Fractional COO</Link>
              <Link href="/fractional-cfo-services" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Fractional CFO</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
