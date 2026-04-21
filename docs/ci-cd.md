# CI/CD

## Overview

| Mechanism | Trigger | What it does |
|---|---|---|
| Pre-commit hook | Every local `git commit` | Runs typecheck, lint, build — warns on failure, never blocks |
| CI workflow | Pull request → `main` | Runs typecheck, lint, build — **blocks merge on failure** |
| Deploy workflow | Push to `main` | Builds and deploys to GitHub Pages |

---

## Pre-commit Hook (local)

The hook lives in `.hooks/pre-commit` and is installed into `.git/hooks/` by the `prepare` npm lifecycle script, so it runs automatically after `npm install`.

**To install manually:**

```bash
bash scripts/install-hooks.sh
```

The hook runs `typecheck → lint → build` before every commit. Failures print a warning but the commit is **never blocked** — this is intentional so local work-in-progress commits aren't interrupted. Issues flagged here will, however, block the CI merge check, so fix them before opening a PR.

---

## CI — Merge Blocker (GitHub Actions)

File: `.github/workflows/ci.yml`

Runs on every pull request targeting `main`. The job (`Typecheck · Lint · Build`) must pass before the PR can be merged.

**Steps:**
1. `npm run typecheck` — TypeScript project-references type check (`tsc -b --noEmit`)
2. `npm run lint` — ESLint with typescript-eslint rules
3. `npm run build` — full Vite production build (also type-checks via `tsc -b`)

To require this as a mandatory status check:

1. Go to **Settings → Branches → Add branch protection rule**
2. Branch name pattern: `main`
3. Enable **Require status checks to pass before merging**
4. Search for and add: `Typecheck · Lint · Build`
5. Enable **Require branches to be up to date before merging**

---

## Deploy (GitHub Actions)

File: `.github/workflows/deploy.yml`

Runs automatically whenever a commit lands on `main` (direct push or merged PR). Requires the `GCAL_API_KEY` repository secret to be set, or the workflow will fail with an actionable error message.

**Steps:**
1. Validate `GCAL_API_KEY` secret is present
2. `npm ci` — clean install
3. `npm run build` — production build with `VITE_GOOGLE_CALENDAR_API_KEY` injected
4. Upload `dist/` as a Pages artifact
5. Deploy to GitHub Pages

**Setting up the secret:**

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `GCAL_API_KEY`, value: your Google Calendar API key

**Enabling GitHub Pages:**

1. Go to **Settings → Pages**
2. Source: **GitHub Actions**

---

## Running Checks Locally

```bash
npm run typecheck   # TypeScript type check only (fast)
npm run lint        # ESLint
npm run build       # Full production build
```
