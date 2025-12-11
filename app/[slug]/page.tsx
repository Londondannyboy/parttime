import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { notFound } from 'next/navigation'

// Revalidate every 4 hours for articles
export const revalidate = 14400

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
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
      WHERE slug = ${slug}
        AND status = 'published'
        AND app = 'fractional'
      LIMIT 1
    `
    return articles[0] || null
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: 'Article Not Found | Fractional.Quest' }
  }

  return {
    title: `${article.title} | Fractional.Quest`,
    description: article.meta_description || article.excerpt || 'Read this article on Fractional.Quest',
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

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
            <Link href="/fractional-jobs-articles">
              <button className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-semibold">
                ← Back to All Articles
              </button>
            </Link>
          </div>
        </div>
      </article>
    )
}
