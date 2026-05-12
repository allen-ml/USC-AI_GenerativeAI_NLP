"""Renders all pages of a PDF document into image files.

This script uses the PyMuPDF (fitz) library to load a .pdf file, iterate
through its pages, and save each page as a new image file (e.g., PNG, JPEG).

Example Usage:
    python render_pdf.py --input_file=my_document.pdf \
        --output_dir=/tmp/pdf_images/
"""

import os
from collections.abc import Sequence

import fitz  # PyMuPDF
from absl import app, flags, logging

# As per the Google Python Style Guide, flags are defined at the module level.
_INPUT_FILE = flags.DEFINE_string(
    name="input_file",
    default=None,
    help="Path to the input PDF file.",
    required=True,
)

_OUTPUT_DIR = flags.DEFINE_string(
    name="output_dir",
    default=None,
    help="Directory to save the output image files.",
    required=True,
)

_IMAGE_FORMAT = flags.DEFINE_enum(
    name="image_format",
    default="png",
    enum_values=["png", "jpeg", "bmp", "tiff"],
    help="The format of the output images.",
)

_DPI = flags.DEFINE_integer(
    name="dpi",
    default=300,
    help="Dots per inch (resolution) for the output images.",
    lower_bound=72,
)


def _render_pdf_to_images(
    input_path: str, output_dir: str, image_format: str, dpi: int
) -> None:
    """Loads a PDF, renders each page, and saves them as images.

    Args:
        input_path: The file path of the source PDF.
        output_path: The directory path to save the rendered images.
        image_format: The desired output format as a string (e.g., 'png').
        dpi: The resolution for the output images.

    Raises:
        FileNotFoundError: If the input PDF file does not exist.
        RuntimeError: If there is an error during rendering or saving.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input file not found at: {input_path}")

    os.makedirs(output_dir, exist_ok=True)
    logging.info("Output directory set to %s.", output_dir)

    try:
        logging.info("Loading PDF from %s...", input_path)
        with fitz.open(input_path) as doc:
            num_pages = len(doc)
            padding = len(str(num_pages))

            logging.info(
                "Rendering %d pages to %s format at %d DPI...",
                num_pages,
                image_format.upper(),
                dpi,
            )

            for page_num in range(num_pages):
                page = doc.load_page(page_num)
                pix = page.get_pixmap(dpi=dpi)

                output_filename = (
                    f"page_{str(page_num + 1).zfill(padding)}.{image_format}"
                )
                output_path = os.path.join(output_dir, output_filename)
                pix.save(output_path)
        logging.info("Successfully saved %d images to %s.", num_pages, output_dir)

    except Exception as e:
        logging.error("Failed to render PDF: %s", e)
        raise RuntimeError(f"An error occurred during PDF rendering: {e}") from e


def main(argv: Sequence[str]) -> None:
    """Main application entry point."""
    if len(argv) > 1:
        raise app.UsageError("Too many command-line arguments.")

    _render_pdf_to_images(
        input_path=_INPUT_FILE.value,
        output_dir=_OUTPUT_DIR.value,
        image_format=_IMAGE_FORMAT.value,
        dpi=_DPI.value,
    )


if __name__ == "__main__":
    app.run(main)
