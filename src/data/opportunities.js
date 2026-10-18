import { images } from './images'

// Illustrative opportunity catalogue for the prototype.
// All entries are DEMO DATA. They are not official programmes and no
// application is submitted to any real organisation.

export const opportunityCategories = [
  'All',
  'Scholarship',
  'Vocational Training',
  'Competition',
  'Mentorship',
  'Apprenticeship',
  'Internship',
  'Entrepreneurship Support',
]

export const opportunities = [
  {
    id: 'opp-1',
    title: 'Bright Futures Rural Scholarship',
    category: 'Scholarship',
    provider: 'Demo Education Foundation',
    location: 'All India (rural focus)',
    eligibility: 'Class 9–12 students',
    benefits: '₹15,000 annual study grant + mentorship',
    deadline: '31 Mar 2026 (demo)',
    image: images.scholarship,
    status: 'demo',
    description:
      'A demo scholarship for rural students with strong curiosity and a clear learning goal. Presented to show how scholarships could appear in the platform.',
    instructions:
      'Prepare a short note on your goals and a reference from a teacher. In this prototype, use the "Interested" button to track it.',
  },
  {
    id: 'opp-2',
    title: 'Solar Technician Vocational Programme',
    category: 'Vocational Training',
    provider: 'Demo Skill Mission',
    location: 'Patna & district centres',
    eligibility: 'Class 10 and above',
    benefits: '6-week certified training + tool kit',
    deadline: 'Rolling admissions (demo)',
    image: images.vocational,
    status: 'demo',
    description:
      'Hands-on training in solar panel installation and maintenance aimed at entry-level technician roles.',
    instructions: 'Attend a local counselling session. Track your interest here in the prototype.',
  },
  {
    id: 'opp-3',
    title: 'Young Innovators Challenge',
    category: 'Competition',
    provider: 'Demo Innovation Council',
    location: 'Village → District → State',
    eligibility: 'Age 13–19',
    benefits: 'Prizes, certificates and a mentor call',
    deadline: '15 Feb 2026 (demo)',
    image: images.competition,
    status: 'demo',
    description:
      'A multi-round idea challenge where students solve a local problem and progress from village to district level.',
    instructions: 'Submit a two-minute video or a written idea. Use Talent Discovery to practise.',
  },
  {
    id: 'opp-4',
    title: 'Agriculture Mentor Match',
    category: 'Mentorship',
    provider: 'Demo Agri Network',
    location: 'Online + monthly field visits',
    eligibility: 'Any student interested in farming',
    benefits: '1:1 mentor for 3 months',
    deadline: 'Open (demo)',
    status: 'demo',
    description:
      'Get paired with an experienced agriculture professional who guides a small student project.',
    instructions: 'Share your interest area. A mentor is matched in this demo flow.',
  },
  {
    id: 'opp-5',
    title: 'Rural Digital Apprenticeship',
    category: 'Apprenticeship',
    provider: 'Demo Tech Collective',
    location: 'Remote + district hub',
    eligibility: 'Class 11+ with basic computer skills',
    benefits: 'Stipend + real project experience',
    deadline: '20 Jan 2026 (demo)',
    image: images.apprenticeship,
    status: 'demo',
    description:
      'A paid apprenticeship where students assist on real website and data projects while learning.',
    instructions: 'Show a small portfolio of practice work. Track your interest in the prototype.',
  },
  {
    id: 'opp-6',
    title: 'Community Health Internship',
    category: 'Internship',
    provider: 'Demo Health Trust',
    location: 'District primary centres',
    eligibility: 'Class 12 students',
    benefits: 'Certificate + field experience',
    deadline: '28 Feb 2026 (demo)',
    image: images.internship,
    status: 'demo',
    description:
      'A short internship supporting health camps and awareness drives in local communities.',
    instructions: 'Requires parental consent. Track your interest in the prototype.',
  },
  {
    id: 'opp-7',
    title: 'Micro-Enterprise Seed Support',
    category: 'Entrepreneurship Support',
    provider: 'Demo Livelihood Fund',
    location: 'State-wide (rural)',
    eligibility: 'Age 18+ or with a guardian',
    benefits: 'Seed grant of ₹10,000 + business mentoring',
    deadline: '30 Apr 2026 (demo)',
    image: images.entrepreneurship,
    status: 'demo',
    description:
      'Support for young entrepreneurs to start a small dairy, craft or agri venture with mentoring.',
    instructions: 'Present a one-page business idea. Track your interest in the prototype.',
  },
  {
    id: 'opp-8',
    title: 'Digital Skills Scholarship',
    category: 'Scholarship',
    provider: 'Demo Digital Academy',
    location: 'Online',
    eligibility: 'Class 10–12',
    benefits: 'Free access to a 3-month digital course',
    deadline: '10 Mar 2026 (demo)',
    status: 'demo',
    description:
      'A scholarship covering online training in digital marketing, design or web basics.',
    instructions: 'Complete a short aptitude form. Track your interest here in the prototype.',
  },
  {
    id: 'opp-9',
    title: 'Artisan E-commerce Bootcamp',
    category: 'Vocational Training',
    provider: 'Demo Craft Collective',
    location: 'District craft hub',
    eligibility: 'Artisans and students 15+',
    benefits: 'Listing setup + photography support',
    deadline: '05 Mar 2026 (demo)',
    image: images.handicraft,
    status: 'demo',
    description:
      'A bootcamp that helps craftspeople photograph, price and list products on online marketplaces.',
    instructions: 'Bring 3 handmade samples. Track your interest in the prototype.',
  },
  {
    id: 'opp-10',
    title: 'Youth Coding Competition',
    category: 'Competition',
    provider: 'Demo Coders Guild',
    location: 'Online + regional finals',
    eligibility: 'Age 14–19',
    benefits: 'Laptop prize + internship interview',
    deadline: '18 Feb 2026 (demo)',
    image: images.code,
    status: 'demo',
    description:
      'Solve beginner-friendly coding puzzles and build a small app in teams.',
    instructions: 'Register as a team of two. Practise submissions in Talent Discovery.',
  },
  {
    id: 'opp-11',
    title: 'Women in Agriculture Fellowship',
    category: 'Mentorship',
    provider: 'Demo Kisan Circle',
    location: 'Bihar, UP, MP',
    eligibility: 'Girl students Class 11+',
    benefits: 'Fellowship + field mentor + certificate',
    deadline: '12 Mar 2026 (demo)',
    image: images.agriBusiness,
    status: 'demo',
    description:
      'A supportive fellowship that helps girl students explore agri-tech and agri-business pathways.',
    instructions: 'Write a short motivation note. Track your interest in the prototype.',
  },
  {
    id: 'opp-12',
    title: 'First Business Grant (Students)',
    category: 'Entrepreneurship Support',
    provider: 'Demo Start-up Cell',
    location: 'State-wide',
    eligibility: 'Age 16+ with a guardian co-signer',
    benefits: '₹25,000 starter grant + mentoring',
    deadline: '25 Apr 2026 (demo)',
    image: images.funding,
    status: 'demo',
    description:
      'A starter grant for student-run micro businesses with a monthly mentoring check-in.',
    instructions: 'Submit a one-page plan. Track your interest in the prototype.',
  },
]

export const APPLICATION_STATUSES = ['None', 'Saved', 'Interested', 'Applied']

export default opportunities
