import { redirect } from 'next/navigation'

// Redirect old /articles path to new /fractional-jobs-articles path
export default function ArticlesRedirect() {
  redirect('/fractional-jobs-articles')
}
