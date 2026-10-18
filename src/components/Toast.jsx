import { CheckCircle2, Info, X, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/format'

const ICONS = { success: CheckCircle2, info: Info, warning: AlertTriangle, error: AlertTriangle }
const TONES = {
  success: 'border-forest-200 bg-white text-forest-800',
  info: 'border-sky-200 bg-white text-sky-800',
  warning: 'border-saffron-200 bg-white text-saffron-800',
  error: 'border-red-200 bg-white text-red-800',
}

export default function ToastHost() {
  const { toasts, removeToast } = useApp()
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2 no-print">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || Info
        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-card animate-scale-in',
              TONES[toast.type] || TONES.success
            )}
            role="status"
          >
            <Icon className="h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="rounded-full p-1 text-charcoal-400 transition hover:bg-sage-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
