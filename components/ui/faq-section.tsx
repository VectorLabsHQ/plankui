import * as React from "react";
import { cn } from "@/lib/cn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

export interface FaqSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: { question: string; answer: React.ReactNode }[];
  /** A line under the list, such as where to ask anything else. */
  footer?: React.ReactNode;
  className?: string;
}

/** A page section of questions and answers, one open at a time. */
export function FaqSection({ title = "Frequently asked questions", description, items, footer, className }: FaqSectionProps) {
  return (
    <section className={cn("mx-auto grid w-full max-w-2xl gap-8", className)}>
      <div className="grid gap-2 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">{title}</h2>
        {description && <p className="text-muted">{description}</p>}
      </div>
      <Accordion type="single" collapsible className="grid gap-2">
        {items.map((it, i) => (
          <AccordionItem key={it.question} value={`faq-${i}`} className="rounded-card border border-card-border bg-card px-4">
            <AccordionTrigger>{it.question}</AccordionTrigger>
            <AccordionContent>{it.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {footer && <div className="text-center text-sm text-muted">{footer}</div>}
    </section>
  );
}
