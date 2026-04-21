# `scripts/render_pdf.py`

Renders every page of a PDF document into individual image files in a specified
output directory. Useful for generating screenshots from student project reports
or exported slide decks to populate the project carousel on the `/projects` page.

## Dependencies

```bash
pip install -r requirements.txt
# requires: PyMuPDF (fitz), absl-py
```

## Usage

```bash
python3 scripts/render_pdf.py \
  --input_file=path/to/document.pdf \
  --output_dir=public/archive/Spring2026/team1/
```

Output files are named `page_01.png`, `page_02.png`, … with zero-padded numbers
matching the total page count.

## Flags

| Flag | Type | Required | Default | Description |
|---|---|---|---|---|
| `--input_file` | string | **yes** | — | Path to the source PDF file |
| `--output_dir` | string | **yes** | — | Directory for output images (created if absent) |
| `--image_format` | enum | no | `png` | Output format: `png`, `jpeg`, `bmp`, `tiff` |
| `--dpi` | integer | no | `300` | Render resolution in dots per inch (min 72) |

## Choosing DPI

| DPI | Use case |
|---|---|
| `150` | Fast preview, smaller files |
| `300` | Default — good quality for project carousels |
| `600` | High-fidelity archival; large file sizes |

## Errors

| Condition | Exception raised |
|---|---|
| Input file not found | `FileNotFoundError` |
| Rendering or I/O failure | `RuntimeError` |
