import { useState } from "react";
import { Check, KeyRound, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputOTP } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";

export default function SignInTemplate() {
  const [step, setStep] = useState<"password" | "code">("password");
  const [loading, setLoading] = useState(false);
  return (
    <div className="@container min-h-full bg-paper text-ink">
      <div className="grid min-h-full @3xl:grid-cols-2">
        <div className="relative isolate hidden overflow-hidden bg-paper-2 p-10 @3xl:grid @3xl:content-between">
          <div aria-hidden className="vx-graphic absolute inset-0 -z-10" />
          <p className="flex items-center gap-2 font-semibold">
            <span className="grid size-7 place-items-center rounded-input bg-accent text-accent-ink"><KeyRound className="size-4" /></span>
            Acme
          </p>
          <div className="grid gap-4">
            <h2 className="max-w-sm text-4xl leading-[1.05]">Everything your team ships, in one place.</h2>
            <ul className="grid gap-2 text-sm text-ink-2">
              {["Single sign-on for every member", "Two-step codes on every new device", "Audit log for each sign in"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="size-4 text-accent" /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid place-items-center p-6 @xl:p-10">
          <Card className="grid w-full max-w-sm gap-5 p-6">
            {step === "password" ? (
              <>
                <div className="grid gap-1">
                  <h2 className="text-2xl">Welcome back</h2>
                  <p className="text-sm text-muted">Sign in to your workspace.</p>
                </div>
                <form
                  className="grid gap-3.5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    window.setTimeout(() => { setLoading(false); setStep("code"); }, 700);
                  }}
                >
                  <div className="grid gap-1.5"><label htmlFor="si-email" className="text-sm font-medium text-ink">Email</label><Input id="si-email" type="email" required defaultValue="ana@example.com" leading={<Mail />} /></div>
                  <div className="grid gap-1.5"><label htmlFor="si-pass" className="text-sm font-medium text-ink">Password</label><Input id="si-pass" type="password" required defaultValue="plankui-demo" leading={<Lock />} /></div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-ink-2"><Checkbox defaultChecked /> Remember me</label>
                    <a href="#" className="font-medium text-accent hover:underline">Forgot password?</a>
                  </div>
                  <Button type="submit" loading={loading}>Sign in</Button>
                </form>
                <div className="flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-rule" /> or <span className="h-px flex-1 bg-rule" /></div>
                <Button variant="secondary"><KeyRound /> Continue with SSO</Button>
              </>
            ) : (
              <>
                <div className="grid gap-1">
                  <h2 className="text-2xl">Check your phone</h2>
                  <p className="text-sm text-muted">Enter the 6-digit code we sent to the number ending 42.</p>
                </div>
                <InputOTP length={6} groupSize={3} aria-label="Code" className="justify-self-center [&>span]:size-10" onComplete={() => toast.success("Signed in", "Welcome back, Ana.")} />
                <Button variant="ghost" onClick={() => setStep("password")}>Use a different account</Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
