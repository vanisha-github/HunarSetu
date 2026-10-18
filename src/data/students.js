import { images } from './images'

// Shared demo dataset. Aditi Kumari is the central fictional student used
// throughout the application. All names, schools and data are illustrative.

export const SKILL_STATUS = {
  self_reported: { label: 'Self-reported', tone: 'neutral' },
  learning: { label: 'Learning completed', tone: 'info' },
  assessed: { label: 'Assessed', tone: 'warning' },
  verified: { label: 'Verified', tone: 'success' },
}

export const PROJECT_STATUS = {
  pending: { label: 'Pending review', tone: 'warning' },
  changes: { label: 'Changes requested', tone: 'danger' },
  verified: { label: 'Verified', tone: 'success' },
}

export const sampleStudent = {
  id: 'stu-aditi',
  name: 'Aditi Kumari',
  initials: 'AK',
  education: 'Class 11',
  stream: 'Science',
  location: 'Vaishali district, Bihar',
  school: 'Govt. Sr. Sec. School, Lalganj (demo)',
  avatar: images.studentPortrait,
  interests: ['Technology', 'Agriculture', 'Problem solving'],
  goal: 'Develop practical skills and explore future opportunities',
  dnaComplete: true,
  dnaScore: 82,
  careerPath: 'agri-tech',
  joined: 'Jan 2026',
  streak: 12,
  skills: [
    { id: 'sk-1', name: 'Soil & moisture basics', status: 'verified', level: 'Practical' },
    { id: 'sk-2', name: 'Smartphone & agri-apps', status: 'assessed', level: 'Working' },
    { id: 'sk-3', name: 'Field data recording', status: 'learning', level: 'Foundation' },
    { id: 'sk-4', name: 'Problem solving', status: 'assessed', level: 'Working' },
    { id: 'sk-5', name: 'Drip irrigation planning', status: 'self_reported', level: 'Foundation' },
    { id: 'sk-6', name: 'Communication in Hindi', status: 'self_reported', level: 'Working' },
  ],
  projects: [
    {
      id: 'pr-1',
      title: 'Drip Plan for a 1-Acre Plot',
      description:
        'Mapped a one-acre vegetable plot and designed a low-cost drip layout, estimating weekly water savings.',
      category: 'Agriculture',
      skills: ['Drip irrigation planning', 'Field data recording'],
      evidence: '',
      status: 'verified',
      date: '2026-01-18',
    },
    {
      id: 'pr-2',
      title: 'Soil Test Journal',
      description:
        'Recorded texture, colour and drainage for three soil samples across the village over two weeks.',
      category: 'Science',
      skills: ['Soil & moisture basics', 'Field data recording'],
      evidence: '',
      status: 'assessed',
      date: '2026-01-05',
    },
    {
      id: 'pr-3',
      title: 'Village Water Source Report',
      description:
        'Surveyed five water sources in the village and noted seasonal availability and quality concerns.',
      category: 'Community',
      skills: ['Field data recording', 'Problem solving'],
      evidence: '',
      status: 'pending',
      date: '2026-02-02',
    },
  ],
  achievements: [
    { id: 'ac-1', title: 'Water Saver Badge', detail: 'Water-Smart Farm Design challenge', date: '2026-01-22', tone: 'success' },
    { id: 'ac-2', title: 'Learning Streak · 12 days', detail: 'Consistent daily learning', date: '2026-02-05', tone: 'info' },
    { id: 'ac-3', title: 'Top 10 · District Round', detail: 'Young Innovators Challenge (demo)', date: '2026-01-30', tone: 'warning' },
  ],
  competitions: [
    { id: 'cp-1', title: 'Water-Smart Farm Design', result: 'Submitted', date: '2026-01-22' },
    { id: 'cp-2', title: 'Young Innovators Challenge', result: 'District Round', date: '2026-01-30' },
  ],
  certificates: [
    { id: 'ce-1', title: 'Smart Irrigation Basics', issuer: 'HunarSetu Learning (demo)', date: '2026-01-20' },
  ],
  timeline: [
    { date: '2026-01-02', title: 'Joined HunarSetu AI', detail: 'Completed Opportunity DNA' },
    { date: '2026-01-05', title: 'First project recorded', detail: 'Soil Test Journal' },
    { date: '2026-01-18', title: 'Drip plan verified', detail: 'Verified by facilitator' },
    { date: '2026-01-22', title: 'Won Water Saver badge', detail: 'Talent Discovery challenge' },
    { date: '2026-02-02', title: 'Submitted water report', detail: 'Awaiting facilitator review' },
  ],
}

