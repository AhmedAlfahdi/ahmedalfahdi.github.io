import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
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
    // Plugins are configured on the processor itself. `markdown.remarkPlugins`
    // and `markdown.rehypePlugins` are deprecated and will be removed.
    processor: unified({
      // remark-gfm is not listed: the processor's `gfm` option defaults to true
      // and applies it automatically (and `markdown.gfm` defaults to true too,
      // so it was previously being applied twice).
      remarkPlugins: [remarkMath, remarkWikilinks],
      rehypePlugins: [[rehypeKatex, { strict: 'ignore', throwOnError: false }]],
    }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
