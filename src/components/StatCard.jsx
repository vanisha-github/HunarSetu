import { cn } from '../utils/format'

export function StatCard({ icon: Icon, label, value, hint, tone = 'forest', className }) {
  const tones = {
    forest: 'bg-forest-50 text-forest-700',
    saffron: 'bg-saffron-50 text-saffron-700',
    sage: 'bg-sage-100 text-sage-700',
    sky: 'bg-sky-50 text-sky-700',
  }
  return (
    <div className={cn('card p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-charcoal-500">{label}</p>
          <p className="mt-1.5 font-display text-3xl font-semibold text-charcoal-900">{value}</p>
          {hint && <p className="mt-1 text-xs text-charcoal-500">{hint}</p>}
        </div>
        {Icon && (
          <span className={cn('grid h-11 w-11 place-items-center rounded-xl', tones[tone])}>
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
    </div>
  )
}

export function SectionHeading({ icon: Icon, title, action, className }) {
  return (
    <div className={cn('mb-4 flex items-center justify-between gap-3', className)}>
      <h2 className="flex items-center gap-2 text-lg font-bold text-charcoal-900">
        {Icon && <Icon className="h-5 w-5 text-forest-600" />}
        {title}
      </h2>
      {action}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sage-300 bg-sage-50/60 px-6 py-14 text-center">
      {Icon && (
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white text-forest-600 shadow-soft">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <h3 className="text-base font-bold text-charcoal-800">{title}</h3>
      {description && <p className="mt-1.5 max-w-md text-sm text-charcoal-600">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default StatCard
