import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Checkbox } from "./checkbox";

export interface Task {
  id: string;
  title: string;
  done?: boolean;
  /** Short context such as a due date or a project. */
  meta?: string;
  priority?: "low" | "medium" | "high";
}

export interface TaskListProps {
  tasks: Task[];
  onTasksChange?: (tasks: Task[]) => void;
  title?: string;
  /** Show the add field at the bottom. */
  addable?: boolean;
  className?: string;
}

const tone = { low: "text-muted bg-paper-3", medium: "text-warning bg-warning/12", high: "text-danger bg-danger/12" };

/** A checklist with progress, priorities, add and delete. Completed tasks fade and strike through. */
export function TaskList({ tasks: controlled, onTasksChange, title = "Tasks", addable = true, className }: TaskListProps) {
  const [inner, setInner] = React.useState(controlled);
  const tasks = onTasksChange ? controlled : inner;
  const set = (next: Task[]) => {
    setInner(next);
    onTasksChange?.(next);
  };
  const [draft, setDraft] = React.useState("");
  const done = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? (done / tasks.length) * 100 : 0;
  const id = React.useId();
  return (
    <section aria-labelledby={`${id}-t`} className={cn("vx-glass grid w-full max-w-md gap-3 rounded-panel border border-card-border bg-card p-4 text-ink shadow-card", className)}>
      <header className="grid gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 id={`${id}-t`} className="font-semibold">{title}</h3>
          <span className="text-xs tabular-nums text-muted">{done} of {tasks.length} done</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-paper-3" role="progressbar" aria-label="Tasks done" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full origin-left rounded-full bg-accent transition-transform duration-[var(--dur-short)] ease-[var(--ease-out)]" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
      </header>
      <ul className="grid gap-0.5">
        {tasks.map((t) => (
          <li key={t.id} className="group flex items-center gap-3 rounded-input px-2 py-2 hover:bg-paper-2">
            <Checkbox
              id={`${id}-${t.id}`}
              checked={!!t.done}
              onCheckedChange={(v) => set(tasks.map((x) => (x.id === t.id ? { ...x, done: v === true } : x)))}
            />
            <label htmlFor={`${id}-${t.id}`} className="grid min-w-0 flex-1 cursor-pointer">
              <span className={cn("truncate text-sm transition-colors duration-[var(--dur-micro)]", t.done ? "text-muted line-through" : "text-ink")}>{t.title}</span>
              {t.meta && <span className="truncate text-xs text-muted">{t.meta}</span>}
            </label>
            {t.priority && !t.done && <span className={cn("rounded-sm px-1.5 py-0.5 text-[11px] font-medium capitalize", tone[t.priority])}>{t.priority}</span>}
            <button
              type="button"
              aria-label={`Delete ${t.title}`}
              onClick={() => set(tasks.filter((x) => x.id !== t.id))}
              className="grid size-7 place-items-center rounded-sm text-muted opacity-0 hover:bg-paper-3 hover:text-danger focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-focus group-hover:opacity-100"
            >
              <Trash2 className="size-3.5" />
            </button>
          </li>
        ))}
      </ul>
      {addable && (
        <form
          className="flex items-center gap-2 rounded-input border border-dashed border-rule-2 px-2 focus-within:border-accent"
          onSubmit={(e) => {
            e.preventDefault();
            const title = draft.trim();
            if (!title) return;
            set([...tasks, { id: `${Date.now()}`, title }]);
            setDraft("");
          }}
        >
          <Plus aria-hidden className="size-4 text-muted" />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a task and press Enter"
            aria-label="New task"
            className="h-9 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </form>
      )}
    </section>
  );
}
