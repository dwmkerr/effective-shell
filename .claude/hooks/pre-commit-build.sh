#!/usr/bin/env bash
set -euo pipefail

cmd=$(jq -r '.tool_input.command // ""')

# Only run checks for git commit commands
if ! echo "$cmd" | grep -Eq '\bgit\s+commit\b'; then
  exit 0
fi

echo "Running build before commit..." >&2

# Run the build (includes TypeScript check)
if ! npm run build 2>&1; then
  echo "Build failed. Fix errors before committing." >&2
  exit 2
fi

echo "Build passed!" >&2
exit 0
