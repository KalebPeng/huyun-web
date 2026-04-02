import type { Article } from '~~/types/article'

type ArticleDocument = Omit<Article, 'slug'>

const getSlugFromPath = (path: string) => path.split('/').filter(Boolean).at(-1) || ''

const toArticle = (article: ArticleDocument): Article => ({
  ...article,
  slug: getSlugFromPath(article.path)
})

export const useArticles = () => {
  const getAllArticles = async () => {
    const articles = await queryCollection('knowledge')
      .order('publishedAt', 'DESC')
      .all()

    return (articles as ArticleDocument[]).map(toArticle)
  }

  const getArticleByPath = async (path: string) => {
    const article = await queryCollection('knowledge')
      .path(path)
      .first()

    return article ? toArticle(article as ArticleDocument) : null
  }

  const getArticlesByCategory = async (category: string, excludePath?: string) => {
    const query = queryCollection('knowledge')
      .where('category', '=', category)
      .order('publishedAt', 'DESC')

    if (excludePath) {
      query.where('path', '<>', excludePath)
    }

    const articles = await query.all()

    return (articles as ArticleDocument[]).map(toArticle)
  }

  return {
    getAllArticles,
    getArticleByPath,
    getArticlesByCategory
  }
}
