import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site.ts";
import { MODULES } from "../data/modules.ts";
import Logo from "./Logo.tsx";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pb-20 text-[#c2b4a6] md:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <Link to="/" aria-label="Retail AI — home" className="shrink-0">
          <Logo size="lg" />
        </Link>
        <div className="space-y-3 font-display text-sm font-semibold uppercase tracking-wider">
          <address className="not-italic">
            {SITE_CONFIG.COMPANY_NAME}
            <span className="mx-2 text-muted">·</span>
            {SITE_CONFIG.ADDRESS_LINE_1}, {SITE_CONFIG.ADDRESS_LINE_2}
            <br />
            Phone: <a href={`tel:${SITE_CONFIG.PHONE_HREF}`} className="hover:text-brand">{SITE_CONFIG.PHONE}</a>
            <span className="mx-2 text-muted">·</span>
            Email: <a href={`mailto:${SITE_CONFIG.EMAIL}`} className="normal-case hover:text-brand">{SITE_CONFIG.EMAIL}</a>
          </address>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              {MODULES.map((m) => (
                <li key={m.id}>
                  <Link to={`/modules#${m.id}`} className="hover:text-brand">{m.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-muted">© {CURRENT_YEAR} {SITE_CONFIG.COMPANY_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
