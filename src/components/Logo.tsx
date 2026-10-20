import { SITE_CONFIG } from "../config/site.ts";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#10b981" />
        <path d="M16 44V30m10 14V22m10 22V28m10 16V18" stroke="#0b1220" strokeWidth="6" strokeLinecap="round" />
        <circle cx="46" cy="14" r="5" fill="#0b1220" />
      </svg>
      <span className="leading-none">
        <span className={`block text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          {SITE_CONFIG.COMPANY_NAME}
        </span>
        <span className={`block text-[11px] font-medium ${light ? "text-white/60" : "text-slate-500"}`}>
          Fashion Retail Planner
        </span>
      </span>
    </span>
  );
}
