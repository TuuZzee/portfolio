import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { URL } from 'node:url';

/** @param {string} value */
function normalizeOrigin(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('SITE_URL must be an absolute HTTP(S) origin.');
  }

  if (
    !/^https?:\/\/[^/?#\\\s]+\/?$/i.test(value) ||
    !['http:', 'https:'].includes(url.protocol) ||
    !url.hostname ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment.',
    );
  }
  return url.origin;
}

/** @param {string} value */
function normalizeBase(value) {
  const segments = value.split('/').filter(Boolean);
  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    segments.some((segment) => !/^[\w.~-]+$/.test(segment) || ['.', '..'].includes(segment))
  ) {
    throw new Error(
      'BASE_PATH must start with one slash and contain plain path segments, without query, fragment or traversal.',
    );
  }
  return segments.length ? `/${segments.join('/')}` : '/';
}

/** @param {{repository?: string, siteUrl?: string, basePath?: string}} options */
export function resolveSiteConfig({ repository, siteUrl, basePath } = {}) {
  const [owner, name] = repository?.split('/') ?? [];
  const defaultSite = owner ? normalizeOrigin(`https://${owner}.github.io`) : undefined;
  const defaultBase =
    name && name.toLowerCase() !== `${owner}.github.io`.toLowerCase() ? `/${name}` : '/';

  return {
    site: siteUrl?.trim() ? normalizeOrigin(siteUrl.trim()) : defaultSite,
    base: normalizeBase(basePath?.trim() || defaultBase),
  };
}

/** @param {NodeJS.ProcessEnv} env */
export function readSiteConfig(env = process.env) {
  // CI identifies the current repository, including forks. Source archives can use explicit overrides.
  let repository = env.GITHUB_REPOSITORY?.trim();
  if (!repository) {
    try {
      const remote = execFileSync('git', ['remote', 'get-url', 'origin'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      repository = /github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?\/?$/.exec(remote)?.[1];
    } catch {
      // A source archive without Git metadata still builds locally at the root.
    }
  }
  return resolveSiteConfig({ repository, siteUrl: env.SITE_URL, basePath: env.BASE_PATH });
}
