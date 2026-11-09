# Repository Guidelines

## Purpose

This repository contains a small, public-facing personal portfolio website. Optimize for readability, accessibility, maintainability, fast loading, and clear professional presentation. Treat committed source files and generated website assets as publicly accessible.

## Stack and architecture

- Use Astro with static output and strict TypeScript.
- Implement only the scope explicitly requested. Preserve existing design and behavior unless a change is required by the task.
- Use Tailwind CSS 4 for styling, with semantic design tokens in `src/styles/global.css`.
- Prefer `.astro` components and HTML over hydrated client frameworks. Add browser JavaScript only when interaction requires it.
- Use small, focused components. Keep reusable layout components under `src/layouts/` or `src/components/`, and pages under `src/pages/`.
- Keep employer identity, role IDs, dates, locations, technology names and public URLs in `src/content/facts.ts`. Keep English/French presentation text in `src/content/locales/`, with common contracts in `src/content/schema.ts` and lookup in `src/content/index.ts`. Do not duplicate chronological facts in prose or components.
- Keep stable section IDs in `src/data/sections.ts`, with localized navigation labels and titles supplied through typed props. English and French share `PortfolioPage.astro` and UI components. Do not add placeholder locales or duplicate page markup.
- Use Astro's native i18n routing with English at the default root and French at `/fr/`. Localize controls, dates, alt text and metadata, and keep canonical/alternate URLs compatible with the configured base path. Preserve approved English wording and require editorial review for new translations.
- Do not add a backend, API, CMS, state-management library, or runtime icon bundle without a concrete technical need.
- Use Tabler SVG icons selectively, with accessible names when an icon conveys meaning.

## Design and accessibility

- Keep the design restrained, responsive, and content-first. Avoid decorative animations, parallax, and heavy client-side effects.
- Preserve `#D96B28` as the brand accent. Use semantic color variables rather than repeating literal colors in components.
- Support light and dark themes. Ensure readable contrast, visible keyboard focus, and reduced-motion behavior.
- Use semantic landmarks, a logical heading order, native controls, descriptive link text, and meaningful image alt text.
- Keep navigation and interactive elements usable on small screens and with a keyboard.
- Experience summaries, roles and dates must remain visible outside native `<details>` disclosures. Start disclosures collapsed, retain clear state affordances and keyboard focus, and keep interactive links/buttons out of `<summary>`.
- In visitor-facing prose, use natural language appropriate to the locale and avoid em dashes and semicolons. This rule does not apply to programming syntax.

## TypeScript and code conventions

- Prefer explicit, narrow types at component and data boundaries. Avoid `any` and unnecessary type assertions.
- Use PascalCase for Astro component filenames and type names; use camelCase for variables and functions.
- Keep components and functions focused. Avoid abstraction unless it reduces meaningful duplication.
- Favor readable imports and predictable control flow. Explain non-obvious decisions in comments, not self-evident code.
- ESLint owns correctness and import sorting. Prettier owns formatting and Tailwind class ordering. Do not add competing formatters or import sorters.
- Follow the existing flat ESLint configuration, Prettier configuration, and `.editorconfig` rather than introducing separate style conventions.
- Type-checked ESLint rules use project service for `.ts` files. Astro templates and frontmatter use Astro/TypeScript and accessibility rules, with framework-aware type checking supplied by `astro check`.
- Keep `prettier-plugin-tailwindcss` last in the Prettier plugin list and point it at `src/styles/global.css`. Verify Astro formatting and Tailwind class sorting together when updating formatter dependencies.

## Routing, assets, and deployment

- The site is statically built for GitHub Pages. Its `site` and `base` default to repository identity through `config/site.mjs`, with validated build-time `SITE_URL` (origin) and `BASE_PATH` overrides. Use the same configuration when building and previewing or running browser tests.
- Keep internal links, images, favicons, and manifest URLs compatible with both a project base path such as `/portfolio/` and a custom-domain root. Avoid hard-coded root-absolute asset paths.
- Use Astro's asset handling for images where appropriate and provide stable dimensions to prevent layout shifts.
- Keep the existing GitHub Actions separation: PR checks in `.github/workflows/checks-pr-draft-main.yml` and manual deployment in `.github/workflows/deploy.yml`.
- PR checks run only for non-draft pull requests targeting `main`, including when marked ready for review. Deployment is manually triggered from `main` and repeats all quality checks. Leave deployment untriggered while the repository remains private.
- Do not change repository visibility, GitHub settings, Git remotes, deployment configuration, or publish changes without explicit authorization.

## Public content and privacy

- Only commit assets and text intended for public distribution. Never include secrets, credentials, unpublished company materials, private notes, or private source documents.
- Do not publish personal email addresses, phone numbers, `mailto:` links, or a contact form. Use the approved public profile links for contact.
- Keep private local material out of Git and out of Astro's public output. The `.private/` directory is ignored by Git.
- Do not publish a resume PDF unless the exact PDF has been approved for public distribution and reviewed for personal contact details.
- Preserve the `.private/` and `*.pdf` exclusions. Keep resume downloads disabled until an approved public-safe PDF is supplied.
- Do not invent professional achievements, customer names, performance metrics, or project outcomes. Keep claims attributable and appropriately scoped.
- Use only authorized images, icons, and other assets. Preserve attribution and license requirements where applicable.
- Preserve the approved portrait at `src/assets/profile-face-400w.png`. Do not publish an explicit availability or job-search status line.

## Working practices

- Inspect existing implementation and conventions before editing.
- Prefer the smallest change that meets the requirement. Avoid unrelated refactors and new dependencies.
- Keep the lockfile in sync with `package.json`. Use the repository's pinned Node and pnpm toolchain.
- Run the relevant checks before reporting completion:

  ```sh
  pnpm run format:check
  pnpm run lint
  pnpm run check
  pnpm run build
  pnpm run test
  pnpm run test:e2e
  ```

- Report what changed, what was actually tested, and what remains unverified. Do not claim a hosted deployment or CI run passed unless it was observed.
- Browser smoke tests use Playwright Chromium against the production build on loopback port 4173. Build before `test:e2e`, or use `pnpm run validate`. Keep the Node tests separate, preserve both language routes and do not substitute dev-server results for production verification.
- Keep browser artifacts and caches ignored. Do not commit screenshots, traces, reports, audit output or private source files. Inspect Git identity metadata as well as file contents before public release, and never rewrite history without explicit authorization.
- Do not commit, push, merge, or modify remote settings unless explicitly instructed.
