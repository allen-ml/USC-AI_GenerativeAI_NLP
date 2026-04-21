# TAC 459 — Generative AI and NLP

Course website for **TAC 459: Generative AI and Natural Language Processing** at
the University of Southern California.

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
```

See [docs/dev-setup.md](docs/dev-setup.md) for the full environment guide.

---

## Tech Stack

| Layer     | Tool                          |
| --------- | ----------------------------- |
| Framework | React 19 + TypeScript         |
| Build     | Vite (rolldown-vite)          |
| Routing   | React Router DOM v7           |
| Styling   | Tailwind CSS v4 + CSS Modules |
| Linting   | ESLint + typescript-eslint    |

---

## Contributing

**Never push directly to `main`.** Every change — however small — goes through a
branch and a pull request.

```bash
git checkout -b yourname/short-description
# make changes
git push -u origin yourname/short-description
# open a PR → get CI green → merge
```

`main` is live. Anything merged there deploys to the public site automatically.
Only merge when CI passes and the change is in a working state.

See [docs/ci-cd.md](docs/ci-cd.md) for branch protection setup and workflow
details.

---

## CI/CD

| Mechanism       | Trigger              | Behavior                                              |
| --------------- | -------------------- | ----------------------------------------------------- |
| Pre-commit hook | `git commit` (local) | Warns on typecheck/lint/build failures — never blocks |
| CI workflow     | PR → `main`          | **Blocks merge** if typecheck, lint, or build fails   |
| Deploy workflow | Push to `main`       | Builds and deploys to GitHub Pages automatically      |

Hooks are installed automatically by `npm install` (via the `prepare` script).
See [docs/ci-cd.md](docs/ci-cd.md) for setup details, including how to enable
the branch protection rule and configure the `GCAL_API_KEY` secret.

---

## Documentation

| Doc                                                          | What's in it                                         |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| [docs/dev-setup.md](docs/dev-setup.md)                       | Environment setup, commands, project structure       |
| [docs/content-guide.md](docs/content-guide.md)               | Schema reference for every content file              |
| [docs/semester-rollover.md](docs/semester-rollover.md)       | Running the rollover script + manual steps           |
| [docs/assets.md](docs/assets.md)                             | Images, PDFs, slide/PDF rendering scripts            |
| [docs/deploy.md](docs/deploy.md)                             | Production build and static hosting config           |
| [docs/ci-cd.md](docs/ci-cd.md)                               | CI/CD workflows, pre-commit hooks, branch protection |
| [docs/scripts/new_semester.md](docs/scripts/new_semester.md) | Semester rollover script reference                   |
| [docs/scripts/render_slide.md](docs/scripts/render_slide.md) | Slide-to-image script reference                      |
| [docs/scripts/render_pdf.md](docs/scripts/render_pdf.md)     | PDF-to-images script reference                       |
