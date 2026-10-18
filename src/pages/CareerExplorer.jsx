import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, Heart, ArrowRight, Wrench, Lightbulb, SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { EmptyState } from '../components/StatCard.jsx'
import { SearchInput, FilterChips } from '../components/SearchFilter.jsx'
import { useApp } from '../context/AppContext.jsx'
import { careers, careerCategories } from '../data/careers.js'
import { cn } from '../utils/format.js'

export default function CareerExplorer() {
  const { t, savedCareers, toggleSaveCareer } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return careers.filter((c) => {
      const matchCat = category === 'All' || c.category === category
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.beginnerSkills.join(' ').toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [query, category])

  return (
    <div>
      <PageHeader
        eyebrow="Explore"
        title={t('careers.title')}
        subtitle={t('careers.subtitle')}
        actions={
          <Badge tone="neutral">
            <Compass className="h-3.5 w-3.5" /> {careers.length} pathways · demo
          </Badge>
        }
      />

      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search careers, skills or projects…"
              className="sm:max-w-sm"
            />
            <p className="flex items-center gap-1.5 text-xs font-medium text-charcoal-500 sm:ml-auto">
              <SlidersHorizontal className="h-3.5 w-3.5" /> {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </p>
          </div>
          <FilterChips options={careerCategories} value={category} onChange={setCategory} label={t('common.filter')} />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Compass}
          title={t('common.noResults')}
          description="Try a different search term or choose another category."
          action={
            <Button variant="secondary" onClick={() => { setQuery(''); setCategory('All') }}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((career) => {
            const saved = savedCareers.includes(career.id)
            return (
              <Card key={career.id} hover className="flex flex-col overflow-hidden p-0">
                <Link to={`/app/careers/${career.id}`} className="relative block">
                  <SmartImage
                    src={career.image}
                    alt={career.title}
                    seed={career.id}
                    className="aspect-[16/10] w-full"
                    imgClassName="transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute left-3 top-3">
                    <Badge tone="accent">{career.category}</Badge>
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <Link to={`/app/careers/${career.id}`}>
                    <h3 className="text-base font-bold leading-snug text-charcoal-900 hover:text-forest-800">
                      {career.title}
                    </h3>
                  </Link>
                  <p className="mt-1.5 line-clamp-2 text-sm text-charcoal-600">{career.description}</p>

                  <div className="mt-4">
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-charcoal-500">
                      <Wrench className="h-3.5 w-3.5 text-forest-600" /> {t('careers.skills')}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {career.beginnerSkills.slice(0, 3).map((s) => (
                        <Badge key={s} tone="neutral">{s}</Badge>
                      ))}
                      {career.beginnerSkills.length > 3 && (
                        <Badge tone="neutral">+{career.beginnerSkills.length - 3}</Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-saffron-200 bg-saffron-50 p-3">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-saffron-600" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-saffron-700">{t('careers.project')}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-saffron-900">{career.project}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-5">
                    <Button to={`/app/careers/${career.id}`} size="sm" className="flex-1" iconRight={ArrowRight}>
                      {t('common.viewDetails')}
                    </Button>
                    <Button
                      size="sm"
                      variant={saved ? 'success' : 'secondary'}
                      onClick={() => toggleSaveCareer(career.id)}
                      aria-label={saved ? t('careers.saved') : t('careers.savePathway')}
                      title={saved ? t('careers.saved') : t('careers.savePathway')}
                      className={cn(saved && 'px-3')}
                    >
                      <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
                      {saved ? 'Saved' : 'Save'}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
