<template>
  <section class="bg-slate-50 py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Factory Strength
          </p>
          <h2 class="mt-3 text-3xl font-black text-primary sm:text-4xl">
            工厂实力
          </h2>
          <p class="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            从原材料处理、编织焊接到成品质检与打包发货，围绕筛网制造建立完整工序与稳定交付能力。
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <article
              v-for="stat in factoryStats"
              :key="stat.label"
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
                核心设备
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
                质检流程
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
            :key="item.label"
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div class="relative h-52 overflow-hidden">
              <img
                v-if="!imageErrors[item.label]"
                :src="item.src"
                :alt="item.label"
                class="h-full w-full object-cover"
                loading="lazy"
                @error="markImageError(item.label)"
              >
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
import { reactive } from 'vue'

interface FactoryStat {
  label: string
  value: string
}

interface GalleryItem {
  label: string
  src: string
  gradientFrom: string
  gradientTo: string
}

const factoryStats: FactoryStat[] = [
  { label: '成立年份', value: '2004' },
  { label: '生产线数量', value: '8条' },
  { label: '厂房面积', value: '12000㎡' }
]

const equipmentHighlights = [
  '配备自动编织机、焊网机和重型轧花设备，覆盖多规格筛网生产需求。',
  '拥有激光切割、冲片和包边加工工位，支持异形件和过滤网片配套。',
  '独立打样与裁片区域，便于小批量试样和非标结构确认。'
]

const qualityChecks = [
  '原料进厂复核材质、丝径和表面状态，关键规格建立留样记录。',
  '成品逐批抽检孔径、尺寸和平整度，打包前复核标签、数量和外观。'
]

const galleryItems: GalleryItem[] = [
  {
    label: '车间图',
    src: '/images/factory/workshop.jpg',
    gradientFrom: '#314867',
    gradientTo: '#152235'
  },
  {
    label: '设备图',
    src: '/images/factory/equipment.jpg',
    gradientFrom: '#2563eb',
    gradientTo: '#1a2744'
  },
  {
    label: '质检图',
    src: '/images/factory/quality.jpg',
    gradientFrom: '#0f766e',
    gradientTo: '#1a2744'
  },
  {
    label: '打包图',
    src: '/images/factory/packing.jpg',
    gradientFrom: '#475569',
    gradientTo: '#111827'
  }
]

const imageErrors = reactive<Record<string, boolean>>(
  Object.fromEntries(galleryItems.map((item) => [item.label, false]))
)

const markImageError = (label: string) => {
  imageErrors[label] = true
}
</script>

<style scoped>
</style>
