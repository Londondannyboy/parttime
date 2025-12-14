import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createDbQuery } from '@/lib/db'
import { JobHeader } from '@/components/JobHeader'
import { JobBody } from '@/components/JobBody'
import { SimilarJobs } from '@/components/SimilarJobs'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { DesktopOnly } from '@/components/DesktopOnly'
import { ShareButtons } from '@/components/ShareButtons'

// Revalidate every hour for job details
export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

interface BrandColor {
  hex: string
  type: string
  brightness: number
}

interface BrandData {
  colors: BrandColor[]
  logos: Record<string, string>
  banners: Record<string, string>
  description: string | null
  styleguide?: {
    colors?: { accent?: string; background?: string; text?: string }
    components?: { button?: { primary?: any } }
  }
}

// Helper to get brand styling
function getBrandStyling(brand?: BrandData) {
  const defaultColors = {
    primary: '#1f2937',
    accent: '#a855f7',
    light: '#f9fafb',
    text: 'white',
    background: '#f9fafb'
  }

  if (!brand?.colors || brand.colors.length === 0) {
    return {
      colors: defaultColors,
      banner: null,
      logo: null,
      hasRichBranding: false,
      buttonStyle: null
    }
  }

  // Find colors by type from brand extraction
  const darkColor = brand.colors.find(c => c.type === 'dark')
    || brand.colors.reduce((darkest, c) => c.brightness < darkest.brightness ? c : darkest)
  const accentColor = brand.colors.find(c => c.type === 'accent')
  const lightColor = brand.colors.find(c => c.type === 'light')

  // Get styleguide colors if available (more accurate)
  const styleguideColors = brand.styleguide?.colors
  const styleguideAccent = styleguideColors?.accent
  const styleguideBackground = styleguideColors?.background

  // Get banner image if available
  const banner = brand.banners?.banner || brand.banners?.background || null

  // Get logo - prefer light logo for dark backgrounds
  const logo = brand.logos?.logo_light || brand.logos?.logo_dark
    || brand.logos?.symbol_light || brand.logos?.symbol_dark || null

  // Determine text color based on background brightness
  const textColor = darkColor.brightness < 128 ? 'white' : '#1f2937'

  // Get button styling from styleguide if available
  const buttonStyle = brand.styleguide?.components?.button?.primary || null

  return {
    colors: {
      primary: darkColor.hex,
      // Prefer styleguide accent (more accurate) over extracted accent
      accent: styleguideAccent || accentColor?.hex || '#a855f7',
      light: lightColor?.hex || '#f9fafb',
      text: textColor,
      background: styleguideBackground || lightColor?.hex || '#f9fafb'
    },
    banner,
    logo,
    hasRichBranding: !!banner || (brand.colors.length >= 2 && !!logo),
    buttonStyle
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT title, company_name, location
      FROM jobs
      WHERE slug = ${slug}
        AND is_active = true
      LIMIT 1
    `

    if (jobs.length === 0) {
      return { title: 'Job Not Found | Fractional Quest' }
    }

    const job = jobs[0] as any
    return {
      title: `${job.title} at ${job.company_name} | Fractional Quest`,
      description: `Fractional ${job.title} position at ${job.company_name} in ${job.location}. Browse and apply on Fractional Quest - a UK fractional executive job board.`,
    }
  } catch {
    return { title: 'Job | Fractional Quest' }
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params
  try {
    const sql = createDbQuery()

    const jobs = await sql`
      SELECT
        j.id,
        j.title,
        j.company_name,
        j.company_domain,
        j.location,
        j.is_remote,
        j.compensation,
        j.employment_type,
        j.seniority_level,
        j.role_category,
        j.description_snippet,
        j.full_description,
        j.skills_required,
        j.responsibilities,
        j.requirements,
        j.benefits,
        j.about_company,
        j.posted_date,
        j.url,
        cb.colors as brand_colors,
        cb.logos as brand_logos,
        cb.banners as brand_banners,
        cb.description as brand_description,
        cb.styleguide as brand_styleguide
      FROM jobs j
      LEFT JOIN company_brands cb ON j.company_domain = cb.domain
      WHERE j.slug = ${slug}
        AND j.is_active = true
      LIMIT 1
    `

    if (jobs.length === 0) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Job Not Found</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              This position may have been filled or is no longer available.
            </p>
            <Link href="/fractional-jobs">
              <button className="px-8 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors">
                Browse All Jobs
              </button>
            </Link>
          </div>
        </div>
      )
    }

    const job = jobs[0] as any

    // Get brand data
    const brand: BrandData | undefined = job.brand_colors ? {
      colors: job.brand_colors,
      logos: job.brand_logos || {},
      banners: job.brand_banners || {},
      description: job.brand_description,
      styleguide: job.brand_styleguide || undefined
    } : undefined

    const styling = getBrandStyling(brand)
    const { colors, banner, logo } = styling

    const formatDate = (dateString?: string) => {
      if (!dateString) return null
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Branded Hero Header */}
        <section className="relative min-h-[40vh] flex items-end overflow-hidden">
          {/* Background - Banner image or gradient */}
          {banner ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner})` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${colors.primary} 0%, ${colors.primary}DD 40%, ${colors.primary}88 70%, transparent 100%)`
                }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent}44 50%, ${colors.primary} 100%)`
              }}
            />
          )}

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full opacity-10"
              style={{ backgroundColor: colors.accent }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full pb-8 md:pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <Link
                href="/fractional-jobs"
                className="inline-flex items-center mb-6 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: colors.text, opacity: 0.7 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Jobs
              </Link>

              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                  {logo ? (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white shadow-xl p-3 flex items-center justify-center">
                      <img
                        src={logo}
                        alt={`${job.company_name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-xl flex items-center justify-center"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <span className="text-3xl md:text-4xl font-black text-white">
                        {job.company_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <h1
                    className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 leading-tight tracking-tight"
                    style={{ color: colors.text }}
                  >
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                    {job.company_domain ? (
                      <Link
                        href={`/company/${job.company_domain}`}
                        className="text-lg md:text-xl font-bold hover:opacity-80 transition-opacity"
                        style={{ color: colors.text }}
                      >
                        {job.company_name}
                      </Link>
                    ) : (
                      <span className="text-lg md:text-xl font-bold" style={{ color: colors.text }}>
                        {job.company_name}
                      </span>
                    )}
                    <span style={{ color: colors.text, opacity: 0.5 }}>•</span>
                    <span className="flex items-center gap-1 text-sm" style={{ color: colors.text, opacity: 0.8 }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                      {job.is_remote && <span className="ml-1">(Remote)</span>}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.compensation && (
                      <span
                        className="px-4 py-1.5 rounded-full text-sm font-bold"
                        style={{ backgroundColor: colors.accent, color: 'white' }}
                      >
                        {job.compensation}
                      </span>
                    )}
                    {job.role_category && (
                      <span
                        className="px-4 py-1.5 rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: `${colors.accent}CC`,
                          color: 'white'
                        }}
                      >
                        {job.role_category}
                      </span>
                    )}
                    {job.seniority_level && (
                      <span
                        className="px-4 py-1.5 rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: `${colors.accent}99`,
                          color: 'white'
                        }}
                      >
                        {job.seniority_level}
                      </span>
                    )}
                    {job.posted_date && (
                      <span
                        className="px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm"
                        style={{
                          backgroundColor: `${colors.light}33`,
                          color: colors.text,
                          border: `1px solid ${colors.light}44`
                        }}
                      >
                        Posted {formatDate(job.posted_date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Apply Bar */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-3">
                {logo && (
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 p-1 flex items-center justify-center">
                    <img src={logo} alt="" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{job.title}</span>
                  {' at '}
                  {job.company_domain ? (
                    <Link href={`/company/${job.company_domain}`} className="font-medium hover:underline" style={{ color: colors.accent }}>
                      {job.company_name}
                    </Link>
                  ) : (
                    <span className="font-medium">{job.company_name}</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold transition-opacity hover:opacity-90 rounded-lg"
                  style={{ backgroundColor: colors.accent, color: 'white' }}
                  aria-label={`Apply for ${job.title} at ${job.company_name}`}
                >
                  Apply for This Role
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <button
                  className="p-3 border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg"
                  title={`Save ${job.title} job to your favorites`}
                  aria-label={`Save ${job.title} job to your favorites`}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Two Column Layout */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Description */}
              {job.full_description && (
                <section className="mb-12">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">About This Role</h2>
                  <JobBody content={job.full_description} />
                </section>
              )}

              {/* Responsibilities */}
              {job.responsibilities && Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">Key Responsibilities</h2>
                  <ul className="space-y-4">
                    {job.responsibilities.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-7 h-7 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 leading-7 pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Requirements */}
              {job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 leading-7">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Benefits */}
              {job.benefits && Array.isArray(job.benefits) && job.benefits.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">Benefits & Perks</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {job.benefits.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100">
                        <span className="text-lg">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* About Company */}
              {job.about_company && (
                <section className="mb-12">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">
                    About{' '}
                    {job.company_domain ? (
                      <Link href={`/company/${job.company_domain}`} className="text-purple-700 hover:text-purple-900 transition-colors">
                        {job.company_name}
                      </Link>
                    ) : (
                      job.company_name
                    )}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-8">{job.about_company}</p>
                  </div>
                  {job.company_domain && (
                    <Link
                      href={`/company/${job.company_domain}`}
                      className="inline-flex items-center gap-2 mt-4 text-purple-700 hover:text-purple-900 font-medium transition-colors"
                    >
                      View all jobs at {job.company_name}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </section>
              )}
            </div>

            {/* Sidebar - Fixed Sticky */}
            <div className="lg:col-span-1 mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Company Card */}
                {job.company_domain && (
                  <div
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {logo ? (
                        <div className="w-14 h-14 rounded-lg bg-white p-2 flex items-center justify-center flex-shrink-0">
                          <img
                            src={logo}
                            alt={`${job.company_name} logo`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: colors.accent }}
                        >
                          <span className="text-2xl font-black text-white">
                            {job.company_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: colors.text }}>
                          {job.company_name}
                        </h3>
                        {brand?.description && (
                          <p className="text-sm line-clamp-2" style={{ color: colors.text, opacity: 0.8 }}>
                            {brand.description.slice(0, 80)}...
                          </p>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/company/${job.company_domain}`}
                      className="block w-full py-3 rounded-lg font-bold text-center transition-opacity hover:opacity-90"
                      style={{ backgroundColor: colors.accent, color: 'white' }}
                      aria-label={`View all jobs and information about ${job.company_name}`}
                    >
                      View {job.company_name} Company Page
                    </Link>
                  </div>
                )}

                {/* Quick Apply Card */}
                <div className="bg-gray-900 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">Ready to Apply?</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Apply for {job.title} at {job.company_name}
                  </p>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 rounded-lg font-bold text-center transition-opacity hover:opacity-90"
                    style={{ backgroundColor: colors.accent, color: 'white' }}
                    aria-label={`Apply for ${job.title} position at ${job.company_name}`}
                  >
                    Apply for This Role →
                  </a>
                </div>

                {/* Skills Card */}
                {job.skills_required && Array.isArray(job.skills_required) && job.skills_required.length > 0 && (
                  <div className="bg-gray-50 p-6 border border-gray-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                      Skills Required
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills_required.map((skill: string) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Details Card */}
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Job Details
                  </h3>
                  <dl className="space-y-3 text-sm">
                    {job.role_category && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Department</dt>
                        <dd className="font-medium text-gray-900">{job.role_category}</dd>
                      </div>
                    )}
                    {job.seniority_level && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Seniority</dt>
                        <dd className="font-medium text-gray-900">{job.seniority_level}</dd>
                      </div>
                    )}
                    {job.employment_type && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Type</dt>
                        <dd className="font-medium text-gray-900">{job.employment_type}</dd>
                      </div>
                    )}
                    {job.compensation && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Compensation</dt>
                        <dd className="font-medium text-amber-600">{job.compensation}</dd>
                      </div>
                    )}
                    {job.location && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Location</dt>
                        <dd className="font-medium text-gray-900">{job.location}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Similar Jobs */}
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Similar Jobs
                  </h3>
                  <Suspense fallback={
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  }>
                    <SimilarJobs
                      currentJobId={job.id}
                      roleCategory={job.role_category}
                      skills={job.skills_required}
                      location={job.location}
                      limit={4}
                    />
                  </Suspense>
                </div>

                {/* Skills Preview - Links to 3D graph below */}
                {job.skills_required && Array.isArray(job.skills_required) && job.skills_required.length > 2 && (
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                      Related Jobs Network
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Explore similar {job.role_category || 'fractional'} roles in 3D
                    </p>
                    <a
                      href="#jobs-graph"
                      className="block w-full py-2 rounded text-center text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                    >
                      View 3D Network ↓
                    </a>
                  </div>
                )}

                {/* Share Card */}
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Share This Job
                  </h3>
                  <ShareButtons
                    title={job.title}
                    company={job.company_name}
                    slug={slug}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3D Jobs Knowledge Graph - Desktop Only */}
          <DesktopOnly>
            <section id="jobs-graph" className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 bg-gray-950">
              <div className="mb-8 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-2">Interactive Network</span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {job.role_category ? `${job.role_category} Jobs Network` : 'Related Jobs Network'}
                </h2>
                <p className="text-gray-400 mt-2">
                  Explore similar roles, skills, and companies in 3D
                </p>
              </div>
              <JobsGraph3D
                roleFilter={job.role_category || ''}
                limit={25}
                height="500px"
              />
            </section>
          </DesktopOnly>

          {/* Bottom CTA */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div
              className="p-8 md:p-12 rounded-xl"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: colors.text }}>
                  Ready to apply for {job.title}?
                </h3>
                <p className="mb-8" style={{ color: colors.text, opacity: 0.8 }}>
                  Join {job.company_name} and take the next step in your fractional executive career.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 font-bold transition-opacity hover:opacity-90 rounded-lg"
                    style={{ backgroundColor: colors.accent, color: 'white' }}
                    aria-label={`Apply for ${job.title} at ${job.company_name}`}
                  >
                    Apply for {job.title}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <Link
                    href="/fractional-jobs"
                    className="px-8 py-4 border-2 font-bold transition-colors rounded-lg"
                    style={{
                      borderColor: colors.text,
                      color: colors.text
                    }}
                    aria-label="Browse all fractional jobs on Fractional Quest"
                  >
                    ← Browse All Fractional Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching job:', error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Error Loading Job</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            There was an error loading this job. Please try again later.
          </p>
          <Link href="/fractional-jobs">
            <button className="px-8 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors">
              Browse All Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
