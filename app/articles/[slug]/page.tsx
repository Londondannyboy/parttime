import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Redirect old /articles/[slug] path to root-level /[slug]
export default async function ArticleRedirect({ params }: PageProps) {
  const { slug } = await params
  redirect(`/${slug}`)
}
