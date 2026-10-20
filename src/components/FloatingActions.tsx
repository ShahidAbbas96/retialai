import { ArrowUp, CalendarCheck, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE_CONFIG, whatsappHref } from "../config/site.ts";
import { WhatsappIcon } from "./SocialIcons.tsx";

/**
 * Persistent shortcuts so the main actions are always one tap away:
 * a bottom action bar on phones and a back-to-top button on larger screens.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-brand text-ink shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-light md:flex ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 bg-ink shadow-[0_-4px_16px_rgba(0,0,0,0.25)] md:hidden">
        <a href={`tel:${SITE_CONFIG.PHONE_HREF}`} className="flex min-h-14 flex-col items-center justify-center gap-0.5 font-display text-xs font-semibold uppercase tracking-wider text-[#d8ccbf]">
          <Phone className="h-5 w-5 text-brand" /> Call
        </a>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex min-h-14 flex-col items-center justify-center gap-0.5 font-display text-xs font-semibold uppercase tracking-wider text-[#d8ccbf]">
          <WhatsappIcon className="h-5 w-5 text-[#25d366]" /> WhatsApp
        </a>
        <Link to="/#contact" className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-brand font-display text-xs font-bold uppercase tracking-wider text-ink">
          <CalendarCheck className="h-5 w-5" /> Book a demo
        </Link>
      </nav>
    </>
  );
}
