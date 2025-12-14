import { redirect } from 'next/navigation'

// Redirect /articles to the SEO-optimized /part-time-jobs-articles
export default function ArticlesRedirect() {
  redirect('/part-time-jobs-articles')
}
