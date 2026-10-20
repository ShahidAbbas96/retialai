import {
  BarChart3,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DatabaseZap,
  FileSpreadsheet,
  Pause,
  Play,
  PlugZap,
  RefreshCw,
  Sparkles,
  Store,
  Tags,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection.tsx";
import Reveal from "../components/Reveal.tsx";
import { HERO_SLIDES, MODULES_BACKGROUND } from "../data/images.ts";
import { MODULES } from "../data/modules.ts";

const KEY_INSIGHTS = [
  "Visibility of expected closing stock and gross profit",
  "Timely warnings of over- or under-stock (open to buy, OTB / WSSI)",
  "Financial calendar and merchandise calendar kept in sync",
  "Instant information about stock, open orders and ageing inventory",
  "AI markdown planning built into the same workflow",
];

const TIMELINE = [
  {
    lead: "Spreadsheets are still the most common planning tool.",
    text: "But they break easily, take hours to maintain and are only as accurate as the person updating them. Once your plans live in Retail AI, you'll wonder how you ever ran the business without it.",
  },
  {
    lead: "Enterprise planning suites cost millions.",
    text: "They're expensive to buy and complicated to implement — more than most fashion retailers want to spend. Yet they still need a robust, feature-rich solution. Retail AI was built with exactly those retailers in mind.",
  },
  {
    lead: "Retail AI is a standard, packaged solution.",
    text: "Every customer runs the same software, with no custom forks that lock you in. Regular releases add new features, developed together with our customers, so you always benefit from retail best practice.",
  },
  {
    lead: "Retail AI works alongside your existing ERP.",
    text: "Sales, stock, purchase orders and product data are imported automatically. There's no manual data entry, so you always work with up-to-date information.",
  },
];

const USERS = [
  { icon: Briefcase, title: "Management & Finance", text: "Set targets, approve budgets and see margin and stock risk at a glance." },
  { icon: BarChart3, title: "Merchandise Planners", text: "Turn budgets into seasonal plans, manage OTB and reforecast in-season." },
  { icon: Users, title: "Buyers", text: "Build the range against the plan and know exactly what's left to buy." },
  { icon: Store, title: "Allocation & Stores", text: "Get the right depth of stock into each store and channel." },
];

const BENEFITS = [
  { icon: FileSpreadsheet, topic: "Data", text: "No more copying and pasting ERP exports — sales, stock and orders flow in automatically." },
  { icon: TrendingUp, topic: "Forecasting", text: "Swap “last year plus a percentage” for AI forecasts that learn from your own history." },
  { icon: Users, topic: "Collaboration", text: "Stop emailing spreadsheet versions around — every team works from one live plan." },
  { icon: Tags, topic: "Markdowns", text: "Replace blanket end-of-season discounts with targeted proposals that show their margin impact." },
  { icon: Wallet, topic: "Open to buy", text: "Know every week exactly how much you can still buy, before you overcommit." },
];

const STEPS = [
  { icon: DatabaseZap, title: "Connect", text: "We link Retail AI to your ERP and import your history." },
  { icon: Sparkles, title: "Forecast", text: "AI models learn your seasonality and build a baseline." },
  { icon: BarChart3, title: "Plan & approve", text: "Your team refines plans and runs what-if scenarios." },
  { icon: RefreshCw, title: "Execute", text: "Orders and prices go back to the ERP automatically." },
];

const INTEGRATIONS = ["Odoo", "Microsoft Dynamics 365", "SAP Business One", "Shopify", "CSV / SFTP"];

const FAQS = [
  {
    q: "Do we need to replace our ERP?",
    a: "No. Retail AI runs alongside your existing ERP. It reads sales, stock, purchase orders and product data automatically, and sends approved orders and new prices back.",
  },
  {
    q: "Can we start with just one module?",
    a: "Yes. Many retailers start with Open to Buy or Markdown Planning, where the payback is fastest, and add the other modules later. All modules share the same data, so nothing is wasted.",
  },
  {
    q: "Is Retail AI only for fashion?",
    a: "It is built for seasonal, size-and-colour businesses: apparel, footwear, sportswear, accessories and lifestyle. If your products have seasons and style-colours, it will fit.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the modules you choose and the size of your business. Book a demo and we'll give you a clear quote.",
  },
  {
    q: "What does the AI actually do?",
    a: "It forecasts demand at style-colour, store and channel level, seeds budgets from your history and targets, flags exceptions when sales drift from plan, and proposes markdowns with their margin impact. Your planners stay in control and approve every change.",
  },
];

function SectionTitle({ id, children, light = false, className = "" }: { id?: string; children: ReactNode; light?: boolean; className?: string }) {
  return (
    <h2 id={id} className={`font-display text-4xl font-bold uppercase leading-[0.95] tracking-wide sm:text-5xl ${light ? "text-white" : "text-[#222]"} ${className}`}>
      {children}
    </h2>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section aria-label="Introduction" className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-ink pt-24 text-white md:h-[92vh] md:pt-28">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className={`h-full w-full object-cover ${i === index && !paused ? "animate-slow-zoom" : ""}`}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="animate-fade font-display text-5xl font-semibold uppercase leading-none tracking-wide drop-shadow-lg sm:text-7xl lg:text-8xl">
          Fashion Retail Planning
        </h1>
        <p className="animate-fade mx-auto mt-5 max-w-2xl text-lg font-semibold leading-snug drop-shadow sm:text-2xl">
          In fashion retail, the winners aren't the biggest —
          <br className="hidden sm:block" /> they're the ones who adapt to change the fastest.
        </p>
        <div className="animate-fade mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/#contact"
            className="inline-flex min-h-12 items-center justify-center rounded bg-brand px-8 font-display text-lg font-bold uppercase tracking-wider text-ink shadow-lg transition hover:bg-brand-light"
          >
            Book a free demo
          </Link>
          <Link
            to="/modules"
            className="inline-flex min-h-12 items-center justify-center rounded border-2 border-white/80 px-8 font-display text-lg font-bold uppercase tracking-wider transition hover:bg-white hover:text-ink"
          >
            Discover our modules
          </Link>
        </div>
      </div>

      {/* Slide controls: users can see, choose and pause the rotating images (WCAG 2.2.2) */}
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1} of ${HERO_SLIDES.length}`}
            aria-current={i === index}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span className={`block h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-brand" : "w-2.5 bg-white/70"}`} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/15"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-2 bg-brand" />
    </section>
  );
}

