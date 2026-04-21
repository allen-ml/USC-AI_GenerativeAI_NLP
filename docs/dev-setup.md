# Dev Setup

## Prerequisites

- **Node.js 18+** — [nodejs.org](https://nodejs.org) (includes npm)
- **Git**

No other global tools are required. Python is only needed if you use the
[slide/PDF rendering scripts](./assets.md#generating-images-from-slides-or-pdfs).

---

## Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd USC-AI_GenerativeAI_NLP

# Install dependencies
npm install

# Start the dev server  →  http://localhost:5173
npm run dev
```

The dev server hot-reloads on every file save, including JSON content files.

---

## Available Commands

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start dev server with hot reload              |
| `npm run build`        | Type-check + production build → `dist/`       |
| `npm run preview`      | Serve the production build locally            |
| `npm run lint`         | Run ESLint                                    |
| `npm run new-semester` | Interactive semester rollover script (Python) |
| `npx tsc --noEmit`     | Type-check without building                   |

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

## Project Structure

```txt
├── public/                   # Static assets (served as-is at root URL)
├── scripts/                  # Node and Python utility scripts
└── src/
    ├── content/              # ★ All editable course data lives here ★
    │   ├── info.json
    │   ├── instructors.json
    │   ├── navigation.json
    │   ├── course_content.json
    │   ├── overview_blurb.txt
    │   ├── projects/         # One JSON per semester
    │   └── past-instructors/ # One JSON per past semester
    ├── archive/              # Frozen pages for legacy semesters
    ├── components/           # Shared UI components
    ├── layouts/              # Page layout wrappers
    ├── pages/                # Route-level page components
    ├── styles/global.css     # CSS variables (colours, spacing, typography)
    ├── App.tsx               # Route definitions
    └── main.tsx              # Entry point
```
