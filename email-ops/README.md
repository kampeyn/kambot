# Email Ops (Fundraising)

This folder is the source of truth for drafting, approval, and scheduling of fundraising emails per client.

## Structure
- `clients/<client_slug>/`
  - `00-admin/` (contract, scope notes, compliance notes)
  - `01-voice/` (voice guide + examples)
  - `02-briefs/` (weekly briefs / themes)
  - `03-drafts/` (drafts to approve)
  - `04-approved/` (final approved emails)
  - `05-sends/` (send logs / what went out)

## Naming conventions
Use ISO dates so lists sort correctly.
- Drafts: `YYYY-MM-DD__<topic>__v1.md`
- Approved: `YYYY-MM-DD__<topic>__FINAL.md`

## Approval workflow (recommended)
1) Draft created in `03-drafts/`
2) Lenox approves (comments/edits)
3) Final moved to `04-approved/`
4) Send details recorded in `05-sends/`

Nothing in here automatically sends emails.
