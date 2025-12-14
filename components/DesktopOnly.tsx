'use client'

import { useEffect, useState, ReactNode } from 'react'

interface DesktopOnlyProps {
  children: ReactNode
  fallback?: ReactNode
  minWidth?: number
}

export function DesktopOnly({ children, fallback = null, minWidth = 1024 }: DesktopOnlyProps) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= minWidth)
    }

    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [minWidth])

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) return null

  return isDesktop ? <>{children}</> : <>{fallback}</>
}
