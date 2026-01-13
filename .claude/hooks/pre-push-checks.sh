#!/usr/bin/env bash
set -euo pipefail

cmd=$(jq -r '.tool_input.command // ""')

# Only run checks for git push commands
if ! echo "$cmd" | grep -Eq '\bgit\s+push\b'; then
  exit 0
fi

# Block pushes to main/master
if echo "$cmd" | grep -Eq '\bgit\s+push\s+(origin\s+)?(main|master)\b'; then
  echo "BLOCKED: Direct push to main/master is not allowed." >&2
  echo "Create a feature branch and open a PR instead." >&2
  exit 2
fi

# Block force pushes entirely
if echo "$cmd" | grep -Eq '\bgit\s+push\s+.*--force'; then
  echo "BLOCKED: Force push is not allowed." >&2
  exit 2
fi

# Run build before push
echo "Running build before push..." >&2
if ! npm run build 2>&1; then
  echo "Build failed. Fix errors before pushing." >&2
  exit 2
fi

# Require explicit confirmation
echo "" >&2
echo "=== PUSH CONFIRMATION REQUIRED ===" >&2
echo "Command: $cmd" >&2
echo "" >&2
echo "Build passed. Please confirm you want to push." >&2
echo "Ask the user for explicit confirmation before proceeding." >&2
exit 2
