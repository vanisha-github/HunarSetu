import { cn } from '../utils/format'

export default function Card({ as: Comp = 'div', className, children, hover = false, ...rest }) {
  return (
    <Comp
      className={cn(
        'card p-5',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-sage-300',
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}
