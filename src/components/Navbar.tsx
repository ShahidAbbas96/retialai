import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollSpy } from "../lib/useScrollSpy.ts";
import Logo from "./Logo.tsx";

const NAV_LINKS = [
  { label: "About", to: "/#about", section: "about" },
  { label: "Modules", to: "/modules", section: "modules" },
  { label: "Who It's For", to: "/#users", section: "users" },
  { label: "How It Works", to: "/#how-it-works", section: "how-it-works" },
  { label: "FAQ", to: "/#faq", section: "faq" },
  { label: "Contact", to: "/#contact", section: "contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.section);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const activeSection = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: close with Escape and stop the page scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    link.to === "/modules" ? pathname === "/modules" || (pathname === "/" && activeSection === "modules") : pathname === "/" && activeSection === link.section;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-ink/98 shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Retail AI — home" className="rounded-lg">
          <Logo light />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={active ? "location" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition ${
                    active ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          to="/#contact"
          className="group hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-brand/20 transition hover:bg-emerald-400 lg:inline-flex"
        >
          Book a Demo
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="animate-fade h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 px-4 pb-8 lg:hidden">
          <ul className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link) ? "location" : undefined}
                  className={`flex min-h-12 items-center rounded-xl px-4 text-lg font-medium ${
                    isActive(link) ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/#contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-5 font-semibold text-ink"
          >
            Book a Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
