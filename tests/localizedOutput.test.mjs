import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import test from 'node:test';

import { education, experience, independentProjects, publicLinks } from '../src/content/facts.ts';
import { getContent } from '../src/content/index.ts';
import { languageNames, locales } from '../src/content/schema.ts';
import { sectionIds } from '../src/data/sections.ts';
import { formatDate } from '../src/utils/formatDate.ts';

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]),
  );
}

const decode = (text) =>
  text.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');

function parsePage(html) {
  return [...html.matchAll(/<(html|meta|link|a|img|details)\b[^>]*>/g)].map(([tag, name]) => ({
    name,
    attrs: attributes(tag),
    raw: tag,
  }));
}

function localeRoute(base, locale) {
  return base + (locale === 'en' ? '' : `${locale}/`);
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

function assertLanguageLinks(html, tags, locale, origin, base) {
  for (const target of locales) {
    const path = localeRoute(base, target);
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
    assert.equal(link.attrs.lang, target);
    assert.ok(html.includes(`>${languageNames[target]}</a>`));
    assert.equal(link.attrs['aria-current'], target === locale ? 'page' : undefined);
  }
  for (const id of sectionIds) {
    assert.ok(html.includes(`id="${id}"`));
  }
}

function assertAssetsAndDisclosures(tags, content, output, base) {
  for (const { name, attrs, raw } of tags) {
    if (name === 'details' && attrs.name === 'experience-details') {
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
  assert.equal(
    tags.filter(({ name, attrs }) => name === 'details' && attrs.name === 'experience-details')
      .length,
    4,
  );
}

function assertLocalizedDates(html, locale) {
  const periods = [...experience.flatMap(({ roles }) => roles), ...education];
  const dates = periods.flatMap(({ start, end }) => (end ? [start, end] : [start]));
  const rendered = [...html.matchAll(/<time datetime="([^"]+)">([^<]+)<\/time>/g)];
  assert.deepEqual(
    rendered.map(([, datetime, text]) => [datetime, text]),
    dates.map((date) => [date, formatDate(date, locale)]),
  );
}

function assertLocalizedProse(html, content) {
  for (const text of [
    content.hero.discipline,
    content.hero.heading,
    content.hero.introduction,
    content.hero.action,
    ...Object.values(content.sections).flatMap(({ title, navigationLabel }) => [
      title,
      navigationLabel,
    ]),
    ...content.about,
    content.contact,
    ...Object.values(content.roleTitles),
    ...Object.values(content.experienceCopy).flatMap(({ summary, details }) => [
      summary,
      ...(details ?? []),
    ]),
    ...content.skillGroups.flatMap(({ title, items, note }) => [
      title,
      ...items,
      ...(note ? [note] : []),
    ]),
    ...Object.values(content.educationCopy).map(({ title }) => title),
    ...Object.values(content.locationLabels),
    content.experienceDetails.show,
    content.experienceDetails.hide,
    content.earlierExperienceLabel,
    ...Object.values(content.ui.themeLabels),
    content.ui.skipLink,
    content.ui.backToTop,
    content.ui.sourceCode,
  ]) {
    assert.ok(text.trim() && decode(html).includes(text), text);
  }
}

function assertPrivacy(html, tags) {
  assert.doesNotMatch(html, /mailto:|tel:|\.pdf|<form\b|[\w.+-]+@[\w-]+(?:\.[\w-]+)+/i);
  const approvedLinks = new Set([
    ...Object.values(publicLinks),
    ...independentProjects.map(({ repositoryUrl }) => repositoryUrl),
  ]);
  for (const { name, attrs } of tags) {
    if (name === 'a' && !attrs.href.startsWith('#') && !attrs.href.startsWith('/')) {
      assert.ok(approvedLinks.has(attrs.href), attrs.href);
    }
  }
}

function assertIndependentProjects(html, content) {
  const { title, sourceLink, projects } = content.independentProjects;
  const [{ id, repositoryUrl }] = independentProjects;
  const subsection = html.match(
    /<section aria-labelledby="independent-projects-heading"[^>]*>(.*?)<\/section>/s,
  );
  assert.ok(subsection);
  const [, markup] = subsection;

  assert.deepEqual(
    [...markup.matchAll(/<(h[34])\b[^>]*>(.*?)<\/\1>/gs)].map(([, tag, text]) => [
      tag,
      decode(text.trim()),
    ]),
    [
      ['h3', title],
      ['h4', projects[id].title],
    ],
  );
  assert.equal([...markup.matchAll(/<li\b/g)].length, 1);
  assert.ok(decode(markup).includes(projects[id].context));
  assert.ok(decode(markup).includes(projects[id].summary));

  const links = [...markup.matchAll(/<a\b([^>]*)>(.*?)<\/a>/gs)];
  assert.equal(links.length, 1);
  const [, linkAttributes, linkText] = links[0];
  assert.equal(attributes(linkAttributes).href, repositoryUrl);
  assert.equal(decode(linkText.trim()), sourceLink);
}

const scenarios = [
  { name: 'Pages project', origin: 'https://tuuzzee.github.io', base: '/portfolio/' },
  { name: 'Pages root', origin: 'https://tuuzzee.github.io', base: '/' },
  { name: 'custom origin and root', origin: 'https://example.com', base: '/' },
];

for (const scenario of scenarios) {
  test(`production locales and metadata work with ${scenario.name}`, () => {
    withProductionBuild(scenario, (output) => {
      assert.ok(!readdirSync(output).includes('en'));

      for (const locale of locales) {
        const content = getContent(locale);
        const route = localeRoute(scenario.base, locale);
        const html = readFileSync(
          join(output, locale === 'en' ? 'index.html' : `${locale}/index.html`),
          'utf8',
        );
        const tags = parsePage(html);

        assertMetadata(html, tags, content, locale, scenario.origin, route);
        assertLanguageLinks(html, tags, locale, scenario.origin, scenario.base);
        assertAssetsAndDisclosures(tags, content, output, scenario.base);
        assertLocalizedDates(html, locale);
        assertLocalizedProse(html, content);
        assertPrivacy(html, tags);
        assertIndependentProjects(html, content);
      }
    });
  });
}
