import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import test from 'node:test';

import { getContent } from '../src/content/index.ts';
import { sectionIds } from '../src/data/sections.ts';

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]),
  );
}

const decode = (text) =>
  text.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');

function parsePage(html) {
  return [...html.matchAll(/<(html|meta|link|a|img|details|time)\b[^>]*>/g)].map(([tag, name]) => ({
    name,
    attrs: attributes(tag),
    raw: tag,
  }));
}

function localeRoute(base, locale) {
  return base + (locale === 'fr' ? 'fr/' : '');
}

function withProductionBuild({ base, origin }, verify) {
  const output = mkdtempSync(join(tmpdir(), 'portfolio-i18n-'));

  try {
    execFileSync('pnpm', ['exec', 'astro', 'build', '--outDir', output], {
      env: {
        ...process.env,
        GITHUB_REPOSITORY: 'TuuZzee/portfolio',
        SITE_URL: origin === 'https://tuuzzee.github.io' ? '' : origin,
        BASE_PATH: base,
        ASTRO_TELEMETRY_DISABLED: '1',
      },
      stdio: 'pipe',
    });
    verify(output);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
}

function assertMetadata(html, tags, content, locale, origin, route) {
  const metas = tags.filter(({ name }) => name === 'meta').map(({ attrs }) => attrs);
  const meta = (name) => metas.filter((attrs) => attrs.name === name || attrs.property === name);
  for (const name of [
    'description',
    'og:title',
    'og:description',
    'og:locale',
    'og:url',
    'twitter:card',
    'twitter:title',
    'twitter:description',
  ]) {
    assert.equal(meta(name).length, 1, name);
  }

  assert.ok(html.startsWith(`<!DOCTYPE html><html lang="${locale}"`));
  assert.equal(decode(/<title>(.*?)<\/title>/.exec(html)[1]), content.metadata.title);
  assert.equal(meta('og:locale')[0].content, content.metadata.ogLocale);
  for (const key of ['og:title', 'twitter:title']) {
    assert.equal(decode(meta(key)[0].content), content.metadata.title);
  }
  for (const key of ['og:description', 'twitter:description']) {
    assert.equal(decode(meta(key)[0].content), content.metadata.description);
  }

  assert.equal(decode(meta('description')[0].content), content.metadata.description);
  assert.equal(meta('og:url')[0].content, origin + route);
  assert.equal(meta('twitter:card')[0].content, 'summary');
  assert.equal(meta('og:image').length, 0);

  const canonicals = tags.filter(({ attrs }) => attrs.rel === 'canonical');
  assert.equal(canonicals.length, 1);
  assert.equal(canonicals[0].attrs.href, origin + route);
}

function assertLanguageLinks(html, tags, content, locale, origin, base) {
  for (const target of ['en', 'fr']) {
    const path = base + (target === 'fr' ? 'fr/' : '');
    const alternate = tags.filter(
      ({ attrs }) => attrs.rel === 'alternate' && attrs.hreflang === target,
    );
    assert.equal(alternate.length, 1);
    assert.equal(alternate[0].attrs.href, origin + path);

    const link = tags.find(
      ({ name, attrs, raw }) =>
        name === 'a' && raw.includes('data-language-link') && attrs.hreflang === target,
    );
    assert.equal(link.attrs.href, path);
    assert.equal(decode(link.attrs['aria-label']), content.ui.languageLabels[target]);
    assert.equal(link.attrs['aria-current'], target === locale ? 'page' : undefined);
  }
  for (const id of sectionIds) {
    assert.ok(html.includes(`id="${id}"`));
  }
}

function assertAssetsAndDisclosures(tags, content, output, base) {
  for (const { name, attrs, raw } of tags) {
    if (name === 'details') {
      assert.ok(!('open' in attrs) && !/\sopen(?:\s|>)/.test(raw));
    }
    if (name === 'img') {
      assert.equal(attrs.alt, content.ui.portraitAlt);
    }

    const resources = [];
    if (name === 'img' || (name === 'link' && !['canonical', 'alternate'].includes(attrs.rel))) {
      resources.push(attrs.src ?? attrs.href);
    }
    if (attrs.srcset) {
      resources.push(...attrs.srcset.split(',').map((part) => part.trim().split(' ')[0]));
    }

    for (const resource of resources) {
      assert.ok(resource.startsWith(base), resource);
      assert.ok(readFileSync(join(output, resource.slice(base.length))).length > 0, resource);
    }
  }
  assert.equal(tags.filter(({ name }) => name === 'details').length, 4);
  assert.equal(tags.filter(({ name }) => name === 'time').length, 18);
}

function assertLocalizedProseAndPrivacy(html, content, locale) {
  if (locale === 'fr') {
    for (const label of [
      'Aller au contenu',
      'Retour en haut',
      'Choix du thème',
      'Voir les détails',
      'novembre 2024',
      'Séoul, Corée du Sud',
    ]) {
      assert.ok(html.includes(label), label);
    }

    for (const label of [
      'Skip to content',
      'Back to top',
      'Use dark theme',
      'View details',
      'Earlier experience',
    ]) {
      assert.ok(!html.includes(label), label);
    }

    for (const label of Object.values(content.ui.themeLabels)) {
      assert.ok(html.includes(`aria-label="${label}"`));
    }
  }
  assert.ok(!/mailto:|\.pdf|\/ko\//.test(html));
}

const scenarios = [
  { name: 'Pages project', origin: 'https://tuuzzee.github.io', base: '/portfolio/' },
  { name: 'Pages root', origin: 'https://tuuzzee.github.io', base: '/' },
  { name: 'custom origin and root', origin: 'https://example.com', base: '/' },
];

for (const scenario of scenarios) {
  test(`production locales and metadata work with ${scenario.name}`, () => {
    withProductionBuild(scenario, (output) => {
      assert.ok(!readdirSync(output).some((name) => ['en', 'ko'].includes(name)));

      for (const locale of ['en', 'fr']) {
        const content = getContent(locale);
        const route = localeRoute(scenario.base, locale);
        const html = readFileSync(
          join(output, locale === 'fr' ? 'fr/index.html' : 'index.html'),
          'utf8',
        );
        const tags = parsePage(html);

        assertMetadata(html, tags, content, locale, scenario.origin, route);
        assertLanguageLinks(html, tags, content, locale, scenario.origin, scenario.base);
        assertAssetsAndDisclosures(tags, content, output, scenario.base);
        assertLocalizedProseAndPrivacy(html, content, locale);
      }
    });
  });
}
