<template>
  <div class="page-bg min-h-screen">
    <template v-if="product">
      <!-- 面包屑 -->
      <div class="breadcrumb-bar border-b border-slate-200/70 bg-white/80 backdrop-blur-sm">
        <div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav :aria-label="$t('productDetail.breadcrumbAria')" class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
            <NuxtLink :to="localePath('/')" class="transition-colors hover:text-primary">{{ $t('nav.home') }}</NuxtLink>
            <span aria-hidden="true" class="text-slate-300">/</span>
            <NuxtLink :to="localePath('/products')" class="transition-colors hover:text-primary">{{ $t('nav.products') }}</NuxtLink>
            <span aria-hidden="true" class="text-slate-300">/</span>
            <span class="font-medium text-slate-700">{{ product.name }}</span>
          </nav>
        </div>
      </div>

      <!-- ① 主信息区 -->
      <section class="py-10 sm:py-14">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-8 lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px]">

            <!-- 左：产品图 + 计算器 -->
            <div class="flex flex-col gap-6">
              <!-- 产品图 -->
              <div class="product-image-frame overflow-hidden rounded-2xl">
                <div class="relative aspect-[4/3] bg-slate-100">
                  <NuxtImg
                    v-if="!imageFailed"
                    :src="product.coverImage"
                    width="1200"
                    height="900"
                    :alt="$t('productDetail.imageAlt', { name: product.name })"
                    class="h-full w-full object-cover"
                    loading="eager"
                    placeholder
                    sizes="100vw lg:60vw"
                    @error="imageFailed = true"
                  />
                  <div
                    v-else
                    class="flex h-full w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#e8edf5_0%,#f4f4f0_100%)]"
                    :aria-label="$t('productDetail.imagePlaceholderAria', { name: product.name })"
                  >
                    <svg class="h-10 w-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span class="text-xs font-medium tracking-wide text-slate-400">{{ product.name }}</span>
                  </div>
                  <!-- 品类标签叠层 -->
                  <div class="absolute left-4 top-4">
                    <span class="inline-block rounded bg-primary/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      {{ product.category }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 计算器 -->
              <MeshCalculator />
            </div>

            <!-- 右：产品信息 -->
            <div class="flex flex-col">
              <p class="section-eyebrow">{{ product.category }}</p>
              <h1 class="mt-2 text-[2rem] font-black leading-tight text-slate-950 sm:text-[2.25rem]">
                {{ product.name }}
              </h1>

              <!-- 材质徽章 -->
              <div class="mt-4 flex flex-wrap gap-1.5">
                <Badge
                  v-for="material in product.materials.slice(0, 3)"
                  :key="material"
                  :label="material"
                  variant="default"
                />
                <Badge
                  v-if="product.customSupported"
                  :label="$t('productDetail.customSupported')"
                  variant="success"
                />
              </div>

              <p class="mt-4 text-[0.9375rem] leading-[1.8] text-slate-500">
                {{ product.summary }}
              </p>

              <!-- 快速规格 -->
              <div class="mt-6 grid grid-cols-3 gap-2.5">
                <div
                  v-for="item in quickSpecs"
                  :key="item.label"
                  class="quick-spec-card rounded-xl border border-slate-200 bg-white p-3"
                >
                  <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {{ item.label }}
                  </p>
                  <p class="mt-2 text-sm font-bold leading-snug text-slate-800">
                    {{ item.value }}
                  </p>
                </div>
              </div>

              <!-- 分隔线 -->
              <div class="my-6 border-t border-slate-100" />

              <!-- 操作按钮 -->
              <div class="flex flex-col gap-2.5 sm:flex-row">
                <AppButton
                  :to="`/contact?product=${product.slug}`"
                  size="lg"
                  class="flex-1"
                  :aria-label="$t('productDetail.quoteAria', { name: product.name })"
                >
                  {{ $t('common.getQuote') }}
                </AppButton>
                <a
                  href="tel:4001234567"
                  class="inline-flex flex-1 min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary/40 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  :aria-label="$t('productDetail.callAria', { name: product.name })"
                >
                  {{ $t('productDetail.callButton') }}
                </a>
              </div>

              <!-- 标准合规标签 -->
              <div v-if="product.standard" class="mt-5 flex flex-wrap items-center gap-2">
                <span class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{{ $t('productDetail.standardsLabel') }}</span>
                <span
                  v-for="std in product.standard.split(/[;；]/).filter(Boolean)"
                  :key="std"
                  class="inline-block rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-600"
                >
                  {{ std.trim() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ② 产品参数 -->
      <section class="pb-10 sm:pb-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="content-card rounded-2xl border border-slate-200 bg-white">
            <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <p class="section-eyebrow">{{ $t('productDetail.specificationsTitle') }}</p>
                <h2 class="mt-0.5 text-xl font-black text-slate-950">{{ $t('productDetail.specificationsTitle') }}</h2>
              </div>
            </div>

            <table
              class="min-w-full text-sm"
              itemscope
              itemtype="https://schema.org/Product"
            >
              <tbody class="divide-y divide-slate-100">
                <tr
                  v-for="row in specificationRows.filter(r => r.value !== '/')"
                  :key="row.label"
                  class="spec-row transition-colors duration-150 hover:bg-slate-50/70"
                  itemprop="additionalProperty"
                  itemscope
                  itemtype="https://schema.org/PropertyValue"
                >
                  <th
                    scope="row"
                    class="w-36 px-6 py-3.5 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-400 sm:w-44"
                    itemprop="name"
                  >
                    {{ row.label }}
                  </th>
                  <td class="px-6 py-3.5 font-medium text-slate-800" itemprop="value">
                    {{ row.value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ③ 技术选型建议 -->
      <section v-if="product.selectionGuide" class="pb-10 sm:pb-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <!-- 深色主题卡片 -->
          <div class="selection-card overflow-hidden rounded-2xl">
            <div class="px-6 py-5 sm:px-8">
              <p class="section-eyebrow-light">{{ $t('productDetail.selectionGuideTitle') }}</p>
              <h2 class="mt-1 text-xl font-black text-white">{{ $t('productDetail.selectionGuideTitle') }}</h2>
            </div>

            <!-- 四维评级 -->
            <div class="grid grid-cols-2 gap-px border-t border-white/8 bg-white/8 lg:grid-cols-4">
              <div
                v-for="dim in selectionDimensions"
                :key="dim.key"
                class="dim-cell bg-[#192340] px-5 py-4"
              >
                <p class="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  {{ dim.label }}
                </p>
                <div class="mt-3 flex items-end justify-between">
                  <div class="flex flex-col gap-1.5">
                    <div class="flex gap-1">
                      <span
                        v-for="n in 4"
                        :key="n"
                        class="rating-dot h-1.5 rounded-full transition-all"
                        :class="[n <= dim.score ? 'w-6 bg-accent' : 'w-3 bg-white/15']"
                      />
                    </div>
                    <span class="text-sm font-bold text-white">{{ dim.text }}</span>
                  </div>
                  <span class="text-2xl font-black tabular-nums text-white/15">{{ dim.score }}/4</span>
                </div>
              </div>
            </div>

            <!-- 力学参数条 -->
            <div
              v-if="product.tensileStrength || product.hardness"
              class="grid gap-px border-t border-white/8 bg-white/8 sm:grid-cols-2"
            >
              <div v-if="product.tensileStrength" class="bg-[#192340] px-5 py-3.5">
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{{ $t('productDetail.labels.tensileStrength') }}</span>
                <p class="mt-1 font-mono text-sm font-semibold text-slate-200">{{ product.tensileStrength }}</p>
              </div>
              <div v-if="product.hardness" class="bg-[#192340] px-5 py-3.5">
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{{ $t('productDetail.labels.hardnessIndex') }}</span>
                <p class="mt-1 font-mono text-sm font-semibold text-slate-200">{{ product.hardness }}</p>
              </div>
            </div>

            <!-- 选型说明 -->
            <div v-if="product.selectionGuide.note" class="border-t border-white/8 px-6 py-4 sm:px-8">
              <p class="text-sm leading-7 text-slate-400">
                {{ product.selectionGuide.note }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ④ 应用场景 -->
      <section class="pb-10 sm:pb-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="content-card rounded-2xl border border-slate-200 bg-white px-6 py-5 sm:px-8">
            <p class="section-eyebrow">{{ $t('productDetail.applicationsTitle') }}</p>
            <h2 class="mt-0.5 text-xl font-black text-slate-950">{{ $t('productDetail.applicationsTitle') }}</h2>
            <div class="mt-4 flex flex-wrap gap-2">
              <Badge
                v-for="application in applicationBadges"
                :key="application.id"
                :label="application.name"
                variant="primary"
              />
            </div>
            <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
              {{ applicationSummary }}
            </p>
          </div>
        </div>
      </section>

      <!-- ⑤ 产品优势 -->
      <section class="pb-10 sm:pb-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="adv-card overflow-hidden rounded-2xl px-6 py-5 sm:px-8">
            <p class="section-eyebrow-light">{{ $t('productDetail.advantagesTitle') }}</p>
            <h2 class="mt-0.5 text-xl font-black text-white">{{ $t('productDetail.advantagesTitle') }}</h2>

            <div class="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="(advantage, index) in product.advantages"
                :key="advantage"
                class="adv-item rounded-xl border border-white/8 p-4"
              >
                <span class="inline-block text-[10px] font-black tabular-nums tracking-[0.1em] text-accent">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <p class="mt-2 text-sm font-semibold leading-snug text-white">
                  {{ advantage }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- ⑥ 常见问题 -->
      <section class="pb-10 sm:pb-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="content-card rounded-2xl border border-slate-200 bg-white">
            <div class="border-b border-slate-100 px-6 py-4 sm:px-8">
              <p class="section-eyebrow">{{ $t('productDetail.faqTitle') }}</p>
              <h2 class="mt-0.5 text-xl font-black text-slate-950">{{ $t('productDetail.faqTitle') }}</h2>
            </div>

            <div v-if="relatedFaqs.length" class="divide-y divide-slate-100">
              <article v-for="faq in relatedFaqs" :key="faq.id">
                <button
                  type="button"
                  class="faq-btn flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors duration-150 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-8"
                  :aria-expanded="openFaqId === faq.id"
                  :aria-controls="`faq-panel-${faq.id}`"
                  @click="toggleFaq(faq.id)"
                >
                  <span class="text-sm font-semibold text-slate-800">{{ faq.question }}</span>
                  <span
                    class="faq-icon ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-200"
                    :class="openFaqId === faq.id ? 'rotate-45 border-accent/40 bg-accent/8 text-accent' : ''"
                    aria-hidden="true"
                  >
                    <svg class="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M6 1v10M1 6h10" />
                    </svg>
                  </span>
                </button>
                <div
                  v-show="openFaqId === faq.id"
                  :id="`faq-panel-${faq.id}`"
                  class="bg-slate-50/70 px-6 pb-4 pt-1 text-sm leading-7 text-slate-500 sm:px-8"
                >
                  {{ faq.answer }}
                </div>
              </article>
            </div>

            <div
              v-else
              class="px-6 py-10 text-center text-sm text-slate-400 sm:px-8"
            >
              {{ $t('productDetail.emptyFaq') }}
            </div>
          </div>
        </div>
      </section>

      <!-- ⑦ 关联产品 -->
      <section class="pb-16 sm:pb-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mb-6 flex items-end justify-between">
            <div>
              <p class="section-eyebrow">{{ $t('productDetail.relatedProductsTitle') }}</p>
              <h2 class="mt-0.5 text-xl font-black text-slate-950">{{ $t('productDetail.relatedProductsTitle') }}</h2>
            </div>
            <NuxtLink :to="localePath('/products')" class="text-xs font-semibold text-primary transition-colors hover:text-accent">
              {{ $t('productDetail.viewAllProducts') }}
            </NuxtLink>
          </div>

          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="related in relatedProducts"
              :key="related.id"
              class="related-card group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
            >
              <NuxtLink
                :to="localePath(`/products/${related.slug}`)"
                class="flex h-full flex-col"
                :aria-label="$t('productDetail.relatedDetailAria', { name: related.name })"
              >
                <div class="aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#e8edf5,#f4f4f0)]">
                  <NuxtImg
                    :src="related.coverImage"
                    width="640"
                    height="480"
                    :alt="`${related.name}`"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    sizes="100vw md:50vw xl:25vw"
                    placeholder
                  />
                </div>
                <div class="flex flex-1 flex-col p-4">
                  <h3 class="text-sm font-bold text-slate-800 transition-colors group-hover:text-primary">
                    {{ related.name }}
                  </h3>
                  <p class="summary-clamp mt-1.5 text-xs leading-6 text-slate-500">
                    {{ related.summary }}
                  </p>
                  <span class="mt-3 text-xs font-semibold text-accent">
                    {{ $t('productDetail.viewDetail') }}
                  </span>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="py-24">
      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p class="section-eyebrow">{{ $t('nav.products') }}</p>
        <h1 class="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
          {{ $t('productDetail.notFoundTitle') }}
        </h1>
        <p class="mt-5 text-sm leading-8 text-slate-500">
          {{ $t('productDetail.notFoundDescription') }}
        </p>
        <div class="mt-8 flex justify-center">
          <AppButton to="/products" size="lg" :aria-label="$t('productDetail.notFoundAria')">
            {{ $t('productDetail.notFoundButton') }}
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'
import Badge from '~/components/common/Badge.vue'
import type { FAQ, Product } from '~~/types'

interface SpecificationRow {
  label: string
  value: string
}

interface QuickSpec {
  label: string
  value: string
}

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const localePath = useLocalePath()
const { t, locale } = useI18n()
const { getProductBySlug, getProductsByIds, products } = useProducts()
const { getApplicationsByIds } = useApplications()
const { getFaqsByIds, getFaqsByProductId } = useFaq()

const openFaqId = ref<string | null>(null)
const imageFailed = ref(false)
const toAbsoluteUrl = (value: string) => {
  const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
  return value.startsWith('http') ? value : `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`
}

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const product = computed<Product | undefined>(() => {
  return slug.value ? getProductBySlug(slug.value) : undefined
})

if (!product.value) {
  setResponseStatus(404, 'Product Not Found')
}

const resolveDisplayValue = (value?: string | null) => {
  if (!value) {
    return '/'
  }

  const normalized = value.trim()
  return normalized.length ? normalized : '/'
}

const resolveWidth = (item?: Product) => {
  if (!item?.sizes?.length) {
    return '/'
  }

  const matchedSize = item.sizes.find((size) => /m\s*x\s*\d/i.test(size))
  return resolveDisplayValue(matchedSize ?? item.sizes[0])
}

const resolveWeaveMethod = (item?: Product) => {
  if (!item) {
    return '/'
  }

  const map: Record<string, string> = {
    'stainless-woven-mesh': t('productDetail.weaveMethods.woven'),
    'welded-wire-mesh': t('productDetail.weaveMethods.welded'),
    'crimped-wire-mesh': t('productDetail.weaveMethods.crimped'),
    'mine-screen-mesh': t('productDetail.weaveMethods.mining'),
    'filter-disc': t('productDetail.weaveMethods.filterDisc')
  }

  return map[item.slug] ?? '/'
}

const quickSpecs = computed<QuickSpec[]>(() => {
  if (!product.value) {
    return []
  }

  return [
    { label: t('productDetail.labels.meshRange'), value: resolveDisplayValue(product.value.meshRange) },
    { label: t('productDetail.labels.apertureRange'), value: resolveDisplayValue(product.value.apertureRange) },
    { label: t('productDetail.labels.primaryMaterial'), value: resolveDisplayValue(product.value.materials.slice(0, 2).join(' / ')) }
  ]
})

const specificationRows = computed<SpecificationRow[]>(() => {
  if (!product.value) {
    return []
  }

  return [
    { label: t('productDetail.labels.material'), value: resolveDisplayValue(product.value.materials.join(' / ')) },
    { label: t('productDetail.labels.wireDiameterRange'), value: resolveDisplayValue(product.value.wireDiameterRange) },
    { label: t('productDetail.labels.meshRange'), value: resolveDisplayValue(product.value.meshRange) },
    { label: t('productDetail.labels.apertureRange'), value: resolveDisplayValue(product.value.apertureRange) },
    { label: t('productDetail.labels.width'), value: resolveWidth(product.value) },
    { label: t('productDetail.labels.weaveMethod'), value: resolveWeaveMethod(product.value) },
    { label: t('productDetail.labels.tensileStrength'), value: resolveDisplayValue(product.value.tensileStrength) },
    { label: t('productDetail.labels.hardness'), value: resolveDisplayValue(product.value.hardness) },
    { label: t('productDetail.labels.referenceStandard'), value: resolveDisplayValue(product.value.standard) },
    { label: t('productDetail.labels.customSupport'), value: product.value.customSupported ? t('common.supported') : t('common.notSupported') }
  ]
})

type RatingLevel = 'low' | 'medium' | 'high' | 'excellent'

const ratingScore: Record<RatingLevel, number> = { low: 1, medium: 2, high: 3, excellent: 4 }
const ratingText: Record<RatingLevel, string> = {
  low: t('productDetail.rating.low'),
  medium: t('productDetail.rating.medium'),
  high: t('productDetail.rating.high'),
  excellent: t('productDetail.rating.excellent')
}
const ratingColor: Record<RatingLevel, string> = {
  low: 'bg-slate-400',
  medium: 'bg-blue-400',
  high: 'bg-blue-600',
  excellent: 'bg-accent'
}

const selectionDimensions = computed(() => {
  const guide = product.value?.selectionGuide
  if (!guide) return []

  const dims: Array<{ key: string; label: string; level: RatingLevel }> = [
    { key: 'abrasion', label: t('productDetail.selectionDimensions.abrasion'), level: guide.abrasion as RatingLevel },
    { key: 'corrosion', label: t('productDetail.selectionDimensions.corrosion'), level: guide.corrosion as RatingLevel },
    { key: 'temperature', label: t('productDetail.selectionDimensions.temperature'), level: guide.temperature as RatingLevel },
    { key: 'moisture', label: t('productDetail.selectionDimensions.moisture'), level: guide.moisture as RatingLevel }
  ]

  return dims.map((d) => ({
    ...d,
    score: ratingScore[d.level],
    text: ratingText[d.level],
    color: ratingColor[d.level]
  }))
})

const applicationBadges = computed(() => {
  if (!product.value) {
    return []
  }

  return getApplicationsByIds(product.value.applications)
})

const applicationSummary = computed(() => {
  if (!product.value) {
    return t('productDetail.unavailable')
  }

  if (!applicationBadges.value.length) {
    return product.value.description
  }

  const names = applicationBadges.value.map((item) => item.name).join(locale.value === 'zh' ? '、' : ', ')
  return t('productDetail.applicationSummary', {
    names,
    description: product.value.description
  })
})

const relatedFaqs = computed<FAQ[]>(() => {
  if (!product.value) {
    return []
  }

  const selectedFaqs = product.value.faqs?.length
    ? getFaqsByIds(product.value.faqs)
    : getFaqsByProductId(product.value.id)

  return selectedFaqs.slice(0, 5)
})

const relatedProducts = computed<Product[]>(() => {
  if (!product.value) {
    return []
  }

  const preferred = product.value.relatedProducts?.length
    ? getProductsByIds(product.value.relatedProducts)
    : []

  if (preferred.length >= 3) {
    return preferred.slice(0, 4)
  }

  const fallback = products.value.filter(
    (item) =>
      item.id !== product.value?.id &&
      !preferred.some((related) => related.id === item.id)
  )

  return [...preferred, ...fallback].slice(0, 4)
})

const productJsonLd = computed(() => {
  if (!product.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.value.name,
    description: product.value.seoDescription || product.value.description,
    image: product.value.coverImage ? [toAbsoluteUrl(product.value.coverImage)] : undefined,
    url: `${runtimeConfig.public.siteUrl}${localePath(`/products/${product.value.slug}`)}`,
    category: product.value.category,
    material: product.value.materials.join(' / '),
    brand: {
      '@type': 'Brand',
      name: t('brand.name')
    },
    offers: {
      '@type': 'Offer',
      url: `${runtimeConfig.public.siteUrl}${localePath(`/products/${product.value.slug}`)}`,
      priceCurrency: 'CNY',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    },
    mainEntity: relatedFaqs.value.length ? {
      '@type': 'FAQPage',
      mainEntity: relatedFaqs.value.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    } : undefined,
    additionalProperty: specificationRows.value
      .filter((row) => row.value !== '/')
      .map((row) => ({
        '@type': 'PropertyValue',
        name: row.label,
        value: row.value
      })),
    isRelatedTo: [
      ...(product.value.standard
        ? product.value.standard.split(/[;；]/).filter(Boolean).map(std => ({
            '@type': 'CreativeWork',
            name: std.trim(),
            description: t('productDetail.standardDescription', { name: product.value!.name })
          }))
        : []),
      ...(product.value.relatedProducts?.map(relId => ({
        '@type': 'Product',
        '@id': `${runtimeConfig.public.siteUrl}/products/${relId.replace('product-', '')}`
      })) ?? [])
    ],
    manufacturer: {
      '@type': 'Organization',
      name: t('brand.name'),
      url: runtimeConfig.public.siteUrl,
      knowsAbout: [
        t('seo.knowsAbout.miningMesh'),
        t('seo.knowledgeTags.iso9044'),
        t('seo.knowledgeTags.astmE11'),
        t('seo.knowledgeTags.gbt5330'),
        t('seo.knowledgeTags.vibratingScreen'),
        t('seo.knowledgeTags.stainlessCustom'),
        t('seo.knowledgeTags.polyurethane'),
        t('seo.knowledgeTags.johnsonScreen')
      ]
    }
  }
})

const toggleFaq = (faqId: string) => {
  openFaqId.value = openFaqId.value === faqId ? null : faqId
}

watch(
  () => product.value?.coverImage,
  () => {
    imageFailed.value = false
  },
  { immediate: true }
)

watch(
  relatedFaqs,
  (faqs) => {
    openFaqId.value = faqs[0]?.id ?? null
  },
  { immediate: true }
)

usePageSeoMeta({
  title: product.value ? t('productDetail.seo.title', { name: product.value.name }) : t('productDetail.notFoundTitle'),
  description:
    product.value?.seoDescription ||
    t('productDetail.seo.fallbackDescription'),
  image: product.value?.coverImage
})

useHead(() => ({
  script: productJsonLd.value
    ? [
        {
          key: 'product-jsonld',
          type: 'application/ld+json',
          textContent: JSON.stringify(productJsonLd.value)
        }
      ]
    : []
}))
</script>

<style scoped>
.page-bg {
  background-color: #f8f9fb;
  background-image:
    radial-gradient(circle at 20% 0%, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 100%, rgba(26, 39, 68, 0.04) 0%, transparent 50%);
}

.breadcrumb-bar {
  position: sticky;
  top: 64px; /* header height */
  z-index: 40;
}

.section-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #2563eb;
}

.section-eyebrow-light {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(147, 170, 220, 0.7);
}

.product-image-frame {
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: white;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.05);
}

.quick-spec-card {
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.content-card {
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
}

.spec-row:first-child th,
.spec-row:first-child td {
  padding-top: 1rem;
}

.spec-row:last-child th,
.spec-row:last-child td {
  padding-bottom: 1rem;
}

/* 深色选型卡片 */
.selection-card {
  background: #141e33;
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.12), 0 20px 48px rgba(15, 23, 42, 0.16);
}

.dim-cell {
  transition: background-color 0.15s;
}

.dim-cell:hover {
  background-color: #1e2d4a;
}

.rating-dot {
  transition: width 0.3s ease, background-color 0.3s ease;
}

/* 产品优势深色卡片 */
.adv-card {
  background: linear-gradient(145deg, #111827 0%, #1a2744 100%);
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.1), 0 20px 48px rgba(15, 23, 42, 0.18);
}

.adv-item {
  background: rgba(255, 255, 255, 0.04);
  transition: background-color 0.15s;
}

.adv-item:hover {
  background: rgba(255, 255, 255, 0.07);
}

/* FAQ 旋转图标 */
.faq-icon {
  transition: transform 0.2s ease, border-color 0.2s, background-color 0.2s, color 0.2s;
}

.rotate-45 {
  transform: rotate(45deg);
}

/* 关联产品卡片 */
.related-card {
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.summary-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
