import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@/lib/cn";

const sizes = { xs: "size-6 text-[10px]", sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-12 text-base" };

export interface AvatarProps extends Omit<React.ComponentProps<typeof AvatarPrimitive.Root>, "className"> {
  className?: string;
  src?: string;
  alt?: string;
  /** Initials shown while the image loads or when it fails. */
  fallback: string;
  size?: keyof typeof sizes;
  status?: "online" | "away" | "offline";
}

const statusTone = { online: "bg-success", away: "bg-warning", offline: "bg-rule-2" };

export function Avatar({ src, alt, fallback, size = "md", status, className, ...props }: AvatarProps) {
  return (
    <span className="relative inline-flex shrink-0">
      <AvatarPrimitive.Root
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full border border-rule bg-paper-3 ring-2 ring-paper",
          sizes[size],
          className,
        )}
        {...props}
      >
        {src && <AvatarPrimitive.Image src={src} alt={alt ?? fallback} className="size-full object-cover" />}
        <AvatarPrimitive.Fallback className="flex size-full items-center justify-center font-medium text-ink-2">
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      {status && (
        <span
          role="img"
          aria-label={status}
          className={cn("absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-paper", statusTone[status])}
        />
      )}
    </span>
  );
}

/** Overlapping stack of avatars with an optional overflow count. */
export function AvatarGroup({ children, max, className }: { children: React.ReactNode; max?: number; className?: string }) {
  const items = React.Children.toArray(children);
  const shown = max ? items.slice(0, max) : items;
  const extra = items.length - shown.length;
  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {shown}
      {extra > 0 && (
        <span className="relative inline-flex size-8 items-center justify-center rounded-full border border-rule bg-paper-2 text-xs font-medium text-ink-2 ring-2 ring-paper">
          +{extra}
        </span>
      )}
    </div>
  );
}
