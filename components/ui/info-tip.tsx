import * as React from "react";
import { InfoIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Tooltip } from "./tooltip";

export interface InfoTipProps {
  /** The explanation. Keep it to a sentence or two. */
  children: React.ReactNode;
  /** What the tip explains, for screen readers: "About monthly active users". */
  label?: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

/** A small info icon beside a label that explains it on hover or focus. */
export function InfoTip({ children, label = "More information", side = "top", className }: InfoTipProps) {
  return (
    <Tooltip content={<span className="block max-w-60 text-pretty">{children}</span>} side={side}>
      <button
        type="button"
        aria-label={label}
        className={cn(
          "inline-grid size-5 shrink-0 place-items-center rounded-pill align-middle text-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-focus",
          className,
        )}
      >
        <InfoIcon className="size-3.5" />
      </button>
    </Tooltip>
  );
}
