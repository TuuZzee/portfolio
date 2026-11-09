import assert from 'node:assert/strict';
import test from 'node:test';

import { activeSection } from '../src/utils/activeSection.ts';

const position = { top: 76, line: 113, viewportHeight: 800, atPageEnd: false };

test('clears current navigation above About, regardless of an old Contact hash', () => {
  assert.equal(activeSection([{ id: 'about', top: 650, bottom: 1100 }], position), undefined);
});

test('selects the section at the reading line, not the most recently intersecting section', () => {
  const sections = [
    { id: 'about', top: -100, bottom: 400 },
    { id: 'work', top: 400, bottom: 1100 },
  ];

  assert.equal(activeSection(sections, position), 'about');
});

test('tracks long sections and exact boundaries', () => {
  assert.equal(
    activeSection([{ id: 'experience', top: -2000, bottom: 1000 }], position),
    'experience',
  );
  assert.equal(
    activeSection(
      [
        { id: 'work', top: -200, bottom: 113 },
        { id: 'experience', top: 113, bottom: 1000 },
      ],
      position,
    ),
    'experience',
  );
});

test('short sections remain current while they span the reading line', () => {
  assert.equal(activeSection([{ id: 'education', top: 100, bottom: 150 }], position), 'education');
});

test('fast scroll can skip intervening sections without stale state', () => {
  const sections = [
    { id: 'about', top: -2000, bottom: -1500 },
    { id: 'work', top: -1500, bottom: -800 },
    { id: 'experience', top: -800, bottom: 350 },
    { id: 'skills', top: 350, bottom: 900 },
  ];

  const scrolledAboveSections = sections.map((section) => ({
    ...section,
    top: section.top + 3000,
    bottom: section.bottom + 3000,
  }));

  assert.equal(activeSection(sections, position), 'experience');
  assert.equal(activeSection(scrolledAboveSections, position), undefined);
});

test('selects Contact at the page end even if it cannot reach the reading line', () => {
  const sections = [
    { id: 'education', top: -100, bottom: 200 },
    { id: 'contact', top: 200, bottom: 650 },
  ];

  assert.equal(activeSection(sections, position), 'education');
  assert.equal(activeSection(sections, { ...position, atPageEnd: true }), 'contact');
});

test('never marks sections that are outside the unobscured viewport', () => {
  const sections = [
    { id: 'about', top: -500, bottom: 50 },
    { id: 'contact', top: 900, bottom: 1200 },
  ];

  assert.equal(activeSection(sections, position), undefined);
  assert.equal(activeSection(sections, { ...position, atPageEnd: true }), undefined);
});

test('uses the resized mobile reading position rather than desktop header geometry', () => {
  const sections = [
    { id: 'about', top: -300, bottom: 80 },
    { id: 'work', top: 80, bottom: 1000 },
  ];

  assert.equal(activeSection(sections, position), 'work');
  assert.equal(
    activeSection(sections, { top: 0, line: 25, viewportHeight: 667, atPageEnd: false }),
    'about',
  );
});
