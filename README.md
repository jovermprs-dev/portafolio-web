# Portfolio — Sergio Jover Penalva

Personal portfolio site built with [Astro](https://astro.build). Bilingual (English/Spanish, client-side toggle, no page reload), mostly static output (the page is prerendered), deployed on Vercel with one serverless API route for the contact form.

See [ROADMAP.md](./ROADMAP.md) for the full project plan (domain, deployment, and the future project portal on a VPS).

## Project structure

```text
/
├── public/
│   ├── cv-en.pdf          # Downloadable CV (English)
│   ├── cv-es.pdf          # Downloadable CV (Spanish)
│   └── robots.txt
├── src/
│   ├── components/        # One component per page section
│   ├── i18n/content.ts    # All page copy, in English and Spanish
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro  # Renders both language versions; CSS + a
│   │                       # tiny inline script toggle which one is visible
│   └── pages/api/contact.ts  # Serverless endpoint, sends form submissions via Resend
└── astro.config.mjs
```

### Contact form

`src/pages/api/contact.ts` validates the submission (including a honeypot
field) and sends it through [Resend](https://resend.com). It needs a
`RESEND_API_KEY` environment variable:

- Locally: copy `.env.example` to `.env` and fill in the key.
- On Vercel: `Project Settings → Environment Variables` (or `vercel env add
  RESEND_API_KEY`), for both Production and Preview.

Without the key, submissions fail with a clear error message instead of the
build breaking.

### How the language toggle works

Both language versions of the page are rendered at build time inside a
`[data-lang-section="en"|"es"]` wrapper. `src/styles/global.css` hides the
inactive one via `display: none` (which also excludes it from the
accessibility tree), and a small inline script swaps `html[data-lang]` on
click, persisting the choice to `localStorage`. A blocking script in
`<head>` re-applies the stored preference before first paint to avoid a
flash of the wrong language.

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start the local dev server at `localhost:4321` |
| `npm run build`     | Build the production site to `./dist/`       |
| `npm run preview`   | Preview the production build locally         |
| `npx astro check`   | Type-check `.astro` files                    |
