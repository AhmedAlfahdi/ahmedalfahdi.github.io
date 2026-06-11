# Quick Setup Guide

## Initial Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:4321` to see your site!

## Configuration for GitHub Pages

### Option A: User/Organization Site (ahmedalfahdi.github.io)

Edit `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://ahmedalfahdi.github.io',
  integrations: [mdx()],
});
```

### Option B: Project Site (ahmedalfahdi.github.io/project-name)

Edit `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://ahmedalfahdi.github.io',
  base: '/your-repo-name',
  integrations: [mdx()],
});
```

## GitHub Repository Setup

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it (e.g., `ahmedalfahdi.github.io`)
   - Keep it public for GitHub Pages

2. **Initialize and push your code**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/AhmedAlfahdi/ahmedalfahdi.github.io.git
git push -u origin main
```

3. **Enable GitHub Pages**
   - Go to repository settings → Pages
   - Under "Build and deployment": Source → "GitHub Actions"
   - The site will deploy automatically

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules
npm install
npm run build
```

### 404 on GitHub Pages
- Check that GitHub Pages is enabled in repository settings
- Check that the GitHub Action completed successfully (Actions tab)

### 3D Models Not Loading
- Ensure browser supports WebGL
- Check browser console for errors
- Try a different browser (Chrome, Firefox, Edge)

## Customization Tips

### Change Colors
Edit `src/layouts/BaseLayout.astro` and look for CSS custom properties.

### Add More 3D Models
In `src/components/ThreeScene.astro`, add new cases to the switch statement.

### Add New Pages
Create files in `src/pages/` — Astro auto-routes them.
