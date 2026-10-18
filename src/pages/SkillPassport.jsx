import { useMemo, useState } from 'react'
import {
  BadgeCheck,
  Printer,
  Plus,
  MapPin,
  GraduationCap,
  Target,
  Award,
  Trophy,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Clock,
  Sparkles,
  Check,
  ExternalLink,
  Route,
  Star,
  CalendarDays,
  Building2,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { SectionHeading } from '../components/StatCard.jsx'
import { ProjectForm } from './LearningRoadmap.jsx'
import { useApp } from '../context/AppContext.jsx'
import { SKILL_STATUS, PROJECT_STATUS } from '../data/students.js'
import { modules } from '../data/courses.js'
import { getCareer } from '../data/careers.js'
import { formatDate, cn } from '../utils/format.js'

const STATUS_ICON = {
  self_reported: ShieldAlert,
  learning: Shield,
  assessed: Shield,
  verified: ShieldCheck,
}

export default function SkillPassport() {
  const { t, profile, projects, moduleStatus, addProject } = useApp()
  const [openProject, setOpenProject] = useState(false)

  const pathway = getCareer(profile.careerPath)
  const completedModules = modules.filter((m) => moduleStatus[m.id])
  const verifiedCount = projects.filter((p) => p.status === 'verified').length
  const overallProgress = useMemo(
    () => Math.round(((Object.keys(moduleStatus).length + verifiedCount) / (modules.length + 3)) * 100),
    [moduleStatus, verifiedCount]
  )

  const skillGroups = useMemo(() => {
    const groups = { verified: [], assessed: [], learning: [], self_reported: [] }
    profile.skills.forEach((s) => groups[s.status]?.push(s))
    return groups
  }, [profile.skills])

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <div>
      <PageHeader
        eyebrow="Showcase"
        title={t('passport.title')}
        subtitle={t('passport.subtitle')}
        actions={
          <>
            <Button variant="secondary" icon={Printer} onClick={handlePrint}>
              {t('common.print')}
            </Button>
            <Button icon={Plus} onClick={() => setOpenProject(true)}>
              {t('passport.addProject')}
            </Button>
          </>
        }
      />

      {/* Passport document */}
      <Card className="overflow-hidden p-0 print-avoid-break">
        <div className="relative bg-gradient-to-r from-forest-900 via-forest-800 to-forest-700 p-6 sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20">
            <SmartImage src={profile.avatar} alt="" seed="passport-watermark" className="h-full w-full" />
          </div>
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-24 w-24 rounded-2xl object-cover ring-4 ring-cream-100/40 sm:h-28 sm:w-28"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="success" className="bg-white/15 text-cream-50 border-white/20">
                  <BadgeCheck className="h-3.5 w-3.5" /> Skill Passport
                </Badge>
                <Badge tone="accent">{pathway?.category || 'Exploring'}</Badge>
              </div>
              <h1 className="mt-2 font-display text-3xl font-semibold text-cream-50">{profile.name}</h1>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-cream-100/85">
                <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-4 w-4" /> {profile.education} · {profile.stream}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {profile.location}</span>
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> Joined {profile.joined}</span>
              </div>
              <p className="mt-2 max-w-xl text-sm text-cream-100/80">{profile.goal}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-1 lg:grid-cols-3">
              {[
                { label: 'DNA', value: `${profile.dnaScore}%` },
                { label: 'Projects', value: projects.length },
                { label: 'Verified', value: verifiedCount },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/10 px-3 py-2 text-center">
                  <p className="font-display text-2xl font-semibold text-cream-50">{s.value}</p>
                  <p className="text-[11px] uppercase tracking-wide text-cream-200/80">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-6">
            <div className="flex items-center justify-between text-xs text-cream-100/80">
              <span>{t('common.progress')}</span>
              <span className="font-bold">{overallProgress}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-saffron-300" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>
        </div>

        {/* Selected pathway strip */}
        {pathway && (
          <div className="flex flex-col gap-3 border-b border-sage-200 bg-cream-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <SmartImage src={pathway.image} alt={pathway.title} seed={pathway.id} className="h-12 w-12 shrink-0 rounded-xl" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-charcoal-500">{t('passport.selectedPathway')}</p>
                <p className="text-sm font-bold text-charcoal-900">{pathway.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 no-print">
              <Button to={`/app/careers/${pathway.id}`} variant="secondary" size="sm" icon={Target}>
                {t('common.viewDetails')}
              </Button>
              <Button to="/app/learning" variant="ghost" size="sm" icon={Route}>
                {t('learning.title')}
              </Button>
            </div>
          </div>
        )}

        {/* Status legend */}
        <div className="flex flex-wrap items-center gap-2 border-b border-sage-200 px-5 py-3">
          <span className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Status key:</span>
          {Object.entries(SKILL_STATUS).map(([key, meta]) => (
            <Badge key={key} tone={meta.tone}>{meta.label}</Badge>
          ))}
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-3 print-full">
          {/* Skills */}
          <div className="lg:col-span-2">
            <SectionHeading icon={Sparkles} title={t('passport.skills')} />
            <div className="space-y-4">
              {Object.entries(skillGroups).map(([status, skills]) => {
                if (!skills.length) return null
                const Icon = STATUS_ICON[status]
                const meta = SKILL_STATUS[status]
                return (
                  <div key={status}>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-charcoal-500" />
                      <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">{meta.label}</p>
                      <span className="text-xs text-charcoal-400">({skills.length})</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {skills.map((s) => (
                        <div key={s.id} className="flex items-center justify-between gap-2 rounded-xl border border-sage-200 bg-white px-3.5 py-2.5">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-charcoal-800">{s.name}</p>
                            <p className="text-[11px] text-charcoal-500">Level: {s.level}</p>
                          </div>
                          <Badge tone={meta.tone}>{meta.label}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Projects */}
            <div className="mt-8">
              <SectionHeading
                icon={FileText}
                title={t('passport.projects')}
                action={
                  <button
                    onClick={() => setOpenProject(true)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700 link-underline no-print"
                  >
                    <Plus className="h-4 w-4" /> {t('passport.addProject')}
                  </button>
                }
              />
              <div className="space-y-3">
                {projects.map((p) => {
                  const status = PROJECT_STATUS[p.status] || PROJECT_STATUS.pending
                  return (
                    <Card key={p.id} className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-charcoal-900">{p.title}</h4>
                            <Badge tone={status.tone}>{status.label}</Badge>
                          </div>
                          <p className="mt-1 text-sm text-charcoal-600">{p.description}</p>
                        </div>
                        <span className="text-xs text-charcoal-400">{formatDate(p.date)}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge tone="neutral">{p.category}</Badge>
                        {p.skills.map((s) => (
                          <Badge key={s} tone="info">{s}</Badge>
                        ))}
                        {p.evidence && (
                          <a
                            href={p.evidence.startsWith('http') ? p.evidence : `https://${p.evidence}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-forest-700 link-underline"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> Evidence
                          </a>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Side rail */}
          <div className="space-y-6">
            {/* Completed modules */}
            <Card>
              <SectionHeading icon={Route} title={t('learning.completed')} />
              {completedModules.length === 0 ? (
                <p className="text-sm text-charcoal-500">No modules completed yet.</p>
              ) : (
                <ul className="space-y-2">
                  {completedModules.map((m) => (
                    <li key={m.id} className="flex items-start gap-2 rounded-xl border border-forest-200 bg-forest-50 p-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                      <div>
                        <p className="text-sm font-semibold text-charcoal-800">{m.title}</p>
                        <p className="text-[11px] text-charcoal-500">{m.pathwayLabel} · {m.duration}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* Achievements */}
            <Card>
              <SectionHeading icon={Award} title={t('passport.assessments')} />
              <ul className="space-y-2.5">
                {profile.achievements.map((a) => (
                  <li key={a.id} className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-saffron-50 text-saffron-700">
                      <Star className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-charcoal-800">{a.title}</p>
                      <p className="text-[11px] text-charcoal-500">{a.detail} · {formatDate(a.date)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Competitions */}
            <Card>
              <SectionHeading icon={Trophy} title={t('passport.competitions')} />
              <ul className="space-y-2">
                {profile.competitions.map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-2 rounded-xl border border-sage-200 bg-cream-50 px-3.5 py-2.5">
                    <div>
                      <p className="text-sm font-semibold text-charcoal-800">{c.title}</p>
                      <p className="text-[11px] text-charcoal-500">{formatDate(c.date)}</p>
                    </div>
                    <Badge tone="info">{c.result}</Badge>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Certificates */}
            <Card>
              <SectionHeading icon={FileText} title={t('passport.certificates')} />
              <ul className="space-y-2">
                {profile.certificates.map((c) => (
                  <li key={c.id} className="flex items-start gap-3 rounded-xl border border-sage-200 bg-white p-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-50 text-forest-700">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-charcoal-800">{c.title}</p>
                      <p className="text-[11px] text-charcoal-500">{c.issuer} · {formatDate(c.date)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-sage-200 p-5 print-avoid-break">
          <SectionHeading icon={Clock} title={t('passport.timeline')} />
          <ol className="relative space-y-4 border-l border-sage-200 pl-6">
            {profile.timeline.map((ev) => (
              <li key={ev.title} className="relative">
                <span className="absolute -left-[31px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-forest-600">
                  <Check className="h-3 w-3 text-white" />
                </span>
                <p className="text-sm font-bold text-charcoal-900">{ev.title}</p>
                <p className="text-xs text-charcoal-600">{ev.detail} · {formatDate(ev.date)}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-sage-200 bg-cream-50 px-5 py-3">
          <p className="text-[11px] text-charcoal-500">
            HunarSetu AI Skill Passport · Prototype document · Statuses: Self-reported, Learning completed,
            Assessed, Verified. Self-reported skills are never labelled as verified.
          </p>
        </div>
      </Card>

      <ProjectForm open={openProject} onClose={() => setOpenProject(false)} onSubmit={addProject} t={t} />
    </div>
  )
}
