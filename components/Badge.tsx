import React from 'react'

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'gray' | 'cfo' | 'cmo' | 'cto' | 'coo' | 'hr' | 'sales'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  role?: string
}

export function Badge({ variant = 'primary', size = 'md', role, className = '', children, ...props }: BadgeProps) {
  // Auto-detect role if not explicitly set
  const effectiveVariant = role ? getRoleVariant(role) : variant

  const variantStyles = {
    primary: 'bg-gray-200 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
    cfo: 'bg-gray-200 text-gray-800', // CFO
    cmo: 'bg-gray-200 text-gray-800', // CMO
    cto: 'bg-gray-200 text-gray-800', // CTO
    coo: 'bg-gray-200 text-gray-800', // COO
    hr: 'bg-gray-200 text-gray-800', // HR
    sales: 'bg-gray-200 text-gray-800', // Sales
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs font-medium rounded',
    md: 'px-3 py-1.5 text-sm font-medium rounded-md',
    lg: 'px-4 py-2 text-base font-medium rounded-lg',
  }

  return (
    <span
      className={`inline-flex items-center ${variantStyles[effectiveVariant as keyof typeof variantStyles]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

function getRoleVariant(role: string): BadgeVariant {
  const lowerRole = role.toLowerCase().trim()
  const roleMap: Record<string, BadgeVariant> = {
    'cfo': 'cfo',
    'chief financial officer': 'cfo',
    'cmo': 'cmo',
    'chief marketing officer': 'cmo',
    'cto': 'cto',
    'chief technology officer': 'cto',
    'coo': 'coo',
    'chief operations officer': 'coo',
    'hr': 'hr',
    'human resources': 'hr',
    'sales': 'sales',
  }
  return roleMap[lowerRole] || 'gray'
}
