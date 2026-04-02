<template>
  <div v-if="article" class="min-h-screen bg-[#f8f9fb]">
    <!-- Breadcrumb -->
    <div class="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center gap-2 py-3 text-sm text-slate-500">
          <NuxtLink to="/" class="hover:text-primary transition-colors">首页</NuxtLink>
          <span class="text-slate-300">/</span>
          <NuxtLink to="/knowledge" class="hover:text-primary transition-colors">技术知识库</NuxtLink>
          <span class="text-slate-300">/</span>
          <span class="text-slate-700 line-clamp-1">{{ article.title }}</span>
        </nav>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
        <!-- Main content -->
        <article itemscope itemtype="https://schema.org/TechArticle">
          <!-- Header -->
          <header>
            <div class="flex flex-wrap items-center gap-3">
              <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-accent">
                {{ article.category }}
              </span>
              <time
                :datetime="article.date"
                class="text-xs text-slate-400"
                itemprop="datePublished"
              >
                {{ formatDate(article.date) }}
              </time>
              <span class="text-xs text-slate-400" itemprop="author">{{ article.author }}</span>
            </div>

            <h1
              class="mt-5 text-2xl font-black leading-snug text-slate-900 sm:text-3xl lg:text-4xl"
              itemprop="headline"
            >
              {{ article.title }}
            </h1>

            <p class="mt-4 text-base leading-8 text-slate-600" itemprop="description">
              {{ article.summary }}
            </p>

            <!-- Tags -->
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-accent">内容依据</p>
                <ul class="mt-3 space-y-3">
                  <li
                    v-for="source in article.sources"
                    :key="source.title"
                    class="rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <p class="text-sm font-semibold text-slate-900">{{ source.title }}</p>
                    <p class="mt-1 text-xs font-medium text-slate-500">{{ source.publisher }}</p>
                    <p class="mt-2 text-xs leading-6 text-slate-600">{{ source.note }}</p>
                  </li>
                </ul>
              </div>

              <div class="space-y-4">
                <div class="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">作者与审核</p>
                  <p class="mt-3 text-sm font-semibold text-slate-900">{{ article.author }}</p>
                  <p class="mt-1 text-xs text-slate-500">最后审核：{{ formatDate(article.reviewedAt || article.date) }}</p>
                  <p class="mt-1 text-xs text-slate-500">审核团队：{{ article.reviewedBy || article.author }}</p>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">适用边界</p>
                  <p class="mt-3 text-sm leading-7 text-slate-600">{{ article.applicability }}</p>
                </div>

                <NuxtLink
                  to="/about"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-primary"
                >
                  查看工厂与品质承诺
                  <span aria-hidden="true">→</span>
                </NuxtLink>
              </div>
            </div>
          </header>

          <!-- Divider -->
          <hr class="my-8 border-slate-200">

          <!-- Article body -->
          <div
            class="prose prose-slate max-w-none prose-headings:font-black prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-p:leading-8 prose-p:text-slate-700 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:text-accent prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:text-sm prose-table:text-sm prose-td:py-2 prose-th:py-2 prose-th:font-bold prose-strong:text-slate-900 prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
            itemprop="articleBody"
            v-html="renderedContent"
          />

          <!-- Footer nav -->
          <div class="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
            <NuxtLink
              to="/knowledge"
              class="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              返回知识库
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
            >
              有疑问？联系我们
            </NuxtLink>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="mt-12 lg:mt-0">
          <div class="sticky top-28 flex flex-col gap-6">
            <!-- Related articles -->
            <div v-if="relatedArticles.length" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 class="text-sm font-bold text-slate-900">相关文章</h3>
              <ul class="mt-4 flex flex-col gap-4">
                <li v-for="rel in relatedArticles" :key="rel.id">
                  <NuxtLink
                    :to="`/knowledge/${rel.slug}`"
                    class="group flex flex-col gap-1"
                  >
                    <span class="text-xs font-semibold text-accent">{{ rel.category }}</span>
                    <span class="text-sm font-medium leading-snug text-slate-800 group-hover:text-accent transition-colors line-clamp-2">
                      {{ rel.title }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- CTA -->
            <div class="rounded-2xl bg-[linear-gradient(135deg,#1a2744,#243f72)] p-5 text-white">
              <p class="text-sm font-bold">需要定制筛网？</p>
              <p class="mt-2 text-xs leading-6 text-slate-300">
                把工况和参数告诉我们，技术工程师会在 24 小时内回复选型建议。
              </p>
              <NuxtLink
                to="/contact"
                class="mt-4 flex items-center justify-center rounded-xl bg-white py-2.5 text-sm font-bold text-primary hover:bg-slate-100 transition-colors"
              >
                立即询价
              </NuxtLink>
            </div>

            <!-- Tools link -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p class="text-sm font-bold text-slate-900">技术计算工具</p>
              <p class="mt-2 text-xs leading-6 text-slate-500">
                在线目数↔孔径换算、开孔率计算器和 ASTM E11 参考表。
              </p>
              <NuxtLink
                to="/tools"
                class="mt-4 flex items-center justify-center rounded-xl border border-accent py-2.5 text-sm font-bold text-accent hover:bg-blue-50 transition-colors"
              >
                打开计算工具 →
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <!-- 404 -->
  <div v-else class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p class="text-5xl font-black text-slate-200">404</p>
    <p class="text-lg font-bold text-slate-900">文章不存在</p>
    <NuxtLink to="/knowledge" class="text-sm text-accent hover:underline">返回知识库</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePageSeoMeta } from '~/composables/useSeoMeta'
