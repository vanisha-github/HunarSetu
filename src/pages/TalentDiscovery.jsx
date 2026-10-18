import { useMemo, useState } from 'react'
import {
  Trophy,
  Star,
  Clock,
  Target,
  Send,
  Check,
  Sparkles,
  Medal,
  Crown,
  Info,
  ChevronRight,
  Flag,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { StatCard, SectionHeading } from '../components/StatCard.jsx'
import { FilterChips } from '../components/SearchFilter.jsx'
import { useApp } from '../context/AppContext.jsx'
import { challenges, challengeCategories, leaderboard, talentPathway } from '../data/challenges.js'
import { cn } from '../utils/format.js'

const DIFFICULTY_TONE = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' }

export default function TalentDiscovery() {
  const { t, submissions, addChallengeSubmission, addToast } = useApp()
  const [category, setCategory] = useState('All')
  const [active, setActive] = useState(null)

  const filtered = useMemo(
    () => challenges.filter((c) => category === 'All' || c.category === category),
    [category]
  )

  const submittedIds = submissions.map((s) => s.challengeId)
  const totalPoints = challenges
    .filter((c) => submittedIds.includes(c.id))
    .reduce((sum, c) => sum + c.points, 0)

  const rankedBoard = useMemo(() => {
    const board = leaderboard.map((r) => ({ ...r }))
    return board.sort((a, b) => b.points - a.points).map((r, i) => ({ ...r, rank: i + 1 }))
  }, [])

  return (
    <div>
      <PageHeader
        eyebrow="Compete"
        title={t('talent.title')}
        subtitle={t('talent.subtitle')}
        actions={<Badge tone="warning" icon={Info}>{t('common.demoData')}</Badge>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Trophy} label="Challenges" value={challenges.length} hint="Open to all students" tone="forest" />
        <StatCard icon={Send} label="Your entries" value={submissions.length} hint="Submitted in this demo" tone="sky" />
        <StatCard icon={Star} label="Points earned" value={totalPoints} hint="From submitted challenges" tone="saffron" />
        <StatCard icon={Medal} label="Badges" value={submittedIds.length} hint="Earned so far" tone="sage" />
      </div>

      {/* Talent pathway */}
      <Card className="mb-6">
        <SectionHeading icon={Flag} title={t('talent.pathwayTitle')} />
        <p className="mb-4 flex items-start gap-2 text-xs text-charcoal-500">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {t('talent.pathwayNote')}
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {talentPathway.map((p, i) => (
            <div key={p.level} className="relative flex flex-1 items-start gap-3 rounded-2xl border border-sage-200 bg-cream-50 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-700 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-charcoal-900">{p.level}</p>
                <p className="text-xs text-charcoal-600">{p.detail}</p>
              </div>
              {i < talentPathway.length - 1 && (
                <ChevronRight className="absolute -right-2 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-sage-400 lg:block" />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Challenges */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold text-charcoal-900">
              <Trophy className="h-5 w-5 text-forest-600" /> {t('talent.challenges')}
            </h2>
            <FilterChips options={challengeCategories} value={category} onChange={setCategory} label={t('common.filter')} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((c) => {
              const submitted = submittedIds.includes(c.id)
              return (
                <Card key={c.id} hover className="flex flex-col overflow-hidden p-0">
                  <div className="relative">
                    <SmartImage src={c.image} alt={c.title} seed={c.id} className="aspect-[16/9] w-full" />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      <Badge tone="accent">{c.category}</Badge>
                      <Badge tone={DIFFICULTY_TONE[c.difficulty] || 'neutral'}>{c.difficulty}</Badge>
                    </div>
                    {submitted && (
                      <span className="absolute right-3 top-3">
                        <Badge tone="success" icon={Check}>Submitted</Badge>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-bold text-charcoal-900">{c.title}</h3>
                    <p className="mt-1.5 text-sm text-charcoal-600">{c.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-charcoal-600">
                      <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-saffron-500" /> {c.points} {t('talent.points')}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-forest-600" /> {c.deadline}</span>
                      <span className="inline-flex items-center gap-1.5"><Medal className="h-3.5 w-3.5 text-forest-600" /> {c.badge}</span>
                    </div>
                    <div className="mt-auto pt-5">
                      <Button size="sm" className="w-full" variant={submitted ? 'secondary' : 'primary'} onClick={() => setActive(c)}>
                        {submitted ? 'View entry' : t('talent.submit')}
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Leaderboard + recommended */}
        <div className="space-y-6">
          <Card>
            <SectionHeading icon={Crown} title={t('talent.leaderboard')} />
            <div className="space-y-2">
              {rankedBoard.map((r) => (
                <div
                  key={r.name}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border px-3.5 py-2.5',
                    r.name.startsWith('Aditi') ? 'border-forest-300 bg-forest-50' : 'border-sage-200 bg-white'
                  )}
                >
                  <span
                    className={cn(
                      'grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold',
                      r.rank === 1 ? 'bg-saffron-400 text-white' : r.rank === 2 ? 'bg-sage-300 text-charcoal-800' : r.rank === 3 ? 'bg-saffron-200 text-saffron-900' : 'bg-sage-100 text-charcoal-600'
                    )}
                  >
                    {r.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-charcoal-900">{r.name}</p>
                    <p className="truncate text-[11px] text-charcoal-500">{r.village}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-forest-800">{r.points}</p>
                    <p className="text-[10px] text-charcoal-500">{r.badges} badges</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-start gap-2 text-[11px] text-charcoal-500">
              <Info className="mt-0.5 h-3 w-3 shrink-0" /> {t('talent.demoLeaderboard')}
            </p>
          </Card>

          {submissions.length > 0 && (
            <Card>
              <SectionHeading icon={Check} title="Your submissions" />
              <ul className="space-y-2">
                {submissions.map((s) => (
                  <li key={s.id} className="rounded-xl border border-forest-200 bg-forest-50 p-3">
                    <p className="text-sm font-semibold text-charcoal-800">{s.challengeTitle}</p>
                    <p className="text-[11px] text-charcoal-500">{s.date} · {s.points} pts</p>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="bg-forest-900 text-cream-100">
            <h3 className="flex items-center gap-2 text-sm font-bold text-cream-50">
              <Sparkles className="h-4 w-4 text-saffron-300" /> {t('talent.recommended')}
            </h3>
            <div className="mt-3 space-y-2">
              {challenges
                .filter((c) => !submittedIds.includes(c.id))
                .slice(0, 3)
                .map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(c)}
                    className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-left text-sm font-semibold text-cream-50 transition hover:bg-white/20"
                  >
                    <Target className="h-4 w-4 text-saffron-200" />
                    <span className="flex-1 truncate">{c.title}</span>
                    <span className="text-xs text-saffron-200">+{c.points}</span>
                  </button>
                ))}
            </div>
          </Card>
        </div>
      </div>

      <ChallengeModal
        challenge={active}
        onClose={() => setActive(null)}
        onSubmit={(payload) => {
          addChallengeSubmission(payload)
          addToast('Entry submitted! A facilitator can review it.')
          setActive(null)
        }}
        alreadySubmitted={active ? submittedIds.includes(active.id) : false}
        t={t}
      />
    </div>
  )
}

function ChallengeModal({ challenge, onClose, onSubmit, alreadySubmitted, t }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!description.trim()) return setError('Please describe your entry.')
    onSubmit({
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      title: title.trim() || challenge.title,
      description: description.trim(),
      points: challenge.points,
      badge: challenge.badge,
    })
    setTitle('')
    setDescription('')
    setError('')
  }

  return (
    <Modal
      open={Boolean(challenge)}
      onClose={onClose}
      title={challenge?.title || ''}
      size="lg"
      footer={
        challenge && !alreadySubmitted ? (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
            <Button form="challenge-form" type="submit" icon={Send}>{t('talent.submit')}</Button>
          </div>
        ) : null
      }
    >
      {challenge && (
        <div className="space-y-5">
          <SmartImage src={challenge.image} alt={challenge.title} seed={challenge.id} className="aspect-[16/7] w-full rounded-2xl" />
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{challenge.category}</Badge>
            <Badge tone={DIFFICULTY_TONE[challenge.difficulty] || 'neutral'}>{challenge.difficulty}</Badge>
            <Badge tone="info" icon={Star}>{challenge.points} {t('talent.points')}</Badge>
            <Badge tone="neutral" icon={Medal}>{challenge.badge}</Badge>
            <Badge tone="warning" icon={Clock}>{challenge.deadline}</Badge>
          </div>
          <p className="text-sm leading-relaxed text-charcoal-700">{challenge.summary}</p>
          <div className="rounded-xl border border-forest-200 bg-forest-50 p-4">
            <p className="text-sm font-bold text-forest-900">Instructions</p>
            <p className="mt-1.5 text-sm text-forest-900/90">{challenge.instructions}</p>
          </div>

          {alreadySubmitted ? (
            <div className="flex items-start gap-3 rounded-xl border border-forest-200 bg-forest-50 p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />
              <p className="text-sm text-forest-900">
                You have already submitted an entry for this challenge. Great work — keep going with another challenge!
              </p>
            </div>
          ) : (
            <form id="challenge-form" onSubmit={submit} className="space-y-4">
              <div>
                <label className="label" htmlFor="c-title">Entry title</label>
                <input id="c-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give your entry a title" />
              </div>
              <div>
                <label className="label" htmlFor="c-desc">Describe your entry</label>
                <textarea
                  id="c-desc"
                  className="input min-h-[120px]"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                    setError('')
                  }}
                  placeholder="Explain your idea, approach and what you would do next…"
                />
              </div>
              {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">{error}</p>}
              <p className="text-xs text-charcoal-500">
                This is a demo submission stored in your browser only. No entry is sent to any organisation.
              </p>
            </form>
          )}
        </div>
      )}
    </Modal>
  )
}
