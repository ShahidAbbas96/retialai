export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 64 64" className={`${lg ? "h-12 w-12" : "h-8 w-8"} shrink-0`} aria-hidden="true">
        <rect width="64" height="64" rx="12" fill="#dccb01" />
        <path d="M16 44V30m10 14V22m10 22V28m10 16V18" stroke="#2b2621" strokeWidth="6" strokeLinecap="round" />
        <circle cx="46" cy="14" r="5" fill="#2b2621" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display font-semibold uppercase tracking-wide text-brand ${lg ? "text-4xl" : "text-2xl"}`}>
          Retail AI
        </span>
        <span className={`block font-medium text-muted ${lg ? "text-sm" : "text-[10px]"}`}>Fashion Retail Planner</span>
      </span>
    </span>
  );
}
