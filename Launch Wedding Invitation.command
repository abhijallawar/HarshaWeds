#!/bin/bash
set -e
cd -- "$(dirname -- "$0")"
export NEXT_TELEMETRY_DISABLED=1
runtime="$PWD/../../work/runtime/node-v24.22.3-darwin-arm64/bin"
if [[ -x "$runtime/node" ]]; then
  export PATH="$runtime:$PATH"
fi
if ! command -v npm >/dev/null || ! node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a>22||a===22&&b>=18?0:1)' 2>/dev/null; then
  printf 'Install Node.js 24 LTS from https://nodejs.org/, then reopen this launcher.\n'
  read -r -p 'Press Return to close. ' || true
  exit 1
fi
if [[ ! -x node_modules/.bin/next ]]; then
  npm ci --no-audit --no-fund
fi
printf '\nOpen the Local URL shown by Next.js once it says Ready. Press Ctrl+C to stop.\n\n'
exec npm run dev
