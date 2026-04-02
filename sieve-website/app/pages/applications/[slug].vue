<template>
  <div class="bg-slate-50">
    <template v-if="application">
      <section class="border-b border-slate-200 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav :aria-label="$t('applicationDetail.breadcrumbAria')" class="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <NuxtLink :to="localePath('/')" class="transition-colors hover:text-primary">
              {{ $t('nav.home') }}
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink :to="localePath('/applications')" class="transition-colors hover:text-primary">
              {{ $t('nav.applications') }}
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <span class="font-medium text-slate-900">{{ application.name }}</span>
          </nav>
        </div>
      </section>

      <section class="py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {{ $t('applicationDetail.overviewEyebrow') }}
              </p>
              <h1 class="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                {{ application.name }}
              </h1>
              <p class="mt-5 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
                {{ application.description }}
              </p>
            </div>

            <aside class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 class="text-xl font-black text-slate-950">
                {{ $t('applicationDetail.painPointsTitle') }}
              </h2>
              <ul class="mt-5 space-y-4">
                <li
                  v-for="painPoint in painPoints"
                  :key="painPoint"
                  class="flex gap-3 text-sm leading-7 text-slate-600"
                >
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{{ painPoint }}</span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {{ $t('applicationDetail.considerationEyebrow') }}
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-950">
              {{ $t('applicationDetail.considerationTitle') }}
            </h2>

            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="(consideration, index) in application.considerations"
                :key="consideration"
                class="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {{ index + 1 }}
                </div>
                <h3 class="mt-4 text-lg font-bold text-slate-900">
                  {{ consideration }}
                </h3>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {{ $t('applicationDetail.recommendedEyebrow') }}
              </p>
              <h2 class="mt-2 text-2xl font-black text-slate-950">
                {{ $t('applicationDetail.recommendedTitle') }}
              </h2>
            </div>
            <NuxtLink :to="localePath('/products')" class="text-sm font-semibold text-primary transition-colors hover:text-blue-600">
              {{ $t('applicationDetail.viewAllProducts') }}
            </NuxtLink>
          </div>

          <div
            v-if="recommendedProducts.length"
            class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <ProductCard
              v-for="product in recommendedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <div
            v-else
            class="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm"
          >
            <p class="text-lg font-bold text-slate-900">
              {{ $t('applicationDetail.emptyProductsTitle') }}
            </p>
            <p class="mt-3 text-sm leading-7 text-slate-500">
              {{ $t('applicationDetail.emptyProductsDescription') }}
            </p>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-[linear-gradient(135deg,#111827,#1a2744)] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              {{ $t('applicationDetail.usageAdviceEyebrow') }}
            </p>
            <h2 class="mt-2 text-2xl font-black">
              {{ $t('applicationDetail.usageAdviceTitle') }}
            </h2>

            <ol class="mt-8 grid gap-4 md:grid-cols-2">
              <li
                v-for="(item, index) in application.useCases"
                :key="item"
                class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div class="flex items-center gap-4">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-blue-100">
                    {{ index + 1 }}
                  </span>
                  <h3 class="text-base font-semibold text-white">
                    {{ item }}
                  </h3>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section class="pb-16 sm:pb-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 class="text-2xl font-black sm:text-3xl">
                  {{ $t('applicationDetail.ctaTitle') }}
                </h2>
                <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  {{ $t('applicationDetail.ctaDescription') }}
                </p>
              </div>

              <AppButton
                :to="`/contact?scene=${application.slug}`"
                size="lg"
                :aria-label="$t('applicationDetail.ctaAria', { name: application.name })"
                class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
              >
                {{ $t('applicationDetail.ctaButton') }}
              </AppButton>
            </div>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="py-24">
      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {{ $t('applicationDetail.notFoundEyebrow') }}
        </p>
        <h1 class="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
          {{ $t('applicationDetail.notFoundTitle') }}
        </h1>
        <p class="mt-5 text-base leading-8 text-slate-600">
          {{ $t('applicationDetail.notFoundDescription') }}
        </p>
        <div class="mt-8 flex justify-center">
          <AppButton to="/applications" size="lg" :aria-label="$t('applicationDetail.notFoundAria')">
            {{ $t('applicationDetail.notFoundButton') }}
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'
import ProductCard from '~/components/product/ProductCard.vue'
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

const articleJsonLd = computed(() => {
  if (!application.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: application.value.name,
    description: application.value.seoDescription || application.value.description,
    image: application.value.coverImage ? [toAbsoluteUrl(application.value.coverImage)] : undefined,
    mainEntityOfPage: `${runtimeConfig.public.siteUrl}${localePath(`/applications/${application.value.slug}`)}`,
    articleSection: t('nav.applications'),
    inLanguage: localeProperties.value.language || 'zh-CN',
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
  image: application.value?.coverImage
})

useHead(() => ({
  script: articleJsonLd.value
    ? [
        {
          key: 'application-jsonld',
          type: 'application/ld+json',
          textContent: JSON.stringify(articleJsonLd.value)
        }
      ]
    : []
}))
</script>
