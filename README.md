# Personal Website

A modern personal website built with Astro and Three.js, featuring interactive 3D models, Obsidian notes integration, and educational content.

## Features

- **Interactive 3D Models** - WebGL rendering with Three.js, support for GLTF/GLB formats
- **Earth Rotation Demo** - 3D globe visualization with UTC/UT1 calculator
- **Obsidian Notes Integration** - Wikilinks, Mermaid diagrams, LaTeX math rendering
- **Career & Experience** - Professional timeline and documentation
- **Technical Notes** - Engineering and physics content with interactive visualizations
- **Privacy-Friendly Analytics** - Custom tracking API with MapLibre-powered world map and recent visitors

## Tech Stack

- **Astro** - Static site generator
- **Three.js** - 3D graphics
- **MapLibre GL JS** - Token-free vector world map for statistics
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

**Main Libraries Used**  
- [Astro](https://astro.build/) (v4.6.0, MIT License)  
- [Three.js](https://threejs.org/) (v0.157.0, MIT License)  
- [MapLibre GL JS](https://maplibre.org/projects/maplibre-gl-js/) (Apache-2.0 License)  
- [MDX](https://mdxjs.com/) (@astrojs/mdx v3.3.0, MIT License)  

<sub>See `package.json` for full dependency versions.</sub>
