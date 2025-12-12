'use client'

import React from 'react'
import Link from 'next/link'

interface JobBodyProps {
  content: string
  className?: string
}

/**
 * Parse markdown links [text](url) and return React elements
 * Only handles internal links (starting with /)
 */
function parseMarkdownLinks(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const [, linkText, url] = match

    // Use Next.js Link for internal links, regular anchor for external
    if (url.startsWith('/')) {
      parts.push(
        <Link
          key={match.index}
          href={url}
          className="text-purple-700 hover:text-purple-900 underline underline-offset-2"
        >
          {linkText}
        </Link>
      )
    } else {
      parts.push(
        <a
          key={match.index}
          href={url}
          className="text-purple-700 hover:text-purple-900 underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </a>
      )
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining text after last link
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

/**
 * JobBody - Renders AI-written job descriptions with optimal readability
 *
 * Based on readability best practices:
 * - 2-3 sentences per paragraph max
 * - Clear visual spacing between paragraphs
 * - Sentences under 17 words for 75%+ comprehension
 * - Supports markdown links for SEO internal linking
 */
export function JobBody({ content, className = '' }: JobBodyProps) {
  if (!content) return null

  // First, handle explicit paragraph breaks
  const explicitParagraphs = content
    .split(/\n\n+/)
    .map(p => p.replace(/\n/g, ' ').trim())
    .filter(p => p.length > 0)

  // Then split long paragraphs into 2-3 sentence chunks for readability
  const readableParagraphs: string[] = []

  for (const para of explicitParagraphs) {
    // Split on sentence endings followed by space and capital letter
    const sentences = para
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .filter(s => s.trim().length > 0)

    // Group into chunks of 2 sentences for readability
    for (let i = 0; i < sentences.length; i += 2) {
      const chunk = sentences.slice(i, i + 2).join(' ')
      if (chunk.trim()) {
        readableParagraphs.push(chunk.trim())
      }
    }
  }

  // If we couldn't parse sentences, just show the content
  if (readableParagraphs.length === 0) {
    readableParagraphs.push(content)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {readableParagraphs.map((para, idx) => (
        <p
          key={idx}
          className="text-lg text-gray-700 leading-8"
        >
          {parseMarkdownLinks(para)}
        </p>
      ))}
    </div>
  )
}
