import ReactMarkdown from "react-markdown";

import { readMarkdownDoc } from "@/lib/fs-docs";
import { ORGANIZESD_DIR } from "@/lib/paths";

export default async function OrganizeSdPage() {
  // Minimal first dashboard: render the existing owner board markdown.
  const doc = await readMarkdownDoc(ORGANIZESD_DIR, ["ops", "owner-board"]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Organize SD War Room</h1>
        <p className="mt-2 text-sm text-zinc-600">
          First pass view of the Owner + Due Date Board.
        </p>
      </header>

      <div className="rounded-lg border bg-white p-6">
        <div className="mb-4 text-xs text-zinc-500">{doc.relPath}</div>
        <article className="prose max-w-none">
          <ReactMarkdown>{doc.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
