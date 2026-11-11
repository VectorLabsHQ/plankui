import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { pillClass, useSlidingPill } from "./segmented";

type Variant = "tray" | "line";
const VariantContext = React.createContext<Variant>("tray");

export function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  // minmax(0, 1fr) keeps wide panels from stretching the page on small screens.
  return <TabsPrimitive.Root className={cn("grid grid-cols-[minmax(0,1fr)] gap-4", className)} {...props} />;
}

export function TabsList({
  className,
  variant = "tray",
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { variant?: Variant }) {
  const list = React.useRef<HTMLDivElement>(null);
  // Re-measure when the active tab changes; Radix flips data-state on the triggers.
  const [active, setActive] = React.useState<string | null>(null);
  React.useEffect(() => {
    const l = list.current;
    if (!l) return;
    const read = () => setActive(l.querySelector('[data-state="active"]')?.id ?? null);
    read();
    const mo = new MutationObserver(read);
    mo.observe(l, { subtree: true, attributes: true, attributeFilter: ["data-state"] });
    return () => mo.disconnect();
  }, []);
  const pill = useSlidingPill(list, '[data-state="active"]', active);
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

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.useContext(VariantContext);
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium text-muted",
        "transition-[color,background-color,box-shadow] duration-[var(--dur-micro)] hover:text-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 [&_svg]:size-4",
        variant === "tray"
          ? "relative z-10 h-7 rounded-[var(--pill-radius)] px-3 data-[state=active]:text-ink"
          : "-mb-px h-9 border-b-2 border-transparent px-0.5 data-[state=active]:border-accent data-[state=active]:text-ink",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("outline-none", className)} {...props} />;
}
