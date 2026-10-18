import { images } from './images'

// Demo challenges for Talent Discovery. All entries and scores are
// demonstration data for the prototype.

export const challengeCategories = ['All', 'Agriculture', 'Technology', 'Sustainability', 'Business', 'Craft', 'Community']

export const challenges = [
  {
    id: 'ch-1',
    title: 'Water-Smart Farm Design',
    category: 'Agriculture',
    difficulty: 'Beginner',
    points: 120,
    badge: 'Water Saver',
    deadline: '15 Feb 2026 (demo)',
    image: images.challenge6,
    summary: 'Design a simple plan to save water on a small farm.',
    instructions:
      'Describe a 1-acre plot and explain how you would reduce water use using drip or mulching. Include an estimate of water saved.',
  },
  {
    id: 'ch-2',
    title: 'Build a Village Info Page',
    category: 'Technology',
    difficulty: 'Beginner',
    points: 150,
    badge: 'First Builder',
    deadline: '20 Feb 2026 (demo)',
    image: images.challenge4,
    summary: 'Create a web page that shares useful information for your village.',
    instructions:
      'Build a single page listing local services, timings and contacts. Describe your page and how you would publish it.',
  },
  {
    id: 'ch-3',
    title: 'Solar for a School',
    category: 'Sustainability',
    difficulty: 'Intermediate',
    points: 180,
    badge: 'Sun Seeker',
    deadline: '28 Feb 2026 (demo)',
    image: images.challenge5,
    summary: 'Propose a rooftop solar idea for a village school.',
    instructions:
      'Estimate the school\'s electricity needs and suggest a solar size. Explain the benefits and one challenge.',
  },
  {
    id: 'ch-4',
    title: 'Local Product Marketing Plan',
    category: 'Business',
    difficulty: 'Beginner',
    points: 140,
    badge: 'Story Seller',
    deadline: '05 Mar 2026 (demo)',
    image: images.challenge2,
    summary: 'Create a one-week promotion plan for a local product.',
    instructions:
      'Pick a local product (honey, pottery, milk). Write the audience, three captions and the channels you would use.',
  },
  {
    id: 'ch-5',
    title: 'Upcycle a Craft Product',
    category: 'Craft',
    difficulty: 'Beginner',
    points: 110,
    badge: 'Craft Mind',
    deadline: '12 Mar 2026 (demo)',
    image: images.challenge3,
    summary: 'Create a new product from reused or local materials.',
    instructions:
      'Describe the material used, the product made, its price and who would buy it. Add a drawing or photo if you can.',
  },
  {
    id: 'ch-6',
    title: 'Community Problem Solver',
    category: 'Community',
    difficulty: 'Intermediate',
    points: 200,
    badge: 'Change Maker',
    deadline: '22 Mar 2026 (demo)',
    image: images.challenge1,
    summary: 'Solve one real problem in your community with a simple idea.',
    instructions:
      'Identify a local problem, propose a low-cost solution and explain how you would test it in one week.',
  },
]

// Demo leaderboard scores (illustration only).
export const leaderboard = [
  { rank: 1, name: 'Aditi Kumari', village: 'Bihar (demo)', points: 540, badges: 5 },
  { rank: 2, name: 'Rohan Meena', village: 'Rajasthan (demo)', points: 495, badges: 4 },
  { rank: 3, name: 'Priya Yadav', village: 'Bihar (demo)', points: 470, badges: 4 },
  { rank: 4, name: 'Imran Ali', village: 'West Bengal (demo)', points: 430, badges: 3 },
  { rank: 5, name: 'Sunita Devi', village: 'Jharkhand (demo)', points: 405, badges: 3 },
  { rank: 6, name: 'Kavya Nair', village: 'Kerala (demo)', points: 380, badges: 3 },
  { rank: 7, name: 'Arjun Patel', village: 'Gujarat (demo)', points: 355, badges: 2 },
]

export const talentPathway = [
  { level: 'Village', detail: 'Local challenge hosted by a teacher or facilitator' },
  { level: 'Block', detail: 'Top village entries move up for review' },
  { level: 'District', detail: 'Winners get mentorship and training' },
  { level: 'State', detail: 'Recognised talent receives advanced opportunities' },
  { level: 'National', detail: 'Showcase to partners and potential employers' },
]

export default challenges
