export interface Article {
  id: string
  slug: string
  title: string
  category: string
  summary: string
  content: string
  author: string
  date: string
  tags: string[]
  seoTitle?: string
  seoDescription?: string
}
