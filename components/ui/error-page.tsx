import * as React from "react";
import { cn } from "@/lib/cn";

export interface ErrorPageProps {
  /** The status, shown large: 404, 500, 403. */
  code?: string | number;
  title?: string;
  description?: React.ReactNode;
  /** Ways out, such as a home link and a search or support link. */
  actions?: React.ReactNode;
  className?: string;
}

const defaults: Record<string, [string, string]> = {
  "404": ["Page not found", "The link may be old, or the page has moved. Check the address, or go back to somewhere you know."],
  "500": ["Something went wrong on our side", "It is not you. Try again in a minute; if it keeps happening, tell us and we will look into it."],
  "403": ["You do not have access", "Ask the owner of this workspace to invite you, or sign in with another account."],
};

/** A full-page error: the status large, what happened in plain words and a way out. */
export function ErrorPage({ code = 404, title, description, actions, className }: ErrorPageProps) {
  const [t, d] = defaults[String(code)] ?? defaults["404"];
  return (
    <div className={cn("grid min-h-[60svh] place-items-center px-6 py-16 text-center", className)}>
      <div className="grid max-w-md justify-items-center gap-4">
        <p className="font-display text-7xl font-semibold tabular-nums tracking-tight text-accent sm:text-8xl">{code}</p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title ?? t}</h1>
        <p className="text-ink-2">{description ?? d}</p>
        {actions && <div className="mt-2 flex flex-wrap justify-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
