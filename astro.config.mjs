import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { readSiteConfig } from './config/site.mjs';

export default defineConfig({
  output: 'static',
  ...readSiteConfig(),
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
