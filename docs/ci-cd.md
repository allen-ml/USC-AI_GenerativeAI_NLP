# CI/CD

## Overview

| Mechanism | Trigger | What it does |
|---|---|---|
| Pre-commit hook | Every local `git commit` | Runs typecheck, lint, build — warns on failure, never blocks |
| CI workflow | Pull request → `main` | Runs typecheck, lint, build — **blocks merge on failure** |
| Deploy workflow | Push to `main` | Builds and deploys to GitHub Pages |

Two separate workflow files are intentional: CI runs on every PR commit (cheap, fast feedback), deploy only runs after code lands on `main` (you don't want to deploy unmerged code).

---

## Pre-commit Hook (local)

Hooks are managed by [Husky](https://typicode.github.io/husky/) and live in `.husky/`. They are installed automatically when you run `npm install` (via the `prepare` lifecycle script) — no extra steps needed after cloning.

The hook runs `typecheck → lint → build` before every commit. Failures print a warning but the commit is **never blocked** — this is intentional so local work-in-progress commits aren't interrupted. Issues flagged here will block the CI merge check, so fix them before opening a PR.

**To run the checks manually at any time:**

```bash
npm run typecheck   # TypeScript type check (fast)
npm run lint        # ESLint
npm run build       # Full production build
```

---

## CI — Merge Blocker (GitHub Actions)

File: `.github/workflows/ci.yml`

Runs on every pull request targeting `main`. The job (`Typecheck · Lint · Build`) must pass before the PR can be merged.

**Steps:**
1. `npm run typecheck` — TypeScript project-references type check (`tsc -b --noEmit`)
2. `npm run lint` — ESLint with typescript-eslint rules
3. `npm run build` — full Vite production build

**To enforce this as a required status check:**

1. Go to **Settings → Branches → Add branch protection rule**
2. Branch name pattern: `main`
3. Enable **Require status checks to pass before merging**
4. Search for and add: `Typecheck · Lint · Build`
5. Enable **Require branches to be up to date before merging**

---

## Deploy (GitHub Actions)

File: `.github/workflows/deploy.yml`

Runs automatically whenever a commit lands on `main` (direct push or merged PR). Runs the same typecheck + lint + build as CI, then deploys `dist/` to GitHub Pages.

Requires the `GCAL_API_KEY` repository secret — the workflow will fail with an actionable error if it's missing.

**Setting up the secret:**

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `GCAL_API_KEY`, value: your Google Calendar API key

**Enabling GitHub Pages:**

1. Go to **Settings → Pages**
2. Source: **GitHub Actions**
