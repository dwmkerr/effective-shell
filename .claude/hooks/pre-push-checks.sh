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
if ! npm run build >&2 2>&1; then
  echo "Build failed. Fix errors before pushing." >&2
  exit 2
fi

# Build passed - output JSON to trigger permission dialog
cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "Build passed. Confirm push to remote."
  }
}
EOF
