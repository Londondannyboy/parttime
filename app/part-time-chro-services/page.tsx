import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ } from '@/components/FAQ'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { RoleCalculator } from '@/components/RoleCalculator'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

const CHRO_SERVICE_FAQS = [
  {
    question: 'What is a Fractional CHRO?',
    answer: 'A Fractional CHRO (Chief Human Resources Officer) is an experienced HR executive who works with your company part-time, typically 1-3 days per week. You get strategic people leadership, culture development, and HR expertise without the cost of a full-time executive hire.',
  },
  {
    question: 'When should my company hire a Fractional CHRO?',
    answer: 'Consider hiring a fractional CHRO when: you\'re scaling rapidly and need to professionalise HR; you\'re dealing with culture or engagement challenges; you need to build HR infrastructure; you\'re preparing for significant hiring; or you need expertise in complex people situations (restructuring, M&A).',
  },
  {
    question: 'How much does a Fractional CHRO cost?',
    answer: 'Fractional CHROs typically charge £650-£1,200 per day in the UK. At 2 days per week, this translates to roughly £65,000-£120,000 annually—compared to £150,000-£220,000+ for a full-time CHRO.',
  },
  {
    question: 'What does a Fractional CHRO do?',
    answer: 'A Fractional CHRO develops people strategy, builds culture, designs compensation and benefits, leads talent acquisition strategy, manages employee relations, ensures compliance, develops leadership, and advises the CEO and board on people matters.',
  },
  {
    question: 'How is a Fractional CHRO different from an HR Manager?',
    answer: 'A Fractional CHRO operates at the strategic level—they set people strategy, advise the CEO, and sit at the leadership table. HR Managers focus on operational HR—policies, administration, and day-to-day people operations. A fractional CHRO provides the strategic layer above operational HR.',
  },
  {
    question: 'Can a Fractional CHRO help with rapid scaling?',
    answer: 'Yes—scaling is one of the most common reasons to hire a fractional CHRO. They can build the hiring infrastructure, design onboarding programmes, develop managers, and create the people systems that enable rapid growth while maintaining culture.',
  },
]

export const metadata: Metadata = {
  title: 'Fractional CHRO Services UK | Hire a Part-Time HR Director',
  description: 'Hire a Fractional CHRO for your business. Access senior HR leadership at a fraction of full-time cost. Expert CHROs for people strategy, culture building, and talent development. Start within days.',
  keywords: 'fractional chro, fractional hr director, hire fractional chro, part time hr director, fractional chief hr officer, fractional chro uk, fractional people director',
  alternates: {
    canonical: 'https://fractional.quest/fractional-chro-services',
  },
  openGraph: {
    title: 'Fractional CHRO Services UK | Hire a Part-Time HR Director',
    description: 'Hire a Fractional CHRO for your business. Senior HR leadership at a fraction of full-time cost.',
    images: ['/images/fractional-chro-services.jpg'],
    url: 'https://fractional.quest/fractional-chro-services',
  },
}

