import Link from "next/link";

import { listMarkdownDocs } from "@/lib/fs-docs";
import { KAMPEYN_DOCS_DIR } from "@/lib/paths";

export default async function KampeynPage() {
  const docs = await listMarkdownDocs(KAMPEYN_DOCS_DIR);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Kampeyn War Room</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Browse internal docs in <code>kambot/kampeyn-war-room/</code>.
        </p>
      </header>

      <div className="rounded-lg border bg-white">
        <div className="border-b px-4 py-3 text-sm font-medium">Documents</div>
        <ul className="divide-y">
          {docs.map((d) => (
            <li key={d.relPath} className="px-4 py-3">
              <Link className="text-sm hover:underline" href={`/kampeyn/docs/${d.slug.join("/")}`}>
                {d.relPath}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
