<template>
  <div class="page-shell">
    <template v-if="product">
      <section class="border-b border-brand-line/70 bg-white/85 backdrop-blur-sm">
        <div class="section-shell py-4">
          <nav :aria-label="$t('productDetail.breadcrumbAria')" class="flex flex-wrap items-center gap-2 text-sm text-brand-muted">
            <NuxtLink :to="localePath('/')" class="transition-colors hover:text-primary">{{ $t('nav.home') }}</NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink :to="localePath('/products')" class="transition-colors hover:text-primary">{{ $t('nav.products') }}</NuxtLink>
            <span aria-hidden="true">/</span>
            <span class="font-medium text-brand-ink">{{ product.name }}</span>
          </nav>
        </div>
      </section>

      <PageHero
        :eyebrow="product.category"
        :title="product.name"
        :description="product.summary"
      >
        <template #actions>
          <AppButton
            :to="`/contact?product=${product.slug}`"
            size="lg"
            :aria-label="$t('productDetail.quoteAria', { name: product.name })"
          >
            {{ $t('common.getQuote') }}
          </AppButton>
          <a
            href="tel:4001234567"
            class="inline-flex min-h-12 items-center justify-center rounded-xl border border-brand-line bg-white px-5 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/40 hover:bg-brand-surface-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :aria-label="$t('productDetail.callAria', { name: product.name })"
          >
            {{ $t('productDetail.callButton') }}
          </a>
        </template>

        <template #aside>
          <div class="surface-card-soft p-6">
            <div class="flex flex-wrap gap-2">
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

            <div class="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div
                v-for="item in quickSpecs"
                :key="item.label"
                class="metric-tile"
              >
                <p class="mono-meta text-brand-muted">{{ item.label }}</p>
                <p class="mt-3 text-base font-semibold text-brand-ink">
                  {{ item.value }}
                </p>
              </div>
            </div>

            <div v-if="product.standard" class="mt-6">
              <p class="mono-meta text-brand-muted">{{ $t('productDetail.standardsLabel') }}</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="std in standards"
                  :key="std"
                  class="rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-mono text-brand-muted"
                >
                  {{ std }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </PageHero>

      <section class="page-section">
        <div class="section-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div class="space-y-6">
            <div class="surface-card overflow-hidden">
              <div class="relative aspect-[4/3] bg-brand-surface-strong">
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
              </div>
            </div>

            <MeshCalculator />
          </div>

          <aside class="surface-card p-6 sm:p-8">
            <SectionHeading
              :eyebrow="$t('productDetail.applicationsTitle')"
              :title="$t('productDetail.applicationsTitle')"
              :description="applicationSummary"
            />

            <div class="mt-6 flex flex-wrap gap-2">
              <Badge
                v-for="application in applicationBadges"
                :key="application.id"
                :label="application.name"
                variant="primary"
              />
            </div>

            <div class="mt-8 border-t border-brand-line pt-6">
              <p class="mono-meta text-brand-muted">{{ $t('productDetail.labels.customSupport') }}</p>
              <p class="mt-3 text-sm font-semibold text-brand-ink">
                {{ product.customSupported ? $t('common.supported') : $t('common.notSupported') }}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section class="page-section pt-0">
        <div class="section-shell">
          <div class="surface-card overflow-hidden">
            <div class="border-b border-brand-line px-6 py-5">
              <SectionHeading
                :eyebrow="$t('productDetail.specificationsTitle')"
                :title="$t('productDetail.specificationsTitle')"
              />
            </div>

            <div class="overflow-x-auto">
              <table
                class="min-w-full text-sm"
                itemscope
                itemtype="https://schema.org/Product"
              >
                <tbody class="divide-y divide-brand-line">
                  <tr
                    v-for="row in specificationRows.filter(r => r.value !== '/')"
                    :key="row.label"
                    itemprop="additionalProperty"
                    itemscope
                    itemtype="https://schema.org/PropertyValue"
                    class="hover:bg-brand-surface-strong/70"
                  >
                    <th
                      scope="row"
                      class="w-40 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted"
                      itemprop="name"
                    >
                      {{ row.label }}
                    </th>
                    <td class="px-6 py-4 font-medium text-brand-ink" itemprop="value">
                      {{ row.value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section v-if="product.selectionGuide" class="page-section pt-0">
        <div class="section-shell">
          <div class="surface-card p-6 sm:p-8">
            <SectionHeading
              :eyebrow="$t('productDetail.selectionGuideTitle')"
              :title="$t('productDetail.selectionGuideTitle')"
            />

            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <article
                v-for="dim in selectionDimensions"
                :key="dim.key"
                class="surface-card-inset p-5"
              >
                <p class="mono-meta text-brand-muted">{{ dim.label }}</p>
                <div class="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <div class="flex gap-1.5">
                      <span
                        v-for="n in 4"
                        :key="n"
                        class="h-2 rounded-full transition-all duration-200"
                        :class="n <= dim.score ? 'w-7 bg-accent' : 'w-3 bg-brand-line'"
                      />
                    </div>
                    <p class="mt-3 text-sm font-semibold text-brand-ink">{{ dim.text }}</p>
                  </div>
                  <span class="font-mono text-xl font-semibold text-primary/40">{{ dim.score }}/4</span>
                </div>
              </article>
            </div>

            <div v-if="product.tensileStrength || product.hardness" class="mt-6 grid gap-4 sm:grid-cols-2">
              <div v-if="product.tensileStrength" class="surface-card-inset p-5">
                <p class="mono-meta text-brand-muted">{{ $t('productDetail.labels.tensileStrength') }}</p>
                <p class="mt-3 font-mono text-sm font-semibold text-brand-ink">{{ product.tensileStrength }}</p>
              </div>
              <div v-if="product.hardness" class="surface-card-inset p-5">
                <p class="mono-meta text-brand-muted">{{ $t('productDetail.labels.hardnessIndex') }}</p>
                <p class="mt-3 font-mono text-sm font-semibold text-brand-ink">{{ product.hardness }}</p>
              </div>
            </div>

            <p v-if="product.selectionGuide.note" class="mt-6 text-sm leading-7 text-brand-muted">
              {{ product.selectionGuide.note }}
            </p>
          </div>
        </div>
      </section>

      <section class="page-section pt-0">
        <div class="section-shell">
          <div class="surface-card p-6 sm:p-8">
            <SectionHeading
              :eyebrow="$t('productDetail.advantagesTitle')"
              :title="$t('productDetail.advantagesTitle')"
            />

            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="(advantage, index) in product.advantages"
                :key="advantage"
                class="surface-card-inset p-5"
              >
                <span class="mono-meta text-accent">{{ String(index + 1).padStart(2, '0') }}</span>
                <p class="mt-4 text-sm font-semibold leading-7 text-brand-ink">
                  {{ advantage }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section pt-0">
        <div class="section-shell">
          <SectionHeading
            :eyebrow="$t('productDetail.faqTitle')"
            :title="$t('productDetail.faqTitle')"
          />

          <div class="mt-8">
            <FaqAccordion v-if="relatedFaqs.length" :items="relatedFaqs" />
            <div v-else class="surface-card px-6 py-10 text-center text-sm text-brand-muted">
              {{ $t('productDetail.emptyFaq') }}
            </div>
          </div>
        </div>
      </section>

      <section class="page-section pt-0">
        <div class="section-shell">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              :eyebrow="$t('productDetail.relatedProductsTitle')"
              :title="$t('productDetail.relatedProductsTitle')"
            />
            <NuxtLink :to="localePath('/products')" class="mono-meta text-primary transition-colors hover:text-accent">
              {{ $t('productDetail.viewAllProducts') }}
            </NuxtLink>
          </div>

          <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ProductCard
              v-for="related in relatedProducts"
              :key="related.id"
              :product="related"
            />
          </div>
        </div>
      </section>
    </template>

    <section v-else class="page-section">
      <div class="section-shell">
        <div class="surface-card px-6 py-16 text-center">
          <p class="eyebrow">{{ $t('nav.products') }}</p>
          <h1 class="mt-4 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
            {{ $t('productDetail.notFoundTitle') }}
          </h1>
          <p class="mx-auto mt-5 max-w-2xl text-sm leading-8 text-brand-muted">
            {{ $t('productDetail.notFoundDescription') }}
          </p>
          <div class="mt-8 flex justify-center">
            <AppButton to="/products" size="lg" :aria-label="$t('productDetail.notFoundAria')">
              {{ $t('productDetail.notFoundButton') }}
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import AppButton from '~/components/common/AppButton.vue'
import Badge from '~/components/common/Badge.vue'
import FaqAccordion from '~/components/common/FaqAccordion.vue'
import PageHero from '~/components/common/PageHero.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import MeshCalculator from '~/components/tools/MeshCalculator.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'
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

const standards = computed(() => product.value?.standard?.split(/[;,，、]/).map(item => item.trim()).filter(Boolean) ?? [])

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
    text: ratingText[d.level]
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
      ...standards.value.map(std => ({
        '@type': 'CreativeWork',
        name: std,
        description: t('productDetail.standardDescription', { name: product.value!.name })
      })),
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

watch(
  () => product.value?.coverImage,
  () => {
    imageFailed.value = false
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
