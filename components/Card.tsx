import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export function Card({ hoverable = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200 shadow-sm p-6
        ${hoverable ? 'hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className = '', children, ...props }: CardHeaderProps) {
  return (
    <div className={`mb-4 pb-4 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  )
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className = '', children, ...props }: CardBodyProps) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  )
}
