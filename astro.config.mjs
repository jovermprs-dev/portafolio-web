// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const SITE_URL = 'https://sergiojover.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  // 'server' output + prerender on the page (see src/pages/index.astro) keeps
  // the page itself fully static while allowing src/pages/api/contact.ts to
  // run as a Vercel serverless function.
  output: 'server',
  adapter: vercel(),
});
