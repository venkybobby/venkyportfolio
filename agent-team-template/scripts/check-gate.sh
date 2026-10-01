#!/usr/bin/env bash
# Usage: scripts/check-gate.sh <design|build|audit|deploy>
# Exits non-zero unless every input for the stage is `status: approved`
# (and, for deploy, the audit has no open Blockers).
set -euo pipefail
cd "$(dirname "$0")/.."

case "${1:-}" in
  design) inputs=(01-discovery/brief.md) ;;
  build)  inputs=(01-discovery/brief.md 02-design/design.md 02-design/eval-plan.md 02-design/risks.md) ;;
  audit)  inputs=(01-discovery/brief.md 02-design/design.md 02-design/eval-plan.md) ;;
  deploy) inputs=(02-design/design.md 02-design/eval-plan.md 04-audit/audit.md) ;;
  *) echo "usage: $0 <design|build|audit|deploy>" >&2; exit 2 ;;
esac

field() { sed -n '/^---$/,/^---$/p' "$1" | sed -n "s/^$2:[[:space:]]*//p" | sed 's/[[:space:]]*#.*//' | head -1; }

fail=0
for f in "${inputs[@]}"; do
  if [[ ! -f $f ]]; then echo "✗ $f missing"; fail=1; continue; fi
  status=$(field "$f" status)
  if [[ $status != approved ]]; then echo "✗ $f is '${status:-unset}', not approved"; fail=1
  elif [[ -z $(field "$f" approved_by) ]]; then echo "✗ $f approved but approved_by is empty"; fail=1
  else echo "✓ $f"; fi
done

if [[ $1 == deploy && -f 04-audit/audit.md ]]; then
  blockers=$(field 04-audit/audit.md open_blockers)
  if [[ ${blockers:-1} != 0 ]]; then echo "✗ audit has ${blockers:-unknown} open Blocker(s)"; fail=1; fi
fi

if [[ $fail -ne 0 ]]; then echo "Gate '$1' is CLOSED."; exit 1; fi
echo "Gate '$1' is OPEN."
