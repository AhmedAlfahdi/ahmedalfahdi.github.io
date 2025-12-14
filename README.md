# Personal Website

A modern personal website built with Astro and Three.js, featuring interactive 3D models, Obsidian notes integration, and educational content.

## Features

- **Interactive 3D Models** - WebGL rendering with Three.js, support for GLTF/GLB formats
- **Earth Rotation Demo** - 3D globe visualization with UTC/UT1 calculator
- **Obsidian Notes Integration** - Wikilinks, Mermaid diagrams, LaTeX math rendering
- **Career & Experience** - Professional timeline and documentation
- **Technical Notes** - Engineering and physics content with interactive visualizations

## Tech Stack

- **Astro** - Static site generator
- **Three.js** - 3D graphics
- **MDX** - Markdown with React components
- **Mermaid.js** - Diagrams
- **KaTeX** - Math rendering

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:4321` to preview.

## Project Structure

```
src/
├── components/        # React/Astro components (3D models, diagrams)
├── layouts/          # Page layouts
├── pages/            # Site pages and routes
│   ├── career/       # Career experience entries
│   ├── notes/        # Technical notes and documentation
│   └── earth-rotation.astro  # Interactive Earth demo
└── content/          # MDX content collections
    ├── career/       # Career MDX files
    ├── notes/        # Notes MDX files
    └── config.ts     # Content schema definitions
```

## Deployment

Configured for GitHub Pages. Push to `main` branch to auto-deploy via GitHub Actions.

Update `astro.config.mjs` with your site URL:
```javascript
site: 'https://yourusername.github.io'
```

## Documentation

- `3D-MODELS-GUIDE.md` - Using 3D models in content
- `OBSIDIAN-GUIDE.md` - Obsidian notes integration
- `SETUP.md` - Deployment setup guide

## License

MIT License

---

Built with [Astro](https://astro.build/) and [Three.js](https://threejs.org/)
