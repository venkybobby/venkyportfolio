# jev-trader — Spec, Architecture, Plan (APPROVAL GATE 1–3)

Status: **awaiting approval. No code has been written.**
Venue: Alpaca **paper** · Asset: **SPY** · Deploy: **Linux VPS** · Manual approval: any order > **$500** notional.

---

## 0. Blockers found before starting

| Item | Status | What I need |
|---|---|---|
| New repo `jev-trader` | GitHub integration got a 403 on repo creation | Create an empty repo `jev-trader` yourself; I'll attach it and move this folder there. Until then I work in `trading-bot/` on this branch. |
| AgenKit (agenkit.xyz) | Blocked by this environment's network policy, so it can't be installed | Allow `agenkit.xyz` in the environment's network settings, **or** approve the fallback: I run the same six phases by hand, each with a gate file in `docs/phases/`. |
| Jev SDK docs | jevapi.dev / typesafe docs blocked | Allow the Jev domains, or paste the SDK install line and one request/response example. Jev sits behind an interface, so this doesn't hold up the build. |
| Keys | Not requested yet | After you approve, I'll create `.env.example`. You fill in `.env` yourself on the VPS. I never see, print or commit the keys. |

---

## 1. SPEC

### 1.1 Goal
Run a paper-trading system on SPY in which:
- **Opus** writes and revises the strategies (nightly, offline).
- **Jev** scores live setups as calibrated probabilities, once per candle.
- **Deterministic code** owns state, thresholds, sizing, risk vetoes and orders.

The system must be able to refuse to trade, and refusing is the expected default.

### 1.2 Candidate strategies (all three are backtested; only gate-clearers survive)
1. **Trend pullback**: in an established trend (EMA slope plus ADX), enter on a pullback to the fast EMA. ATR stop, 2R target.
2. **Mean reversion**: in a range regime, fade a 20-bar z-score beyond ±2. Exit at the mean, stop at ±3.5σ.
3. **Breakout + flow**: break of the opening range or N-bar range, confirmed by signed order-flow imbalance. Stop back inside the range.

Each strategy is tested on 5m, 15m and 1h bars. All parameter grids are fixed **before** the backtest runs.

### 1.3 Acceptance gates (computed by the harness, never by Opus)
Out of sample, net of costs:
- Sharpe > 1.5 (annualized, daily returns)
- Max drawdown < 15%
- Hit rate > 55%
- t-statistic of mean trade return > 2.0
- **Added by me:** a Deflated Sharpe Ratio > 0.95 that accounts for the number of variants tried. Testing about 3 strategies × 3 timeframes × a parameter grid means one variant will clear t > 2 by luck. Without this correction the gate is weaker than it looks.

**Data split:** 2021-10 → 2026-09 (5 years).
- Walk-forward: train 12 months, test 3 months, rolling.
- The **final 12 months are a locked holdout**, run once per strategy version.
- Regimes covered: the 2022 bear market and rate shock, the 2023–24 low-vol melt-up, and the 2025 tariff volatility spike. Results are reported for each regime.

**Costs:** 1 bp half-spread + 1 bp slippage per side, $0 commission, plus a stress run at 2×. A strategy must pass at 1× and stay profitable at 2×.

### 1.4 Honest prior
Intraday SPY strategies rarely reach Sharpe 1.5 **and** a hit rate above 55% after costs. **The likeliest outcome is that none of the three passes.** In that case the bot runs the dashboard and logs Jev's calls, but places no trades, and Opus's nightly loop keeps proposing revisions against the same gates. I won't loosen the gates to get a trade.

### 1.5 Data available on Alpaca (and its limits)
- Bars, trades and NBBO quotes: available. The free IEX feed covers only ~2–3% of volume, and SIP needs a paid plan. **Decision needed: IEX (free) or SIP ($99/mo).** Backtests on IEX can give misleading spreads and flow.
- **No order-book depth for equities.** "Order book imbalance" is therefore *top-of-book size imbalance*: (bid_sz − ask_sz)/(bid_sz + ask_sz) from NBBO.
- "Recent order flow" is signed volume from the trade tape, using the Lee-Ready / tick rule.

### 1.6 Out of scope for v1
Live money, options, other assets, and news/headline features. Headlines are not fed to anything, which removes the prompt-injection surface. If they are added later, they enter only as numeric features.

---

