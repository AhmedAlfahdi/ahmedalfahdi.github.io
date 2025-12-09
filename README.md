# Personal Website

A modern, feature-rich personal website with interactive 3D models, Obsidian notes integration, and beautiful markdown rendering. Built with Astro and Three.js, optimized for GitHub Pages.

## Key Features

### Earth Rotation & Universal Time Interactive Demo
- Real-time 3D globe with WebGL rendering
- Interactive features:
  - Star field background with 1500+ stars
  - Latitude/longitude grid lines (30° intervals)
  - Greenwich meridian and equator visualization
  - Six major cities with clickable markers (London, NYC, Tokyo, Sydney, Cairo, Muscat)
  - Dynamic Sun indicator showing solar angle
  - Interactive orbit controls (drag to rotate, zoom)
- Educational visualizations:
  - Sidereal vs Solar Day comparison diagram
  - DUT1 (UT1 - UTC) historical graph
  - Complete leap seconds timeline (1972-2016)
  - Earth's rotation variations analysis
  - Historical timeline (GMT → UT1 → UTC)
- Advanced features:
  - Keyboard shortcuts (Space: pause, R: reset, F: fullscreen)
  - Click cities to see local solar time and day/night status
  - Save longitude preference (localStorage)
  - Cross-browser fullscreen support
  - High-DPI canvas rendering for crisp graphics
  - UT1 calculator with live UTC updates

### Interactive 3D Models
- Real-time WebGL rendering with Three.js
- Support for multiple formats: GLTF, GLB, OBJ
- Interactive controls for desktop and mobile
  - Desktop: Click and drag to rotate, scroll to zoom
  - Mobile: Single finger swipe to rotate, pinch to zoom
- Background toggle (light/dark)
- Embedded models in markdown files
- Performance optimizations: 60 FPS cap, frustum culling, memory management
- Frame-rate independent animations

### Obsidian Notes Integration
- Full Obsidian vault compatibility
- Automatic wikilink conversion `[[Note]]` to working links
- Mermaid diagram support (flowcharts, sequence, class diagrams)
- LaTeX math rendering with KaTeX
- Interactive diagram controls (zoom, pan, fullscreen)
- Interactive math equation enlargement
- GitHub-flavored markdown

### Performance Optimizations
- Frame rate capping locked to 60 FPS to prevent GPU spikes
- Intersection Observer for lazy loading and pausing off-screen animations
- Frustum culling - only renders objects visible to the camera
- Automatic memory management prevents memory leaks
- Optimized renderer with shadows and unnecessary buffers disabled
- Simplified lighting for better performance
- Optimized geometry with lower polygon counts
- Frame-rate independent animations using delta time

### Responsive Design
- Mobile-first responsive navigation
- Touch screen support for all 3D interactions
- Adaptive font sizes and spacing for different screen sizes
- Optimized layouts for phones, tablets, and desktops

## Tech Stack

- **Astro** - Modern static site generator with island architecture
- **Three.js** - WebGL 3D graphics library
- **Markdown/MDX** - Content authoring with components
- **Mermaid.js** - Diagram and flowchart rendering
- **KaTeX** - Fast LaTeX math rendering
- **Remark/Rehype** - Markdown processing plugins
- **GitHub Pages** - Free hosting and CI/CD

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone this repository:
```bash
git clone https://github.com/AhmedAlfahdi/ahmedalfahdi.github.io.git
cd ahmedalfahdi.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

## Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment
├── public/
│   └── models/                  # 3D model files (.glb, .gltf, .obj)
├── src/
│   ├── components/
│   │   ├── ThreeScene.astro     # Basic 3D shapes component
│   │   ├── Model3D.astro        # Custom 3D model loader
│   │   ├── Mermaid.astro        # Mermaid diagram component
│   │   └── MathZoom.astro       # Interactive math zoom
│   ├── layouts/
│   │   └── BaseLayout.astro     # Base page layout
│   ├── pages/
│   │   ├── index.astro          # Home page
│   │   ├── about.md             # About page
│   │   ├── earth-rotation.astro # Earth Rotation & UT1 interactive demo
│   │   ├── 3d-models.astro      # 3D models gallery
│   │   ├── notes.astro          # Notes index
│   │   ├── notes/               # Obsidian notes
│   │   │   ├── obsidian-demo.mdx
│   │   │   ├── reverse-engineering-0x09.mdx
│   │   │   └── 3d-model-example.mdx
│   │   ├── blog.astro           # Blog listing
│   │   └── blog/
│   │       ├── getting-started-threejs.md
│   │       └── building-with-astro.md
│   └── utils/
│       └── remark-wikilinks.mjs # Wikilink converter plugin
├── astro.config.mjs             # Astro configuration
├── package.json
├── 3D-MODELS-GUIDE.md          # Guide for 3D models
├── OBSIDIAN-GUIDE.md           # Guide for Obsidian integration
└── README.md
```

