import Link from "next/link";

import { listMarkdownDocs } from "@/lib/fs-docs";
import { listActivity, listNotes, listTasks, getAgentStatus } from "@/lib/db/warroom";
import type { ProjectKey } from "@/lib/db/warroom";

const STATUS_LABELS: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const PRIORITY_LABELS: Record<string, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default async function WarRoomDashboard({
  project,
  title,
  docsDir,
  docsBasePath,
}: {
  project: ProjectKey;
  title: string;
  docsDir: string;
  docsBasePath: string;
}) {
  const [tasks, notes, activity, status, docs] = await Promise.all([
    listTasks(project),
    listNotes(project),
    listActivity(project, 50),
    getAgentStatus(),
    listMarkdownDocs(docsDir),
  ]);

  const grouped = {
    todo: tasks.filter((t: any) => t.status === "todo"),
    in_progress: tasks.filter((t: any) => t.status === "in_progress"),
    done: tasks.filter((t: any) => t.status === "done"),
  };

  const byPriority = (items: any[]) => ({
    high: items.filter((t) => t.priority === "high"),
    medium: items.filter((t) => t.priority === "medium"),
    low: items.filter((t) => t.priority === "low"),
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-zinc-600">
          Live war room dashboard with tasks, notes, activity log, and docs.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <aside className="space-y-6">
          <section className="rounded-lg border bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">Status</div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold capitalize">{status?.state || "idle"}</div>
                <div className="text-xs text-zinc-500">Updated {status?.updated_at || "—"}</div>
              </div>
              <div className="rounded-full border px-2 py-1 text-xs capitalize">
                {status?.state || "idle"}
              </div>
            </div>
            {status?.current_task_title ? (
              <div className="mt-3 text-sm text-zinc-700">
                <div className="text-xs uppercase text-zinc-500">Current focus</div>
                <div className="mt-1 font-medium">{status.current_task_title}</div>
              </div>
            ) : null}

            <form className="mt-4 space-y-2" action="/api/warroom/status" method="post">
              <label className="block text-xs font-medium text-zinc-600">Set status</label>
              <select
                name="state"
                className="w-full rounded border px-2 py-1 text-sm"
                defaultValue={status?.state || "idle"}
              >
                <option value="working">Working</option>
                <option value="idle">Idle</option>
                <option value="offline">Offline</option>
              </select>
              <input
                name="current_task_title"
                placeholder="Current focus (optional)"
                className="w-full rounded border px-2 py-1 text-sm"
              />
              <button className="w-full rounded bg-black px-3 py-2 text-sm font-medium text-white">
                Update status
              </button>
            </form>
          </section>

          <section className="rounded-lg border bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">Notes inbox</div>
            <form className="mt-3 space-y-2" action="/api/warroom/note" method="post">
              <input type="hidden" name="project" value={project} />
              <textarea
                name="body"
                required
                rows={3}
                placeholder="Drop a note or request"
                className="w-full rounded border px-2 py-1 text-sm"
              />
              <button className="w-full rounded bg-zinc-900 px-3 py-2 text-sm font-medium text-white">
                Add note
              </button>
            </form>

            <div className="mt-4 space-y-3">
              {notes.length === 0 ? (
                <div className="text-sm text-zinc-500">No notes yet.</div>
              ) : (
                notes.map((note: any) => (
                  <div key={note.id} className="rounded border px-3 py-2">
                    <div className="text-xs text-zinc-500">
                      {note.seen ? "Seen" : "New"} · {note.created_at}
                    </div>
                    <div className="mt-1 text-sm">{note.body}</div>
                    {!note.seen ? (
                      <form action="/api/warroom/note/seen" method="post" className="mt-2">
                        <input type="hidden" name="id" value={note.id} />
                        <button className="rounded border px-2 py-1 text-xs">Mark seen</button>
                      </form>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </section>
        </aside>

        <main className="space-y-6">
          <section className="rounded-lg border bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Kanban</div>
              <form className="flex flex-wrap gap-2" action="/api/warroom/task" method="post">
                <input type="hidden" name="project" value={project} />
                <input
                  name="title"
                  placeholder="New task"
                  required
                  className="rounded border px-2 py-1 text-sm"
                />
                <input
                  name="description"
                  placeholder="Details (optional)"
                  className="rounded border px-2 py-1 text-sm"
                />
                <select name="priority" className="rounded border px-2 py-1 text-sm" defaultValue="medium">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button className="rounded bg-black px-3 py-1.5 text-sm text-white">Add</button>
              </form>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {(["todo", "in_progress", "done"] as const).map((statusKey) => {
                const bucket = byPriority(grouped[statusKey]);
                return (
                  <div key={statusKey} className="rounded border bg-zinc-50 p-3">
                    <div className="mb-2 text-xs font-semibold uppercase text-zinc-500">
                      {STATUS_LABELS[statusKey]}
                    </div>
                    {(["high", "medium", "low"] as const).map((priorityKey) => (
                      <div key={priorityKey} className="mb-3">
                        <div className="text-xs font-medium text-zinc-500">
                          {PRIORITY_LABELS[priorityKey]}
                        </div>
                        <div className="mt-2 space-y-2">
                          {bucket[priorityKey].length === 0 ? (
                            <div className="text-xs text-zinc-400">No tasks</div>
                          ) : (
                            bucket[priorityKey].map((task: any) => (
                              <div key={task.id} className="rounded border bg-white p-2">
                                <div className="text-sm font-medium">{task.title}</div>
                                {task.description ? (
                                  <div className="mt-1 text-xs text-zinc-600">
                                    {task.description}
                                  </div>
                                ) : null}
                                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                                  <span>#{task.id}</span>
                                  <span>{task.created_at}</span>
                                </div>
                                <form
                                  action="/api/warroom/task/status"
                                  method="post"
                                  className="mt-2 flex items-center gap-2"
                                >
                                  <input type="hidden" name="id" value={task.id} />
                                  <select
                                    name="status"
                                    defaultValue={task.status}
                                    className="rounded border px-1 py-0.5 text-xs"
                                  >
                                    <option value="todo">To Do</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="done">Done</option>
                                  </select>
                                  <button className="rounded border px-2 py-0.5 text-xs">
                                    Move
                                  </button>
                                </form>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border bg-white p-4">
            <div className="text-sm font-semibold">Activity log</div>
            <div className="mt-3 space-y-2">
              {activity.length === 0 ? (
                <div className="text-sm text-zinc-500">No activity yet.</div>
              ) : (
                activity.map((item: any) => (
                  <div key={item.id} className="flex flex-col gap-1 rounded border px-3 py-2">
                    <div className="text-xs text-zinc-500">{item.ts}</div>
                    <div className="text-sm">
                      <span className="font-medium">{item.actor}</span> — {item.action}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-lg border bg-white p-4">
            <div className="text-sm font-semibold">Docs & deliverables</div>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {docs.length === 0 ? (
                <div className="text-sm text-zinc-500">No docs found.</div>
              ) : (
                docs.map((doc) => (
                  <div key={doc.relPath} className="rounded border px-3 py-2">
                    <div className="text-xs text-zinc-500">{doc.relPath}</div>
                    <Link
                      className="mt-1 inline-flex text-sm text-blue-600 hover:underline"
                      href={`${docsBasePath}/${doc.slug.join("/")}`}
                    >
                      Open doc →
                    </Link>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
