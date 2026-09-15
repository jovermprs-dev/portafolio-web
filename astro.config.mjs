// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: update once the real domain is purchased (see ROADMAP.md, Phase 1.1)
const SITE_URL = 'https://sergiojoverpenalva.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
