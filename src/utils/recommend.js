import { careers, getCareer } from '../data/careers'

// Rule-based recommendation engine. It weighs the student's interests,
// family context, local resources, strengths, learning goals and direction
// to suggest pathways. Results are always framed as possibilities.

const WEIGHTS = {
  interests: {
    Technology: { 'web-dev': 3, 'agri-tech': 2, 'digital-marketing': 1, solar: 1 },
    'Agriculture & farming': { 'agri-tech': 3, dairy: 2 },
    'Craft & design': { handicraft: 3, 'digital-marketing': 1 },
    'Business & selling': { dairy: 2, 'digital-marketing': 2, handicraft: 2 },
    'Teaching & helping': { 'digital-marketing': 1, 'agri-tech': 1 },
    'Health & care': { dairy: 1 },
    Sports: { 'digital-marketing': 1 },
    'Music & arts': { handicraft: 1, 'digital-marketing': 1 },
  },
  family: {
    Farming: { 'agri-tech': 3, dairy: 1 },
    'Dairy & livestock': { dairy: 3, 'agri-tech': 1 },
    'Small shop / business': { 'digital-marketing': 2, handicraft: 2 },
    'Handicraft / tailoring': { handicraft: 3 },
    'Construction / labour': { solar: 1 },
    'Service / job': { 'web-dev': 1 },
  },
  resources: {
    Farmland: { 'agri-tech': 2, dairy: 1 },
    Livestock: { dairy: 3 },
    'Smartphone & internet': { 'digital-marketing': 2, 'web-dev': 2 },
    'Computer / laptop': { 'web-dev': 3 },
    'Local market': { handicraft: 1, dairy: 1, 'digital-marketing': 1 },
    'Co-operative / SHG': { dairy: 2, handicraft: 1 },
    'Nearby training centre': { solar: 1, 'web-dev': 1 },
    'Solar / electricity': { solar: 3 },
  },
  subjects: {
    Science: { 'agri-tech': 2, solar: 2 },
    Mathematics: { 'web-dev': 2, 'agri-tech': 1 },
    'Social studies': { handicraft: 1, 'digital-marketing': 1 },
    Languages: { 'digital-marketing': 2, handicraft: 1 },
    Computers: { 'web-dev': 3, 'digital-marketing': 1 },
    'Arts & craft': { handicraft: 3 },
  },
  goals: {
    'Crop & irrigation': { 'agri-tech': 3 },
    'Animal care': { dairy: 3 },
    'Solar & electrical': { solar: 3 },
    Coding: { 'web-dev': 3 },
    'Design & video': { 'digital-marketing': 2, handicraft: 2 },
    'Marketing & sales': { 'digital-marketing': 3, handicraft: 1 },
    Accounting: { dairy: 1, handicraft: 1, 'digital-marketing': 1 },
    'Spoken English': { 'web-dev': 1, 'digital-marketing': 1 },
  },
  direction: {
    higher: { 'agri-tech': 1, solar: 1, 'web-dev': 1 },
    employment: { 'web-dev': 1, solar: 1, 'agri-tech': 1 },
    freelancing: { 'web-dev': 2, 'digital-marketing': 2, handicraft: 1 },
    entrepreneurship: { dairy: 2, handicraft: 2, 'digital-marketing': 1, 'agri-tech': 1 },
  },
}

function addScores(scores, map, selections) {
  const list = Array.isArray(selections) ? selections : [selections].filter(Boolean)
  list.forEach((key) => {
    const weights = map[key]
    if (!weights) return
    Object.entries(weights).forEach(([careerId, value]) => {
      scores[careerId] = (scores[careerId] || 0) + value
    })
  })
}

