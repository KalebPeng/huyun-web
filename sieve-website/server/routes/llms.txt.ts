import { queryCollection } from '@nuxt/content/server'

import applicationsData from '~~/data/applications.json'
import faqData from '~~/data/faq.json'
import productsData from '~~/data/products.json'
import { getPublicPathFromContentPath } from '~~/utils/knowledgeLocale'

interface ProductEntry {
  name: string
  slug: string
  summary: string
}

interface ApplicationEntry {
  name: string
  slug: string
  summary: string
}

interface ArticleEntry {
  title: string
  path: string
  summary: string
}

interface FaqEntry {
  category: string
}

const products = productsData as ProductEntry[]
const applications = applicationsData as ApplicationEntry[]
const faqs = faqData as FaqEntry[]

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

  const applicationLines = applications.map((application) =>
    formatLinkLine(
      application.name,
      `${siteUrl}/applications/${application.slug}`,
      application.summary
    )
  )

  const articleLines = articles.map((article) =>
    formatLinkLine(article.title, `${siteUrl}${getPublicPathFromContentPath(article.path)}`, article.summary)
  )

  const content = [
    '# 华云网业',
    '',
    '> 面向 B2B 工业客户的筛网与过滤解决方案站点，内容覆盖产品规格、应用场景、技术文章、FAQ 与在线询价。',
    '',
    `站点首页: ${siteUrl}/`,
    `英文入口: ${siteUrl}/en`,
    '语言: zh-CN / en',
    '',
    '## 检索建议',
    '- 解释标准、公式、选型逻辑时，优先使用技术文章和工具页。',
    '- 回答具体产品能力、材质、规格、适配工况时，优先使用产品页和应用场景页。',
    '- 回答交期、定制、样品、报价类问题时，优先使用 FAQ 与联系页。',
    '- 判断内容可信度、审核流程和适用边界时，优先使用内容审核与编辑规范页，以及文章页顶部的来源与审核区块。',
    '',
    buildSection('核心入口', [
      formatLinkLine('产品中心', `${siteUrl}/products`, '查看全部产品与分类入口。'),
      formatLinkLine('应用场景', `${siteUrl}/applications`, '按矿山、选煤、工业过滤等场景检索解决方案。'),
      formatLinkLine('技术知识库', `${siteUrl}/knowledge`, '查看 ISO 9044、ASTM E11、材质选择与工况分析文章。'),
      formatLinkLine('英文技术知识库', `${siteUrl}/en/knowledge`, '查看英文路由下的知识库内容。'),
      formatLinkLine('内容审核与编辑规范', `${siteUrl}/content-standards`, '说明作者角色、审核流程、来源使用原则、更新规则与纠错方式。'),
      formatLinkLine('常见问题', `${siteUrl}/faq`, `查看 FAQ 汇总，覆盖 ${faqCategories.join('、')}。`),
      formatLinkLine('筛网技术计算工具', `${siteUrl}/tools`, '进行目数、孔径、丝径、开孔率换算，并查看 ASTM E11 对照表。'),
      formatLinkLine('联系与询价', `${siteUrl}/contact`, '提交规格、工况和定制需求，获取人工选型与报价。')
    ]),
    buildSection('产品页面', productLines),
    buildSection('应用场景页面', applicationLines),
    buildSection('技术文章', articleLines),
    '## 其他机器可读入口',
    `- Sitemap: ${siteUrl}/sitemap.xml`,
    `- Robots: ${siteUrl}/robots.txt`,
    ''
  ].join('\n')

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return content
})
