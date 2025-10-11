# Repository Guidelines

## Project Structure & Module Organization
The app lives entirely in `web-app/`, a Next.js single-page project. Route logic resides in `src/app`, with segment folders using hyphenated names and component files in PascalCase (`HeroSection.tsx`). Shared UI tokens and Tailwind presets live in `tailwind.config.js`, while global styles belong in `src/app/globals.css`. Keep experiments in `tmp/` only and purge that folder before opening a pull request. Place future Jest specs under `web-app/src/__tests__/`, mirroring component names.

## Build, Test, and Development Commands
Run `npm install` inside `web-app/` after cloning. `npm run dev` launches the local server at `http://localhost:3000`. Use `npm run lint` to run Next.js ESLint with Tailwind rules; resolve every warning before committing. `npm run build` produces the production bundle, and `npm run start` bootstraps it for smoke testing. Pair `npm run build && npm run start` before every release branch.

## Coding Style & Naming Conventions
Author UI in TypeScript React function components with two-space indentation. Prefer Tailwind utility classes; if multiple components share a pattern, extract a helper component or utilize `@apply` in `globals.css`. Keep copy bilingual (English + Simplified Chinese) to align with `README.md`. Avoid inline styles except for dynamic computed values. Keep configuration changes centralized in `tailwind.config.js` to maintain consistent design tokens.

## Testing Guidelines
Linting is the baseline quality gate. When adding interactivity, scaffold Jest + React Testing Library under `web-app/src/__tests__/ComponentName.test.tsx`. Cover render, accessibility, and key user flows. Document any manual QA steps (browser, viewport, locale) in the PR description so reviewers can reproduce them. If tests require additional setup, commit helper scripts alongside the feature.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`) and craft messages that summarize scope in the imperative mood. Each PR should include: purpose summary, screenshots or GIFs for UI updates, linked issues or briefs, and a checklist showing `npm run lint` and `npm run build` passed. Call out known follow-ups or deferred work explicitly. Remove temporary assets from `tmp/` before requesting review.

## Security & Configuration Tips
Store secrets outside the repo; rely on `.env.local` ignored by Git. Validate third-party packages before adding them—keep the dependency surface minimal to preserve bundle size. When editing Tailwind or Next.js configuration, annotate changes so future agents understand impacts on theming and routing.
