import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function InlineCode({ className, ...props }: ComponentProps<"code">) {
  return <code {...props} className={cn("rounded-sm border border-rule bg-paper-2 px-1.5 py-0.5 font-mono text-[0.875em] text-ink [overflow-wrap:anywhere]", className)} />;
}
