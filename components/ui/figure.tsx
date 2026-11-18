import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FigureProps extends ComponentProps<"figure"> {
  caption: ReactNode;
}

export function Figure({ caption, children, className, ...props }: FigureProps) {
  return (
    <figure {...props} className={cn("grid gap-2", className)}>
      {children}
      <figcaption className="text-xs leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}
