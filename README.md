# Retail AI — Website

Marketing website for **Retail AI**, AI-powered planning software for fashion retailers
(financial, merchandise, assortment, open-to-buy, markdown planning and demand forecasting).

Built with React 19, Vite, Tailwind CSS v4 and React Router. Deployed on Vercel, with a
serverless contact-form endpoint in `api/contact.ts`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run lint
```

## Editing content

- **Company & contact details:** `src/config/site.ts`
- **Modules and their features:** `src/data/modules.ts`
- **Homepage sections, FAQ, comparison table:** `src/pages/Home.tsx`

## Contact form

`api/contact.ts` sends enquiries by email through Hostinger SMTP. Set these environment
variables in Vercel:

| Variable | Purpose |
| --- | --- |
| `SMTP_USER` | Mailbox used to send (e.g. `sales@yourdomain.com`) |
| `SMTP_PASSWORD` | Password for that mailbox |
| `CONTACT_NOTIFY_EMAIL` | Optional — where enquiries are delivered (defaults to `SMTP_USER`) |

## Usability & accessibility

The UI follows common HCI guidelines: visible system status (active nav section, loading and
success states), inline form validation with plain-language error messages, keyboard support
(skip link, focus rings, WAI-ARIA tabs with arrow keys), 44px+ touch targets, a sticky mobile
action bar, WCAG AA colour contrast and `prefers-reduced-motion` support.
