#!/usr/bin/env bash
set -euo pipefail

PROJECT_PATH="${1:-.}"
SKILL_NAME="video-creation-psychology-analysis"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TARGET_DIR="$PROJECT_PATH/.skills/$SKILL_NAME"

mkdir -p "$PROJECT_PATH/.skills"
mkdir -p "$PROJECT_PATH/.claude/commands"
rm -rf "$TARGET_DIR"
cp -R "$SOURCE_DIR" "$TARGET_DIR"

if [ -f "$PROJECT_PATH/AGENTS.md" ]; then
  printf "\n\n---\n\n" >> "$PROJECT_PATH/AGENTS.md"
  cat "$TARGET_DIR/AGENTS.md" >> "$PROJECT_PATH/AGENTS.md"
else
  cp "$TARGET_DIR/AGENTS.md" "$PROJECT_PATH/AGENTS.md"
fi

if [ -f "$PROJECT_PATH/CLAUDE.md" ]; then
  printf "\n\n---\n\n" >> "$PROJECT_PATH/CLAUDE.md"
  cat "$TARGET_DIR/CLAUDE.md" >> "$PROJECT_PATH/CLAUDE.md"
else
  cp "$TARGET_DIR/CLAUDE.md" "$PROJECT_PATH/CLAUDE.md"
fi

cp "$TARGET_DIR/.claude/commands/video-psychology.md" "$PROJECT_PATH/.claude/commands/video-psychology.md"

echo "Installed $SKILL_NAME to $PROJECT_PATH"
echo "Codex entry: AGENTS.md"
echo "Claude Code entry: CLAUDE.md and .claude/commands/video-psychology.md"
