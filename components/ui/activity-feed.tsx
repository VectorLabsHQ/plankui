import * as React from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "./avatar";

export interface ActivityEvent {
  id: string | number;
  /** Who did it. */
  actor: string;
  avatar?: string;
  /** What they did, after their name: "merged pull request #482". */
  action: React.ReactNode;
  /** Machine-readable time, and how to show it. */
  dateTime: string;
  time: string;
  /** Extra detail under the line, such as a quoted comment. */
  detail?: React.ReactNode;
}

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** A list of what people did and when, newest first, with a line joining the avatars. */
export function ActivityFeed({ events, className }: { events: ActivityEvent[]; className?: string }) {
  return (
    <ol className={cn("grid", className)}>
      {events.map((e, i) => (
        <li key={e.id} className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-3 pb-5 last:pb-0">
          {i < events.length - 1 && <span aria-hidden className="absolute left-4 top-9 bottom-1 w-px bg-rule" />}{/* taste-skill-ignore: the timeline line joining the avatars */}
          <Avatar size="sm" src={e.avatar} alt="" fallback={initials(e.actor)} />
          <div className="grid gap-1.5 pt-1">
            <p className="text-sm leading-snug text-ink-2">
              <span className="font-medium text-ink">{e.actor}</span> {e.action}
              <time dateTime={e.dateTime} className="ml-1.5 whitespace-nowrap text-xs text-muted">{e.time}</time>
            </p>
            {e.detail && <div className="rounded-input bg-paper-2 px-3 py-2 text-sm text-ink-2">{e.detail}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
