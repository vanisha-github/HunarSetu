import { Search } from 'lucide-react'
import { cn } from '../utils/format'

export function SearchInput({ value, onChange, placeholder = 'Search…', className }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-10"
        aria-label={placeholder}
      />
    </div>
  )
}

export function FilterChips({ options, value, onChange, className, label }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} role="group" aria-label={label || 'Filter'}>
      {options.map((option) => {
        const isActive = value === option
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={cn('chip', isActive && 'chip-active')}
            aria-pressed={isActive}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default SearchInput