## Deployment to GitHub Pages

### Step 1: Update Configuration

Edit `astro.config.mjs` and update these values:

```javascript
export default defineConfig({
  site: 'https://ahmedalfahdi.github.io',
  // No 'base' needed for user/organization site (ahmedalfahdi.github.io)
});
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Under "Build and deployment", select "GitHub Actions" as the source

### Step 3: Push to Main Branch

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

The GitHub Action will automatically build and deploy your site!

## Customization

### Adding Custom 3D Models

1. Place your model files (.glb, .gltf, .obj) in `public/models/`
2. Embed in any MDX file:

```mdx
---
layout: ../../layouts/BaseLayout.astro
title: My Model
---

import Model3D from '../../components/Model3D.astro';

# My Custom Model

<Model3D 
  src="/models/your-model.glb"
  height="600px"
  scale={2}
  autoRotate={true}
/>
```

See `3D-MODELS-GUIDE.md` for full documentation.

### Adding Obsidian Notes

1. Copy your `.md` or `.mdx` files to `src/pages/notes/`
2. Wikilinks `[[Note Name]]` work automatically!
3. Use Mermaid diagrams and LaTeX math directly
4. Update the notes array in `src/pages/notes.astro`

See `OBSIDIAN-GUIDE.md` for full documentation.

### Adding Blog Posts

Create markdown files in `src/pages/blog/`:

```markdown
---
layout: ../../layouts/BaseLayout.astro
title: Your Post Title
description: Post description
---

# Your content here
```

### Styling

- Global styles: `src/layouts/BaseLayout.astro`
- Component styles: Each `.astro` file's `<style>` tag
- Modify gradients, colors, and animations as needed

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Browser Support

### Supported Browsers
- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS 14+, Android 9+)

**Requirements:** WebGL support for 3D models

### Chrome Mobile WebGL Optimization

This site implements an aggressive dispose-and-recreate strategy to handle Chrome mobile's WebGL limitations:

**The Problem:**
- Chrome mobile has a hard limit of 8-16 WebGL contexts (device-dependent)
- Aggressively clears canvas buffers when scrolling to save memory
- Can corrupt or lose WebGL contexts without proper cleanup

**The Solution (implemented in ThreeScene.astro):**
- **Lazy Loading:** Only initialize 3D scenes when they scroll into the viewport (IntersectionObserver)
- **Aggressive Disposal:** Completely dispose scenes (stop animation, free GPU memory) when scrolling out of view
- **Full Reinitialization:** Recreate scenes from scratch when scrolling back into view

**Benefits:**
- Never exceeds WebGL context limit (only 2-3 scenes active at once)
- No stale or broken WebGL contexts
- Reliable rendering on all mobile devices
- Automatic memory management

**Trade-off:** Slightly higher CPU usage when scrolling, but ensures 100% reliability on mobile devices.

## Documentation

- `3D-MODELS-GUIDE.md` - Complete guide for 3D models
- `OBSIDIAN-GUIDE.md` - Guide for Obsidian integration
- `SETUP.md` - Quick setup guide for GitHub Pages deployment
- Inline comments throughout the codebase

## Development Workflow

### Local Development
1. Make changes to source files
2. Run `npm run dev` to test in development mode
3. Visit `http://localhost:4321` to preview changes

### Testing Before Deployment
1. Run `npm run build` to build for production
2. Run `npm run preview` to test the production build locally
3. Visit `http://localhost:4321` to verify everything works
4. Commit and push only after local testing passes

### Deployment
Changes pushed to the `main` branch automatically trigger GitHub Actions to build and deploy the site to GitHub Pages.

## Contributing

Feel free to fork this repository and customize it for your own use. If you add interesting features, pull requests are welcome.

## License

MIT License - feel free to use this template for your own website.

## Acknowledgments

- Built with [Astro](https://astro.build/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Diagrams with [Mermaid.js](https://mermaid.js.org/)
- Math rendering with [KaTeX](https://katex.org/)
- Hosted on [GitHub Pages](https://pages.github.com/)

## Author

Ahmed N. Alfahdi - [GitHub](https://github.com/AhmedAlfahdi)
