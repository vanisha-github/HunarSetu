import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import {
  Fingerprint,
  User,
  MapPin,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Target,
  Rocket,
  RefreshCw,
  ArrowRight,
  Info,
  Heart,
  Users,
  Wrench,
  BookOpen,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import SmartImage from '../components/SmartImage.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { useApp } from '../context/AppContext.jsx'
import {
  emptyDna,
  educationLevels,
  interestOptions,
  familyOccupationOptions,
  resourceOptions,
  subjectOptions,
  skillGoalOptions,
  directionOptions,
} from '../data/dna.js'
import { buildDimensionScores } from '../utils/recommend.js'
import { cn } from '../utils/format.js'

const STEPS = [
  { key: 'about', title: 'About you', icon: User },
  { key: 'interests', title: 'Interests & hobbies', icon: Heart },
  { key: 'family', title: 'Family & experience', icon: Users },
  { key: 'resources', title: 'Local resources', icon: Wrench },
  { key: 'strengths', title: 'Subjects & strengths', icon: BookOpen },
  { key: 'goals', title: 'Skills to learn', icon: Target },
  { key: 'direction', title: 'Future direction', icon: Rocket },
]

function OptionChip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('chip', selected && 'chip-active')}
      aria-pressed={selected}
    >
      {selected && <Check className="h-3.5 w-3.5" />}
      {label}
    </button>
  )
}

