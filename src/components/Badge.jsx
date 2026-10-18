import { cn } from '../utils/format'

const TONES = {
  neutral: 'bg-sage-100 text-charcoal-700 border-sage-200',
  success: 'bg-forest-50 text-forest-700 border-forest-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
  warning: 'bg-saffron-50 text-saffron-700 border-saffron-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  accent: 'bg-saffron-100 text-saffron-800 border-saffron-200',
}

export default function Badge({ tone = 'neutral', icon: Icon, children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
        TONES[tone] || TONES.neutral,
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}
