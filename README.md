# Personal Website

A modern personal website built with Astro and Three.js, featuring interactive 3D models, career documentation, and technical notes.

## Features

- **Interactive 3D Models** - WebGL rendering with Three.js (GLTF/GLB formats)
- **Career & Experience** - Professional timeline with PDF certifications
- **Technical Notes** - Engineering content with Mermaid diagrams and LaTeX math
- **Privacy-Friendly Analytics** - Custom tracking with MapLibre-powered world map

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:4321` to preview.

## Notes

- **DarkReader Plugin**: This website already has a dark theme built-in. Please disable DarkReader or similar dark mode browser extensions when viewing this site, as they may interfere with the styling and cause display issues.

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
│   ├── about.md
│   ├── career/         # Career pages
│   ├── notes/          # Technical notes
│   ├── coding/         # Coding projects
│   ├── engineering/    # Engineering projects
│   └── statistics.astro
├── content/            # MDX content collections
│   ├── career/         # Career entries
│   ├── notes/          # Technical notes
│   ├── coding/         # Coding projects
│   ├── engineering/    # Engineering projects
│   └── config.ts       # Content schemas
└── utils/
    ├── remark-wikilinks.mjs
    └── analytics-helpers.js

public/
├── career/             # PDF certificates and documents
├── models/             # 3D model files (.glb)
├── pdfs/               # General PDF files
└── vendor/             # Third-party scripts

astro.config.mjs        # Astro configuration
package.json            # Dependencies
tsconfig.json           # TypeScript config
```

## Deployment

Deployed to GitHub Pages via GitHub Actions. Update `astro.config.mjs` with your site URL.

## Tech Stack

- **Astro** - Static site generator
- **Three.js** - 3D graphics
- **MapLibre GL JS** - Vector maps for analytics
- **MDX** - Markdown with components
- **Mermaid.js** - Diagrams
- **KaTeX** - Math rendering

See `package.json` for full dependency versions.
