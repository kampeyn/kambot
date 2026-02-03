# kambot Brain onboarding (final)

Purpose
- Provide a structured brain for kambot on main, including memory, planning templates, governance, and interfaces. Acts as the core cognition layer for Lenox's workflow.

Structure
- brain/ memory/ planning/ interfaces/ governance/
- templates/ for PRs and memory writebacks
- digests/ for nightly digest outputs
- onboarding/ this doc set lives here

Governance
- Lenox approves live changes; kambot drafts PRs for proposed changes
- memory/schema changes require justification and references
- secrets never stored in repo; use env/secret manager

Contributing
- Create a feature branch, draft changes, open a PR to main as draft
- Link memory entries to tasks, include rationale and sources
- After review, merge or adjust per approval

Next steps
- Seed memory/schema with concrete fields
- Add operating-model README
- Wire up nightly digest body format
