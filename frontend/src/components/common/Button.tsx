import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium 
      transition-all duration-200 
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      relative overflow-hidden
      group
    `

    const variants = {
      primary: `
        bg-gradient-to-r from-orange-500 to-orange-600
        hover:from-orange-600 hover:to-orange-700
        text-white shadow-lg shadow-orange-500/30
        hover:shadow-xl hover:shadow-orange-500/40
        focus:ring-orange-500
        before:absolute before:inset-0 
        before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-200%] hover:before:translate-x-[200%]
        before:transition-transform before:duration-700
      `,
      secondary: `
        bg-gray-100 hover:bg-gray-200
        text-gray-900 
        focus:ring-gray-500
      `,
      outline: `
        border-2 border-orange-500 
        text-orange-600 hover:bg-orange-50
        focus:ring-orange-500
      `,
      ghost: `
        text-gray-700 hover:bg-gray-100
        focus:ring-gray-500
      `,
      danger: `
        bg-gradient-to-r from-red-500 to-red-600
        hover:from-red-600 hover:to-red-700
        text-white shadow-lg shadow-red-500/30
        hover:shadow-xl hover:shadow-red-500/40
        focus:ring-red-500
      `,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
      md: 'px-5 py-2.5 text-base rounded-lg gap-2',
      lg: 'px-7 py-3.5 text-lg rounded-xl gap-2.5',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="transition-transform group-hover:scale-110">{icon}</span>
        )}
        <span className="relative">{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="transition-transform group-hover:scale-110">{icon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
