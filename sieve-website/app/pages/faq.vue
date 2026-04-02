<template>
  <div class="bg-slate-50">
    <section class="bg-[linear-gradient(135deg,#111827,#1a2744)] py-16 text-white sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
          FAQ
        </p>
        <h1 class="mt-4 text-4xl font-black sm:text-5xl">
          常见问题
        </h1>
        <p class="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
          找不到答案？直接联系我们，我们会根据产品规格、使用场景和工况要求给您更具体的建议。
        </p>

        <div class="mt-8 max-w-2xl">
          <label for="faq-search" class="sr-only">搜索常见问题</label>
          <div class="relative">
            <input
              id="faq-search"
              v-model.trim="searchKeyword"
              type="search"
              placeholder="搜索问题或答案关键词"
              class="min-h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-5 pr-12 text-base text-white placeholder:text-slate-300 backdrop-blur-sm outline-none transition-colors duration-200 focus:border-white/40"
              aria-label="搜索常见问题"
            >
            <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" aria-hidden="true">
              ⌕
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8 sm:py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          aria-label="FAQ 分类筛选"
        >
          <div class="inline-flex min-w-full gap-3 sm:min-w-0 sm:flex-wrap">
            <button
              v-for="tab in categoryTabs"
              :key="tab.value"
              type="button"
              class="min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              :class="tab.value === activeCategory
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary'"
              :aria-pressed="tab.value === activeCategory"
              @click="activeCategory = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <p
          v-if="searchKeyword"
          class="mt-4 text-sm text-slate-500"
        >
          正在搜索“{{ searchKeyword }}”，此时会忽略分类筛选并显示全部匹配结果。
        </p>
      </div>
    </section>

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FaqAccordion
          v-if="filteredFaqs.length"
          :items="filteredFaqs"
        />

        <div
          v-else
          class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm"
        >
          <p class="text-lg font-bold text-slate-900">
            暂无匹配问题
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-500">
            可以换个关键词再试试，或者直接联系我们获取人工答复。
          </p>
        </div>
      </div>
    </section>

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-2xl font-black sm:text-3xl">
                还有其他问题？
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                把您的工况、材质和尺寸要求发给我们，沟通清楚比瞎猜快得多。
              </p>
            </div>

            <AppButton
              to="/contact"
              size="lg"
              aria-label="前往联系我们页面"
              class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
            >
              联系我们
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'
import FaqAccordion from '~/components/common/FaqAccordion.vue'
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

const searchKeyword = ref('')
const activeCategory = ref<FaqCategoryKey>('all')

const categoryTabs: CategoryTab[] = [
  { label: '全部', value: 'all' },
  { label: '产品规格', value: 'spec' },
  { label: '材质选择', value: 'material' },
  { label: '定制问题', value: 'custom' },
  { label: '报价问题', value: 'quote' },
  { label: '发货交期', value: 'delivery' },
  { label: '样品问题', value: 'sample' }
]

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
  inLanguage: 'zh-CN',
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
  title: '常见问题',
  description:
    '查看产品规格、材质选择、定制加工、报价交期和样品安排等常见问题，快速获取筛网选型与采购答疑。'
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
