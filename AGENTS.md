# Repository Guidelines

## Project Structure & Module Organization
All code lives in `web-app/`, a Next.js single-page application. Routes reside in `web-app/src/app/`, with segment folders hyphenated and components in PascalCase (e.g. `HeroSection.tsx`). Shared design tokens belong in `web-app/tailwind.config.js`, while global CSS customizations stay in `web-app/src/app/globals.css`. Keep experiments in `tmp/` and delete anything under that folder before opening a pull request. Jest specs should mirror component names under `web-app/src/__tests__/`.

## Build, Test, and Development Commands
From `web-app/`, run `npm install` after cloning. Use `npm run dev` for the local server at `http://localhost:3000`. `npm run lint` executes Next.js ESLint with Tailwind rules—resolve every warning. `npm run build` assembles the production bundle, and `npm run start` launches the built app for smoke tests; pair these before tagging a release.

## Coding Style & Naming Conventions
Author UI in TypeScript React function components with two-space indentation. Prefer Tailwind utility classes over ad-hoc CSS; extract reusable patterns into helper components or use `@apply` within `globals.css` when duplication grows. Maintain bilingual copy (English + 简体中文) to match `README.md`. Avoid inline styles unless the value must be computed at runtime.

## Testing Guidelines
Linting is the baseline quality gate; do not merge with violations. When adding interactivity or business logic, create Jest + React Testing Library suites in `web-app/src/__tests__/ComponentName.test.tsx`. Cover render, accessibility, and primary user flows. Document any manual QA (browser, viewport, locale) in the pull request so reviewers can reproduce.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`) and keep subjects in the imperative mood. Pull requests should include a purpose summary, screenshots or GIFs for UI updates, linked issues or briefs, and confirmation that `npm run lint` and `npm run build` passed. Call out known follow-ups, and ensure `tmp/` is clean before requesting review.

## Security & Configuration Tips
Store secrets outside the repo; use `.env.local`, which Git ignores. Review any new dependency for size and maintenance impact. When touching Tailwind or Next.js configuration, annotate the change so future contributors understand effects on theming, bundling, or routing.
