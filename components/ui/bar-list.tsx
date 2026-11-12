import * as React from "react";
import { cn } from "@/lib/cn";

export interface BarListItem {
  name: string;
  value: number;
  /** An icon or favicon shown before the name. */
  icon?: React.ReactNode;
  href?: string;
}

export interface BarListProps {
  items: BarListItem[];
  /** Sort from largest to smallest. */
  sorted?: boolean;
  /** Show only the first n, with a toggle for the rest. */
  limit?: number;
  format?: (n: number) => string;
  /** Header labels for the name and value columns. */
  columns?: [string, string];
  className?: string;
}

/** Ranked rows with a bar behind each name, for top pages, sources or countries. */
export function BarList({ items, sorted = true, limit, format = (n) => n.toLocaleString(), columns, className }: BarListProps) {
  const [all, setAll] = React.useState(false);
  const rows = sorted ? [...items].sort((a, b) => b.value - a.value) : items;
  const shown = limit && !all ? rows.slice(0, limit) : rows;
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className={cn("grid gap-1.5", className)}>
      {columns && (
        <div className="flex justify-between px-2 pb-1 text-xs text-muted">
          <span>{columns[0]}</span>
          <span>{columns[1]}</span>
        </div>
      )}
      <ul className="grid gap-1.5">
        {shown.map((item, i) => {
          const body = (
            <>
              <span
                aria-hidden
                className="vx-grow-x absolute inset-y-0 left-0 rounded-sm bg-accent/14 group-hover:bg-accent/22"
                style={{ width: `${(item.value / max) * 100}%`, animationDelay: `${i * 40}ms` }}
              />
              <span className="relative flex min-w-0 items-center gap-2 [&_svg]:size-4 [&_svg]:text-muted">
                {item.icon}
                <span className="truncate">{item.name}</span>
              </span>
              <span className="relative tabular-nums text-ink">{format(item.value)}</span>
            </>
          );
          const row = "group relative flex h-8 items-center justify-between gap-3 px-2 text-sm text-ink-2";
          return (
            <li key={item.name}>
              {item.href ? (
                <a href={item.href} className={cn(row, "rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-focus")}>{body}</a>
              ) : (
                <div className={row}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
      {limit && rows.length > limit && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          className="justify-self-start rounded-sm px-2 py-1 text-xs font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-focus"
        >
          {all ? "Show less" : `Show all ${rows.length}`}
        </button>
      )}
    </div>
  );
}
