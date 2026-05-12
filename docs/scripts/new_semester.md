# `scripts/new_semester.py`

Semester rollover script. Archives the outgoing semester's instructor roster
and registers a new semester in the projects showcase. Automates the four
mechanical file operations so the developer only needs to handle the
content-specific manual steps afterward.

## Dependencies

No extra Python packages required beyond what is already in `requirements.txt`.
Uses only the standard library (`json`, `re`, `pathlib`), plus `absl-py` which
is already a dependency.

```bash
pip install -r requirements.txt
```

## Usage

**Interactive** (prompts for any flag not supplied on the command line):

```bash
python3 scripts/new_semester.py
```

**Non-interactive** (supply all flags to skip prompts entirely):

```bash
python3 scripts/new_semester.py \
  --current_id=fall-2025 \
  --new_id=spring-2026 \
  --new_term="Spring 2026"
```

**Via npm shortcut:**

```bash
npm run new-semester
```

## Flags

| Flag | Type | Required | Description |
|---|---|---|---|
| `--current_id` | string | no* | Slug ID of the semester being archived, e.g. `fall-2025` |
| `--new_id` | string | no* | Slug ID of the incoming semester, e.g. `spring-2026` |
| `--new_term` | string | no | Display label for the new semester, e.g. `Spring 2026`. Auto-derived from `--new_id` if omitted. |

\* Prompted interactively if not provided.

## What it does

| Step | Action | Files affected |
|---|---|---|
| 1 | Snapshot `instructors.json` | `past-instructors/<current_id>.json` created |
| 2 | Register the snapshot | `past-instructors/index.ts` patched |
| 3 | Create empty projects file | `projects/<new_id>.json` created |
| 4 | Register new semester | `projects/index.ts` patched |

The script is **idempotent** — re-running it safely skips any step that is
already in place and logs a warning for each one skipped.

## Preconditions

`src/content/projects/<current_id>.json` must already exist. If it is missing,
the script exits with a usage error before making any changes.

## Logging

All progress, warnings, and errors are emitted via `absl.logging`. Run with
`--verbosity=1` (default) to see INFO messages, or `--verbosity=0` to suppress
them.

```bash
python3 scripts/new_semester.py --verbosity=0 \
  --current_id=fall-2025 --new_id=spring-2026
```

## Manual steps after running

The script logs a checklist of the remaining manual tasks on completion:

1. `src/content/info.json` — update semester label, syllabus filename, calendar ID
2. `src/content/instructors.json` — replace with the new semester's staff
3. `src/content/course_content.json` — replace with the new semester's schedule
4. `src/content/overview_blurb.txt` — update the course description if needed
5. `public/` — add the new syllabus PDF
6. `npm run dev` — verify the site looks correct

See [semester-rollover.md](../semester-rollover.md) for the full workflow guide.
