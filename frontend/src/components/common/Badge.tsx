import { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  pill?: boolean
}

export default function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  pill = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-1.5
    font-semibold
    transition-all duration-200
  `

  const variants = {
    default: 'bg-gray-100 text-gray-700 border border-gray-200',
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
    outline: 'bg-transparent border-2 border-orange-500 text-orange-600',
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5 h-5',
    md: 'text-sm px-2.5 py-1 h-6',
    lg: 'text-base px-3 py-1.5 h-8',
  }

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  }

  const rounded = pill ? 'rounded-full' : 'rounded-md'

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        rounded,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'rounded-full bg-current animate-pulse',
            dotSizes[size]
          )}
        />
      )}
      {children}
    </span>
  )
}

// Preset badge components
export function StatusBadge({
  status,
  ...props
}: { status: 'online' | 'offline' | 'away' | 'busy' } & Omit<BadgeProps, 'variant' | 'dot'>) {
  const statusConfig = {
    online: { variant: 'success' as const, label: 'Online' },
    offline: { variant: 'default' as const, label: 'Offline' },
    away: { variant: 'warning' as const, label: 'Away' },
    busy: { variant: 'danger' as const, label: 'Busy' },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} dot {...props}>
      {config.label}
    </Badge>
  )
}

export function CountBadge({
  count,
  max = 99,
  ...props
}: { count: number; max?: number } & Omit<BadgeProps, 'children'>) {
  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <Badge variant="danger" pill size="sm" {...props}>
      {displayCount}
    </Badge>
  )
}
