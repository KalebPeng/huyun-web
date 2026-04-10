<template>
  <div class="page-shell">
    <template v-if="application">
      <section class="border-b border-brand-line/70 bg-white/85 backdrop-blur-sm">
        <div class="section-shell py-4">
          <nav
            :aria-label="$t('applicationDetail.breadcrumbAria')"
            class="flex flex-wrap items-center gap-2 text-sm text-brand-muted"
          >
            <NuxtLink :to="localePath('/')" class="transition-colors hover:text-primary">
              {{ $t('nav.home') }}
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink :to="localePath('/applications')" class="transition-colors hover:text-primary">
              {{ $t('nav.applications') }}
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <span class="font-medium text-brand-ink">{{ application.name }}</span>
          </nav>
        </div>
      </section>

      <PageHero
        :eyebrow="$t('applicationDetail.overviewEyebrow')"
        :title="application.name"
        :description="application.description"
      >
        <template #actions>
          <AppButton
            :to="`/contact?scene=${application.slug}`"
            size="lg"
            :aria-label="$t('applicationDetail.ctaAria', { name: application.name })"
          >
            {{ $t('applicationDetail.ctaButton') }}
          </AppButton>
          <AppButton to="/products" variant="outline" size="lg">
            {{ $t('applicationDetail.viewAllProducts') }}
          </AppButton>
        </template>

        <template #aside>
          <div class="surface-card-soft p-6">
            <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div class="metric-tile">
                <p class="metric-value">{{ painPoints.length }}</p>
                <p class="metric-label">{{ $t('applicationDetail.painPointsTitle') }}</p>
              </div>
              <div class="metric-tile">
                <p class="metric-value">{{ recommendedProducts.length }}</p>
                <p class="metric-label">{{ $t('applicationDetail.recommendedTitle') }}</p>
              </div>
              <div class="metric-tile">
                <p class="metric-value">{{ application.useCases.length }}</p>
                <p class="metric-label">{{ $t('applicationDetail.usageAdviceTitle') }}</p>
              </div>
            </div>
          </div>
        </template>
      </PageHero>

      <section class="page-section">
        <div class="section-shell grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_360px]">
          <div class="surface-card p-6 sm:p-8">
            <SectionHeading
              :eyebrow="$t('applicationDetail.considerationEyebrow')"
              :title="$t('applicationDetail.considerationTitle')"
              :description="application.summary"
            />

            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="(consideration, index) in application.considerations"
                :key="consideration"
                class="surface-card-inset p-5"
              >
                <span class="mono-meta text-accent">0{{ index + 1 }}</span>
                <h3 class="mt-4 text-lg font-semibold text-brand-ink">
                  {{ consideration }}
                </h3>
              </article>
            </div>
          </div>

          <aside class="surface-card p-6 sm:p-8">
            <p class="eyebrow">{{ $t('applicationDetail.painPointsTitle') }}</p>
            <h2 class="mt-3 text-2xl font-semibold tracking-tight text-brand-ink">
              {{ application.name }}
            </h2>
            <ul class="mt-6 space-y-4">
              <li
                v-for="painPoint in painPoints"
                :key="painPoint"
                class="flex gap-3 text-sm leading-7 text-brand-muted"
              >
                <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{{ painPoint }}</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section class="page-section pt-0">
        <div class="section-shell">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              :eyebrow="$t('applicationDetail.recommendedEyebrow')"
              :title="$t('applicationDetail.recommendedTitle')"
            />
            <NuxtLink :to="localePath('/products')" class="mono-meta text-primary transition-colors hover:text-accent">
              {{ $t('applicationDetail.viewAllProducts') }}
            </NuxtLink>
          </div>

          <div
            v-if="recommendedProducts.length"
            class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <ProductCard
              v-for="product in recommendedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <div
            v-else
            class="surface-card mt-10 px-6 py-16 text-center"
          >
            <p class="text-lg font-semibold text-brand-ink">
              {{ $t('applicationDetail.emptyProductsTitle') }}
            </p>
            <p class="mt-3 text-sm leading-7 text-brand-muted">
              {{ $t('applicationDetail.emptyProductsDescription') }}
            </p>
          </div>
        </div>
      </section>

      <section class="page-section pt-0">
        <div class="section-shell">
          <div class="surface-card p-6 sm:p-8">
            <SectionHeading
              :eyebrow="$t('applicationDetail.usageAdviceEyebrow')"
              :title="$t('applicationDetail.usageAdviceTitle')"
            />

            <ol class="mt-8 grid gap-4 md:grid-cols-2">
              <li
                v-for="(item, index) in application.useCases"
                :key="item"
                class="surface-card-inset flex gap-4 p-5"
              >
                <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {{ index + 1 }}
                </span>
                <div>
                  <p class="text-base font-semibold text-brand-ink">{{ item }}</p>
                  <p class="mt-2 text-sm leading-7 text-brand-muted">{{ application.summary }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section class="page-section pt-0">
        <div class="section-shell">
          <CtaBand
            :eyebrow="$t('applicationDetail.overviewEyebrow')"
            :title="$t('applicationDetail.ctaTitle')"
            :description="$t('applicationDetail.ctaDescription')"
            :primary-to="`/contact?scene=${application.slug}`"
            :primary-label="$t('applicationDetail.ctaButton')"
          />
        </div>
      </section>
    </template>

    <section v-else class="page-section">
      <div class="section-shell">
        <div class="surface-card px-6 py-16 text-center">
          <p class="eyebrow">{{ $t('applicationDetail.notFoundEyebrow') }}</p>
          <h1 class="mt-4 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
            {{ $t('applicationDetail.notFoundTitle') }}
          </h1>
          <p class="mx-auto mt-5 max-w-2xl text-base leading-8 text-brand-muted">
            {{ $t('applicationDetail.notFoundDescription') }}
          </p>
          <div class="mt-8 flex justify-center">
            <AppButton to="/applications" size="lg" :aria-label="$t('applicationDetail.notFoundAria')">
              {{ $t('applicationDetail.notFoundButton') }}
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '~/components/common/AppButton.vue'
import CtaBand from '~/components/common/CtaBand.vue'
import PageHero from '~/components/common/PageHero.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'
import type { ApplicationScene } from '~~/types'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const localePath = useLocalePath()
const { t, localeProperties } = useI18n()
const { getApplicationBySlug } = useApplications()
const { getProductsByIds } = useProducts()

const scenePainPointMap = computed<Record<string, string[]>>(() => ({
  'grain-screening': [
    t('applicationDetail.painPoints.grain.one'),
    t('applicationDetail.painPoints.grain.two'),
    t('applicationDetail.painPoints.grain.three')
  ],
  'industrial-filtration': [
    t('applicationDetail.painPoints.filtration.one'),
    t('applicationDetail.painPoints.filtration.two'),
    t('applicationDetail.painPoints.filtration.three')
  ],
  'mining-screening': [
    t('applicationDetail.painPoints.mining.one'),
    t('applicationDetail.painPoints.mining.two'),
    t('applicationDetail.painPoints.mining.three')
  ]
}))

const toAbsoluteUrl = (value: string) => {
  const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
  return value.startsWith('http') ? value : `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`
}

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const application = computed<ApplicationScene | undefined>(() => {
  return slug.value ? getApplicationBySlug(slug.value) : undefined
})

if (!application.value) {
  setResponseStatus(404, 'Application Not Found')
}

const painPoints = computed(() => {
  if (!application.value) {
    return []
  }

  return scenePainPointMap.value[application.value.slug] ?? application.value.considerations.slice(0, 3)
})

const recommendedProducts = computed(() => {
  if (!application.value) {
    return []
  }

  return getProductsByIds(application.value.recommendedProducts)
})

const applicationJsonLd = computed(() => {
  if (!application.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: application.value.name,
    description: application.value.seoDescription || application.value.description,
    url: `${runtimeConfig.public.siteUrl}${localePath(`/applications/${application.value.slug}`)}`,
    image: application.value.coverImage ? [toAbsoluteUrl(application.value.coverImage)] : undefined,
    mainEntityOfPage: `${runtimeConfig.public.siteUrl}${localePath(`/applications/${application.value.slug}`)}`,
    about: {
      '@type': 'Thing',
      name: application.value.name,
      description: application.value.summary
    },
    isPartOf: {
      '@type': 'WebSite',
      name: t('brand.name'),
      url: runtimeConfig.public.siteUrl
    },
    inLanguage: localeProperties.value.language || 'en',
    author: {
      '@type': 'Organization',
      name: t('brand.name')
    },
    publisher: {
      '@type': 'Organization',
      name: t('brand.name')
    }
  }
})

usePageSeoMeta({
  title: application.value
    ? t('applicationDetail.seo.title', { name: application.value.name })
    : t('applicationDetail.notFoundTitle'),
  description:
    application.value?.seoDescription ||
    t('applicationDetail.seo.fallbackDescription'),
  image: application.value?.coverImage,
  robots: application.value ? undefined : 'noindex, nofollow'
})

useHead(() => ({
  script: applicationJsonLd.value
    ? [
        {
          key: 'application-jsonld',
          type: 'application/ld+json',
          textContent: JSON.stringify(applicationJsonLd.value)
        }
      ]
    : []
}))
</script>
