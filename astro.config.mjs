import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkWikilinks } from './src/utils/remark-wikilinks.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourusername.github.io',
  // Uncomment 'base' when deploying to GitHub Pages (username.github.io/repo-name)
  // For local development, leave it commented out
  // base: '/your-repo-name',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath, remarkWikilinks],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});

