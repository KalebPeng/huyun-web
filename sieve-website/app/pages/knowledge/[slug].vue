<template>
  <div v-if="article" class="page-shell">
    <section class="border-b border-brand-line/70 bg-white/85 backdrop-blur-sm">
      <div class="section-shell py-4">
        <nav class="flex items-center gap-2 text-sm text-brand-muted" :aria-label="$t('knowledgeDetail.breadcrumbAria')">
          <NuxtLink :to="localePath('/')" class="transition-colors hover:text-primary">{{ $t('nav.home') }}</NuxtLink>
          <span aria-hidden="true">/</span>
          <NuxtLink :to="localePath('/knowledge')" class="transition-colors hover:text-primary">{{ $t('nav.knowledge') }}</NuxtLink>
          <span aria-hidden="true">/</span>
          <span class="line-clamp-1 text-brand-ink">{{ article.title }}</span>
        </nav>
      </div>
    </section>

    <PageHero
      :eyebrow="article.category"
      :title="article.title"
      :description="article.summary"
    >
      <template #aside>
        <div class="surface-card-soft p-6">
          <div class="flex flex-wrap items-center gap-3">
            <span class="rounded-full bg-brand-surface-strong px-3 py-1 text-xs font-semibold text-primary">
              {{ article.category }}
            </span>
            <time :datetime="article.publishedAt" class="mono-meta text-brand-muted">
              {{ formatDate(article.publishedAt) }}
            </time>
          </div>
          <div class="mt-5 space-y-4 text-sm text-brand-muted">
            <p>{{ article.author }}</p>
            <p>{{ $t('knowledgeDetail.reviewedAt', { date: formatDate(article.reviewedAt || article.publishedAt) }) }}</p>
            <p>{{ $t('knowledgeDetail.reviewedBy', { team: article.reviewedBy || article.author }) }}</p>
          </div>
          <NuxtLink
            :to="localePath('/content-standards')"
            class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            {{ $t('knowledgeDetail.reviewStandardsLink') }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </template>
    </PageHero>

    <section class="page-section">
      <div class="section-shell lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <article itemscope itemtype="https://schema.org/TechArticle">
          <div class="surface-card p-6 sm:p-8">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags || []"
                :key="tag"
                class="rounded-full border border-brand-line bg-brand-surface-strong px-3 py-1 text-xs text-brand-muted"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div class="surface-card-inset p-5">
                <p class="eyebrow">{{ $t('knowledgeDetail.sourcesTitle') }}</p>
                <ul class="mt-4 space-y-3">
                  <li
                    v-for="source in article.sources || []"
                    :key="source.title"
                    class="rounded-2xl border border-brand-line bg-white px-4 py-4"
                  >
                    <p class="text-sm font-semibold text-brand-ink">{{ source.title }}</p>
                    <p class="mt-1 text-xs text-brand-muted">{{ source.publisher }}</p>
                    <p class="mt-2 text-xs leading-6 text-brand-muted">{{ source.note }}</p>
                  </li>
                </ul>
              </div>

              <div class="space-y-4">
                <div class="surface-card-inset p-5">
                  <p class="eyebrow-soft">{{ $t('knowledgeDetail.boundaryTitle') }}</p>
                  <p class="mt-4 text-sm leading-7 text-brand-muted">{{ article.applicability }}</p>
                </div>

                <div class="surface-card-inset p-5">
                  <p class="eyebrow-soft">{{ $t('knowledgeDetail.aboutLink') }}</p>
                  <NuxtLink
                    :to="localePath('/about')"
                    class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                  >
                    {{ $t('knowledgeDetail.aboutLink') }}
                    <span aria-hidden="true">→</span>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <hr class="my-8 border-brand-line">

            <ContentRenderer
              :value="article"
              tag="div"
              class="article-prose prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-brand-ink prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-6 prose-h3:text-lg prose-p:leading-8 prose-p:text-brand-muted prose-strong:text-brand-ink prose-code:rounded prose-code:bg-brand-surface-strong prose-code:px-1.5 prose-code:py-0.5 prose-code:text-accent prose-pre:rounded-[1.5rem] prose-pre:bg-[#10233A] prose-pre:text-slate-100 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:font-semibold"
            />

            <div class="mt-12 flex flex-col gap-4 border-t border-brand-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <NuxtLink
                :to="localePath('/knowledge')"
                class="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition-colors hover:text-primary"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {{ $t('knowledgeDetail.backToList') }}
              </NuxtLink>
              <AppButton to="/contact" size="md">
                {{ $t('knowledgeDetail.contactCta') }}
              </AppButton>
            </div>
          </div>
        </article>

        <aside class="mt-8 lg:mt-0">
          <div class="sticky top-28 flex flex-col gap-5">
            <div v-if="relatedArticles.length" class="surface-card p-5">
              <h3 class="text-lg font-semibold text-brand-ink">{{ $t('knowledgeDetail.relatedTitle') }}</h3>
              <ul class="mt-4 flex flex-col gap-4">
                <li v-for="related in relatedArticles" :key="related.path">
                  <NuxtLink :to="related.path" class="group flex flex-col gap-1">
                    <span class="mono-meta text-primary">{{ related.category }}</span>
                    <span class="line-clamp-2 text-sm leading-7 text-brand-ink transition-colors group-hover:text-primary">
                      {{ related.title }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="surface-card p-5">
              <p class="eyebrow">{{ $t('knowledgeDetail.quoteBoxTitle') }}</p>
              <p class="mt-4 text-sm leading-7 text-brand-muted">
                {{ $t('knowledgeDetail.quoteBoxDescription') }}
              </p>
              <AppButton to="/contact" size="md" class="mt-5 w-full">
                {{ $t('common.getQuote') }}
              </AppButton>
            </div>

            <div class="surface-card p-5">
              <p class="eyebrow-soft">{{ $t('knowledgeDetail.toolsTitle') }}</p>
              <p class="mt-4 text-sm leading-7 text-brand-muted">
                {{ $t('knowledgeDetail.toolsDescription') }}
              </p>
              <AppButton to="/tools" variant="outline" size="md" class="mt-5 w-full">
                {{ $t('knowledgeDetail.toolsCta') }}
              </AppButton>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>

  <div v-else class="page-shell">
    <section class="page-section">
      <div class="section-shell">
        <div class="surface-card flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <p class="text-5xl font-semibold text-brand-line">404</p>
          <p class="text-lg font-semibold text-brand-ink">{{ $t('knowledgeDetail.notFoundTitle') }}</p>
          <NuxtLink :to="localePath('/knowledge')" class="text-sm font-semibold text-primary hover:underline">
            {{ $t('knowledgeDetail.backToList') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppButton from '~/components/common/AppButton.vue'
import PageHero from '~/components/common/PageHero.vue'
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
