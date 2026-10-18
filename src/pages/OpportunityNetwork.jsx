import { useMemo, useState } from 'react'
import {
  Network,
  Bookmark,
  BookmarkCheck,
  MapPin,
  CalendarDays,
  GraduationCap,
  Gift,
  Info,
  ArrowRight,
  Check,
  Building2,
  Sparkles,
  BookmarkX,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { EmptyState } from '../components/StatCard.jsx'
import { SearchInput, FilterChips } from '../components/SearchFilter.jsx'
import { useApp } from '../context/AppContext.jsx'
import { opportunities, opportunityCategories, APPLICATION_STATUSES } from '../data/opportunities.js'
import { cn } from '../utils/format.js'

const CATEGORY_ICON_TINT = {
  Scholarship: 'bg-saffron-50 text-saffron-700',
  'Vocational Training': 'bg-forest-50 text-forest-700',
  Competition: 'bg-sky-50 text-sky-700',
  Mentorship: 'bg-sage-100 text-sage-700',
  Apprenticeship: 'bg-saffron-50 text-saffron-700',
  Internship: 'bg-forest-50 text-forest-700',
  'Entrepreneurship Support': 'bg-sky-50 text-sky-700',
}

export default function OpportunityNetwork() {
  const { t, bookmarks, toggleBookmark, oppStatus, setOpportunityStatus, addToast } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [onlySaved, setOnlySaved] = useState(false)
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return opportunities.filter((o) => {
      const matchCat = category === 'All' || o.category === category
      const matchSaved = !onlySaved || bookmarks.includes(o.id)
      const matchQuery =
        !q || o.title.toLowerCase().includes(q) || o.provider.toLowerCase().includes(q) || o.description.toLowerCase().includes(q)
      return matchCat && matchSaved && matchQuery
    })
  }, [query, category, onlySaved, bookmarks])

  const setStatus = (id, status) => {
    setOpportunityStatus(id, status)
    addToast(`Status updated to “${status}”`)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Connect"
        title={t('opps.title')}
        subtitle={t('opps.subtitle')}
        actions={
          <Badge tone="warning" icon={Info}>{t('common.demoData')}</Badge>
        }
      />

      <Card className="mb-6 border-saffron-200 bg-saffron-50 p-4">
        <p className="flex items-start gap-2 text-xs text-saffron-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          {t('opps.demoNotice')} These are illustrative entries to demonstrate how the network could work.
        </p>
      </Card>

      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <SearchInput value={query} onChange={setQuery} placeholder="Search opportunities, providers…" className="lg:max-w-sm" />
            <button
              onClick={() => setOnlySaved((v) => !v)}
              className={cn('chip', onlySaved && 'chip-active', 'lg:ml-auto')}
              aria-pressed={onlySaved}
            >
              {onlySaved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
              Saved only ({bookmarks.length})
            </button>
          </div>
          <FilterChips options={opportunityCategories} value={category} onChange={setCategory} label={t('common.filter')} />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookmarkX}
          title={t('common.noResults')}
          description="Try a different search, category or clear the saved filter."
          action={
            <Button variant="secondary" onClick={() => { setQuery(''); setCategory('All'); setOnlySaved(false) }}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((o) => {
            const saved = bookmarks.includes(o.id)
            const status = oppStatus[o.id] || 'None'
            return (
              <Card key={o.id} hover className="flex flex-col overflow-hidden p-0">
                {o.image ? (
                  <SmartImage src={o.image} alt={o.title} seed={o.id} className="aspect-[16/9] w-full" />
                ) : (
                  <div className={cn('flex aspect-[16/9] w-full items-center justify-center', CATEGORY_ICON_TINT[o.category] || 'bg-sage-100 text-sage-700')}>
                    <Gift className="h-10 w-10 opacity-70" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <Badge tone="accent">{o.category}</Badge>
                    <button
                      onClick={() => toggleBookmark(o.id)}
                      className={cn(
                        'rounded-full p-1.5 transition',
                        saved ? 'bg-forest-50 text-forest-700' : 'text-charcoal-400 hover:bg-sage-100 hover:text-forest-700'
                      )}
                      aria-label={saved ? 'Remove bookmark' : 'Bookmark'}
                    >
                      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </div>
                  <h3 className="mt-2 text-base font-bold leading-snug text-charcoal-900">{o.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-charcoal-500">{o.provider}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-charcoal-600">{o.description}</p>

                  <div className="mt-3 space-y-1.5 text-xs text-charcoal-600">
                    <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-forest-600" /> {o.location}</p>
                    <p className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-forest-600" /> {o.eligibility}</p>
                    {o.deadline && <p className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-forest-600" /> {o.deadline}</p>}
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-5">
                    <Button size="sm" className="flex-1" iconRight={ArrowRight} onClick={() => setActive(o)}>
                      {t('common.viewDetails')}
                    </Button>
                    <Badge tone={status === 'Applied' ? 'success' : status === 'Interested' ? 'warning' : 'neutral'}>{status}</Badge>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.title || ''}
        size="lg"
        footer={
          active && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" icon={savedBookmark(bookmarks, active.id) ? BookmarkCheck : Bookmark} onClick={() => toggleBookmark(active.id)}>
                  {savedBookmark(bookmarks, active.id) ? t('opps.bookmarked') : t('opps.bookmark')}
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-charcoal-500">{t('opps.status')}:</span>
                {APPLICATION_STATUSES.filter((s) => s !== 'None').map((s) => {
                  const current = (oppStatus[active.id] || 'None') === s
                  return (
                    <button
                      key={s}
                      onClick={() => setStatus(active.id, s)}
                      className={cn('chip', current && 'chip-active')}
                      aria-pressed={current}
                    >
                      {current && <Check className="h-3.5 w-3.5" />} {s}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        }
      >
        {active && (
          <div className="space-y-5">
            {active.image && (
              <SmartImage src={active.image} alt={active.title} seed={active.id} className="aspect-[16/7] w-full rounded-2xl" />
            )}
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{active.category}</Badge>
              <Badge tone="warning" icon={Info}>{t('common.demoData')}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-charcoal-700">{active.description}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Building2, label: t('opps.provider'), value: active.provider },
                { icon: MapPin, label: t('opps.location'), value: active.location },
                { icon: GraduationCap, label: t('opps.eligibility'), value: active.eligibility },
                { icon: Gift, label: t('opps.benefits'), value: active.benefits },
                ...(active.deadline ? [{ icon: CalendarDays, label: t('opps.deadline'), value: active.deadline }] : []),
              ].map((row) => {
                const Icon = row.icon
                return (
                  <div key={row.label} className="rounded-xl border border-sage-200 bg-cream-50 p-3.5">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-charcoal-500">
                      <Icon className="h-3.5 w-3.5" /> {row.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-charcoal-800">{row.value}</p>
                  </div>
                )
              })}
            </div>

            <div className="rounded-xl border border-forest-200 bg-forest-50 p-4">
              <p className="flex items-center gap-1.5 text-sm font-bold text-forest-900">
                <Sparkles className="h-4 w-4" /> {t('opps.apply')}
              </p>
              <p className="mt-1.5 text-sm text-forest-900/90">{active.instructions}</p>
            </div>

            <p className="flex items-start gap-2 text-xs text-charcoal-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              In this prototype, statuses like Saved, Interested and Applied are recorded only inside this
              application. No application is submitted to any real organisation.
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

function savedBookmark(bookmarks, id) {
  return bookmarks.includes(id)
}
