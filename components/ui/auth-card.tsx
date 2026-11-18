import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Divider } from "./divider";
import { Input } from "./input";
import { InputOTP } from "./input-otp";
import { Field } from "./label";

export interface AuthProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface AuthCardProps {
  /** Which screen to show. "verify" asks for the one-time code. */
  mode?: "sign-in" | "sign-up" | "verify";
  onModeChange?: (mode: "sign-in" | "sign-up" | "verify") => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Third-party or passwordless options shown under the form. */
  providers?: AuthProvider[];
  /** "stacked" lists full-width buttons; "inline" shows compact icon buttons in a row. */
  providerLayout?: "stacked" | "inline";
  /** Receives the form's FormData, so it fits whatever auth library you use. */
  onSubmit?: (data: FormData, mode: "sign-in" | "sign-up") => void | Promise<void>;
  onVerify?: (code: string) => void | Promise<void>;
  onProvider?: (id: string) => void;
  /** Where the code was sent, shown on the verify screen. */
  email?: string;
  className?: string;
}

const copy = {
  "sign-in": { title: "Welcome back", description: "Sign in to pick up where you left off.", cta: "Sign in", switch: "No account yet?", switchTo: "Create one" },
  "sign-up": { title: "Create your account", description: "Start free. No card needed.", cta: "Create account", switch: "Already have an account?", switchTo: "Sign in" },
};

/** Sign in, sign up and a one-time code step in one card. The form is uncontrolled and hands you FormData. */
export function AuthCard({ mode: controlled, onModeChange, title, description, providers = [], providerLayout = "stacked", onSubmit, onVerify, onProvider, email = "you@company.com", className }: AuthCardProps) {
  const [inner, setInner] = React.useState<"sign-in" | "sign-up" | "verify">("sign-in");
  const mode = controlled ?? inner;
  const setMode = (m: typeof mode) => {
    setInner(m);
    onModeChange?.(m);
  };
  const [busy, setBusy] = React.useState(false);
  const [code, setCode] = React.useState("");
  const id = React.useId();
  const run = async (fn: () => void | Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  const shell = cn("vx-glass grid w-full max-w-sm gap-5 rounded-panel border border-card-border bg-card p-6 text-ink shadow-card", className);

  if (mode === "verify") {
    return (
      <section aria-labelledby={`${id}-t`} className={shell}>
        <button type="button" onClick={() => setMode("sign-in")} className="flex items-center gap-1 justify-self-start rounded-sm text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-focus">
          <ArrowLeft className="size-4" /> Back
        </button>
        <header className="grid gap-1">
          <h2 id={`${id}-t`} className="text-xl font-semibold tracking-tight">Check your email</h2>
          <p className="text-sm text-muted">We sent a 6-digit code to <b className="font-medium text-ink">{email}</b>.</p>
        </header>
        <InputOTP length={6} groupSize={3} value={code} onChange={setCode} onComplete={(c) => run(() => onVerify?.(c))} aria-label="One-time code" />
        <Button loading={busy} disabled={code.length < 6} onClick={() => run(() => onVerify?.(code))}>Verify</Button>
        <p className="text-center text-sm text-muted">No code? <button type="button" className="font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-focus">Send it again</button></p>
      </section>
    );
  }

  const c = copy[mode];
  return (
    <section aria-labelledby={`${id}-t`} className={shell}>
      <header className="grid gap-1">
        <h2 id={`${id}-t`} className="text-xl font-semibold tracking-tight">{title ?? c.title}</h2>
        <p className="text-sm text-muted">{description ?? c.description}</p>
      </header>
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          run(async () => {
            await onSubmit?.(data, mode);
            setMode("verify");
          });
        }}
      >
        {mode === "sign-up" && (
          <Field label="Name" htmlFor={`${id}-n`}><Input id={`${id}-n`} name="name" autoComplete="name" required /></Field>
        )}
        <Field label="Email" htmlFor={`${id}-e`}><Input id={`${id}-e`} name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></Field>
        <Field label="Password" htmlFor={`${id}-p`}><Input id={`${id}-p`} name="password" type="password" autoComplete={mode === "sign-up" ? "new-password" : "current-password"} required minLength={8} /></Field>
        {mode === "sign-in" && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-ink-2"><Checkbox name="remember" defaultChecked /> Remember me</label>
            <button type="button" className="font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-focus">Forgot password?</button>
          </div>
        )}
        <Button type="submit" loading={busy}>{c.cta}</Button>
      </form>
      {providers.length > 0 && (
        <>
          <Divider>or continue with</Divider>
          <div className={providerLayout === "inline" ? "grid grid-flow-col gap-2" : "grid gap-2"}>
            {providers.map((p) => (
              <Button key={p.id} type="button" variant="secondary" aria-label={providerLayout === "inline" ? `Continue with ${p.name}` : undefined} onClick={() => onProvider?.(p.id)}>
                {p.icon} {providerLayout === "stacked" && `Continue with ${p.name}`}
              </Button>
            ))}
          </div>
        </>
      )}
      <p className="text-center text-sm text-muted">
        {c.switch}{" "}
        <button type="button" onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")} className="font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-focus">{c.switchTo}</button>
      </p>
    </section>
  );
}
