import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Building2,
  GraduationCap,
  CheckCircle2,
  BadgeCheck,
  Wallet,
  TrendingUp,
  Printer,
  Info,
  Target,
  Flag,
  ArrowUpRight,
  Users,
  IndianRupee,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { StatCard, SectionHeading } from '../components/StatCard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { images } from '../data/images.js'

const completionData = [
  { month: 'Aug', enrolled: 320, completed: 90 },
  { month: 'Sep', enrolled: 780, completed: 290 },
  { month: 'Oct', enrolled: 1240, completed: 640 },
  { month: 'Nov', enrolled: 1720, completed: 1080 },
  { month: 'Dec', enrolled: 2120, completed: 1520 },
  { month: 'Jan', enrolled: 2480, completed: 1915 },
]

const verificationData = [
  { name: 'Agri-tech', verified: 420, pending: 90 },
  { name: 'Solar', verified: 280, pending: 60 },
  { name: 'Dairy', verified: 210, pending: 70 },
  { name: 'Digital', verified: 180, pending: 55 },
  { name: 'Craft', verified: 150, pending: 40 },
]

const participationData = [
  { name: 'Agriculture & Technology', value: 34, color: '#2c6842' },
  { name: 'Entrepreneurship', value: 26, color: '#3d8355' },
  { name: 'Energy & Environment', value: 18, color: '#fc8412' },
  { name: 'Technology', value: 14, color: '#83a992' },
  { name: 'Business & Media', value: 8, color: '#c24b09' },
]

const cohorts = [
  { name: 'Cohort A · Vaishali', enrolled: 420, completed: 356, progress: 85 },
  { name: 'Cohort B · Muzaffarpur', enrolled: 380, completed: 298, progress: 78 },
  { name: 'Cohort C · Kota', enrolled: 460, completed: 372, progress: 81 },
  { name: 'Cohort D · Ranchi', enrolled: 340, completed: 224, progress: 66 },
  { name: 'Cohort E · Palakkad', enrolled: 290, completed: 241, progress: 83 },
]

const funding = [
  { label: 'Learning content & devices', amount: 2200000, percent: 44 },
  { label: 'Facilitator stipends', amount: 1400000, percent: 28 },
  { label: 'Student scholarships', amount: 900000, percent: 18 },
  { label: 'Mentorship & events', amount: 500000, percent: 10 },
]

const milestones = [
  { label: 'Programme launch', date: 'Aug 2025', done: true, detail: 'Onboarded 12 facilitators across 5 districts.' },
  { label: '2,000 students enrolled', date: 'Dec 2025', done: true, detail: 'Reached the enrolment milestone ahead of plan.' },
  { label: '1,200 projects verified', date: 'Jan 2026', done: true, detail: 'Verification quality checks passed.' },
  { label: 'First placement fair', date: 'Mar 2026', done: false, detail: 'Connect trained students with employers.' },
  { label: '5,000 students target', date: 'Dec 2026', done: false, detail: 'Expand to 5 additional districts.' },
]

const outcomes = [
  { label: 'Skills assessed per student', value: '4.2', hint: 'Average across cohort' },
  { label: 'Projects per student', value: '2.6', hint: 'Practical work recorded' },
  { label: 'Learning hours per student', value: '38', hint: 'Average engagement' },
  { label: 'Facilitator satisfaction', value: '92%', hint: 'Demo survey result' },
]

const tooltipStyle = { borderRadius: 12, border: '1px solid #d1e0d6', fontSize: 12 }

