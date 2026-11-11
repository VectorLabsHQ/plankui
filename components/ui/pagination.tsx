import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

function range(page: number, count: number, siblings: number): (number | "gap")[] {
  const total = siblings * 2 + 5;
  if (count <= total) return Array.from({ length: count }, (_, i) => i + 1);
  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, count - 1);
  const out: (number | "gap")[] = [1];
  if (left > 2) out.push("gap");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < count - 1) out.push("gap");
  out.push(count);
  return out;
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown either side of the current one. */
  siblings?: number;
  /** Show the "Previous" and "Next" words. Turn off in narrow places; the arrows stay, with labels for screen readers. */
  labels?: boolean;
  className?: string;
}

const cell =
  "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-input px-2 text-sm font-medium transition-[background-color,color] duration-[var(--dur-micro)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-40";

export function Pagination({ page, pageCount, onPageChange, siblings = 1, labels = true, className }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn("flex max-w-full items-center gap-1", className)}>
      <button className={cn(cell, "text-ink-2 hover:bg-paper-3")} disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label={labels ? undefined : "Previous page"}>
        <ChevronLeft className="size-4" /> {labels && <span className="hidden sm:inline">Previous</span>}
      </button>
      {range(page, pageCount, siblings).map((p, i) =>
        p === "gap" ? (
          <span key={`g${i}`} className="px-1 text-muted">…</span>
        ) : (
          <button
            key={p}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onPageChange(p)}
            className={cn(
              cell,
              "tabular-nums",
              p === page ? "vx-glass border border-[color:var(--key-border)] bg-key-face text-ink shadow-key" : "text-ink-2 hover:bg-paper-3",
            )}
          >
            {p}
          </button>
        ),
      )}
      <button className={cn(cell, "text-ink-2 hover:bg-paper-3")} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} aria-label={labels ? undefined : "Next page"}>
        {labels && <span className="hidden sm:inline">Next</span>} <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
