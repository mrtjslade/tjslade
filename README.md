# tjslade.com

Portfolio site for TJ Slade. Two modes: a clean professional view, and a Star
Wars "space mode" with a hyperspace jump, a HUD navbar, and Aurebesh text you
can translate letter by letter.

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- Plain CSS per component, no UI library
- **Vercel** hosting, with the contact form as a Next.js route handler
  (`src/app/api/contact/route.ts`) that sends mail through the Resend API
- `next/font` for self-hosted Inter and Bebas Neue

## Notable pieces

- `src/context/ThemeContext.tsx`: mode switching. Entering space mode plays a
  canvas hyperspace jump (`Hyperspace.tsx`); leaving it reveals the
  professional page in a circle using the View Transitions API.
- `src/components/DecodeText`: renders text in Aurebesh and decodes it with a
  staggered per-letter animation.
- `src/components/Reveal`, `ScrollProgress`, and the sidebar nav use
  IntersectionObserver and scroll position for scroll-linked motion.
- The server always renders professional mode. A small inline script and a
  layout effect apply a saved space-mode choice before first paint.
- Every animation respects `prefers-reduced-motion`.

## Development

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`.

The contact form needs `RESEND_API_KEY`, and optionally `CONTACT_FROM` and
`CONTACT_TO`, set in the environment.
