# Memory Schema (final draft)

Entities:
- Memory
  - memory_id: string
  - topic: string
  - summary: string
  - rationale: string
  - sources: string[]
  - linked_tasks: string[]
  - created_at: datetime
  - updated_at: datetime
  - domain: string
  - type: string  # decision|learning|note
- Task
  - id: string
  - title: string
  - description: string
  - domain: string
  - priority: string
  - status: string
  - owner: string
  - created_at: datetime
  - due_date: date
  - dependencies: string[]
- Plan
  - id: string
  - task_id: string
  - steps: string[]
  - dependencies: string[]
  - status: string
  - created_at: datetime
- Artifact
  - id: string
  - type: string
  - link: string
  - metadata: string
  - created_at: datetime
  - updated_at: datetime

Notes
- Fields are retained with created_at/updated_at for traceability.
- Sources should reference concrete documents, PRs, or conversations.