// Additional demo students for the Facilitator dashboard.
export const cohortStudents = [
  {
    id: 'stu-aditi',
    name: 'Aditi Kumari',
    initials: 'AK',
    education: 'Class 11',
    village: 'Vaishali, Bihar',
    progress: 68,
    dna: 'Complete',
    pathway: 'Agricultural Technology',
    projects: 3,
    pending: 1,
    lastActive: 'Today',
  },
  {
    id: 'stu-rohan',
    name: 'Rohan Meena',
    initials: 'RM',
    education: 'Class 12',
    village: 'Kota, Rajasthan',
    progress: 74,
    dna: 'Complete',
    pathway: 'Solar Energy Technician',
    projects: 4,
    pending: 1,
    lastActive: 'Yesterday',
  },
  {
    id: 'stu-priya',
    name: 'Priya Yadav',
    initials: 'PY',
    education: 'Class 11',
    village: 'Muzaffarpur, Bihar',
    progress: 55,
    dna: 'Complete',
    pathway: 'Dairy & Agri-business',
    projects: 2,
    pending: 0,
    lastActive: '2 days ago',
  },
  {
    id: 'stu-imran',
    name: 'Imran Ali',
    initials: 'IA',
    education: 'Class 10',
    village: 'Murshidabad, West Bengal',
    progress: 41,
    dna: 'In progress',
    pathway: 'Web Developer',
    projects: 1,
    pending: 1,
    lastActive: '3 days ago',
  },
  {
    id: 'stu-sunita',
    name: 'Sunita Devi',
    initials: 'SD',
    education: 'Class 11',
    village: 'Ranchi, Jharkhand',
    progress: 63,
    dna: 'Complete',
    pathway: 'Handicraft & E-commerce',
    projects: 2,
    pending: 0,
    lastActive: 'Today',
  },
  {
    id: 'stu-kavya',
    name: 'Kavya Nair',
    initials: 'KN',
    education: 'Class 12',
    village: 'Palakkad, Kerala',
    progress: 80,
    dna: 'Complete',
    pathway: 'Digital Marketing',
    projects: 3,
    pending: 1,
    lastActive: 'Today',
  },
]

// Projects submitted by cohort students that a facilitator can review.
export const submittedProjects = [
  {
    id: 'sp-1',
    studentId: 'stu-aditi',
    student: 'Aditi Kumari',
    title: 'Village Water Source Report',
    category: 'Community',
    description:
      'Surveyed five water sources in the village and noted seasonal availability and quality concerns.',
    skills: ['Field data recording', 'Problem solving'],
    evidence: '',
    date: '2026-02-02',
    status: 'pending',
  },
  {
    id: 'sp-2',
    studentId: 'stu-rohan',
    student: 'Rohan Meena',
    title: 'Solar Sizing for a Home',
    category: 'Energy',
    description:
      'Estimated monthly electricity use for a two-room home and recommended a 1 kW rooftop solar setup.',
    skills: ['Solar panel installation', 'Site survey'],
    evidence: '',
    date: '2026-02-01',
    status: 'pending',
  },
  {
    id: 'sp-3',
    studentId: 'stu-kavya',
    student: 'Kavya Nair',
    title: 'Honey Seller Campaign',
    category: 'Business',
    description:
      'Planned a one-week social media campaign for a local honey seller with captions and audiences.',
    skills: ['Social media management', 'Content & copywriting'],
    evidence: '',
    date: '2026-01-30',
    status: 'pending',
  },
  {
    id: 'sp-4',
    studentId: 'stu-imran',
    student: 'Imran Ali',
    title: 'My First Web Page',
    category: 'Technology',
    description:
      'Built a personal introduction page with headings, colours and a photo using HTML and CSS.',
    skills: ['HTML & CSS', 'Responsive design'],
    evidence: '',
    date: '2026-01-28',
    status: 'pending',
  },
]

export default sampleStudent
