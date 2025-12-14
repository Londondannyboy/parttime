'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import MuxVideo only on desktop to avoid loading heavy bundle on mobile
const MuxVideo = dynamic(() => import('@mux/mux-video-react'), {
  ssr: false,
  loading: () => null
})

interface VideoHeroBackgroundProps {
  playbackId?: string
  fallbackGradient?: boolean
}

// Gradient fallback component - used on mobile and as loading state
function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      {/* Subtle animated pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="heroGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#heroGrid)" />
        </svg>
      </div>
      {/* Very subtle gradient at bottom for content area */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  )
}

export function VideoHeroBackground({
  playbackId,
  fallbackGradient = true
}: VideoHeroBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Check if desktop on mount - video only loads on desktop (1024px+)
  useEffect(() => {
    setMounted(true)
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Before mount, show gradient (prevents hydration mismatch)
  if (!mounted) {
    return fallbackGradient ? <GradientBackground /> : null
  }

  // On mobile or if no playback ID or error, show gradient fallback
  if (!isDesktop || !playbackId || hasError) {
    if (!fallbackGradient) return null
    return <GradientBackground />
  }

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Mux Video Player - only loads on desktop */}
      <MuxVideo
        playbackId={playbackId}
        autoPlay="muted"
        loop
        muted
        playsInline
        debug={false}
        disableCookies
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Loading state - gradient while video loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      )}

      {/* Very subtle gradient at bottom for content area */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  )
}
