import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/cn";

const alertVariants = cva("relative flex gap-3 rounded-card border p-3.5 text-sm", {
  variants: {
    variant: {
      info: "border-rule bg-paper-2 text-ink [&>svg]:text-accent",
      success: "border-transparent bg-success-wash text-success-wash-ink",
      warning: "border-transparent bg-warning-wash text-warning-wash-ink",
      danger: "border-transparent bg-danger-wash text-danger-wash-ink",
    },
  },
  defaultVariants: { variant: "info" },
});

const icons = { info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleAlert };

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss?: () => void;
}

export function Alert({ className, variant = "info", title, action, onDismiss, children, ...props }: AlertProps) {
  const Icon = icons[variant ?? "info"];
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="grid flex-1 gap-1">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className="opacity-90">{children}</div>}
        {action && <div className="mt-1.5 flex gap-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-m-1 grid size-6 place-items-center rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-focus"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
