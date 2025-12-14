import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ } from '@/components/FAQ'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { RoleCalculator } from '@/components/RoleCalculator'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

const CISO_SERVICE_FAQS = [
  {
    question: 'What is a Fractional CISO?',
    answer: 'A Fractional CISO (Chief Information Security Officer) is an experienced security executive who works with your company part-time, typically 1-3 days per week. You get strategic security leadership, compliance expertise, and risk management without the cost of a full-time executive.',
  },
  {
    question: 'When should my company hire a Fractional CISO?',
    answer: 'Consider hiring a fractional CISO when: you need to achieve compliance certifications (SOC 2, ISO 27001); customers are asking about your security practices; you\'ve experienced a security incident; you\'re preparing for fundraising or enterprise sales; or you need to build a security programme from scratch.',
  },
  {
    question: 'How much does a Fractional CISO cost?',
    answer: 'Fractional CISOs typically charge £900-£1,600 per day in the UK. At 2 days per week, this translates to roughly £90,000-£160,000 annually—compared to £180,000-£300,000+ for a full-time CISO.',
  },
  {
    question: 'What does a Fractional CISO do?',
    answer: 'A Fractional CISO develops security strategy, manages risk, leads compliance programmes (SOC 2, ISO 27001, GDPR), oversees security operations, manages incidents, develops security awareness programmes, and advises the board on security matters.',
  },
  {
    question: 'Can a Fractional CISO help with SOC 2 certification?',
    answer: 'Yes—achieving SOC 2 is one of the most common reasons to hire a fractional CISO. They can assess your current state, develop the required policies and controls, manage the audit process, and ensure you achieve certification efficiently.',
  },
  {
    question: 'How is a Fractional CISO different from a security consultant?',
    answer: 'A Fractional CISO is an embedded leader who takes ongoing responsibility for your security programme. Security consultants typically advise on specific projects without long-term accountability. A fractional CISO builds and owns your security function.',
  },
]

export const metadata: Metadata = {
  title: 'Fractional CISO Services UK | Hire a Part-Time Chief Security Officer',
  description: 'Hire a Fractional CISO for your business. Access senior security leadership at a fraction of full-time cost. Expert CISOs for SOC 2, ISO 27001, security strategy, and compliance. Start within days.',
  keywords: 'fractional ciso, fractional ciso services, hire fractional ciso, part time ciso, fractional chief security officer, fractional ciso uk, fractional security director, soc 2 compliance',
  alternates: {
    canonical: 'https://fractional.quest/fractional-ciso-services',
  },
  openGraph: {
    title: 'Fractional CISO Services UK | Hire a Part-Time Chief Security Officer',
    description: 'Hire a Fractional CISO for your business. Senior security leadership at a fraction of full-time cost.',
    images: ['/images/fractional-ciso-services.jpg'],
    url: 'https://fractional.quest/fractional-ciso-services',
  },
}