import { useArticles } from '~/composables/useArticles'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
const { articles, getArticleBySlug } = useArticles()

const article = computed(() => getArticleBySlug(route.params.slug as string))

if (!article.value) {
  setResponseStatus(404, 'Article Not Found')
}

const relatedArticles = computed(() =>
  articles.value
    .filter(a => a.id !== article.value?.id && a.category === article.value?.category)
    .slice(0, 3)
)

const articleJsonLd = computed(() => {
  if (!article.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.value.title,
    description: article.value.seoDescription || article.value.summary,
    mainEntityOfPage: `${siteUrl}/knowledge/${article.value.slug}`,
    datePublished: article.value.date,
    dateModified: article.value.reviewedAt || article.value.date,
    articleSection: article.value.category,
    keywords: article.value.tags.join(', '),
    inLanguage: 'zh-CN',
    about: article.value.tags.map((tag) => ({
      '@type': 'Thing',
      name: tag
    })),
    citation: article.value.sources?.map((source) => `${source.title}（${source.publisher}）`),
    isBasedOn: article.value.sources?.map((source) => ({
      '@type': 'CreativeWork',
      name: source.title,
      description: source.note,
      publisher: {
        '@type': 'Organization',
        name: source.publisher
      }
    })),
    author: {
      '@type': 'Organization',
      name: article.value.author
    },
    editor: article.value.reviewedBy
      ? {
          '@type': 'Organization',
          name: article.value.reviewedBy
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: '华云网业',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.ico`
      }
    }
  }
})

// Simple markdown → HTML renderer (headings, bold, code, tables, lists)
const renderedContent = computed(() => {
  if (!article.value?.content) return ''
  let html = article.value.content

  // Fenced code blocks
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')

  // Tables
  html = html.replace(/(\|.+\|\n)+/g, (table) => {
    const rows = table.trim().split('\n')
    const headerRow = rows[0]
    const bodyRows = rows.slice(2) // skip separator row
    const th = headerRow.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('')
    const trs = bodyRows.map(r => {
      const tds = r.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('')
      return `<tr>${tds}</tr>`
    }).join('')
    return `<table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>`
  })

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Unordered lists
  html = html.replace(/(^- .+\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('')
    return `<ul>${items}</ul>`
  })

  // Paragraphs (blank-line separated non-block content)
  html = html.replace(/\n\n(?!<)/g, '</p><p>')
  if (!html.startsWith('<')) html = '<p>' + html + '</p>'

  return html
})

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

usePageSeoMeta({
  title: article.value?.seoTitle || article.value?.title || '文章详情',
  description: article.value?.seoDescription || article.value?.summary || ''
})

useHead(() => ({
  script: articleJsonLd.value
    ? [
        {
          key: 'article-jsonld',
          type: 'application/ld+json',
          textContent: JSON.stringify(articleJsonLd.value)
        }
      ]
    : []
}))
</script>
