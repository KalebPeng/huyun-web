import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const articles = await queryCollection(event, 'knowledge')
    .select('path', 'publishedAt')
    .order('publishedAt', 'DESC')
    .all()

  return articles.map(article => ({
    loc: article.path,
    changefreq: 'monthly',
    lastmod: article.publishedAt
  }))
})
