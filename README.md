# Personal Website

A modern, feature-rich personal website with interactive 3D models, Obsidian notes integration, and beautiful markdown rendering. Built with Astro and Three.js, optimized for GitHub Pages.

## ✨ Key Features

### 🎨 Interactive 3D Models
- Real-time WebGL rendering with Three.js
- Support for multiple formats: GLTF, GLB, OBJ
- Interactive controls (rotate, zoom, background toggle)
- Embedded models in markdown files
- Aggressive performance optimizations (60 FPS cap, frustum culling, memory management)
- Frame-rate independent animations (smooth at any FPS)

### 📝 Obsidian Notes Integration
- Full Obsidian vault compatibility
- Automatic wikilink conversion `[[Note]]` → working links
- Mermaid diagram support (flowcharts, sequence, class diagrams)
- LaTeX math rendering with KaTeX
- Interactive diagram controls (zoom, pan, fullscreen)
- Interactive math equation enlargement
- GitHub-flavored markdown

### 🎯 Performance Optimizations
- **Frame rate capping** - Locked to 60 FPS to prevent GPU spikes
- **Intersection Observer** - Lazy loading, pauses off-screen animations
- **Frustum culling** - Only renders objects visible to the camera
- **Memory management** - Automatic cleanup prevents memory leaks
- **Optimized renderer** - Shadows & unnecessary buffers disabled
- **Simplified lighting** - Reduced light count for better performance
- **Optimized geometry** - Lower polygon counts for built-in shapes
- **Frame-rate independence** - Smooth animations using delta time

### 🎨 UI Features
- Light/Dark background toggle for 3D objects
- Responsive design (mobile-friendly)
- Modern gradient styling
- Interactive control panels
- Smooth animations and transitions

## 🛠 Tech Stack

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

## 📁 Project Structure

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

## 🎨 Customization

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

## 🌟 Highlights

### 3D Model Features
- ✅ Drag to rotate, scroll to zoom
- ✅ Light/Dark background toggle
- ✅ Auto-rotate with double-click toggle
- ✅ Reset view button
- ✅ Performance optimized (frustum culling, memory cleanup)
- ✅ Smooth animations (frame-rate independent)

### Obsidian Features
- ✅ Automatic wikilink conversion
- ✅ Mermaid diagrams (with zoom, pan, fullscreen)
- ✅ LaTeX math (with interactive zoom)
- ✅ Code syntax highlighting
- ✅ Tables, task lists, callouts
- ✅ GitHub-flavored markdown

### Performance
- ✅ GPU-accelerated rendering
- ✅ Lazy loading with Intersection Observer
- ✅ Automatic memory management
- ✅ Only renders visible objects
- ✅ 60 FPS animations
- ✅ Optimized for mobile

## 🌐 Browser Support

- ✅ Chrome 90+ (recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS 14+, Android 9+)

**Requirements:** WebGL support for 3D models

## 📚 Documentation

- `3D-MODELS-GUIDE.md` - Complete guide for 3D models
- `OBSIDIAN-GUIDE.md` - Guide for Obsidian integration
- Inline comments throughout the codebase

## 🤝 Contributing

Feel free to fork this repository and customize it for your own use! If you add interesting features, PRs are welcome.

## 📄 License

MIT License - feel free to use this template for your own website!

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Diagrams with [Mermaid.js](https://mermaid.js.org/)
- Math rendering with [KaTeX](https://katex.org/)
- Hosted on [GitHub Pages](https://pages.github.com/)

## 🎯 Future Enhancements

Potential features to add:
- [ ] Dark mode for entire site
- [ ] Search functionality for notes
- [ ] Tags and categories
- [ ] RSS feed for blog
- [ ] Comment system integration
- [ ] Analytics integration

---

**Made with ❤️ using Astro and Three.js**
