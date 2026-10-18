import { Link } from 'react-router-dom'
import { cn } from '../utils/format'

export default function Logo({ to = '/', inverted = false, compact = false, className }) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2.5', className)} aria-label="HunarSetu AI home">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-forest-700 text-cream-100 shadow-soft">
        <span className="font-display text-lg font-bold leading-none">H</span>
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-forest-700 bg-saffron-400" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className={cn('block text-base font-extrabold tracking-tight', inverted ? 'text-cream-50' : 'text-charcoal-900')}>
            HunarSetu <span className="text-saffron-500">AI</span>
          </span>
          <span className={cn('block text-[11px] font-medium', inverted ? 'text-cream-200/80' : 'text-charcoal-500')}>
            Talent to Livelihood
          </span>
        </span>
      )}
    </Link>
  )
}
