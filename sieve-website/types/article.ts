export interface ArticleSource {
  title: string
  publisher: string
  note: string
}

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
  reviewedAt?: string
  reviewedBy?: string
  applicability?: string
  sources?: ArticleSource[]
}
