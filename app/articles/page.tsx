import { Metadata } from 'next'
import Link from 'next/link'
import { dbQuery } from '@/lib/db'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'

export const revalidate = 14400 // Revalidate every 4 hours

export const metadata: Metadata = {
  title: 'Resources & Articles | Fractional.Quest',
  description: 'Expert guides and articles about fractional executive roles, career tips, and hiring strategies.',
  openGraph: {
    title: 'Resources & Articles | Fractional.Quest',
    description: 'Expert guides and articles about fractional executive roles, career tips, and hiring strategies.',
    type: 'website',
  },
}

interface ArticlesPageProps {
  searchParams: {
    page?: string
  }
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const limit = 12
  const page = parseInt(searchParams.page || '1')
  const offset = (page - 1) * limit

  try {
    // Fetch articles from database
    const articles = await dbQuery<any>(
      `
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
      `
    )

    // Get total count for pagination
    const countResult = await dbQuery<any>(
      `
      SELECT COUNT(*) as count
      FROM articles
      WHERE status = 'published'
        AND app = 'fractional'
      `
    )

    const total = (countResult[0] as any)?.count || 0
    const totalPages = Math.ceil(total / limit)

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-50 to-purple-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Articles & Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert guides, case studies, and tips for fractional executives and companies
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No articles found yet.</p>
                <Link href="/">
                  <button className="mt-4 px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
                    Back to Home
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {articles.map((article: any) => (
                    <Link key={article.id} href={`/articles/${article.slug}`}>
                      <Card hoverable className="h-full flex flex-col">
                        {article.hero_asset_url && (
                          <img
                            src={article.hero_asset_url}
                            alt={article.hero_asset_alt || article.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}

                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                            {article.title}
                          </h2>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {article.excerpt || article.meta_description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>
                            {article.published_at
                              ? new Date(article.published_at).toLocaleDateString('en-GB', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : ''}
                          </span>
                          {article.word_count && <span>{article.word_count} words</span>}
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {page > 1 && (
                      <Link href={`/articles?page=${page - 1}`}>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                          ← Previous
                        </button>
                      </Link>
                    )}

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        const pageNum = Math.max(1, page - 2) + i
                        if (pageNum > totalPages) return null

                        return (
                          <Link key={pageNum} href={`/articles?page=${pageNum}`}>
                            <button
                              className={`px-3 py-2 rounded-lg ${
                                pageNum === page
                                  ? 'bg-purple-700 text-white'
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
                      <Link href={`/articles?page=${page + 1}`}>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
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
      </div>
    )
  } catch (error) {
    console.error('Error fetching articles:', error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Articles</h1>
          <p className="text-gray-600 mb-6">There was an error loading articles. Please try again later.</p>
          <Link href="/">
            <button className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
