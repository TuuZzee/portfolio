import { expect, test as base } from '@playwright/test';

import { getContent } from '../src/content';
import { locales } from '../src/content/schema';
import { sectionIds } from '../src/data/sections';

// Keep every flow offline except for its loopback production preview.
const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push(message.text());
      }
    });
    page.on('requestfailed', (request) => errors.push(`Failed: ${request.url()}`));
    page.on('response', (response) => {
      if (response.status() >= 400) {
        errors.push(`HTTP ${response.status()}: ${response.url()}`);
      }
    });
    await page.route('**/*', async (route) => {
      if (new URL(route.request().url()).origin !== 'http://127.0.0.1:4173') {
        errors.push(`Unexpected external request: ${route.request().url()}`);
        await route.abort();
      } else {
        await route.continue();
      }
    });
    await use(page);
    expect(errors).toEqual([]);
  },
});

for (const locale of locales) {
  const content = getContent(locale);
  const path = locale === 'fr' ? 'fr/' : './';
  const target = locale === 'fr' ? 'en' : 'fr';

  test(`${locale}: production page, metadata, portrait and icons`, async ({ page, request }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page).toHaveTitle(content.metadata.title);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(content.hero.heading);
    const route = `/portfolio/${locale === 'fr' ? 'fr/' : ''}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://tuuzzee.github.io${route}`,
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      'content',
      content.metadata.ogLocale,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      content.metadata.description,
    );
    for (const language of locales) {
      await expect(page.locator(`link[hreflang="${language}"]`)).toHaveAttribute(
        'href',
        `https://tuuzzee.github.io/portfolio/${language === 'fr' ? 'fr/' : ''}`,
      );
    }
    const portrait = page.getByRole('img', { name: content.ui.portraitAlt });
    await expect(portrait).toBeVisible();
    expect(
      await portrait.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    ).toBe(true);
    const assets = await page
      .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    for (const asset of assets) {
      expect(asset).toBeTruthy();
      expect((await request.get(asset ?? '')).status()).toBe(200);
    }
    for (const absent of ['/portfolio/en/', '/portfolio/ko/', '/portfolio/resume.pdf']) {
      expect((await request.get(absent)).status()).toBe(404);
    }
  });

  test(`${locale}: active navigation follows reading position and clears a stale Contact hash`, async ({
    page,
  }) => {
    await page.goto(`${path}#contact`);
    const current = page.locator('.site-navigation [aria-current="location"]');
    await expect(current).toHaveAttribute('href', '#contact');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(current).toHaveCount(0);
    await expect(page).toHaveURL(/#contact$/);
    for (const id of sectionIds) {
      await page.locator(`#${id}`).evaluate((section) => section.scrollIntoView());
      await expect(current).toHaveCount(1);
      await expect(current).toHaveAttribute('href', `#${id}`);
    }
    const link = page.locator('.site-navigation a[href="#experience"]');
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(current).toHaveAttribute('href', '#experience');
    const heading = page.locator('#experience-heading');
    const unobscured = await heading.evaluate((element) => {
      const header = document.querySelector('header');
      const bottom =
        header && getComputedStyle(header).position === 'sticky'
          ? header.getBoundingClientRect().bottom
          : 0;
      return element.getBoundingClientRect().top >= bottom;
    });
    expect(unobscured).toBe(true);
  });

  test(`${locale}: keyboard language switch retains the shared section and theme`, async ({
    page,
  }) => {
    await page.goto(`${path}#experience`);
    await page.getByRole('button', { name: content.ui.themeLabels.dark, exact: true }).click();
    // Theme controls can scroll a non-sticky mobile header into view. Restore the reading section.
    await page.locator('#experience').evaluate((section) => section.scrollIntoView());
    await expect(page.locator('.site-navigation [aria-current="location"]')).toHaveAttribute(
      'href',
      '#experience',
    );
    const language = page.getByRole('link', {
      name: content.ui.languageLabels[target],
      exact: true,
    });
    await language.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(
      new RegExp(`/portfolio/${target === 'fr' ? 'fr/' : ''}#experience$`),
    );
    await expect(page.locator('html')).toHaveAttribute('lang', target);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test(`${locale}: accessible theme state, persistence and system preference`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(path);
    const system = page.getByRole('button', { name: content.ui.themeLabels.system, exact: true });
    const light = page.getByRole('button', { name: content.ui.themeLabels.light, exact: true });
    const dark = page.getByRole('button', { name: content.ui.themeLabels.dark, exact: true });
    await expect(system).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await light.focus();
    await page.keyboard.press('Space');
    await expect(light).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await dark.focus();
    await page.keyboard.press('Enter');
    await expect(dark).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await system.click();
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(system).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBeNull();
    await expect(page.locator('.theme-button[aria-pressed="true"]')).toHaveCount(1);
  });

  test(`${locale}: skip link and grouped disclosures work with the keyboard`, async ({ page }) => {
    await page.goto(path);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: content.ui.skipLink })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    const entries = page.locator('details');
    await expect(page.locator('details[open]')).toHaveCount(0);
    const first = entries.nth(0);
    await first.locator('summary').focus();
    await page.keyboard.press('Space');
    await expect(first).toHaveAttribute('open', '');
    await expect(first.getByText(content.experienceDetails.hide, { exact: true })).toBeVisible();
    const second = entries.nth(1);
    await second.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(second).toHaveAttribute('open', '');
    await expect(first).not.toHaveAttribute('open');
    await expect(page.locator('details[open]')).toHaveCount(1);
    expect(
      await second.locator('summary').evaluate((element) => getComputedStyle(element).outlineStyle),
    ).not.toBe('none');
  });

  test(`${locale}: expanded content fits responsive widths in both themes and honors reduced motion`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.locator('details summary').first().click();
    await expect(page.locator('details').first()).toHaveAttribute('open', '');
    for (const width of [320, 375, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const colorScheme of ['light', 'dark'] as const) {
        await page.emulateMedia({ colorScheme });
        await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        ).toBe(true);
      }
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect
      .poll(() =>
        page
          .locator('details')
          .first()
          .evaluate((element) => getComputedStyle(element, '::details-content').transitionDuration),
      )
      .toBe('0s');
  });
}

test.describe('native routing without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const locale of locales) {
    test(`${locale}: language links remain real routes and disclosures remain usable`, async ({
      page,
    }) => {
      const content = getContent(locale);
      const target = locale === 'fr' ? 'en' : 'fr';
      await page.goto(locale === 'fr' ? 'fr/' : './');
      await page.locator('details summary').first().click();
      await expect(page.locator('details').first()).toHaveAttribute('open', '');
      await page
        .getByRole('link', { name: content.ui.languageLabels[target], exact: true })
        .click();
      await expect(page.locator('html')).toHaveAttribute('lang', target);
      await expect(page.locator('.theme-control')).toBeHidden();
    });
  }
});
