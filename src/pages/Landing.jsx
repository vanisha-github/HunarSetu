import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Compass,
  Fingerprint,
  GraduationCap,
  Menu,
  Network,
  PlayCircle,
  Quote,
  Rocket,
  Route,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Logo from '../components/Logo.jsx'
import { LanguageToggle } from '../components/RoleSwitcher.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { useApp } from '../context/AppContext.jsx'
import { images } from '../data/images.js'

const JOURNEY = [
  { icon: Fingerprint, key: 'journey.discover', detail: 'Map interests, abilities and local resources with Opportunity DNA.' },
  { icon: Route, key: 'journey.learn', detail: 'Follow a personalised roadmap with practical, beginner-friendly modules.' },
  { icon: Compass, key: 'journey.build', detail: 'Create a real project that proves what you can do.' },
  { icon: BadgeCheck, key: 'journey.showcase', detail: 'Record it in a Skill Passport with clear verification statuses.' },
  { icon: Rocket, key: 'journey.grow', detail: 'Unlock opportunities, mentors and economic pathways.' },
]

const PILLARS = [
  {
    icon: Fingerprint,
    title: 'Opportunity DNA',
    text: 'Identifies possible pathways from interests, family expertise, local resources and aspirations.',
    tone: 'forest',
  },
  {
    icon: BadgeCheck,
    title: 'Dynamic Skill Passport',
    text: 'Records learning, projects and assessments with transparent verification statuses.',
    tone: 'saffron',
  },
  {
    icon: Trophy,
    title: 'Talent Discovery Network',
    text: 'Challenges and a proposed village-to-national pathway to find hidden talent.',
    tone: 'sage',
  },
  {
    icon: Network,
    title: 'Opportunity Network',
    text: 'Connects students to scholarships, training, mentors and entrepreneurship support.',
    tone: 'sky',
  },
]