export default function FractionalCISOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CISO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-red-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Security Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CISO<br />
                <span className="text-red-400">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional CISO</strong> to protect your business.
                Senior security leadership, compliance expertise, and risk management—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-red-400">SOC 2</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Certified</div>
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
                <Link href="#contact" className="px-8 py-4 bg-red-500 text-white font-bold uppercase tracking-wider hover:bg-red-400 transition-colors">
                  Hire a Fractional CISO
                </Link>
                <Link href="#calculator" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional CISO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional CISO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional CISO</strong> (Chief Information Security Officer) is an experienced security executive who works with your company on a part-time basis—typically 1-3 days per week. You get strategic security leadership, compliance expertise, and risk management without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike security consultants who perform one-off assessments, a fractional CISO becomes your security leader. They build and own your security programme, manage risks, drive compliance, and ensure security enables your business rather than blocking it.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-red-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Security is no longer optional. A fractional CISO ensures you're protected without breaking the bank."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Security as a Business Enabler</h3>
            <p>
              Many companies see security as a blocker—something that slows things down and adds cost. A good fractional CISO turns this around. They implement security that enables the business: winning enterprise deals, building customer trust, and protecting against real risks without unnecessary bureaucracy.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional CISO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional CISO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Security Strategy',
                description: 'Develop security strategy aligned with business objectives. Create roadmaps that balance risk, cost, and business agility.',
                icon: '🎯',
              },
              {
                title: 'Compliance & Certifications',
                description: 'Lead compliance programmes—SOC 2, ISO 27001, GDPR, PCI-DSS. Manage audits and ensure certifications are achieved and maintained.',
                icon: '✅',
              },
              {
                title: 'Risk Management',
                description: 'Identify, assess, and manage security risks. Build risk frameworks and ensure the business makes informed risk decisions.',
                icon: '⚠️',
              },
              {
                title: 'Security Operations',
                description: 'Oversee security operations—monitoring, detection, and response. Ensure threats are identified and addressed quickly.',
                icon: '🔍',
              },
              {
                title: 'Incident Response',
                description: 'Build and test incident response capabilities. Lead response when incidents occur and ensure lessons are learned.',
                icon: '🚨',
              },
              {
                title: 'Vendor Security',
                description: 'Assess and manage third-party security risks. Ensure vendors meet security requirements and don\'t introduce risk.',
                icon: '🤝',
              },
              {
                title: 'Security Awareness',
                description: 'Build security culture. Develop training programmes that make every employee part of the security team.',
                icon: '👥',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-red-300 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Compliance</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Compliance Frameworks We Support</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'SOC 2', description: 'Type I & Type II' },
              { name: 'ISO 27001', description: 'Certification' },
              { name: 'GDPR', description: 'Data Protection' },
              { name: 'PCI-DSS', description: 'Payment Security' },
              { name: 'HIPAA', description: 'Healthcare' },
              { name: 'Cyber Essentials', description: 'UK Standard' },
              { name: 'NIST', description: 'Framework' },
              { name: 'FCA', description: 'Financial Services' },
            ].map((cert, index) => (
              <div key={index} className="bg-gray-50 p-4 text-center border border-gray-200">
                <div className="font-black text-gray-900">{cert.name}</div>
                <div className="text-xs text-gray-500">{cert.description}</div>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional CISO?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'Enterprise Sales Blocked',
                description: 'Enterprise customers are asking about SOC 2 or security questionnaires are blocking deals. Time to professionalise security.',
                timing: 'Before you lose deals',
              },
              {
                scenario: 'Compliance Requirements',
                description: 'Need SOC 2, ISO 27001, or other certifications. Need leadership to scope, plan, and execute the certification project.',
                timing: '6-9 months before audit',
              },
              {
                scenario: 'After a Security Incident',
                description: 'Experienced a breach or near-miss. Need leadership to respond, remediate, and build resilience against future incidents.',
                timing: 'Immediately',
              },
              {
                scenario: 'Preparing for Fundraising',
                description: 'Investors ask about security. Need to demonstrate mature security practices and have credible leadership.',
                timing: '3-6 months before raise',
              },
              {
                scenario: 'Scaling Rapidly',
                description: 'Growing fast and security is being left behind. Need to build security that scales with the business.',
                timing: 'Before it becomes a crisis',
              },
              {
                scenario: 'Board Pressure',
                description: 'Board wants oversight of security risks. Need executive-level reporting and governance.',
                timing: 'At board request',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-red-600 uppercase tracking-wider">{item.timing}</span>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How Much Does a Fractional CISO Cost?</h2>
            <p className="text-gray-600 mt-4">Compare the cost of fractional vs full-time CISO</p>
          </div>
          <RoleCalculator role="ciso" />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time CISO</h2>
          </div>
          <ServiceComparisonTable role="CISO" accentColor="orange" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional CISO</h2>
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
          <FAQ items={CISO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-red-400">Fractional CISO?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us about your security challenges and we'll match you with pre-vetted fractional CISOs who have solved them before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-red-500 text-white font-bold uppercase tracking-wider hover:bg-red-400 transition-colors">
              Find a Fractional CISO
            </Link>
            <Link href="/fractional-ciso-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a CISO Looking for Roles
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
              <Link href="/fractional-cto-services" className="text-gray-600 hover:text-red-600 font-medium transition-colors">Fractional CTO</Link>
              <Link href="/fractional-cio-services" className="text-gray-600 hover:text-red-600 font-medium transition-colors">Fractional CIO</Link>
              <Link href="/fractional-cdo-services" className="text-gray-600 hover:text-red-600 font-medium transition-colors">Fractional CDO</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
