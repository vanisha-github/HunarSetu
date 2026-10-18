import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Check,
  Route,
  Wrench,
  Lightbulb,
  Network,
  TrendingUp,
  Clock,
  IndianRupee,
  MapPin,
  ArrowRight,
  Trophy,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import SmartImage from '../components/SmartImage.jsx'
import CareerSimulation from '../components/CareerSimulation.jsx'
import { SectionHeading } from '../components/StatCard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { getCareer, careers } from '../data/careers.js'
import { modules } from '../data/courses.js'
import { cn } from '../utils/format.js'

export default function CareerDetail() {
  const { careerId } = useParams()
  const { t, savedCareers, toggleSaveCareer, moduleStatus } = useApp()
  const career = getCareer(careerId)

  if (!career) return <Navigate to="/app/careers" replace />

  const saved = savedCareers.includes(career.id)
  const pathwayModules = modules.filter((m) => m.pathway === career.id)
  const related = careers.filter((c) => c.id !== career.id && career.relatedOpportunities.includes(c.title))
  const alsoExplore = related.length ? related : careers.filter((c) => c.id !== career.id).slice(0, 2)

  return (
    <div>
      <div className="mb-4 no-print">
        <Link
          to="/app/careers"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-600 transition hover:text-forest-800"
        >
          <ArrowLeft className="h-4 w-4" /> {t('careers.title')}
        </Link>
      </div>

      {/* Hero */}
      <Card className="overflow-hidden p-0">
        <div className="relative">
          <SmartImage src={career.image} alt={career.title} seed={career.id} className="aspect-[16/7] w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{career.category}</Badge>
              <Badge tone="info">{career.duration}</Badge>
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-cream-50 sm:text-4xl">{career.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-cream-100/90">{career.tagline}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2 text-charcoal-700">
              <IndianRupee className="h-4 w-4 text-forest-600" /> {career.salaryRange}
            </span>
            <span className="inline-flex items-center gap-2 text-charcoal-700">
              <MapPin className="h-4 w-4 text-forest-600" /> {career.demand}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={saved ? 'success' : 'primary'}
              icon={saved ? Check : Heart}
              onClick={() => toggleSaveCareer(career.id)}
            >
              {saved ? t('careers.saved') : t('careers.savePathway')}
            </Button>
            <Button to="/app/learning" variant="secondary" icon={Route}>
              {t('learning.title')}
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h2 className="text-lg font-bold text-charcoal-900">About this pathway</h2>
            <p className="mt-2 leading-relaxed text-charcoal-600">{career.description}</p>
          </Card>

          <Card>
            <SectionHeading icon={Route} title={t('careers.roadmap')} />
            <ol className="relative space-y-5 border-l border-sage-200 pl-6">
              {career.roadmap.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-forest-600 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-charcoal-900">{step.title}</p>
                    <Badge tone="neutral" icon={Clock}>{step.duration}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-charcoal-600">{step.objective}</p>
                </li>
              ))}
            </ol>
          </Card>

          {career.simulation && <CareerSimulation type={career.simulation} />}

          {pathwayModules.length > 0 && (
            <Card>
              <SectionHeading icon={Wrench} title="Modules for this pathway" />
              <div className="space-y-3">
                {pathwayModules.map((m) => {
                  const done = Boolean(moduleStatus[m.id])
                  return (
                    <div key={m.id} className="flex items-center gap-3 rounded-xl border border-sage-200 bg-cream-50 p-3">
                      <SmartImage src={career.image} alt={m.title} seed={m.id} className="h-12 w-12 shrink-0 rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-charcoal-800">{m.title}</p>
                        <p className="text-xs text-charcoal-500">{m.level} · {m.duration}</p>
                      </div>
                      <Badge tone={done ? 'success' : 'neutral'}>{done ? t('learning.completed') : m.level}</Badge>
                    </div>
                  )
                })}
              </div>
              <Button to="/app/learning" variant="secondary" size="sm" className="mt-4" iconRight={ArrowRight}>
                {t('learning.title')}
              </Button>
            </Card>
          )}
        </div>

        {/* Side */}
        <div className="space-y-6">
          <Card>
            <SectionHeading icon={Wrench} title={t('careers.skills')} />
            <div className="flex flex-wrap gap-1.5">
              {career.skills.map((s) => (
                <Badge key={s} tone="neutral">{s}</Badge>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Beginner-friendly first steps</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {career.beginnerSkills.map((s) => (
                  <Badge key={s} tone="success">{s}</Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border-saffron-200 bg-saffron-50">
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-saffron-600" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-saffron-700">{t('careers.project')}</p>
                <p className="mt-1 text-sm text-saffron-900">{career.project}</p>
              </div>
            </div>
            <Button to="/app/passport" variant="saffron" size="sm" className="mt-4" iconRight={ArrowRight}>
              Add to Skill Passport
            </Button>
          </Card>

          <Card>
            <SectionHeading icon={Network} title={t('careers.related')} />
            <ul className="space-y-2">
              {career.relatedOpportunities.map((o) => (
                <li key={o}>
                  <Link
                    to="/app/opportunities"
                    className="flex items-center gap-2 rounded-xl border border-sage-200 px-3.5 py-2.5 text-sm font-semibold text-charcoal-700 transition hover:border-forest-400 hover:text-forest-800"
                  >
                    <TrendingUp className="h-4 w-4 text-forest-600" />
                    <span className="flex-1">{o}</span>
                    <ArrowRight className="h-4 w-4 text-charcoal-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-forest-900 text-cream-100">
            <h3 className="flex items-center gap-2 text-sm font-bold text-cream-50">
              <Trophy className="h-4 w-4 text-saffron-300" /> Explore more pathways
            </h3>
            <div className="mt-3 space-y-2">
              {alsoExplore.map((c) => (
                <Link
                  key={c.id}
                  to={`/app/careers/${c.id}`}
                  className={cn(
                    'flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-white/20'
                  )}
                >
                  <SmartImage src={c.image} alt={c.title} seed={c.id} className="h-9 w-9 shrink-0 rounded-lg" />
                  <span className="flex-1 truncate">{c.title}</span>
                  <ArrowRight className="h-4 w-4 opacity-70" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
