

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkWikilinks } from './src/utils/remark-wikilinks.mjs';
import mcp from 'astro-mcp';

export default defineConfig({
  site: 'https://ahmedalfahdi.github.io',
  // No 'base' needed for user/organization site
  integrations: [
    mdx(),
    mcp()   // <-- astro-mcp added here
  ],
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath, remarkWikilinks],
    rehypePlugins: [[rehypeKatex, { strict: "ignore", throwOnError: false }]],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
