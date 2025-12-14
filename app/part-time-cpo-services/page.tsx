import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ } from '@/components/FAQ'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { RoleCalculator } from '@/components/RoleCalculator'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

const CPO_SERVICE_FAQS = [
  {
    question: 'What is a Fractional CPO?',
    answer: 'A Fractional CPO is an experienced Chief Product Officer who works with your company part-time, typically 1-3 days per week. You get strategic product leadership, roadmap development, and team guidance without the cost of a full-time executive hire.',
  },
  {
    question: 'When should my company hire a Fractional CPO?',
    answer: 'Consider hiring a fractional CPO when: you need to define or refine product strategy; your product team needs senior leadership; you\'re struggling with prioritisation or roadmap clarity; you\'re transitioning from founder-led product to a product function; or you need to professionalise product management practices.',
  },
  {
    question: 'How much does a Fractional CPO cost?',
    answer: 'Fractional CPOs typically charge £800-£1,400 per day in the UK. At 2 days per week, this translates to roughly £80,000-£140,000 annually—compared to £170,000-£250,000+ for a full-time CPO.',
  },
  {
    question: 'What does a Fractional CPO do?',
    answer: 'A Fractional CPO sets product vision and strategy, develops roadmaps, leads product teams, defines prioritisation frameworks, establishes product processes, works closely with engineering and design, manages stakeholder expectations, and represents product at board level.',
  },
  {
    question: 'How is a Fractional CPO different from a Product Consultant?',
    answer: 'A Fractional CPO is an embedded leader who takes ownership—they make decisions, lead teams, and are accountable for product outcomes. Product consultants typically advise on specific problems without ongoing leadership responsibility.',
  },
  {
    question: 'Can a Fractional CPO work with my existing product team?',
    answer: 'Yes—leading and developing existing teams is a core part of the role. A fractional CPO provides the senior leadership your product managers need, helps develop their skills, establishes best practices, and elevates the entire product function.',
  },
]

export const metadata: Metadata = {
  title: 'Fractional CPO Services UK | Hire a Part-Time Chief Product Officer',
  description: 'Hire a Fractional CPO for your business. Access senior product leadership at a fraction of full-time cost. Expert CPOs for product strategy, roadmaps, and team leadership. Start within days.',
  keywords: 'fractional cpo, fractional cpo services, hire fractional cpo, part time cpo, fractional chief product officer, fractional cpo uk, fractional product director',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cpo-services',
  },
  openGraph: {
    title: 'Fractional CPO Services UK | Hire a Part-Time Chief Product Officer',
    description: 'Hire a Fractional CPO for your business. Senior product leadership at a fraction of full-time cost.',
    images: ['/images/fractional-cpo-services.jpg'],
    url: 'https://fractional.quest/fractional-cpo-services',
  },
}

