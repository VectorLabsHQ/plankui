import * as React from "react";
import { ExternalLinkIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

export interface CitationProps {
  /** The source's number in the answer, from 1. */
  index: number;
  title: string;
  href: string;
  /** A sentence or two quoted from the source. */
  snippet?: React.ReactNode;
  className?: string;
}

const host = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
};

/** A numbered source mark for AI answers. Hover or focus shows the source; click opens it. */
export function Citation({ index, title, href, snippet, className }: CitationProps) {
  return (
    <HoverCard openDelay={150} closeDelay={100}>
      <HoverCardTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Source ${index}: ${title}`}
          className={cn(
            "mx-0.5 inline-grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-pill bg-paper-3 px-1 align-[0.15em] text-[0.68rem] font-semibold leading-none text-ink-2 no-underline tabular-nums",
            "transition-colors duration-[var(--dur-micro)] hover:bg-accent hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-focus",
            className,
          )}
        >
          {index}
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="grid w-72 gap-1.5 text-sm">
        <span className="text-xs text-muted">{host(href)}</span>
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 font-medium text-ink no-underline hover:underline">
          {title} <ExternalLinkIcon className="mt-0.5 size-3.5 shrink-0 text-muted" />
        </a>
        {snippet && <span className="text-muted">{snippet}</span>}
      </HoverCardContent>
    </HoverCard>
  );
}
