import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/cn";
import { pillClass, useSlidingPill } from "./segmented";

type Variant = "tray" | "line";
const VariantContext = React.createContext<Variant>("tray");

export interface TabsProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Root>, "className" | "value" | "defaultValue" | "onValueChange"> {
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ className, onValueChange, ...props }: TabsProps) {
  // minmax(0, 1fr) keeps wide panels from stretching the page on small screens.
  return (
    <TabsPrimitive.Root
      className={cn("grid grid-cols-[minmax(0,1fr)] gap-4", className)}
      onValueChange={(v) => onValueChange?.(String(v))}
      {...props}
    />
  );
}

export function TabsList({
  className,
  variant = "tray",
  children,
  ...props
}: Omit<React.ComponentProps<typeof TabsPrimitive.List>, "className"> & { className?: string; variant?: Variant }) {
  const list = React.useRef<HTMLDivElement>(null);
  // Re-measure when the active tab changes; Base UI marks it with data-active.
  const [active, setActive] = React.useState<string | null>(null);
  React.useEffect(() => {
    const l = list.current;
    if (!l) return;
    const read = () => setActive(l.querySelector("[data-active]")?.id ?? null);
    read();
    const mo = new MutationObserver(read);
    mo.observe(l, { subtree: true, attributes: true, attributeFilter: ["data-active"] });
    return () => mo.disconnect();
  }, []);
  const pill = useSlidingPill(list, "[data-active]", active);
  return (
    <VariantContext.Provider value={variant}>
      <TabsPrimitive.List
        ref={list}
        className={cn(
          "relative inline-flex w-fit max-w-full items-center overflow-x-auto [scrollbar-width:none]",
          variant === "tray"
            ? "vx-glass gap-0.5 rounded-input border border-tray-border bg-tray p-1"
            : "gap-5 border-b border-rule",
          className,
        )}
        {...props}
      >
        {variant === "tray" && <span ref={pill} aria-hidden className={pillClass} />}
        {children}
      </TabsPrimitive.List>
    </VariantContext.Provider>
  );
}

export function TabsTrigger({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsPrimitive.Tab>, "className" | "value"> & { className?: string; value: string }) {
  const variant = React.useContext(VariantContext);
  return (
    <TabsPrimitive.Tab
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium text-muted",
        "transition-[color,background-color,box-shadow] duration-[var(--dur-micro)] hover:text-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[disabled]:opacity-50 [&_svg]:size-4",
        variant === "tray"
          ? "relative z-10 h-7 rounded-[var(--pill-radius)] px-3 data-[active]:text-ink"
          : "-mb-px h-9 border-b-2 border-transparent px-0.5 data-[active]:border-accent data-[active]:text-ink",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsPrimitive.Panel>, "className" | "value"> & { className?: string; value: string }) {
  return <TabsPrimitive.Panel className={cn("outline-none", className)} {...props} />;
}
