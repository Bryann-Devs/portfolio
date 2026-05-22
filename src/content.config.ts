import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    github: z.string().url(),
    demo: z.string().url(),
    featured: z.boolean().default(false),
    category: z.enum(['Web App', 'School Project', 'Database', 'Networking', 'Other']),
  }),
});

export const collections = { projects };
