import assert from 'node:assert/strict';
import test from 'node:test';

import { education, experience, technologies } from '../src/content/facts.ts';
import { getContent } from '../src/content/index.ts';
import { sectionIds } from '../src/data/sections.ts';
import { formatDate } from '../src/utils/formatDate.ts';
import { languageHash } from '../src/utils/languageHash.ts';

const english = getContent('en');
const french = getContent('fr');

test('both locales cover every section, role, employer and education entry', () => {
  for (const content of [english, french]) {
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
    for (const label of Object.values(content.ui.themeLabels)) {
      assert.ok(label.length > 0);
    }
  }
});

test('translation preserves story, skill and experience-detail coverage', () => {
  assert.deepEqual(
    french.selectedWork.map(({ id, employerId }) => [id, employerId]),
    english.selectedWork.map(({ id, employerId }) => [id, employerId]),
  );
  assert.deepEqual(
    french.skillGroups.map(({ id, items }) => [id, items.length]),
    english.skillGroups.map(({ id, items }) => [id, items.length]),
  );

  for (const { id } of experience) {
    assert.equal(
      french.experienceCopy[id].details?.length,
      english.experienceCopy[id].details?.length,
    );
  }

  for (const name of Object.values(technologies)) {
    assert.ok(english.skillGroups.some(({ items }) => items.includes(name)));
    assert.ok(french.skillGroups.some(({ items }) => items.includes(name)));
  }
});

test('French content localizes controls and prose without forbidden punctuation', () => {
  assert.equal(french.metadata.ogLocale, 'fr_FR');
  assert.equal(french.locationLabels['Seoul, South Korea'], 'Séoul, Corée du Sud');
  for (const key of [
    'skipLink',
    'mainNavigation',
    'themeGroup',
    'backToTop',
    'portraitAlt',
    'languageNavigation',
  ]) {
    assert.notEqual(french.ui[key], english.ui[key]);
  }
  for (const content of [english, french]) {
    assert.ok(!/[—;]/.test(JSON.stringify(content)));
  }
});

test('dates localize month names without changing year-only precision', () => {
  assert.equal(formatDate('2024-11', 'fr'), 'novembre 2024');
  assert.equal(formatDate('2023-05', 'fr'), 'mai 2023');
  assert.equal(formatDate('2011', 'fr'), '2011');
  assert.equal(formatDate('2024-11', 'en'), 'November 2024');
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
