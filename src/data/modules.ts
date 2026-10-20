import type { LucideIcon } from "lucide-react";
import { BrainCircuit, CalendarRange, Landmark, LayoutGrid, Percent, ShoppingBag } from "lucide-react";

export interface PlanningModule {
  id: string;
  title: string;
  /** Compact label for navigation bars. */
  shortTitle: string;
  icon: LucideIcon;
  summary: string;
  /** First five are shown on the homepage; all are shown on /modules. */
  features: string[];
}

export const MODULES: PlanningModule[] = [
  {
    id: "financial-planning",
    title: "Financial Planning",
    shortTitle: "Financial Planning",
    icon: Landmark,
    summary: "Set the top-line budget once and keep finance and merchandising working from the same numbers.",
    features: [
      "Financial and merchandise budgets stay synchronized automatically",
      "Multi-level sales hierarchy: country, region, store type and individual store",
      "Multi-channel planning across e-commerce, stores, concessions and marketplaces",
      "Unlimited plan versions to compare scenarios side by side",
      "AI-seeded budgets built from your KPIs, targets and historic trends",
      "Flexible time buckets: weeks, 4-4-5 retail calendar, months or custom periods",
      "Full history of sales and budgets at every level",
      "Plans by total, product hierarchy and season",
      "Live sales, markdown, units, retail value, cost and gross profit",
    ],
  },
  {
    id: "merchandise-planning",
    title: "Merchandise Planning",
    shortTitle: "Merchandise Planning",
    icon: CalendarRange,
    summary: "Translate the financial plan into seasonal, category-level plans your buyers can execute.",
    features: [
      "Free definition of season start and end dates, including overlapping seasons",
      "Top-down and bottom-up seasonal planning",
      "Live comparison against like-for-like seasons",
      "New merchandise plans seeded from the financial plan in one click",
      "Up to ten product-hierarchy levels and unlimited attributes",
      "Dedicated handling of never-out-of-stock (NOS) ranges",
      "Save and spread values up and down the planning hierarchy",
      "Range control with targets for number of styles and options",
      "Balancing tool that smooths gaps between hierarchy levels",
    ],
  },
  {
    id: "assortment-planning",
    title: "Assortment Planning",
    shortTitle: "Assortment Planning",
    icon: LayoutGrid,
    summary: "Build the range style by style while staying inside the merchandise plan.",
    features: [
      "Placeholder styles help buyers shape the range before products exist",
      "Assortment plan is continuously checked against the top-line merchandise plan",
      "Automatic upload and mapping of styles and colours from your ERP",
      "Visual collection book with product images",
      "Budget versus planned style-colours per custom time bucket",
      "Fast creation of new articles with copy functions",
      "Up to fifty user-definable columns and pre-defined calculations",
      "Purchase-order lines pushed straight back to the ERP",
      "Live view of open purchase orders and stock for every style-colour",
    ],
  },
  {
    id: "open-to-buy",
    title: "Open-to-Buy (OTB / WSSI)",
    shortTitle: "Open to Buy",
    icon: ShoppingBag,
    summary: "Know every week exactly how much you can still buy — and where you are over- or under-stocked.",
    features: [
      "Multiple seasons and the retail calendar on a single screen",
      "Buyer “shopping lists” sent by email",
      "Weekly sales, markdown, margin, forward cover, closing stock and OTB (WSSI)",
      "Expected versus required closing stock with what-if simulations",
      "AI in-season reforecast as actuals come in",
      "Pre-season and in-season planning in one place",
      "Forward cover and stock-turn targets",
      "Guided steps to reach the required closing stock",
      "Old-stock sales and markdown budgets seeded from historic sell-through",
      "Budgets phased over time using historic sales and markdown profiles",
      "Financial and merchandise budgets kept aligned",
    ],
  },
  {
    id: "markdown-planning",
    title: "Markdown Optimization",
    shortTitle: "Markdown Planning",
    icon: Percent,
    summary: "Clear the right stock at the right time with the smallest possible hit to margin.",
    features: [
      "AI recommends the optimal timing, frequency and depth of each markdown",
      "Proposals based on actual versus ideal sell-through and product life cycle",
      "Instant gross-profit impact of every proposal",
      "Price rounding and price-point ladders",
      "Age-based and cost-based proposals for aged stock",
      "Ideal sell-through curves learned from reference products",
      "Business rules: maximum price changes, minimum days between changes, campaign blackouts",
      "Priority scoring so the highest-value proposals come first",
      "Bestseller and slow-seller analysis per style-colour",
      "One-click upload of new retail prices to the ERP",
    ],
  },
  {
    id: "demand-forecasting",
    title: "AI Demand Forecasting",
    shortTitle: "AI Forecasting",
    icon: BrainCircuit,
    summary: "Machine-learning forecasts that power every other module with a sharper baseline.",
    features: [
      "Forecasts at style-colour, store and channel level",
      "Learns seasonality, trends, promotions and price effects from your history",
      "New-product forecasts from similar reference products",
      "Explains the drivers behind each forecast in plain language",
      "Forecast accuracy tracked and reported every week",
      "Exception alerts when actual sales drift away from plan",
    ],
  },
];
