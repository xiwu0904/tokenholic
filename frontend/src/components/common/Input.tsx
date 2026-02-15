import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'bordered'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      variant = 'default',
      disabled,
      ...props
    },
    ref
  ) => {

    const baseStyles = `
      w-full px-4 py-2.5 
      text-gray-900 placeholder-gray-400
      transition-all duration-200
      focus:outline-none 
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:bg-gray-50
    `

    const variants = {
      default: `
        border-2 border-gray-200 rounded-lg
        focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
      `,
      filled: `
        bg-gray-100 border-2 border-transparent rounded-lg
        focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
        ${error ? 'bg-red-50 border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
      `,
      bordered: `
        border-2 border-gray-900 rounded-lg
        shadow-[2px_2px_0_0_rgba(0,0,0,1)]
        focus:shadow-[3px_3px_0_0_rgba(255,106,0,1)]
        focus:border-orange-500
        ${error ? 'border-red-500 shadow-[2px_2px_0_0_rgba(239,68,68,1)]' : ''}
      `,
    }

    const iconPadding = leftIcon ? 'pl-11' : rightIcon ? 'pr-11' : ''

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(baseStyles, variants[variant], iconPadding, className)}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || hint) && (
          <p
            className={cn(
              'mt-1.5 text-sm transition-colors',
              error ? 'text-red-600 font-medium' : 'text-gray-500'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
