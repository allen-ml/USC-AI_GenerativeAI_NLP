"""Semester rollover script for the TAC 459 course website.

Archives the outgoing semester's instructor roster and registers a new semester
entry for the projects showcase. Automates the mechanical file-creation and
index-patching steps; the remaining manual tasks are reported at the end.

See docs/semester-rollover.md for the full semester transition workflow.

Example usage (interactive — prompts for any flag not supplied):
    python3 scripts/new_semester.py

Example usage (non-interactive):
    python3 scripts/new_semester.py \
      --current_id=fall-2025 \
      --new_id=spring-2026 \
      --new_term="Spring 2026"
"""

from __future__ import annotations

import json
import re
from collections.abc import Sequence
from pathlib import Path
from typing import Optional

from absl import app, flags, logging

_CURRENT_ID = flags.DEFINE_string(
    name="current_id",
    default=None,
    help="Slug ID of the semester being archived (e.g. 'fall-2025').",
)

_NEW_ID = flags.DEFINE_string(
    name="new_id",
    default=None,
    help="Slug ID of the incoming semester (e.g. 'spring-2026').",
)

_NEW_TERM = flags.DEFINE_string(
    name="new_term",
    default=None,
    help=(
        "Human-readable label for the new semester (e.g. 'Spring 2026'). "
        "Defaults to a capitalised form of --new_id when omitted."
    ),
)

_ROOT = Path(__file__).resolve().parent.parent
_CONTENT = _ROOT / "src" / "content"


# ── Pure helpers ──────────────────────────────────────────────────────────────


def _to_var(semester_id: str) -> str:
    """Converts a semester ID slug to a valid Python/TS identifier.

    Args:
        semester_id: Hyphen-separated semester slug, e.g. ``'fall-2025'``.

    Returns:
        Identifier with hyphens removed, e.g. ``'fall2025'``.
    """
    return semester_id.replace("-", "")


def _to_term(semester_id: str) -> str:
    """Derives a display label from a semester ID slug.

    Args:
        semester_id: Hyphen-separated semester slug, e.g. ``'fall-2025'``.

    Returns:
        Capitalised display label, e.g. ``'Fall 2025'``.
    """
    parts = semester_id.split("-", 1)
    if len(parts) != 2:  # noqa: PLR2004
        return semester_id
    return parts[0].capitalize() + " " + parts[1]


def _maybe_prompt(flag_value: Optional[str], prompt: str) -> str:
    """Returns *flag_value* when set; otherwise reads a line from stdin.

    Args:
        flag_value: Value provided via a command-line flag, or ``None``.
        prompt: Prompt string forwarded to :func:`input` when the flag is absent.

    Returns:
        The flag value or the stripped user input.
    """
    if flag_value is not None:
        return flag_value
    return input(prompt).strip()


# ── File I/O helpers ──────────────────────────────────────────────────────────


def _read_json(path: Path) -> dict:
    """Reads and parses a JSON file.

    Args:
        path: Filesystem path to the JSON file.

    Returns:
        Parsed JSON content as a Python dict.

    Raises:
        FileNotFoundError: If *path* does not exist.
        json.JSONDecodeError: If the file content is not valid JSON.
    """
    return json.loads(path.read_text(encoding="utf-8"))


def _write_json(path: Path, data: dict) -> None:
    """Serialises *data* to a JSON file with 2-space indentation.

    Args:
        path: Destination file path. Parent directory must exist.
        data: Data to serialise.
    """
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


# ── TypeScript index patching ─────────────────────────────────────────────────


def _insert_after_last_json_import(content: str, var_name: str, file_id: str) -> str:
    """Inserts a new JSON import statement after the last existing one.

    Args:
        content: Full text of the TypeScript index file.
        var_name: Identifier to use in the import, e.g. ``'fall2025'``.
        file_id: Slug used as the JSON filename, e.g. ``'fall-2025'``.

    Returns:
        Updated file content with the new import line appended after the last
        existing ``import ... from './*.json'`` statement.

    Raises:
        ValueError: If no existing JSON import statements are found.
    """
    matches = list(
        re.finditer(r"^import \w+ from '\.\/[\w-]+\.json';$", content, re.MULTILINE)
    )
    if not matches:
        raise ValueError("No JSON imports found in the index file.")
    insert_at = matches[-1].end()
    new_line = f"\nimport {var_name} from './{file_id}.json';"
    return content[:insert_at] + new_line + content[insert_at:]


