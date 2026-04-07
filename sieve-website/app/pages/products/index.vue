<template>
  <div class="page-shell">
    <PageHero
      :eyebrow="$t('productsPage.eyebrow')"
      :title="$t('productsPage.title')"
      :description="$t('productsPage.description')"
    />

    <section class="page-section pb-8">
      <div class="section-shell">
        <div
          class="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          :aria-label="$t('productsPage.filterAria')"
        >
          <div class="inline-flex min-w-full gap-3 sm:min-w-0 sm:flex-wrap">
            <button
              v-for="tab in categoryTabs"
              :key="tab.value"
              type="button"
              class="filter-chip"
              :class="tab.value === activeCategory ? 'filter-chip-active' : 'filter-chip-idle'"
              :aria-pressed="tab.value === activeCategory"
              @click="handleCategoryChange(tab.value)"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
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
          class="surface-card px-6 py-16 text-center"
        >
          <p class="text-lg font-semibold text-brand-ink">
            {{ $t('productsPage.emptyTitle') }}
          </p>
          <p class="mt-3 text-sm leading-7 text-brand-muted">
            {{ $t('productsPage.emptyDescription') }}
          </p>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <CtaBand
          :eyebrow="$t('productsPage.eyebrow')"
          :title="$t('productsPage.ctaTitle')"
          :description="$t('productsPage.ctaDescription')"
          primary-to="/contact"
          :primary-label="$t('common.getQuote')"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

import CtaBand from '~/components/common/CtaBand.vue'
import PageHero from '~/components/common/PageHero.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

const allCategoryValue = '__all__'

interface CategoryTab {
  label: string
  value: string
}

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const { fetchProducts } = useProducts()
const { data: productsData } = await useAsyncData(
  () => `products-list:${locale.value}`,
  fetchProducts,
  {
    default: () => [],
    watch: [locale]
  }
)

const categoryTabs = computed<CategoryTab[]>(() => {
  const categories = [...new Set(productsData.value.map((product) => product.category))]

  return [
    { label: t('productsPage.categories.all'), value: allCategoryValue },
    ...categories.map((category) => ({
      label: category,
      value: category
    }))
  ]
})

const validCategoryValues = computed(() => new Set(categoryTabs.value.map((tab) => tab.value)))

const normalizeCategory = (value: unknown): string => {
  if (typeof value !== 'string') {
    return allCategoryValue
  }

  return validCategoryValues.value.has(value) ? value : allCategoryValue
}

const activeCategory = computed(() => normalizeCategory(route.query.category))

const filteredProducts = computed(() => {
  if (activeCategory.value === allCategoryValue) {
    return productsData.value
  }

  return productsData.value.filter((product) => product.category === activeCategory.value)
})

const updateCategoryQuery = async (category: string) => {
  const nextQuery = { ...route.query }

  if (category === allCategoryValue) {
    delete nextQuery.category
  } else {
    nextQuery.category = category
  }

  await router.replace({ query: nextQuery })
}

const handleCategoryChange = (category: string) => {
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

    if ((normalized === allCategoryValue && current === undefined) || current === normalized) {
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
