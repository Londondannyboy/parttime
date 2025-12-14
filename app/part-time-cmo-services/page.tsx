import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ, CMO_SERVICE_FAQS } from '@/components/FAQ'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { RoleCalculator } from '@/components/RoleCalculator'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CMO Services UK | Hire a Part-Time CMO',
  description: 'Hire a Fractional CMO for your business. Access senior marketing leadership at a fraction of full-time cost. Expert CMOs for growth strategy, brand building, and team leadership. Start within days.',
  keywords: 'fractional cmo, fractional cmo services, hire fractional cmo, part time cmo, fractional chief marketing officer, fractional cmo uk, fractional marketing director',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cmo-services',
  },
  openGraph: {
    title: 'Fractional CMO Services UK | Hire a Part-Time CMO',
    description: 'Hire a Fractional CMO for your business. Senior marketing leadership at a fraction of full-time cost.',
    images: ['/images/fractional-cmo-services.jpg'],
    url: 'https://fractional.quest/fractional-cmo-services',
  },
}

export default function FractionalCMOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CMO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-amber-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Marketing Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CMO<br />
                <span className="text-amber-400">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional CMO</strong> to drive your growth.
                Senior marketing leadership, strategic expertise, and hands-on execution—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-amber-400">50%</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">1-3</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Days/Week</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">2 Weeks</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">To Impact</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">
                  Hire a Fractional CMO
                </Link>
                <Link href="#calculator" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional CMO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional CMO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional CMO</strong> is an experienced Chief Marketing Officer who works with your company on a part-time basis—typically 1-3 days per week. You get the strategic marketing leadership, growth expertise, and team guidance of a senior CMO without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike marketing agencies who execute campaigns, a fractional CMO becomes your marketing leader. They set strategy, manage your team, choose the right channels, and take ownership of marketing results—they just don't do it five days a week.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-amber-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Companies access CMO expertise for £3,000-£5,000 per week instead of £10,000+ monthly for a full-time CMO."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CMO vs Marketing Agency</h3>
            <p>
              A marketing agency executes tactics—they run ads, create content, manage social media. But they don't set your overall strategy, hire your team, or sit in your leadership meetings. They're vendors, not leaders.
            </p>
            <p>
              A fractional CMO is an embedded executive. They own your marketing strategy, build and lead your team, manage agency relationships, and are accountable for growth. Many companies use both: a fractional CMO to lead, with agencies handling execution.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional CMO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional CMO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Marketing Strategy',
                description: 'Develop comprehensive marketing strategy aligned with business goals. Define positioning, messaging, target audiences, and go-to-market approach.',
                icon: '🎯',
              },
              {
                title: 'Team Leadership',
                description: 'Lead and develop your marketing team. Hire key roles, set structure, create processes, and mentor team members.',
                icon: '👥',
              },
              {
                title: 'Growth & Demand Gen',
                description: 'Drive customer acquisition and revenue growth. Build the marketing engine—whether PLG, demand gen, ABM, or performance marketing.',
                icon: '📈',
              },
              {
                title: 'Brand Building',
                description: 'Shape brand identity and positioning. Ensure consistent messaging across all touchpoints and build brand equity.',
                icon: '✨',
              },
              {
                title: 'Marketing Operations',
                description: 'Build marketing infrastructure—tech stack, analytics, reporting, automation. Create the systems that scale.',
                icon: '⚙️',
              },
              {
                title: 'Agency Management',
                description: 'Select, brief, and manage external agencies and freelancers. Ensure they deliver on strategy and budget.',
                icon: '🤝',
              },
              {
                title: 'Performance & Analytics',
                description: 'Define KPIs, build dashboards, and track marketing performance. Make data-driven decisions and report to leadership.',
                icon: '📊',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-amber-300 transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Hire a Fractional CMO?</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Cost Efficiency',
                description: 'Access CMO-level expertise at 40-60% less than a full-time hire. Pay only for the time you need—typically £70,000-£140,000 per year versus £180,000+ for full-time.',
                stat: '50%',
                statLabel: 'Cost Savings',
              },
              {
                title: 'Speed to Impact',
                description: 'Skip the 3-6 month recruitment process. Fractional CMOs can start within weeks and begin driving results immediately with their proven playbooks.',
                stat: '2-4',
                statLabel: 'Weeks to Impact',
              },
              {
                title: 'Growth Expertise',
                description: 'Get a CMO with 15+ years of experience who has scaled companies like yours. They know what works and what doesn\'t—no learning on your dime.',
                stat: '15+',
                statLabel: 'Years Experience',
              },
              {
                title: 'Flexibility',
                description: 'Increase time for product launches or campaigns, reduce during steady periods. Engagements flex with your needs without long-term commitments.',
                stat: '1-5',
                statLabel: 'Days/Week Flex',
              },
              {
                title: 'Cross-Company Insights',
                description: 'Fractional CMOs work across multiple companies. They bring benchmarks, best practices, and fresh perspectives from diverse industries.',
                stat: '3-5',
                statLabel: 'Companies Seen',
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-6 p-6 bg-gray-50 border-l-4 border-amber-500">
                <div className="flex-shrink-0 text-center">
                  <div className="text-3xl font-black text-amber-600">{benefit.stat}</div>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional CMO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none mb-8">
            <p>
              The right time to hire a fractional CMO depends on your marketing challenges. Here are the most common scenarios:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'Marketing Isn\'t Working',
                description: 'You\'re spending on marketing but not seeing results. You need someone who can diagnose the problem and fix it with proven strategies.',
                timing: 'ASAP',
              },
              {
                scenario: 'Scaling After Product-Market Fit',
                description: 'You\'ve found PMF and need to pour fuel on the fire. Time to build a real marketing function with experienced leadership.',
                timing: 'Post-Series A/B',
              },
              {
                scenario: 'Team Needs Leadership',
                description: 'You have marketing staff but no senior leader. They need strategic direction, mentorship, and someone to make the big calls.',
                timing: 'When team exceeds 2-3',
              },
              {
                scenario: 'CEO Stuck in Marketing',
                description: 'If the CEO is writing copy, managing ads, and handling brand decisions, it\'s time to delegate to a marketing professional.',
                timing: 'Before burnout',
              },
              {
                scenario: 'Launching New Markets',
                description: 'Expanding geographically or into new segments requires strategic marketing leadership to get positioning and GTM right.',
                timing: '3-6 months before launch',
              },
              {
                scenario: 'Rebranding or Repositioning',
                description: 'Major brand changes need experienced leadership. A fractional CMO can lead the process and ensure successful execution.',
                timing: 'At project start',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-amber-600 uppercase tracking-wider">{item.timing}</span>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How Much Does a Fractional CMO Cost?</h2>
            <p className="text-gray-600 mt-4">Compare the cost of fractional vs full-time CMO</p>
          </div>
          <RoleCalculator role="cmo" />
          <div className="mt-8 prose prose-gray max-w-none">
            <h3 className="text-xl font-bold text-gray-900">Typical Fractional CMO Pricing</h3>
            <ul className="text-gray-600">
              <li><strong>Day Rate:</strong> £700-£1,400 per day (depending on experience and specialisation)</li>
              <li><strong>Monthly Retainer:</strong> £3,000-£5,500 for 1-2 days per week</li>
              <li><strong>Annual Cost:</strong> £70,000-£140,000 (vs £180,000+ for full-time)</li>
            </ul>
            <p className="text-sm text-gray-500">
              Pricing varies based on the CMO's experience, your industry, and role complexity.
              Specialist expertise (e.g., PLG, B2B SaaS, DTC) may command premium rates.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time CMO</h2>
            <p className="text-gray-600 mt-4">Choose the right model for your needs</p>
          </div>
          <ServiceComparisonTable role="CMO" accentColor="amber" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional CMO</h2>
            <p className="text-gray-600 mt-4">From first conversation to start date in as little as 2 weeks</p>
          </div>
          <HireProcessStepper accentColor="amber" />
          <div className="mt-12 prose prose-gray max-w-none">
            <h3 className="text-xl font-bold text-gray-900">What to Look For</h3>
            <ul className="text-gray-600">
              <li><strong>Relevant Experience:</strong> Have they driven growth at companies like yours (stage, model, audience)?</li>
              <li><strong>Channel Expertise:</strong> Do they know the channels that matter for you (PLG, demand gen, brand, ABM)?</li>
              <li><strong>Leadership Skills:</strong> Can they build and lead teams, not just execute tactics?</li>
              <li><strong>Results Track Record:</strong> Can they demonstrate measurable impact from previous roles?</li>
              <li><strong>Cultural Fit:</strong> Will they integrate with your team and work style?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Industries</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CMOs by Industry</h2>
            <p className="text-gray-600 mt-4">Specialists with deep sector experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'B2B SaaS', description: 'Product-led growth, demand generation, content marketing, ABM', link: '/fractional-jobs-saas' },
              { name: 'E-commerce & DTC', description: 'Performance marketing, lifecycle, retention, marketplace strategy', link: '/fractional-jobs-ecommerce' },
              { name: 'FinTech', description: 'Trust building, compliance marketing, B2B and B2C strategies', link: '/fractional-jobs-finance' },
              { name: 'HealthTech', description: 'Healthcare marketing, HCP engagement, regulatory considerations', link: '/fractional-jobs-healthcare' },
              { name: 'Professional Services', description: 'Thought leadership, BD marketing, partner marketing', link: '/fractional-jobs-professional-services' },
              { name: 'Startups & Scale-ups', description: 'Zero-to-one marketing, GTM strategy, brand building', link: '/fractional-jobs-startups' },
            ].map((industry, index) => (
              <Link key={index} href={industry.link} className="block bg-white p-6 border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={CMO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-amber-400">Fractional CMO?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us about your growth challenges and we'll match you with pre-vetted fractional CMOs who have solved them before. Start conversations within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors">
              Find a Fractional CMO
            </Link>
            <Link href="/fractional-cmo-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a CMO Looking for Roles
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
              <Link href="/fractional-cfo-services" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Fractional CFO</Link>
              <Link href="/fractional-cto-services" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Fractional CTO</Link>
              <Link href="/fractional-coo-services" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Fractional COO</Link>
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">CMO Jobs</Link>
              <Link href="/fractional-cmo-salary" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">CMO Salary Guide</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
