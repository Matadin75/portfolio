# Saien Matadin — portfolio

Personal portfolio site built with Next.js (static export), React and TypeScript, tested with Jest and React Testing Library, and deployed to GitHub Pages by GitHub Actions.

## Develop

```sh
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm test
npm run build      # static site in out/
```

All content lives in [`src/data/profile.ts`](src/data/profile.ts): profile, projects, experience, skills and education. Empty `github` / `linkedin` values are hidden on the page.

## Deploy

Every push to `main` runs typecheck, tests and the build, then publishes `out/` to GitHub Pages ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). Pull requests run the checks only.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

A repo named `<username>.github.io` is served at `https://<username>.github.io/`. Any other repo name is served under `/<repo>/`; the workflow passes that prefix to Next.js automatically.
