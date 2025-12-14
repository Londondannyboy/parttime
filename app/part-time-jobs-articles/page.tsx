import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createDbQuery } from '@/lib/db'
import { ArticleCard } from '@/components/ArticleCard'
import { JobsGraph3D } from '@/components/JobsGraph3D'
import { JobsCalendarHeatmap } from '@/components/JobsCalendarHeatmap'

export const revalidate = 14400 // Revalidate every 4 hours

export const metadata: Metadata = {
  title: 'Fractional Executive Articles & Guides | Fractional Quest',
  description: 'Expert guides and articles about fractional executive roles, career tips, salary guides, and hiring strategies for CFO, CTO, CMO roles.',
  openGraph: {
    title: 'Fractional Executive Articles & Guides | Fractional Quest',
    description: 'Expert guides and articles about fractional executive roles, career tips, and hiring strategies.',
    type: 'website',
  },
}

interface ArticlesPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

async function getArticleStats() {
  try {
    const sql = createDbQuery()
    const result = await sql`
      SELECT COUNT(*) as count
      FROM articles
      WHERE status = 'published' AND app = 'fractional'
    `
    return parseInt((result[0] as any)?.count || '0')
  } catch (error) {
    return 0
  }
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams
  const limit = 12
  const page = parseInt(params.page || '1')
  const offset = (page - 1) * limit

  try {
    const sql = createDbQuery()

    const [articles, totalCount] = await Promise.all([
      sql`
        SELECT
          id,
          slug,
          title,
          excerpt,
          meta_description,
          hero_asset_url,
          hero_asset_alt,
          published_at,
          word_count
        FROM articles
        WHERE status = 'published'
          AND app = 'fractional'
        ORDER BY published_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      getArticleStats()
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section with 3D Knowledge Graph Background */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <JobsGraph3D limit={30} height="100%" isHero={true} showOverlay={true} />
          </div>

          {/* Bottom-aligned content with glass panel */}
          <div className="relative z-10 w-full pb-16 md:pb-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
                  <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm tracking-wide">
                    <span className="mr-2">←</span> Back to Home
                  </Link>

                  <span className="inline-block bg-white/10 backdrop-blur text-white/90 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                    {totalCount}+ Expert Guides
                  </span>

                  <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                    Articles &<br />
                    <span className="text-white/90">Resources</span>
                  </h1>

                  <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                    Expert guides, case studies, and career tips for fractional executives. Learn how to build a successful portfolio career.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="#articles"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-all duration-200"
                    >
                      Browse Articles →
                    </Link>
                    <Link
                      href="/handler/sign-up"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                    >
                      Get Updates
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'All Guides', href: '/fractional-jobs-articles', active: true },
                { label: 'CFO Guides', href: '/fractional-jobs-articles?category=cfo' },
                { label: 'CTO Guides', href: '/fractional-jobs-articles?category=cto' },
                { label: 'CMO Guides', href: '/fractional-jobs-articles?category=cmo' },
                { label: 'Salary Guides', href: '/fractional-jobs-articles?category=salary' },
                { label: 'Career Tips', href: '/fractional-jobs-articles?category=career' },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    cat.active
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Job Posting Activity Calendar */}
        <section className="py-16 bg-gray-950">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-2 block">Market Activity</span>
              <h2 className="text-2xl md:text-3xl font-black text-white">Job Posting Trends</h2>
              <p className="text-gray-400 mt-2 text-sm">When fractional jobs are posted throughout the year</p>
            </div>
            <Suspense fallback={
              <div className="flex items-center justify-center h-48 bg-gray-900 rounded-xl">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-blue-300 text-xs">Loading calendar...</p>
                </div>
              </div>
            }>
              <JobsCalendarHeatmap height="280px" />
            </Suspense>
          </div>
        </section>

        {/* Articles Grid */}
        <section id="articles" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {articles.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl mb-6 block">📚</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No articles found yet</h2>
                <p className="text-gray-600 mb-8">We're working on creating expert guides for you.</p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-all"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {articles.map((article: any) => (
                    <Link key={article.id} href={`/${article.slug}`} className="group">
                      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full flex flex-col">
                        {article.hero_asset_url ? (
                          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                            <img
                              src={article.hero_asset_url}
                              alt={article.hero_asset_alt || article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[16/9] bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                            <span className="text-6xl">📚</span>
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-3 line-clamp-2">
                            {article.title}
                          </h2>
                          <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                            {article.excerpt || article.meta_description}
                          </p>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            {article.published_at && (
                              <time className="text-xs text-gray-500">
                                {new Date(article.published_at).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </time>
                            )}
                            {article.word_count && (
                              <span className="text-xs text-gray-500">
                                {Math.ceil(article.word_count / 200)} min read
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {page > 1 && (
                      <Link href={`/fractional-jobs-articles?page=${page - 1}`}>
                        <button className="px-5 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
                          ← Previous
                        </button>
                      </Link>
                    )}

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        const pageNum = Math.max(1, page - 2) + i
                        if (pageNum > totalPages) return null

                        return (
                          <Link key={pageNum} href={`/fractional-jobs-articles?page=${pageNum}`}>
                            <button
                              className={`w-10 h-10 rounded-lg text-sm font-medium ${
                                pageNum === page
                                  ? 'bg-gray-900 text-white'
                                  : 'border border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          </Link>
                        )
                      })}
                    </div>

                    {page < totalPages && (
                      <Link href={`/fractional-jobs-articles?page=${page + 1}`}>
                        <button className="px-5 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
                          Next →
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4 block">Topics</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Guide Topics</h2>
              <p className="text-xl text-gray-500">Explore our most-read categories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '💰', title: 'Fractional CFO Guides', desc: 'Finance leadership, fundraising, and financial strategy', link: '/fractional-cfo-jobs-uk' },
                { icon: '💻', title: 'Fractional CTO Guides', desc: 'Technology leadership, architecture, and team building', link: '/fractional-cto-jobs-uk' },
                { icon: '📢', title: 'Fractional CMO Guides', desc: 'Marketing strategy, brand building, and growth', link: '/fractional-cmo-jobs-uk' },
                { icon: '📊', title: 'Salary Guides', desc: 'Day rates, annual earnings, and market benchmarks', link: '/fractional-executive-salary-uk' },
                { icon: '🚀', title: 'Career Transition', desc: 'How to go from full-time to fractional executive', link: '/how-to-become-a-fractional-executive' },
                { icon: '🤝', title: 'Hiring Guides', desc: 'How companies hire fractional executives', link: '/top-fractional-recruitment-agencies-best-fractional-recruitment-agency-fractional-recruiter' },
              ].map((topic) => (
                <Link key={topic.title} href={topic.link} className="group">
                  <article className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                    <span className="text-4xl mb-6 block">{topic.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{topic.desc}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6 block">Stay Updated</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Get the latest guides<br />in your inbox
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join fractional executives who receive our weekly career insights and job alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/handler/sign-up"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                Join the Platform
              </Link>
              <Link
                href="/fractional-jobs"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-200"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching articles:', error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <span className="text-6xl mb-6 block">😢</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unable to Load Articles</h1>
          <p className="text-gray-600 mb-8">There was an error loading articles. Please try again later.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }
}
