# Ismail Gilang Maulana — Portfolio

A single-page interactive portfolio for **Ismail Gilang Maulana**, a Fullstack Developer and Software Engineer. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Motion for React, and shipped as a fully static site to GitHub Pages.

**Live:** https://ismailgilang.github.io/gabut_v1/

## Highlights

- Animated preloader with a typewriter intro of the owner's name
- Full-height hero with rotating type/delete paragraph
- 3D coverflow-style project carousel with autoplay, drag, and keyboard controls
- Infinite dual-direction skill marquees
- Scroll-based section transitions and parallax
- Fully responsive, dark/light section styling, and `prefers-reduced-motion` support

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Animation:** Motion for React (`motion`)
- **Deployment:** GitHub Actions → GitHub Pages

## Project Structure

```text
app/
  layout.tsx          # Root layout, metadata (title/description/keywords), fonts
  page.tsx            # Returns null; page content is composed in the layout
  globals.css         # Tailwind import, theme tokens, keyframes
src/
  components/
    layout/           # Navbar, Footer
    loading/          # Preloader screen
    motion/           # Shared scroll/transition components
    sections/         # Hero, Introduction, Highlights, Skills, Projects, ...
  data/               # Skills, services, and project content
  lib/                # Static helpers
public/
  images/projects/    # Project cover images
  gue.jpg             # Hero portrait
.github/workflows/
  deploy.yml          # Build + deploy to GitHub Pages
```

## Getting Started

Requires Node.js 20.9+ (Node 22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command         | Description                                          |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Start the development server                         |
| `npm run build` | Build the static site into `out/`                    |
| `npm run lint`  | Run ESLint                                           |

## Customization

- **Theme & colors:** `app/globals.css` (`@theme` tokens)
- **Sections:** `src/components/sections/`
- **Content:** `src/data/` and the project list in `src/components/sections/Projects.tsx`
- **Metadata:** `app/layout.tsx`
- **Resume:** place `cv.pdf` in `public/` so the "Download Resume" button works

## Deployment

The site is exported statically (`output: "export"` in `next.config.ts`) and deployed by the workflow in `.github/workflows/deploy.yml`.

For a GitHub Pages project site such as `/gabut_v1/`, the build must use a matching base path. The workflow sets it automatically:

```bash
BASE_PATH=/gabut_v1 npm run build
```

Local builds without `BASE_PATH` run at the domain root (`/`).

### One-time GitHub setup

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Settings → Actions → General → Workflow permissions:** allow **Read and write permissions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).

After the workflow finishes, the site is published at `https://<owner>.github.io/<repo>/`.

## Notes

- Images use plain `<img>` with relative paths so they resolve correctly under the GitHub Pages base path.
- `public/.nojekyll` prevents GitHub Pages from ignoring the `_next` directory when serving static files.
- Build output (`out/`) and dependencies (`node_modules/`) are intentionally git-ignored.
