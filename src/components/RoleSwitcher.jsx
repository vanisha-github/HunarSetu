import { useNavigate } from 'react-router-dom'
import { GraduationCap, Users, Building2, Languages } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/format'

const ROLES = [
  { id: 'student', icon: GraduationCap, labelKey: 'role.student', path: '/app/dashboard' },
  { id: 'facilitator', icon: Users, labelKey: 'role.facilitator', path: '/app/facilitator' },
  { id: 'csr', icon: Building2, labelKey: 'role.csr', path: '/app/csr' },
]

export function RoleSwitcher({ compact = false }) {
  const { role, setRole, t } = useApp()
  const navigate = useNavigate()

  const change = (r) => {
    setRole(r.id)
    navigate(r.path)
  }

  return (
    <div className={cn('no-print', compact ? '' : 'rounded-2xl border border-sage-200 bg-sage-50/70 p-2.5')}>
      {!compact && (
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-500">
          {t('role.title')}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        {ROLES.map((r) => {
          const Icon = r.icon
          const active = role === r.id
          return (
            <button
              key={r.id}
              onClick={() => change(r)}
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition',
                active
                  ? 'bg-forest-700 text-white shadow-soft'
                  : 'text-charcoal-600 hover:bg-white hover:text-forest-800'
              )}
              aria-pressed={active}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{t(r.labelKey)}</span>
              {active && <span className="h-1.5 w-1.5 rounded-full bg-saffron-400" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function LanguageToggle({ className }) {
  const { language, toggleLanguage, t } = useApp()
  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border border-sage-200 bg-white px-3 py-2 text-sm font-semibold text-charcoal-700 transition hover:border-forest-400 hover:text-forest-800',
        className
      )}
      aria-label={`${t('lang.label')}: ${language === 'en' ? 'English' : 'हिन्दी'}`}
    >
      <Languages className="h-4 w-4 text-forest-600" />
      <span className={cn(language === 'en' ? 'text-forest-700' : 'text-charcoal-400')}>EN</span>
      <span className="text-charcoal-300">/</span>
      <span className={cn(language === 'hi' ? 'text-forest-700' : 'text-charcoal-400')}>हि</span>
    </button>
  )
}

export default RoleSwitcher
