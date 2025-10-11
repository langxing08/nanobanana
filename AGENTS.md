# Repository Guidelines

## Project Structure & Module Organization
The repository hosts a single-page Next.js app. All production code lives in `web-app/`, with page logic under `src/app`, global styles in `src/app/globals.css`, and shared design tokens in `tailwind.config.js`. Use the top-level `tmp/` directory only for experiments or throwaway assets and clear it before opening a pull request.

## Build, Test, and Development Commands
Run commands from `web-app/`. `npm install` installs dependencies. `npm run dev` starts the local server at `http://localhost:3000`. `npm run build` compiles the app for production; pair it with `npm run start` to sanity-check the optimized output. `npm run lint` runs Next.js ESLint with Tailwind-specific rules; fix warnings before submitting.

## Coding Style & Naming Conventions
Use TypeScript with React function components and keep files in `src/app` using PascalCase for components (`HeroSection.tsx`) and hyphenated route folders when adding new segments. Indent with two spaces, prefer Tailwind utility classes declared in `tailwind.config.js`, and consolidate repeated patterns with small components instead of ad-hoc DOM fragments. Custom CSS belongs in `globals.css` using `@apply` for shared capsules; avoid inline styles unless dynamic. Keep UI copy bilingual (English + Simplified Chinese) to match existing content.

## Testing Guidelines
There is no automated test harness yet; rely on `npm run lint` and manual cross-browser checks until Jest or Playwright is introduced. When adding interactive logic, start a Jest + React Testing Library setup under `web-app/src/__tests__` and label files `ComponentName.test.tsx`. Ensure new features include basic render and accessibility assertions, and document manual QA steps in the pull request.

## Commit & Pull Request Guidelines
The repository lacks historical commits; adopt Conventional Commits (`feat:`, `fix:`, `chore:`) to keep history searchable. Each PR should include a clear summary, screenshots or GIFs for UI changes, and links to related issues or briefs. Confirm `npm run lint` and `npm run build` succeed before requesting review, and note any outstanding follow-up work explicitly.