export default function CSRImpact() {
  const { t } = useApp()

  const totalBudget = useMemo(() => funding.reduce((s, f) => s + f.amount, 0), [])
  const spent = 3800000
  const spentPercent = Math.round((spent / totalBudget) * 100)

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <div>
      <PageHeader
        eyebrow="For CSR partners"
        title={t('csr.title')}
        subtitle={t('csr.subtitle')}
        actions={
          <>
            <Badge tone="warning" icon={Info}>{t('common.demoData')}</Badge>
            <Button variant="secondary" icon={Printer} onClick={handlePrint}>
              {t('csr.export')}
            </Button>
          </>
        }
      />

      <Card className="mb-6 flex flex-col gap-4 border-forest-200 p-5 sm:flex-row sm:items-center">
        <SmartImage src={images.csrCare} alt="CSR programme partner" seed="csr-care" className="h-24 w-full rounded-2xl sm:w-48" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="success" icon={Building2}>Programme: Rural Skills Bridge (demo)</Badge>
            <Badge tone="neutral">FY 2025–26</Badge>
          </div>
          <h2 className="mt-2 font-display text-xl font-semibold text-charcoal-900">
            Connecting CSR funding to verifiable student outcomes
          </h2>
          <p className="mt-1 text-sm text-charcoal-600">
            Track enrolment, training completion, project verification and equity across districts — with
            every figure linked to a student's Skill Passport.
          </p>
        </div>
      </Card>

      <Card className="mb-6 border-saffron-200 bg-saffron-50 p-4">
        <p className="flex items-start gap-2 text-xs text-saffron-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          {t('csr.demoNotice')} No money transfers, escrow or payment processing is implemented. Figures are illustrative only.
        </p>
      </Card>

      {/* KPI cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={GraduationCap} label={t('csr.enrolled')} value="2,480" hint="+360 this month (demo)" tone="forest" />
        <StatCard icon={CheckCircle2} label={t('csr.completing')} value="1,915" hint="77% completion rate" tone="sage" />
        <StatCard icon={BadgeCheck} label={t('csr.verifiedProjects')} value="1,240" hint="Across 5 pathways" tone="sky" />
        <StatCard icon={Wallet} label={t('csr.stipends')} value="₹48L" hint="Recorded disbursements" tone="saffron" />
      </div>

      {/* Charts */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionHeading icon={TrendingUp} title="Training completion" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={completionData} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="enrolledFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#83a992" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#83a992" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="completedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2c6842" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#2c6842" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7efe9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#57574f' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#57574f' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="enrolled" stroke="#618d72" fill="url(#enrolledFill)" strokeWidth={2} name="Enrolled" />
                <Area type="monotone" dataKey="completed" stroke="#2c6842" fill="url(#completedFill)" strokeWidth={2} name="Completed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionHeading icon={Target} title="Programme participation" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={participationData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={78} paddingAngle={2}>
                  {participationData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1.5">
            {participationData.map((p) => (
              <li key={p.name} className="flex items-center gap-2 text-xs text-charcoal-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                <span className="flex-1">{p.name}</span>
                <span className="font-bold text-charcoal-800">{p.value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionHeading icon={BadgeCheck} title="Project verification" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={verificationData} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7efe9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#57574f' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#57574f' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="verified" stackId="a" fill="#2c6842" name="Verified" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pending" stackId="a" fill="#fc8412" name="Pending" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionHeading icon={Wallet} title={t('csr.budget')} />
          <div className="rounded-2xl border border-sage-200 bg-cream-50 p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Total programme budget</p>
                <p className="font-display text-3xl font-semibold text-charcoal-900">₹50,00,000</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Expenditure</p>
                <p className="font-display text-3xl font-semibold text-forest-700">₹38,00,000</p>
              </div>
            </div>
            <ProgressBar value={spentPercent} className="mt-3" height="h-2.5" />
            <p className="mt-1.5 text-xs text-charcoal-500">{spentPercent}% of budget utilised (demo)</p>
          </div>
          <ul className="mt-4 space-y-3">
            {funding.map((f) => (
              <li key={f.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-charcoal-700">{f.label}</span>
                  <span className="font-bold text-charcoal-900">₹{(f.amount / 100000).toFixed(1)}L</span>
                </div>
                <ProgressBar value={f.percent} height="h-1.5" className="mt-1.5" />
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-charcoal-500">
            <IndianRupee className="h-3.5 w-3.5" /> Funding allocation is illustrative demo data.
          </p>
        </Card>
      </div>

      {/* Cohort progress + milestones */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionHeading icon={Users} title={t('csr.cohorts')} />
          <div className="space-y-4">
            {cohorts.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-charcoal-700">{c.name}</span>
                  <span className="text-charcoal-500">{c.completed}/{c.enrolled} · {c.progress}%</span>
                </div>
                <ProgressBar value={c.progress} height="h-2" className="mt-1.5" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeading icon={Flag} title="Milestones" />
          <ol className="relative space-y-5 border-l border-sage-200 pl-6">
            {milestones.map((m) => (
              <li key={m.label} className="relative">
                <span
                  className={`absolute -left-[31px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white ${
                    m.done ? 'bg-forest-600' : 'bg-sage-300'
                  }`}
                >
                  {m.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-charcoal-900">{m.label}</p>
                  <Badge tone={m.done ? 'success' : 'neutral'}>{m.done ? 'Achieved' : 'Planned'}</Badge>
                  <span className="text-xs text-charcoal-500">{m.date}</span>
                </div>
                <p className="mt-0.5 text-xs text-charcoal-600">{m.detail}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {/* Outcomes */}
      <Card>
        <SectionHeading icon={ArrowUpRight} title={t('csr.outcomes')} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => (
            <div key={o.label} className="rounded-2xl border border-sage-200 bg-cream-50 p-4">
              <p className="font-display text-3xl font-semibold text-forest-800">{o.value}</p>
              <p className="mt-1 text-sm font-semibold text-charcoal-800">{o.label}</p>
              <p className="text-xs text-charcoal-500">{o.hint}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-forest-200 bg-forest-50 p-4">
          <p className="flex items-start gap-2 text-sm text-forest-900">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            Impact statistics summarise activity from the demo cohort. In a real deployment, these would be
            aggregated from verified Skill Passport records with partner-approved reporting rules.
          </p>
        </div>
      </Card>
    </div>
  )
}
