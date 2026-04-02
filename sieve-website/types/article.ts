import type { MarkdownRoot } from '@nuxt/content'

export interface ArticleSource {
  title: string
  publisher: string
  note: string
}

export interface Article {
  id: string
  path: string
  stem: string
  slug: string
  title: string
  category: string
  summary: string
  description: string
  body: MarkdownRoot
  author: string
  publishedAt: string
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  reviewedAt?: string
  reviewedBy?: string
  applicability?: string
  sources?: ArticleSource[]
}
