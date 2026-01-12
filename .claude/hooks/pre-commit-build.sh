#!/usr/bin/env bash
set -euo pipefail

cmd=$(jq -r '.tool_input.command // ""')

# Only run checks for git commit commands
if ! echo "$cmd" | grep -Eq '\bgit\s+commit\b'; then
  exit 0
fi

# Check if docs files are being committed
staged_docs=$(git diff --cached --name-only -- 'docs/' 2>/dev/null || true)
if [ -n "$staged_docs" ]; then
  echo "Docs files staged - verify migration patterns (em-dashes, quotes, admonitions)." >&2
fi

echo "Running build before commit..." >&2

# Run the build
if ! npm run build 2>&1; then
  echo "Build failed. Fix errors before committing." >&2
  exit 2
fi

echo "Build passed!" >&2
exit 0
