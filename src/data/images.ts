/**
 * Photography from Unsplash (free to use under the Unsplash License).
 * Replace with your own store photography when available.
 */
const unsplash = (id: string, width = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;

export const HERO_SLIDES = [
  { src: unsplash("photo-1572013343881-32685fe74c53"), alt: "Shoppers riding escalators in a busy shopping centre" },
  { src: unsplash("photo-1441986300917-64674bd600d8"), alt: "Fashion store interior with clothing rails" },
  { src: unsplash("photo-1483985988355-763728e1935b"), alt: "Shopper carrying fashion shopping bags" },
];

export const MODULES_BACKGROUND = unsplash("photo-1672870153035-bc63f75140d4");

/** One photo per module on the /modules page, keyed by module id. */
export const MODULE_IMAGES: Record<string, string> = {
  "financial-planning": unsplash("photo-1441984904996-e0b6ba687e04"),
  "merchandise-planning": unsplash("photo-1483985988355-763728e1935b"),
  "assortment-planning": unsplash("photo-1532453288672-3a27e9be9efd"),
  "open-to-buy": unsplash("photo-1567401893414-76b7b1e5a7a5"),
  "markdown-planning": unsplash("photo-1558769132-cb1aea458c5e"),
  "demand-forecasting": unsplash("photo-1603400521630-9f2de124b33b"),
};
