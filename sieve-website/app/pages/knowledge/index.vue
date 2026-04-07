<template>
  <div class="page-shell">
    <PageHero
      :eyebrow="$t('knowledgePage.eyebrow')"
      :title="$t('knowledgePage.title')"
      :description="$t('knowledgePage.description')"
    >
      <div class="max-w-2xl">
        <label for="knowledge-search" class="sr-only">{{ $t('knowledgePage.searchPlaceholder') }}</label>
        <div class="field-wrap-light gap-3 pr-3">
          <svg class="h-5 w-5 shrink-0 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            id="knowledge-search"
            v-model.trim="searchKeyword"
            type="search"
            :placeholder="$t('knowledgePage.searchPlaceholder')"
            class="w-full border-0 bg-transparent px-0 text-sm text-brand-ink outline-none placeholder:text-slate-400"
          >
        </div>
      </div>
    </PageHero>

    <section class="page-section pb-8">
      <div class="section-shell">
        <div
          class="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          :aria-label="$t('knowledgePage.categories.all')"
        >
          <div class="inline-flex min-w-full gap-3 sm:min-w-0 sm:flex-wrap">
            <button
              v-for="tab in categoryTabs"
              :key="tab.value"
              type="button"
              class="filter-chip"
              :class="activeCategory === tab.value ? 'filter-chip-active' : 'filter-chip-idle'"
              @click="activeCategory = tab.value"
            >
              {{ tab.label }}
              <span class="ml-1 text-xs opacity-60">{{ tabCount(tab.value) }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <p v-if="searchKeyword" class="mb-6 text-sm text-brand-muted">
          {{ $t('knowledgePage.searchResult', { keyword: searchKeyword, count: filteredArticles.length }) }}
        </p>

        <div v-if="filteredArticles.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="article in filteredArticles"
            :key="article.path"
            :to="article.path"
            class="group surface-card flex flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
          >
            <div class="flex items-center justify-between gap-3">
              <span class="rounded-full bg-brand-surface-strong px-3 py-1 text-xs font-semibold text-primary">
                {{ article.category }}
              </span>
              <time class="mono-meta text-brand-muted" :datetime="article.publishedAt">
                {{ formatDate(article.publishedAt) }}
              </time>
            </div>

            <h2 class="mt-5 line-clamp-2 text-xl font-semibold tracking-tight text-brand-ink transition-colors group-hover:text-primary">
              {{ article.title }}
            </h2>
            <p class="mt-4 flex-1 line-clamp-3 text-sm leading-7 text-brand-muted">
              {{ article.summary }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in (article.tags || []).slice(0, 3)"
                :key="tag"
                class="rounded-full border border-brand-line bg-white px-3 py-1 text-xs text-brand-muted"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
              {{ $t('knowledgePage.readMore') }}
              <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>

        <div
          v-else
          class="surface-card px-6 py-20 text-center"
        >
          <p class="text-lg font-semibold text-brand-ink">{{ $t('knowledgePage.emptyTitle') }}</p>
          <p class="mt-3 text-sm leading-7 text-brand-muted">{{ $t('knowledgePage.emptyDescription') }}</p>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <CtaBand
          :eyebrow="$t('knowledgePage.eyebrow')"
          :title="$t('knowledgePage.ctaTitle')"
          :description="$t('knowledgePage.ctaDescription')"
          primary-to="/contact"
          :primary-label="$t('common.contactUs')"
          secondary-to="/tools"
          :secondary-label="$t('knowledgePage.toolsCta')"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import CtaBand from '~/components/common/CtaBand.vue'
import PageHero from '~/components/common/PageHero.vue'
import { useArticles } from '~/composables/useArticles'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

const { getAllArticles } = useArticles()
const { t, locale } = useI18n()
const { data } = await useAsyncData(
  () => `knowledge-articles:${locale.value}`,
  () => getAllArticles(),
  {
    watch: [locale]
  }
)

const allCategoryValue = '__all__'
const articles = computed(() => data.value || [])
const searchKeyword = ref('')
const activeCategory = ref(allCategoryValue)

const allCategories = computed(() => {
  const categories = new Set(articles.value.map(article => article.category))
  return [allCategoryValue, ...categories]
})

const categoryTabs = computed(() => allCategories.value.map((category) => ({
  label: category === allCategoryValue ? t('knowledgePage.categories.all') : category,
  value: category
})))

const tabCount = (category: string) => {
  if (category === allCategoryValue) {
    return articles.value.length
  }

  return articles.value.filter(article => article.category === category).length
}

const filteredArticles = computed(() => {
  const keyword = searchKeyword.value.toLowerCase()
  const keywordMatches = keyword
    ? articles.value.filter(article =>
        `${article.title} ${article.summary} ${(article.tags || []).join(' ')}`
          .toLowerCase()
          .includes(keyword)
      )
    : articles.value

  if (keyword) {
    return keywordMatches
  }

  if (activeCategory.value !== allCategoryValue) {
    return keywordMatches.filter(article => article.category === activeCategory.value)
  }

  return keywordMatches
})

const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateStr))
}

usePageSeoMeta({
  title: t('knowledgePage.seo.title'),
  description: t('knowledgePage.seo.description')
})
</script>
