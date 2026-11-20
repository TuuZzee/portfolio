import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { readSiteConfig } from './config/site.mjs';
import { locales } from './src/content/schema.ts';

export default defineConfig({
  output: 'static',
  ...readSiteConfig(),
  trailingSlash: 'always',
  i18n: {
    locales: [...locales],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
