import * as React from "react";
import { FilterIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Button } from "./button";
import { Chip } from "./chip";

export interface AppliedFilter {
  id: string;
  /** What is filtered, such as "Browser". */
  field: string;
  /** The chosen value, such as "Safari". */
  value: string;
}

export interface AppliedFiltersProps {
  filters: AppliedFilter[];
  onRemove: (id: string) => void;
  onClear?: () => void;
  /** Opens your filter picker. */
  onAdd?: () => void;
  className?: string;
}

/** The filters in effect, each removable, with clear-all and a way to add more. Announces changes politely. */
export function AppliedFilters({ filters, onRemove, onClear, onAdd, className }: AppliedFiltersProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {onAdd && (
        <Button size="sm" variant="secondary" onClick={onAdd}>
          <FilterIcon /> Filter
        </Button>
      )}
      <ul aria-label="Applied filters" aria-live="polite" className="flex flex-wrap items-center gap-1.5">
        {filters.map((f) => (
          <li key={f.id}>
            <Chip onRemove={() => onRemove(f.id)} aria-label={`${f.field}: ${f.value}`}>
              <span className="text-muted">{f.field}:</span> {f.value}
            </Chip>
          </li>
        ))}
      </ul>
      {onClear && filters.length > 0 && (
        <Button size="sm" variant="ghost" onClick={onClear}>Clear all</Button>
      )}
    </div>
  );
}
