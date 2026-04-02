import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    knowledge: defineCollection({
      type: 'page',
      source: 'knowledge/**/*.md',
      schema: z.object({
        category: z.string(),
        summary: z.string(),
        author: z.string(),
        publishedAt: z.string(),
        reviewedAt: z.string().optional(),
        reviewedBy: z.string().optional(),
        applicability: z.string().optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        tags: z.array(z.string()),
        sources: z.array(z.object({
          title: z.string(),
          publisher: z.string(),
          note: z.string()
        })).optional()
      }),
      indexes: [
        { columns: ['publishedAt'] },
        { columns: ['category'] }
      ]
    })
  }
})
