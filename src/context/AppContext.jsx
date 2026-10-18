import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { dictionary } from '../utils/i18n'
import { safeGet, safeSet } from '../utils/storage'
import { sampleStudent, submittedProjects as seedSubmissions } from '../data/students'
import buildRecommendationsDefault from '../utils/recommend'

const AppContext = createContext(null)

const KEYS = {
  role: 'hs.role',
  language: 'hs.language',
  profile: 'hs.profile',
  dnaAnswers: 'hs.dnaAnswers',
  dnaResult: 'hs.dnaResult',
  savedCareers: 'hs.savedCareers',
  moduleStatus: 'hs.moduleStatus',
  projects: 'hs.projects',
  oppStatus: 'hs.oppStatus',
  bookmarks: 'hs.bookmarks',
  submissions: 'hs.challengeSubmissions',
  submittedProjects: 'hs.submittedProjects',
}

const studentProjects = sampleStudent.projects.map((p, i) => ({
  ...p,
  passportProjectId: i === 2 ? 'sp-1' : undefined,
}))

export function AppProvider({ children }) {
  const [role, setRole] = useState(() => safeGet(KEYS.role, 'student'))
  const [language, setLanguage] = useState(() => safeGet(KEYS.language, 'en'))
  const [profile, setProfile] = useState(() => safeGet(KEYS.profile, sampleStudent))
  const [dnaAnswers, setDnaAnswers] = useState(() => safeGet(KEYS.dnaAnswers, null))
  const [dnaResult, setDnaResult] = useState(() => safeGet(KEYS.dnaResult, null))
  const [savedCareers, setSavedCareers] = useState(() => safeGet(KEYS.savedCareers, ['agri-tech']))
  const [moduleStatus, setModuleStatus] = useState(() => safeGet(KEYS.moduleStatus, { 'mod-1': true }))
  const [projects, setProjects] = useState(() => safeGet(KEYS.projects, studentProjects))
  const [oppStatus, setOppStatus] = useState(() => safeGet(KEYS.oppStatus, { 'opp-1': 'Saved' }))
  const [bookmarks, setBookmarks] = useState(() => safeGet(KEYS.bookmarks, ['opp-1']))
  const [submissions, setSubmissions] = useState(() => safeGet(KEYS.submissions, []))
  const [submittedProjects, setSubmittedProjects] = useState(() =>
    safeGet(KEYS.submittedProjects, seedSubmissions)
  )
  const [toasts, setToasts] = useState([])

  // --- persistence ---
  useEffect(() => {
    safeSet(KEYS.role, role)
  }, [role])
  useEffect(() => {
    safeSet(KEYS.language, language)
  }, [language])
  useEffect(() => {
    safeSet(KEYS.profile, profile)
  }, [profile])
  useEffect(() => {
    safeSet(KEYS.dnaAnswers, dnaAnswers)
  }, [dnaAnswers])
  useEffect(() => {
    safeSet(KEYS.dnaResult, dnaResult)
  }, [dnaResult])
  useEffect(() => {
    safeSet(KEYS.savedCareers, savedCareers)
  }, [savedCareers])
  useEffect(() => {
    safeSet(KEYS.moduleStatus, moduleStatus)
  }, [moduleStatus])
  useEffect(() => {
    safeSet(KEYS.projects, projects)
  }, [projects])
  useEffect(() => {
    safeSet(KEYS.oppStatus, oppStatus)
  }, [oppStatus])
  useEffect(() => {
    safeSet(KEYS.bookmarks, bookmarks)
  }, [bookmarks])
  useEffect(() => {
    safeSet(KEYS.submissions, submissions)
  }, [submissions])
  useEffect(() => {
    safeSet(KEYS.submittedProjects, submittedProjects)
  }, [submittedProjects])

  // --- language ---
  const t = useCallback(
    (key) => dictionary[language]?.[key] ?? dictionary.en[key] ?? key,
    [language]
  )
  const toggleLanguage = useCallback(() => {
    setLanguage((l) => (l === 'en' ? 'hi' : 'en'))
  }, [])

  // --- toasts ---
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3200)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // --- career saving ---
  const toggleSaveCareer = useCallback(
    (id) => {
      setSavedCareers((prev) => {
        const exists = prev.includes(id)
        const next = exists ? prev.filter((c) => c !== id) : [...prev, id]
        addToast(exists ? 'Pathway removed' : 'Pathway saved to your profile')
        return next
      })
    },
    [addToast]
  )

  // --- learning modules ---
  const toggleModule = useCallback(
    (id) => {
      setModuleStatus((prev) => {
        const next = { ...prev }
        if (next[id]) delete next[id]
        else next[id] = true
        return next
      })
    },
    []
  )

  // --- projects (student) ---
  const addProject = useCallback(
    (project) => {
      const id = `pr-${Date.now()}`
      const submissionId = `sp-${Date.now()}`
      const entry = {
        ...project,
        id,
        status: 'pending',
        date: new Date().toISOString().slice(0, 10),
        passportProjectId: submissionId,
      }
      setProjects((prev) => [entry, ...prev])
      setSubmittedProjects((prev) => [
        {
          id: submissionId,
          studentId: 'stu-aditi',
          student: profile.name,
          title: entry.title,
          category: entry.category,
          description: entry.description,
          skills: entry.skills,
          evidence: entry.evidence,
          date: entry.date,
          status: 'pending',
          passportProjectId: id,
        },
        ...prev,
      ])
      addToast('Project added to your Skill Passport')
    },
    [addToast, profile.name]
  )

  // --- facilitator review ---
  const reviewProject = useCallback(
    (submissionId, status) => {
      setSubmittedProjects((prev) =>
        prev.map((p) => (p.id === submissionId ? { ...p, status } : p))
      )
      const target = submittedProjects.find((p) => p.id === submissionId)
      const linkedId = target?.passportProjectId
      if (linkedId) {
        setProjects((prev) =>
          prev.map((p) => (p.id === linkedId ? { ...p, status } : p))
        )
      }
      addToast(status === 'verified' ? 'Project marked as verified' : 'Changes requested')
    },
    [addToast, submittedProjects]
  )

  // --- opportunities ---
  const setOpportunityStatus = useCallback((id, status) => {
    setOppStatus((prev) => ({ ...prev, [id]: status }))
  }, [])

  const toggleBookmark = useCallback(
    (id) => {
      setBookmarks((prev) => {
        const exists = prev.includes(id)
        addToast(exists ? 'Bookmark removed' : 'Opportunity bookmarked')
        return exists ? prev.filter((b) => b !== id) : [...prev, id]
      })
    },
    [addToast]
  )

  // --- challenge submissions ---
  const addChallengeSubmission = useCallback(
    (submission) => {
      setSubmissions((prev) => [
        { ...submission, id: `cs-${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
        ...prev,
      ])
    },
    []
  )

  // --- DNA ---
  const submitDna = useCallback(
    (answers) => {
      const result = buildRecommendationsDefault(answers)
      setDnaAnswers(answers)
      setDnaResult(result)
      setProfile((prev) => ({
        ...prev,
        name: answers.name || prev.name,
        education: answers.education || prev.education,
        location: answers.district || prev.location,
        interests: answers.interests?.length ? answers.interests : prev.interests,
        dnaComplete: true,
        dnaScore: 88,
      }))
      return result
    },
    []
  )

  const resetDemo = useCallback(() => {
    Object.values(KEYS).forEach((k) => {
      try {
        window.localStorage.removeItem(k)
      } catch {
        /* ignore */
      }
    })
    window.location.reload()
  }, [])

  const value = useMemo(
    () => ({
      role,
      setRole,
      language,
      setLanguage,
      toggleLanguage,
      t,
      profile,
      setProfile,
      dnaAnswers,
      dnaResult,
      submitDna,
      savedCareers,
      toggleSaveCareer,
      moduleStatus,
      toggleModule,
      projects,
      addProject,
      oppStatus,
      setOpportunityStatus,
      bookmarks,
      toggleBookmark,
      submissions,
      addChallengeSubmission,
      submittedProjects,
      reviewProject,
      toasts,
      addToast,
      removeToast,
      resetDemo,
    }),
    [
      role,
      language,
      toggleLanguage,
      t,
      profile,
      dnaAnswers,
      dnaResult,
      submitDna,
      savedCareers,
      toggleSaveCareer,
      moduleStatus,
      toggleModule,
      projects,
      addProject,
      oppStatus,
      setOpportunityStatus,
      bookmarks,
      toggleBookmark,
      submissions,
      addChallengeSubmission,
      submittedProjects,
      reviewProject,
      toasts,
      addToast,
      removeToast,
      resetDemo,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export default AppContext
