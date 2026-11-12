import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type Single = { type?: "single"; value?: string; defaultValue?: string; onValueChange?: (value: string) => void };
type Multiple = { type: "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void };

export type AccordionProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive.Root>,
  "className" | "value" | "defaultValue" | "onValueChange" | "multiple"
> & {
  className?: string;
  /** Kept for parity with the Radix version: a single accordion can always close its open item. */
  collapsible?: boolean;
} & (Single | Multiple);

const asList = (v: string | string[] | undefined) => (v === undefined ? undefined : Array.isArray(v) ? v : v ? [v] : []);

/** Same props as the Radix version: type "single" (default) or "multiple", with string values. */
export function Accordion({ type = "single", collapsible: _collapsible, value, defaultValue, onValueChange, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      multiple={type === "multiple"}
      value={asList(value)}
      defaultValue={asList(defaultValue)}
      onValueChange={(v) => {
        const list = (v as unknown[]).map(String);
        if (type === "multiple") (onValueChange as Multiple["onValueChange"])?.(list);
        else (onValueChange as Single["onValueChange"])?.(list[0] ?? "");
      }}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AccordionPrimitive.Item>, "className"> & { className?: string; value: string }) {
  return <AccordionPrimitive.Item className={cn("border-b border-rule last:border-b-0", className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AccordionPrimitive.Trigger>, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium text-ink",
          "hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
          className,
        )}
        {...props}
      >
        {children}
        <Plus className="size-4 shrink-0 text-muted transition-transform duration-[var(--dur-short)] ease-[var(--ease-out)] group-data-[panel-open]:rotate-45" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AccordionPrimitive.Panel>, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Panel className="vx-reveal overflow-hidden text-sm text-muted" {...props}>
      <div className={cn("pb-4 pr-8", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}
