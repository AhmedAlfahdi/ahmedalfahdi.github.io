import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkWikilinks } from './src/utils/remark-wikilinks.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://ahmedalfahdi.github.io',
  base: '/Perosnal-Website',
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

