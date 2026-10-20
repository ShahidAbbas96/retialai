import {
  ArrowRight,
  BarChart3,
  Boxes,
  Briefcase,
  CalendarSync,
  Check,
  ChevronDown,
  DatabaseZap,
  FileSpreadsheet,
  Package,
  PlugZap,
  RefreshCw,
  Sparkles,
  Store,
  Tags,
  TrendingUp,
  TriangleAlert,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection.tsx";
import Reveal from "../components/Reveal.tsx";
import { MODULES } from "../data/modules.ts";

const KEY_INSIGHTS = [
  { icon: TrendingUp, text: "Clear view of expected closing stock and gross profit, every week" },
  { icon: Boxes, text: "Early warnings of over- and under-stock through open-to-buy (OTB / WSSI)" },
  { icon: CalendarSync, text: "Financial calendar and merchandise calendar kept in sync" },
  { icon: Package, text: "Live information on stock, open orders and ageing inventory" },
  { icon: Tags, text: "AI markdown planning built into the same workflow" },
];

const PILLARS = [
  {
    icon: FileSpreadsheet,
    title: "Goodbye, planning spreadsheets",
    text: "Spreadsheets are fragile, slow and only as accurate as the person maintaining them. Retail AI replaces them with one shared, controlled plan — so your team makes decisions instead of fixing formulas.",
  },
  {
    icon: Wallet,
    title: "Enterprise power, mid-market price",
    text: "Big-name planning suites cost a fortune and take years to roll out. Retail AI gives growing fashion retailers the same depth of planning at a fraction of the cost and effort.",
  },
  {
    icon: RefreshCw,
    title: "One standard product, always improving",
    text: "Every customer runs the same software — no custom forks that lock you in. Regular releases add features shaped together with our customers.",
  },
  {
    icon: PlugZap,
    title: "Works alongside your ERP",
    text: "Keep your existing ERP. Sales, stock, purchase orders and product data flow in automatically, so nobody re-keys data and every plan uses today's numbers.",
  },
];

const COMPARISON = [
  { topic: "Data", before: "Copied and pasted from ERP exports", after: "Imported from your ERP automatically" },
  { topic: "Accuracy", before: "One broken formula skews the whole season", after: "Controlled, validated calculations" },
  { topic: "Collaboration", before: "Versions emailed back and forth", after: "One live plan for every team" },
  { topic: "Forecasting", before: "Last year plus a gut-feel percentage", after: "AI forecasts that learn from your history" },
  { topic: "Markdowns", before: "Blanket discounts at the end of season", after: "Targeted proposals with margin impact" },
];

const USERS = [
  { icon: Briefcase, title: "Management & Finance", text: "Set targets, approve budgets and see margin and stock risk at a glance." },
  { icon: BarChart3, title: "Merchandise Planners", text: "Turn budgets into seasonal plans, manage OTB and reforecast in-season." },
  { icon: Users, title: "Buyers", text: "Build the range against the plan and know exactly what's left to buy." },
  { icon: Store, title: "Allocation & Stores", text: "Get the right depth of stock into each store and channel." },
];

const STEPS = [
  { icon: DatabaseZap, title: "Connect", text: "We link Retail AI to your ERP and import your sales, stock and product history." },
  { icon: Sparkles, title: "Forecast", text: "Our AI models learn your seasonality and build a baseline for every plan." },
  { icon: BarChart3, title: "Plan & approve", text: "Your team refines the plans, runs what-if scenarios and signs off." },
  { icon: RefreshCw, title: "Execute", text: "Orders and new prices go back to your ERP; plans update as actuals arrive." },
];

const INTEGRATIONS = ["Odoo", "Microsoft Dynamics 365", "SAP Business One", "Shopify", "CSV / SFTP feeds"];

const FAQS = [
  {
    q: "Do we need to replace our ERP?",
    a: "No. Retail AI runs alongside your existing ERP. It reads sales, stock, purchase orders and product data automatically, and sends approved orders and new prices back.",
  },
  {
    q: "Can we start with just one module?",
    a: "Yes. Many retailers start with Open-to-Buy or Markdown Optimization, where the payback is fastest, and add the other modules later. All modules share the same data, so nothing is wasted.",
  },
  {
    q: "Is Retail AI only for fashion?",
    a: "It is built for seasonal, size-and-colour businesses: apparel, footwear, sportswear, accessories and lifestyle. If your products have seasons and style-colours, it will fit.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the modules you choose and the size of your business. Book a demo and we'll give you a clear quote — with no surprise implementation fees.",
  },
  {
    q: "What does the AI actually do?",
    a: "It forecasts demand at style-colour, store and channel level, seeds budgets from your history and targets, flags exceptions when sales drift from plan, and proposes markdowns with their margin impact. Your planners always stay in control and approve every change.",
  },
];

function SectionHeading({ id, eyebrow, title, text, light = false }: { id?: string; eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className={`text-sm font-semibold uppercase tracking-wider ${light ? "text-brand" : "text-brand-dark"}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-lg ${light ? "text-white/70" : "text-slate-600"}`}>{text}</p>}
    </Reveal>
  );
}

