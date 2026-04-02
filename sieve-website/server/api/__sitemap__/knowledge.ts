import { queryCollection } from '@nuxt/content/server'

import { getPublicPathFromContentPath } from '~~/utils/knowledgeLocale'

export default defineEventHandler(async (event) => {
  const articles = await queryCollection(event, 'knowledge')
    .select('path', 'publishedAt')
    .order('publishedAt', 'DESC')
    .all()

  return articles.map(article => ({
    loc: getPublicPathFromContentPath(article.path),
    changefreq: 'monthly',
    lastmod: article.publishedAt
  }))
})
