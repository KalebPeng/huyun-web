<template>
  <section class="page-section bg-white/55">
    <div class="section-shell">
      <div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)]">
        <div>
          <SectionHeading
            :eyebrow="$t('home.factorySection.eyebrow')"
            :title="$t('home.factorySection.title')"
            :description="$t('home.factorySection.location')"
          />

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <article
              v-for="stat in factoryStats"
              :key="stat.key"
              class="metric-tile"
            >
              <p class="metric-value">{{ stat.value }}</p>
              <p class="metric-label">{{ stat.label }}</p>
            </article>
          </div>

          <div class="mt-8 grid gap-5 md:grid-cols-2">
            <section class="surface-card p-6">
              <div class="flex items-center gap-3">
                <FeatureIcon name="factory" tone="accent" />
                <h3 class="text-xl font-semibold text-brand-ink">
                  {{ $t('home.factorySection.equipmentTitle') }}
                </h3>
              </div>
              <ul class="mt-5 space-y-3 text-sm leading-7 text-brand-muted">
                <li
                  v-for="item in equipmentHighlights"
                  :key="item"
                  class="flex gap-3"
                >
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </section>

            <section class="surface-card p-6">
              <div class="flex items-center gap-3">
                <FeatureIcon name="quality" tone="accent" />
                <h3 class="text-xl font-semibold text-brand-ink">
                  {{ $t('home.factorySection.qualityTitle') }}
                </h3>
              </div>
              <ul class="mt-5 space-y-3 text-sm leading-7 text-brand-muted">
                <li
                  v-for="item in qualityChecks"
                  :key="item"
                  class="flex gap-3"
                >
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="item in galleryItems"
            :key="item.key"
            class="surface-card overflow-hidden"
          >
            <div class="relative h-56 overflow-hidden">
              <NuxtImg
                v-if="!imageErrors[item.key]"
                :src="item.src"
                :alt="item.label"
                width="640"
                height="416"
                class="h-full w-full object-cover"
                loading="lazy"
                sizes="100vw sm:50vw"
                placeholder
                @error="markImageError(item.key)"
              />
              <div
                v-else
                class="flex h-full w-full items-end bg-[linear-gradient(135deg,var(--from),var(--to))] p-5"
                :style="{
                  '--from': item.gradientFrom,
                  '--to': item.gradientTo
                }"
              >
                <span class="rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white backdrop-blur-sm">
                  {{ item.label }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

import FeatureIcon from '~/components/common/FeatureIcon.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'

interface FactoryStat {
  key: string
  label: string
  value: string
}

interface GalleryItem {
  key: string
  label: string
  src: string
  gradientFrom: string
  gradientTo: string
}

const { t } = useI18n()

const factoryStats = computed<FactoryStat[]>(() => [
  { key: 'founded', label: t('home.factorySection.stats.founded'), value: t('home.factorySection.values.founded') },
  { key: 'lines', label: t('home.factorySection.stats.lines'), value: t('home.factorySection.values.lines') },
  { key: 'area', label: t('home.factorySection.stats.area'), value: '12000㎡' }
])

const equipmentHighlights = computed(() => [
  t('home.factorySection.equipmentItems.automation'),
  t('home.factorySection.equipmentItems.processing'),
  t('home.factorySection.equipmentItems.sampling')
])

const qualityChecks = computed(() => [
  t('home.factorySection.qualityItems.rawMaterials'),
  t('home.factorySection.qualityItems.finishedGoods')
])

const galleryItems = computed<GalleryItem[]>(() => [
  {
    key: 'workshop',
    label: t('home.factorySection.gallery.workshop'),
    src: '/images/factory/workshop.svg',
    gradientFrom: '#314867',
    gradientTo: '#152235'
  },
  {
    key: 'equipment',
    label: t('home.factorySection.gallery.equipment'),
    src: '/images/factory/equipment.svg',
    gradientFrom: '#2563eb',
    gradientTo: '#1a2744'
  },
  {
    key: 'quality',
    label: t('home.factorySection.gallery.quality'),
    src: '/images/factory/quality.svg',
    gradientFrom: '#0f766e',
    gradientTo: '#1a2744'
  },
  {
    key: 'packing',
    label: t('home.factorySection.gallery.packing'),
    src: '/images/factory/packing.svg',
    gradientFrom: '#475569',
    gradientTo: '#111827'
  }
])

const imageErrors = reactive<Record<string, boolean>>({
  workshop: false,
  equipment: false,
  quality: false,
  packing: false
})

const markImageError = (key: string) => {
  imageErrors[key] = true
}
</script>
