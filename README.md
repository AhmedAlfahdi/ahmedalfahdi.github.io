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
├── components/              # Astro components
│   ├── CPURegisters.astro   # CPU register visualization
│   ├── MathZoom.astro       # Math formula zoom
│   ├── Mermaid.astro        # Diagram renderer
│   ├── Model3D.astro        # 3D model viewer
│   ├── NumbatRunner.astro   # Numbat calculator runner
│   ├── PDFViewer.astro      # PDF document viewer
│   ├── PyodideRunner.astro  # Python runner (Pyodide)
│   ├── SiteInfo.astro       # Site metadata display
│   ├── ThemeToggle.astro    # Dark/light theme toggle
│   ├── ThreeScene.astro     # Three.js scene wrapper
│   └── VisitorTracker.astro # Analytics tracker
├── layouts/
│   └── BaseLayout.astro
├── pages/                   # Site routes
│   ├── index.astro          # Home page
│   ├── about.md
│   ├── blog.astro
│   ├── earth-rotation.astro # Earth rotation demo
│   ├── numbat.astro         # Numbat calculator page
│   ├── physics-demo.astro   # Physics simulation
│   ├── python-test.mdx      # Python demo page
│   ├── statistics.astro     # Analytics dashboard
│   ├── visitors-table.astro # Visitor data table
│   ├── career/              # Career pages ([...slug].astro)
│   ├── coding/              # Coding projects ([...slug].astro)
│   ├── engineering/         # Engineering projects ([...slug].astro)
│   ├── notes/               # Technical notes ([slug].astro)
│   └── projects/            # Project showcases
├── content/                 # MDX content collections
│   ├── career/              # 4 entries
│   ├── coding/              # 2 entries
│   ├── engineering/         # 3 entries
│   ├── notes/               # 9 entries
│   └── content.config.ts
├── assets/
│   └── images/
│       └── projects/
│           └── voidpad/
└── utils/
    ├── remark-wikilinks.mjs # Obsidian wikilinks plugin
    └── analytics-helpers.js # Analytics utilities

public/
├── career/             # PDF certificates & subdirs
├── favicon.svg
├── icons/              # PWA icons (192×192, 512×512)
├── manifest.json       # PWA manifest
├── models/             # 3D model files (.glb)
├── numbat-logo.svg
├── pdfs/               # General PDF files
├── robots.txt
├── sw.js               # Service worker (PWA)
├── ut-equation.glb
└── vendor/             # Third-party scripts
    ├── OrbitControls.js
    ├── three.module.min.js
    └── numbat/

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
build-info.json         # Build metadata
stats.js                # Build statistics script
version.json            # Version tracking
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
