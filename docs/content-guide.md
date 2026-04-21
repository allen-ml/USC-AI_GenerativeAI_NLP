# Content Guide

All current-semester data lives in `src/content/`. Every file is plain JSON (or
`.txt`) — no React knowledge required to update them.

---

## `info.json` — Semester metadata

```json
{
  "semester": "Sp 2026",
  "syllabus": "TAC 459 Outline Spring 2026.pdf",
  "calendarId": "https://calendar.google.com/calendar/..."
}
```

| Field        | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `semester`   | Short label shown in the UI, e.g. `"Fa 2025"`, `"Sp 2026"` |
| `syllabus`   | Filename of the PDF in `public/`                           |
| `calendarId` | Full Google Calendar embed/share URL                       |

---

## `overview_blurb.txt` — Home page description

Plain text shown on the home page Overview section. Replace with the updated
course description. Line breaks are preserved.

---

## `instructors.json` — Current staff

An array of person objects. `"Type"` controls which section they appear in on
the Instructors page.

```json
[
  {
    "Type": "Instructor",
    "Name": "Jane Smith",
    "Position": "Adjunct Professor of Generative AI and NLP",
    "Bio": "Bio text.\nSecond paragraph.",
    "Email": "jsmith@usc.edu",
    "Image": "jane_smith.png",
    "Profiles": {
      "LinkedIn": "https://linkedin.com/in/janesmith",
      "GitHub": "https://github.com/janesmith"
    }
  },
  {
    "Type": "Course Assistant",
    "Name": "Bob Kim",
    "Position": "Lead Course Assistant",
    "Bio": "...",
    "Email": "bkim@usc.edu",
    "Image": "bob_kim.png",
    "Profiles": {
      "LinkedIn": "https://linkedin.com/in/bobkim"
    }
  }
]
```

- Place profile photos in `public/people/` and reference by filename in
  `"Image"`.
- `"Bio"` supports `\n` for paragraph breaks.
- Any key in `"Profiles"` becomes a clickable link. Set a value to `null` or
  omit the key entirely to hide it.
- Valid `"Type"` values: `"Instructor"`, `"Course Assistant"`.

---

## `navigation.json` — Top navigation

An array of nav items with optional dropdown `"children"`.

```json
[
  {
    "label": "Instructors",
    "href": "/instructors",
    "children": [
      { "label": "Instructors", "href": "/instructors#instructors" },
      {
        "label": "Course Assistants",
        "href": "/instructors#course-assistants"
      },
      { "label": "Alumni", "href": "/alumni" }
    ]
  }
]
```

> **Projects dropdown is automatic.** The children for the `/projects` entry are
> generated at runtime from `src/content/projects/index.ts` — no manual edits
> needed when a new semester is added.

---

## `course_content.json` — Weekly schedule

An array of weekly entries, one per week.

```json
[
  {
    "Week": 1,
    "Module": 1,
    "Title": "Introduction to NLP and Generative AI",
    "TitleShort": "Intro to NLP & AI",
    "Deliverables": [],
    "Overview": ["Course Overview", "Historical Evolution of AI and NLP"]
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

| Field          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `Week`         | Week number (integer)                                        |
| `Module`       | Module grouping number                                       |
| `Title`        | Full title for expanded views                                |
| `TitleShort`   | Abbreviated title for compact views                          |
| `Deliverables` | Assignments/deliverables due that week (empty array if none) |
| `Overview`     | Bullet list of topics covered                                |

---

## `projects/<term>.json` — Semester project showcase

One file per semester, kept permanently. The `projects/index.ts` barrel controls
order (newest first). See [semester-rollover.md](./semester-rollover.md) for how
new files get added.

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
      "description": "One-to-two sentence description of what the project does.",
      "executionPlan": "Tech stack and implementation approach.",
      "teamMembers": ["Alice Chen", "Bob Kim"]
    }
  ]
}
```

| Field                      | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| `id`                       | URL slug used as the page anchor (kebab-case, e.g. `spring-2026`) |
| `term`                     | Semester label shown as the section heading                       |
| `classPhoto`               | Path under `public/` — omit or set to `""` to hide                |
| `projects[].title`         | Project name                                                      |
| `projects[].images`        | Image paths in `public/` — carousel auto-cycles                   |
| `projects[].description`   | Short description of what the project does                        |
| `projects[].executionPlan` | Tech stack and implementation notes                               |
| `projects[].teamMembers`   | Array of names shown as pill badges                               |

An empty `"projects": []` array automatically shows a "coming soon" placeholder.

---

## `past-instructors/<term>.json` — Alumni snapshots

One file per past semester, kept permanently. Structure mirrors
`instructors.json` wrapped in a semester envelope. See
[semester-rollover.md](./semester-rollover.md) for the snapshot workflow — this
is automated by the rollover script.

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
      "Profiles": { "LinkedIn": "https://linkedin.com/in/janesmith" }
    }
  ]
}
```

`Bio` and `Email` are optional in alumni records — only `Name`, `Position`,
`Image`, and `Profiles` are displayed on the Alumni page.
