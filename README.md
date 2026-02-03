# kambot

Internal ops + automation brain for Kampeyn. This repository now serves as the canonical home for the kambot brain and its governance, memory schema, and nightly digest workflow. Key branches:

- main: the canonical default branch housing the kambot brain (memory, templates, onboarding, digests, governance)
- brain: (removed) previously used as a separate brain branch; all brain content now in main

What kambot does
- Brain onboarding, memory/schema templates, and a nightly digest workflow that seeds memory and surfaces a digest in a PR draft to main
- PR draft workflow for proposed changes to the kambot brain
- War-room digest outputs consumed by the dashboard for situational awareness

What’s in this repo
- brain/ — memory, planning templates, governance, onboarding
- brain/templates/ — PR templates, memory writeback templates, task templates
- brain/digests/ — nightly digest seeds and artifacts
- .github/workflows/ — automation for nightly digests

How to contribute
- Create a feature branch with your changes
- Open a PR to main as a draft for review
- Provide memory entries with rationale and sources

Branch policy (current)
- main is the default/canonical branch
- All brain content and automated seeds should be merged via PRs to main

Notes
- Secrets must never be stored in the repo; use secret managers/environment variables
- This repo may host content that ties into war-room dashboards; ensure outputs are SIGINT-friendly (readable, parsable)

