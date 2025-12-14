import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ, CTO_SERVICE_FAQS } from '@/components/FAQ'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { RoleCalculator } from '@/components/RoleCalculator'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CTO Services UK | Hire a Part-Time CTO',
  description: 'Hire a Fractional CTO for your business. Access senior technical leadership at a fraction of full-time cost. Expert CTOs for architecture, team building, and technical strategy. Start within days.',
  keywords: 'fractional cto, fractional cto services, hire fractional cto, part time cto, fractional chief technology officer, fractional cto uk, fractional tech lead',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cto-services',
  },
  openGraph: {
    title: 'Fractional CTO Services UK | Hire a Part-Time CTO',
    description: 'Hire a Fractional CTO for your business. Senior technical leadership at a fraction of full-time cost.',
    images: ['/images/fractional-cto-services.jpg'],
    url: 'https://fractional.quest/fractional-cto-services',
  },
}

export default function FractionalCTOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CTO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-blue-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Technical Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CTO<br />
                <span className="text-blue-400">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional CTO</strong> to lead your technology.
                Senior technical leadership, architecture expertise, and engineering strategy—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-blue-400">55%</div>
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
                <Link href="#contact" className="px-8 py-4 bg-blue-500 text-white font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">
                  Hire a Fractional CTO
                </Link>
                <Link href="#calculator" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional CTO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional CTO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional CTO</strong> is an experienced Chief Technology Officer who works with your company on a part-time basis—typically 1-3 days per week. You get the technical leadership, architecture expertise, and engineering strategy of a senior CTO without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike technical consultants who advise on specific problems, a fractional CTO becomes your technology leader. They make architecture decisions, lead your engineering team, set technical strategy, and take ownership of your technology—just not five days a week.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-blue-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Companies access CTO expertise for £3,500-£6,500 per week instead of £15,000+ monthly for a full-time CTO."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CTO vs Technical Consultant</h3>
            <p>
              A technical consultant gives advice on specific problems—they might review your architecture, assess technical debt, or recommend a technology stack. But they don't take ongoing ownership or lead your team.
            </p>
            <p>
              A fractional CTO is an embedded leader. They're accountable for technical outcomes, make decisions (not just recommendations), mentor your engineers, and represent technology to your board and investors. They're part of your leadership team.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional CTO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional CTO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Technical Strategy',
                description: 'Define technical vision and roadmap aligned with business goals. Make build vs buy decisions, choose technology stack, and plan for scale.',
                icon: '🎯',
              },
              {
                title: 'Architecture & Design',
                description: 'Design scalable, secure, maintainable architecture. Review technical decisions, address technical debt, and ensure systems can handle growth.',
                icon: '🏗️',
              },
              {
                title: 'Engineering Leadership',
                description: 'Lead and mentor your engineering team. Set standards, improve processes, conduct code reviews, and build engineering culture.',
                icon: '👥',
              },
              {
                title: 'Technical Hiring',
                description: 'Hire key engineering roles. Define job specs, conduct technical interviews, assess candidates, and build the team you need.',
                icon: '🔍',
              },
              {
                title: 'Security & Compliance',
                description: 'Ensure systems are secure and compliant. Implement security best practices, manage risks, and prepare for audits.',
                icon: '🔒',
              },
              {
                title: 'Technical Due Diligence',
                description: 'Represent technology to investors and acquirers. Prepare for technical DD, address concerns, and provide credibility.',
                icon: '📋',
              },
              {
                title: 'Vendor & Tools',
                description: 'Select and manage technology vendors. Evaluate tools, negotiate contracts, and ensure you\'re getting value from tech spend.',
                icon: '🛠️',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-blue-300 transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Hire a Fractional CTO?</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Cost Efficiency',
                description: 'Access CTO-level expertise at 40-60% less than a full-time hire. Pay only for the time you need—typically £85,000-£160,000 per year versus £250,000+ for full-time.',
                stat: '55%',
                statLabel: 'Cost Savings',
              },
              {
                title: 'Experienced Leadership',
                description: 'Get a CTO with 15-20+ years of experience who has built and scaled systems before. No learning on the job—they\'ve seen your challenges already.',
                stat: '15+',
                statLabel: 'Years Experience',
              },
              {
                title: 'Investor Credibility',
                description: 'Investors want to see experienced technical leadership. A fractional CTO provides the credibility and can handle technical due diligence.',
                stat: '100%',
                statLabel: 'DD Ready',
              },
              {
                title: 'Flexibility',
                description: 'Scale up for major releases or architecture work, scale down during steady periods. Engagements flex with your needs.',
                stat: '1-5',
                statLabel: 'Days/Week Flex',
              },
              {
                title: 'Broad Expertise',
                description: 'Fractional CTOs work across multiple companies and tech stacks. They bring diverse experience and modern best practices.',
                stat: '5+',
                statLabel: 'Companies Seen',
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-6 p-6 bg-gray-50 border-l-4 border-blue-500">
                <div className="flex-shrink-0 text-center">
                  <div className="text-3xl font-black text-blue-600">{benefit.stat}</div>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional CTO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none mb-8">
            <p>
              The right time to hire a fractional CTO depends on your technical needs and company stage. Here are the most common scenarios:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'Building First Product',
                description: 'You\'re a non-technical founder building your first product. You need someone to set the technical direction and oversee development.',
                timing: 'Before development starts',
              },
              {
                scenario: 'Preparing for Fundraising',
                description: 'Investors will want to talk to your technical leader. A fractional CTO provides credibility and handles technical due diligence.',
                timing: '3-6 months before raise',
              },
              {
                scenario: 'Scaling Engineering Team',
                description: 'You\'re growing from 2-3 developers to 10+. You need senior leadership to structure the team, set processes, and maintain quality.',
                timing: 'When team exceeds 5',
              },
              {
                scenario: 'Technical Debt Crisis',
                description: 'Your system is struggling under its own weight. You need experienced leadership to diagnose problems and plan the path forward.',
                timing: 'Before it\'s too late',
              },
              {
                scenario: 'Architecture Evolution',
                description: 'You need to re-architect for scale, migrate to cloud, or modernise legacy systems. These decisions need senior technical leadership.',
                timing: 'At project inception',
              },
              {
                scenario: 'Security & Compliance',
                description: 'You need to achieve SOC 2, ISO 27001, or other certifications. A fractional CTO can lead the security programme.',
                timing: '6 months before audit',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wider">{item.timing}</span>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How Much Does a Fractional CTO Cost?</h2>
            <p className="text-gray-600 mt-4">Compare the cost of fractional vs full-time CTO</p>
          </div>
          <RoleCalculator role="cto" />
          <div className="mt-8 prose prose-gray max-w-none">
            <h3 className="text-xl font-bold text-gray-900">Typical Fractional CTO Pricing</h3>
            <ul className="text-gray-600">
              <li><strong>Day Rate:</strong> £850-£1,600 per day (depending on experience and specialisation)</li>
              <li><strong>Monthly Retainer:</strong> £3,500-£6,500 for 1-2 days per week</li>
              <li><strong>Annual Cost:</strong> £85,000-£160,000 (vs £250,000+ for full-time)</li>
            </ul>
            <p className="text-sm text-gray-500">
              Pricing varies based on the CTO's experience, your technology stack, and complexity.
              Specialist expertise (AI/ML, security, specific languages) may command premium rates.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time CTO</h2>
            <p className="text-gray-600 mt-4">Choose the right model for your needs</p>
          </div>
          <ServiceComparisonTable role="CTO" accentColor="blue" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional CTO</h2>
            <p className="text-gray-600 mt-4">From first conversation to start date in as little as 2 weeks</p>
          </div>
          <HireProcessStepper accentColor="blue" />
          <div className="mt-12 prose prose-gray max-w-none">
            <h3 className="text-xl font-bold text-gray-900">What to Look For</h3>
            <ul className="text-gray-600">
              <li><strong>Relevant Stack:</strong> Have they built systems with your technology stack?</li>
              <li><strong>Scale Experience:</strong> Have they scaled systems and teams at companies like yours?</li>
              <li><strong>Leadership Skills:</strong> Can they lead engineers, not just write code?</li>
              <li><strong>Communication:</strong> Can they translate technical concepts for non-technical stakeholders?</li>
              <li><strong>Strategic Thinking:</strong> Do they think about technology in terms of business outcomes?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Specialisations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Specialisations</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CTOs by Expertise</h2>
            <p className="text-gray-600 mt-4">Specialists with deep technical experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'AI & Machine Learning', description: 'MLOps, model deployment, AI product development, data infrastructure', link: '/fractional-jobs-tech' },
              { name: 'Cloud & DevOps', description: 'AWS/GCP/Azure, infrastructure as code, CI/CD, platform engineering', link: '/fractional-jobs-tech' },
              { name: 'Security & Compliance', description: 'SOC 2, ISO 27001, penetration testing, security architecture', link: '/fractional-jobs-tech' },
              { name: 'FinTech', description: 'Payment systems, FCA compliance, financial APIs, security requirements', link: '/fractional-jobs-finance' },
              { name: 'B2B SaaS', description: 'Multi-tenant architecture, API design, integration platforms, enterprise features', link: '/fractional-jobs-saas' },
              { name: 'HealthTech', description: 'HIPAA compliance, NHS integration, clinical systems, health data', link: '/fractional-jobs-healthcare' },
            ].map((specialisation, index) => (
              <Link key={index} href={specialisation.link} className="block bg-white p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 mb-2">{specialisation.name}</h3>
                <p className="text-gray-600 text-sm">{specialisation.description}</p>
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
          <FAQ items={CTO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-blue-400">Fractional CTO?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us about your technical challenges and we'll match you with pre-vetted fractional CTOs who have solved them before. Start conversations within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-blue-500 text-white font-bold uppercase tracking-wider hover:bg-blue-400 transition-colors">
              Find a Fractional CTO
            </Link>
            <Link href="/fractional-cto-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a CTO Looking for Roles
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
              <Link href="/fractional-cfo-services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional CFO</Link>
              <Link href="/fractional-cmo-services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional CMO</Link>
              <Link href="/fractional-coo-services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional COO</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">CTO Jobs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