export function buildRecommendations(answers) {
  const scores = {}
  careers.forEach((c) => {
    scores[c.id] = 0
  })

  addScores(scores, WEIGHTS.interests, answers.interests)
  addScores(scores, WEIGHTS.family, answers.familyOccupation)
  addScores(scores, WEIGHTS.resources, answers.resources)
  addScores(scores, WEIGHTS.subjects, answers.subjects)
  addScores(scores, WEIGHTS.goals, answers.skillGoals)
  addScores(scores, WEIGHTS.direction, answers.direction)

  const ranked = Object.entries(scores)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score)

  const top = ranked.slice(0, 3)
  const maxScore = top[0]?.score || 1

  return top.map(({ id, score }, index) => {
    const career = getCareer(id)
    const confidence = Math.round(55 + (score / maxScore) * 40 - index * 6)
    return {
      career,
      score,
      match: Math.max(45, Math.min(97, confidence)),
      reasons: buildReasons(career, answers),
      skills: career.skills.slice(0, 4),
      project: career.project,
    }
  })
}

function buildReasons(career, answers) {
  const reasons = []
  const { interests = [], resources = [], subjects = [], skillGoals = [], familyOccupation, direction } = answers
  const id = career.id

  const interestHit = interests.find((i) => WEIGHTS.interests[i]?.[id])
  if (interestHit) reasons.push(`You said you enjoy ${interestHit.toLowerCase()}.`)
  const familyHit = familyOccupation && WEIGHTS.family[familyOccupation]?.[id]
  if (familyHit)
    reasons.push(
      `Your family background in ${familyOccupation.toLowerCase()} could be a helpful starting point — a possibility, never a limit.`
    )
  const resourceHit = resources.find((r) => WEIGHTS.resources[r]?.[id])
  if (resourceHit) reasons.push(`${resourceHit} is an accessible local resource you can build on.`)
  const subjectHit = subjects.find((s) => WEIGHTS.subjects[s]?.[id])
  if (subjectHit) reasons.push(`${subjectHit} is one of your strengths.`)
  const goalHit = skillGoals.find((g) => WEIGHTS.goals[g]?.[id])
  if (goalHit) reasons.push(`You want to learn ${goalHit.toLowerCase()}.`)
  if (direction && WEIGHTS.direction[direction]?.[id]) {
    const label = directionOptionsLabel(direction)
    reasons.push(`This aligns with your interest in ${label.toLowerCase()}.`)
  }
  if (reasons.length === 0) reasons.push('This pathway offers a broad set of beginner-friendly skills to explore.')
  return reasons.slice(0, 4)
}

function directionOptionsLabel(id) {
  const map = {
    higher: 'Higher education',
    employment: 'Employment',
    freelancing: 'Freelancing',
    entrepreneurship: 'Entrepreneurship',
  }
  return map[id] || id
}

// Dimension radar values derived from answers (0-100) for the DNA result view.
export function buildDimensionScores(answers) {
  const count = (arr) => (Array.isArray(arr) ? arr.length : arr ? 1 : 0)
  const family = Math.min(100, 40 + (answers.familyOccupation ? 35 : 0) + count(answers.interests) * 4)
  const resources = Math.min(100, 30 + count(answers.resources) * 12)
  const demand = Math.min(
    100,
    45 + count(answers.skillGoals) * 10 + (answers.direction ? 12 : 0)
  )
  const personal = Math.min(100, 35 + count(answers.subjects) * 9 + count(answers.interests) * 6)
  return [
    { dimension: 'Family expertise', value: family },
    { dimension: 'Local resources', value: resources },
    { dimension: 'Regional demand', value: demand },
    { dimension: 'Interests & abilities', value: personal },
  ]
}

export function dnaCompletion(answers) {
  const checks = [
    Boolean(answers.name),
    Boolean(answers.education),
    Boolean(answers.district),
    count(answers.interests) > 0,
    Boolean(answers.familyOccupation),
    count(answers.resources) > 0,
    count(answers.subjects) > 0,
    count(answers.skillGoals) > 0,
    Boolean(answers.direction),
  ]
  const done = checks.filter(Boolean).length
  return Math.round((done / checks.length) * 100)
}

function count(v) {
  return Array.isArray(v) ? v.length : v ? 1 : 0
}

export default buildRecommendations
