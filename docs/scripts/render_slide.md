# `scripts/render_slide.py`

Renders a single slide from a PowerPoint (`.pptx`) presentation into an image
file. Useful for generating screenshots of student project slide decks to
populate the project carousel on the `/projects` page.

## Dependencies

```bash
pip install -r requirements.txt
# requires: aspose-slides, absl-py
```

## Usage

```bash
python3 scripts/render_slide.py \
  --input_file=path/to/deck.pptx \
  --output_file=public/archive/Spring2026/team1/slide3.png \
  --slide_number=3
```

## Flags

| Flag | Type | Required | Default | Description |
|---|---|---|---|---|
| `--input_file` | string | **yes** | — | Path to the source `.pptx` file |
| `--output_file` | string | **yes** | — | Path for the output image |
| `--slide_number` | integer | no | `1` | 1-based index of the slide to render |
| `--image_format` | enum | no | `png` | Output format: `png`, `jpeg`, `bmp`, `tiff`, `svg` |

## Output formats

| Format | Notes |
|---|---|
| `png` | Default. Lossless, recommended for project screenshots |
| `jpeg` | Smaller files, lossy |
| `svg` | Vector output; uses a separate export path internally |
| `bmp`, `tiff` | Rarely needed; supported by the underlying library |

## Example — batch render several slides

```bash
for n in 2 5 8; do
  python3 scripts/render_slide.py \
    --input_file=deck.pptx \
    --output_file="public/archive/Spring2026/team1/slide${n}.png" \
    --slide_number=$n
done
```

## Errors

| Condition | Exception raised |
|---|---|
| Input file not found | `FileNotFoundError` |
| Slide number out of range | `ValueError` |
| Rendering or I/O failure | `RuntimeError` |
