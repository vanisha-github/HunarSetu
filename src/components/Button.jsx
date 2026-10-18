import { Link } from 'react-router-dom'
import { cn } from '../utils/format'

const VARIANTS = {
  primary:
    'bg-forest-700 text-white hover:bg-forest-800 active:bg-forest-900 shadow-soft',
  secondary:
    'bg-white text-forest-800 border border-sage-300 hover:border-forest-500 hover:bg-forest-50',
  saffron: 'bg-saffron-500 text-white hover:bg-saffron-600 shadow-soft',
  ghost: 'text-charcoal-700 hover:bg-sage-100',
  danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
  success: 'bg-forest-600 text-white hover:bg-forest-700',
}

const SIZES = {
  sm: 'px-3.5 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3.5 text-base gap-2.5',
}

export default function Button({
  as,
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon: Icon,
  iconRight: IconRight,
  ...rest
}) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500/40 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]',
    VARIANTS[variant],
    SIZES[size],
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
        {IconRight && <IconRight className="h-4 w-4" />}
      </Link>
    )
  }

  const Comp = as || 'button'
  return (
    <Comp className={classes} {...rest}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
      {IconRight && <IconRight className="h-4 w-4" />}
    </Comp>
  )
}
