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

Each project gets a card on the home page and a case study at `/projects/<slug>/`. A few things to know when editing projects:

- Set `status: "offline"` and remove `url` when a product stops running; it then shows as "No longer live".
- `challenge`, `decisions`, `outcomes` and `repo` are optional case-study sections, hidden until you fill them in. Only add verified outcomes.
- `architecture` drives the case-study diagram. List only what's known; an empty `data` list leaves the data column out.
- Project illustrations are original SVGs in [`src/components/ProjectVisual.tsx`](src/components/ProjectVisual.tsx), one per slug, and are always labelled "Illustration". To use a real screenshot instead, swap the visual for an image there.

## Deploy

Every push to `main` runs typecheck, tests and the build, then publishes `out/` to GitHub Pages ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). Pull requests run the checks only.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

A repo named `<username>.github.io` is served at `https://<username>.github.io/`. Any other repo name is served under `/<repo>/`; the workflow passes that prefix to Next.js automatically.
