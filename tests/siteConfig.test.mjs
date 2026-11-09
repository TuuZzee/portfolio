import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveSiteConfig } from '../config/site.mjs';

const repository = 'TuuZzee/portfolio';

test('site defaults preserve repository-based Pages URLs, including forks and user sites', () => {
  assert.deepEqual(resolveSiteConfig({ repository }), {
    site: 'https://tuuzzee.github.io',
    base: '/portfolio',
  });
  assert.deepEqual(resolveSiteConfig({ repository: 'AnotherOwner/project' }), {
    site: 'https://anotherowner.github.io',
    base: '/project',
  });
  assert.deepEqual(resolveSiteConfig({ repository: 'AnotherOwner/AnotherOwner.github.io' }), {
    site: 'https://anotherowner.github.io',
    base: '/',
  });
  assert.deepEqual(resolveSiteConfig(), { site: undefined, base: '/' });
});

test('explicit origin and base are normalized independently', () => {
  assert.deepEqual(
    resolveSiteConfig({ repository, siteUrl: ' https://Example.com/ ', basePath: '/' }),
    {
      site: 'https://example.com',
      base: '/',
    },
  );
  assert.equal(
    resolveSiteConfig({ siteUrl: 'http://localhost:4321/' }).site,
    'http://localhost:4321',
  );
  assert.equal(resolveSiteConfig({ repository, basePath: '/portfolio///' }).base, '/portfolio');
  assert.equal(
    resolveSiteConfig({ repository, siteUrl: 'https://example.com' }).base,
    '/portfolio',
  );
});

test('empty Actions variables retain repository-derived defaults', () => {
  assert.deepEqual(
    resolveSiteConfig({ repository, siteUrl: ' ', basePath: '' }),
    resolveSiteConfig({ repository }),
  );
});

test('site overrides reject non-origins and unsupported schemes', () => {
  for (const siteUrl of [
    'example.com',
    'https:example.com',
    'ftp://example.com',
    'https://',
    'https://user:password@example.com',
    'https://example.com/page',
    'https://example.com?query=1',
    'https://example.com#section',
    'https://example.com?',
    'https:///example.com',
    'https://example.com/path/..',
    'https://example.com\\',
  ]) {
    assert.throws(() => resolveSiteConfig({ repository, siteUrl }), /SITE_URL/);
  }
});

test('base overrides reject ambiguous, unsafe or non-path input', () => {
  for (const basePath of [
    'portfolio',
    '//example.com',
    '/../portfolio',
    '/a/./b',
    '/with space',
    '/a?query=1',
    '/a#hash',
    '/a\\b',
    '/%2e%2e',
  ]) {
    assert.throws(() => resolveSiteConfig({ repository, basePath }), /BASE_PATH/);
  }
});