export default function FractionalCPOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CPO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-purple-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Product Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CPO<br />
                <span className="text-purple-400">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional CPO</strong> to lead your product.
                Senior product leadership, strategy expertise, and team development—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-purple-400">50%</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">1-3</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Days/Week</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">15+ Yrs</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Experience</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-purple-500 text-white font-bold uppercase tracking-wider hover:bg-purple-400 transition-colors">
                  Hire a Fractional CPO
                </Link>
                <Link href="#calculator" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional CPO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional CPO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional CPO</strong> is an experienced Chief Product Officer who works with your company on a part-time basis—typically 1-3 days per week. You get the product vision, strategic leadership, and team guidance of a senior CPO without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike product consultants who advise on specific features, a fractional CPO becomes your product leader. They own the product vision, build and lead your product team, set the roadmap, and take accountability for product outcomes—just not five days a week.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-purple-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "A fractional CPO brings the strategic product thinking that transforms features into outcomes and users into advocates."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">From Feature Factory to Product-Led</h3>
            <p>
              Many growing companies are stuck in "feature factory" mode—building what customers ask for without a coherent product strategy. A fractional CPO brings structure: clear vision, prioritisation frameworks, and outcomes-focused thinking.
            </p>
            <p>
              They help you transition from reactive development to proactive product leadership, building products that drive growth rather than just responding to requests.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional CPO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional CPO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Product Vision & Strategy',
                description: 'Define compelling product vision and strategy. Align product direction with business objectives and market opportunities.',
                icon: '🎯',
              },
              {
                title: 'Roadmap Development',
                description: 'Create and maintain strategic roadmaps. Balance short-term delivery with long-term vision. Communicate priorities to stakeholders.',
                icon: '🗺️',
              },
              {
                title: 'Team Leadership',
                description: 'Build and lead the product team. Hire key roles, mentor product managers, and establish career paths and growth frameworks.',
                icon: '👥',
              },
              {
                title: 'Prioritisation',
                description: 'Implement prioritisation frameworks that align the team. Make tough trade-off decisions and ensure resources focus on highest-impact work.',
                icon: '📊',
              },
              {
                title: 'Stakeholder Management',
                description: 'Manage expectations across CEO, board, engineering, sales, and customers. Communicate product decisions and rationale clearly.',
                icon: '🤝',
              },
              {
                title: 'Product Operations',
                description: 'Establish product management processes, rituals, and tools. Create the operational foundation for a high-performing product org.',
                icon: '⚙️',
              },
              {
                title: 'Customer & Market Insight',
                description: 'Ensure the team stays close to customers and market trends. Build research practices and translate insights into product decisions.',
                icon: '🔍',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-purple-300 transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Hire a Fractional CPO?</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Strategic Product Leadership',
                description: 'Get 15+ years of product experience applied to your challenges. A fractional CPO brings proven frameworks for building products users love.',
                stat: '15+',
                statLabel: 'Years Experience',
              },
              {
                title: 'Cost Efficiency',
                description: 'Access CPO-level expertise at 40-60% less than a full-time hire. Pay only for the time you need—typically £80,000-£140,000 per year versus £200,000+ for full-time.',
                stat: '50%',
                statLabel: 'Cost Savings',
              },
              {
                title: 'Faster Product-Market Fit',
                description: 'Fractional CPOs have helped companies find PMF before. They know the patterns, can spot the signals, and accelerate your path to product success.',
                stat: '2x',
                statLabel: 'Faster PMF',
              },
              {
                title: 'Team Development',
                description: 'Elevate your entire product team. A fractional CPO mentors your PMs, establishes best practices, and builds a product culture that outlasts their tenure.',
                stat: '100%',
                statLabel: 'Team Growth',
              },
              {
                title: 'Cross-Industry Insights',
                description: 'Fractional CPOs work across multiple companies. They bring patterns, benchmarks, and fresh perspectives from diverse product challenges.',
                stat: '5+',
                statLabel: 'Companies Seen',
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-6 p-6 bg-gray-50 border-l-4 border-purple-500">
                <div className="flex-shrink-0 text-center">
                  <div className="text-3xl font-black text-purple-600">{benefit.stat}</div>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional CPO?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'Founder Stepping Back from Product',
                description: 'The founder has been leading product but needs to focus on CEO responsibilities. Time to bring in dedicated product leadership.',
                timing: 'Series A/B',
              },
              {
                scenario: 'Product Team Needs Direction',
                description: 'You have product managers but no senior leader. The team is executing but lacks strategic vision and mentorship.',
                timing: 'When team exceeds 3 PMs',
              },
              {
                scenario: 'Roadmap Confusion',
                description: 'Too many priorities, unclear direction, stakeholder conflicts. You need someone to bring order to product chaos.',
                timing: 'ASAP',
              },
              {
                scenario: 'Scaling Product Organisation',
                description: 'Growing from one product to many, or expanding the product team significantly. Need experienced leadership to structure the org.',
                timing: 'Before scaling',
              },
              {
                scenario: 'Product-Led Growth Transition',
                description: 'Shifting to PLG or building self-serve. Need expertise in building products that sell themselves.',
                timing: 'At strategy decision',
              },
              {
                scenario: 'Pre-Fundraising',
                description: 'Investors want to see strong product leadership. A fractional CPO provides credibility and helps articulate product vision.',
                timing: '3-6 months before raise',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-purple-600 uppercase tracking-wider">{item.timing}</span>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How Much Does a Fractional CPO Cost?</h2>
            <p className="text-gray-600 mt-4">Compare the cost of fractional vs full-time CPO</p>
          </div>
          <RoleCalculator role="cpo" />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time CPO</h2>
          </div>
          <ServiceComparisonTable role="CPO" accentColor="purple" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional CPO</h2>
          </div>
          <HireProcessStepper accentColor="purple" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={CPO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-purple-400">Fractional CPO?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us about your product challenges and we'll match you with pre-vetted fractional CPOs who have solved them before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-purple-500 text-white font-bold uppercase tracking-wider hover:bg-purple-400 transition-colors">
              Find a Fractional CPO
            </Link>
            <Link href="/fractional-cpo-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a CPO Looking for Roles
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
              <Link href="/fractional-cto-services" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Fractional CTO</Link>
              <Link href="/fractional-cmo-services" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Fractional CMO</Link>
              <Link href="/fractional-coo-services" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Fractional COO</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
