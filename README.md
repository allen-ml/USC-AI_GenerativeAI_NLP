# TAC 459 — Generative AI and NLP Course Website

The course website for **TAC 459: Generative AI and Natural Language
Processing** at the University of Southern California. Built with React,
TypeScript, and Vite.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Dev Setup](#dev-setup)
3. [Project Structure](#project-structure)
4. [Updating Content Each Semester](#updating-content-each-semester)
   - [Semester Info](#semester-info)
   - [Course Overview Text](#course-overview-text)
   - [Instructors & Course Assistants](#instructors--course-assistants)
   - [Navigation](#navigation)
   - [Course Schedule / Weekly Topics](#course-schedule--weekly-topics)
   - [Adding a New Semester of Projects](#adding-a-new-semester-of-projects)
   - [Snapshotting the Alumni Record](#snapshotting-the-alumni-record)
5. [Images & Assets](#images--assets)
6. [Scripts — Slide & PDF Rendering](#scripts--slide--pdf-rendering)
7. [Build & Deploy](#build--deploy)

---

## Tech Stack

| Layer             | Tool                                |
| ----------------- | ----------------------------------- |
| Framework         | React 19 + TypeScript               |
| Build             | Vite (rolldown-vite)                |
| Routing           | React Router DOM v7                 |
| Styling           | Tailwind CSS v4 + CSS Modules       |
| Code highlighting | react-syntax-highlighter / Prism.js |
| Linting           | ESLint + typescript-eslint          |

---

## Dev Setup

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone the repo
git clone <repo-url>
cd USC-AI_GenerativeAI_NLP

# 2. Install dependencies
npm install

# 3. Start the dev server (hot-reload at http://localhost:5173)
npm run dev

# 4. Type-check without building
npx tsc --noEmit

# 5. Lint
npm run lint

# 6. Production build (output → dist/)
npm run build

# 7. Preview the production build locally
npm run preview
```

---

## Project Structure

```
├── public/                        # Static assets served at the root URL
│   ├── people/                    # Instructor and CA profile photos
│   ├── archive/                   # Project images for past semesters
│   │   ├── Fall2024/
│   │   └── Spring2024/
│   └── *.png / *.webp             # Site-wide images (logo, background, etc.)
│
├── scripts/                       # CLI utilities for generating images from slides/PDFs
│   ├── render_slide.py
│   └── render_pdf.py
│
└── src/
    ├── content/                   # ★ Edit these every semester ★
    │   ├── info.json              # Semester label, syllabus filename, calendar ID
    │   ├── instructors.json       # Instructors and CAs
    │   ├── navigation.json        # Top navigation structure
    │   ├── course_content.json    # Weekly topics and deliverables
    │   ├── overview_blurb.txt     # Course description on the home page
    │   ├── projects/              # ★ One JSON per semester — never deleted ★
    │   │   ├── index.ts           # Ordered export (newest first) — add one line here
    │   │   ├── fall-2025.json     # Current semester (initially empty)
    │   │   ├── spring-2025.json
    │   │   ├── fall-2024.json
    │   │   └── spring-2024.json
    │   └── past-instructors/      # ★ End-of-semester staff snapshots — never deleted ★
    │       ├── index.ts           # Ordered export (newest first) — add one line here
    │       ├── spring-2025.json
    │       ├── fall-2024.json
    │       └── spring-2024.json
    │
    ├── archive/                   # Legacy archive pages (Spring/Fall 2024, Spring 2025)
    │   └── ...                    # No new entries needed going forward
    │
    ├── components/                # Shared UI components (Navigation, Card, Button, …)
    ├── layouts/                   # Page layout wrappers
    ├── pages/                     # Route-level page components
    │   ├── projects/              # /projects — reads from content/projects/index.ts
    │   ├── alumni/                # /alumni   — reads from content/past-instructors/index.ts
    │   └── ...
    ├── styles/global.css          # CSS variables (colors, spacing, typography)
    ├── App.tsx                    # Route definitions
    └── main.tsx                   # Entry point
```

---

## Updating Content Each Semester

At the start of every semester, update the files in `src/content/`. All files
are plain JSON or `.txt` — no React knowledge needed.

### Semester Info

**File:** `src/content/info.json`

```json
{
  "semester": "Sp 2026",
  "syllabus": "TAC 459 Outline Spring 2026.pdf",
  "calendarId": "https://calendar.google.com/calendar/..."
}
```

| Field        | Description                                    |
| ------------ | ---------------------------------------------- |
| `semester`   | Short label shown in the UI (e.g. `"Sp 2026"`) |
| `syllabus`   | Filename of the PDF in `public/`               |
| `calendarId` | Full Google Calendar embed/share URL           |

---

### Course Overview Text

**File:** `src/content/overview_blurb.txt`

Plain text shown on the home page. Replace with the updated course description.
Supports line breaks — no special formatting needed.

---

### Instructors & Course Assistants

**File:** `src/content/instructors.json`

An array of person objects. Set `"Type"` to `"Instructor"` or
`"Course Assistant"` to control which section they appear in.

```json
[
  {
    "Type": "Instructor",
    "Name": "Jane Smith",
    "Position": "Adjunct Professor of Generative AI and NLP",
    "Bio": "Bio text here.\nSecond line of bio.",
    "Email": "jsmith@usc.edu",
    "Image": "jane_smith.png",
    "Profiles": {
      "LinkedIn": "https://linkedin.com/in/janesmith",
      "GitHub": "https://github.com/janesmith"
    }
  }
]
```

- Place the profile photo in `public/people/` and reference it by filename in `"Image"`.
- `"Bio"` supports `\n` for line breaks.
- Any key in `"Profiles"` becomes a clickable button. Omit the key or set it to `null` to hide it.

---

### Navigation

**File:** `src/content/navigation.json`

Top-level nav items with optional `"children"` for dropdown sublinks. You
generally only need to touch this if a page is added or renamed.

> **Projects dropdown is automatic.** The nav children for `/projects` are
> generated from `src/content/projects/index.ts` — no manual edits needed
> when adding a new semester of projects.

---

### Course Schedule / Weekly Topics

**File:** `src/content/course_content.json`

An array of weekly entries. Each entry maps to one row in the schedule view.

```json
[
  {
    "Week": 1,
    "Module": 1,
    "Title": "Introduction to NLP and Generative AI",
    "TitleShort": "Intro to NLP & AI",
    "Deliverables": [],
    "Overview": [
      "Course Overview",
      "Historical Evolution of AI and NLP"
    ]
  },
  {
    "Week": 2,
    "Module": 1,
    "Title": "Text Processing Techniques",
    "TitleShort": "Text Processing",
    "Deliverables": ["Assignment 1"],
    "Overview": ["Tokenization", "Stemming and Lemmatization"]
  }
]
```

| Field          | Description                                           |
| -------------- | ----------------------------------------------------- |
| `Week`         | Week number (integer)                                 |
| `Module`       | Module grouping number                                |
| `Title`        | Full title for expanded views                         |
| `TitleShort`   | Abbreviated title for compact views                   |
| `Deliverables` | Assignments/deliverables due that week                |
| `Overview`     | Bullet-point list of topics covered                   |

---

### Adding a New Semester of Projects

Projects from every semester are kept permanently — nothing is ever deleted or
moved. Adding a new semester takes two steps:

**Step 1 — Create the semester JSON**

Add a new file `src/content/projects/<term>.json`. Use the `id` field as a
URL-safe slug (lowercase, hyphenated):

```json
{
  "id": "spring-2026",
  "term": "Spring 2026",
  "classPhoto": "/archive/Spring2026/class_photo.jpg",
  "projects": [
    {
      "title": "My AI Project",
      "images": [
        "/archive/Spring2026/team1/screenshot1.png",
        "/archive/Spring2026/team1/screenshot2.png"
      ],
      "description": "Short description of what the project does.",
      "executionPlan": "Tech stack and implementation approach.",
      "teamMembers": ["Alice Chen", "Bob Kim", "Carol Lee"]
    }
  ]
}
```

Start the semester with `"projects": []` — the page shows a "coming soon"
placeholder automatically until projects are added.

**Step 2 — Register in the index**

Open `src/content/projects/index.ts` and add one import and one entry at the
**top** of the array (newest first):

```typescript
import spring2026 from './spring-2026.json';  // ← add this line
import fall2025   from './fall-2025.json';
// ...

export const allProjectSemesters: SemesterProjects[] = [
  spring2026 as SemesterProjects,  // ← add this entry
  fall2025   as SemesterProjects,
  // ...
];
```

That's it. The `/projects` page and the navigation dropdown both update
automatically — no other files need touching.

#### Project data fields

| Field            | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `id`             | URL slug used as the page anchor (e.g. `spring-2026`)           |
| `term`           | Human-readable semester label shown as the section heading      |
| `classPhoto`     | Path to class photo in `public/` — omit or `""` to hide        |
| `projects`       | Array of project objects (see fields below)                     |
| `.title`         | Project name                                                     |
| `.images`        | Array of image paths — the carousel auto-cycles through them    |
| `.description`   | One-to-two sentence description of what the project does        |
| `.executionPlan` | Tech stack and implementation notes                             |
| `.teamMembers`   | Array of team member names shown as pill badges                 |

---

### Snapshotting the Alumni Record

At the end of each semester, take a one-time snapshot of the teaching staff so
they appear permanently on the `/alumni` page. The page is linked from the
Instructors nav dropdown and is separate from the main instructors page.

**Step 1 — Create the semester snapshot**

Create `src/content/past-instructors/<term>.json`. The format matches
`instructors.json` exactly, wrapped in a semester envelope:

```json
{
  "id": "fall-2025",
  "term": "Fall 2025",
  "people": [
    {
      "Type": "Instructor",
      "Name": "Jane Smith",
      "Position": "Adjunct Professor of Generative AI and NLP",
      "Image": "jane_smith.png",
      "Profiles": {
        "LinkedIn": "https://linkedin.com/in/janesmith"
      }
    },
    {
      "Type": "Course Assistant",
      "Name": "Bob Kim",
      "Position": "Lead Course Assistant",
      "Image": "bob_kim.png",
      "Profiles": {
        "LinkedIn": "https://linkedin.com/in/bobkim"
      }
    }
  ]
}
```

`"Type"` controls grouping on the page: `"Instructor"` vs anything else
(e.g. `"Course Assistant"`). You can omit `Bio` and `Email` — only `Name`,
`Position`, `Image`, and `Profiles` are displayed.

**Step 2 — Register in the index**

Open `src/content/past-instructors/index.ts` and add one import and one entry
at the **top** of the array (newest first):

```typescript
import fall2025   from './fall-2025.json';   // ← add this line
import spring2025 from './spring-2025.json';
// ...

export const allPastSemesters: SemesterAlumni[] = [
  fall2025   as SemesterAlumni,  // ← add this entry
  spring2025 as SemesterAlumni,
  // ...
];
```

That's it — the `/alumni` page updates automatically. The main Instructors page
is not affected.

---

## Images & Assets

All files in `public/` are served at the root URL with no processing.

```
public/
├── people/              → profile photos         → /people/jane_smith.png
├── archive/
│   ├── Fall2024/
│   │   ├── class_photo.jpg
│   │   └── projects/Team 1/ ...
│   └── Spring2024/ ...
└── TAC 459 Outline Fall 2025.pdf   → syllabus PDF
```

Keep project images alongside the rest of the semester's assets under
`public/archive/<Semester>/`. New image paths just need to be referenced
correctly in the semester JSON — no build config changes needed.

**Generating images from slides or PDFs:** use the scripts below.

---

## Scripts — Slide & PDF Rendering

The `scripts/` directory contains Python utilities for converting PowerPoint
slides and PDFs to images.

**Install dependencies:**

```bash
pip install -r requirements.txt
# or: pip install aspose-slides PyMuPDF absl-py
```

**Render a single slide from a `.pptx`:**

```bash
python scripts/render_slide.py \
  --input_file=path/to/deck.pptx \
  --output_file=public/archive/Fall2025/team1/slide.png \
  --slide_number=3
```

**Render all pages of a PDF:**

```bash
python scripts/render_pdf.py \
  --input_file=path/to/document.pdf \
  --output_dir=public/archive/Fall2025/team1/
```

Output defaults to PNG at 300 DPI. Pass `--image_format=jpeg` or `--dpi=150`
to adjust.

---

## Build & Deploy

```bash
# Production build → dist/
npm run build

# Preview locally before deploying
npm run preview
```

The `dist/` directory is a fully static site. Deploy it to any static host
(GitHub Pages, Netlify, Vercel, USC servers, etc.).

Because the site uses client-side routing, configure your host to serve
`index.html` for all routes:

- **Netlify:** add a `public/_redirects` file: `/* /index.html 200`
- **Vercel:** add a `vercel.json` rewrite: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Apache/Nginx:** configure a catch-all rule pointing to `index.html`
