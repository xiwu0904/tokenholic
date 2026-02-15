import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
  variant?: 'default' | 'filled' | 'bordered'
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      hint,
      options,
      placeholder,
      variant = 'default',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      w-full px-4 py-2.5 
      text-gray-900 
      transition-all duration-200
      focus:outline-none 
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:bg-gray-50
      appearance-none
      bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSA3LjVMMTAgMTIuNUwxNSA3LjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')]
      bg-[position:right_0.75rem_center]
      bg-no-repeat
      pr-10
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

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
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

Select.displayName = 'Select'

export default Select
