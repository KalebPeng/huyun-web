<template>
  <div class="bg-slate-50">
    <section class="bg-[linear-gradient(135deg,#111827,#1a2744)] py-16 text-white sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
          Products
        </p>
        <h1 class="mt-4 text-4xl font-black sm:text-5xl">
          产品中心
        </h1>
        <p class="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
          覆盖编织网、电焊网、轧花网、矿筛网和过滤网片等产品类型，支持多规格选型与非标定制。
        </p>
      </div>
    </section>

    <section class="py-8 sm:py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          aria-label="产品分类筛选"
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
            暂无该分类产品
          </p>
          <p class="mt-3 text-sm leading-7 text-slate-500">
            可以先提交询价需求，我们会根据材质、孔径和尺寸帮您推荐合适方案。
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
                规格拿不准？
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                告诉我们使用场景、材质要求和目标尺寸，48 小时内给您匹配产品建议和报价。
              </p>
            </div>

            <AppButton
              to="/contact"
              size="lg"
              aria-label="前往询价页面"
              class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
            >
              立即询价
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
const { products } = useProducts()

const categoryTabs: CategoryTab[] = [
  { label: '全部', value: 'all' },
  { label: '编织网', value: 'woven' },
  { label: '电焊网', value: 'welded' },
  { label: '轧花网', value: 'crimped' },
  { label: '矿筛网', value: 'mining' },
  { label: '过滤网片', value: 'filter-disc' }
]

const validCategoryValues = new Set<CategoryKey>(categoryTabs.map((tab) => tab.value))

const normalizeCategory = (value: unknown): CategoryKey => {
  if (typeof value !== 'string') {
    return 'all'
  }

  return validCategoryValues.has(value as CategoryKey) ? (value as CategoryKey) : 'all'
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
    return products.value
  }

  return products.value.filter(
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
  title: '产品中心',
  description:
    '产品中心汇集不锈钢编织网、电焊网、轧花网、矿筛网与过滤网片，支持多规格选型与定制加工。'
})
</script>
