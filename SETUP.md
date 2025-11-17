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
  // Remove the 'base' property
  integrations: [mdx()],
});
```

### Option B: Project Site (ahmedalfahdi.github.io/project-name)

Edit `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://ahmedalfahdi.github.io',
  base: '/your-repo-name', // Your repository name
  integrations: [mdx()],
});
```

## GitHub Repository Setup

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it (e.g., `personal-website` or `ahmedalfahdi.github.io`)
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
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
   - The site will deploy automatically!

## Troubleshooting

### Build Fails

Make sure all dependencies are installed:
```bash
rm -rf node_modules
npm install
npm run build
```

### 404 on GitHub Pages

Check that:
1. The `base` in `astro.config.mjs` matches your repo name
2. GitHub Pages is enabled in repository settings
3. The GitHub Action completed successfully (check Actions tab)

### 3D Models Not Loading

- Ensure your browser supports WebGL
- Check browser console for errors
- Try a different browser (Chrome, Firefox, Edge)

## Customization Tips

### Change Colors

Edit `src/layouts/BaseLayout.astro` and look for color values:
- `#2c3e50` - Dark blue (nav, headings)
- `#3498db` - Light blue (links, accents)
- `#f5f5f5` - Light gray (background)

### Add More 3D Models

In `src/components/ThreeScene.astro`, add new cases to the switch statement:
```javascript
case 'custom':
  geometry = new THREE.IcosahedronGeometry(1.5);
  break;
```

Then use it:
```astro
<ThreeScene sceneType="custom" />
```

### Add New Pages

Create files in `src/pages/`:
- `projects.astro` → `/projects`
- `contact.md` → `/contact`

Don't forget to add them to the nav in `BaseLayout.astro`!

## Next Steps

- [x] Update `astro.config.mjs` with your GitHub username
- [x] Update About page with your information
- [ ] Customize colors and styles
- [ ] Write your first blog post
- [ ] Add custom 3D models or load external .gltf files
- [ ] Set up a custom domain (optional)

Enjoy your new website! 🚀

