import { HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className,
  ...props
}: SkeletonProps) {
  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-wave bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
    none: '',
  }

  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  }

  const style = {
    width: width ?? (variant === 'circular' ? height : '100%'),
    height: height ?? (variant === 'text' ? '1em' : '100%'),
  }

  return (
    <div
      className={cn(
        'bg-gray-200',
        animations[animation],
        variants[variant],
        className
      )}
      style={style}
      {...props}
    />
  )
}

// Preset skeleton components
export function SkeletonCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border border-gray-200 rounded-xl p-6 space-y-4', className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={16} />
        </div>
      </div>
      <Skeleton variant="rectangular" height={120} />
      <div className="space-y-2">
        <Skeleton width="100%" />
        <Skeleton width="90%" />
        <Skeleton width="80%" />
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, ...props }: { lines?: number } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="space-y-2" {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 48, ...props }: { size?: number } & HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      {...props}
    />
  )
}
