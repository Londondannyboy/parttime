'use client'

import { useState } from 'react'

interface CompanyLogoProps {
  companyDomain?: string
  companyName: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-14 h-14',
  md: 'w-20 h-20',
  lg: 'w-28 h-28',
}

const iconSizeClasses = {
  sm: 'w-7 h-7',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
}

export function CompanyLogo({
  companyDomain,
  companyName,
  size = 'sm',
  className = '',
}: CompanyLogoProps) {
  const [imageError, setImageError] = useState(false)
  const brandfetchClientId = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID

  // Brandfetch CDN format: https://cdn.brandfetch.io/{domain}?c={client_id}
  const showFallback = !companyDomain || imageError || !brandfetchClientId
  const logoUrl = companyDomain && brandfetchClientId
    ? `https://cdn.brandfetch.io/${companyDomain}?c=${brandfetchClientId}`
    : null

  return (
    <div className={`flex-shrink-0 ${sizeClasses[size]} rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm ${className}`}>
      {logoUrl && !showFallback && (
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className="w-full h-full object-contain p-2"
          onError={() => setImageError(true)}
        />
      )}
      {showFallback && (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          {/* Building/Company icon as fallback */}
          <svg
            className={`${iconSizeClasses[size]} text-purple-600`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

// Larger version for company pages with different styling
export function CompanyLogoLarge({
  companyDomain,
  companyName,
}: {
  companyDomain?: string
  companyName: string
}) {
  const [imageError, setImageError] = useState(false)
  const brandfetchClientId = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID

  // Brandfetch CDN format: https://cdn.brandfetch.io/{domain}?c={client_id}
  const showFallback = !companyDomain || imageError || !brandfetchClientId
  const logoUrl = companyDomain && brandfetchClientId
    ? `https://cdn.brandfetch.io/${companyDomain}?c=${brandfetchClientId}`
    : null

  return (
    <div className="flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden bg-white border-4 border-white/20 shadow-xl">
      {logoUrl && !showFallback && (
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className="w-full h-full object-contain p-3"
          onError={() => setImageError(true)}
        />
      )}
      {showFallback && (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          {/* Building/Company icon as fallback */}
          <svg
            className="w-14 h-14 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
