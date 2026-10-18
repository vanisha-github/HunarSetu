import { useEffect, useState } from 'react'
import { cn } from '../utils/format'

export default function ProgressBar({
  value = 0,
  className,
  barClassName,
  height = 'h-2',
  animate = true,
  label,
}) {
  const [width, setWidth] = useState(animate ? 0 : value)

  useEffect(() => {
    if (!animate) {
      setWidth(value)
      return
    }
    const id = setTimeout(() => setWidth(value), 80)
    return () => clearTimeout(id)
  }, [value, animate])

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full overflow-hidden rounded-full bg-sage-200', height)}>
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r from-forest-600 to-forest-500 transition-all duration-700 ease-out',
            barClassName
          )}
          style={{ width: `${Math.max(0, Math.min(100, width))}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {label && <p className="mt-1 text-xs font-medium text-charcoal-500">{label}</p>}
    </div>
  )
}
