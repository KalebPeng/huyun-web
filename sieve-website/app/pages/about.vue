<template>
  <div class="bg-slate-50">
    <section class="relative isolate overflow-hidden bg-[linear-gradient(135deg,#0f172a,#1a2744)] py-20 text-white sm:py-24">
      <div
        class="absolute inset-0 opacity-30"
        aria-hidden="true"
        style="background-image:
          linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
          radial-gradient(circle at top right, rgba(37,99,235,0.32), transparent 32%); background-size: 28px 28px, 28px 28px, auto;"
      />
      <div class="absolute inset-y-0 right-0 hidden w-[44%] md:block" aria-hidden="true">
        <div class="h-full bg-[linear-gradient(135deg,rgba(148,163,184,0.12),rgba(37,99,235,0.28))]" />
        <div class="absolute bottom-8 left-8 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white/90 backdrop-blur-sm">
          {{ $t('aboutPage.heroBadge') }}
        </div>
      </div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
            {{ $t('aboutPage.eyebrow') }}
          </p>
          <h1 class="mt-4 text-4xl font-black sm:text-5xl">
            {{ $t('aboutPage.title') }}
          </h1>
          <p class="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
            {{ $t('aboutPage.description') }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t('aboutPage.profileEyebrow') }}
          </p>
          <h2 class="mt-3 text-3xl font-black text-slate-950">
            {{ $t('aboutPage.profileTitle') }}
          </h2>

          <div class="mt-6 space-y-5 text-base leading-8 text-slate-600">
            <p v-for="paragraph in companyParagraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="stat in companyStats"
            :key="stat.label"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p class="text-3xl font-black text-primary sm:text-4xl">
              {{ stat.value }}
            </p>
            <p class="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              {{ stat.label }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {{ $t('aboutPage.productFocusEyebrow') }}
            </p>
            <h2 class="mt-2 text-3xl font-black text-slate-950">
              {{ $t('aboutPage.productFocusTitle') }}
            </h2>
          </div>
          <p class="max-w-2xl text-sm leading-7 text-slate-500">
            {{ $t('aboutPage.productFocusDescription') }}
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <article
            v-for="item in productDirections"
            :key="item.name"
            class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
              {{ item.icon }}
            </div>
            <h3 class="mt-4 text-lg font-bold text-slate-900">
              {{ item.name }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ item.summary }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {{ $t('aboutPage.factoryEyebrow') }}
        </p>
        <h2 class="mt-2 text-3xl font-black text-slate-950">
          {{ $t('aboutPage.factoryTitle') }}
        </h2>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="item in factoryGallery"
            :key="item.label"
            class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div
              class="flex aspect-[4/3] items-end bg-[linear-gradient(135deg,var(--from),var(--to))] p-5"
              :style="{ '--from': item.from, '--to': item.to }"
            >
              <span class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white backdrop-blur-sm">
                {{ item.label }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t('aboutPage.customEyebrow') }}
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            {{ $t('aboutPage.customTitle') }}
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in customCapabilities"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t('aboutPage.deliveryEyebrow') }}
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            {{ $t('aboutPage.deliveryTitle') }}
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in deliveryCapabilities"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {{ $t('aboutPage.qualityEyebrow') }}
        </p>
        <h2 class="mt-2 text-3xl font-black text-slate-950">
          {{ $t('aboutPage.qualityTitle') }}
        </h2>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="item in qualityPromises"
            :key="item.title"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl text-white">
              {{ item.icon }}
            </div>
            <h3 class="mt-5 text-xl font-bold text-slate-900">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-2xl font-black sm:text-3xl">
                {{ $t('aboutPage.ctaTitle') }}
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                {{ $t('aboutPage.ctaDescription') }}
              </p>
            </div>

            <AppButton
              to="/contact"
              size="lg"
              :aria-label="$t('aboutPage.ctaAria')"
              class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
            >
              {{ $t('common.contactUs') }}
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'

interface CompanyStat {
  label: string
  value: string
}

interface ProductDirection {
  icon: string
  name: string
  summary: string
}

interface GalleryItem {
  label: string
  from: string
  to: string
}

interface QualityPromise {
  icon: string
  title: string
  description: string
}

const { t } = useI18n()

const companyParagraphs = computed<string[]>(() => [
  t('aboutPage.companyParagraphs.one'),
  t('aboutPage.companyParagraphs.two'),
  t('aboutPage.companyParagraphs.three'),
  t('aboutPage.companyParagraphs.four')
])

const companyStats = computed<CompanyStat[]>(() => [
  { label: t('aboutPage.stats.experienceLabel'), value: t('aboutPage.stats.experienceValue') },
  { label: t('aboutPage.stats.clientsLabel'), value: t('aboutPage.stats.clientsValue') },
  { label: t('aboutPage.stats.skusLabel'), value: t('aboutPage.stats.skusValue') },
  { label: t('aboutPage.stats.baseLabel'), value: t('aboutPage.stats.baseValue') }
])

const productDirections = computed<ProductDirection[]>(() => [
  { icon: '🧵', name: t('aboutPage.productDirections.woven.name'), summary: t('aboutPage.productDirections.woven.summary') },
  { icon: '🧱', name: t('aboutPage.productDirections.welded.name'), summary: t('aboutPage.productDirections.welded.summary') },
  { icon: '⚙️', name: t('aboutPage.productDirections.crimped.name'), summary: t('aboutPage.productDirections.crimped.summary') },
  { icon: '⛏️', name: t('aboutPage.productDirections.mining.name'), summary: t('aboutPage.productDirections.mining.summary') },
  { icon: '🫧', name: t('aboutPage.productDirections.filter.name'), summary: t('aboutPage.productDirections.filter.summary') },
  { icon: '🧩', name: t('aboutPage.productDirections.custom.name'), summary: t('aboutPage.productDirections.custom.summary') }
])

const factoryGallery = computed<GalleryItem[]>(() => [
  { label: t('aboutPage.factoryGallery.weaving'), from: '#314867', to: '#152235' },
  { label: t('aboutPage.factoryGallery.line'), from: '#2563eb', to: '#1a2744' },
  { label: t('aboutPage.factoryGallery.quality'), from: '#0f766e', to: '#1a2744' },
  { label: t('aboutPage.factoryGallery.packing'), from: '#475569', to: '#111827' }
])

const customCapabilities = computed<string[]>(() => [
  t('aboutPage.customCapabilities.one'),
  t('aboutPage.customCapabilities.two'),
  t('aboutPage.customCapabilities.three')
])

const deliveryCapabilities = computed<string[]>(() => [
  t('aboutPage.deliveryCapabilities.one'),
  t('aboutPage.deliveryCapabilities.two'),
  t('aboutPage.deliveryCapabilities.three')
])

const qualityPromises = computed<QualityPromise[]>(() => [
  {
    icon: '✓',
    title: t('aboutPage.qualityPromises.cert.title'),
    description: t('aboutPage.qualityPromises.cert.description')
  },
  {
    icon: '⏱',
    title: t('aboutPage.qualityPromises.delivery.title'),
    description: t('aboutPage.qualityPromises.delivery.description')
  },
  {
    icon: '☎',
    title: t('aboutPage.qualityPromises.afterSales.title'),
    description: t('aboutPage.qualityPromises.afterSales.description')
  }
])

usePageSeoMeta({
  title: t('aboutPage.seo.title'),
  description: t('aboutPage.seo.description')
})
</script>
