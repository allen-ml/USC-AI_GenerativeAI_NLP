# Assets & Images

## Directory Layout

All files in `public/` are served at their root URL with no processing by the
build tool.

```txt
public/
├── people/                     → /people/<filename>
│   ├── allen_bolourchi.png
│   └── ...
├── archive/                    → /archive/<semester>/...
│   ├── Fall2024/
│   │   ├── class_photo.jpg
│   │   └── projects/
│   │       ├── Team 1/
│   │       └── Team 2/
│   └── Spring2024/
├── <semester-syllabus>.pdf     → /<filename>.pdf
└── usc-logo.png, ...           → site-wide images
```

---

## Profile Photos

- Format: PNG or JPEG, square crop recommended
- Location: `public/people/<name>.png`
- Reference in JSON: `"Image": "name.png"` (filename only, no path prefix)

---

## Project Images

Store project screenshots under `public/archive/<Semester>/`:

```txt
public/archive/Spring2026/team1/screenshot1.png
public/archive/Spring2026/team1/screenshot2.png
```

Reference in `src/content/projects/spring-2026.json`:

```json
"images": [
  "/archive/Spring2026/team1/screenshot1.png",
  "/archive/Spring2026/team1/screenshot2.png"
]
```

The `/projects` page carousel auto-cycles through all images in the array.

---

## Generating Images from Slides or PDFs

Two Python scripts convert slide decks and PDFs into images for the project
carousel. Full flag references are in `docs/scripts/`:

- [docs/scripts/render_slide.md](./scripts/render_slide.md) — render one slide from a `.pptx`
- [docs/scripts/render_pdf.md](./scripts/render_pdf.md) — render all pages of a PDF

### Install dependencies

```bash
pip install -r requirements.txt
# requires: aspose-slides, PyMuPDF, absl-py
```

### Quick examples

```bash
# One slide from a deck
python3 scripts/render_slide.py \
  --input_file=deck.pptx \
  --output_file=public/archive/Spring2026/team1/slide3.png \
  --slide_number=3

# All pages of a PDF
python3 scripts/render_pdf.py \
  --input_file=report.pdf \
  --output_dir=public/archive/Spring2026/team1/
```
