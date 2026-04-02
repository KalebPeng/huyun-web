<template>
  <section class="bg-slate-50 py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t('home.factorySection.eyebrow') }}
          </p>
          <h2 class="mt-3 text-3xl font-black text-primary sm:text-4xl">
            {{ $t('home.factorySection.title') }}
          </h2>
          <p class="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            {{ $t('home.factorySection.location') }}
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <article
              v-for="stat in factoryStats"
              :key="stat.key"
              class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p class="text-3xl font-black text-primary">{{ stat.value }}</p>
              <p class="mt-2 text-sm font-medium tracking-[0.12em] text-slate-500">
                {{ stat.label }}
              </p>
            </article>
          </div>

          <div class="mt-10 grid gap-8 md:grid-cols-2">
            <section>
              <h3 class="text-xl font-bold text-slate-900">
                {{ $t('home.factorySection.equipmentTitle') }}
              </h3>
              <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-600">
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

            <section>
              <h3 class="text-xl font-bold text-slate-900">
                {{ $t('home.factorySection.qualityTitle') }}
              </h3>
              <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-600">
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
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div class="relative h-52 overflow-hidden">
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
