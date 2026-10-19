'use client'

import { cn } from '@/lib/utils'

interface MetricBarProps {
  label: string
  before: number
  after: number
  unit?: string
  trend: 'improvement' | 'regression' | 'neutral'
  showBar?: boolean
  showTrendIcon?: boolean
}

const trendIcons = {
  improvement: '↑',
  regression: '↓',
  neutral: '→',
}

const trendLabels = {
  improvement: 'improved',
  regression: 'regressed',
  neutral: 'unchanged',
}

const trendClasses = {
  improvement: 'bg-success-bg text-success',
  regression: 'bg-error-bg text-error',
  neutral: 'bg-warning-bg text-warning',
}

export function MetricBar({
  label,
  before,
  after,
  unit = '',
  trend,
  showBar = true,
  showTrendIcon = true,
}: MetricBarProps) {
  const pct = before === 0 ? 100 : Math.round(Math.abs(((before - after) / before) * 100))
  const fillWidth = Math.min(100, Math.max(0, trend === 'neutral' ? 50 : pct))

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
      {/* Label — full width on mobile */}
      <span className="text-text-muted text-xs sm:w-32 sm:truncate flex-shrink-0">{label}</span>

      {/* Bar + value row */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showBar && (
          <div className="metric-bar-mini flex-1 min-w-[40px] max-w-[200px]">
            <div
              className={cn(
                'metric-bar-fill h-full rounded-full',
                trend === 'improvement' && 'bg-success',
                trend === 'regression' && 'bg-error',
                trend === 'neutral' && 'bg-warning'
              )}
              style={{ width: `${fillWidth}%` }}
              role="img"
              aria-label={`${label}: from ${before}${unit} to ${after}${unit}, ${trendLabels[trend]} by ${pct}%`}
            />
          </div>
        )}

        <span className="metric-value whitespace-nowrap text-xs sm:text-sm">
          {before}{unit} → {after}{unit}
        </span>

        {showTrendIcon && (
          <span
            className={cn(
              'hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[0.625rem] font-medium whitespace-nowrap',
              trendClasses[trend]
            )}
            aria-label={trendLabels[trend]}
          >
            {trendIcons[trend]} {trendLabels[trend]}
          </span>
        )}
      </div>
    </div>
  )
}
