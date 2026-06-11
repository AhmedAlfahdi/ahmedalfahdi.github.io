# Personal Website

A modern personal website built with Astro and Three.js, featuring interactive 3D models, career documentation, and technical notes.

## Features

- **Interactive 3D Models** — WebGL rendering with Three.js (GLTF/GLB formats)
- **Career & Experience** — Professional timeline with PDF certifications
- **Technical Notes** — Engineering content with Mermaid diagrams and LaTeX math
- **Privacy-Friendly Analytics** — Custom tracking with MapLibre-powered world map

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:4321` to preview.

## Analytics

Visitor tracking is powered by a separate Vercel serverless API backed by Vercel KV (Redis).

- **API endpoint**: `https://analytics-api-one.vercel.app/api`
- **Source repo**: [AhmedAlfahdi/analytics-api](https://github.com/AhmedAlfahdi/analytics-api)
- **Endpoints**: `/track` (POST), `/stats` (GET), `/log` (GET), `/badge` (GET)
- **Configured via**: `PUBLIC_ANALYTICS_API` environment variable (fallback hardcoded in components)

The API is deployed independently — changes to this repo don't affect it.

## Project Structure

```
src/
├── components/          # Astro components
│   ├── Model3D.astro   # 3D model viewer
│   ├── PDFViewer.astro # PDF document viewer
│   ├── Mermaid.astro   # Diagram renderer
│   ├── MathZoom.astro  # Math formula zoom
│   └── VisitorTracker.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/              # Site routes
│   ├── index.astro
│   ├── career/         # Career pages
│   ├── notes/          # Technical notes
│   ├── coding/         # Coding projects
│   ├── engineering/    # Engineering projects
│   └── statistics.astro
├── content/            # MDX content collections
│   ├── career/
│   ├── notes/
│   ├── coding/
│   ├── engineering/
│   └── content.config.ts
└── utils/
    ├── remark-wikilinks.mjs
    └── analytics-helpers.js

public/
├── career/             # PDF certificates
├── models/             # 3D model files (.glb)
├── pdfs/               # General PDF files
└── vendor/             # Third-party scripts

docs/                   # Feature & integration guides
├── SETUP.md
├── MDX_USAGE.md
├── OBSIDIAN-GUIDE.md
├── 3D-MODELS-GUIDE.md
├── PDF-VIEWER-GUIDE.md
├── PYODIDE-EXAMPLE.md
├── MOLECULAR-VISUALIZATION.md
├── CODE-WRAP-TOGGLE.md
└── LIGHT-THEME-IMPLEMENTATION.md

astro.config.mjs        # Astro configuration
package.json            # Dependencies
tsconfig.json           # TypeScript config
```

## Deployment

Deployed to GitHub Pages via GitHub Actions (`.github/workflows/astro-pages.yml`). The build step passes `PUBLIC_ANALYTICS_API` from a repository secret (or falls back to the hardcoded URL).

## Tech Stack

- **Astro** — Static site generator
- **Three.js** — 3D graphics
- **MapLibre GL JS** — Vector maps for analytics
- **MDX** — Markdown with components
- **Mermaid.js** — Diagrams
- **KaTeX** — Math rendering

## Notes

- **DarkReader Plugin**: This website has a built-in dark theme. Disable DarkReader or similar extensions when viewing — they interfere with the styling.
- See `docs/` for detailed guides on MDX usage, Obsidian integration, 3D models, and more.
