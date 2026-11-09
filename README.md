# Personal Portfolio

A static English/French portfolio built with Astro, strict TypeScript and Tailwind CSS 4, with responsive navigation, light/dark themes and expandable experience details.

[Live website: English](https://tuuzzee.github.io/portfolio/) · [Site en français](https://tuuzzee.github.io/portfolio/fr/)

## Development

Use the Node and pnpm versions pinned in `.node-version` and `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Dependencies must have been published at least 72 hours ago. Installation fails for younger releases or missing publication timestamps, with no package exceptions.

Open `/portfolio/` for English or `/portfolio/fr/` for French at the printed local URL.

```sh
pnpm run build
pnpm run preview
```

## Quality checks

Install Chromium once, then run all checks:

```sh
pnpm exec playwright install chromium
pnpm run validate
```

`validate` runs formatting, linting, Astro/TypeScript checks, Node tests, the production build and Playwright smoke tests. Browser tests cover both languages on desktop/mobile Chromium.

Use `pnpm run format` to apply formatting. Individual checks are available in `package.json`. To run only browser tests, build first, then run `pnpm run test:e2e`.

## Structure

- `src/pages/`, `src/layouts/`, `src/components/`: routes and shared UI.
- `src/content/`: shared facts, typed contracts and English/French copy.
- `src/data/sections.ts`: shared navigation anchors.
- `src/styles/`, `src/scripts/`, `src/utils/`: styling and interaction logic.
- `src/assets/`, `public/`: portrait, favicons and static assets.
- `config/site.mjs`: site URL and base-path configuration.
- `tests/`, `e2e/`: Node regression tests and production browser tests.

## Deployment

The public site is live on GitHub Pages. [PR checks](.github/workflows/checks-pr-draft-main.yml) run for non-draft PRs targeting `main`. [Deployment](.github/workflows/deploy.yml) runs manually from **Actions → Deploy to GitHub Pages**, using `main`, after all checks pass. Deployment and repository/Pages settings changes require owner approval.

Leave `SITE_URL` and `BASE_PATH` unset for the current Pages URLs. No custom domain or DNS setup is needed. Future custom domains can use these build-time settings locally or as repository Actions variables:

```sh
SITE_URL=https://example.com BASE_PATH=/ pnpm run validate
```

Use the same settings for build, preview and browser tests so generated metadata matches the site URL.

## Dependency maintenance

- [Dependabot](.github/dependabot.yml): monthly version checks at 09:00 Asia/Seoul, grouped by ecosystem, with at most two open version PRs each. Security updates use separate alert-driven groups.
- [Security audit](.github/workflows/dependency-audit.yml): monthly on day 1 at 09:00 KST (00:00 UTC), or manually. Production advisories, high/critical findings and installation/audit errors fail the run. Lower-severity development findings remain visible.
- Updates require manual review and passing CI. Automerge is not configured.

The development-only [minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) remains temporarily accepted pending a compatible upstream fix.

## Privacy and attribution

Keep private documents and personal contact details out of source and built assets. Resume downloads are intentionally omitted. Existing Git identity metadata is accepted without rewriting history.

Source code uses [MIT](LICENSE). [NOTICE.md](NOTICE.md) excludes original biographical content, career descriptions and the portrait. [Tabler's license](public/tabler-icons-LICENSE.txt) applies separately to its icons.
