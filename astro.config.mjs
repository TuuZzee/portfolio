import { execFileSync } from 'node:child_process';
import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// GitHub supplies the authoritative repository identity in CI, including forks.
let repository = process.env.GITHUB_REPOSITORY;
if (!repository) {
  try {
    const remote = execFileSync('git', ['remote', 'get-url', 'origin'], {
      encoding: 'utf8',
    }).trim();
    repository = /github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?\/?$/.exec(remote)?.[1];
  } catch {
    // A source archive without Git metadata can still build at the local root.
  }
}

const [owner, name] = repository?.split('/') ?? [];
const site = owner ? `https://${owner}.github.io` : undefined;
const base = name && name.toLowerCase() !== `${owner}.github.io`.toLowerCase() ? `/${name}` : '/';

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
