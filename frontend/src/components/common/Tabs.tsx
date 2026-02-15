import { useState, HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  badge?: string | number
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[]
  defaultTab?: string
  activeTab?: string
  onTabChange?: (tabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
}

export default function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id)
  const activeTab = controlledActiveTab ?? internalActiveTab

  const handleTabClick = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId)
    if (tab?.disabled) return

    setInternalActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const sizes = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-base px-4 py-2.5 gap-2',
    lg: 'text-lg px-5 py-3 gap-2.5',
  }

  const variants = {
    default: {
      container: 'bg-gray-100 p-1 rounded-lg',
      tab: 'rounded-md transition-all duration-200',
      active: 'bg-white shadow-sm text-gray-900 font-semibold',
      inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
    },
    pills: {
      container: 'gap-2',
      tab: 'rounded-full border-2 transition-all duration-200',
      active: 'bg-orange-600 border-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30',
      inactive: 'border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50',
    },
    underline: {
      container: 'border-b border-gray-200 gap-6',
      tab: 'border-b-2 border-transparent pb-3 transition-all duration-200',
      active: 'border-orange-600 text-orange-600 font-semibold',
      inactive: 'text-gray-600 hover:text-gray-900 hover:border-gray-300',
    },
  }

  const config = variants[variant]

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className={cn('flex items-center', config.container)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
              className={cn(
                'inline-flex items-center font-medium',
                'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'relative',
                sizes[size],
                config.tab,
                isActive ? config.active : config.inactive
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={cn(
                    'ml-1.5 px-2 py-0.5 text-xs font-bold rounded-full',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-700'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
          >
            {activeTab === tab.id && children}
          </div>
        ))}
      </div>
    </div>
  )
}

// TabPanel component for better composition
export function TabPanel({
  value,
  activeValue,
  className,
  children,
  ...props
}: {
  value: string
  activeValue: string
} & HTMLAttributes<HTMLDivElement>) {
  if (value !== activeValue) return null

  return (
    <div
      role="tabpanel"
      className={cn('animate-fade-in', className)}
      {...props}
    >
      {children}
    </div>
  )
}