## 2. ARCHITECTURE

```
            NIGHTLY (slow brain)                          EVERY CANDLE (fast path, < 1 s)
 ┌─────────────────────────────────────┐   ┌──────────────────────────────────────────────────────┐
 │ research/nightly.py                 │   │ data/stream ──▶ state/engine ──▶ snapshot (numeric)  │
 │  Opus reads: fills, misses,         │   │                                     │                 │
 │  calibration, losses                │   │                          jev/client (timeout 800ms)   │
 │  Opus writes: strategy.md diff,     │   │                                     │ probs+conf      │
 │  questions.yaml diff, new rule      │   │                          calibration/recal (per Q)    │
 │        │                            │   │                                     │                 │
 │        ▼                            │   │                          policy/combiner (weights,    │
 │  backtest harness (code) ── gates ──┼──▶│                           thresholds from strategy.md)│
 │  pass → staged/ for human merge     │   │                                     │                 │
 │  fail → logged, nothing ships       │   │                          sizing/kelly (¼ cap)         │
 └─────────────────────────────────────┘   │                                     │                 │
                                           │      risk/guard  ◀── HARD LIMITS (code constants)     │
                                           │         │ veto? ──▶ log + alert, no order             │
                                           │         ▼ >$500? ──▶ Telegram approve/deny (60 s,     │
                                           │         │                default DENY)               │
                                           │      execution/alpaca (paper URL asserted)            │
                                           │         │                                             │
                                           │      ledger (SQLite) ──▶ dashboard (SSE) / reports    │
                                           └──────────────────────────────────────────────────────┘
```

**Layer rule, enforced by tests:**
- Modules under `jev/` and `research/` cannot import `risk/`, `execution/` or `config/limits`.
- Only `risk/guard` can approve an order, and `execution/` accepts nothing except a `GuardApproved` token that `risk/guard` creates.

