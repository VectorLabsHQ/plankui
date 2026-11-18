import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BlockquoteProps extends Omit<ComponentProps<"figure">, "cite"> {
  cite?: string;
  attribution?: ReactNode;
}

export function Blockquote({ cite, attribution, children, className, ...props }: BlockquoteProps) {
  return (
    <figure {...props} className={cn("grid gap-2 border-s-2 border-accent ps-4", className)}>
      <blockquote cite={cite} className="text-sm leading-relaxed text-ink">{children}</blockquote>
      {attribution && <figcaption className="text-xs text-muted">{attribution}</figcaption>}
    </figure>
  );
}
