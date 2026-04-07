<template>
  <div class="page-shell">
    <PageHero
      :eyebrow="$t('aboutPage.eyebrow')"
      :title="$t('aboutPage.title')"
      :description="$t('aboutPage.description')"
    >
      <template #aside>
        <div class="surface-card-soft p-6">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <article
              v-for="stat in companyStats"
              :key="stat.label"
              class="metric-tile"
            >
              <p class="metric-value">{{ stat.value }}</p>
              <p class="metric-label">{{ stat.label }}</p>
            </article>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="page-section">
      <div class="section-shell grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div class="surface-card p-6 sm:p-8">
          <SectionHeading
            :eyebrow="$t('aboutPage.profileEyebrow')"
            :title="$t('aboutPage.profileTitle')"
          />

          <div class="mt-6 space-y-5 text-base leading-8 text-brand-muted">
            <p v-for="paragraph in companyParagraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="surface-card p-6 sm:p-8">
          <SectionHeading
            :eyebrow="$t('aboutPage.factoryEyebrow')"
            :title="$t('aboutPage.factoryTitle')"
          />

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <article
              v-for="item in factoryGallery"
              :key="item.label"
              class="overflow-hidden rounded-[1.5rem] border border-brand-line bg-brand-surface-strong"
            >
              <div
                class="flex aspect-[4/3] items-end p-5"
                :style="{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }"
              >
                <span class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white backdrop-blur-sm">
                  {{ item.label }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <SectionHeading
          :eyebrow="$t('aboutPage.productFocusEyebrow')"
          :title="$t('aboutPage.productFocusTitle')"
          :description="$t('aboutPage.productFocusDescription')"
        />

        <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="item in productDirections"
            :key="item.name"
            class="surface-card p-6"
          >
            <div class="inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-brand-surface-strong text-primary">
              <FeatureIcon :name="item.icon" class="h-7 w-7" />
            </div>
            <h3 class="mt-5 text-xl font-semibold text-brand-ink">
              {{ item.name }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-brand-muted">
              {{ item.summary }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell grid gap-6 lg:grid-cols-2">
        <article class="surface-card p-6 sm:p-8">
          <SectionHeading
            :eyebrow="$t('aboutPage.customEyebrow')"
            :title="$t('aboutPage.customTitle')"
          />
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in customCapabilities"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-brand-muted"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="surface-card p-6 sm:p-8">
          <SectionHeading
            :eyebrow="$t('aboutPage.deliveryEyebrow')"
            :title="$t('aboutPage.deliveryTitle')"
          />
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in deliveryCapabilities"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-brand-muted"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <SectionHeading
          :eyebrow="$t('aboutPage.qualityEyebrow')"
          :title="$t('aboutPage.qualityTitle')"
        />

        <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="item in qualityPromises"
            :key="item.title"
            class="surface-card p-6"
          >
            <div class="inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-primary text-white">
              <FeatureIcon :name="item.icon" class="h-7 w-7" />
            </div>
            <h3 class="mt-5 text-xl font-semibold text-brand-ink">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-brand-muted">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <CtaBand
          :eyebrow="$t('aboutPage.eyebrow')"
          :title="$t('aboutPage.ctaTitle')"
          :description="$t('aboutPage.ctaDescription')"
          primary-to="/contact"
          :primary-label="$t('common.contactUs')"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import CtaBand from '~/components/common/CtaBand.vue'
import FeatureIcon from '~/components/common/FeatureIcon.vue'
import PageHero from '~/components/common/PageHero.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

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
  { icon: 'woven', name: t('aboutPage.productDirections.woven.name'), summary: t('aboutPage.productDirections.woven.summary') },
  { icon: 'welded', name: t('aboutPage.productDirections.welded.name'), summary: t('aboutPage.productDirections.welded.summary') },
  { icon: 'crimped', name: t('aboutPage.productDirections.crimped.name'), summary: t('aboutPage.productDirections.crimped.summary') },
  { icon: 'mining', name: t('aboutPage.productDirections.mining.name'), summary: t('aboutPage.productDirections.mining.summary') },
  { icon: 'filter', name: t('aboutPage.productDirections.filter.name'), summary: t('aboutPage.productDirections.filter.summary') },
  { icon: 'custom', name: t('aboutPage.productDirections.custom.name'), summary: t('aboutPage.productDirections.custom.summary') }
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
    icon: 'certification',
    title: t('aboutPage.qualityPromises.cert.title'),
    description: t('aboutPage.qualityPromises.cert.description')
  },
  {
    icon: 'delivery',
    title: t('aboutPage.qualityPromises.delivery.title'),
    description: t('aboutPage.qualityPromises.delivery.description')
  },
  {
    icon: 'service',
    title: t('aboutPage.qualityPromises.afterSales.title'),
    description: t('aboutPage.qualityPromises.afterSales.description')
  }
])

usePageSeoMeta({
  title: t('aboutPage.seo.title'),
  description: t('aboutPage.seo.description')
})
</script>
