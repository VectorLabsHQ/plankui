import * as React from "react";
import { cn } from "@/lib/cn";
import { Badge } from "./badge";

export type ChangeKind = "new" | "improved" | "fixed";

export interface Release {
  version: string;
  dateTime: string;
  date: string;
  title?: string;
  changes: { kind: ChangeKind; text: React.ReactNode }[];
}

const tone: Record<ChangeKind, "accent" | "success" | "warning"> = { new: "accent", improved: "success", fixed: "warning" };
const word: Record<ChangeKind, string> = { new: "New", improved: "Improved", fixed: "Fixed" };

/** Release notes, newest first: version and date beside each release's list of what is new, improved and fixed. */
export function Changelog({ releases, className }: { releases: Release[]; className?: string }) {
  return (
    <ol className={cn("grid gap-10", className)}>
      {releases.map((r) => (
        <li key={r.version} className="grid gap-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8">
          <div className="grid content-start gap-0.5">
            <span className="font-semibold tabular-nums text-ink">{r.version}</span>
            <time dateTime={r.dateTime} className="text-sm text-muted">{r.date}</time>
          </div>
          <article className="grid gap-3">
            {r.title && <h3 className="text-lg font-semibold leading-snug text-ink">{r.title}</h3>}
            <ul className="grid gap-2">
              {r.changes.map((c, i) => (
                <li key={i} className="flex items-baseline gap-2.5 text-sm text-ink-2">
                  <Badge variant={tone[c.kind]} className="w-[68px] shrink-0 justify-center">{word[c.kind]}</Badge>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
