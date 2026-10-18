import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Fingerprint,
  Compass,
  Route,
  BadgeCheck,
  Trophy,
  Network,
  ArrowRight,
  Flame,
  MapPin,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Target,
  CalendarDays,
  Lightbulb,
  TrendingUp,
  Star,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import SmartImage from '../components/SmartImage.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { StatCard, SectionHeading } from '../components/StatCard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { modules } from '../data/courses.js'
import { careers, getCareer } from '../data/careers.js'
import { opportunities } from '../data/opportunities.js'
import { challenges } from '../data/challenges.js'
import { SKILL_STATUS, PROJECT_STATUS } from '../data/students.js'
import { images } from '../data/images.js'
import { formatDate } from '../utils/format.js'

export default function Dashboard() {
  const { profile, moduleStatus, projects, dnaResult, savedCareers, dnaAnswers, t } = useApp()

  const completedModules = Object.keys(moduleStatus).length
  const learningPercent = Math.round((completedModules / modules.length) * 100)

  const recommended = useMemo(() => {
    if (dnaResult?.length) return dnaResult.map((r) => r.career)
    const saved = savedCareers.map(getCareer).filter(Boolean)
    if (saved.length) return saved
    return [getCareer('agri-tech'), getCareer('web-dev'), getCareer('solar')]
  }, [dnaResult, savedCareers])

  const skillCounts = useMemo(() => {
    const counts = { verified: 0, assessed: 0, learning: 0, self_reported: 0 }
    profile.skills.forEach((s) => {
      counts[s.status] = (counts[s.status] || 0) + 1
    })
    return counts
  }, [profile.skills])

  const verifiedProjects = projects.filter((p) => p.status === 'verified').length
  const pendingProjects = projects.filter((p) => p.status === 'pending').length

  return (
    <div>
      {/* Greeting banner */}
      <div className="relative mb-6 overflow-hidden rounded-3xl border border-sage-200 bg-white shadow-soft">
        <SmartImage
          src={images.dashboardBanner}
          alt="Students learning together"
          seed="dashboard-banner"
          className="absolute inset-0 h-full w-full"
          imgClassName="opacity-100"
        />
        <div className="relative bg-gradient-to-r from-forest-900/95 via-forest-800/85 to-forest-700/45 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-cream-100/60 sm:h-20 sm:w-20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div>
                <p className="text-sm font-medium text-cream-200/90">{t('dash.greeting')} 👋</p>
                <h1 className="font-display text-2xl font-semibold text-cream-50 sm:text-3xl">
                  Namaste, {profile.name.split(' ')[0]}!
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cream-200/85">
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5" /> {profile.education}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {profile.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-saffron-300" /> {profile.streak}-day streak
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button to="/app/dna" variant="saffron" icon={Sparkles}>
                {t('dash.discoverSkills')}
              </Button>
              <Button to="/app/learning" variant="secondary" icon={BookOpen}>
                {t('dash.continueLearning')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Fingerprint} label={t('dash.dnaCompletion')} value={`${profile.dnaScore}%`} hint={dnaAnswers ? 'Personalised' : 'Demo profile'} tone="forest" />
        <StatCard icon={BookOpen} label={t('dash.learning')} value={`${learningPercent}%`} hint={`${completedModules}/${modules.length} modules`} tone="sage" />
        <StatCard icon={BadgeCheck} label="Verified projects" value={verifiedProjects} hint={`${pendingProjects} pending review`} tone="saffron" />
        <StatCard icon={Trophy} label="Achievements" value={profile.achievements.length} hint="Badges & recognition" tone="sky" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* DNA card */}
          <Card className="overflow-hidden p-0">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700">
                <Fingerprint className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-charcoal-900">{t('dash.dnaCompletion')}</h2>
                  <span className="text-sm font-bold text-forest-700">{profile.dnaScore}%</span>
                </div>
                <ProgressBar value={profile.dnaScore} className="mt-2" />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {profile.interests.map((i) => (
                    <Badge key={i} tone="neutral">
                      <Target className="h-3 w-3" /> {i}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button to={dnaResult ? '/app/dna' : '/app/dna'} variant="secondary" size="sm" iconRight={ArrowRight}>
                {dnaResult ? 'View DNA results' : 'Complete DNA'}
              </Button>
            </div>
          </Card>

          {/* Recommended pathways */}
          <div>
            <SectionHeading
              icon={Compass}
              title={t('dash.recommended')}
              action={
                <Link to="/app/careers" className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700 link-underline">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {recommended.slice(0, 3).map((career) => (
                <Card key={career.id} hover className="overflow-hidden p-0">
                  <SmartImage
                    src={career.image}
                    alt={career.title}
                    seed={career.id}
                    className="aspect-[16/10] w-full"
                  />
                  <div className="p-4">
                    <Badge tone="accent">{career.category}</Badge>
                    <h3 className="mt-2 text-sm font-bold leading-snug text-charcoal-900">{career.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-xs text-charcoal-600">{career.tagline}</p>
                    <Button to={`/app/careers/${career.id}`} size="sm" variant="ghost" className="mt-3 px-0 text-forest-700" iconRight={ArrowRight}>
                      {t('common.viewDetails')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Learning progress */}
          <Card>
            <SectionHeading
              icon={Route}
              title={t('dash.learning')}
              action={
                <Link to="/app/learning" className="text-sm font-semibold text-forest-700 link-underline">
                  Open roadmap
                </Link>
              }
            />
            <ProgressBar value={learningPercent} height="h-2.5" />
            <p className="mt-2 text-sm text-charcoal-600">
              {completedModules} of {modules.length} modules completed · keep your streak going.
            </p>
            <div className="mt-4 space-y-2">
              {modules.slice(0, 3).map((m) => {
                const done = Boolean(moduleStatus[m.id])
                return (
                  <div key={m.id} className="flex items-center gap-3 rounded-xl border border-sage-200 bg-cream-50 px-3.5 py-2.5">
                    <span className={`grid h-8 w-8 place-items-center rounded-lg ${done ? 'bg-forest-600 text-white' : 'bg-sage-200 text-charcoal-500'}`}>
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-charcoal-800">{m.title}</p>
                      <p className="text-xs text-charcoal-500">{m.pathwayLabel} · {m.level}</p>
                    </div>
                    <Badge tone={done ? 'success' : 'neutral'}>{done ? t('learning.completed') : m.level}</Badge>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Recommended opportunities */}
          <div>
            <SectionHeading
              icon={Network}
              title={t('dash.opportunities')}
              action={
                <Link to="/app/opportunities" className="text-sm font-semibold text-forest-700 link-underline">
                  View all
                </Link>
              }
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {opportunities.slice(0, 4).map((o) => (
                <Card key={o.id} hover className="flex items-start gap-3 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-saffron-50 text-saffron-700">
                    <Network className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-charcoal-900">{o.title}</p>
                    <p className="text-xs text-charcoal-500">{o.category} · {o.provider}</p>
                    {o.deadline && (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-charcoal-500">
                        <CalendarDays className="h-3 w-3" /> {o.deadline}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick actions */}
          <Card className="bg-forest-900 text-cream-100">
            <h2 className="flex items-center gap-2 text-base font-bold text-cream-50">
              <Sparkles className="h-5 w-5 text-saffron-300" /> {t('dash.quickActions')}
            </h2>
            <div className="mt-4 space-y-2.5">
              {[
                { to: '/app/dna', icon: Fingerprint, label: t('dash.discoverSkills') },
                { to: '/app/learning', icon: BookOpen, label: t('dash.continueLearning') },
                { to: '/app/passport', icon: BadgeCheck, label: t('dash.viewPassport') },
                { to: '/app/talent', icon: Trophy, label: 'Join a challenge' },
                { to: '/app/opportunities', icon: Network, label: 'Find an opportunity' },
              ].map((a) => {
                const Icon = a.icon
                return (
                  <Link
                    key={a.to}
                    to={a.to}
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-white/20"
                  >
                    <Icon className="h-4 w-4 text-saffron-200" />
                    <span className="flex-1">{a.label}</span>
                    <ArrowRight className="h-4 w-4 opacity-70" />
                  </Link>
                )
              })}
            </div>
          </Card>

          {/* Passport summary */}
          <Card>
            <SectionHeading
              icon={BadgeCheck}
              title={t('dash.passport')}
              action={
                <Link to="/app/passport" className="text-sm font-semibold text-forest-700 link-underline">
                  Open
                </Link>
              }
            />
            <div className="space-y-2.5">
              {Object.entries(SKILL_STATUS).map(([key, meta]) => (
                <div key={key} className="flex items-center justify-between">
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                  <span className="text-sm font-bold text-charcoal-800">{skillCounts[key] || 0}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-sage-200 bg-cream-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Selected pathway</p>
              <p className="mt-0.5 text-sm font-bold text-charcoal-900">
                {getCareer(profile.careerPath)?.title || 'Exploring'}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {projects.slice(0, 3).map((p) => (
                  <Badge key={p.id} tone={PROJECT_STATUS[p.status]?.tone || 'neutral'}>
                    {PROJECT_STATUS[p.status]?.label || p.status}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Upcoming competitions */}
          <Card>
            <SectionHeading icon={CalendarDays} title={t('dash.competitions')} />
            <div className="space-y-3">
              {challenges.slice(0, 3).map((c) => (
                <Link key={c.id} to="/app/talent" className="flex items-start gap-3 rounded-xl p-2 transition hover:bg-sage-50">
                  <SmartImage src={c.image} alt={c.title} seed={c.id} className="h-12 w-12 shrink-0 rounded-lg" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-charcoal-800">{c.title}</p>
                    <p className="text-xs text-charcoal-500">{c.category} · {c.deadline}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-saffron-700">
                      <Star className="h-3 w-3" /> {c.points} {t('talent.points')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Button to="/app/talent" variant="secondary" size="sm" className="mt-4 w-full" iconRight={ArrowRight}>
              {t('talent.challenges')}
            </Button>
          </Card>

          {/* Recent achievements */}
          <Card>
            <SectionHeading icon={TrendingUp} title={t('dash.achievements')} />
            <ol className="relative space-y-4 border-l border-sage-200 pl-5">
              {profile.achievements.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[26px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-saffron-400" />
                  <p className="text-sm font-semibold text-charcoal-800">{a.title}</p>
                  <p className="text-xs text-charcoal-500">{a.detail} · {formatDate(a.date)}</p>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="border-saffron-200 bg-saffron-50">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 shrink-0 text-saffron-600" />
              <div>
                <p className="text-sm font-bold text-saffron-900">Tip for Aditi</p>
                <p className="mt-1 text-xs text-saffron-800">
                  Add one project to your Skill Passport this week. Verified work unlocks more opportunities.
                </p>
                <Button to="/app/passport" variant="saffron" size="sm" className="mt-3" icon={BadgeCheck}>
                  {t('passport.addProject')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
