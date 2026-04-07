<template>
  <div v-if="article" class="min-h-screen bg-[#f8f9fb]">
    <div class="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center gap-2 py-3 text-sm text-slate-500" :aria-label="$t('knowledgeDetail.breadcrumbAria')">
          <NuxtLink :to="localePath('/')" class="transition-colors hover:text-primary">{{ $t('nav.home') }}</NuxtLink>
          <span class="text-slate-300">/</span>
          <NuxtLink :to="localePath('/knowledge')" class="transition-colors hover:text-primary">{{ $t('nav.knowledge') }}</NuxtLink>
          <span class="text-slate-300">/</span>
          <span class="line-clamp-1 text-slate-700">{{ article.title }}</span>
        </nav>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
        <article itemscope itemtype="https://schema.org/TechArticle">
          <header>
            <div class="flex flex-wrap items-center gap-3">
              <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-accent">
                {{ article.category }}
              </span>
              <time
                :datetime="article.publishedAt"
                class="text-xs text-slate-400"
                itemprop="datePublished"
              >
                {{ formatDate(article.publishedAt) }}
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

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags || []"
                :key="tag"
                class="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-accent">{{ $t('knowledgeDetail.sourcesTitle') }}</p>
                <ul class="mt-3 space-y-3">
                  <li
                    v-for="source in article.sources || []"
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
                  <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{{ $t('knowledgeDetail.reviewTitle') }}</p>
                  <p class="mt-3 text-sm font-semibold text-slate-900">{{ article.author }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ $t('knowledgeDetail.reviewedAt', { date: formatDate(article.reviewedAt || article.publishedAt) }) }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ $t('knowledgeDetail.reviewedBy', { team: article.reviewedBy || article.author }) }}</p>
                  <NuxtLink
                    :to="localePath('/content-standards')"
                    class="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors hover:text-primary"
                  >
                    {{ $t('knowledgeDetail.reviewStandardsLink') }}
                    <span aria-hidden="true">-></span>
                  </NuxtLink>
                </div>

                <div class="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{{ $t('knowledgeDetail.boundaryTitle') }}</p>
                  <p class="mt-3 text-sm leading-7 text-slate-600">{{ article.applicability }}</p>
                </div>

                <NuxtLink
                  :to="localePath('/about')"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-primary"
                >
                  {{ $t('knowledgeDetail.aboutLink') }}
                  <span aria-hidden="true">-></span>
                </NuxtLink>
              </div>
            </div>
          </header>

          <hr class="my-8 border-slate-200">

          <ContentRenderer
            :value="article"
            tag="div"
            class="prose prose-slate max-w-none prose-headings:font-black prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-xl prose-h3:mb-2 prose-h3:mt-6 prose-h3:text-base prose-p:leading-8 prose-p:text-slate-700 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-accent prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:text-sm prose-pre:text-slate-100 prose-strong:text-slate-900 prose-table:text-sm prose-td:py-2 prose-th:py-2 prose-th:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
          />

          <div class="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
            <NuxtLink
              :to="localePath('/knowledge')"
              class="flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-primary"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {{ $t('knowledgeDetail.backToList') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/contact')"
              class="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              {{ $t('knowledgeDetail.contactCta') }}
            </NuxtLink>
          </div>
        </article>

        <aside class="mt-12 lg:mt-0">
          <div class="sticky top-28 flex flex-col gap-6">
            <div v-if="relatedArticles.length" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 class="text-sm font-bold text-slate-900">{{ $t('knowledgeDetail.relatedTitle') }}</h3>
              <ul class="mt-4 flex flex-col gap-4">
                <li v-for="related in relatedArticles" :key="related.path">
                  <NuxtLink :to="related.path" class="group flex flex-col gap-1">
                    <span class="text-xs font-semibold text-accent">{{ related.category }}</span>
                    <span class="line-clamp-2 text-sm font-medium leading-snug text-slate-800 transition-colors group-hover:text-accent">
                      {{ related.title }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="rounded-2xl bg-[linear-gradient(135deg,#1a2744,#243f72)] p-5 text-white">
              <p class="text-sm font-bold">{{ $t('knowledgeDetail.quoteBoxTitle') }}</p>
              <p class="mt-2 text-xs leading-6 text-slate-300">
                {{ $t('knowledgeDetail.quoteBoxDescription') }}
              </p>
              <NuxtLink
                :to="localePath('/contact')"
                class="mt-4 flex items-center justify-center rounded-xl bg-white py-2.5 text-sm font-bold text-primary transition-colors hover:bg-slate-100"
              >
                {{ $t('common.getQuote') }}
              </NuxtLink>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p class="text-sm font-bold text-slate-900">{{ $t('knowledgeDetail.toolsTitle') }}</p>
              <p class="mt-2 text-xs leading-6 text-slate-500">
                {{ $t('knowledgeDetail.toolsDescription') }}
              </p>
              <NuxtLink
                :to="localePath('/tools')"
                class="mt-4 flex items-center justify-center rounded-xl border border-accent py-2.5 text-sm font-bold text-accent transition-colors hover:bg-blue-50"
              >
                {{ $t('knowledgeDetail.toolsCta') }}
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <div v-else class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p class="text-5xl font-black text-slate-200">404</p>
    <p class="text-lg font-bold text-slate-900">{{ $t('knowledgeDetail.notFoundTitle') }}</p>
    <NuxtLink :to="localePath('/knowledge')" class="text-sm text-accent hover:underline">{{ $t('knowledgeDetail.backToList') }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useArticles } from '~/composables/useArticles'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
const localePath = useLocalePath()
const articlePath = computed(() => route.path.replace(/\/+$/, '') || '/')
const { getArticleByPath, getArticlesByCategory } = useArticles()
const { t, locale, localeProperties } = useI18n()

const { data: articleData } = await useAsyncData(
  () => `knowledge-article:${articlePath.value}`,
  () => getArticleByPath(articlePath.value),
  {
    watch: [articlePath]
  }
)

const article = computed(() => articleData.value)

if (!article.value) {
  setResponseStatus(404, 'Article Not Found')
}

const { data: relatedData } = await useAsyncData(
  () => `knowledge-related:${articlePath.value}`,
  async () => {
    if (!article.value?.category) {
      return []
    }

    const related = await getArticlesByCategory(article.value.category, articlePath.value)
    return related.slice(0, 3)
  },
  {
    watch: [articlePath]
  }
)

const relatedArticles = computed(() => relatedData.value || [])

const articleJsonLd = computed(() => {
  if (!article.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.value.title,
    description: article.value.seoDescription || article.value.summary,
    mainEntityOfPage: `${siteUrl}${article.value.path}`,
    datePublished: article.value.publishedAt,
    dateModified: article.value.reviewedAt || article.value.publishedAt,
    articleSection: article.value.category,
    keywords: (article.value.tags || []).join(', '),
    inLanguage: localeProperties.value.language || 'en',
    publishingPrinciples: `${siteUrl}${localePath('/content-standards')}`,
    about: (article.value.tags || []).map(tag => ({
      '@type': 'Thing',
      name: tag
    })),
    citation: (article.value.sources || []).map((source) => `${source.title} (${source.publisher})`),
    isBasedOn: (article.value.sources || []).map(source => ({
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
      name: t('brand.name'),
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.ico`
      }
    }
  }
})

const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateStr))
}

usePageSeoMeta({
  title: article.value?.seoTitle || article.value?.title || t('knowledgeDetail.fallbackTitle'),
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