export default function FractionalCHROServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D roleFilter="CHRO" limit={25} height="100%" isHero={true} showOverlay={true} />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-pink-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                People Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CHRO<br />
                <span className="text-pink-400">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional CHRO</strong> to lead your people function.
                Senior HR leadership, culture expertise, and talent strategy—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-pink-400">55%</div>
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
                <Link href="#contact" className="px-8 py-4 bg-pink-500 text-white font-bold uppercase tracking-wider hover:bg-pink-400 transition-colors">
                  Hire a Fractional CHRO
                </Link>
                <Link href="#calculator" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional CHRO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional CHRO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional CHRO</strong> (also called Fractional HR Director or Fractional People Director) is an experienced HR executive who works with your company on a part-time basis—typically 1-3 days per week. You get strategic people leadership, culture expertise, and HR strategy without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike HR consultants who advise on specific projects, a fractional CHRO becomes your people leader. They develop people strategy, shape culture, advise the CEO, and take ownership of the employee experience—just not five days a week.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-pink-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Your people are your competitive advantage. A fractional CHRO ensures you attract, develop, and retain the talent you need to win."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Beyond HR Administration</h3>
            <p>
              Many growing companies have operational HR—someone handling payroll, policies, and admin—but lack strategic people leadership. A fractional CHRO provides that strategic layer: thinking about how to build culture, develop leaders, and create an organisation where great people want to work.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional CHRO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional CHRO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'People Strategy',
                description: 'Develop and implement people strategy aligned with business goals. Define how the organisation attracts, develops, and retains talent.',
                icon: '🎯',
              },
              {
                title: 'Culture Building',
                description: 'Shape and nurture company culture. Define values, build rituals, and ensure culture scales with growth.',
                icon: '💫',
              },
              {
                title: 'Talent Acquisition',
                description: 'Design hiring strategy, build employer brand, and create the recruiting infrastructure for scale. Ensure you attract the right people.',
                icon: '🔍',
              },
              {
                title: 'Leadership Development',
                description: 'Develop your managers and leaders. Build leadership programmes, coaching systems, and succession planning.',
                icon: '📈',
              },
              {
                title: 'Compensation & Benefits',
                description: 'Design competitive compensation structures, benefits packages, and equity programmes that attract and retain talent.',
                icon: '💰',
              },
              {
                title: 'Employee Experience',
                description: 'Own the full employee lifecycle—onboarding, development, performance, engagement, and offboarding.',
                icon: '❤️',
              },
              {
                title: 'HR Operations',
                description: 'Build HR infrastructure—policies, systems, compliance, and processes that support a growing organisation.',
                icon: '⚙️',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-pink-300 transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Hire a Fractional CHRO?</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Strategic People Leadership',
                description: 'Get 15+ years of HR experience applied to your challenges. A fractional CHRO brings proven approaches to building great organisations.',
                stat: '15+',
                statLabel: 'Years Experience',
              },
              {
                title: 'Cost Efficiency',
                description: 'Access CHRO-level expertise at 40-60% less than a full-time hire. Pay only for the time you need—typically £65,000-£120,000 per year versus £180,000+ for full-time.',
                stat: '55%',
                statLabel: 'Cost Savings',
              },
              {
                title: 'Culture at Scale',
                description: 'Maintain culture while scaling rapidly. Fractional CHROs know how to preserve what makes your company special while growing 2-3x.',
                stat: '3x',
                statLabel: 'Scale with Culture',
              },
              {
                title: 'Avoid Costly Mistakes',
                description: 'HR mistakes are expensive—bad hires, compliance issues, culture problems. A fractional CHRO helps you avoid the pitfalls.',
                stat: '£100k+',
                statLabel: 'Mistakes Avoided',
              },
              {
                title: 'Cross-Company Best Practices',
                description: 'Fractional CHROs work across multiple companies. They bring proven practices, benchmarks, and fresh perspectives on people challenges.',
                stat: '5+',
                statLabel: 'Companies Seen',
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-6 p-6 bg-gray-50 border-l-4 border-pink-500">
                <div className="flex-shrink-0 text-center">
                  <div className="text-3xl font-black text-pink-600">{benefit.stat}</div>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional CHRO?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'Scaling Rapidly',
                description: 'Growing from 20 to 100+ people. You need HR infrastructure, hiring processes, and leadership development to scale successfully.',
                timing: 'Before doubling headcount',
              },
              {
                scenario: 'Culture Concerns',
                description: 'Culture is slipping as you grow. Engagement is declining, values feel diluted, or there\'s a disconnect between teams.',
                timing: 'At first warning signs',
              },
              {
                scenario: 'Post-Funding Growth',
                description: 'You\'ve raised capital and need to hire significantly. Time to professionalise HR and build the talent acquisition machine.',
                timing: 'Immediately after close',
              },
              {
                scenario: 'Leadership Gaps',
                description: 'Your managers need development. People are promoted into leadership without support, and it\'s affecting team performance.',
                timing: 'When patterns emerge',
              },
              {
                scenario: 'Retention Problems',
                description: 'Good people are leaving. You need to understand why and build an organisation people want to stay at.',
                timing: 'Before it accelerates',
              },
              {
                scenario: 'Complex HR Situations',
                description: 'Restructuring, M&A, international expansion, or other complex people situations that need senior expertise.',
                timing: 'At project inception',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-pink-600 uppercase tracking-wider">{item.timing}</span>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How Much Does a Fractional CHRO Cost?</h2>
            <p className="text-gray-600 mt-4">Compare the cost of fractional vs full-time CHRO</p>
          </div>
          <RoleCalculator role="chro" />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time CHRO</h2>
          </div>
          <ServiceComparisonTable role="CHRO" accentColor="pink" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional CHRO</h2>
          </div>
          <HireProcessStepper accentColor="pink" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={CHRO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-pink-400">Fractional CHRO?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tell us about your people challenges and we'll match you with pre-vetted fractional CHROs who have solved them before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-pink-500 text-white font-bold uppercase tracking-wider hover:bg-pink-400 transition-colors">
              Find a Fractional CHRO
            </Link>
            <Link href="/fractional-hr-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm an HR Leader Looking for Roles
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
              <Link href="/fractional-coo-services" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Fractional COO</Link>
              <Link href="/fractional-cfo-services" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Fractional CFO</Link>
              <Link href="/fractional-cpo-services" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Fractional CPO</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
