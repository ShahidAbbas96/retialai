import { AlertCircle, CheckCircle2, Clock, Loader2, Lock, Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { SITE_CONFIG, whatsappHref } from "../config/site.ts";
import {
  INITIAL_CONTACT_FORM,
  submitContactForm,
  validateContactForm,
  type ContactFormValues,
} from "../lib/contactForm.ts";
import Reveal from "./Reveal.tsx";
import { WhatsappIcon } from "./SocialIcons.tsx";

type Status = "idle" | "sending" | "sent" | "error";
type FieldName = keyof ContactFormValues;

const FIELDS: {
  name: Exclude<FieldName, "message">;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  required?: boolean;
  wide?: boolean;
}[] = [
  { name: "fullName", label: "Full name", type: "text", autoComplete: "name", placeholder: "Ayesha Khan", required: true },
  { name: "email", label: "Work email", type: "email", autoComplete: "email", placeholder: "you@company.com", required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "0300 1234567" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", placeholder: "Your brand or store" },
  { name: "website", label: "Website", type: "url", autoComplete: "url", placeholder: "https://", wide: true },
];

const NEXT_STEPS = [
  "We reply within one business day",
  "A 30-minute call to understand your planning today",
  "A tailored demo on sample data from your category",
];

export default function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_CONTACT_FORM);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const update = (name: FieldName, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field has been visited, re-validate it live so errors clear as soon as they're fixed.
    if (touched[name]) setErrors((e) => ({ ...e, [name]: validateContactForm(next)[name] }));
  };

  const onBlur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validateContactForm(values)[name] }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validateContactForm(values);
    setErrors(found);
    setTouched({ fullName: true, email: true, phone: true, company: true, website: true, message: true });

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await submitContactForm(values);
      setStatus("sent");
      setValues(INITIAL_CONTACT_FORM);
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (name: FieldName) =>
    `mt-1.5 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-slate-400 outline-none transition focus:ring-4 ${
      errors[name]
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-300 hover:border-slate-400 focus:border-brand focus:ring-brand/15"
    }`;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark">Contact us</p>
          <h2 id="contact-heading" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            See Retail AI on your own data
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tell us a little about your business and a retail planning specialist will set up a personal demo.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200 sm:p-9"
            >
              <div aria-live="polite">
                {status === "sent" && (
                  <div className="animate-fade flex flex-col items-center py-12 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/15">
                      <CheckCircle2 className="h-9 w-9 text-brand-dark" />
                    </span>
                    <h3 className="mt-5 text-2xl font-bold">Thank you — your request is in</h3>
                    <p className="mt-2 max-w-sm text-slate-600">
                      We'll contact you within one business day to schedule your demo.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-7 min-h-11 rounded-full px-5 text-sm font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand/10"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>

              {status !== "sent" && (
                <>
                  <p className="mb-6 text-sm text-slate-500">
                    Fields marked <span className="font-semibold text-red-600">*</span> are required.
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {FIELDS.map((field) => (
                      <div key={field.name} className={field.wide ? "sm:col-span-2" : undefined}>
                        <label htmlFor={field.name} className="block text-sm font-semibold text-slate-800">
                          {field.label}
                          {field.required && <span className="text-red-600" aria-hidden="true"> *</span>}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={values[field.name]}
                          onChange={(e) => update(field.name, e.target.value)}
                          onBlur={() => onBlur(field.name)}
                          aria-invalid={!!errors[field.name]}
                          aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                          className={inputClass(field.name)}
                        />
                        {errors[field.name] && (
                          <p id={`${field.name}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-800">
                        How can we help? <span className="font-normal text-slate-500">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        maxLength={2000}
                        value={values.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="e.g. 12 stores + online, we use Odoo, and plan OTB in Excel today…"
                        className={inputClass("message")}
                      />
                      <p className="mt-1 text-right text-xs text-slate-500">{values.message.length}/2000</p>
                    </div>
                  </div>

                  {status === "error" && (
                    <div role="alert" className="animate-fade mt-5 flex gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">
                      <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <p>
                        We couldn't send your message just now. Please try again, or reach us directly at{" "}
                        <a href={`mailto:${SITE_CONFIG.EMAIL}`} className="font-semibold underline">{SITE_CONFIG.EMAIL}</a> or{" "}
                        <a href={`tel:${SITE_CONFIG.PHONE_HREF}`} className="font-semibold underline">{SITE_CONFIG.PHONE}</a>.
                      </p>
                    </div>
                  )}

                  <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-center gap-2 text-xs text-slate-500">
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" /> We only use your details to arrange your demo.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 font-semibold text-white shadow-lg transition hover:bg-ink-soft disabled:cursor-wait disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                        </>
                      ) : (
                        <>
                          Request my demo <Send className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </Reveal>

          <Reveal delay={120} className="space-y-5 lg:col-span-2">
            <div className="rounded-3xl bg-ink p-6 text-white sm:p-8">
              <h3 className="text-lg font-bold">What happens next</h3>
              <ol className="mt-4 space-y-3">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-white/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-ink">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="my-6 h-px bg-white/10" />

              <h3 className="text-lg font-bold">Prefer to talk?</h3>
              <ul className="mt-4 space-y-4 text-sm text-white/80">
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>
                    <a href={`tel:${SITE_CONFIG.PHONE_HREF}`} className="font-semibold text-white hover:text-brand">{SITE_CONFIG.PHONE}</a>
                    <br />
                    <a href={`tel:${SITE_CONFIG.PHONE_SECONDARY_HREF}`} className="hover:text-white">{SITE_CONFIG.PHONE_SECONDARY}</a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <a href={`mailto:${SITE_CONFIG.EMAIL}`} className="hover:text-white">{SITE_CONFIG.EMAIL}</a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <address className="not-italic">{SITE_CONFIG.ADDRESS_LINE_1}<br />{SITE_CONFIG.ADDRESS_LINE_2}</address>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{SITE_CONFIG.BUSINESS_HOURS}</span>
                </li>
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 text-sm font-semibold text-ink transition hover:brightness-110"
                >
                  <WhatsappIcon className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={SITE_CONFIG.MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 ring-white/25 transition hover:bg-white/5 hover:ring-brand"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" /> Directions
                </a>
              </div>
            </div>
            <iframe
              title="Map showing the Retail AI office in Main Gulberg, Lahore"
              src={SITE_CONFIG.MAPS_EMBED_URL}
              className="h-60 w-full rounded-3xl border-0 ring-1 ring-slate-200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
