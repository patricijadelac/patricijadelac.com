import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'zod'

const work = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/work' }),
  schema: ({ image: img }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      featured: z.boolean().optional(),
      links: z
        .object({
          demo: z.url().optional(),
          repo: z.url().optional(),
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      image: z
        .object({
          src: img(),
          alt: z.string(),
        })
        .optional(),
      stats: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
          }),
        )
        .default([]),
    }),
})

export const collections = { work }
