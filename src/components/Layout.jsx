import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronLeft } from 'lucide-react'
import Sidebar from './Sidebar'
import { LanguageToggle } from './RoleSwitcher'
import Logo from './Logo'
import { useApp } from '../context/AppContext'
import { cn } from '../utils/format'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { role, t } = useApp()
  const location = useLocation()
  const navigate = useNavigate()

  const roleLabel = role === 'facilitator' ? t('role.facilitator') : role === 'csr' ? t('role.csr') : t('role.student')

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-sage-200 lg:block no-print">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden no-print',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!open}
      >
        <div
          className={cn('absolute inset-0 bg-charcoal-950/50 transition-opacity', open ? 'opacity-100' : 'opacity-0')}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-[86%] max-w-xs bg-white shadow-lift transition-transform duration-300',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute right-3 top-4 z-10 rounded-full p-2 text-charcoal-500 hover:bg-sage-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      {/* Main column */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-sage-200 bg-cream-100/85 backdrop-blur-md no-print">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-sage-200 bg-white p-2 text-charcoal-700 lg:hidden"
              aria-label={t('nav.menu')}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="lg:hidden">
              <Logo to="/app/dashboard" compact />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-sage-200 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-600 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                {roleLabel}
              </span>
              <LanguageToggle />
              <button
                onClick={() => navigate(-1)}
                className="hidden rounded-xl border border-sage-200 bg-white p-2 text-charcoal-600 transition hover:border-forest-400 hover:text-forest-800 sm:inline-flex"
                aria-label="Go back"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main key={location.pathname} className="container-x animate-fade-in py-6 sm:py-8">
          <Outlet />
        </main>

        <footer className="border-t border-sage-200 px-4 py-6 text-center text-xs text-charcoal-500 sm:px-6 no-print">
          {t('landing.footerNote')}
        </footer>
      </div>
    </div>
  )
}
