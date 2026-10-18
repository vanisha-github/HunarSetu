import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  BadgeCheck,
  Check,
  X,
  Eye,
  GraduationCap,
  FileText,
  Sparkles,
  Info,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import SmartImage from '../components/SmartImage.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { StatCard, SectionHeading } from '../components/StatCard.jsx'
import { SearchInput, FilterChips } from '../components/SearchFilter.jsx'
import { useApp } from '../context/AppContext.jsx'
import { cohortStudents, PROJECT_STATUS } from '../data/students.js'
import { images } from '../data/images.js'
import { formatDate } from '../utils/format.js'

export default function FacilitatorDashboard() {
  const { t, submittedProjects, reviewProject, projects } = useApp()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const [previewStudent, setPreviewStudent] = useState(null)

  const pending = submittedProjects.filter((p) => p.status === 'pending')
  const verified = submittedProjects.filter((p) => p.status === 'verified')
  const avgCompletion = Math.round(
    cohortStudents.reduce((sum, s) => sum + s.progress, 0) / cohortStudents.length
  )

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cohortStudents.filter((s) => {
      const matchQuery = !q || s.name.toLowerCase().includes(q) || s.village.toLowerCase().includes(q) || s.pathway.toLowerCase().includes(q)
      const matchFilter =
        filter === 'All' ||
        (filter === 'High progress' && s.progress >= 65) ||
        (filter === 'Needs support' && s.progress < 55) ||
        (filter === 'Pending review' && s.pending > 0)
      return matchQuery && matchFilter
    })
  }, [query, filter])

  const submissionsFor = (studentId) =>
    submittedProjects.filter((p) => p.studentId === studentId)

  const previewProjects = previewStudent
    ? previewStudent.id === 'stu-aditi'
      ? projects
      : submissionsFor(previewStudent.id).map((p) => ({ ...p, status: p.status }))
    : []

  return (
    <div>
      <PageHeader
        eyebrow="For facilitators"
        title={t('fac.title')}
        subtitle={t('fac.subtitle')}
        actions={<Badge tone="info" icon={Info}>Demo cohort · 6 students</Badge>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label={t('fac.totalStudents')} value={cohortStudents.length} hint="Across your classes" tone="forest" />
        <StatCard icon={ClipboardCheck} label={t('fac.awaitingReview')} value={pending.length} hint="Action needed" tone="saffron" />
        <StatCard icon={TrendingUp} label={t('fac.completion')} value={`${avgCompletion}%`} hint="Average learning progress" tone="sage" />
        <StatCard icon={BadgeCheck} label={t('fac.verified')} value={verified.length} hint="Approved so far" tone="sky" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Students table */}
        <div className="lg:col-span-2">
          <Card className="p-0">
            <div className="border-b border-sage-200 p-5">
              <SectionHeading icon={Users} title={t('fac.students')} className="mb-0" />
              <div className="mt-4 flex flex-col gap-3">
                <SearchInput value={query} onChange={setQuery} placeholder="Search students, villages, pathways…" />
                <FilterChips
                  options={['All', 'High progress', 'Needs support', 'Pending review']}
                  value={filter}
                  onChange={setFilter}
                  label="Filter"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-sage-200 text-xs uppercase tracking-wide text-charcoal-500">
                    <th className="px-5 py-3 font-bold">Student</th>
                    <th className="px-5 py-3 font-bold">Pathway</th>
                    <th className="px-5 py-3 font-bold">Progress</th>
                    <th className="px-5 py-3 font-bold">Projects</th>
                    <th className="px-5 py-3 font-bold">Status</th>
                    <th className="px-5 py-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="border-b border-sage-100 last:border-0 hover:bg-cream-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-100 text-xs font-bold text-forest-800">
                            {s.initials}
                          </span>
                          <div>
                            <p className="font-bold text-charcoal-900">{s.name}</p>
                            <p className="text-xs text-charcoal-500">{s.village} · {s.education}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-charcoal-700">{s.pathway}</td>
                      <td className="px-5 py-3">
                        <div className="w-28">
                          <ProgressBar value={s.progress} height="h-1.5" animate={false} />
                          <span className="text-xs text-charcoal-500">{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-charcoal-700">{s.projects}</td>
                      <td className="px-5 py-3">
                        {s.pending > 0 ? (
                          <Badge tone="warning">{s.pending} pending</Badge>
                        ) : (
                          <Badge tone="success">Up to date</Badge>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Button size="sm" variant="ghost" icon={Eye} onClick={() => setPreviewStudent(s)}>
                          Passport
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Review queue */}
        <div className="space-y-6">
          <Card>
            <SectionHeading icon={ClipboardCheck} title={t('fac.submissions')} />
            <div className="space-y-3">
              {pending.length === 0 && (
                <div className="rounded-xl border border-dashed border-sage-300 bg-sage-50 p-5 text-center">
                  <Check className="mx-auto h-6 w-6 text-forest-600" />
                  <p className="mt-2 text-sm font-semibold text-charcoal-700">All caught up!</p>
                  <p className="text-xs text-charcoal-500">No projects waiting for review.</p>
                </div>
              )}
              {pending.map((p) => (
                <div key={p.id} className="rounded-xl border border-sage-200 bg-white p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-charcoal-900">{p.title}</p>
                      <p className="text-xs text-charcoal-500">{p.student} · {formatDate(p.date)}</p>
                    </div>
                    <Badge tone="warning">Pending</Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-charcoal-600">{p.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" className="flex-1" icon={ClipboardCheck} onClick={() => setActive(p)}>
                      Review
                    </Button>
                    <Button size="sm" variant="success" icon={Check} onClick={() => reviewProject(p.id, 'verified')}>
                      Verify
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-forest-900 text-cream-100">
            <h3 className="flex items-center gap-2 text-sm font-bold text-cream-50">
              <Sparkles className="h-4 w-4 text-saffron-300" /> Why verification matters
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-cream-200/85">
              When you verify a project, the status updates instantly in the student's Skill Passport and
              contributes to the CSR impact dashboard. Effort becomes trusted proof.
            </p>
            <Button to="/app/csr" variant="saffron" size="sm" className="mt-3" iconRight={ArrowRight}>
              {t('csr.title')}
            </Button>
          </Card>

          <Card>
            <SectionHeading icon={GraduationCap} title="Verified recently" />
            <ul className="space-y-2">
              {verified.slice(0, 4).map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-xl border border-forest-200 bg-forest-50 px-3.5 py-2.5">
                  <Check className="h-4 w-4 shrink-0 text-forest-600" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-charcoal-800">{p.title}</p>
                    <p className="text-[11px] text-charcoal-500">{p.student}</p>
                  </div>
                </li>
              ))}
              {verified.length === 0 && <p className="text-sm text-charcoal-500">No verifications yet in this session.</p>}
            </ul>
          </Card>
        </div>
      </div>

      {/* Review modal */}
      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title="Review project submission"
        size="lg"
        footer={
          active && (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="danger" icon={X} onClick={() => { reviewProject(active.id, 'changes'); setActive(null) }}>
                {t('fac.requestChanges')}
              </Button>
              <Button icon={Check} onClick={() => { reviewProject(active.id, 'verified'); setActive(null) }}>
                {t('fac.approve')}
              </Button>
            </div>
          )
        }
      >
        {active && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">{active.category}</Badge>
              <Badge tone={PROJECT_STATUS[active.status]?.tone || 'warning'}>{PROJECT_STATUS[active.status]?.label || active.status}</Badge>
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal-900">{active.title}</h3>
              <p className="text-xs text-charcoal-500">
                Submitted by <span className="font-semibold text-charcoal-700">{active.student}</span> on {formatDate(active.date)}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-charcoal-700">{active.description}</p>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Skills demonstrated</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(active.skills || []).map((s) => (
                  <Badge key={s} tone="info">{s}</Badge>
                ))}
              </div>
            </div>
            {active.evidence && (
              <p className="text-sm text-charcoal-600">
                Evidence: <span className="font-semibold text-forest-700">{active.evidence}</span>
              </p>
            )}
            <div className="rounded-xl border border-saffron-200 bg-saffron-50 p-4 text-xs text-saffron-900">
              <Info className="mr-1.5 inline h-3.5 w-3.5" />
              Verifying marks the skill as <strong>Verified</strong> in the student's Skill Passport. Requesting changes
              asks the student to improve and resubmit.
            </div>
          </div>
        )}
      </Modal>

      {/* Passport preview modal */}
      <Modal
        open={Boolean(previewStudent)}
        onClose={() => setPreviewStudent(null)}
        title="Skill Passport preview"
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setPreviewStudent(null)}>{t('common.close')}</Button>
          </div>
        }
      >
        {previewStudent && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              {previewStudent.id === 'stu-aditi' ? (
                <img src={images.studentPortrait} alt={previewStudent.name} className="h-16 w-16 rounded-2xl object-cover" />
              ) : (
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-forest-100 font-display text-xl font-bold text-forest-800">
                  {previewStudent.initials}
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold text-charcoal-900">{previewStudent.name}</h3>
                <p className="text-sm text-charcoal-600">{previewStudent.education} · {previewStudent.village}</p>
                <p className="text-xs text-charcoal-500">Pathway: {previewStudent.pathway}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-sage-200 bg-cream-50 p-3 text-center">
                <p className="font-display text-2xl font-semibold text-charcoal-900">{previewStudent.progress}%</p>
                <p className="text-[11px] text-charcoal-500">Learning progress</p>
              </div>
              <div className="rounded-xl border border-sage-200 bg-cream-50 p-3 text-center">
                <p className="font-display text-2xl font-semibold text-charcoal-900">{previewStudent.projects}</p>
                <p className="text-[11px] text-charcoal-500">Projects</p>
              </div>
              <div className="rounded-xl border border-sage-200 bg-cream-50 p-3 text-center">
                <p className="font-display text-2xl font-semibold text-charcoal-900">{previewStudent.dna}</p>
                <p className="text-[11px] text-charcoal-500">Opportunity DNA</p>
              </div>
            </div>
            <div>
              <SectionHeading icon={FileText} title="Recorded work" />
              <div className="space-y-2">
                {previewProjects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl border border-sage-200 bg-white px-3.5 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-charcoal-800">{p.title}</p>
                      <p className="text-[11px] text-charcoal-500">{p.category}</p>
                    </div>
                    <Badge tone={PROJECT_STATUS[p.status]?.tone || 'neutral'}>
                      {PROJECT_STATUS[p.status]?.label || p.status}
                    </Badge>
                  </div>
                ))}
                {previewProjects.length === 0 && <p className="text-sm text-charcoal-500">No projects recorded yet.</p>}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
