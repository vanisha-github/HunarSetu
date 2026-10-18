import { images } from './images'

// Career pathway catalogue. Each pathway has beginner-friendly framing so the
// prototype communicates possibilities, never fixed decisions.

export const careers = [
  {
    id: 'agri-tech',
    title: 'Agricultural Technology Specialist',
    tagline: 'Use data, sensors and smart tools to grow more with less.',
    category: 'Agriculture & Technology',
    image: images.agriTech,
    description:
      'Agricultural technology specialists help farms make better decisions using soil sensors, weather data, drip irrigation and simple mobile apps. In a rural district this role bridges everyday farming knowledge with accessible technology.',
    beginnerSkills: ['Basic smartphone use', 'Understanding soil & water', 'Spreadsheet basics', 'Problem solving'],
    skills: [
      'Soil & moisture measurement',
      'Drip / sprinkler irrigation planning',
      'Reading weather & crop data',
      'Mobile agri-apps',
      'Basic data recording',
      'Farmer communication',
    ],
    salaryRange: '₹18,000 – ₹35,000 / month (entry, illustrative)',
    demand: 'Growing in Bihar, UP and MP agri-clusters',
    project:
      'Design a low-cost drip watering plan for a 1-acre vegetable plot and estimate the water saved each week.',
    duration: '4–6 months to entry-level readiness',
    roadmap: [
      { title: 'Foundations of soil, water and crops', duration: '3 weeks', objective: 'Understand what plants need and how water moves through soil.' },
      { title: 'Smart irrigation basics', duration: '4 weeks', objective: 'Plan drip and sprinkler systems for small plots.' },
      { title: 'Agri-apps and data recording', duration: '3 weeks', objective: 'Log field observations and read simple dashboards.' },
      { title: 'Field project & farmer interview', duration: '4 weeks', objective: 'Apply learning on a real field and present findings.' },
    ],
    relatedOpportunities: ['Solar Energy Technician', 'Dairy & Agri-business Entrepreneur', 'Soil Health Training'],
    simulation: 'agri',
  },
  {
    id: 'dairy',
    title: 'Dairy & Agri-business Entrepreneur',
    tagline: 'Turn livestock, milk and local produce into a steady livelihood.',
    category: 'Entrepreneurship',
    image: images.dairy,
    description:
      'Dairy and agri-business entrepreneurs run small, profitable ventures — from milk collection and value-added products to selling local produce. They combine animal care, record keeping and customer relationships.',
    beginnerSkills: ['Animal care basics', 'Simple accounting', 'Customer service', 'Local logistics'],
    skills: [
      'Milk handling & hygiene',
      'Feed and cattle management',
      'Cost & margin calculation',
      'Local marketing',
      'Basic bookkeeping',
      'Co-operative networking',
    ],
    salaryRange: '₹15,000 – ₹45,000 / month (varies with scale)',
    demand: 'Consistent demand with strong dairy co-operatives',
    project:
      'Create a one-month budget for a 3-cow dairy unit, including feed, veterinary and expected milk income.',
    duration: '3–5 months to start a small unit',
    roadmap: [
      { title: 'Animal health & hygiene', duration: '3 weeks', objective: 'Learn feeding, cleaning and common cattle care.' },
      { title: 'Milk handling & quality', duration: '2 weeks', objective: 'Handle, chill and test milk for better prices.' },
      { title: 'Costing and pricing', duration: '3 weeks', objective: 'Work out true cost and a fair selling price.' },
      { title: 'Mini venture plan', duration: '4 weeks', objective: 'Draft and pitch a small dairy business plan.' },
    ],
    relatedOpportunities: ['Animal Husbandry Mentorship', 'Dairy Co-operative Internship', 'Micro-enterprise Grant'],
    simulation: null,
  },
  {
    id: 'solar',
    title: 'Solar Energy Technician',
    tagline: 'Install and maintain clean energy for homes, farms and schools.',
    category: 'Energy & Environment',
    image: images.solar,
    description:
      'Solar technicians install and service solar panels, pumps and small lighting systems. As villages adopt solar pumps and rooftop systems, skilled technicians are in high demand locally.',
    beginnerSkills: ['Basic electricity safety', 'Using hand tools', 'Measurement', 'Teamwork'],
    skills: [
      'Solar panel installation',
      'Wiring & safety',
      'Battery & inverter basics',
      'Solar pump maintenance',
      'Fault finding',
      'Site survey',
    ],
    salaryRange: '₹16,000 – ₹30,000 / month (entry, illustrative)',
    demand: 'Rising with rural solar pump and rooftop schemes',
    project:
      'Survey one home and recommend a rooftop solar size that covers its monthly electricity need.',
    duration: '3–6 months with a vocational certificate',
    roadmap: [
      { title: 'Electricity & safety foundations', duration: '3 weeks', objective: 'Work safely with low-voltage systems and tools.' },
      { title: 'Solar panel & mounting', duration: '4 weeks', objective: 'Assemble and mount a small solar array correctly.' },
      { title: 'Battery, inverter and pump basics', duration: '4 weeks', objective: 'Connect and troubleshoot a basic solar pump.' },
      { title: 'On-site apprenticeship', duration: '4 weeks', objective: 'Shadow a technician on a live installation.' },
    ],
    relatedOpportunities: ['Solar Installer Apprenticeship', 'Vocational ITI Program', 'Green Skills Scholarship'],
    simulation: null,
  },
  {
    id: 'web-dev',
    title: 'Web Developer',
    tagline: 'Build the websites and apps that local businesses need.',
    category: 'Technology',
    image: images.webDev,
    description:
      'Web developers build and maintain websites and web apps. For a student with a laptop and internet access, this is a portable, location-independent skill that can start with small local clients.',
    beginnerSkills: ['Typing & computer basics', 'Logical thinking', 'English reading', 'Curiosity'],
    skills: [
      'HTML & CSS',
      'JavaScript basics',
      'Responsive design',
      'Git & GitHub',
      'React fundamentals',
      'Deploying a website',
    ],
    salaryRange: '₹20,000 – ₹45,000 / month (freelance varies)',
    demand: 'High remote demand; can be done from any village',
    project:
      'Build a one-page website for a local shop with contact details and a small photo gallery.',
    duration: '6–9 months of consistent practice',
    roadmap: [
      { title: 'HTML & CSS building blocks', duration: '4 weeks', objective: 'Build and style a simple web page.' },
      { title: 'JavaScript logic', duration: '5 weeks', objective: 'Add interactivity and handle user input.' },
      { title: 'Responsive & accessible design', duration: '3 weeks', objective: 'Make pages work on phones and for everyone.' },
      { title: 'Build & deploy a project', duration: '4 weeks', objective: 'Publish a real site and gather feedback.' },
    ],
    relatedOpportunities: ['Rural Digital Fellowship', 'Coding Mentor Match', 'Remote Internship Program'],
    simulation: null,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    tagline: 'Help local products find the right customers online.',
    category: 'Business & Media',
    image: images.digitalMarketing,
    description:
      'Digital marketing specialists promote products and services using social media, simple design and messaging. This skill can support any local business, artisan or farmer collective.',
    beginnerSkills: ['Smartphone photography', 'Writing in local language', 'Social media use', 'Creativity'],
    skills: [
      'Social media management',
      'Content & copywriting',
      'Basic graphic design',
      'Understanding audiences',
      'Simple analytics',
      'Product storytelling',
    ],
    salaryRange: '₹15,000 – ₹40,000 / month (freelance varies)',
    demand: 'Growing for local brands, artisans and FPOs',
    project:
      'Plan a one-week social media campaign for a local honey seller with posts, captions and a target audience.',
    duration: '3–5 months',
    roadmap: [
      { title: 'Understanding your audience', duration: '2 weeks', objective: 'Identify who will buy a product and why.' },
      { title: 'Content creation basics', duration: '4 weeks', objective: 'Shoot and write simple, appealing posts.' },
      { title: 'Channels & campaigns', duration: '3 weeks', objective: 'Plan a small campaign across one or two channels.' },
      { title: 'Measure & improve', duration: '3 weeks', objective: 'Read basic results and adjust the plan.' },
    ],
    relatedOpportunities: ['Digital Skills Scholarship', 'Brand Mentor Network', 'E-commerce Seller Bootcamp'],
    simulation: 'marketing',
  },
  {
    id: 'handicraft',
    title: 'Handicraft & E-commerce Entrepreneur',
    tagline: 'Take local craft online and reach customers across India.',
    category: 'Entrepreneurship',
    image: images.handicraft,
    description:
      'Handicraft entrepreneurs create and sell crafts, textiles and home products online. Combining traditional craft with photography, packaging and e-commerce opens national markets.',
    beginnerSkills: ['Craft or design interest', 'Photography', 'Basic maths', 'Customer care'],
    skills: [
      'Product design & finishing',
      'Product photography',
      'Packaging & shipping',
      'Online store setup',
      'Pricing for profit',
      'Customer communication',
    ],
    salaryRange: '₹12,000 – ₹50,000 / month (product dependent)',
    demand: 'Strong online demand for authentic handmade goods',
    project:
      'Photograph five handmade items, write product descriptions and list them in a mock online catalogue.',
    duration: '3–6 months to first sale',
    roadmap: [
      { title: 'Designing a sellable product', duration: '3 weeks', objective: 'Refine a craft into a consistent product.' },
      { title: 'Photography & storytelling', duration: '3 weeks', objective: 'Capture products and write their story.' },
      { title: 'Listing & pricing', duration: '3 weeks', objective: 'Create listings with profitable prices.' },
      { title: 'Launch & first orders', duration: '4 weeks', objective: 'Handle packing, shipping and feedback.' },
    ],
    relatedOpportunities: ['Artisan E-commerce Bootcamp', 'Craft Micro-Grant', 'Handicraft Market Competition'],
    simulation: null,
  },
]

export const careerCategories = [
  'All',
  'Agriculture & Technology',
  'Entrepreneurship',
  'Energy & Environment',
  'Technology',
  'Business & Media',
]

export const getCareer = (id) => careers.find((c) => c.id === id)

export default careers
