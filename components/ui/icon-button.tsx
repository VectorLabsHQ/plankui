import type { ComponentProps, ReactNode } from "react";
import { Button } from "./button";

export interface IconButtonProps extends Omit<ComponentProps<typeof Button>, "aria-label" | "asChild" | "children" | "size"> {
  label: string;
  icon: ReactNode;
  size?: "icon" | "icon-sm";
}

export function IconButton({ label, icon, size = "icon", variant = "ghost", type = "button", ...props }: IconButtonProps) {
  return (
    <Button {...props} type={type} size={size} variant={variant} aria-label={label}>
      <span aria-hidden="true" className="inline-flex">{icon}</span>
    </Button>
  );
}
