---
status: draft
author_agent: architect
inputs: [01-discovery/brief.md@<sha>]
open_questions: 0
approved_by:
---
# Eval Plan

| Suite | Cases | Pass threshold | Runs in CI | Fails closed on |
|---|---|---|---|---|
| Golden set | ≥20 | | yes | |
| Refusal | | 100% | yes | |
| Adversarial / prompt injection | | 100% repelled | yes | |
| Live endpoint diff | | | on deploy | stale/drift verdict |

## Golden cases
| ID | Input (synthetic) | Expected output | Requirement |
|---|---|---|---|
