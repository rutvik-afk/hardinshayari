import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['hi', 'en']),
    category: z.string(),
    keyword: z.string(),
    lines: z.array(z.string()).min(2),
    metaDescription: z.string(),
    image: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Har Din Shayari Team'),
  }),
});

export const collections = { posts };
