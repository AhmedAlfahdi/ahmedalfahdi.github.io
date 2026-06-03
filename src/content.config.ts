import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const coding = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/coding' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const engineering = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/engineering' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    status: z.enum(['Planned', 'In Progress', 'Completed', 'On Hold']).default('Planned'),
    category: z.string(),
    featured: z.boolean().default(false),
  }),
});

const career = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/career' }),
  schema: z.object({
    title: z.string(),
    company: z.string().optional(),
    role: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    current: z.boolean().default(false),
    location: z.string().optional(),
    excludeFromTimeline: z.boolean().default(false),
    lastUpdated: z.date().optional(),
  }),
});

export const collections = {
  coding,
  notes,
  engineering,
  career,
};
