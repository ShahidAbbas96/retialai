import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MODULES } from "../data/modules.ts";
import { useScrollSpy } from "../lib/useScrollSpy.ts";
import Logo from "./Logo.tsx";

const PAGES = [
  { label: "About Retail AI", to: "/" },
  { label: "Discover our modules", to: "/modules" },
];

const HOME_SECTIONS = [
  { label: "Introduction", id: "introduction" },
  { label: "Modules", id: "modules" },
  { label: "Users", id: "users" },
  { label: "Benefits", id: "benefits" },
  { label: "Integrations", id: "integrations" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const MODULE_SECTIONS = MODULES.map((m) => ({ label: m.shortTitle, id: m.id }));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onModulesPage = pathname === "/modules";
  const sections = onModulesPage ? MODULE_SECTIONS : HOME_SECTIONS;
  const active = useScrollSpy(sections.map((s) => s.id), 130);

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

  const sectionHref = (id: string) => (onModulesPage ? `/modules#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 shadow-lg shadow-black/20">
      {/* Top bar: logo, page switch, primary action */}
      <div className="bg-ink">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" onClick={() => setOpen(false)} aria-label="Retail AI — home">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-2 md:flex">
            {PAGES.map((page) => {
              const current = pathname === page.to;
              return (
                <li key={page.to}>
                  <Link
                    to={page.to}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex min-h-9 items-center rounded px-3.5 font-display text-sm font-semibold uppercase tracking-wider transition ${
                      current ? "bg-muted/70 text-white" : "text-muted hover:bg-ink-soft hover:text-white"
                    }`}
                  >
                    {page.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            to="/#contact"
            className="hidden min-h-10 items-center rounded bg-brand px-4 font-display text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-brand-light md:inline-flex"
          >
            Book a demo
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded text-white hover:bg-ink-soft md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Section bar: in-page navigation that highlights where you are */}
      <div className="hidden border-t border-white/5 bg-ink/90 backdrop-blur md:block">
        <nav aria-label="On this page" className="no-scrollbar mx-auto flex max-w-7xl justify-center gap-1.5 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <Link
                key={s.id}
                to={sectionHref(s.id)}
                aria-current={isActive ? "location" : undefined}
                className={`inline-flex min-h-8 shrink-0 items-center rounded border px-3 font-display text-xs font-semibold uppercase tracking-wider transition ${
                  isActive
                    ? "border-brand bg-brand text-ink"
                    : "border-muted/50 text-[#c2b4a6] hover:border-muted hover:bg-ink-soft hover:text-white"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <div id="mobile-menu" className="animate-fade h-[calc(100dvh-4rem)] overflow-y-auto bg-ink px-4 pb-10 md:hidden">
          <ul className="grid grid-cols-2 gap-2 pt-3">
            {PAGES.map((page) => (
              <li key={page.to}>
                <Link
                  to={page.to}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === page.to ? "page" : undefined}
                  className={`flex min-h-12 items-center justify-center rounded px-3 text-center font-display text-sm font-semibold uppercase tracking-wider ${
                    pathname === page.to ? "bg-muted/70 text-white" : "bg-ink-soft text-[#c2b4a6]"
                  }`}
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 px-1 font-display text-xs font-semibold uppercase tracking-widest text-muted">On this page</p>
          <ul className="mt-2 flex flex-col">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  to={sectionHref(s.id)}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center border-b border-white/5 px-1 font-display text-xl font-semibold uppercase tracking-wide ${
                    active === s.id ? "text-brand" : "text-white"
                  }`}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/#contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex min-h-12 items-center justify-center rounded bg-brand font-display font-bold uppercase tracking-wider text-ink"
          >
            Book a demo
          </Link>
        </div>
      )}
    </header>
  );
}
