import { computed } from 'vue'
import articlesData from '~~/data/articles.json'
import type { Article } from '~~/types/article'

const articles = articlesData as Article[]

export const useArticles = () => {
  const allArticles = computed(() => articles)

  const getArticleBySlug = (slug: string) =>
    articles.find((article) => article.slug === slug)

  const getArticlesByCategory = (category: string) =>
    articles.filter((article) => article.category === category)

  return {
    articles: allArticles,
    getArticleBySlug,
    getArticlesByCategory
  }
}
