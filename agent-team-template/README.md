# Forward-Deployed AI Agent Team: Engagement Template

A copy-per-engagement template for running a small team of AI agents on a forward-deployed
AI engagement in regulated healthcare. You stay the orchestrator and the only person who talks to the client.

## The team

| # | Agent | Model | Prompt | Writes |
|---|---|---|---|---|
| 1 | Discovery Analyst | Sonnet 5.5 | `prompts/1-discovery-analyst.md` | `01-discovery/brief.md` |
| 2 | Solution Architect | Opus 5.5 | `prompts/2-solution-architect.md` | `02-design/design.md`, `eval-plan.md`, `risks.md` |
| 3 | Build Engineer | Claude Code | `CLAUDE.md` | code, tests, `03-build/changelog.md` |
| 4 | Independent Auditor | Opus 5.5 (fresh context) | `prompts/4-independent-auditor.md` | `04-audit/audit.md` |
| 5 | Delivery Writer (add in week 2) | Haiku 4.5 | `prompts/5-delivery-writer.md` | `05-delivery/status-YYYY-MM-DD.md` |

## Workflow

```
Client calls/docs ──► [1 Discovery Analyst] ──► brief.md
                                  ◆ GATE 1: you review and confirm with the client
                      [2 Solution Architect] ──► design.md + eval-plan.md + risks.md
                                  ◆ GATE 2: you approve the scope and the PHI boundary
                      [3 Build Engineer] ⇄ CI (tests and evals fail closed)
                           ▲ Blocker/Major          │
                           └──────── [4 Independent Auditor] ──► audit.md
                                  ◆ GATE 3: no open Blockers, then you sign off and deploy
                      [5 Delivery Writer] ──► status / steering deck ──◆ you send it
```

## Handoff contract

Every artifact starts with front-matter:

```yaml
---
status: draft          # draft | approved
author_agent: architect
inputs: [01-discovery/brief.md@<git sha>]
open_questions: 0
approved_by:           # your name, set only by a human
---
```

An agent must not start unless all of its inputs are `status: approved`. Run
`scripts/check-gate.sh <stage>` before starting each stage. It exits non-zero if an input is not approved.

## Rules that never bend

1. **No real PHI** goes to any agent unless a BAA or zero-data-retention agreement covers that API. Default to synthetic data.
2. **The LLM routes; it never computes** money, eligibility, coverage or clinical facts.
3. **The builder never audits itself.** The auditor gets the spec and the result, never the build conversation.
4. **Agents never talk to the client.** All external communication goes through you.
5. **Escalation:** the build–audit loop runs at most 3 rounds. Anything touching PHI, money or a coverage or clinical decision goes to you regardless of severity.

## Start a new engagement

1. Copy this folder into a new repo named for the client.
2. Put the discovery inputs (transcripts, SOPs, synthetic samples) in `01-discovery/inputs/`.
3. Run agent 1 with its prompt, review the brief, set `status: approved` (Gate 1).
4. Run `scripts/check-gate.sh design` → agent 2 → review (Gate 2).
5. Run `scripts/check-gate.sh build` → Claude Code in the repo, which reads `CLAUDE.md`.
6. Run `scripts/check-gate.sh audit` → the auditor in a **new** session → fix and repeat (max 3 rounds).
7. Gate 3: `scripts/check-gate.sh deploy` → you sign off.

## Success metrics (record a baseline before the first engagement)

- Days from kickoff to approved design (target: −40%)
- Defects found by the auditor before deploy versus after deploy (target: zero after deploy)
- Your hours per week on writing as opposed to building or client time (target: −50%)
- How often the auditor catches planted bugs (target: 100%; re-test monthly with 2 planted bugs)

## 7-day rollout

| Day | Do this |
|---|---|
| 1 | Copy the template, using a **past** engagement as the test bed. |
| 2 | Run the Discovery Analyst on the old material and compare it with your real brief. |
| 3 | Run the Architect. Check the "routes, never computes" rule and the compliance findings. |
| 4 | Rebuild one component with Claude Code under `CLAUDE.md`. |
| 5 | Plant 2 bugs and run the Auditor. It must catch both. |
| 6 | Fix the prompts and gates based on what failed. |
| 7 | Use the team on a small, real piece of client work and add the Delivery Writer. |
