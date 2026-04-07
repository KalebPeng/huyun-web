import { queryCollection } from '@nuxt/content/server'

import applicationsData from '~~/data/applications.json'
import faqData from '~~/data/faq.json'
import productsData from '~~/data/products.json'
import type { LocalizedApplicationScene, LocalizedFAQ, LocalizedProduct } from '~~/types'
import { localizeApplication, localizeFaq, localizeProduct } from '~~/utils/catalog'
import { getPublicPathFromContentPath } from '~~/utils/knowledgeLocale'
import { DEFAULT_LOCALE } from '~~/utils/localized'

interface ArticleEntry {
  title: string
  path: string
  summary: string
}

const products = (productsData as LocalizedProduct[]).map((product) =>
  localizeProduct(product, DEFAULT_LOCALE)
)
const productsZh = (productsData as LocalizedProduct[]).map((product) =>
  localizeProduct(product, 'zh')
)
const applications = (applicationsData as LocalizedApplicationScene[]).map((application) =>
  localizeApplication(application, DEFAULT_LOCALE)
)
const applicationsZh = (applicationsData as LocalizedApplicationScene[]).map((application) =>
  localizeApplication(application, 'zh')
)
const faqs = (faqData as LocalizedFAQ[]).map((faq) => localizeFaq(faq, DEFAULT_LOCALE))

const formatLinkLine = (title: string, url: string, description: string) =>
  `- [${title}](${url}): ${description}`

const buildSection = (title: string, lines: string[]) => [`## ${title}`, ...lines, ''].join('\n')

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.public.siteUrl || 'https://huayunmesh.com').replace(/\/+$/, '')
  const faqCategories = [...new Set(faqs.map((faq) => faq.category))]
  const articles = await queryCollection(event, 'knowledge')
    .select('title', 'path', 'summary')
    .order('publishedAt', 'DESC')
    .all() as ArticleEntry[]

  const productLines = products.map((product) =>
    formatLinkLine(product.name, `${siteUrl}/products/${product.slug}`, product.summary)
  )
  const productLinesZh = productsZh.map((product) =>
    formatLinkLine(product.name, `${siteUrl}/zh/products/${product.slug}`, product.summary)
  )

  const applicationLines = applications.map((application) =>
    formatLinkLine(
      application.name,
      `${siteUrl}/applications/${application.slug}`,
      application.summary
    )
  )
  const applicationLinesZh = applicationsZh.map((application) =>
    formatLinkLine(
      application.name,
      `${siteUrl}/zh/applications/${application.slug}`,
      application.summary
    )
  )

  const articleLines = articles.map((article) =>
    formatLinkLine(
      article.title,
      `${siteUrl}${getPublicPathFromContentPath(article.path)}`,
      article.summary
    )
  )

  const content = [
    '# Huayun Wire Mesh',
    '',
    '> B2B screen media and filtration website covering product pages, application pages, technical knowledge, FAQ, and online inquiry entry.',
    '',
    `Homepage: ${siteUrl}/`,
    `Chinese entry: ${siteUrl}/zh`,
    'Languages: en / zh-CN',
    '',
    '## Guidance',
    '- Prefer English URLs for English answers and /zh URLs for Chinese answers.',
    '- Use the knowledge base and tools pages first when answering standards, formulas, and selection logic.',
    '- Use product and application pages first when answering specification scope, material capability, and operating-fit questions.',
    '- Use the FAQ and contact pages first for lead-time, customization, sample, and quotation questions.',
    '- Use the content standards page and article source blocks when credibility, review process, or scope limitations matter.',
    '',
    buildSection('Core Entry Points', [
      formatLinkLine('Products', `${siteUrl}/products`, 'Browse the full product catalog and entry categories.'),
      formatLinkLine('Applications', `${siteUrl}/applications`, 'Find solutions by aggregate, coal washing, and industrial screening duties.'),
      formatLinkLine('Knowledge Base', `${siteUrl}/knowledge`, 'Read technical articles on ISO 9044, ASTM E11, material selection, and slot-screen principles.'),
      formatLinkLine('Chinese Knowledge Base', `${siteUrl}/zh/knowledge`, 'Chinese-language version of the technical knowledge section.'),
      formatLinkLine('Content Standards', `${siteUrl}/content-standards`, 'See author roles, review workflow, source policy, and correction rules.'),
      formatLinkLine('Chinese Content Standards', `${siteUrl}/zh/content-standards`, 'Chinese-language content review and editorial standards page.'),
      formatLinkLine('FAQ', `${siteUrl}/faq`, `Browse consolidated FAQ topics covering ${faqCategories.join(', ')}.`),
      formatLinkLine('Chinese FAQ', `${siteUrl}/zh/faq`, 'Chinese-language FAQ page covering procurement, customization, lead-time, and sampling.'),
      formatLinkLine('Technical Tools', `${siteUrl}/tools`, 'Use mesh, aperture, wire-diameter, and open-area calculations with ASTM E11 reference data.'),
      formatLinkLine('Chinese Technical Tools', `${siteUrl}/zh/tools`, 'Chinese-language calculator and selection helper for mesh parameters.'),
      formatLinkLine('Contact / Inquiry', `${siteUrl}/contact`, 'Submit drawings, specifications, and operating conditions for manual selection and quotation.'),
      formatLinkLine('Chinese Contact / Inquiry', `${siteUrl}/zh/contact`, 'Chinese-language inquiry entry for drawings, specifications, and quotation requests.')
    ]),
    buildSection('Product Pages (EN)', productLines),
    buildSection('Product Pages (ZH)', productLinesZh),
    buildSection('Application Pages (EN)', applicationLines),
    buildSection('Application Pages (ZH)', applicationLinesZh),
    buildSection('Technical Articles', articleLines),
    '## Other Machine-Readable Endpoints',
    `- Sitemap: ${siteUrl}/sitemap.xml`,
    `- Robots: ${siteUrl}/robots.txt`,
    `- LLMs: ${siteUrl}/llms.txt`,
    ''
  ].join('\n')

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return content
})
