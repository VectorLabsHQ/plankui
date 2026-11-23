import * as React from "react";
import { highlight } from "sugar-high";
import { cn } from "@/lib/cn";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** The code to show. JavaScript, TypeScript and JSX are coloured; anything else shows plain. */
  code: string;
  /** A file name or language shown in the header. */
  filename?: string;
  /** Number each line. */
  lineNumbers?: boolean;
  /** 1-based lines to mark, such as [2, 3]. */
  highlightLines?: number[];
  /** Colour the code. Turn off for shell output or plain text. */
  syntax?: boolean;
}

/** A block of code with an optional file name, line numbers, marked lines and a copy button. */
export function CodeBlock({ code, filename, lineNumbers, highlightLines = [], syntax = true, className, ...props }: CodeBlockProps) {
  const lines = React.useMemo<string[]>(() => {
    const text = code.replace(/\n$/, "");
    if (!syntax) return text.split("\n").map((l) => escape(l));
    // sugar-high wraps each line in <span class="sh__line">; keep that split so lines can be numbered and marked.
    return highlight(text).split("\n");
  }, [code, syntax]);
  const marked = new Set(highlightLines);
  return (
    <div {...props} className={cn("code-block vx-glass relative min-w-0 overflow-hidden rounded-card border border-card-border bg-card text-ink shadow-card", className)}>
      <div className="flex h-10 items-center justify-between gap-2 bg-paper-2 pl-4 pr-1.5">
        <span className="truncate font-mono text-xs text-muted">{filename ?? "Code"}</span>{/* taste-skill-ignore: a file name is literal code */}
        <CopyButton value={code} variant="ghost" aria-label={`Copy ${filename ?? "code"}`} />
      </div>
      <pre className="overflow-x-auto py-3 font-mono text-[13px] leading-6">
        <code className="grid min-w-max">
          {lines.map((html, i) => (
            <span key={i} className={cn("flex pr-4", marked.has(i + 1) ? "bg-accent-wash/70" : "")}>
              {lineNumbers && <span aria-hidden className={cn("w-10 shrink-0 select-none pr-3 text-right", marked.has(i + 1) ? "text-accent-wash-ink" : "text-muted")}>{i + 1}</span>}
              <span className={lineNumbers ? "" : "pl-4"} dangerouslySetInnerHTML={{ __html: html || " " }} />
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
