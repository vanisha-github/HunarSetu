import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Fingerprint,
  Compass,
  Route,
  BadgeCheck,
  Network,
  Trophy,
  Users,
  BarChart3,
  ChevronRight,
  Home,
  RefreshCw,
} from 'lucide-react'
import Logo from './Logo'
import { RoleSwitcher, LanguageToggle } from './RoleSwitcher'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/format'

const STUDENT_NAV = [
  { to: '/app/dashboard', icon: LayoutDashboard, key: 'nav.dashboard' },
  { to: '/app/dna', icon: Fingerprint, key: 'nav.dna' },
  { to: '/app/careers', icon: Compass, key: 'nav.careers' },
  { to: '/app/learning', icon: Route, key: 'nav.learning' },
  { to: '/app/passport', icon: BadgeCheck, key: 'nav.passport' },
  { to: '/app/opportunities', icon: Network, key: 'nav.opportunities' },
  { to: '/app/talent', icon: Trophy, key: 'nav.talent' },
]

const PARTNER_NAV = [
  { to: '/app/facilitator', icon: Users, key: 'nav.facilitator' },
  { to: '/app/csr', icon: BarChart3, key: 'nav.csr' },
]

function NavItem({ item, onNavigate }) {
  const { t } = useApp()
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
          isActive
            ? 'bg-forest-50 text-forest-800 ring-1 ring-inset ring-forest-200'
            : 'text-charcoal-600 hover:bg-sage-100 hover:text-charcoal-900'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={cn('h-[18px] w-[18px]', isActive ? 'text-forest-700' : 'text-charcoal-400 group-hover:text-forest-600')} />
          <span className="flex-1">{t(item.key)}</span>
          <ChevronRight
            className={cn(
              'h-4 w-4 transition',
              isActive ? 'text-forest-600' : 'text-transparent group-hover:text-charcoal-300'
            )}
          />
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar({ onNavigate }) {
  const { t, profile, setRole, resetDemo } = useApp()

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto bg-white px-4 py-5">
      <div className="flex items-center justify-between">
        <Logo to="/app/dashboard" />
      </div>

      <nav className="flex flex-col gap-1" aria-label="Student">
        <p className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-400">
          {t('role.student')}
        </p>
        {STUDENT_NAV.map((item) => (
          <NavItem key={item.to} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <nav className="flex flex-col gap-1" aria-label="Programme">
        <p className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-400">
          {t('nav.programme') || 'Programme'}
        </p>
        {PARTNER_NAV.map((item) => (
          <NavItem key={item.to} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <RoleSwitcher />
        <LanguageToggle className="w-full justify-center" />
        <div className="flex items-center gap-3 rounded-2xl border border-sage-200 bg-cream-50 p-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-forest-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-charcoal-900">{profile.name}</p>
            <p className="truncate text-xs text-charcoal-500">
              {profile.education} · {profile.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            onClick={onNavigate}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-sage-200 px-3 py-2 text-xs font-semibold text-charcoal-600 transition hover:border-forest-400 hover:text-forest-800"
          >
            <Home className="h-3.5 w-3.5" /> {t('nav.home')}
          </NavLink>
          <button
            onClick={() => {
              setRole('student')
              resetDemo()
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-sage-200 px-3 py-2 text-xs font-semibold text-charcoal-600 transition hover:border-forest-400 hover:text-forest-800"
            title="Reset demo data"
          >
            <RefreshCw className="h-3.5 w-3.5" /> {t('common.reset') || 'Reset'}
          </button>
        </div>
      </div>
    </div>
  )
}
