import { useMemo, useState } from 'react'
import {
  Route,
  Check,
  Clock,
  Target,
  ClipboardList,
  BookOpen,
  ExternalLink,
  Plus,
  Sparkles,
  GraduationCap,
  Award,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import SmartImage from '../components/SmartImage.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { StatCard, SectionHeading, EmptyState } from '../components/StatCard.jsx'
import { FilterChips } from '../components/SearchFilter.jsx'
import { useApp } from '../context/AppContext.jsx'
import { modules, learningPlatforms } from '../data/courses.js'
import { careers, getCareer } from '../data/careers.js'
import { images } from '../data/images.js'
import { cn } from '../utils/format.js'

export default function LearningRoadmap() {
  const { t, moduleStatus, toggleModule, savedCareers, addProject, addToast } = useApp()
  const [pathway, setPathway] = useState('All')
  const [level, setLevel] = useState('All')
  const [openProject, setOpenProject] = useState(false)

  const pathwayOptions = useMemo(() => {
    const labels = Array.from(new Set(modules.map((m) => m.pathwayLabel)))
    return ['All', ...labels]
  }, [])

  const filtered = useMemo(
    () =>
      modules.filter(
        (m) =>
          (pathway === 'All' || m.pathwayLabel === pathway) &&
          (level === 'All' || m.level === level)
      ),
    [pathway, level]
  )

  const completed = Object.keys(moduleStatus).length
  const percent = Math.round((completed / modules.length) * 100)
  const hasStarted = completed > 0 || savedCareers.length > 0

  return (
    <div>
      <PageHeader
        eyebrow="Learn"
        title={t('learning.title')}
        subtitle={t('learning.subtitle')}
        actions={
          <>
            <Button variant="secondary" icon={ExternalLink} to="/app/careers">
              {t('careers.title')}
            </Button>
            <Button icon={Plus} onClick={() => setOpenProject(true)}>
              {t('learning.submitProject')}
            </Button>
          </>
        }
      />

      {/* Progress overview */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Route} label="Overall progress" value={`${percent}%`} hint={`${completed}/${modules.length} modules`} tone="forest" />
        <StatCard icon={Check} label={t('learning.completed')} value={completed} hint="Modules finished" tone="sage" />
        <StatCard icon={BookOpen} label="In your plan" value={filtered.length} hint="Currently shown" tone="sky" />
        <StatCard icon={Award} label="Saved pathways" value={savedCareers.length} hint="From Career Explorer" tone="saffron" />
      </div>

      <Card className="mb-6 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-50 text-forest-700">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-charcoal-900">Your personalised roadmap</p>
              <p className="text-xs text-charcoal-500">Mark modules complete to update your Skill Passport progress.</p>
            </div>
          </div>
          <div className="sm:w-64">
            <ProgressBar value={percent} label={`${percent}% complete`} />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3 border-t border-sage-200 pt-4">
          <FilterChips options={pathwayOptions} value={pathway} onChange={setPathway} label="Pathway" />
          <FilterChips options={['All', 'Beginner', 'Intermediate']} value={level} onChange={setLevel} label="Level" />
        </div>
      </Card>

      {!hasStarted && (
        <EmptyState
          icon={Sparkles}
          title="Your roadmap is waiting"
          description={t('learning.empty')}
          action={
            <Button to="/app/careers" icon={Route}>
              {t('careers.title')}
            </Button>
          }
        />
      )}

      {/* Modules */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {filtered.map((m) => {
            const done = Boolean(moduleStatus[m.id])
            return (
              <Card key={m.id} className={cn('overflow-hidden p-0 transition', done && 'ring-1 ring-forest-200')}>
                <div className="flex flex-col sm:flex-row">
                  <SmartImage
                    src={images[m.image] || images.heroLearning}
                    alt={m.title}
                    seed={m.id}
                    className="h-40 w-full sm:h-auto sm:w-44 sm:shrink-0"
                  />
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="accent">{m.pathwayLabel}</Badge>
                      <Badge tone="neutral">{m.level}</Badge>
                      <Badge tone="info" icon={Clock}>{m.duration}</Badge>
                    </div>
                    <h3 className="mt-2 text-base font-bold text-charcoal-900">{m.title}</h3>
                    <p className="mt-1 text-sm text-charcoal-600">{m.objective}</p>

                    <div className="mt-3">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-charcoal-500">
                        <Target className="h-3.5 w-3.5 text-forest-600" /> Learning objectives
                      </p>
                      <p className="mt-1 text-xs text-charcoal-600">{m.objective}</p>
                    </div>

                    <div className="mt-3">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-charcoal-500">
                        <ClipboardList className="h-3.5 w-3.5 text-forest-600" /> Practical exercises
                      </p>
                      <ul className="mt-1.5 space-y-1">
                        {m.exercises.map((ex) => (
                          <li key={ex} className="flex items-start gap-2 text-xs text-charcoal-600">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-500" />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-sage-200 pt-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-charcoal-500">
                        <BookOpen className="h-3.5 w-3.5" /> {m.resource}
                      </span>
                      <Button
                        size="sm"
                        variant={done ? 'success' : 'primary'}
                        icon={done ? Check : undefined}
                        onClick={() => {
                          toggleModule(m.id)
                          addToast(done ? `${m.title} marked as not complete` : `${m.title} completed`, done ? 'info' : 'success')
                        }}
                      >
                        {done ? t('learning.completed') : t('learning.markComplete')}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <SectionHeading icon={BookOpen} title={t('learning.resources')} />
            <p className="text-xs text-charcoal-500">
              Suggested public platforms for extra learning. This prototype is not officially integrated with them.
            </p>
            <ul className="mt-3 space-y-2">
              {learningPlatforms.map((p) => (
                <li key={p.name} className="flex items-center gap-3 rounded-xl border border-sage-200 bg-cream-50 p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest-50 text-forest-700">
                    <GraduationCap className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-charcoal-800">{p.name}</p>
                    <p className="text-xs text-charcoal-500">{p.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border-saffron-200 bg-saffron-50">
            <div className="flex items-start gap-2">
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-saffron-600" />
              <div>
                <p className="text-sm font-bold text-saffron-900">{t('learning.submitProject')}</p>
                <p className="mt-1 text-xs text-saffron-800">
                  Turn what you learned into a project. It will appear in your Skill Passport for review.
                </p>
              </div>
            </div>
            <Button variant="saffron" size="sm" className="mt-3 w-full" icon={Plus} onClick={() => setOpenProject(true)}>
              {t('passport.addProject')}
            </Button>
          </Card>

          <Card className="bg-forest-900 text-cream-100">
            <h3 className="flex items-center gap-2 text-sm font-bold text-cream-50">
              <Sparkles className="h-4 w-4 text-saffron-300" /> Suggested next pathway
            </h3>
            <div className="mt-3 space-y-2">
              {careers.slice(0, 3).map((c) => (
                <Button key={c.id} to={`/app/careers/${c.id}`} variant="ghost" size="sm" className="w-full justify-start bg-white/10 text-cream-50 hover:bg-white/20">
                  {c.title}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <ProjectForm open={openProject} onClose={() => setOpenProject(false)} onSubmit={addProject} t={t} />
    </div>
  )
}

export function ProjectForm({ open, onClose, onSubmit, t }) {
  const [form, setForm] = useState({ title: '', description: '', category: 'Agriculture', skills: '', evidence: '' })
  const [error, setError] = useState('')

  const set = (patch) => {
    setForm((prev) => ({ ...prev, ...patch }))
    setError('')
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return setError('Please add a project title.')
    if (!form.description.trim()) return setError('Please describe your project.')
    const skills = form.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      skills,
      evidence: form.evidence.trim(),
    })
    setForm({ title: '', description: '', category: 'Agriculture', skills: '', evidence: '' })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('passport.addProject')}
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
          <Button form="project-form" type="submit" icon={Plus}>{t('common.submit')}</Button>
        </div>
      }
    >
      <form id="project-form" onSubmit={submit} className="space-y-4">
        <div>
          <label className="label" htmlFor="p-title">Project title</label>
          <input id="p-title" className="input" value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Drip Plan for a 1-Acre Plot" />
        </div>
        <div>
          <label className="label" htmlFor="p-desc">Description</label>
          <textarea
            id="p-desc"
            className="input min-h-[110px]"
            value={form.description}
            onChange={(e) => set({ description: e.target.value })}
            placeholder="What did you build or learn? What problem did it solve?"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="p-cat">Category</label>
            <select id="p-cat" className="input" value={form.category} onChange={(e) => set({ category: e.target.value })}>
              {['Agriculture', 'Technology', 'Energy', 'Business', 'Craft', 'Community', 'Science'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="p-skills">Skills demonstrated</label>
            <input id="p-skills" className="input" value={form.skills} onChange={(e) => set({ skills: e.target.value })} placeholder="Comma separated" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="p-evidence">Evidence URL (optional)</label>
          <input id="p-evidence" className="input" value={form.evidence} onChange={(e) => set({ evidence: e.target.value })} placeholder="Link to a photo, doc or video" />
        </div>
        {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">{error}</p>}
        <p className="text-xs text-charcoal-500">
          Your project is added as <strong>Pending review</strong>. A facilitator can verify it from the Facilitator Dashboard.
        </p>
      </form>
    </Modal>
  )
}
