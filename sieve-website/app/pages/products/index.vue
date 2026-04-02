<template>
  <div class="bg-slate-50">
    <section class="bg-[linear-gradient(135deg,#111827,#1a2744)] py-16 text-white sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
          {{ $t('productsPage.eyebrow') }}
        </p>
        <h1 class="mt-4 text-4xl font-black sm:text-5xl">
          {{ $t('productsPage.title') }}
        </h1>
        <p class="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
          {{ $t('productsPage.description') }}
        </p>
      </div>
    </section>

    <section class="py-8 sm:py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          :aria-label="$t('productsPage.filterAria')"
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
              @click="handleCategoryChange(tab.value)"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          v-if="filteredProducts.length"
          class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div
          v-else
          class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm"
        >
          <p class="text-lg font-bold text-slate-900">
            {{ $t('productsPage.emptyTitle') }}
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-500">
            {{ $t('productsPage.emptyDescription') }}
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
                {{ $t('productsPage.ctaTitle') }}
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                {{ $t('productsPage.ctaDescription') }}
              </p>
            </div>

            <AppButton
              to="/contact"
              size="lg"
              :aria-label="$t('productsPage.ctaAria')"
              class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
            >
              {{ $t('common.getQuote') }}
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'
import ProductCard from '~/components/product/ProductCard.vue'

type CategoryKey = 'all' | 'woven' | 'welded' | 'crimped' | 'mining' | 'filter-disc'

interface CategoryTab {
  label: string
  value: CategoryKey
}

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { fetchProducts } = useProducts()
const { data: productsData } = await useAsyncData('products-list', fetchProducts, {
  default: () => []
})

const categoryTabs = computed<CategoryTab[]>(() => [
  { label: t('productsPage.categories.all'), value: 'all' },
  { label: t('productsPage.categories.woven'), value: 'woven' },
  { label: t('productsPage.categories.welded'), value: 'welded' },
  { label: t('productsPage.categories.crimped'), value: 'crimped' },
  { label: t('productsPage.categories.mining'), value: 'mining' },
  { label: t('productsPage.categories.filterDisc'), value: 'filter-disc' }
])

const validCategoryValues = computed(() => new Set<CategoryKey>(categoryTabs.value.map((tab) => tab.value)))

const normalizeCategory = (value: unknown): CategoryKey => {
  if (typeof value !== 'string') {
    return 'all'
  }

  return validCategoryValues.value.has(value as CategoryKey) ? (value as CategoryKey) : 'all'
}

const resolveProductCategory = (slug: string): CategoryKey => {
  if (slug === 'stainless-woven-mesh') return 'woven'
  if (slug === 'welded-wire-mesh') return 'welded'
  if (slug === 'crimped-wire-mesh') return 'crimped'
  if (slug === 'mine-screen-mesh') return 'mining'
  if (slug === 'filter-disc') return 'filter-disc'
  return 'all'
}

const activeCategory = computed(() => normalizeCategory(route.query.category))

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return productsData.value
  }

  return productsData.value.filter(
    (product) => resolveProductCategory(product.slug) === activeCategory.value
  )
})

const updateCategoryQuery = async (category: CategoryKey) => {
  const nextQuery = { ...route.query }

  if (category === 'all') {
    delete nextQuery.category
  } else {
    nextQuery.category = category
  }

  await router.replace({ query: nextQuery })
}

const handleCategoryChange = (category: CategoryKey) => {
  if (category === activeCategory.value) {
    return
  }

  void updateCategoryQuery(category)
}

watch(
  () => route.query.category,
  (category) => {
    const normalized = normalizeCategory(category)
    const current = typeof category === 'string' ? category : undefined

    if ((normalized === 'all' && current === undefined) || current === normalized) {
      return
    }

    void updateCategoryQuery(normalized)
  },
  { immediate: true }
)

usePageSeoMeta({
  title: t('productsPage.seo.title'),
  description: t('productsPage.seo.description')
})
</script>
