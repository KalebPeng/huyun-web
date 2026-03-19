# Repository Guidelines

## Project Structure & Module Organization
This repository currently contains a single Nuxt 4 app in `sieve-website/`. Main application code lives in `sieve-website/app/`, shared static files live in `sieve-website/public/`, and project-level configuration is in `sieve-website/nuxt.config.ts`, `tailwind.config.ts`, and `tsconfig.json`. Treat `node_modules/` and `.nuxt/` as generated output; do not edit or commit generated files.

## Build, Test, and Development Commands
Run all commands from `sieve-website/`.

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: create the production build.
- `npm run preview`: preview the production build locally.
- `npm run generate`: generate a static output when needed.
- `npm run lint`: run ESLint with the Nuxt config.
- `npm run format`: format the codebase with Prettier.

## Coding Style & Naming Conventions
Use TypeScript with strict mode and follow the existing Nuxt/Vue single-file component style. Prettier is configured for no semicolons, single quotes, and no trailing commas. Use 2-space indentation in `.vue`, `.ts`, and config files. Prefer PascalCase for Vue component filenames, camelCase for variables/functions, and kebab-case for route-like file names when additional app directories are introduced.

## Testing Guidelines
There is no automated test suite configured yet. Until one is added, every change should pass `npm run lint` and, for behavior changes, a manual check through `npm run dev` or `npm run preview`. When tests are introduced, place them under `sieve-website/tests/` or next to the feature they cover, and name them `*.spec.ts`.

## Commit & Pull Request Guidelines
The repository has no commit history yet, so use clear conventional-style messages such as `feat: add homepage hero` or `fix: correct nuxt head metadata`. Keep commits focused on one concern. Pull requests should include a short summary, impacted paths, manual verification steps, and screenshots for UI changes.

## Configuration Tips
Keep environment-specific values out of source files and prefer local environment configuration. Review `nuxt.config.ts` before changing SSR, modules, or head metadata, because those settings affect the whole app.
