import * as React from "react";
import { cn } from "@/lib/cn";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";

export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Where the page sits, ending with the page itself (no href). */
  crumbs?: { label: string; href?: string }[];
  /** Buttons for the page's main actions, the primary one last. */
  actions?: React.ReactNode;
  /** Tabs, filters or stats under the title. */
  children?: React.ReactNode;
  className?: string;
}

/** The top of an app page: breadcrumb, title, a line of description and the page's actions. */
export function PageHeader({ title, description, crumbs, actions, children, className }: PageHeaderProps) {
  return (
    <header className={cn("grid gap-4", className)}>
      {crumbs && crumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((c, i) => (
              <React.Fragment key={c.label}>
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>{c.href ? <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink> : <BreadcrumbPage>{c.label}</BreadcrumbPage>}</BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid min-w-0 gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
          {description && <p className="max-w-prose text-sm text-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </header>
  );
}
