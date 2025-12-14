import { Metadata } from 'next'
import Link from 'next/link'
import { SavingsCalculator } from '@/components/SavingsCalculator'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { getAgencies, Agency } from '@/lib/agencies'

export const metadata: Metadata = {
  title: 'Best Fractional Recruitment Agency UK | Top Recruiters',
  description: 'Find the best fractional recruitment agency in the UK. Compare top fractional recruiters for CFO, CTO, CMO hiring. Save 40-60% vs full-time executive hires.',
  keywords: 'best fractional recruitment agency, fractional recruiters, top fractional recruitment agencies, fractional recruitment agency uk, fractional executive recruitment, fractional cfo recruitment',
  alternates: {
    canonical: 'https://fractional.quest/top-fractional-recruitment-agencies-best-fractional-recruitment-agency-fractional-recruiter',
  },
  openGraph: {
    title: 'Best Fractional Recruitment Agency UK | Top Recruiters',
    description: 'Find the best fractional recruitment agency in the UK. Compare top fractional recruiters and save 40-60% vs full-time hires.',
    type: 'website',
    url: 'https://fractional.quest/top-fractional-recruitment-agencies-best-fractional-recruitment-agency-fractional-recruiter',
  },
}

export const revalidate = 3600

export default async function TopFractionalRecruitmentAgenciesPage() {
  const agencies = await getAgencies()
  const otherAgencies = agencies.filter(a => !a.payload?.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Hero with 3D Knowledge Graph Background */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <JobsGraph3D limit={30} height="100%" isHero={true} showOverlay={true} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Editorial Pitch */}
              <div>
                <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
                  <span className="mr-2">←</span> Back to Home
                </Link>

                <span className="inline-block bg-amber-500 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  Launching January 2025
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                  Fractional Recruitment Agency
                  <span className="block text-amber-400"> - Done Differently</span>
                </h1>

                <p className="text-xl text-white/80 leading-relaxed max-w-xl mb-8">
                  We're building a better way to connect businesses with fractional executives.
                  Transparent fees. Quality over quantity. <strong className="text-white">Currently in beta</strong>—join us as we launch.
                </p>

                {/* Value Props - NOT fake stats */}
                <div className="flex flex-wrap gap-6 mb-10">
                  <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-lg border border-white/20">
                    <div className="text-lg font-bold text-white">Transparent</div>
                    <div className="text-white/60 text-sm">10-15% fees, no hidden costs</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-lg border border-white/20">
                    <div className="text-lg font-bold text-white">Quality First</div>
                    <div className="text-white/60 text-sm">Vetted, not volume</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-lg border border-white/20">
                    <div className="text-lg font-bold text-white">Success-Based</div>
                    <div className="text-white/60 text-sm">Pay only when you hire</div>
                  </div>
                </div>

                {/* Beta Badge */}
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full border border-amber-500/30">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Beta - Building our network now</span>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div id="contact-form" className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Get Early Access</h2>
                <p className="text-gray-600 mb-6">Tell us what you're looking for. We'll be in touch as we launch.</p>

                <form className="space-y-4" action="/contact/companies" method="GET">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        name="company"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Acme Ltd"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role Needed</label>
                    <select
                      name="role"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select a role...</option>
                      <option value="cfo">Fractional CFO</option>
                      <option value="cto">Fractional CTO</option>
                      <option value="cmo">Fractional CMO</option>
                      <option value="coo">Fractional COO</option>
                      <option value="chro">Fractional CHRO / HR Director</option>
                      <option value="other">Other Executive Role</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tell us about your needs</label>
                    <textarea
                      name="message"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., Series A startup needs fractional CFO 2 days/week for fundraising support..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 text-black py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
                  >
                    Register Interest
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-3">Want to chat about what we're building?</p>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Book a Call With Our Team
                  </Link>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  No obligation. We're just getting started and want to understand your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              How Our Fractional Recruitment Agency Works
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              A fractional recruitment agency that prioritises quality matching over volume, with transparent pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Brief Us', description: 'Share your requirements, challenges, and ideal candidate profile.' },
              { step: '2', title: 'We Match', description: 'We search for candidates who genuinely fit your needs—not just anyone available.' },
              { step: '3', title: 'You Interview', description: 'Meet candidates directly. We facilitate introductions and provide backgrounds.' },
              { step: '4', title: 'Engage', description: 'Agree terms with your chosen executive. Pay our fee only on success.' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black text-amber-400 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure - Transparent */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Fractional Recruitment Agency Fees
            </h2>
            <p className="text-xl text-gray-600">No retainers. No upfront costs. Pay only when you hire.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-transparent hover:border-amber-400 transition-colors">
              <div className="text-4xl font-black text-gray-900 mb-2">10%</div>
              <div className="text-lg font-bold text-gray-900 mb-2">Director Roles</div>
              <div className="text-sm text-gray-600">Finance Director, HR Director, Marketing Director</div>
            </div>
            <div className="bg-black rounded-xl p-8 text-center text-white transform md:scale-105">
              <div className="text-4xl font-black text-amber-400 mb-2">12.5%</div>
              <div className="text-lg font-bold mb-2">C-Suite Roles</div>
              <div className="text-sm text-gray-400">CFO, CTO, CMO, COO</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-transparent hover:border-amber-400 transition-colors">
              <div className="text-4xl font-black text-gray-900 mb-2">15%</div>
              <div className="text-lg font-bold text-gray-900 mb-2">Executive Search</div>
              <div className="text-sm text-gray-600">CEO, specialist or hard-to-fill roles</div>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8 text-sm">
            Fees calculated on first 12 months' engagement value. These are our planned fees for launch.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Beta Tool</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Savings Calculator</h2>
            <p className="text-gray-600 mt-2">Estimate potential savings with fractional hiring. Results are illustrative only.</p>
          </div>
          <SavingsCalculator />
          <p className="text-center text-xs text-gray-500 mt-4">
            This calculator is a beta feature providing rough estimates. Actual savings depend on many factors.
            Consult with a qualified accountant for accurate financial planning.
          </p>
        </div>
      </section>

      {/* Why Fractional Recruitment */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">The Value</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Why Use a Fractional Recruitment Agency?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Access Senior Talent', description: 'Fractional executives bring years of experience to your specific challenges without the full-time commitment.', icon: '✓' },
              { title: 'Faster Than Executive Search', description: 'Traditional executive search can take 3-6 months. Fractional placements typically happen in weeks.', icon: '⚡' },
              { title: 'Lower Commitment', description: 'Start with a fractional arrangement and scale up if needed. Less risk than a full-time hire.', icon: '🛡️' },
              { title: 'Cost Efficient', description: 'Get senior expertise without full-time salary, benefits, and equity costs.', icon: '💰' },
              { title: 'Specialist Matching', description: 'Fractional recruitment requires understanding both executive capability and part-time working dynamics.', icon: '🎯' },
              { title: 'Flexible Engagement', description: 'Matched on industry, stage, culture fit, and specific business challenges—not just availability.', icon: '🤝' }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-6 border border-gray-200">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Agencies */}
      {otherAgencies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Market Landscape</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Other Fractional Recruiters UK
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've compiled other reputable fractional recruitment agencies operating in the UK market for comparison.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {otherAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Section - Editorial Style */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">The Guide</span>
            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
              What Makes the Best<br />
              <span className="text-amber-600">Fractional Recruitment Agency</span>
            </h2>
            <div className="w-24 h-1 bg-amber-500"></div>
          </div>

          {/* SEO Image */}
          <figure className="mb-12 -mx-6 lg:-mx-16">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Fractional recruitment agency - executive recruiters matching businesses with part-time CFO, CTO and CMO talent"
              title="Fractional recruitment agency UK"
              className="w-full h-64 md:h-80 object-cover"
            />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
              A specialist fractional recruitment agency connects businesses with experienced part-time executives
            </figcaption>
          </figure>

          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
              The <strong className="font-semibold text-gray-900">best fractional recruitment agency</strong> specialises in connecting businesses with experienced executives who work on a part-time, ongoing basis. Unlike traditional recruitment agencies that place full-time employees, top fractional recruiters understand the unique requirements of part-time executive engagements.
            </p>

            <p>
              The <strong>best fractional recruitment agencies</strong> in the UK maintain networks of verified fractional CFOs, CTOs, CMOs, COOs, and other C-suite professionals. They understand that fractional hiring requires different assessment criteria: candidates must excel at rapid onboarding, managing multiple clients, and delivering impact in limited time.
            </p>

            <div className="bg-gray-50 p-8 my-10 border-l-4 border-amber-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Working with a specialist fractional recruitment agency typically costs 10-20% of engagement value—often less than traditional executive search fees of 25-33%."
              </p>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">What to Look for in Fractional Recruiters</h3>
            <ul className="space-y-3">
              <li><strong>Specialisation:</strong> They focus on fractional placements, not just interim or permanent roles</li>
              <li><strong>Quality over Volume:</strong> Vetted executives with proven fractional experience</li>
              <li><strong>Transparent Fees:</strong> Clear pricing without hidden costs or retainers</li>
              <li><strong>Understanding of Fractional Work:</strong> Knowledge of part-time executive dynamics</li>
              <li><strong>Guarantee:</strong> Replacement guarantee if the match doesn't work</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional vs Interim Recruitment</h3>
            <p>
              <strong>Fractional recruiters</strong> place part-time executives for ongoing engagements (typically 1-3 days/week indefinitely). <strong>Interim recruiters</strong> place full-time executives for temporary periods (3-12 months). The best fractional recruitment agency understands this distinction and builds networks accordingly.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Fractional Recruitment Agency FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'What is a fractional recruitment agency?', a: 'A fractional recruitment agency specialises in placing executives who work part-time with businesses on an ongoing basis. Unlike interim recruitment (full-time, temporary), fractional means part-time, typically 1-3 days per week.' },
              { q: 'How much do fractional recruiters charge?', a: 'Fractional recruitment agency fees typically range from 10-25% of first year engagement value. This is often lower than traditional executive search firms which charge 25-33% of annual salary for full-time placements.' },
              { q: 'How long does fractional recruitment take?', a: 'Fractional placements typically happen faster than full-time executive search—often 2-4 weeks versus 3-6 months. However, quality matching is more important than speed.' },
              { q: 'What roles do fractional recruiters fill?', a: 'Fractional recruitment agencies typically place C-suite roles (CFO, CTO, CMO, COO) and senior director positions. These are roles where strategic expertise is needed but full-time isn\'t required.' },
              { q: 'What\'s the difference between fractional and interim?', a: 'Interim recruiters place full-time executives for temporary periods (3-12 months). Fractional recruiters place part-time executives for ongoing engagements, typically 1-3 days per week on an indefinite basis.' }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full border border-amber-500/30 mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse inline-block mr-2" />
            Launching January 2025
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Join Us As<br />
            <span className="text-amber-400">We Launch</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            We're building a better fractional recruitment agency. Register your interest and be first to know when we launch.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact-form"
              className="px-10 py-5 bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              Register Interest
            </a>
            <Link
              href="/contact"
              className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/fractional-cfo-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Fractional CFO Jobs</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Fractional CTO Jobs</Link>
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Fractional CMO Jobs</Link>
              <Link href="/fractional-coo-jobs-uk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Fractional COO Jobs</Link>
              <Link href="/fractionaljobsuk" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">All Jobs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function AgencyCard({ agency }: { agency: Agency }) {
  const fee = agency.payload?.fee || 'Contact'
  const website = agency.payload?.website

  return (
    <div className="bg-white p-6 border border-gray-200 hover:border-amber-400 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{agency.name}</h3>
        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Fee: {fee}</span>
      </div>
      <p className="text-gray-600 mb-4">{agency.description}</p>
      {agency.specializations && (
        <div className="flex flex-wrap gap-2 mb-4">
          {agency.specializations.slice(0, 4).map((specialty, i) => (
            <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs font-medium">
              {specialty}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>{agency.headquarters}</span>
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-amber-600 font-medium hover:underline">
            Visit Website →
          </a>
        )}
      </div>
    </div>
  )
}