def _prepend_to_export_array(content: str, var_name: str, type_name: str) -> str:
    """Inserts a new entry as the first element of the exported const array.

    Args:
        content: Full text of the TypeScript index file.
        var_name: Identifier of the value to prepend, e.g. ``'fall2025'``.
        type_name: TypeScript cast type, e.g. ``'SemesterProjects'``.

    Returns:
        Updated file content with the new array entry prepended.

    Raises:
        ValueError: If the exported const array declaration cannot be found.
    """
    match = re.search(r"export const \w+: \w+\[\] = \[", content)
    if not match:
        raise ValueError("Could not locate the exported array in the index file.")
    insert_at = match.end()
    new_entry = f"\n  {var_name} as {type_name},"
    return content[:insert_at] + new_entry + content[insert_at:]


def _patch_index(path: Path, var_name: str, file_id: str, type_name: str) -> None:
    """Patches a ``content/*/index.ts`` barrel to include a new semester entry.

    Adds the import declaration and prepends the value to the exported array in
    a single read-modify-write operation.

    Args:
        path: Path to the ``index.ts`` file to patch.
        var_name: TS identifier for the new import, e.g. ``'fall2025'``.
        file_id: Slug of the JSON file being imported, e.g. ``'fall-2025'``.
        type_name: Cast type used in the array entry.

    Raises:
        ValueError: If the import block or array cannot be located.
        OSError: If the file cannot be read or written.
    """
    content = path.read_text(encoding="utf-8")
    content = _insert_after_last_json_import(content, var_name, file_id)
    content = _prepend_to_export_array(content, var_name, type_name)
    path.write_text(content, encoding="utf-8")


# ── Rollover steps ────────────────────────────────────────────────────────────


def _snapshot_instructors(current_id: str, current_term: str) -> None:
    """Writes a past-instructors snapshot for the outgoing semester.

    Reads ``src/content/instructors.json`` and writes the content to
    ``src/content/past-instructors/<current_id>.json`` wrapped in a semester
    envelope.  Skips the write if the snapshot already exists.

    Args:
        current_id: Slug of the semester being archived.
        current_term: Display label of the semester being archived.

    Raises:
        OSError: If reading or writing any file fails.
        json.JSONDecodeError: If ``instructors.json`` is malformed.
    """
    dest = _CONTENT / "past-instructors" / f"{current_id}.json"
    if dest.exists():
        logging.warning("Snapshot already exists, skipping: %s", dest.name)
        return
    people = _read_json(_CONTENT / "instructors.json")
    _write_json(dest, {"id": current_id, "term": current_term, "people": people})
    logging.info("Created past-instructors/%s.json", current_id)


def _register_past_instructor_snapshot(current_id: str) -> None:
    """Registers the instructor snapshot in ``past-instructors/index.ts``.

    Args:
        current_id: Slug of the semester whose snapshot should be registered.

    Raises:
        ValueError: If the index file structure cannot be parsed.
        OSError: If the file cannot be read or written.
    """
    index_path = _CONTENT / "past-instructors" / "index.ts"
    if f"'./{current_id}.json'" in index_path.read_text(encoding="utf-8"):
        logging.warning(
            "past-instructors/index.ts already references %s, skipping.", current_id
        )
        return
    _patch_index(index_path, _to_var(current_id), current_id, "SemesterAlumni")
    logging.info("Patched past-instructors/index.ts (+%s)", current_id)


