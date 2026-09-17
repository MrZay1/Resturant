"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";

export type LeadKind = "demo" | "contact";

type FieldName = "name" | "restaurant" | "email" | "phone" | "city" | "message";

type Values = Record<FieldName, string>;

type Errors = Partial<Record<FieldName, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: Values = {
  name: "",
  restaurant: "",
  email: "",
  phone: "",
  city: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 80) errors.name = "Please keep your name under 80 characters.";

  if (!values.restaurant.trim()) errors.restaurant = "Please enter your restaurant's name.";
  else if (values.restaurant.trim().length > 120)
    errors.restaurant = "Please keep the restaurant name under 120 characters.";

  if (!values.email.trim()) errors.email = "Please enter your email so we can reply.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "That email does not look right. Please check it.";

  if (values.phone.trim().length > 40) errors.phone = "Please keep the phone number under 40 characters.";
  if (!values.city.trim()) errors.city = "Please enter your city.";
  else if (values.city.trim().length > 80) errors.city = "Please keep the city under 80 characters.";
  if (values.message.length > 1000) errors.message = "Please keep your message under 1000 characters.";
  return errors;
}

const copy: Record<
  LeadKind,
  { submit: string; submitting: string; successTitle: string; successBody: string; messageLabel: string; messageHint: string }
> = {
  demo: {
    submit: "Book my demo",
    submitting: "Sending",
    successTitle: "Thank you. Your demo request is in.",
    successBody:
      "We will reply within one business day. Bring your phone to the demo, we will have you tap a card that opens your own restaurant's review page.",
    messageLabel: "Anything we should know",
    messageHint: "Best days or times, how many tables you have, questions you already have.",
  },
  contact: {
    submit: "Send message",
    submitting: "Sending",
    successTitle: "Thank you. Your message is on its way.",
    successBody: "We will reply within one business day.",
    messageLabel: "Your message",
    messageHint: "Tell us what you need. Short is fine.",
  },
};

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none disabled:opacity-60";

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm({ kind = "demo", className }: { kind?: LeadKind; className?: string }) {
  const baseId = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const [honeypot, setHoneypot] = useState("");

  const t = copy[kind];
  const id = (name: FieldName) => `${baseId}-${name}`;
  const busy = status === "submitting";

  function update(name: FieldName, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) {
      setErrors(validate(next));
    }
  }

  function blur(name: FieldName) {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors(validate(values));
  }

  async function submit() {
    setServerError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind,
          name: values.name.trim(),
          restaurant: values.restaurant.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          city: values.city.trim(),
          message: values.message.trim(),
          website: honeypot,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something went wrong on our end.");
      }
      setStatus("success");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong on our end.");
      setStatus("error");
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, restaurant: true, email: true, phone: true, city: true, message: true });
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0] as FieldName;
      document.getElementById(id(first))?.focus();
      return;
    }
    void submit();
  }

  if (status === "success") {
    return (
      <div className={cn("text-center sm:text-left", className)} role="status" aria-live="polite">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent sm:mx-0">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="font-display mt-5 text-2xl leading-tight text-ink sm:text-3xl">{t.successTitle}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{t.successBody}</p>
        <p className="mt-6 text-sm text-muted">
          Need to add something? Email{" "}
          <a href={`mailto:${BRAND.email}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            {BRAND.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("relative space-y-5", className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Your name" error={errors.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={busy}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id("name")}-error` : undefined}
            className={cn(inputClass, errors.name ? "border-red-600" : "border-line-strong")}
            placeholder="Maria Lopez"
          />
        </Field>
        <Field id={id("restaurant")} label="Restaurant" error={errors.restaurant}>
          <input
            id={id("restaurant")}
            name="restaurant"
            type="text"
            autoComplete="organization"
            required
            disabled={busy}
            value={values.restaurant}
            onChange={(e) => update("restaurant", e.target.value)}
            onBlur={() => blur("restaurant")}
            aria-invalid={Boolean(errors.restaurant)}
            aria-describedby={errors.restaurant ? `${id("restaurant")}-error` : undefined}
            className={cn(inputClass, errors.restaurant ? "border-red-600" : "border-line-strong")}
            placeholder="Lopez Kitchen"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("email")} label="Email" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={busy}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id("email")}-error` : undefined}
            className={cn(inputClass, errors.email ? "border-red-600" : "border-line-strong")}
            placeholder="you@restaurant.com"
          />
        </Field>
        <Field id={id("phone")} label="Phone" error={errors.phone} optional>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            disabled={busy}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id("phone")}-error` : undefined}
            className={cn(inputClass, errors.phone ? "border-red-600" : "border-line-strong")}
            placeholder="(555) 555-0123"
          />
        </Field>
      </div>

      <Field id={id("city")} label="City" error={errors.city}>
        <input
          id={id("city")}
          name="city"
          type="text"
          autoComplete="address-level2"
          required
          disabled={busy}
          value={values.city}
          onChange={(e) => update("city", e.target.value)}
          onBlur={() => blur("city")}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? `${id("city")}-error` : undefined}
          className={cn(inputClass, errors.city ? "border-red-600" : "border-line-strong")}
          placeholder="Austin, TX"
        />
      </Field>

      <Field
        id={id("message")}
        label={t.messageLabel}
        error={errors.message}
        hint={t.messageHint}
        optional
      >
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          disabled={busy}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id("message")}-error` : `${id("message")}-hint`}
          className={cn(inputClass, "resize-y", errors.message ? "border-red-600" : "border-line-strong")}
        />
      </Field>

      {/* Honeypot. Hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${baseId}-website`}>Website</label>
        <input
          id={`${baseId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-medium">We could not send that.</p>
            <p className="mt-0.5">
              {serverError} You can try again, or email{" "}
              <a href={`mailto:${BRAND.email}`} className="underline underline-offset-2">
                {BRAND.email}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <div className="pt-1">
        <Button type="submit" size="lg" className="w-full" disabled={busy} aria-busy={busy}>
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t.submitting}
            </>
          ) : status === "error" ? (
            "Try again"
          ) : (
            t.submit
          )}
        </Button>
        <p className="mt-3 text-center text-xs leading-relaxed text-muted">
          We only use this to reply to you. No newsletters, no sharing.
        </p>
      </div>
    </form>
  );
}
