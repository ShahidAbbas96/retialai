import { AlertCircle, CheckCircle2, ChevronRight, Clock, Loader2, Mail, Phone } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { SITE_CONFIG, whatsappHref } from "../config/site.ts";
import {
  INITIAL_CONTACT_FORM,
  submitContactForm,
  validateContactForm,
  type ContactFormValues,
} from "../lib/contactForm.ts";
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
}[] = [
  { name: "fullName", label: "Name", type: "text", autoComplete: "name", placeholder: "Your full name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@company.com", required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "0300 1234567" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", placeholder: "Your brand or store" },
  { name: "website", label: "Website", type: "url", autoComplete: "url", placeholder: "yourstore.com" },
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
    `mt-1 block w-full rounded-sm border bg-ink-soft px-3.5 py-2.5 text-base text-white placeholder:text-[#a8998a] outline-none transition focus:bg-[#544a40] ${
      errors[name] ? "border-red-400" : "border-transparent hover:border-muted/60 focus:border-brand"
    }`;

  const labelClass = "block font-display text-sm font-semibold uppercase tracking-wider text-[#c2b4a6]";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-ink py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
        {/* Location & direct contact */}
        <div className="order-2 lg:order-1">
          <iframe
            title="Map showing the Retail AI office in Main Gulberg, Lahore"
            src={SITE_CONFIG.MAPS_EMBED_URL}
            className="h-56 w-full rounded-sm border-0 grayscale-[30%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={SITE_CONFIG.MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-1 font-display text-base font-semibold uppercase tracking-wider text-[#c2b4a6] hover:text-brand"
          >
            Driving directions <ChevronRight className="h-5 w-5 text-brand" aria-hidden="true" />
          </a>

          <ul className="mt-4 space-y-3 text-[#d8ccbf]">
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <a href={`tel:${SITE_CONFIG.PHONE_HREF}`} className="hover:text-white">{SITE_CONFIG.PHONE}</a>
                <span className="mx-2 text-muted">·</span>
                <a href={`tel:${SITE_CONFIG.PHONE_SECONDARY_HREF}`} className="hover:text-white">{SITE_CONFIG.PHONE_SECONDARY}</a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <a href={`mailto:${SITE_CONFIG.EMAIL}`} className="hover:text-white">{SITE_CONFIG.EMAIL}</a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span>{SITE_CONFIG.BUSINESS_HOURS}</span>
            </li>
          </ul>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded bg-[#25d366] px-5 font-display font-bold uppercase tracking-wider text-ink transition hover:brightness-110"
          >
            <WhatsappIcon className="h-5 w-5" /> Chat on WhatsApp
          </a>
        </div>

        {/* Contact form */}
        <div className="order-1 lg:order-2">
          <h2 id="contact-heading" className="font-display text-lg font-semibold uppercase tracking-widest text-[#c2b4a6]">
            Contact us
          </h2>
          <p className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            Book your personal demo
          </p>

          <div aria-live="polite">
            {status === "sent" && (
              <div className="animate-fade mt-8 flex items-start gap-4 rounded-sm bg-ink-soft p-6">
                <CheckCircle2 className="h-8 w-8 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-display text-2xl font-bold uppercase tracking-wide">Thank you — message sent</p>
                  <p className="mt-1 text-[#d8ccbf]">We'll contact you within one business day to schedule your demo.</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 inline-flex min-h-11 items-center gap-1 font-display font-semibold uppercase tracking-wider text-brand hover:text-brand-light"
                  >
                    Send another message <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {status !== "sent" && (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-6">
              <p className="mb-4 text-sm text-[#c2b4a6]">
                Fields marked <span className="font-bold text-brand">*</span> are required.
              </p>
              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="space-y-4">
                  {FIELDS.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className={labelClass}>
                        {field.label}
                        {field.required && <span className="text-brand" aria-hidden="true"> *</span>}
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
                        <p id={`${field.name}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-300">
                          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="message" className={labelClass}>
                    Message <span className="normal-case tracking-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={8}
                    maxLength={2000}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Number of stores, channels, your current ERP, and what you plan in spreadsheets today…"
                    className={`${inputClass("message")} flex-1 resize-none`}
                  />
                  <p className="mt-1 text-right text-xs text-[#a8998a]">{values.message.length}/2000</p>
                </div>
              </div>

              {status === "error" && (
                <div role="alert" className="animate-fade mt-5 flex gap-3 rounded-sm bg-red-950/60 p-4 text-sm text-red-100 ring-1 ring-red-400/40">
                  <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <p>
                    We couldn't send your message just now. Please try again, or reach us at{" "}
                    <a href={`mailto:${SITE_CONFIG.EMAIL}`} className="font-semibold underline">{SITE_CONFIG.EMAIL}</a> or{" "}
                    <a href={`tel:${SITE_CONFIG.PHONE_HREF}`} className="font-semibold underline">{SITE_CONFIG.PHONE}</a>.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded bg-brand px-8 font-display text-lg font-bold uppercase tracking-wider text-ink transition hover:bg-brand-light disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    Send <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