def _reset_instructors_for_new_semester() -> None:
    """Clears instructors.json to an empty array ready for the new semester.

    The outgoing semester's roster has already been snapshotted to
    ``past-instructors/`` by ``_snapshot_instructors`` before this runs.

    Raises:
        OSError: If the file cannot be written.
    """
    dest = _CONTENT / "instructors.json"
    dest.write_text("[]\n", encoding="utf-8")
    logging.info("Reset instructors.json to empty array for new semester")


def _create_new_projects_file(new_id: str, new_term: str) -> None:
    """Creates an empty projects JSON file for the incoming semester.

    Args:
        new_id: Slug of the new semester, e.g. ``'spring-2026'``.
        new_term: Display label of the new semester, e.g. ``'Spring 2026'``.

    Raises:
        OSError: If the file cannot be written.
    """
    dest = _CONTENT / "projects" / f"{new_id}.json"
    if dest.exists():
        logging.warning("Projects file already exists, skipping: %s", dest.name)
        return
    _write_json(
        dest, {"id": new_id, "term": new_term, "classPhoto": "", "projects": []}
    )
    logging.info("Created projects/%s.json", new_id)


def _register_new_semester_in_projects(new_id: str) -> None:
    """Registers the new semester in ``projects/index.ts``.

    Args:
        new_id: Slug of the new semester to register.

    Raises:
        ValueError: If the index file structure cannot be parsed.
        OSError: If the file cannot be read or written.
    """
    index_path = _CONTENT / "projects" / "index.ts"
    if f"'./{new_id}.json'" in index_path.read_text(encoding="utf-8"):
        logging.warning("projects/index.ts already references %s, skipping.", new_id)
        return
    _patch_index(index_path, _to_var(new_id), new_id, "SemesterProjects")
    logging.info("Patched projects/index.ts (+%s)", new_id)


# ── Entry point ───────────────────────────────────────────────────────────────


def main(argv: Sequence[str]) -> None:
    """Runs the semester rollover.

    Resolves semester IDs from flags or interactive prompts, validates
    preconditions, then executes the four automated rollover steps.

    Args:
        argv: Remaining command-line arguments after flag parsing (must be empty).

    Raises:
        app.UsageError: If unexpected positional arguments are present or
            the current semester's project file cannot be found.
    """
    if len(argv) > 1:
        raise app.UsageError("Too many command-line arguments.")

    current_id = _maybe_prompt(
        _CURRENT_ID.value, "Current semester ID (e.g. fall-2025):   "
    )
    new_id = _maybe_prompt(_NEW_ID.value, "New semester ID     (e.g. spring-2026): ")
    hint = _to_term(new_id)
    raw_term = _maybe_prompt(
        _NEW_TERM.value, f"New semester label  [{hint}]:          "
    )
    new_term = raw_term or hint

    current_project_file = _CONTENT / "projects" / f"{current_id}.json"
    if not current_project_file.exists():
        raise app.UsageError(
            f"Cannot find src/content/projects/{current_id}.json. "
            "Ensure the current semester's project file exists before rolling over."
        )

    current_term = _read_json(current_project_file).get("term", _to_term(current_id))
    logging.info("Archiving : %s (%s)", current_term, current_id)
    logging.info("Starting  : %s (%s)", new_term, new_id)

    _snapshot_instructors(current_id, current_term)
    _register_past_instructor_snapshot(current_id)
    _reset_instructors_for_new_semester()
    _create_new_projects_file(new_id, new_term)
    _register_new_semester_in_projects(new_id)

    logging.info("Rollover complete. Manual steps remaining:")
    logging.info(
        "  1. src/content/info.json           -- set semester, syllabus, calendar ID"
    )
    logging.info(
        "  2. src/content/instructors.json    -- populate with %s staff (cleared)", new_term
    )
    logging.info(
        "  3. src/content/course_content.json -- replace with %s schedule", new_term
    )
    logging.info(
        "  4. src/content/overview_blurb.txt  -- update if description changed"
    )
    logging.info("  5. public/                         -- add new syllabus PDF")
    logging.info(
        "  6. npm run dev                     -- verify the site looks correct"
    )


if __name__ == "__main__":
    app.run(main)