### Modules (Python 3.12)
| Module | Responsibility |
|---|---|
| `config/limits.py` | Frozen dataclass of hard limits **in code**, not in env or models. Max position $2,000 and ≤ 20% of equity; daily loss −2% → halt for the day; max drawdown −10% from peak → kill switch; max 6 trades/day; trading only 09:45–15:45 ET; flat by 15:55. |
| `data/` | Alpaca historical loader cached to parquet; live websocket for bars, quotes and trades. A stale-data watchdog blocks trading if no data arrives for more than 2 bars. |
| `state/engine.py` | Builds a deterministic snapshot: price, spread_bp, tob_imbalance, realized vol (5/20/60 bars), trend (EMA slopes, ADX), signed flow (5/20 bars), time-of-day, gap. Every input carries a timestamp and must satisfy `ts < decision_ts` (a property test proves there's no lookahead). About 20 floats in total. |
| `jev/questions.py` | Compiled from strategy.md. `regime`: Choice{trend_up, trend_down, range, shock}. `direction`: Choice{long, short, flat}. `buying_pressure_real`: Noul. `setup_quality`: Score 0–10. `risk_state`: Choice{normal, elevated, stressed}. All five go in one call. |
| `jev/client.py` | A `JevClient` protocol with three implementations: the real SDK adapter, a `ReplayJev` for backtests (cached responses), and a `RuleJev` deterministic fallback. On timeout or error: no trade and an alert. |
| `calibration/` | Logs a (question, p, outcome) triple per decision. Computes Brier score and a 10-bin reliability curve for each question. Fits isotonic recalibration once there are ≥ 300 resolved outcomes. |
| `policy/combiner.py` | Uses explicit weights from strategy.md. A trade fires only if **every** calibrated probability clears its threshold and the regime matches the strategy. |
| `sizing/kelly.py` | f* = (p·b − q)/b, then f = min(¼·f*, cap) × confidence scale. f = 0 below the cutoff. **Until calibration passes (ECE < 0.05 on ≥ 300 of our own fills), size is fixed at the $200 minimum regardless of Kelly.** |
| `risk/guard.py` | Runs before every order: kill switch (a file flag, Telegram `/kill`, or a drawdown breach), daily loss, max position, trade count, hours, stale data, paper-URL assertion, and the >$500 manual approval. On a kill, it cancels all orders and flattens the position. |
| `execution/alpaca.py` | Marketable limit orders with a 2 bp collar. Startup **refuses** if the base URL isn't `paper-api.alpaca.markets` unless `LIVE_ENABLED=1` **and** `docs/final_check.md` is signed. |
| `backtest/` | Event-driven, replaying the same `state → policy → sizing → guard` code path as live. Includes walk-forward, holdout, DSR and the regime report. |
| `research/nightly.py` | Calls the Claude API (Opus) with the day's ledger and calibration report. Output goes only to `staged/`. The harness runs the gates. A human merges the change. Every loss produces one new candidate rule. |
| `alerts/telegram.py` | Alerts on fills, errors, vetoes, escalations, kill-switch events and the daily report. The approve/deny buttons are restricted to your chat ID. |
| `dashboard/` | FastAPI with server-sent events. Shows every signal, each Jev probability and confidence, the action, the veto reason and the result. Binds to localhost only; you reach it through an SSH tunnel or Tailscale. |
| `reports/daily.py` | Trades, P&L, win rate, largest loss, Jev p50/p95 latency and cost per decision, and Brier score / ECE per question. |

### Security
- Secrets live only in `.env` (chmod 600, gitignored), with a log redaction filter and a secret-scan pre-commit hook.
- Alpaca keys are paper keys. For any future live account, use trade-only permissions with transfers disabled.
- The bot never asks for or stores passwords or 2FA codes.
- Every external input is treated as data. Nothing from Telegram except `/kill`, `/status` and the approve/deny buttons from your chat ID is ever acted on.

### Deploy (VPS)
Docker image plus `docker compose` with `restart: unless-stopped`, wrapped in a systemd unit. A healthcheck endpoint is checked by a watchdog that alerts on Telegram if the bot is down for more than 2 minutes. SQLite ledger with a nightly backup.

---

## 3. PLAN (each step: failing test first → code → review against this spec → tag for rollback)

| # | Milestone | First failing test |
|---|---|---|
| 1 | Skeleton, `limits.py`, `.env.example`, redaction | Limits are immutable; a secret never appears in log output |
| 2 | `risk/guard` + kill switch | Every limit breach vetoes; kill → cancel + flatten; execution rejects an order without a token |
| 3 | `state/engine` | Property test: changing any data at or after `decision_ts` leaves the snapshot unchanged |
| 4 | Data loader + cache | Bars are gap-free during market hours; times are in ET and handle DST |
| 5 | `backtest/` engine + costs + metrics | Known synthetic series → exact Sharpe, max drawdown and t-stat |
| 6 | Three strategies as rule versions; run the gates | Walk-forward has no train/test overlap; holdout runs only once |
| 7 | **GATE: backtest report to you.** Nothing below proceeds if no strategy passes, except the Jev logging-only mode. | — |
| 8 | `jev/` questions + client + fallbacks | Timeout → no trade; one call contains all 5 questions |
| 9 | Calibration + recalibration | Brier and ECE are correct on synthetic data; sizing stays at the minimum until N ≥ 300 |
| 10 | Policy + Kelly sizing | p below cutoff → 0; position never exceeds the cap |
| 11 | Paper execution + Telegram approval | Over $500 with no reply → denied; non-paper URL → refuses to start |
| 12 | Dashboard + daily report | Every ledger row appears over SSE |
| 13 | Nightly Opus loop | A staged change that fails a gate never reaches `strategy.md` |
| 14 | VPS deploy guide + chaos test | Killing the process → restart plus alert; kill switch fires in paper |
| 15 | ≥ 4 weeks of paper trading → `final_check.md` | Paper vs. backtest tracking error is within bounds |

### Final check (written now so it can't be skipped later)
Live trading stays locked until every answer is clean:
1. Does paper trading match the backtest?
2. Did the kill switch fire in testing?
3. Is any hard limit handled by a model instead of code?
4. Is Jev calibrated on our own fills?
5. Which regime breaks the strategy?

The document ends with **"WHAT COULD BLOW UP THIS ACCOUNT?"**

---

## Decisions I need from you
1. **Approve** the spec, architecture and plan as written (or tell me what to change).
2. Data feed: **IEX free** or **SIP $99/mo**?
3. Repo: create an empty `jev-trader` repo, **or** keep the code in `trading-bot/` here?
4. AgenKit: allow the domain, **or** use the manual six-phase fallback?
5. Are the hard limits OK? Max position $2k / 20% of equity, −2% daily halt, −10% drawdown kill, $500 approval threshold.
