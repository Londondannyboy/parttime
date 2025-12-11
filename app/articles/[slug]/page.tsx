import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'

// Revalidate every 4 hours, same as articles list
export const revalidate = 14400

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const sql = createDbQuery()
    const articles = await sql`
      SELECT title, meta_description, excerpt
      FROM articles
      WHERE slug = ${params.slug}
        AND status = 'published'
        AND app = 'fractional'
      LIMIT 1
    `

    if (articles.length === 0) {
      return { title: 'Article Not Found | Fractional.Quest' }
    }

    const article = articles[0] as any
    return {
      title: `${article.title} | Fractional.Quest`,
      description: article.meta_description || article.excerpt || 'Read this article on Fractional.Quest',
    }
  } catch {
    return { title: 'Article | Fractional.Quest' }
  }
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  try {
    const sql = createDbQuery()

    const articles = await sql`
      SELECT
        id,
        slug,
        title,
        excerpt,
        content,
        hero_asset_url,
        hero_asset_alt,
        published_at,
        word_count
      FROM articles
      WHERE slug = ${params.slug}
        AND status = 'published'
        AND app = 'fractional'
      LIMIT 1
    `

    if (articles.length === 0) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Article Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find this article.</p>
          <Link href="/articles">
            <button className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
              Back to Articles
            </button>
          </Link>
        </div>
      )
    }

    const article = articles[0] as any

    return (
      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        {article.hero_asset_url && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={article.hero_asset_url}
              alt={article.hero_asset_alt || article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {article.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-4">
              <span>
                {article.published_at
                  ? new Date(article.published_at).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Date unknown'}
              </span>
              {article.word_count && (
                <span>{article.word_count} words • {Math.ceil(article.word_count / 200)} min read</span>
              )}
            </div>
          </div>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg text-gray-700 mb-8 italic leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Article Body */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Back Link */}
          <div className="pt-8 border-t">
            <Link href="/articles">
              <button className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-semibold">
                ← Back to All Articles
              </button>
            </Link>
          </div>
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error fetching article:', error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Error Loading Article</h1>
        <p className="text-gray-600 mb-8">There was an error loading this article. Please try again later.</p>
        <Link href="/articles">
          <button className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
            Back to Articles
          </button>
        </Link>
      </div>
    )
  }
}
