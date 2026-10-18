# HunarSetu AI

**Your Potential Has No Boundaries.**

HunarSetu AI is a rural talent-to-livelihood platform prototype focused on **Rural Education & Economic Empowerment**. It helps students in rural India discover their potential, build practical skills, create a verified Skill Passport, and connect with educational and economic opportunities.

The central journey is:

> **Discover → Learn → Build → Showcase → Grow**

---

## Tech stack

- **React 18** + **Vite 5**
- **JavaScript** (no TypeScript)
- **Tailwind CSS 3** (custom design system)
- **React Router 6** (client-side routing)
- **Lucide React** (icons)
- **Recharts** (impact charts)
- **React Hooks** (`useState`, `useEffect`, `useMemo`)
- **Browser `localStorage`** for demo persistence
- Local JavaScript data objects (no backend, no database, no external AI API)

> There is intentionally **no backend, no auth, no database and no payment integration**. All recommendations are produced by simple rule-based JavaScript in `src/utils/recommend.js`.

---

## Getting started

Requirements: Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build (http://localhost:4173)
npm run preview
```

The app runs entirely in the browser and needs **no API keys** or configuration.

---

## The ten pages

| # | Route | Page |
|---|-------|------|
| 1 | `/` | Landing page |
| 2 | `/app/dashboard` | Student Dashboard |
| 3 | `/app/dna` | Opportunity DNA assessment + results |
| 4 | `/app/careers` and `/app/careers/:careerId` | Career Explorer + detail & exercises |
| 5 | `/app/learning` | Learning Roadmap |
| 6 | `/app/passport` | Skill Passport |
| 7 | `/app/opportunities` | Opportunity Network |
| 8 | `/app/talent` | Talent Discovery |
| 9 | `/app/facilitator` | Facilitator Dashboard |
| 10 | `/app/csr` | CSR Impact Dashboard |

Roles (**Student / Facilitator / CSR Partner**) can be switched from the sidebar or the role switcher. This is a demo presentation feature, not real authentication.

**English / हिन्दी** can be toggled from the header or sidebar. It translates navigation, major headings, buttons and common messages (demo opportunity and career *content* stays in English).

---

## Mandatory end-to-end demo flow

1. Open the **Landing page**.
2. Click **Discover My Potential** → the Opportunity DNA questionnaire opens.
3. Complete the questionnaire (7 steps with validation).
4. View personalised **career recommendations** (radar of 4 dimensions + 3 pathways).
5. **Save a career pathway** (heart icon).
6. Open **Learning Roadmap** and **mark a module complete**.
7. **Add a practical project** to the Skill Passport (it starts as *Pending review*).
8. Switch to **Facilitator** role.
9. **Approve / Verify** the submitted project.
10. Switch back to **Student**.
11. See the updated **Verified** status in the Skill Passport (shared state + `localStorage`).
12. Open **Opportunity Network** and **bookmark** an opportunity.
13. Open **Talent Discovery** and **submit a challenge entry**.
14. Switch to **CSR Partner** and explore the **Impact Dashboard** (charts + print/export).

---

## Project structure

```
src/
├─ components/     Reusable UI (Sidebar, Layout, Button, Card, Badge,
│                  ProgressBar, Modal, PageHeader, SearchFilter, Toast,
│                  SmartImage, RoleSwitcher, Logo, StatCard, CareerSimulation)
├─ pages/          The ten pages
├─ data/           Demo data (images, careers, opportunities, courses,
│                  challenges, students, dna options)
├─ context/        AppContext — shared state + localStorage persistence + i18n
├─ hooks/          useLocalStorage (reusable persistence hook)
├─ utils/          recommend.js, i18n.js, storage.js, format.js
├─ App.jsx         Routes
├─ main.jsx        Entry point
└─ index.css       Tailwind layers + print styles
```

---

## Changing demo data

All demo content lives in `src/data/`. Edit these files to change the prototype:

| File | What it controls |
|------|------------------|
| `src/data/images.js` | **Every image URL** used in the app (central config) |
| `src/data/careers.js` | The 6 career pathways, roadmaps, projects, skills |
| `src/data/opportunities.js` | The 12 Opportunity Network entries and statuses |
| `src/data/courses.js` | Learning modules and suggested platforms |
| `src/data/challenges.js` | Talent Discovery challenges, leaderboard, pathway |
| `src/data/students.js` | Aditi Kumari (central student), cohort, submissions, status labels |
| `src/data/dna.js` | Opportunity DNA questionnaire options |

### Changing images

Open `src/data/images.js` and replace any URL. Every image is rendered through
`src/components/SmartImage.jsx`, which:

1. loads the configured URL,
2. falls back to a related photo if it fails,
3. falls back again to a neutral gradient with an icon.

This means the UI never shows a broken image.

### Changing the demo student

Edit `sampleStudent` in `src/data/students.js` to change Aditi's profile, skills,
projects, achievements, competitions and timeline.

---

## Persistence & resetting

State is saved to `localStorage` under `hs.*` keys (profile, DNA answers, saved
careers, module progress, projects, opportunity statuses, bookmarks, submissions
and facilitator review state). Parsing is wrapped with safe fallbacks so a
corrupt value never crashes the app.

To clear everything, click **Reset** in the bottom of the sidebar. This clears the
demo keys and reloads with the default sample data.

---

## Print / export

The **Skill Passport** and **CSR Impact Dashboard** include a **Print / Save as
PDF** action that uses `window.print()` with a print-friendly layout. Navigation,
sidebars, buttons and toasts are hidden in print mode (see the `@media print`
rules in `src/index.css`).

---

## Important disclaimers

- This is a **prototype** for a hackathon. All people, schools, programmes,
  scholarships, deadlines, scores and financial figures are **demo data**.
- Opportunity Network entries are **illustrative**; no application is sent to any
  real organisation. There are no official partnerships or guaranteed scholarships.
- The Talent Discovery **village → block → district → state → national** pathway is
  a **proposed model**, not an existing nationwide operational network.
- Career simulations are **simplified educational exercises**, not professional job
  simulations.
- No money transfers, escrow or payment processing is implemented.
- Suggested learning platforms (DIKSHA, SWAYAM, Skill India Digital) are referenced
  as resources only; the app is **not officially integrated** with them.

---

Built with React, Vite and Tailwind CSS.
