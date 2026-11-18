import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export interface SkipLinkProps extends ComponentProps<"a"> {
  href: `#${string}`;
}

export function SkipLink({ href, className, ...props }: SkipLinkProps) {
  return (
    <a
      {...props}
      href={href}
      className={cn("sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-input focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink focus:outline-2 focus:outline-focus", className)}
    />
  );
}
