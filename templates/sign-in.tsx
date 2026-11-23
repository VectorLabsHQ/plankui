import { useState } from "react";
import { ArrowLeftIcon, CheckCircleIcon, GitPullRequestIcon, LayersIcon, MailIcon, MessageIcon } from "@plankui/icons";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputOTP } from "@/components/ui/input-otp";
import { PasswordInput } from "@/components/ui/password-input";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/toast";

/** Google's mark, from its brand assets. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 128 128" aria-hidden className="size-4">
      <path fill="#e33629" d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z" />
      <path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z" />
      <path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z" />
      <path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z" />
    </svg>
  );
}

/** GitHub's mark, from its brand assets. Follows the text colour. */
function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/** The left half: the workspace you are signing in to, drawn with real components. */
function Showcase() {
  const activity = [
    { icon: GitPullRequestIcon, who: "Mateo", what: "merged the billing fix", tag: <Badge variant="success">Merged</Badge> },
    { icon: MessageIcon, who: "Jun", what: "left 3 comments on Onboarding", tag: <Badge variant="accent">Review</Badge> },
    { icon: CheckCircleIcon, who: "Sara", what: "closed 12 issues this week", tag: <Badge variant="neutral">Done</Badge> },
  ];
  return (
    <div className="relative isolate hidden flex-col justify-between gap-10 overflow-hidden border-r border-rule bg-[color-mix(in_oklab,var(--accent)_7%,var(--paper))] p-10 @3xl:flex">
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-accent/10 blur-3xl" />
      <p className="flex items-center gap-2.5 font-semibold">
        <span className="grid size-8 place-items-center rounded-input bg-accent text-accent-ink"><LayersIcon className="size-4" /></span>
        Acme
      </p>

      <div aria-hidden inert className="grid gap-3">
        <div className="grid gap-3 rounded-card border border-rule bg-paper p-4 shadow-[0_8px_24px_-12px_oklch(0%_0_0/0.18)]">
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-0.5">
              <p className="text-sm font-semibold">Q4 launch</p>
              <p className="text-xs text-muted">18 of 25 tasks done</p>
            </div>
            <AvatarGroup max={4}>{["AK", "MR", "JL", "SO", "TB"].map((n) => <Avatar key={n} size="sm" fallback={n} />)}</AvatarGroup>
          </div>
          <Progress value={72} aria-label="Q4 launch progress" />
        </div>
        <ul className="grid divide-y divide-rule rounded-card border border-rule bg-paper shadow-[0_8px_24px_-12px_oklch(0%_0_0/0.18)]">
          {activity.map(({ icon: Icon, who, what, tag }) => (
            <li key={who} className="flex items-center gap-3 px-4 py-3 text-sm">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-paper-2 text-ink-2"><Icon className="size-3.5" /></span>
              <span className="min-w-0 flex-1 truncate"><b className="font-medium text-ink">{who}</b> <span className="text-ink-2">{what}</span></span>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-2">
        <h2 className="max-w-md text-[clamp(1.75rem,2.4vw+0.75rem,2.5rem)] leading-[1.05]">Pick up where your team left off.</h2>
        <p className="max-w-md text-ink-2">Projects, reviews and releases in one workspace, waiting for you.</p>
      </div>
    </div>
  );
}

export default function SignInTemplate() {
  const [step, setStep] = useState<"password" | "code">("password");
  const [loading, setLoading] = useState(false);
  return (
    <div className="@container flex min-h-full flex-col bg-paper text-ink">
      <div className="grid flex-1 @3xl:grid-cols-2">
        <Showcase />

        <div className="flex flex-col">
          <header className="flex items-center justify-between gap-3 p-5 @xl:px-8">
            <p className="flex items-center gap-2 font-semibold @3xl:invisible">
              <span className="grid size-7 place-items-center rounded-input bg-accent text-accent-ink"><LayersIcon className="size-3.5" /></span>
              Acme
            </p>
            <p className="text-sm text-muted">
              New to Acme? <a href="#" className="font-medium text-accent hover:underline">Create an account</a>
            </p>
          </header>

          <main className="grid flex-1 place-items-center px-5 py-8 @xl:px-8">
            <div className="grid w-full max-w-sm gap-6">
              {step === "password" ? (
                <>
                  <div className="grid gap-1.5">
                    <h1 className="text-[1.75rem] leading-tight">Sign in to Acme</h1>
                    <p className="text-sm text-muted">Welcome back. Use your work account.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" type="button"><GoogleMark /> Google</Button>
                    <Button variant="secondary" type="button"><GitHubMark /> GitHub</Button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-rule" />or with email<span className="h-px flex-1 bg-rule" /></div>
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLoading(true);
                      window.setTimeout(() => { setLoading(false); setStep("code"); }, 700);
                    }}
                  >
                    <div className="grid gap-1.5">
                      <label htmlFor="si-email" className="text-sm font-medium">Work email</label>
                      <Input id="si-email" type="email" required autoComplete="email" defaultValue="ana@acme.com" leading={<MailIcon />} />
                    </div>
                    <div className="grid gap-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="si-pass" className="text-sm font-medium">Password</label>
                        <a href="#" className="text-sm font-medium text-accent hover:underline">Forgot it?</a>
                      </div>
                      <PasswordInput id="si-pass" required autoComplete="current-password" defaultValue="plankui-demo" />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-ink-2"><Checkbox defaultChecked /> Keep me signed in for 30 days</label>
                    <Button type="submit" loading={loading} className="w-full">Sign in</Button>
                  </form>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => setStep("password")} className="flex w-fit items-center gap-1.5 rounded-input text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-focus">
                    <ArrowLeftIcon className="size-4" /> Back
                  </button>
                  <div className="grid gap-1.5">
                    <h1 className="text-[1.75rem] leading-tight">Check your phone</h1>
                    <p className="text-sm text-muted">Enter the 6-digit code we sent to the number ending in 42.</p>
                  </div>
                  <InputOTP length={6} groupSize={3} aria-label="Code" onComplete={() => toast.success("Signed in", "Welcome back, Ana.")} />
                  <p className="text-sm text-muted">Didn't get it? <a href="#" className="font-medium text-accent hover:underline">Send a new code</a></p>
                </>
              )}
            </div>
          </main>

          <footer className="flex flex-wrap items-center justify-between gap-2 px-5 pb-5 text-xs text-muted @xl:px-8">
            <span>By signing in you agree to the <a href="#" className="underline underline-offset-2 hover:text-ink">Terms</a> and <a href="#" className="underline underline-offset-2 hover:text-ink">Privacy policy</a>.</span>
            <span>© Acme</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
