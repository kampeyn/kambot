# MEMORY.md (Long-Term)

> Curated, durable context for this workspace. This is **not** a raw log.
> 
> **Rules of thumb**
> - Keep it short, factual, and actionable.
> - Prefer stable preferences + decisions over ephemeral details.
> - Don’t store secrets (API keys, passwords, tokens). Reference *where* they live instead.
> - Update when a decision changes; otherwise append dated notes sparingly.

---

## Person: Lenox Ramsey
- Runs a one-person political consulting business.
- Advises U.S. Democratic candidates; focus on fundraising.
- Timezone: **TBD**.

## Working Style / Preferences
- Wants a highly proactive assistant that takes work off his plate and helps grow revenue.
- Preference: meaningful work overnight so he wakes up to progress.
- Workflow: prefer PRs for review; do not push anything live without Lenox testing/committing.
- Requested schedule: nightly work session at **10:30pm** (timezone TBD).

### Communication Protocol (Lenox + Group Chats)
- **Acknowledge every request immediately** — confirm receipt before starting work
- **Provide status updates** — communicate: "working on it," "finished," "need clarification," etc.
- **Don't leave requests hanging** — if I start responding then stop, it's confusing; keep Lenox informed of progress
- **Apply to group chats too** — same acknowledgment + status protocol for team members

## Operational Decisions
- When enabling new integrations/providers, avoid vendor lock-in when feasible.
- Do **not** persist secrets (API keys, passwords) in repo files.

## Current Initiatives / Threads
### FEC contributions scraping
- Candidate option: Apify actor for FEC contributions scraping:
  - https://apify.com/parseforge/fec-campaign-finance-contributions-scraper
- Plan: document/evaluate first; compare alternatives and limitations before implementation.

### Model + search stack (in progress)
- Desired: Kimi (Moonshot) as primary chat/reasoning model; keep Codex / GPT‑5.2 for coding.
- Search/retrieval: open to using Firecrawl instead of Gemini-as-search.
- Note: API keys were pasted in chat; **rotate/regenerate** and store via env/secret manager.

## Clawdbot Configuration Notes
- Memory flush before compaction: enabled.
- Memory search enabled with sources: `memory` + `sessions`.
- Experimental session-memory indexing: enabled.

## Open Questions / Next Confirmations
- Lenox timezone (IANA, e.g. `America/New_York`).
- What to call the assistant + preferred vibe/emoji.
- Confirm exact model IDs/endpoints for Moonshot/Kimi and where secrets should live (env vars, password manager, etc.).

---

## Change Log (sparse)
- 2026-01-31: Initialized long-term memory file; recorded current initiatives + configuration decisions.
