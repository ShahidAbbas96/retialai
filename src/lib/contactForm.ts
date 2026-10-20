export interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  message: string;
}

export const INITIAL_CONTACT_FORM: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s()-]{6,}$/;
const WEBSITE_REGEX = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i;

export function validateContactForm(values: ContactFormValues): Partial<Record<keyof ContactFormValues, string>> {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (!values.fullName.trim()) errors.fullName = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email so we can reply.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "That email doesn't look right — check for a missing @ or domain.";
  }
  if (values.phone.trim() && !PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = "Use digits only, e.g. 0300 1234567 or +92 300 1234567.";
  }
  if (values.website.trim() && !WEBSITE_REGEX.test(values.website.trim())) {
    errors.website = "Enter a web address like yourstore.com.";
  }

  return errors;
}

export async function submitContactForm(values: ContactFormValues): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact form");
  }
}
