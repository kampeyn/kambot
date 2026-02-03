# Conversations Schema (draft)

Fields:
- id: string
- title: string
- participants: string[]
- requester: string
- prompt_summary: string
- response_summary: string
- created_at: datetime
- updated_at: datetime
- status: string (open|archived|resolved)
- sources: string[]
- notes: string
