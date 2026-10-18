// Central image configuration for HunarSetu AI.
// Replace any URL here to change images across the whole application.
// Every image is rendered through <SmartImage /> which adds a graceful
// fallback if a URL fails to load.

const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  // --- Landing hero & storytelling ---
  heroStudents: u('photo-1596495578065-6e0763fa1178', 1400),
  heroLearning: u('photo-1509062522246-3755977927d7', 1000),
  ruralClassroom: u('photo-1427504494785-3a9ca7044f45', 1200),
  studentsLaptop: u('photo-1523240795612-9a054b0db644', 1200),
  villageStudents: u('photo-1590650153855-d9e808231d41', 1200),
  mentorship: u('photo-1531482615713-2afd69097998', 1000),
  teamworkField: u('photo-1522202176988-66273c2fd55f', 1000),
  graduation: u('photo-1523050854058-8df90110c9f1', 1200),
  booksStudy: u('photo-1497633762265-9d179a990aa6', 900),
  studentPortrait: u('photo-1544717305-2782549b5136', 700),
  teacherHelping: u('photo-1524178232363-1fb2b075b655', 1100),
  csrCare: u('photo-1552664730-d307ca884978', 1200),
  potentialKids: u('photo-1571260899304-425eee4c7efc', 1200),

  // --- Career pathways ---
  agriTech: u('photo-1574943320219-553eb213f72d', 1000),
  agriBusiness: u('photo-1500937386664-56d1dfef3854', 1000),
  dairy: u('photo-1516467508483-a7212febe31a', 1000),
  solar: u('photo-1509391366360-2e959784a276', 1000),
  solarInstall: u('photo-1466611653911-95081537e5b7', 1000),
  webDev: u('photo-1498050108023-c5249f4df085', 1000),
  code: u('photo-1461749280684-dccba630e2f6', 1000),
  digitalMarketing: u('photo-1556761175-b413da4baf72', 1000),
  analytics: u('photo-1460925895917-afdab827c52f', 1000),
  handicraft: u('photo-1513519245088-0e12902e5a38', 1000),
  pottery: u('photo-1610701596007-11502861dcfa', 1000),
  artisan: u('photo-1452860606245-08befc0ff44b', 1000),
  ecommerce: u('photo-1556742049-0cfed4f6a45d', 1000),

  // --- Opportunity network ---
  scholarship: u('photo-1523580494863-6f3031224c94', 1000),
  vocational: u('photo-1581092918056-0c4c3acd3789', 1000),
  competition: u('photo-1546410531-bb4caa6b424d', 1000),
  apprenticeship: u('photo-1504328345606-18bbc8c9d7d1', 1000),
  internship: u('photo-1517048676732-d65bc937f952', 1000),
  entrepreneurship: u('photo-1521737604893-d14cc237f11d', 1000),
  funding: u('photo-1554224155-6726b3ff858f', 1000),

  // --- Talent discovery / challenges ---
  challenge1: u('photo-1552664730-d307ca884978', 900),
  challenge2: u('photo-1531482615713-2afd69097998', 900),
  challenge3: u('photo-1591696205602-2f950c417cb9', 900),
  challenge4: u('photo-1531403009284-440f080d1e12', 900),
  challenge5: u('photo-1509391366360-2e959784a276', 900),
  challenge6: u('photo-1500382017468-9049fed747ef', 900),
  leaderboard: u('photo-1531482615713-2afd69097998', 900),

  // --- Misc ---
  dashboardBanner: u('photo-1523240795612-9a054b0db644', 1400),
  villageLife: u('photo-1470071459604-3b5ec3a7fe05', 1200),
}

// Unsplash fallback used when a specific photo is unavailable.
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=70'

export default images