function DashboardMock() {
  const bars = [62, 74, 58, 81, 69, 88, 77, 92];
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand/25 to-sky-400/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/10 bg-ink-soft/80 p-5 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <p className="ml-2 text-xs font-semibold uppercase tracking-wider text-white/60">Open-to-Buy · SS Season</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-brand/15 px-2.5 py-1 text-[11px] font-semibold text-brand">
            <Sparkles className="h-3 w-3" /> AI forecast
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Closing stock", value: "-12%", tone: "text-brand" },
            { label: "Gross margin", value: "58.4%", tone: "text-white" },
            { label: "OTB left", value: "18.2k units", tone: "text-sky-300" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-white/5 p-3">
              <p className="text-[11px] text-white/60">{kpi.label}</p>
              <p className={`mt-1 text-base font-bold sm:text-lg ${kpi.tone}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex h-36 gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col justify-end gap-1">
              <div className="animate-grow rounded-t bg-sky-400/40" style={{ height: `${h * 0.55}%`, animationDelay: `${i * 70}ms` }} />
              <div className="animate-grow rounded-t bg-brand" style={{ height: `${h * 0.45}%`, animationDelay: `${i * 70}ms` }} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
          <span>Week 1</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-brand" /> Actual</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-sky-400/60" /> Forecast</span>
          </span>
          <span>Week 8</span>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-4 max-w-[17rem] rounded-xl border border-amber-300/30 bg-ink p-3.5 text-xs text-white/85 shadow-2xl sm:-left-8">
        <p className="flex items-center gap-1.5 font-semibold text-amber-300">
          <TriangleAlert className="h-3.5 w-3.5" /> Overstock risk: Knitwear
        </p>
        <p className="mt-1">Bring the 20% markdown forward 2 weeks to hit the closing-stock target.</p>
      </div>
    </div>
  );
}

function ModuleTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = MODULES[activeIndex];

  // WAI-ARIA tabs pattern: arrow keys move between tabs, Home/End jump to the ends.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = MODULES.length - 1;
    const next =
      e.key === "ArrowRight" ? (activeIndex === last ? 0 : activeIndex + 1)
      : e.key === "ArrowLeft" ? (activeIndex === 0 ? last : activeIndex - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "center" });
  };

  return (
    <>
      <div className="relative mt-12">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:justify-center" role="tablist" aria-label="Planning modules" onKeyDown={onKeyDown}>
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
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition ${
                  selected ? "bg-brand text-ink shadow-lg shadow-brand/25" : "bg-white/5 text-white/75 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <m.icon className="h-4 w-4" aria-hidden="true" />
                {m.title}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink lg:hidden" />
      </div>

      <div
        key={current.id}
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="animate-fade mt-8 grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 sm:p-10 lg:grid-cols-5"
      >
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
              <current.icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-white/60">
              {activeIndex + 1} of {MODULES.length}
            </span>
          </div>
          <h3 className="mt-5 text-2xl font-bold text-white">{current.title}</h3>
          <p className="mt-3 text-white/70">{current.summary}</p>
          <Link to={`/modules#${current.id}`} className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand">
            See all {current.features.length} features
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <ul className="space-y-3.5 lg:col-span-3">
          {current.features.slice(0, 5).map((f) => (
            <li key={f} className="flex gap-3 text-white/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20">
                <Check className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden pb-24 pt-32 text-white sm:pt-40 lg:pb-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="animate-fade">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> AI-powered fashion retail planning
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Buy the right stock.
              <br />
              <span className="text-gradient">Sell it at full price.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Retail AI replaces planning spreadsheets with one platform for financial, merchandise, assortment,
              open-to-buy and markdown planning — built for fashion retailers and connected to the ERP you already run.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/#contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 font-semibold text-ink shadow-lg shadow-brand/25 transition hover:bg-emerald-400"
              >
                Book a free demo
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to="/modules"
                className="inline-flex min-h-12 items-center justify-center rounded-full px-7 font-semibold ring-1 ring-white/25 transition hover:bg-white/5 hover:ring-white/60"
              >
                Explore the modules
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {["Works with your ERP", "AI forecasts built in", "Start with one module"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-fade [animation-delay:150ms]">
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* Integrations strip */}
      <section aria-label="Integrations" className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <p className="text-sm font-semibold text-slate-500">Connects with the systems you already use</p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {INTEGRATIONS.map((name) => (
              <li key={name} className="text-base font-bold text-slate-400">{name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* About / key insights */}
      <section id="about" aria-labelledby="about-heading" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark">About Retail AI</p>
            <h2 id="about-heading" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything you need to run an excellent fashion operation
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Retail AI is a packaged planning solution designed specifically for fashion and apparel. It brings the
              numbers your buyers, planners and finance team rely on into one place — and uses AI to tell you what to
              do next.
            </p>
            <Link to="/modules" className="group mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-dark">
              See how the modules fit together
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
          <ul className="space-y-3">
            {KEY_INSIGHTS.map(({ icon: Icon, text }, i) => (
              <Reveal as="li" key={text} delay={i * 70}>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{text}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {PILLARS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="h-full rounded-3xl bg-mist p-7 ring-1 ring-transparent transition hover:bg-white hover:shadow-xl hover:ring-slate-200">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-brand">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Spreadsheet vs Retail AI */}
      <section aria-labelledby="compare-heading" className="bg-mist py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="compare-heading" eyebrow="Why switch" title="Spreadsheets vs. Retail AI" />
          <Reveal className="mt-12 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 ring-1 ring-slate-200">
            <div className="hidden grid-cols-[1fr_1.4fr_1.4fr] bg-ink text-sm font-semibold text-white sm:grid">
              <div className="p-4 sm:px-6" />
              <div className="flex items-center gap-2 p-4 sm:px-6"><FileSpreadsheet className="h-4 w-4 text-white/60" aria-hidden="true" /> Spreadsheets</div>
              <div className="flex items-center gap-2 p-4 text-brand sm:px-6"><Sparkles className="h-4 w-4" aria-hidden="true" /> Retail AI</div>
            </div>
            <dl className="divide-y divide-slate-200">
              {COMPARISON.map((row) => (
                <div key={row.topic} className="grid gap-2 p-5 sm:grid-cols-[1fr_1.4fr_1.4fr] sm:gap-0 sm:p-0">
                  <dt className="font-bold sm:p-5 sm:px-6">{row.topic}</dt>
                  <dd className="flex items-start gap-2 text-slate-500 sm:p-5 sm:px-6">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-label="Spreadsheets:" />
                    {row.before}
                  </dd>
                  <dd className="flex items-start gap-2 font-medium sm:bg-brand/5 sm:p-5 sm:px-6">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" aria-label="Retail AI:" />
                    {row.after}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" aria-labelledby="modules-heading" className="bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="modules-heading"
            light
            eyebrow="Discover our modules"
            title="One platform, from budget to markdown"
            text="Start with the module you need most and add the rest as you grow. Every module shares the same data and the same AI forecast."
          />
          <ModuleTabs />
        </div>
      </section>

      {/* Users */}
      <section id="users" aria-labelledby="users-heading" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="users-heading"
            eyebrow="Who it's for"
            title="Built for every team that touches the plan"
            text="From the boardroom to the buying office, everyone works from the same live numbers."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {USERS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="group h-full rounded-3xl border border-slate-200 p-7 text-center transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark transition group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="how-heading" className="bg-mist py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="how-heading" eyebrow="How it works" title="From spreadsheet to live plan in four steps" />
          <div className="relative mt-14">
          <div className="absolute left-[12.5%] right-[12.5%] top-[3.5rem] hidden h-0.5 bg-gradient-to-r from-brand/0 via-brand/40 to-brand/0 lg:block" aria-hidden="true" />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 100} className="relative">
                <div className="h-full rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-slate-200">
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-brand ring-8 ring-mist">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-ink">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="faq-heading" eyebrow="FAQ" title="Questions retailers ask us" />
          <Reveal className="mt-12 space-y-3">
            {FAQS.map((item, i) => (
              <details key={item.q} open={i === 0} className="group rounded-2xl border border-slate-200 bg-white transition open:border-brand/40 open:shadow-md">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left font-semibold">
                  {item.q}
                  <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-slate-500 transition" aria-hidden="true" />
                </summary>
                <p className="px-6 pb-5 leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </Reveal>
          <p className="mt-8 text-center text-slate-600">
            Still have a question?{" "}
            <Link to="/#contact" className="font-semibold text-brand-dark underline-offset-4 hover:underline">
              Ask our team
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero py-20 text-white">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Ready to retire the planning spreadsheet?</h2>
          <p className="max-w-2xl text-lg text-white/75">Book a 30-minute demo and see how Retail AI would plan your next season.</p>
          <Link
            to="/#contact"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-8 font-semibold text-ink shadow-lg shadow-brand/25 transition hover:bg-emerald-400"
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
