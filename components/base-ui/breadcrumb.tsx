import * as React from "react";
import { useRender } from "@base-ui/react/use-render";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export function Breadcrumb(props: React.ComponentProps<"nav">) {
  return <nav aria-label="Breadcrumb" {...props} />;
}
export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm text-muted", className)} {...props} />;
}
export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}
export function BreadcrumbLink({ asChild, className, children, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const child = asChild && React.isValidElement(children) ? (children as React.ReactElement<Record<string, unknown>>) : undefined;
  return useRender({
    defaultTagName: "a",
    render: child,
    props: {
      className: cn("rounded-sm transition-[color] duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-focus", className),
      children: child ? undefined : children,
      ...props,
    },
  });
}
export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-current="page" className={cn("font-medium text-ink", className)} {...props} />;
}
export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li role="presentation" aria-hidden className={cn("text-rule-2 [&>svg]:size-3.5", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}
export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span role="presentation" className={cn("flex size-6 items-center justify-center", className)} {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
