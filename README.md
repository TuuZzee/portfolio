# Personal Portfolio

A static personal portfolio built with Astro, strict TypeScript and Tailwind CSS 4. The M2 UI foundation includes a responsive page scaffold, section navigation, light/dark themes, an optimized profile portrait and supplied favicons. Section text is intentionally placeholder copy pending content integration.

## Local development

Use Node **24.22.1** (`.node-version`) and **pnpm 12.16.1** (`package.json`). With that toolchain installed:

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Open the printed local URL at `/portfolio/`.

```sh
pnpm run format:check
pnpm run lint
pnpm run check
pnpm run build
pnpm run preview
```

The production build is written to `dist/`. Preview it at the printed URL with `/portfolio/`. `pnpm run format` applies formatting.

## Structure and conventions

- `src/pages/index.astro`: English page scaffold.
- `src/layouts/BaseLayout.astro`: shared head, favicon links, initial theme and skip link.
- `src/components/`: header, theme control, section container, portrait and footer.
- `src/data/sections.ts`: typed section IDs, navigation labels and neutral placeholders.
- `src/styles/global.css`: semantic palette, typography, spacing and responsive layout.
- `src/assets/`: approved portrait, optimized at build time.
- `public/`: browser favicons and Apple touch icon.

Astro components render static HTML. Navigation remains visible and usable without JavaScript. On narrow screens it wraps into a compact grid. The header becomes sticky on desktop, with an anchor scroll offset. The skip link and native controls support keyboard navigation.

Theme selection offers **System**, **Light** and **Dark**. An early inline script applies the saved preference before rendering. The theme control stores explicit selections locally, follows system changes in System mode and synchronizes changes across tabs. Without JavaScript, CSS follows the system theme and hides the unavailable control. If browser storage is blocked, theme changes still work for the current visit.

Palette tokens preserve the `#D96B28` accent and use accessible variants for text and controls. Layout width is capped at 68rem, prose at 65 characters, and section spacing scales between 3rem and 5rem. The portrait keeps its original aspect ratio. There are no animations, transitions, remote fonts or client framework dependencies.

Use PascalCase for Astro components, typed `Props` contracts and camelCase for TypeScript utilities/data. Keep future factual career records separate from localized prose. ESLint handles correctness, TypeScript rules, Astro accessibility and import sorting. Prettier handles formatting and Tailwind ordering. Type-checked lint rules apply to `.ts` files, while `astro check` supplies framework-aware template checking.

Favicon links use the configured base path. Only the supplied browser icons and Apple touch icon are included. A web manifest, install icons, service worker and PWA behavior are intentionally omitted. The supplied illustrated favicon remains unchanged, although fine detail is less distinct at 16px.

## GitHub Actions and Pages

The [PR checks workflow](.github/workflows/checks-pr-draft-main.yml), displayed as **checks non-draft PRs targeting main**, validates non-draft pull requests targeting `main`, including when marked ready for review. Draft PRs skip checks. Converting a running PR back to draft cancels its previous run. The workflow performs a frozen dependency install, formatting check, lint, Astro check and production build.

The separate [Deploy to GitHub Pages workflow](.github/workflows/deploy.yml) is manual and repeats all checks before deployment. Pushes do not trigger either workflow. Leave deployment untriggered while the repository is private. No Pages deployment is part of M2.

Repository identity comes from `GITHUB_REPOSITORY` in Actions or the Git `origin` locally. `astro.config.mjs` derives the Pages site and base path. For `TuuZzee/portfolio`, the base is `/portfolio/`. A repository named `<owner>.github.io` uses `/`. Internal assets must use Astro imports or `import.meta.env.BASE_URL` rather than hard-coded root paths. In a source archive without Git metadata, set `GITHUB_REPOSITORY=TuuZzee/portfolio` when building and previewing to reproduce project-site routing.

After implementation review and a change to public visibility:

1. Select **GitHub Actions** in **Settings → Pages → Build and deployment**.
2. Permit the `github-pages` environment to deploy from `main`.
3. Ensure the workflow exists on the default branch, then select **Actions → Deploy to GitHub Pages → Run workflow** and choose **main**. Other branches skip deployment.

The expected project URL is `https://TuuZzee.github.io/portfolio/`. Custom-domain setup remains deferred. Local checks do not establish a successful hosted CI run or deployment.

## Public content boundaries

Treat all committed files and generated assets as public. Preserve `.private/` and PDF exclusions. Do not publish private source material, contact details or an unapproved resume. No resume download, contact form, analytics or availability status is included. Full career content, expandable experience details and localization are deferred beyond M2.
