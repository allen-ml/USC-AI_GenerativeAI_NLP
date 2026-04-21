#!/usr/bin/env bash
# Installs git hooks from .hooks/ into .git/hooks/.
# Run once after cloning: bash scripts/install-hooks.sh
# Also called automatically by `npm install` via the prepare script.

set -e

HOOKS_DIR=".hooks"
GIT_HOOKS_DIR=".git/hooks"

if [ ! -d "$GIT_HOOKS_DIR" ]; then
  echo "Not a git repository — skipping hook installation."
  exit 0
fi

for hook in "$HOOKS_DIR"/*; do
  name="$(basename "$hook")"
  target="$GIT_HOOKS_DIR/$name"
  cp "$hook" "$target"
  chmod +x "$target"
  echo "Installed $name hook"
done

echo "Git hooks installed."
