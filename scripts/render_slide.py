"""Renders a single slide from a presentation file into an image.

Utility script for USC TAC 459 course materials processing.
This script uses the aspose-slides library to load a .pptx file, render a
specified slide, and save it as a new image file (e.g., PNG, JPEG, SVG).

Example Usage:
    python render_slide.py --input_file=my_presentation.pptx \
      --output_file=slide_5.png --slide_number=5
"""

import os
from collections.abc import Sequence

import aspose.slides as slides
from absl import app, flags, logging

_INPUT_FILE = flags.DEFINE_string(
    name="input_file",
    default=None,
    help="Path to the input presentation (.pptx) file.",
    required=True,
)

_OUTPUT_FILE = flags.DEFINE_string(
    name="output_file",
    default=None,
    help="Path to save the output image file.",
    required=True,
)

_SLIDE_NUMBER = flags.DEFINE_integer(
    name="slide_number",
    default=1,
    help="The 1-based index of the slide to render.",
    lower_bound=1,
)

_IMAGE_FORMAT = flags.DEFINE_enum(
    name="image_format",
    default="png",
    enum_values=["png", "jpeg", "bmp", "tiff", "svg"],
    help="The format of the output image.",
)

# Module-level constants are named in CONSTANT_CASE. [cite: 183]
_FORMAT_MAP = {
    "png": slides.export.ImageFormat.PNG,
    "jpeg": slides.export.ImageFormat.JPEG,
    "bmp": slides.export.ImageFormat.BMP,
    "tiff": slides.export.ImageFormat.TIFF,
    "svg": slides.export.ImageFormat.SVG,
}


def _render_slide_to_image(
    input_path: str, output_path: str, slide_number: int, image_format_str: str
) -> None:
    """Loads a presentation, renders a slide, and saves it as an image.

    Args:
      input_path: The file path of the source presentation.
      output_path: The file path to save the rendered image.
      slide_number: The 1-based index of the slide to render.
      image_format_str: The desired output format as a string (e.g., 'png').

    Raises:
      FileNotFoundError: If the input presentation file does not exist.
      ValueError: If the slide number is out of bounds.
      RuntimeError: If there is an error during rendering or saving.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input file not found at: {input_path}")

    try:
        logging.info("Loading presentation from %s...", input_path)
        # The `with` statement ensures the resource is properly closed. [cite: 1065]
        with slides.Presentation(input_path) as presentation:
            num_slides = len(presentation.slides)
            if not (0 < slide_number <= num_slides):
                raise ValueError(
                    f"Invalid slide number: {slide_number}. Presentation has "
                    f"{num_slides} slides."
                )

            # Adjust for 0-based index used by the library.
            slide_to_render = presentation.slides[slide_number - 1]

            image_format = _FORMAT_MAP.get(image_format_str.lower())
            if image_format is None:
                # This case is unlikely due to flags.DEFINE_enum, but is robust.
                raise ValueError(f"Unsupported image format: {image_format_str}")

            logging.info(
                "Rendering slide %d to %s in %s format...",
                slide_number,
                output_path,
                image_format_str.upper(),
            )

            # SVG export uses a different method than bitmap formats.
            if image_format == slides.export.ImageFormat.SVG:
                with open(output_path, "wb") as svg_file:
                    slide_to_render.write_as_svg(svg_file)
            else:
                bitmap = slide_to_render.get_thumbnail()
                bitmap.save(output_path, image_format)

            logging.info("Successfully saved image to %s.", output_path)

    except Exception as e:
        logging.error("Failed to render slide: %s", e)
        raise RuntimeError(f"An error occurred during rendering: {e}") from e


def main(argv: Sequence[str]) -> None:
    """Main application entry point."""
    if len(argv) > 1:
        raise app.UsageError("Too many command-line arguments.")

    _render_slide_to_image(
        input_path=_INPUT_FILE.value,
        output_path=_OUTPUT_FILE.value,
        slide_number=_SLIDE_NUMBER.value,
        image_format_str=_IMAGE_FORMAT.value,
    )


if __name__ == "__main__":
    app.run(main)
