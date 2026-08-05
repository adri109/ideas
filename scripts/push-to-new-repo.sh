#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${1:-https://github.com/adri109/gmail-inbox-agent.git}"

echo "Pushing to ${REPO_URL}"
echo "Make sure the empty repository already exists on GitHub."
echo

git remote remove gmail-inbox-agent 2>/dev/null || true
git remote add gmail-inbox-agent "${REPO_URL}"
git push -u gmail-inbox-agent cursor/gmail-inbox-agent-3e8f:main

echo
echo "Done. Set gmail-inbox-agent as default remote:"
echo "  git remote set-url origin ${REPO_URL}"
