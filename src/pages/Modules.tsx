import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection.tsx";
import Reveal from "../components/Reveal.tsx";
import { MODULES } from "../data/modules.ts";
import { useScrollSpy } from "../lib/useScrollSpy.ts";

const MODULE_IDS = MODULES.map((m) => m.id);

export default function Modules() {
  const active = useScrollSpy(MODULE_IDS, 160);

  return (
    <>
      <section className="bg-hero pb-16 pt-32 text-white sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="animate-fade">
            <ol className="flex items-center gap-1.5 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li aria-current="page" className="text-white">Modules</li>
            </ol>
          </nav>
          <h1 className="animate-fade mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Everything you need to plan a <span className="text-gradient">fashion business</span>
          </h1>
          <p className="animate-fade mt-5 max-w-2xl text-lg text-white/75">
            Six modules that share one dataset and one AI forecast. Use them together for end-to-end planning, or start
            with the one that hurts most today.
          </p>
        </div>
      </section>

      {/* Sticky in-page navigation shows which module you're reading */}
      <nav aria-label="Modules on this page" className="sticky top-18 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
          {MODULES.map((m) => {
            const isActive = active === m.id;
            return (
              <a
                key={m.id}
                href={`#${m.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition ${
                  isActive ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`}
              >
                <m.icon className={`h-4 w-4 ${isActive ? "text-brand" : ""}`} aria-hidden="true" />
                {m.title}
              </a>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {MODULES.map((m, i) => (
          <section key={m.id} id={m.id} aria-labelledby={`${m.id}-heading`} className="grid scroll-mt-36 gap-8 border-b border-slate-200 py-16 last:border-0 lg:grid-cols-5 lg:gap-12 lg:py-20">
            <Reveal className="lg:col-span-2">
              <div className="lg:sticky lg:top-40">
                <span className="text-sm font-bold text-slate-500">Module {i + 1} of {MODULES.length}</span>
                <div className="mt-3 flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                    <m.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h2 id={`${m.id}-heading`} className="text-2xl font-extrabold tracking-tight sm:text-3xl">{m.title}</h2>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">{m.summary}</p>
                <Link to="/#contact" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-dark">
                  See {m.title} in a demo
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-3">
              {m.features.map((f, j) => (
                <Reveal as="li" key={f} delay={Math.min(j, 6) * 40}>
                  <div className="flex h-full gap-3 rounded-2xl bg-mist p-4 text-sm font-medium text-slate-700 ring-1 ring-transparent transition hover:bg-white hover:shadow-md hover:ring-slate-200">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15">
                      <Check className="h-3.5 w-3.5 text-brand-dark" aria-hidden="true" />
                    </span>
                    {f}
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="bg-hero py-16 text-white">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold sm:text-4xl">Want to see these modules with your own data?</h2>
          <Link
            to="/#contact"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-8 font-semibold text-ink shadow-lg shadow-brand/25 hover:bg-emerald-400"
          >
            Book a free demo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <ContactSection />
    </>
  );
}
