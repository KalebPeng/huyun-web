import type { Article, ArticleSource } from '~~/types/article'
import {
  getContentPathFromPublicPath,
  getLocaleFromContentPath,
  getPublicPathFromContentPath
} from '~~/utils/knowledgeLocale'

interface RawArticleDocument extends Omit<Article, 'slug' | 'tags' | 'sources'> {
  tags?: string[] | null
  sources?: ArticleSource[] | null
}

const getSlugFromPath = (path: string) => path.split('/').filter(Boolean).at(-1) || ''

const toArticle = (article: RawArticleDocument): Article => ({
  ...article,
  path: getPublicPathFromContentPath(article.path),
  slug: getSlugFromPath(article.path),
  tags: Array.isArray(article.tags) ? article.tags.filter((tag): tag is string => typeof tag === 'string') : [],
  sources: Array.isArray(article.sources)
    ? article.sources.filter((source): source is ArticleSource =>
        Boolean(source)
        && typeof source.title === 'string'
        && typeof source.publisher === 'string'
        && typeof source.note === 'string'
      )
    : []
})

export const useArticles = () => {
  const { locale } = useI18n()

  const getLocaleArticles = async () => {
    const articles = await queryCollection('knowledge')
      .order('publishedAt', 'DESC')
      .all()

    return (articles as RawArticleDocument[]).filter(
      (article) => getLocaleFromContentPath(article.path) === locale.value
    )
  }

  const getAllArticles = async () => {
    const articles = await getLocaleArticles()
    return articles.map(toArticle)
  }

  const getArticleByPath = async (path: string) => {
    const article = await queryCollection('knowledge')
      .path(getContentPathFromPublicPath(path, locale.value as 'zh' | 'en'))
      .first()

    return article ? toArticle(article as RawArticleDocument) : null
  }

  const getArticlesByCategory = async (category: string, excludePath?: string) => {
    const articles = await getLocaleArticles()
    const excludeContentPath = excludePath
      ? getContentPathFromPublicPath(excludePath, locale.value as 'zh' | 'en')
      : undefined

    return articles
      .filter((article) => article.category === category && article.path !== excludeContentPath)
      .map(toArticle)
  }

  return {
    getAllArticles,
    getArticleByPath,
    getArticlesByCategory
  }
}
