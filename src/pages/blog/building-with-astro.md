---
layout: ../../layouts/BaseLayout.astro
title: Building with Astro
description: Why Astro is perfect for modern websites
---

# Building with Astro

Astro is a modern static site generator that delivers lightning-fast performance by shipping zero JavaScript by default. Let's explore why it's an excellent choice for personal websites.

## What Makes Astro Special?

Astro takes a unique approach to building websites:

1. **Zero JS by Default** - Only ships JavaScript when needed
2. **Island Architecture** - Interactive components are isolated "islands"
3. **Framework Agnostic** - Use React, Vue, Svelte, or vanilla JS
4. **Built-in Markdown** - First-class markdown and MDX support

## Performance Benefits

Traditional frameworks send the entire JavaScript bundle to the browser, even for static content. Astro only sends JavaScript for interactive components.

### Comparison

```javascript
// Traditional Framework
Bundle Size: ~200KB
Time to Interactive: ~2-3s

// Astro
Bundle Size: ~10KB (only for interactive parts)
Time to Interactive: ~0.5s
```

## Island Architecture

In Astro, you can have a mostly static page with small interactive "islands":

```astro
---
import Header from './Header.astro';        // Static
import ThreeScene from './ThreeScene.astro'; // Interactive
import Footer from './Footer.astro';         // Static
---

<Header />
<ThreeScene client:load />  <!-- Only this loads JS -->
<Footer />
```

## Client Directives

Astro provides directives to control when JavaScript loads:

- `client:load` - Load immediately
- `client:idle` - Load when browser is idle
- `client:visible` - Load when component is visible
- `client:media` - Load based on media query
- `client:only` - Only render on client

## Markdown Support

Astro has excellent markdown support with frontmatter:

```markdown
---
title: My Post
date: 2025-11-13
author: Your Name
---

# Content here

Write markdown naturally!
```

## File-Based Routing

Pages are created automatically based on file structure:

```
src/pages/
  index.astro         → /
  about.md           → /about
  blog/
    post-1.md        → /blog/post-1
    post-2.md        → /blog/post-2
```

## Integration Ecosystem

Astro has a rich ecosystem of integrations:

- **@astrojs/mdx** - MDX support
- **@astrojs/tailwind** - Tailwind CSS
- **@astrojs/react** - React components
- **@astrojs/sitemap** - Automatic sitemaps
- **@astrojs/rss** - RSS feed generation

## GitHub Pages Deployment

Deploying to GitHub Pages is straightforward:

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name',
});
```

Then add a GitHub Action for automatic deployment!

## Best Use Cases

Astro excels at:

- ✅ Personal websites and portfolios
- ✅ Blogs and documentation
- ✅ Marketing sites
- ✅ Content-heavy sites with some interactivity

Astro might not be the best choice for:

- ❌ Highly interactive SPAs
- ❌ Real-time applications
- ❌ Sites requiring server-side rendering

## Conclusion

Astro combines the best of static site generation with the flexibility of modern frameworks. It's perfect for personal websites that need great performance and occasional interactivity.

For this site, Astro was the ideal choice - fast static pages for content with Three.js islands for 3D models!

---

*Published: November 5, 2025*

