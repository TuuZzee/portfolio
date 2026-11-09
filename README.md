# Personal Portfolio

A static English/French portfolio built with Astro, strict TypeScript and Tailwind CSS 4, with responsive navigation, light/dark themes and expandable experience details.

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

[PR checks](.github/workflows/checks-pr-draft-main.yml) run for non-draft pull requests targeting `main`. [Pages deployment](.github/workflows/deploy.yml) runs manually from **Actions → Deploy to GitHub Pages**, using `main`, after repeating all checks. Pushes trigger neither workflow.

Before publishing, select **GitHub Actions** in **Settings → Pages** and allow the `github-pages` environment to deploy from `main`. Leave deployment untriggered until publication is approved.

Initial hosting uses `https://tuuzzee.github.io/portfolio/`, with French at `/portfolio/fr/`. No custom domain or DNS configuration is needed. Leave `SITE_URL` and `BASE_PATH` unset locally and in repository Actions variables for the initial deployment.

Site URLs default to the repository identity from `GITHUB_REPOSITORY` or Git `origin`. Optional build-time overrides remain available for a future custom domain:

```sh
SITE_URL=https://example.com BASE_PATH=/ pnpm run validate
SITE_URL=https://example.com BASE_PATH=/ pnpm run preview
```

`SITE_URL` accepts an HTTP(S) origin without credentials, path, query or fragment. `BASE_PATH` starts with `/` and normalizes trailing slashes. Blank values retain the defaults. Use the same settings for build, preview and browser tests.

The deployment workflow reads optional overrides from repository Actions variables. For a future domain change, set them before building so canonical and alternate URLs match the new origin.

## Privacy and attribution

Treat source and built assets as public. Keep private documents and personal contact details out of the repository. Resume downloads are intentionally omitted. Existing Git commit identity metadata is accepted without rewriting history.

The development-only `minimatch@10.2.6` denial-of-service advisory ([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)) is temporarily accepted for launch. It affects linting dependencies, with no identified visitor-facing runtime exposure. Keep the advisory visible and revisit when a compatible upstream fix is available.

Source code uses the [MIT license](LICENSE). Original biographical content, career descriptions and the personal portrait are excluded from that grant. [Tabler's separate license](public/tabler-icons-LICENSE.txt) remains in effect for its icons.
