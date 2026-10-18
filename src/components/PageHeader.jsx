import { cn } from '../utils/format'

export default function PageHeader({ eyebrow, title, subtitle, actions, className, children }) {
  return (
    <div className={cn('mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-forest-600">{eyebrow}</p>
        )}
        <h1 className="font-display text-2xl font-semibold text-charcoal-900 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{subtitle}</p>}
        {children}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 no-print">{actions}</div>}
    </div>
  )
}
