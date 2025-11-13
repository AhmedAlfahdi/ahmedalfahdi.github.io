# Personal Website

A modern personal website featuring interactive 3D models and markdown rendering, built with Astro and Three.js, hosted on GitHub Pages.

## Features

- ⚡ Lightning-fast static site generation with Astro
- 🎨 Interactive 3D models using Three.js
- 📝 Markdown and MDX support for easy content authoring
- 📱 Fully responsive design
- 🚀 Optimized for GitHub Pages deployment

## Tech Stack

- **Astro** - Modern static site generator
- **Three.js** - WebGL 3D graphics library
- **Markdown/MDX** - Content authoring
- **GitHub Pages** - Free hosting

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
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
│       └── deploy.yml      # GitHub Actions deployment
├── src/
│   ├── components/
│   │   └── ThreeScene.astro # 3D model component
│   ├── layouts/
│   │   └── BaseLayout.astro # Base page layout
│   └── pages/
│       ├── index.astro      # Home page
│       ├── about.md         # About page
│       ├── 3d-models.astro  # 3D models gallery
│       ├── blog.astro       # Blog listing
│       └── blog/
│           ├── getting-started-threejs.md
│           └── building-with-astro.md
├── astro.config.mjs         # Astro configuration
├── package.json
└── README.md
```

## Deployment to GitHub Pages

### Step 1: Update Configuration

Edit `astro.config.mjs` and update these values:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',  // Remove this line if deploying to yourusername.github.io
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

### Adding New 3D Models

Edit `src/components/ThreeScene.astro` to add new geometry types or customize the existing models.

### Adding Blog Posts

Create new markdown files in `src/pages/blog/` with frontmatter:

```markdown
---
layout: ../../layouts/BaseLayout.astro
title: Your Post Title
description: Post description
---

# Your content here
```

### Styling

Global styles are in `src/layouts/BaseLayout.astro`. Component-specific styles are in each `.astro` file's `<style>` tag.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires WebGL support for 3D models.

## License

MIT License - feel free to use this template for your own website!

## Acknowledgments

- Built with [Astro](https://astro.build/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Hosted on [GitHub Pages](https://pages.github.com/)

