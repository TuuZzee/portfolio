# Personal Portfolio

A static English portfolio built with Astro, strict TypeScript and Tailwind CSS 4. Includes responsive navigation, persistent light/dark themes, an optimized portrait and expandable professional experience.

## Development

Use Node **24.22.1** and **pnpm 12.16.1**, pinned in `.node-version` and `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Open `/portfolio/` at the printed local URL. To build and preview production output:

```sh
pnpm run build
pnpm run preview
```

## Quality checks

```sh
pnpm run format:check
pnpm run lint
pnpm run check
pnpm run build
```

Use `pnpm run format` to apply Prettier. ESLint handles correctness and import sorting. Prettier handles formatting and Tailwind class ordering.

## Project structure

- `src/pages/`, `src/layouts/`, `src/components/`: page composition and reusable Astro components.
- `src/content/facts.ts`: shared dates, employers, locations and public URLs.
- `src/content/locales/en.ts`: English copy, with contracts in `src/content/schema.ts`.
- `src/data/sections.ts`: stable section anchors and navigation.
- `src/styles/global.css`: semantic tokens, responsive layout and interaction styles.
- `src/assets/`, `public/`: optimized portrait source and supplied favicons.

Keep factual records separate from prose. Prefer static HTML and typed component props. Experience disclosures use native HTML, with subtle transitions in supporting browsers and no motion when reduced motion is preferred. Theme icons select System, Light or Dark, with CSS system fallback when JavaScript is disabled. Tabler SVG attribution is retained in `public/tabler-icons-LICENSE.txt`.

## CI and deployment

[PR checks](.github/workflows/checks-pr-draft-main.yml) run for non-draft pull requests targeting `main`, including when marked ready for review. [Pages deployment](.github/workflows/deploy.yml) is manually triggered from **Actions → Deploy to GitHub Pages → Run workflow**, using `main`, and repeats all checks. Pushes do not trigger either workflow.

Leave deployment untriggered while the repository is private. Once publication is authorized, select **GitHub Actions** in **Settings → Pages** and allow the `github-pages` environment to deploy from `main`.

`astro.config.mjs` derives the Pages site and base from `GITHUB_REPOSITORY` or Git `origin`. The current project base is `/portfolio/`. Use Astro imports or `import.meta.env.BASE_URL` for internal assets. For a source archive without Git metadata, set `GITHUB_REPOSITORY=TuuZzee/portfolio` when building and previewing.

## Privacy

Treat committed files and generated assets as public. Preserve `.private/`, `/docs/` and PDF exclusions. Do not publish personal contact details, private source material or an unapproved resume. LinkedIn is the primary contact channel. Deployment, resume publication, additional languages and domain configuration require separate approval.