export default function OpportunityDNA() {
  const { t, dnaAnswers, dnaResult, submitDna, addToast, profile } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(!dnaResult)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(() => ({ ...emptyDna, ...(dnaAnswers || {}) }))
  const [error, setError] = useState('')

  const update = (patch) => {
    setAnswers((prev) => ({ ...prev, ...patch }))
    setError('')
  }

  const toggleMulti = (field, value) => {
    setAnswers((prev) => {
      const list = prev[field] || []
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
      return { ...prev, [field]: next }
    })
    setError('')
  }

  const validate = (key) => {
    switch (key) {
      case 'about':
        if (!answers.name.trim()) return 'Please enter your name.'
        if (!answers.education) return 'Please select your education level.'
        if (!answers.district.trim()) return 'Please enter your district or region.'
        return ''
      case 'interests':
        return answers.interests.length ? '' : 'Select at least one interest.'
      case 'family':
        return answers.familyOccupation ? '' : 'Select your family occupation or experience.'
      case 'resources':
        return answers.resources.length ? '' : 'Select at least one accessible resource.'
      case 'strengths':
        return answers.subjects.length ? '' : 'Select at least one subject or strength.'
      case 'goals':
        return answers.skillGoals.length ? '' : 'Select at least one skill you want to learn.'
      case 'direction':
        return answers.direction ? '' : 'Choose a preferred future direction.'
      default:
        return ''
    }
  }

  const next = () => {
    const message = validate(STEPS[step].key)
    if (message) {
      setError(message)
      return
    }
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const result = submitDna(answers)
      setEditing(false)
      addToast(`Found ${result.length} possible pathways for you`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const back = () => {
    if (step > 0) {
      setStep((s) => s - 1)
      setError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const progress = Math.round(((step + 1) / STEPS.length) * 100)

  if (!editing && dnaResult) {
    return <DnaResults result={dnaResult} answers={dnaAnswers} onRetake={() => { setEditing(true); setStep(0) }} profile={profile} />
  }

  const current = STEPS[step]

  return (
    <div>
      <PageHeader
        eyebrow="Opportunity DNA"
        title={t('dna.title')}
        subtitle={t('dna.subtitle')}
        actions={<Badge tone="neutral" icon={Info}>Takes about 2 minutes · demo data</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Step rail */}
        <Card className="no-print h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-50 text-forest-700">
              <Fingerprint className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-charcoal-900">{t('dna.title')}</p>
              <p className="text-xs text-charcoal-500">Step {step + 1} of {STEPS.length}</p>
            </div>
          </div>
          <ProgressBar value={progress} className="mt-4" />
          <ol className="mt-5 space-y-1.5">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              const done = i < step
              const active = i === step
              return (
                <li key={s.key}>
                  <button
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition',
                      active && 'bg-forest-50 text-forest-800 ring-1 ring-inset ring-forest-200',
                      done && 'text-charcoal-600 hover:bg-sage-50',
                      !active && !done && 'text-charcoal-400'
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-7 w-7 place-items-center rounded-lg text-xs',
                        active ? 'bg-forest-700 text-white' : done ? 'bg-forest-100 text-forest-700' : 'bg-sage-100 text-charcoal-400'
                      )}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                    </span>
                    {s.title}
                  </button>
                </li>
              )
            })}
          </ol>
        </Card>

        {/* Form */}
        <Card className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-saffron-50 text-saffron-700">
              <current.icon className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-bold text-charcoal-900">{current.title}</h2>
          </div>

          {current.key === 'about' && (
            <div className="space-y-5">
              <div>
                <label className="label" htmlFor="name">Your name</label>
                <input id="name" className="input" value={answers.name} onChange={(e) => update({ name: e.target.value })} placeholder="e.g. Aditi Kumari" />
              </div>
              <div>
                <span className="label">Education level</span>
                <div className="flex flex-wrap gap-2">
                  {educationLevels.map((lvl) => (
                    <OptionChip key={lvl} label={lvl} selected={answers.education === lvl} onClick={() => update({ education: lvl })} />
                  ))}
                </div>
              </div>
              <div>
                <label className="label" htmlFor="district">District / region</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                  <input id="district" className="input pl-10" value={answers.district} onChange={(e) => update({ district: e.target.value })} placeholder="e.g. Vaishali district, Bihar" />
                </div>
              </div>
            </div>
          )}

          {current.key === 'interests' && (
            <div>
              <p className="mb-3 text-sm text-charcoal-600">Choose everything you enjoy. There are no wrong answers.</p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((i) => (
                  <OptionChip key={i} label={i} selected={answers.interests.includes(i)} onClick={() => toggleMulti('interests', i)} />
                ))}
              </div>
            </div>
          )}

          {current.key === 'family' && (
            <div>
              <p className="mb-3 text-sm text-charcoal-600">
                This helps us suggest pathways — your family's work is a starting point, never a limit.
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {familyOccupationOptions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => update({ familyOccupation: o })}
                    className={cn(
                      'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition',
                      answers.familyOccupation === o
                        ? 'border-forest-600 bg-forest-50 text-forest-800'
                        : 'border-sage-200 bg-white text-charcoal-700 hover:border-forest-300'
                    )}
                  >
                    {o}
                    {answers.familyOccupation === o && <Check className="h-4 w-4 text-forest-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {current.key === 'resources' && (
            <div>
              <p className="mb-3 text-sm text-charcoal-600">What is easily accessible to you locally?</p>
              <div className="flex flex-wrap gap-2">
                {resourceOptions.map((r) => (
                  <OptionChip key={r} label={r} selected={answers.resources.includes(r)} onClick={() => toggleMulti('resources', r)} />
                ))}
              </div>
            </div>
          )}

          {current.key === 'strengths' && (
            <div>
              <p className="mb-3 text-sm text-charcoal-600">Which subjects or activities do you feel strongest in?</p>
              <div className="flex flex-wrap gap-2">
                {subjectOptions.map((s) => (
                  <OptionChip key={s} label={s} selected={answers.subjects.includes(s)} onClick={() => toggleMulti('subjects', s)} />
                ))}
              </div>
            </div>
          )}

          {current.key === 'goals' && (
            <div>
              <p className="mb-3 text-sm text-charcoal-600">What would you like to learn?</p>
              <div className="flex flex-wrap gap-2">
                {skillGoalOptions.map((s) => (
                  <OptionChip key={s} label={s} selected={answers.skillGoals.includes(s)} onClick={() => toggleMulti('skillGoals', s)} />
                ))}
              </div>
            </div>
          )}

          {current.key === 'direction' && (
            <div>
              <p className="mb-3 text-sm text-charcoal-600">Where would you like to head next?</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {directionOptions.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => update({ direction: d.id })}
                    className={cn(
                      'rounded-2xl border px-4 py-4 text-left transition',
                      answers.direction === d.id
                        ? 'border-forest-600 bg-forest-50'
                        : 'border-sage-200 bg-white hover:border-forest-300'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-charcoal-900">{d.label}</p>
                      {answers.direction === d.id && <Check className="h-4 w-4 text-forest-600" />}
                    </div>
                    <p className="mt-1 text-xs text-charcoal-500">{d.hint}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <div className="mt-7 flex items-center justify-between gap-3 border-t border-sage-200 pt-5">
            <Button variant="ghost" onClick={back} disabled={step === 0} icon={ChevronLeft}>
              {t('common.back')}
            </Button>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-charcoal-400 sm:block">{progress}% complete</span>
              <Button onClick={next} iconRight={step === STEPS.length - 1 ? Sparkles : ChevronRight}>
                {step === STEPS.length - 1 ? 'See my Opportunity DNA' : t('common.next')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function DnaResults({ result, answers, onRetake, profile }) {
  const { t, savedCareers, toggleSaveCareer } = useApp()
  const dimensions = useMemo(() => buildDimensionScores(answers || {}), [answers])

  return (
    <div>
      <PageHeader
        eyebrow="Opportunity DNA"
        title={t('dna.resultsTitle')}
        subtitle={t('dna.possibilities')}
        actions={
          <>
            <Button variant="secondary" onClick={onRetake} icon={RefreshCw}>
              {t('dna.retake')}
            </Button>
            <Button to="/app/careers" icon={ArrowRight}>
              {t('careers.title')}
            </Button>
          </>
        }
      />

      {/* Profile summary + radar */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <SmartImage
              src={profile.avatar}
              alt={profile.name}
              seed="profile-avatar"
              className="h-24 w-24 shrink-0 rounded-2xl"
            />
            <div className="flex-1">
              <h2 className="font-display text-2xl font-semibold text-charcoal-900">{answers?.name || profile.name}</h2>
              <p className="mt-1 text-sm text-charcoal-600">
                {answers?.education || profile.education} · {answers?.district || profile.location}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(answers?.interests || profile.interests).map((i) => (
                  <Badge key={i} tone="neutral" icon={Target}>{i}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Family & experience', value: answers?.familyOccupation || '—' },
              { label: 'Future direction', value: directionOptions.find((d) => d.id === answers?.direction)?.label || '—' },
              { label: 'Local resources', value: (answers?.resources || []).join(', ') || '—' },
              { label: 'Skills to learn', value: (answers?.skillGoals || []).join(', ') || '—' },
            ].map((row) => (
              <div key={row.label} className="rounded-xl border border-sage-200 bg-cream-50 p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-charcoal-500">{row.label}</p>
                <p className="mt-1 text-sm font-semibold text-charcoal-800">{row.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold uppercase tracking-wide text-charcoal-500">Four dimensions</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dimensions} outerRadius="70%">
                <PolarGrid stroke="#d1e0d6" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#57574f' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="#2c6842" fill="#3d8355" fillOpacity={0.45} strokeWidth={2} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #d1e0d6', fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-charcoal-500">
            Based on your answers across family expertise, local resources, regional demand and personal abilities.
          </p>
        </Card>
      </div>

      {/* Pathways */}
      <h2 className="mt-8 flex items-center gap-2 text-xl font-bold text-charcoal-900">
        <Sparkles className="h-5 w-5 text-saffron-500" /> {t('dna.pathways')}
      </h2>
      <p className="mt-1 text-sm text-charcoal-600">{t('dna.possibilities')}</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        {result.map((item, index) => {
          const saved = savedCareers.includes(item.career.id)
          return (
            <Card key={item.career.id} className="flex flex-col overflow-hidden p-0">
              <div className="relative">
                <SmartImage src={item.career.image} alt={item.career.title} seed={item.career.id} className="aspect-[16/10] w-full" />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <Badge tone="accent">#{index + 1} match</Badge>
                  <Badge tone="success">{item.match}% fit</Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold text-charcoal-900">{item.career.title}</h3>
                <p className="mt-1.5 text-sm text-charcoal-600">{item.career.tagline}</p>

                <div className="mt-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-charcoal-500">
                    <Lightbulb className="h-3.5 w-3.5 text-saffron-500" /> {t('dna.why')}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {item.reasons.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-charcoal-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-500" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">{t('dna.skillsToDevelop')}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.skills.map((s) => (
                      <Badge key={s} tone="neutral">{s}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-saffron-200 bg-saffron-50 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-saffron-700">{t('dna.projectIdea')}</p>
                  <p className="mt-1 text-xs text-saffron-900">{item.project}</p>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-5">
                  <Button to={`/app/careers/${item.career.id}`} size="sm" className="flex-1" iconRight={ArrowRight}>
                    {t('dna.exploreCareer')}
                  </Button>
                  <Button
                    size="sm"
                    variant={saved ? 'success' : 'secondary'}
                    onClick={() => toggleSaveCareer(item.career.id)}
                  >
                    {saved ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6 flex items-start gap-3 border-forest-200 bg-forest-50">
        <Info className="h-5 w-5 shrink-0 text-forest-700" />
        <p className="text-sm text-forest-900">
          <span className="font-bold">Remember:</span> {t('dna.possibilities')} Your family's work, your location
          and your current subjects do not decide your future — they are simply useful starting points.
        </p>
      </Card>
    </div>
  )
}
