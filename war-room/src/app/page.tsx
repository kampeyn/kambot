import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white p-6">
        <h1 className="text-2xl font-semibold">War Rooms</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Internal dashboards for docs, status, and execution.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50"
            href="/kampeyn"
          >
            Kampeyn War Room
          </Link>
          <Link
            className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50"
            href="/organizesd"
          >
            Organize SD War Room
          </Link>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold">What’s live right now</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>
            Kampeyn War Room: doc viewer over <code>kambot/kampeyn-war-room/</code>
          </li>
          <li>
            Organize SD War Room: first pass “Owner Board” view over
            <code>kambot/organizesd/ops/owner-board.md</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
