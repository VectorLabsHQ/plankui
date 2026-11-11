import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="vx-glass w-full overflow-x-auto rounded-card border border-card-border bg-card">
      <table className={cn("w-full caption-bottom text-left text-sm", className)} {...props} />
    </div>
  );
}
export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("border-b border-rule bg-paper-2", className)} {...props} />;
}
export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("divide-y divide-rule", className)} {...props} />;
}
export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn("transition-[background-color] duration-[var(--dur-micro)] hover:bg-paper-2/60 data-[state=selected]:bg-accent-wash/50", className)} {...props} />;
}
export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th className={cn("h-11 whitespace-nowrap px-3 font-medium text-muted", className)} {...props} />;
}
export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("px-3 py-2.5 align-middle font-medium text-ink", className)} {...props} />;
}
export function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption className={cn("border-t border-rule px-4 py-3 text-left text-sm text-muted", className)} {...props} />;
}

/** A header button that cycles sort direction. */
export function TableSortButton({
  direction,
  onClick,
  children,
}: {
  direction: "asc" | "desc" | false;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const Icon = direction === "asc" ? ArrowUp : direction === "desc" ? ArrowDown : ChevronsUpDown;
  return (
    <button
      onClick={onClick}
      aria-sort={direction ? (direction === "asc" ? "ascending" : "descending") : undefined}
      className="-mx-1.5 inline-flex items-center gap-1 rounded-sm px-1.5 py-1 hover:bg-paper-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
    >
      {children}
      <Icon className={cn("size-3.5", direction ? "text-ink" : "text-muted/70")} />
    </button>
  );
}