function Timeline() {
  return (
    <section aria-label="Why Retail AI" className="relative overflow-hidden bg-mist py-20 sm:py-24">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* The winding line that connects each statement */}
        <div className="absolute bottom-0 left-[27px] top-0 w-0.5 bg-[#d9cdb9] md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
        <ol className="relative space-y-14 md:space-y-4">
          {TIMELINE.map((item, i) => {
            const left = i % 2 === 1;
            const filled = i % 2 === 0;
            return (
              <Reveal as="li" key={item.lead} className="relative md:grid md:grid-cols-2 md:gap-20">
                <span
                  className={`absolute left-[14px] top-1 flex h-7 w-7 items-center justify-center rounded-full md:left-1/2 md:-translate-x-1/2 ${
                    filled ? "bg-brand shadow-[0_0_0_6px_rgba(220,203,1,0.25)]" : "border-2 border-[#d9cdb9] bg-mist"
                  }`}
                  aria-hidden="true"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${filled ? "bg-white" : "bg-[#d9cdb9]"}`} />
                </span>
                <div className={`pl-16 md:pl-0 ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}>
                  <p className="text-[17px] leading-relaxed text-ink-soft">
                    <strong className="block font-display text-2xl font-bold uppercase leading-tight tracking-wide text-ink">
                      {item.lead}
                    </strong>
                    <span className="mt-2 block">{item.text}</span>
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function ModuleExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = MODULES[activeIndex];

  // WAI-ARIA tabs pattern (vertical): arrow keys move between modules, Home/End jump to the ends.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = MODULES.length - 1;
    const forward = e.key === "ArrowDown" || e.key === "ArrowRight";
    const back = e.key === "ArrowUp" || e.key === "ArrowLeft";
    const next = forward ? (activeIndex === last ? 0 : activeIndex + 1)
      : back ? (activeIndex === 0 ? last : activeIndex - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="modules" aria-labelledby="modules-heading">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle id="modules-heading" className="md:ml-[33%]">
              Discover our
              <br />
              modules
            </SectionTitle>
          </Reveal>
        </div>
      </div>

      <div className="relative bg-ink">
        <img src={MODULES_BACKGROUND} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto grid max-w-7xl md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Planning modules"
            onKeyDown={onKeyDown}
            className="no-scrollbar flex gap-2 overflow-x-auto bg-black/45 px-4 py-6 md:flex-col md:gap-1 md:overflow-visible md:px-10 md:py-14"
          >
            {MODULES.map((m, i) => {
              const selected = i === activeIndex;
              return (
                <button
                  key={m.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`tab-${m.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${m.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  className="group flex shrink-0 items-center gap-4 rounded-full py-1.5 pl-1.5 pr-5 text-left transition hover:bg-white/5"
                >
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-full bg-brand text-ink transition-all duration-300 ${
                      selected ? "h-16 w-16 md:h-20 md:w-20" : "h-11 w-11 group-hover:scale-105"
                    }`}
                  >
                    <m.icon className={selected ? "h-8 w-8" : "h-5 w-5"} aria-hidden="true" />
                  </span>
                  <span
                    className={`font-display font-semibold uppercase leading-none tracking-wide text-white transition-all ${
                      selected ? "text-2xl md:text-4xl" : "text-lg text-white/85"
                    }`}
                  >
                    {m.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            key={current.id}
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            className="animate-fade flex flex-col justify-center px-6 py-10 md:px-14 md:py-14"
          >
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-white/70">
              Module {activeIndex + 1} of {MODULES.length}
            </p>
            <p className="mt-2 max-w-lg text-lg text-white">{current.summary}</p>
            <ul className="mt-6 max-w-lg space-y-3">
              {current.features.slice(0, 5).map((f) => (
                <li key={f} className="flex gap-3 text-[17px] font-semibold leading-snug text-brand-light">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to={`/modules#${current.id}`}
              className="mt-8 inline-flex min-h-11 w-fit items-center gap-1 font-display text-lg font-bold uppercase tracking-wider text-brand hover:text-brand-light"
            >
              Read more <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitSlider() {
  const [index, setIndex] = useState(0);
  const item = BENEFITS[index];
  const go = (delta: number) => setIndex((i) => (i + delta + BENEFITS.length) % BENEFITS.length);

  return (
    <section id="benefits" aria-roledescription="carousel" aria-label="Benefits of Retail AI" className="bg-brand py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-2 sm:gap-6 sm:px-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous benefit"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-ink/10"
        >
          <ChevronLeft className="h-9 w-9" />
        </button>

        <div key={item.topic} className="animate-fade flex flex-1 flex-col items-center gap-6 text-center sm:flex-row sm:text-left" aria-live="polite">
          <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-ink text-brand sm:h-32 sm:w-32">
            <item.icon className="h-10 w-10 sm:h-14 sm:w-14" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-ink/70">
              {item.topic} · {index + 1} / {BENEFITS.length}
            </p>
            <p className="mt-2 text-2xl font-semibold leading-snug text-ink sm:text-3xl">{item.text}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next benefit"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-ink/10"
        >
          <ChevronRight className="h-9 w-9" />
        </button>
      </div>
      <div className="mt-8 flex justify-center gap-1">
        {BENEFITS.map((b, i) => (
          <button
            key={b.topic}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show benefit ${i + 1}: ${b.topic}`}
            aria-current={i === index}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span className={`block h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-ink" : "w-2.5 bg-ink/30"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Introduction: yellow band */}
      <section id="introduction" aria-labelledby="intro-heading" className="bg-brand">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[2fr_3fr] md:gap-16 md:py-16 lg:px-8">
          <Reveal>
            <h2 id="intro-heading" className="text-3xl font-bold leading-tight text-ink sm:text-[2.1rem]">
              Retail AI gives fashion retailers the information that's essential for an excellent operation:
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-3">
              {KEY_INSIGHTS.map((text) => (
                <li key={text} className="flex gap-3 text-lg font-semibold text-ink/85">
                  <span className="mt-2.5 h-2 w-2 shrink-0 bg-ink" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Timeline />

      <ModuleExplorer />

      {/* Users */}
      <section id="users" aria-labelledby="users-heading" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle id="users-heading">Who it's for</SectionTitle>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft">
              From the boardroom to the buying office, everyone works from the same live numbers.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded bg-[#e8dfd0] sm:grid-cols-2 lg:grid-cols-4">
            {USERS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80} className="bg-white">
                <div className="group h-full p-8 text-center transition hover:bg-mist">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-ink transition group-hover:scale-110">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BenefitSlider />

      {/* Integrations & how it works: cream band, like "Our partners" */}
      <section id="integrations" aria-labelledby="integrations-heading" className="bg-mist py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle id="integrations-heading">Works with your ERP</SectionTitle>
          </Reveal>
          <ul className="mt-10 flex flex-wrap gap-4">
            {INTEGRATIONS.map((name) => (
              <li key={name} className="flex min-h-20 min-w-40 items-center justify-center gap-2 rounded bg-white px-6 font-display text-xl font-bold uppercase tracking-wide text-ink-soft shadow-sm">
                <PlugZap className="h-5 w-5 text-brand-dark" aria-hidden="true" /> {name}
              </li>
            ))}
          </ul>

          <h3 className="mt-16 font-display text-2xl font-bold uppercase tracking-wide">How it works</h3>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80}>
                <div className="flex h-full gap-4 border-l-4 border-brand bg-white p-5 shadow-sm">
                  <span className="font-display text-4xl font-bold leading-none text-brand-dark">{i + 1}</span>
                  <div>
                    <p className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wide">
                      <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" /> {title}
                    </p>
                    <p className="mt-1 text-ink-soft">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle id="faq-heading">Questions retailers ask</SectionTitle>
          </Reveal>
          <div className="mt-10 divide-y divide-[#e8dfd0] border-y border-[#e8dfd0]">
            {FAQS.map((item, i) => (
              <details key={item.q} open={i === 0} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-xl font-bold uppercase tracking-wide transition hover:text-brand-dark">
                  {item.q}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <ChevronDown className="faq-chevron h-5 w-5 transition" aria-hidden="true" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-lg leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
