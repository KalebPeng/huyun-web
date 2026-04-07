<template>
  <div class="page-shell">
    <PageHero
      :eyebrow="$t('nav.faq')"
      :title="$t('faqPage.title')"
      :description="$t('faqPage.description')"
    >
      <div class="max-w-2xl">
        <label for="faq-search" class="sr-only">{{ $t('faqPage.searchLabel') }}</label>
        <div class="field-wrap-light gap-3 pr-3">
          <svg class="h-5 w-5 shrink-0 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
          <input
            id="faq-search"
            v-model.trim="searchKeyword"
            type="search"
            :placeholder="$t('faqPage.searchPlaceholder')"
            class="w-full border-0 bg-transparent px-0 text-sm text-brand-ink outline-none placeholder:text-slate-400"
            :aria-label="$t('faqPage.searchAria')"
          >
        </div>
      </div>
    </PageHero>

    <section class="page-section pb-8">
      <div class="section-shell">
        <div
          class="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          :aria-label="$t('faqPage.filterAria')"
        >
          <div class="inline-flex min-w-full gap-3 sm:min-w-0 sm:flex-wrap">
            <button
              v-for="tab in categoryTabs"
              :key="tab.value"
              type="button"
              class="filter-chip"
              :class="tab.value === activeCategory ? 'filter-chip-active' : 'filter-chip-idle'"
              :aria-pressed="tab.value === activeCategory"
              @click="activeCategory = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <p v-if="searchKeyword" class="mt-5 text-sm text-brand-muted">
          {{ $t('faqPage.searching', { keyword: searchKeyword }) }}
        </p>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <FaqAccordion
          v-if="filteredFaqs.length"
          :items="filteredFaqs"
        />

        <div
          v-else
          class="surface-card px-6 py-16 text-center"
        >
          <p class="text-lg font-semibold text-brand-ink">
            {{ $t('faqPage.emptyTitle') }}
          </p>
          <p class="mt-3 text-sm leading-7 text-brand-muted">
            {{ $t('faqPage.emptyDescription') }}
          </p>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <CtaBand
          :eyebrow="$t('nav.faq')"
          :title="$t('faqPage.ctaTitle')"
          :description="$t('faqPage.ctaDescription')"
          primary-to="/contact"
          :primary-label="$t('common.contactUs')"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import CtaBand from '~/components/common/CtaBand.vue'
import FaqAccordion from '~/components/common/FaqAccordion.vue'
import PageHero from '~/components/common/PageHero.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'
import type { FAQ } from '~~/types'

type FaqCategoryKey =
  | 'all'
  | 'spec'
  | 'material'
  | 'custom'
  | 'quote'
  | 'delivery'
  | 'sample'

interface CategoryTab {
  label: string
  value: FaqCategoryKey
}

const { faqs } = useFaq()
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
const { t, localeProperties } = useI18n()

const searchKeyword = ref('')
const activeCategory = ref<FaqCategoryKey>('all')

const categoryTabs = computed<CategoryTab[]>(() => [
  { label: t('faqPage.categories.all'), value: 'all' },
  { label: t('faqPage.categories.spec'), value: 'spec' },
  { label: t('faqPage.categories.material'), value: 'material' },
  { label: t('faqPage.categories.custom'), value: 'custom' },
  { label: t('faqPage.categories.quote'), value: 'quote' },
  { label: t('faqPage.categories.delivery'), value: 'delivery' },
  { label: t('faqPage.categories.sample'), value: 'sample' }
])

const resolveCategory = (faq: FAQ): FaqCategoryKey => {
  if (faq.id.startsWith('faq-spec-')) return 'spec'
  if (faq.id.startsWith('faq-material-')) return 'material'
  if (faq.id.startsWith('faq-custom-')) return 'custom'
  if (faq.id.startsWith('faq-quote-')) return 'quote'
  if (faq.id.startsWith('faq-delivery-')) return 'delivery'
  if (faq.id.startsWith('faq-sample-')) return 'sample'
  return 'all'
}

const searchedFaqs = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()

  if (!keyword) {
    return faqs.value
  }

  return faqs.value.filter((faq) => {
    const content = `${faq.question} ${faq.answer}`.toLowerCase()
    return content.includes(keyword)
  })
})

const filteredFaqs = computed(() => {
  if (searchKeyword.value.trim()) {
    return searchedFaqs.value
  }

  if (activeCategory.value === 'all') {
    return faqs.value
  }

  return faqs.value.filter((faq) => resolveCategory(faq) === activeCategory.value)
})

const faqJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntityOfPage: `${siteUrl}/faq`,
  inLanguage: localeProperties.value.language || 'en',
  mainEntity: faqs.value.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}))

usePageSeoMeta({
  title: t('faqPage.seo.title'),
  description: t('faqPage.seo.description')
})

useHead(() => ({
  script: [
    {
      key: 'faq-jsonld',
      type: 'application/ld+json',
      textContent: JSON.stringify(faqJsonLd.value)
    }
  ]
}))
</script>
