import Link from "next/link";
import { Button } from "@/components/Button";
import { createDbQuery } from "@/lib/db";

// Revalidate homepage every hour
export const revalidate = 3600

interface HomepageSection {
  section_type: string
  section_order: number
  title: string
  subtitle: string
  content: any
}

interface RoleItem {
  icon: string
  name: string
  count: number
  description: string
}

interface BenefitItem {
  icon: string
  title: string
  description: string
}

interface HowItWorksStep {
  step: string
  title: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  quote: string
  companies: string
}

interface Agency {
  name: string
  specialty: string
}

async function getHomepageContent(): Promise<HomepageSection[]> {
  try {
    const sql = createDbQuery()
    const sections = await sql`
      SELECT section_type, section_order, title, subtitle, content
      FROM homepage_content
      WHERE site = 'fractional' AND is_active = true
      ORDER BY section_order ASC
    `
    return sections as HomepageSection[]
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return []
  }
}

async function getJobStats() {
  try {
    const sql = createDbQuery()
    const result = await sql`
      SELECT COUNT(*) as total FROM jobs WHERE is_active = true
    `
    return parseInt((result[0] as any)?.total || '0')
  } catch (error) {
    return 500 // Fallback
  }
}

export default async function Home() {
  const [sections, totalJobs] = await Promise.all([
    getHomepageContent(),
    getJobStats()
  ])

  // Extract sections by type
  const rolesSection = sections.find(s => s.section_type === 'roles')
  const benefitsSection = sections.find(s => s.section_type === 'benefits')
  const howItWorksSection = sections.find(s => s.section_type === 'how_it_works')
  const testimonialsSection = sections.find(s => s.section_type === 'testimonials')
  const agenciesSection = sections.find(s => s.section_type === 'agencies')

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="heroGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#heroGrid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center">
            <div className="inline-block mb-6">
              <span className="bg-purple-700/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-purple-500/30">
                🚀 The UK's #1 Fractional Executive Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Fractional <span className="text-purple-300">Executives</span>
              <br />& Specialized Talent
            </h1>

            <p className="max-w-2xl text-xl text-purple-100 mb-10 leading-relaxed">
              Connect with experienced fractional CFOs, CMOs, CTOs, and specialized experts.
              Build your dream team without long-term commitments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/fractional-jobs">
                <Button size="lg" variant="primary" className="bg-white text-purple-900 hover:bg-purple-50">
                  Browse {totalJobs}+ Jobs →
                </Button>
              </Link>
              <Link href="/contact/companies">
                <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/10">
                  Post a Position
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-purple-200 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Updated every 15 minutes
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified executives
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                UK-focused roles
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section - From Neon */}
      {rolesSection && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{rolesSection.title}</h2>
              <p className="text-xl text-gray-600">{rolesSection.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(rolesSection.content as RoleItem[]).map((role, i) => (
                <Link
                  key={i}
                  href={`/fractional-jobs?role=${encodeURIComponent(role.name.replace('Fractional ', '').split(' ')[0])}`}
                  className="group"
                >
                  <div className="p-6 bg-gray-50 rounded-xl hover:bg-purple-50 hover:shadow-lg transition-all duration-200 border border-transparent hover:border-purple-200">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{role.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1">
                          {role.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{role.description}</p>
                        <span className="inline-flex items-center gap-1 text-purple-700 font-semibold text-sm">
                          {role.count} jobs available
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section - From Neon */}
      {benefitsSection && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{benefitsSection.title}</h2>
              <p className="text-xl text-gray-600">{benefitsSection.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {(benefitsSection.content as BenefitItem[]).map((benefit, i) => (
                <div key={i} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-4xl mb-4 block">{benefit.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section - From Neon */}
      {howItWorksSection && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{howItWorksSection.title}</h2>
              <p className="text-xl text-gray-600">{howItWorksSection.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(howItWorksSection.content as HowItWorksStep[]).map((step, i) => (
                <div key={i} className="relative">
                  {i < (howItWorksSection.content as HowItWorksStep[]).length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-purple-200 -translate-x-1/2" />
                  )}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-700 rounded-full text-2xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - From Neon */}
      {testimonialsSection && (
        <section className="py-20 md:py-28 bg-purple-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">{testimonialsSection.title}</h2>
              <p className="text-xl text-purple-200">{testimonialsSection.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(testimonialsSection.content as Testimonial[]).map((testimonial, i) => (
                <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                  <p className="text-white text-lg mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-purple-200 text-sm">{testimonial.role}</p>
                      <p className="text-purple-300 text-xs">{testimonial.companies}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner Agencies Section - From Neon */}
      {agenciesSection && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{agenciesSection.title}</h2>
              <p className="text-xl text-gray-600">{agenciesSection.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(agenciesSection.content as Agency[]).map((agency, i) => (
                <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-700">{agency.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{agency.name}</h3>
                  <p className="text-sm text-gray-600">{agency.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to find your next executive?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Browse {totalJobs}+ verified fractional positions or post your job today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fractional-jobs">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 px-8">
                Browse All Jobs
              </Button>
            </Link>
            <Link href="/articles">
              <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/10 px-8">
                Read Career Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
