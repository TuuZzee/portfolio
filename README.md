# Personal Portfolio

Codebase project for simple portfolio.

## Local development

Use Node **24.22.1** (see `.node-version`) and **pnpm 12.16.1** (pinned in `package.json`). Install that pnpm version through your preferred package-manager installation method, then run:

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

The current `origin` is `https://github.com/TuuZzee/portfolio.git`. Open the printed local URL at `/portfolio/`. For production output, run `pnpm run build` followed by `pnpm run preview` and open `/portfolio/` again.

```sh
pnpm run format:check
pnpm run lint
pnpm run check
pnpm run build
```

`pnpm run format` applies Prettier. ESLint checks JavaScript, TypeScript and Astro, with typed rules scoped to `.ts` files. Astro frontmatter uses untyped TypeScript rules and template accessibility rules, with framework-aware type checking provided by `astro check`. Import ordering belongs to simple-import-sort. Prettier owns formatting and Tailwind class ordering through the CSS entry point.

Use PascalCase for Astro components and typed `Props` contracts, camelCase for future TypeScript utilities/data, and semantic palette utilities such as `text-muted`. Palette tokens live in `src/styles/global.css`. The default light surface and dormant dark palette are ready for M2. Tabler SVG icons will be introduced when an actual icon is needed, without a client framework or runtime icon bundle.

## GitHub Actions and Pages

The **checks non-draft PRs targeting main** workflow ([checks-pr-draft-main.yml](.github/workflows/checks-pr-draft-main.yml)) automatically validates non-draft pull requests targeting `main`, including when a draft is marked ready for review. Draft pull requests skip checks, and converting a running PR back to draft cancels its previous run. Pushes to `main` do not trigger the workflow.

Deployment lives in the separate **Deploy to GitHub Pages** workflow ([deploy.yml](.github/workflows/deploy.yml)) and is manual: open **Actions → Deploy to GitHub Pages → Run workflow**, select **main**, and run it. The manual run repeats all quality checks before uploading and deploying. Manual runs on other branches skip all jobs.

Both workflows use explicit install/check/build steps so each quality gate is visible. Only the deployment workflow uses the artifact upload and deployment actions used by the [official Astro Pages action](https://github.com/withastro/action). Dependency installation is frozen against `pnpm-lock.yaml`.

Repository identity comes from `GITHUB_REPOSITORY` in Actions, or the Git `origin` locally. The Astro configuration derives `site` and the project `base` (`/portfolio`) from that identity. A repository named `<owner>.github.io` uses `/` instead. A source archive without Git metadata defaults to `/` for local use. For an archive, set `GITHUB_REPOSITORY=TuuZzee/portfolio` when running build/preview to reproduce project-site routing. Future public links and assets must respect `import.meta.env.BASE_URL` or Astro imports.

While the repository is private, use the PR checks workflow and leave the deployment workflow untriggered. After implementation is reviewed and you make the repository public, complete these manual prerequisites:

1. In GitHub **Settings → Pages → Build and deployment**, select **GitHub Actions**, as described in the [Astro deployment guide](https://docs.astro.build/en/guides/deploy/github/).
2. Ensure Actions and the `github-pages` environment allow deployment from `main`.
3. Push the reviewed implementation to the default branch so GitHub exposes the **Run workflow** button. Open **Actions → Deploy to GitHub Pages → Run workflow**, select **main**, then inspect the run and resulting `https://TuuZzee.github.io/portfolio/` site. Manual triggering follows [GitHub's workflow dispatch requirements](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch).

No custom domain, repository settings change or remote push is part of M1. Local checks cannot establish a successful hosted deployment or CI run.

The original unapproved resume has been preserved locally under ignored `.private/`, outside Astro's public directory. All PDFs are ignored until a sanitized public resume is approved. Never force-add this private file. The approved portrait was moved from the seed's `public/images/` to `src/assets/profile-face-400w.png` without modifying its bytes. Source specification documents remain unchanged.
