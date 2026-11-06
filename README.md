# Personal Portfolio

A static English/French portfolio built with Astro, strict TypeScript and Tailwind CSS 4. Includes responsive navigation, persistent light/dark themes, an optimized portrait and expandable professional experience.

## Development

Use Node **24.22.1** and **pnpm 12.16.1**, pinned in `.node-version` and `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Open `/portfolio/` for English or `/portfolio/fr/` for French at the printed local URL. To build and preview production output:

```sh
pnpm run build
pnpm run preview
```

## Quality checks

```sh
pnpm run format:check
pnpm run lint
pnpm run check
pnpm run test
pnpm run build
pnpm run test:e2e
```

Use `pnpm run format` to apply Prettier. ESLint handles correctness and import sorting. Prettier handles formatting and Tailwind class ordering.

`pnpm run test` uses Node's built-in runner for navigation, translation parity and dates. It also builds both locales with project and root base paths to check production metadata, language links and assets. It does not replace browser accessibility or responsive testing.

Install Chromium once with `pnpm exec playwright install chromium`. `pnpm run test:e2e` reuses the production build and starts its own loopback Astro preview on port 4173. It checks both languages with desktop/mobile Chromium, keyboard controls, themes, anchors, assets and responsive widths. Tests block external requests. Browser reports, caches and output are ignored by Git, and screenshots, traces and videos are disabled by default.

`pnpm run validate` runs all local gates, including the build and browser suite. Safari, Firefox, real-device testing and a full accessibility audit remain separate review tasks.

## Project structure

- `src/pages/`: small English and French route entry points using the shared `PortfolioPage.astro` component.
- `src/layouts/`, `src/components/`: shared composition, metadata and UI.
- `src/content/facts.ts`: shared dates, employers, locations and public URLs.
- `src/content/locales/en.ts`, `fr.ts`: localized copy and controls, with common contracts in `src/content/schema.ts` and lookup in `src/content/index.ts`.
- `src/data/sections.ts`: stable section anchors and navigation.
- `src/styles/global.css`: semantic tokens, responsive layout and interaction styles.
- `src/scripts/activeNavigation.ts`: IntersectionObserver-based navigation tracking.
- `src/assets/`, `public/`: optimized portrait source and supplied favicons.
- `tests/`, `e2e/`: Node regression tests and production Playwright smoke tests.

Keep factual records separate from prose. Prefer static HTML and typed component props. Experience disclosures use native HTML, with subtle transitions in supporting browsers and no motion when reduced motion is preferred. Theme icons select System, Light or Dark, with CSS system fallback when JavaScript is disabled. Tabler SVG attribution is retained in `public/tabler-icons-LICENSE.txt`.

Navigation marks the section at the reading position with `aria-current="location"`, clears the indicator over the hero and selects Contact at the page end. Scrolling does not rewrite the URL. Without JavaScript, native anchors remain usable without a dynamic highlight.

Astro's native i18n routing keeps English at the root and French at `/fr/`, without automatic language redirects. EN/FR links work without JavaScript. When enhanced, they retain a shared section anchor, preferring the section currently being read. Dates and locations are localized from shared facts. Translation changes require editorial review.

## CI and deployment

[PR checks](.github/workflows/checks-pr-draft-main.yml) run for non-draft pull requests targeting `main`, including when marked ready for review. [Pages deployment](.github/workflows/deploy.yml) is manually triggered from **Actions → Deploy to GitHub Pages → Run workflow**, using `main`, and repeats all checks. Pushes do not trigger either workflow.

Both workflows install Chromium with its system dependencies and run the browser suite after the existing production build. Deployment uploads the site only after those tests pass.

Leave deployment untriggered while the repository is private. Once publication is authorized, select **GitHub Actions** in **Settings → Pages** and allow the `github-pages` environment to deploy from `main`.

`astro.config.mjs` derives the Pages site and base from `GITHUB_REPOSITORY` or Git `origin`. The current project base is `/portfolio/`. Use Astro imports or `import.meta.env.BASE_URL` for internal assets. For a source archive without Git metadata, set `GITHUB_REPOSITORY=TuuZzee/portfolio` when building and previewing.

Each locale has its own canonical and social metadata, with reciprocal `hreflang` links. URLs include the configured base exactly once. Social cards use a text summary without a dedicated sharing image. No sitemap, analytics or external fonts are included.

## Privacy

Treat committed files and generated assets as public. Preserve `.private/`, `/docs/` and PDF exclusions. Do not publish personal contact details, private source material or an unapproved resume. LinkedIn is the primary contact channel. Deployment, resume publication, additional languages and domain configuration require separate approval.

Before publication, review tracked files and reachable Git history, including author/committer identity metadata. Pattern scans are useful checks, not proof that all sensitive material is absent. Review dependency advisories with `pnpm audit` and inspect their actual exposure before updating packages. The Tabler notice licenses its icons only, and a repository-wide license remains an owner decision.
