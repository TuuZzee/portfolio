# Personal Portfolio

A static English/French portfolio built with Astro, strict TypeScript and Tailwind CSS 4, with responsive navigation, light/dark themes and expandable experience details.

## Development

Use the Node and pnpm versions pinned in `.node-version` and `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

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

Site URLs default to the GitHub repository identity from `GITHUB_REPOSITORY` or Git `origin`, currently `https://tuuzzee.github.io/portfolio/`. Optional build-time overrides support a future custom domain:

```sh
SITE_URL=https://example.com BASE_PATH=/ pnpm run validate
SITE_URL=https://example.com BASE_PATH=/ pnpm run preview
```

`SITE_URL` accepts an HTTP(S) origin without credentials, path, query or fragment. `BASE_PATH` starts with `/` and normalizes trailing slashes. Blank values retain the defaults. Use the same settings for build, preview and browser tests.

The deployment workflow reads these settings from repository Actions variables. Set them before building, since canonical and alternate URLs are generated then. Domain ownership, DNS, Pages settings and HTTPS require separate configuration. Actions publishing needs no tracked `CNAME` file.

## Privacy and attribution

Treat source and built assets as public. Keep private documents, personal contact details and unapproved resumes out of the repository. Review Git history, commit identities and dependency advisories before publication.

[Tabler's license](public/tabler-icons-LICENSE.txt) applies to its icons only. A repository-wide license remains an owner decision.
