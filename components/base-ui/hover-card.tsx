import * as React from "react";
import { PreviewCard as HC } from "@base-ui/react/preview-card";
import { cn } from "@/lib/cn";

/** asChild, as in the Radix version: the child element becomes the trigger. */
function slot(asChild: boolean | undefined, children: React.ReactNode) {
  if (!asChild || !React.isValidElement(children)) return { children };
  return { render: children as React.ReactElement<Record<string, unknown>> };
}

const Delays = React.createContext<{ openDelay?: number; closeDelay?: number }>({});

/** Same props as the Radix version: openDelay and closeDelay sit on the root. */
export function HoverCard({
  openDelay,
  closeDelay,
  ...props
}: React.ComponentProps<typeof HC.Root> & { openDelay?: number; closeDelay?: number }) {
  return (
    <Delays.Provider value={{ openDelay, closeDelay }}>
      <HC.Root {...props} />
    </Delays.Provider>
  );
}

export function HoverCardTrigger({ asChild, children, ...props }: Omit<React.ComponentProps<typeof HC.Trigger>, "render"> & { asChild?: boolean }) {
  const { openDelay, closeDelay } = React.useContext(Delays);
  return <HC.Trigger delay={openDelay} closeDelay={closeDelay} {...props} {...slot(asChild, children)} />;
}

type Positioner = React.ComponentProps<typeof HC.Positioner>;

export function HoverCardContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  ...props
}: Omit<React.ComponentProps<typeof HC.Popup>, "className"> & { className?: string; side?: Positioner["side"]; align?: Positioner["align"]; sideOffset?: number }) {
  return (
    <HC.Portal>
      <HC.Positioner side={side} align={align} sideOffset={sideOffset} className="z-[100]">
        <HC.Popup className={cn("vx-pop w-72 vx-glass rounded-card border border-pop-border bg-pop p-4 text-ink shadow-pop outline-none", className)} {...props} />
      </HC.Positioner>
    </HC.Portal>
  );
}
