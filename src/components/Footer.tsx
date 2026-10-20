import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site.ts";
import { MODULES } from "../data/modules.ts";
import Logo from "./Logo.tsx";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-ink pb-16 text-white/70 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            AI-powered planning for fashion retailers — from the financial budget to the last markdown.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Modules</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {MODULES.map((m) => (
              <li key={m.id}>
                <Link to={`/modules#${m.id}`} className="transition hover:text-brand">
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/#about" className="transition hover:text-brand">About Retail AI</Link></li>
            <li><Link to="/#users" className="transition hover:text-brand">Who It's For</Link></li>
            <li><Link to="/#how-it-works" className="transition hover:text-brand">How It Works</Link></li>
            <li><Link to="/#faq" className="transition hover:text-brand">FAQ</Link></li>
            <li><Link to="/#contact" className="transition hover:text-brand">Book a Demo</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <address className="not-italic">{SITE_CONFIG.ADDRESS_LINE_1}<br />{SITE_CONFIG.ADDRESS_LINE_2}</address>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <a href={`tel:${SITE_CONFIG.PHONE_HREF}`} className="transition hover:text-brand">{SITE_CONFIG.PHONE}</a>
                <br />
                <a href={`tel:${SITE_CONFIG.PHONE_SECONDARY_HREF}`} className="transition hover:text-brand">{SITE_CONFIG.PHONE_SECONDARY}</a>
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <a href={`mailto:${SITE_CONFIG.EMAIL}`} className="transition hover:text-brand">{SITE_CONFIG.EMAIL}</a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>{SITE_CONFIG.BUSINESS_HOURS}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {CURRENT_YEAR} {SITE_CONFIG.COMPANY_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
