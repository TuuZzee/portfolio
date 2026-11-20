import assert from 'node:assert/strict';
import test from 'node:test';

import {
  education,
  experience,
  independentProjects,
  publicLinks,
  technologies,
} from '../src/content/facts.ts';
import { getContent } from '../src/content/index.ts';
import { locales } from '../src/content/schema.ts';
import { sectionIds } from '../src/data/sections.ts';
import { formatDate } from '../src/utils/formatDate.ts';
import { languageHash } from '../src/utils/languageHash.ts';

const english = getContent('en');
const french = getContent('fr');
const korean = getContent('ko');
const contents = locales.map(getContent);

test('all locales cover every section, role, employer and education entry', () => {
  for (const content of contents) {
    assert.deepEqual(Object.keys(content.sections), [...sectionIds]);
    assert.deepEqual(
      Object.keys(content.experienceCopy),
      experience.map(({ id }) => id),
    );
    assert.deepEqual(
      Object.keys(content.roleTitles),
      experience.flatMap(({ roles }) => roles.map(({ id }) => id)),
    );
    assert.deepEqual(
      Object.keys(content.educationCopy),
      education.map(({ id }) => id),
    );
    assert.deepEqual(
      Object.keys(content.independentProjects.projects),
      independentProjects.map(({ id }) => id),
    );
    for (const label of Object.values(content.ui.themeLabels)) {
      assert.ok(label.length > 0);
    }
  }
});

test('translation preserves story, skill and experience-detail coverage', () => {
  for (const content of contents) {
    assert.equal(content.about.length, english.about.length);
    assert.deepEqual(
      content.selectedWork.map(({ id, employerId }) => [id, employerId]),
      english.selectedWork.map(({ id, employerId }) => [id, employerId]),
    );
    assert.deepEqual(
      content.skillGroups.map(({ id, items, note }) => [id, items.length, Boolean(note)]),
      english.skillGroups.map(({ id, items, note }) => [id, items.length, Boolean(note)]),
    );
    for (const { id } of experience) {
      assert.equal(
        content.experienceCopy[id].details?.length,
        english.experienceCopy[id].details?.length,
      );
    }
    for (const name of Object.values(technologies)) {
      assert.ok(content.skillGroups.some(({ items }) => items.includes(name)));
    }
  }
});

test('English and French retain the approved copy for the single independent project', () => {
  assert.deepEqual(independentProjects, [
    {
      id: 'clinicalTrialsExplorer',
      repositoryUrl: 'https://github.com/TuuZzee/clinical-trials-explorer',
    },
  ]);
  assert.deepEqual(english.independentProjects, {
    title: 'Independent projects',
    sourceLink: 'View source',
    projects: {
      clinicalTrialsExplorer: {
        title: 'Clinical Trials Explorer',
        context: 'Applied AI · Data visualization',
        summary:
          'An experimental full-stack application for exploring clinical trial data through natural-language questions and interactive charts. Combines AI-assisted query interpretation with deterministic data aggregation and optional source citations.',
      },
    },
  });
  assert.deepEqual(french.independentProjects, {
    title: 'Projets personnels',
    sourceLink: 'Voir le code',
    projects: {
      clinicalTrialsExplorer: {
        title: 'Clinical Trials Explorer',
        context: 'IA appliquée · Visualisation de données',
        summary:
          'Une application expérimentale full-stack permettant d’explorer les données des essais cliniques à travers des questions en langage naturel et des graphiques interactifs. Elle combine l’interprétation des questions par l’IA, l’agrégation déterministe des données et des références aux sources.',
      },
    },
  });
});

test('French and Korean localize controls and use approved punctuation', () => {
  assert.equal(french.metadata.ogLocale, 'fr_FR');
  assert.equal(french.locationLabels['Seoul, South Korea'], 'Séoul, Corée du Sud');
  assert.equal(korean.metadata.ogLocale, 'ko_KR');
  assert.equal(korean.locationLabels['Seoul, South Korea'], '대한민국 서울');
  for (const key of [
    'skipLink',
    'mainNavigation',
    'themeGroup',
    'backToTop',
    'sourceCode',
    'portraitAlt',
    'languageNavigation',
  ]) {
    assert.equal(new Set(contents.map(({ ui }) => ui[key])).size, locales.length);
  }
  for (const content of contents) {
    assert.ok(!/[—;]/.test(JSON.stringify(content)));
  }
});

test('dates localize month names without changing year-only precision', () => {
  assert.equal(formatDate('2024-11', 'fr'), 'novembre 2024');
  assert.equal(formatDate('2023-05', 'fr'), 'mai 2023');
  assert.equal(formatDate('2011', 'fr'), '2011');
  assert.equal(formatDate('2024-11', 'en'), 'November 2024');
  assert.equal(formatDate('2024-11', 'ko'), '2024년 11월');
  assert.equal(formatDate('2011', 'ko'), '2011년');
  assert.equal(korean.dateSeparator, '–');
  assert.equal(french.dateSeparator, 'à');
  assert.equal(english.dateSeparator, 'to');
});

test('language switching retains only shared section hashes', () => {
  for (const id of sectionIds) {
    assert.equal(languageHash('#' + id), '#' + id);
  }

  for (const hash of ['', '#missing', '#fr', 'experience', '#experience?bad']) {
    assert.equal(languageHash(hash), '');
  }
});

test('source-code labels are translated without changing the Contact profile link', () => {
  assert.equal(english.ui.sourceCode, 'Source code');
  assert.equal(french.ui.sourceCode, 'Code source');
  assert.equal(publicLinks.source, 'https://github.com/TuuZzee/portfolio');
  assert.equal(publicLinks.github, 'https://github.com/TuuZzee');
});
