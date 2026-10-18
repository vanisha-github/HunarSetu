import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../utils/format'

export default function Modal({ open, onClose, title, children, footer, className, size = 'md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-lift animate-scale-in sm:rounded-3xl',
          sizes[size],
          className
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-sage-200 bg-white/95 px-5 py-4 backdrop-blur">
          <h3 className="text-lg font-bold text-charcoal-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-charcoal-500 transition hover:bg-sage-100 hover:text-charcoal-800"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
        {footer && (
          <div className="sticky bottom-0 border-t border-sage-200 bg-white/95 px-5 py-4 backdrop-blur">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
