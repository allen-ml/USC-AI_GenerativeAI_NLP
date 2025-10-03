"""

# Presentation and PDF Rendering Utilities

This project provides two command-line tools for converting presentation slides and PDF pages into high-quality images.

---

## 1. Render Presentation Slide (`render_slide.py`)

This script renders a single slide from a Microsoft PowerPoint presentation (`.pptx`) into an image file (e.g., PNG, SVG, JPEG).

### Usage

Specify the input presentation, the desired output file path, and the 1-based slide number to render.

```shell
python render_slide.py \
    --input_file=path/to/your/presentation.pptx \
    --output_file=/tmp/slide_15.png \
    --slide_number=15
```

**Default Behavior:** If optional flags are omitted, the script will:

- Render the **first slide** (`--slide_number=1`).
- Save the image in **PNG** format (`--image_format=png`).

---

## 2. Render PDF Pages (`render_pdf.py`)

This script renders all pages of a PDF document into a specified directory, creating one image file per page.

### Usage

Provide the input PDF and a target directory for the output images.

```shell
python render_pdf.py \
    --input_file=path/to/your/document.pdf \
    --output_dir=/tmp/rendered_pages/
```

**Default Behavior:** If optional flags are omitted, the script will:

- Save the images in **PNG** format (`--image_format=png`).
- Render the images at a resolution of **300 DPI** (`--dpi=300`).

---

## Installation

These scripts rely on external libraries. You can install all dependencies with pip:

```shell
pip install aspose-slides PyMuPDF absl-py
```

"""
