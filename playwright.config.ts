import process from 'node:process';
import { defineConfig } from '@playwright/test';

import { readSiteConfig } from './config/site.mjs';

// Preview stays on loopback even when production metadata targets a custom origin.
const { base } = readSiteConfig();
const basePath = base === '/' ? '/' : `${base}/`;
const previewURL = `http://127.0.0.1:4173${basePath}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  reporter: 'list',
  outputDir: 'test-results',
  use: {
    baseURL: previewURL,
    browserName: 'chromium',
    colorScheme: 'light',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
    {
      name: 'mobile',
      use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
    },
  ],
  // Build once before this suite. Ignore Astro's agent/background lock so Playwright owns shutdown.
  webServer: {
    command: 'pnpm run preview --host 127.0.0.1 --port 4173 --ignore-lock',
    url: previewURL,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
