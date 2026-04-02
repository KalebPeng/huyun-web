import type { Article } from '~~/types/article'
import {
  getContentPathFromPublicPath,
  getLocaleFromContentPath,
  getPublicPathFromContentPath
} from '~~/utils/knowledgeLocale'

type ArticleDocument = Omit<Article, 'slug'>

const getSlugFromPath = (path: string) => path.split('/').filter(Boolean).at(-1) || ''

const toArticle = (article: ArticleDocument): Article => ({
  ...article,
  path: getPublicPathFromContentPath(article.path),
  slug: getSlugFromPath(article.path)
})

export const useArticles = () => {
  const { locale } = useI18n()

  const getLocaleArticles = async () => {
    const articles = await queryCollection('knowledge')
      .order('publishedAt', 'DESC')
      .all()

    return (articles as ArticleDocument[]).filter(
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

    return article ? toArticle(article as ArticleDocument) : null
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
