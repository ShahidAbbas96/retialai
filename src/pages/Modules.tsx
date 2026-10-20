import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection.tsx";
import Reveal from "../components/Reveal.tsx";
import { MODULE_IMAGES } from "../data/images.ts";
import { MODULES } from "../data/modules.ts";

export default function Modules() {
  return (
    <>
      <h1 className="sr-only">Retail AI planning modules</h1>
      {MODULES.map((m, i) => {
        const right = i % 2 === 1;
        return (
          <section
            key={m.id}
            id={m.id}
            aria-labelledby={`${m.id}-heading`}
            className="relative flex min-h-[640px] items-center overflow-hidden bg-ink pb-16 pt-36 first:pt-40 md:min-h-[100vh]"
          >
            <img
              src={MODULE_IMAGES[m.id]}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 ${
                right ? "bg-gradient-to-l" : "bg-gradient-to-r"
              } from-black/80 via-black/55 to-black/10`}
            />

            <div className={`relative mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${right ? "md:justify-end" : ""}`}>
              <Reveal className="w-full max-w-xl">
                <div className="flex items-center gap-5">
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand text-ink shadow-lg">
                    <m.icon className="h-9 w-9" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold uppercase tracking-widest text-white/75">
                      Module {i + 1} of {MODULES.length}
                    </p>
                    <h2 id={`${m.id}-heading`} className="font-display text-4xl font-bold uppercase leading-none tracking-wide text-white sm:text-6xl">
                      {m.title}
                    </h2>
                  </div>
                </div>

                <div className="mt-6 rounded-sm bg-ink/85 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                  <p className="text-lg font-semibold text-brand-light">{m.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {m.features.map((f) => (
                      <li key={f} className="flex gap-3 leading-snug text-white/90">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <Link
                      to="/#contact"
                      className="inline-flex min-h-11 items-center rounded bg-brand px-5 font-display font-bold uppercase tracking-wider text-ink transition hover:bg-brand-light"
                    >
                      See it in a demo
                    </Link>
                    {i < MODULES.length - 1 && (
                      <a
                        href={`#${MODULES[i + 1].id}`}
                        className="inline-flex min-h-11 items-center gap-1 font-display font-semibold uppercase tracking-wider text-[#c2b4a6] hover:text-white"
                      >
                        Next: {MODULES[i + 1].shortTitle} <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <ContactSection />
    </>
  );
}
