import React from 'react'
import { Badge } from './Badge'

interface JobCardProps {
  title: string
  company: string
  location: string
  isRemote: boolean
  compensation?: string
  dayRate?: number
  currency?: string
  roleCategory?: string
  skills?: string[]
  postedDaysAgo?: number
  className?: string
  onClick?: () => void
}

export function JobCard({
  title,
  company,
  location,
  isRemote,
  compensation,
  dayRate,
  currency = '£',
  roleCategory,
  skills = [],
  postedDaysAgo,
  className = '',
  onClick,
}: JobCardProps) {
  const displayedCompensation = compensation || (dayRate ? `${currency}${dayRate}/day` : null)

  // Format posted date nicely
  const formatPostedDate = (days: number | undefined) => {
    if (days === undefined) return null
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days}d ago`
    if (days < 30) return `${Math.floor(days / 7)}w ago`
    return `${Math.floor(days / 30)}mo ago`
  }

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-purple-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${className}`}
    >
      {/* Role badge - top right corner */}
      {roleCategory && (
        <div className="absolute -top-2 -right-2">
          <Badge role={roleCategory} size="sm" className="shadow-sm">
            {roleCategory}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Company Initial Avatar */}
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
          <span className="text-xl font-bold text-purple-700">
            {company.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 font-medium">{company}</p>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
        <span className="flex items-center gap-1.5 text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </span>
        {isRemote && (
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Remote
          </span>
        )}
        {displayedCompensation && (
          <span className="flex items-center gap-1.5 font-semibold text-purple-700">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {displayedCompensation}
          </span>
        )}
      </div>

      {/* Skills Tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 5).map((skill) => (
            <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              {skill}
            </span>
          ))}
          {skills.length > 5 && (
            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
              +{skills.length - 5} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {formatPostedDate(postedDaysAgo)}
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-purple-700 group-hover:text-purple-900 transition-colors">
          View Details
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  )
}
