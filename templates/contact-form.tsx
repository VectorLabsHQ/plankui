import { useState } from "react";
import { CheckCircleIcon, ClockIcon, MailIcon, MapPinIcon } from "@plankui/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Item, ItemGroup } from "@/components/ui/item";
import { Field } from "@/components/ui/label";
import { Segmented } from "@/components/ui/segmented";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const topics = ["Sales", "Support", "Partnership", "Press"];
const sizes = ["Just me", "2 to 10", "11 to 50", "51 to 200", "More than 200"];
const MAX = 1000;

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

/** `hideNav` drops the page header when a host page already provides one. */
export default function ContactFormTemplate({ hideNav = false }: { hideNav?: boolean }) {
  const [topic, setTopic] = useState("Sales");
  const [form, setForm] = useState({ name: "", email: "", company: "", size: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Add an email address we can reply to.";
    if (form.message.trim().length < 10) next.message = "Tell us a little more, at least 10 characters.";
    if (!consent) next.consent = "We need your OK to reply.";
    setErrors(next);
    // The template sends nothing; post `form` to your own endpoint here.
    if (!Object.keys(next).length) setSent(true);
  };

  return (
    <div className="@container min-h-full bg-paper text-ink">
      <div className="mx-auto grid max-w-5xl gap-8 p-4 @xl:p-8 @4xl:grid-cols-[minmax(0,1fr)_300px] @4xl:gap-12">
        <main className="grid content-start gap-6">
          {!hideNav && (
            <header className="grid gap-2">
              <h2 className="text-[clamp(1.6rem,3cqi,2.2rem)] leading-tight">Talk to our team</h2>
              <p className="max-w-lg text-ink-2">Questions about plans, a project or a partnership. A person reads every message and replies within one working day.</p>
            </header>
          )}
          {sent ? (
            <div role="status" className="grid justify-items-start gap-3 rounded-panel bg-success-wash p-6 text-success-wash-ink">
              <CheckCircleIcon className="size-6" />
              <p className="text-lg font-semibold">Thanks, {form.name.split(" ")[0]}. Your message is with us.</p>
              <p className="text-sm">We will reply to {form.email} within one working day.</p>
              <Button variant="secondary" size="sm" onClick={() => { setSent(false); setForm({ name: "", email: "", company: "", size: "", message: "" }); setConsent(false); }}>Send another message</Button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-5">
              <div className="grid gap-1.5">
                <span id="topic-label" className="text-sm font-medium">What is it about?</span>
                <Segmented aria-label="Topic" value={topic} onValueChange={setTopic} options={topics.map((t) => ({ value: t, label: t }))} className="w-fit max-w-full overflow-x-auto" />
              </div>
              <div className="grid gap-5 @xl:grid-cols-2">
                <Field label="Full name" error={errors.name}><Input autoComplete="name" value={form.name} onChange={set("name")} /></Field>
                <Field label="Work email" error={errors.email}><Input type="email" autoComplete="email" value={form.email} onChange={set("email")} /></Field>
                <Field label="Company" hint="Optional"><Input autoComplete="organization" value={form.company} onChange={set("company")} /></Field>
                <Field label="Team size" htmlFor="contact-team-size">
                  <Select value={form.size} onValueChange={(v) => setForm((f) => ({ ...f, size: v }))}>
                    <SelectTrigger id="contact-team-size"><SelectValue placeholder="Choose one" /></SelectTrigger>
                    <SelectContent>{sizes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Message" error={errors.message} hint={`${form.message.length} of ${MAX}`}>
                <Textarea rows={5} maxLength={MAX} value={form.message} onChange={set("message")} placeholder={topic === "Support" ? "What happened, and what did you expect?" : "What are you working on?"} />
              </Field>
              <div className="grid gap-1.5">
                <label className="flex items-start gap-2.5 text-sm text-ink-2">
                  <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} aria-invalid={errors.consent ? true : undefined} className="mt-0.5" />
                  You can contact me about this message. We never share your details.
                </label>
                {errors.consent && <p className="text-sm text-danger-wash-ink">{errors.consent}</p>}
              </div>
              <Button type="submit" className="w-full @xl:w-fit">Send message</Button>
            </form>
          )}
        </main>

        <aside className="grid content-start gap-4">
          <h3 className="text-sm font-medium text-muted">Other ways to reach us</h3>
          <ItemGroup className="-mx-3">
            <Item media={<MailIcon />} title="hello@acme.com" description="For anything else" href="mailto:hello@acme.com" />
            <Item media={<MapPinIcon />} title="Acme, 21 Rope Walk" description="Bristol, United Kingdom" />
            <Item media={<ClockIcon />} title="Monday to Friday" description="9:00 to 18:00 UK time" />
          </ItemGroup>
        </aside>
      </div>
    </div>
  );
}
