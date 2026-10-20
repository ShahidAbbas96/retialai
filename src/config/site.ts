/**
 * Centralized site configuration.
 * Change company details and contact info here — nothing below should be
 * hard-coded elsewhere in the app.
 */

export const SITE_CONFIG = {
  COMPANY_NAME: "Retail AI",
  TAGLINE: "AI-Powered Fashion Retail Planning",

  EMAIL: "sales@techsols.net",
  PHONE: "0315 6589133",
  PHONE_HREF: "+923156589133",
  PHONE_SECONDARY: "0306 6073940",
  PHONE_SECONDARY_HREF: "+923066073940",

  /** Number WhatsApp messages are sent to — digits only, with country code, no + or spaces. */
  WHATSAPP_NUMBER: "923156589133",
  WHATSAPP_DEFAULT_MESSAGE: "Hi Retail AI, I'd like to see a demo of your retail planning software.",

  ADDRESS_LINE_1: "Office # 24, M2 Eden Tower",
  ADDRESS_LINE_2: "Main Gulberg, Lahore, Pakistan",
  BUSINESS_HOURS: "Monday – Saturday, 9:00 AM – 6:00 PM (PKT)",
  MAPS_URL: "https://www.google.com/maps/search/?api=1&query=Eden+Tower+Main+Gulberg+Lahore",
  MAPS_EMBED_URL: "https://maps.google.com/maps?q=Eden%20Tower%20Main%20Gulberg%20Lahore&z=15&output=embed",
} as const;

export const whatsappHref = `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(
  SITE_CONFIG.WHATSAPP_DEFAULT_MESSAGE,
)}`;
