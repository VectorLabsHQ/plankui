import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ChatMessageProps extends ComponentProps<"div"> {
  author: string;
  side?: "start" | "end";
  timestamp?: string;
  dateTime?: string;
  avatar?: ReactNode;
}

export function ChatMessage({ author, side = "start", timestamp, dateTime, avatar, children, className, ...props }: ChatMessageProps) {
  const outgoing = side === "end";
  return (
    <div {...props} className={cn("flex items-start gap-2", outgoing && "flex-row-reverse", className)}>
      {avatar && <span aria-hidden="true" className="shrink-0">{avatar}</span>}
      <div className={cn("grid min-w-0 max-w-[85%] gap-1", outgoing && "justify-items-end")}>
        <div className="flex flex-wrap items-baseline gap-x-2 text-xs text-muted">
          <span className="font-medium text-ink">{author}</span>
          {timestamp && <time dateTime={dateTime}>{timestamp}</time>}
        </div>
        <div className={cn("rounded-card px-3 py-2 text-sm [overflow-wrap:anywhere]", outgoing ? "bg-accent-wash text-accent-wash-ink" : "vx-glass border border-card-border bg-card text-ink shadow-card")}>
          {children}
        </div>
      </div>
    </div>
  );
}
