// Opportunity DNA questionnaire options. Kept in one place so the
// questionnaire and the recommendation rules always agree.

export const educationLevels = [
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'ITI / Diploma',
  'Graduate',
  'Out of school',
]

export const interestOptions = [
  'Technology',
  'Agriculture & farming',
  'Craft & design',
  'Business & selling',
  'Teaching & helping',
  'Health & care',
  'Sports',
  'Music & arts',
]

export const familyOccupationOptions = [
  'Farming',
  'Dairy & livestock',
  'Small shop / business',
  'Handicraft / tailoring',
  'Construction / labour',
  'Service / job',
  'None / other',
]

export const resourceOptions = [
  'Farmland',
  'Livestock',
  'Smartphone & internet',
  'Computer / laptop',
  'Local market',
  'Co-operative / SHG',
  'Nearby training centre',
  'Solar / electricity',
]

export const subjectOptions = [
  'Science',
  'Mathematics',
  'Social studies',
  'Languages',
  'Computers',
  'Arts & craft',
]

export const skillGoalOptions = [
  'Crop & irrigation',
  'Animal care',
  'Solar & electrical',
  'Coding',
  'Design & video',
  'Marketing & sales',
  'Accounting',
  'Spoken English',
]

export const directionOptions = [
  { id: 'higher', label: 'Higher education', hint: 'Continue studying after school' },
  { id: 'employment', label: 'Employment', hint: 'Find a good job' },
  { id: 'freelancing', label: 'Freelancing', hint: 'Work independently online' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', hint: 'Start my own venture' },
]

export const emptyDna = {
  name: '',
  education: '',
  district: '',
  interests: [],
  familyOccupation: '',
  resources: [],
  subjects: [],
  skillGoals: [],
  direction: '',
}
