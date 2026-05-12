# Semester Rollover

At the start of each new semester, run the rollover script and then complete a
few manual steps. The whole process takes under 10 minutes.

---

## Step 1 — Run the rollover script

```bash
python3 scripts/new_semester.py
# or via npm shortcut:
npm run new-semester
```

The script prompts for any value not supplied as a flag. To skip all prompts:

```bash
python3 scripts/new_semester.py \
  --current_id=fall-2025 \
  --new_id=spring-2026 \
  --new_term="Spring 2026"
```

See [docs/scripts/new_semester.md](./scripts/new_semester.md) for the full flag
reference.

### What the script automates

| Action                       | File                                                |
| ---------------------------- | --------------------------------------------------- |
| Snapshot current instructors | `src/content/past-instructors/fall-2025.json` (new) |
| Register snapshot            | `src/content/past-instructors/index.ts` (patched)   |
| Create empty projects file   | `src/content/projects/spring-2026.json` (new)       |
| Register new semester        | `src/content/projects/index.ts` (patched)           |

The script is idempotent — re-running it skips anything already in place.

---

## Step 2 — Manual updates

After the script finishes it prints a checklist. Here's what each step involves:

### `src/content/info.json`

Update the semester label, new syllabus filename, and new Google Calendar ID:

```json
{
  "semester": "Sp 2026",
  "syllabus": "TAC 459 Outline Spring 2026.pdf",
  "calendarId": "https://calendar.google.com/calendar/..."
}
```

### `src/content/instructors.json`

Replace the array with the new semester's instructors and TAs. See
[content-guide.md](./content-guide.md#instructorsjson--current-staff) for the
full schema.

Add any new profile photos to `public/people/`.

### `src/content/course_content.json`

Replace with the new semester's weekly schedule. See
[content-guide.md](./content-guide.md#course_contentjson--weekly-schedule).

### `src/content/overview_blurb.txt`

Update the course description if it has changed.

### `public/`

Add the new semester's syllabus PDF. Make sure the filename matches `info.json`.

---

## Step 3 — Verify

```bash
npm run dev
```

Spot-check:

- Home page shows the correct semester label
- Instructors page shows the new staff
- `/projects` featured section shows the new semester as "Current"
- `/alumni` shows the just-archived semester at the top
- Syllabus link opens the correct PDF

---

## Adding projects during the semester

As teams finalise their work, edit `src/content/projects/<new-id>.json` and
populate the `"projects"` array. See
[content-guide.md](./content-guide.md#projectstermjson--semester-project-showcase)
for the per-project schema.

Place project images under `public/archive/<Semester>/` (e.g.
`public/archive/Spring2026/team1/`). Use the
[render scripts](./assets.md#generating-images-from-slides-or-pdfs) to convert
slide decks or PDFs into PNGs.

Once `"projects"` is non-empty the "coming soon" placeholder disappears
automatically.
