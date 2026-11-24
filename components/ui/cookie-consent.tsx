import * as React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./button";
import { Switch } from "./switch";

export interface CookieChoice {
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentProps {
  /** Called once with the visitor's choice. Necessary cookies are always on. */
  onDecide: (choice: CookieChoice) => void;
  /** Link to the cookie or privacy policy. */
  policyHref?: string;
  className?: string;
}

/**
 * A cookie banner with equal-weight Accept and Reject buttons and a Choose panel for each kind.
 * Reject is as easy as accept, as GDPR expects. Place it fixed at the bottom of the page and remove it once decided.
 */
export function CookieConsent({ onDecide, policyHref, className }: CookieConsentProps) {
  const id = React.useId();
  const [choosing, setChoosing] = React.useState(false);
  const [choice, setChoice] = React.useState<CookieChoice>({ analytics: false, marketing: false });
  const kinds: [keyof CookieChoice | "necessary", string, string][] = [
    ["necessary", "Necessary", "Sign-in and security. Always on."],
    ["analytics", "Analytics", "Counts visits so we can improve the product."],
    ["marketing", "Marketing", "Measures our ads on other sites."],
  ];
  return (
    <section aria-labelledby={`${id}-t`} className={cn("vx-glass grid w-full max-w-lg gap-4 rounded-panel border border-pop-border bg-pop p-5 text-ink shadow-pop", className)}>
      <div className="grid gap-1">
        <h2 id={`${id}-t`} className="font-semibold">Cookies on this site</h2>
        <p className="text-sm text-ink-2">
          We use necessary cookies to run the site. With your OK we also use analytics and marketing cookies.
          {policyHref && <> <a href={policyHref} className="font-medium text-accent hover:underline">Cookie policy</a></>}
        </p>
      </div>
      {choosing && (
        <ul className="grid gap-1 rounded-input bg-paper-2 p-1.5">
          {kinds.map(([key, label, help]) => (
            <li key={key} className="flex items-center justify-between gap-4 rounded-input px-2.5 py-2">
              <span className="grid gap-0.5">
                <span id={`${id}-${key}`} className="text-sm font-medium">{label}</span>
                <span className="text-xs text-muted">{help}</span>
              </span>
              <Switch
                aria-labelledby={`${id}-${key}`}
                checked={key === "necessary" ? true : choice[key]}
                disabled={key === "necessary"}
                onCheckedChange={(v) => key !== "necessary" && setChoice((c) => ({ ...c, [key]: v === true }))}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2">
        {choosing ? (
          <Button size="sm" onClick={() => onDecide(choice)}>Save choices</Button>
        ) : (
          <>
            <Button size="sm" variant="secondary" onClick={() => onDecide({ analytics: false, marketing: false })}>Reject all</Button>
            <Button size="sm" variant="secondary" onClick={() => onDecide({ analytics: true, marketing: true })}>Accept all</Button>
            <Button size="sm" variant="ghost" onClick={() => setChoosing(true)}>Choose</Button>
          </>
        )}
      </div>
    </section>
  );
}