export default function Landing() {
  const { t, setRole } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t('landing.pillars'), href: '#pillars' },
    { label: 'How it works', href: '#journey' },
    { label: 'For facilitators', href: '#facilitators' },
    { label: 'CSR impact', href: '#csr' },
  ]

  return (
    <div className="min-h-screen bg-cream-100">
      {/* ---------- Top navigation ---------- */}
      <header className="sticky top-0 z-40 border-b border-sage-200/70 bg-cream-100/85 backdrop-blur-md">
        <div className="container-x flex items-center gap-4 py-3">
          <Logo />
          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-charcoal-600 transition hover:bg-sage-100 hover:text-forest-800"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-3 sm:flex">
            <LanguageToggle />
            <Button variant="ghost" size="sm" to="/app/dashboard" icon={PlayCircle}>
              Open dashboard
            </Button>
            <Button size="sm" to="/app/dna" icon={Sparkles}>
              {t('landing.ctaPrimary')}
            </Button>
          </div>
          <button
            className="ml-auto rounded-xl border border-sage-200 bg-white p-2 text-charcoal-700 sm:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-sage-200 bg-cream-50 px-4 py-3 sm:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-charcoal-700 hover:bg-sage-100"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <Button to="/app/dna" icon={Sparkles} className="w-full">
                {t('landing.ctaPrimary')}
              </Button>
              <Button to="/app/opportunities" variant="secondary" className="w-full">
                {t('landing.ctaSecondary')}
              </Button>
              <LanguageToggle className="w-full justify-center" />
            </div>
          </div>
        )}
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-forest-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-saffron-100/60 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-white px-3.5 py-1.5 text-xs font-bold text-forest-700 shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-saffron-500" />
              Rural Education &amp; Economic Empowerment
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-charcoal-900 sm:text-5xl lg:text-6xl">
              {t('landing.heroTitle')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
              {t('landing.heroSubtitle')}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                to="/app/dna"
                icon={Sparkles}
                onClick={() => setRole('student')}
              >
                {t('landing.ctaPrimary')}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                to="/app/opportunities"
                iconRight={ArrowRight}
                onClick={() => setRole('student')}
              >
                {t('landing.ctaSecondary')}
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { value: '4 pillars', label: 'one connected journey' },
                { value: '6+ careers', label: 'with real projects' },
                { value: '100% demo', label: 'runs with no backend' },
              ].map((s) => (
                <div key={s.value}>
                  <p className="font-display text-xl font-semibold text-forest-800">{s.value}</p>
                  <p className="text-xs text-charcoal-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Layered image composition + passport preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: '120ms' }}>
            <div className="relative overflow-hidden rounded-3xl border border-white/70 shadow-lift">
              <SmartImage
                src={images.heroStudents}
                alt="Rural Indian students learning and working together"
                seed="hero-students"
                className="aspect-[4/3] w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/45 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/85 p-3 backdrop-blur">
                <img
                  src={images.teamworkField}
                  alt="Students collaborating in a field"
                  className="h-12 w-12 rounded-xl object-cover"
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden'
                  }}
                />
                <div>
                  <p className="text-sm font-bold text-charcoal-900">Village learning circles</p>
                  <p className="text-xs text-charcoal-600">Practical skills, built close to home</p>
                </div>
              </div>
            </div>

            {/* Skill Passport preview card */}
            <Card className="absolute -bottom-8 -left-4 hidden w-64 rotate-[-3deg] p-4 shadow-lift sm:block lg:-left-10">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-forest-600" />
                <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Skill Passport</p>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={images.studentPortrait}
                  alt="Aditi Kumari"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-forest-200"
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden'
                  }}
                />
                <div>
                  <p className="text-sm font-bold text-charcoal-900">Aditi Kumari</p>
                  <p className="text-[11px] text-charcoal-500">Class 11 · Bihar</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { label: 'Soil & moisture basics', tone: 'success' },
                  { label: 'Smartphone & agri-apps', tone: 'warning' },
                  { label: 'Problem solving', tone: 'info' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-medium text-charcoal-700">{s.label}</span>
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        s.tone === 'success'
                          ? 'bg-forest-500'
                          : s.tone === 'warning'
                            ? 'bg-saffron-400'
                            : 'bg-sky-400'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] font-medium text-charcoal-400">
                Self-reported · Assessed · Verified
              </p>
            </Card>

            <div className="absolute -right-3 -top-4 hidden rotate-3 rounded-2xl border border-sage-200 bg-white p-3 shadow-card sm:block">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-saffron-100 text-saffron-700">
                  <Star className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-charcoal-900">12-day streak</p>
                  <p className="text-[10px] text-charcoal-500">Keep growing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Journey ---------- */}
      <section id="journey" className="border-y border-sage-200 bg-white py-14 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-600">{t('landing.journey')}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal-900 sm:text-4xl">
              Discover → Learn → Build → Showcase → Grow
            </h2>
            <p className="mt-3 text-charcoal-600">
              One connected journey takes a student from hidden potential to a real, verified opportunity.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {JOURNEY.map((step, i) => {
              const Icon = step.icon
              return (
                <Card key={step.key} hover className="relative">
                  <span className="absolute right-4 top-4 font-display text-3xl font-semibold text-sage-200">
                    {i + 1}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-50 text-forest-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-charcoal-900">{t(step.key)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600">{step.detail}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- Pillars ---------- */}
      <section id="pillars" className="py-14 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-600">Platform</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal-900 sm:text-4xl">
              {t('landing.pillars')}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => {
              const Icon = p.icon
              const tones = {
                forest: 'bg-forest-50 text-forest-700',
                saffron: 'bg-saffron-50 text-saffron-700',
                sage: 'bg-sage-100 text-sage-700',
                sky: 'bg-sky-50 text-sky-700',
              }
              return (
                <Card key={p.title} hover className="p-6">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tones[p.tone]}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-charcoal-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{p.text}</p>
                  <Link
                    to="/app/dashboard"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 link-underline"
                  >
                    See it in the app <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- Hidden talent ---------- */}
      <section className="bg-forest-900 py-14 text-cream-100 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <SmartImage
              src={images.villageStudents}
              alt="Students in a rural village in India"
              seed="village-students"
              className="col-span-2 aspect-[16/9] w-full rounded-2xl ring-1 ring-white/10"
            />
            <SmartImage
              src={images.potentialKids}
              alt="Children exploring and learning"
              seed="potential-kids"
              className="aspect-square w-full rounded-2xl ring-1 ring-white/10"
            />
            <SmartImage
              src={images.artisan}
              alt="A local artisan at work"
              seed="local-artisan"
              className="aspect-square w-full rounded-2xl ring-1 ring-white/10"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-saffron-300">The opportunity gap</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cream-50 sm:text-4xl">
              {t('landing.hiddenTitle')}
            </h2>
            <p className="mt-4 leading-relaxed text-cream-200/90">
              Talent is evenly distributed, but access is not. Students in rural districts often have
              remarkable practical intelligence, family expertise and local resources — yet few ways to
              recognise and convert them into livelihood pathways.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Interest and ability are not the same as opportunity.',
                'Family expertise is an asset — never a limitation.',
                'Local resources become real projects and skills.',
                'Recognition turns practice into verified, shareable proof.',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-saffron-300" />
                  <span className="text-sm text-cream-100/90">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button variant="saffron" size="lg" to="/app/careers" icon={Compass}>
                Explore career pathways
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Facilitators ---------- */}
      <section id="facilitators" className="py-14 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-600">Facilitators</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 sm:text-4xl">
              {t('landing.facilitatorTitle')}
            </h2>
            <p className="mt-4 leading-relaxed text-charcoal-600">
              Teachers and community facilitators see every student in one place: learning progress,
              submitted projects and Skill Passport status. They guide, give feedback and verify
              practical work — turning effort into trusted proof.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Users, title: 'Cohort overview', text: 'Track progress across the whole class.' },
                { icon: BadgeCheck, title: 'Verify projects', text: 'Approve work or request changes.' },
                { icon: GraduationCap, title: 'Guide learning', text: 'Suggest the next module or challenge.' },
                { icon: TrendingUp, title: 'Spot talent', text: 'Nominate students up the pathway.' },
              ].map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-charcoal-900">{f.title}</p>
                      <p className="text-xs text-charcoal-600">{f.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-8">
              <Button
                to="/app/facilitator"
                variant="secondary"
                size="lg"
                icon={Users}
                onClick={() => setRole('facilitator')}
              >
                Open Facilitator Dashboard
              </Button>
            </div>
          </div>
          <div className="relative">
            <SmartImage
              src={images.teacherHelping}
              alt="A teacher helping students with practical learning"
              seed="teacher-helping"
              className="aspect-[4/3] w-full rounded-3xl shadow-lift"
            />
            <Card className="absolute -bottom-6 left-4 right-4 hidden items-center gap-4 p-4 sm:flex">
              <SmartImage
                src={images.mentorship}
                alt="Mentorship session"
                seed="mentorship"
                className="h-14 w-14 shrink-0 rounded-xl"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-charcoal-900">3 projects awaiting your review</p>
                <p className="text-xs text-charcoal-500">Verified work appears instantly in each Skill Passport.</p>
              </div>
              <Badge tone="warning">Review</Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------- CSR impact ---------- */}
      <section id="csr" className="border-y border-sage-200 bg-sage-50/60 py-14 sm:py-20">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: '2,480', label: 'Students enrolled (demo)', icon: GraduationCap },
                  { value: '1,915', label: 'Completed training (demo)', icon: CheckCircle2 },
                  { value: '1,240', label: 'Projects verified (demo)', icon: BadgeCheck },
                  { value: '₹48L', label: 'Stipends recorded (demo)', icon: TrendingUp },
                ].map((s) => {
                  const Icon = s.icon
                  return (
                    <Card key={s.label} className="p-5">
                      <Icon className="h-5 w-5 text-forest-600" />
                      <p className="mt-3 font-display text-3xl font-semibold text-charcoal-900">{s.value}</p>
                      <p className="text-xs text-charcoal-500">{s.label}</p>
                    </Card>
                  )
                })}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-600">CSR partners</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 sm:text-4xl">
                {t('landing.csrTitle')}
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal-600">
                Organisations that fund training can track enrolment, completion, verification and
                outcomes on one impact dashboard — so every rupee of support can be connected to a
                student's progress.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  to="/app/csr"
                  size="lg"
                  icon={Building2}
                  onClick={() => setRole('csr')}
                >
                  Explore CSR Impact
                </Button>
                <Button to="/app/opportunities" variant="secondary" size="lg" icon={Network}>
                  View Opportunity Network
                </Button>
              </div>
            </div>
          </div>

          <Card className="mt-12 flex flex-col items-start gap-5 border-forest-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <Quote className="h-8 w-8 shrink-0 text-saffron-400" />
              <div>
                <p className="text-base font-semibold text-charcoal-800">
                  "Every student deserves a bridge from what they know to what they can become."
                </p>
                <p className="mt-1 text-xs text-charcoal-500">HunarSetu AI — design principle</p>
              </div>
            </div>
            <Button to="/app/dashboard" icon={PlayCircle} variant="secondary">
              See the student dashboard
            </Button>
          </Card>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="bg-charcoal-950 py-12 text-cream-200">
        <div className="container-x">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo inverted />
              <p className="mt-4 max-w-xs text-sm text-cream-200/70">
                A rural talent-to-livelihood platform. Discover → Learn → Build → Showcase → Grow.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-cream-50">For students</p>
              <ul className="mt-3 space-y-2 text-sm text-cream-200/70">
                {[
                  ['Opportunity DNA', '/app/dna'],
                  ['Career Explorer', '/app/careers'],
                  ['Learning Roadmap', '/app/learning'],
                  ['Skill Passport', '/app/passport'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} className="link-underline hover:text-cream-50">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold text-cream-50">For partners</p>
              <ul className="mt-3 space-y-2 text-sm text-cream-200/70">
                {[
                  ['Facilitator Dashboard', '/app/facilitator'],
                  ['CSR Impact Dashboard', '/app/csr'],
                  ['Opportunity Network', '/app/opportunities'],
                  ['Talent Discovery', '/app/talent'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} className="link-underline hover:text-cream-50">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold text-cream-50">Prototype notes</p>
              <p className="mt-3 text-sm text-cream-200/70">
                Runs fully in the browser with no backend, no external AI API and no real
                applications. All people, programmes and figures are demo data.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream-200/60 sm:flex-row">
            <p>{t('landing.footerNote')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
