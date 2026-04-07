<template>
  <div class="page-shell">
    <PageHero
      :eyebrow="$t('toolsPage.eyebrow')"
      :title="$t('toolsPage.title')"
      :description="$t('toolsPage.description')"
    >
      <template #aside>
        <div class="surface-card-soft p-6">
          <div class="space-y-4">
            <div class="metric-tile">
              <p class="metric-value">ASTM</p>
              <p class="metric-label">E11 / ISO 9044</p>
            </div>
            <div class="metric-tile">
              <p class="metric-value">2 min</p>
              <p class="metric-label">{{ $t('toolsPage.howTo.title') }}</p>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="page-section">
      <div class="section-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div class="space-y-6">
          <div class="rounded-[2rem] border border-[#1d3658] bg-[#10233A] p-6 text-white shadow-[0_24px_48px_rgba(16,35,58,0.2)] sm:p-8">
            <div class="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-3">
                <div class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-accent">
                  <FeatureIcon name="calculator" class="h-6 w-6" />
                </div>
                <div>
                  <p class="mono-meta text-slate-400">{{ $t('toolsPage.converter.subtitle') }}</p>
                  <h2 class="mt-1 text-xl font-semibold">{{ $t('toolsPage.converter.title') }}</h2>
                </div>
              </div>
              <span class="mono-meta rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">ASTM E11</span>
            </div>

            <div class="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-200">{{ $t('meshCalculator.fields.mesh') }}</label>
                <div class="field-wrap-dark gap-3">
                  <input
                    v-model.number="mesh"
                    type="number"
                    min="1"
                    class="w-full border-0 bg-transparent px-0 text-sm font-medium text-slate-100 outline-none placeholder:text-slate-500"
                    :placeholder="$t('toolsPage.placeholders.mesh')"
                    @input="updateFromMesh"
                  >
                  <span class="mono-meta text-slate-500">{{ $t('meshCalculator.units.mesh') }}</span>
                </div>
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-200">{{ $t('meshCalculator.fields.aperture') }}</label>
                <div class="field-wrap-dark gap-3">
                  <input
                    v-model.number="aperture"
                    type="number"
                    step="0.001"
                    min="0"
                    class="w-full border-0 bg-transparent px-0 text-sm font-medium text-slate-100 outline-none placeholder:text-slate-500"
                    :placeholder="$t('toolsPage.placeholders.aperture')"
                    @input="updateFromAperture"
                  >
                  <span class="mono-meta text-slate-500">{{ $t('meshCalculator.units.metric') }}</span>
                </div>
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-200">{{ $t('meshCalculator.fields.wireDiameter') }}</label>
                <div class="field-wrap-dark gap-3">
                  <input
                    v-model.number="wireDia"
                    type="number"
                    step="0.01"
                    min="0.01"
                    class="w-full border-0 bg-transparent px-0 text-sm font-medium text-slate-100 outline-none placeholder:text-slate-500"
                    :placeholder="$t('toolsPage.placeholders.wire')"
                  >
                  <span class="mono-meta text-slate-500">{{ $t('meshCalculator.units.metric') }}</span>
                </div>
              </div>
            </div>

            <div class="mt-6 grid gap-4 md:grid-cols-2">
              <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p class="mono-meta text-slate-400">{{ $t('meshCalculator.fields.openingArea') }}</p>
                <div class="mt-3 flex items-end gap-2">
                  <span class="text-4xl font-semibold tracking-tight text-accent">{{ openingArea }}</span>
                  <span class="mono-meta pb-1 text-slate-400">%</span>
                </div>
                <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-300 transition-all duration-700"
                    :style="`width:${Math.min(parseFloat(openingArea), 100)}%`"
                  />
                </div>
              </div>

              <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p class="mono-meta text-slate-400">{{ $t('toolsPage.pitchLabel') }}</p>
                <div class="mt-3 flex items-end gap-2">
                  <span class="text-4xl font-semibold tracking-tight text-white">{{ pitch }}</span>
                  <span class="mono-meta pb-1 text-slate-400">{{ $t('meshCalculator.units.metric') }}</span>
                </div>
                <p class="mt-4 text-sm leading-7 text-slate-400">{{ $t('toolsPage.pitchDescription') }}</p>
              </div>
            </div>

            <details class="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <summary class="cursor-pointer list-none text-sm font-semibold text-white">
                {{ $t('toolsPage.formulaSummary') }}
              </summary>
              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <div class="rounded-2xl border border-white/10 bg-[#0b1728] p-4">
                  <p class="mono-meta text-slate-500">{{ $t('toolsPage.formulas.apertureTitle') }}</p>
                  <code class="mt-3 block rounded-xl bg-white/5 px-3 py-2 font-mono text-sm text-accent">W = (25.4 / M) - d</code>
                  <p class="mt-3 text-xs leading-6 text-slate-400">{{ $t('toolsPage.formulas.apertureDescription') }}</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-[#0b1728] p-4">
                  <p class="mono-meta text-slate-500">{{ $t('toolsPage.formulas.openingAreaTitle') }}</p>
                  <code class="mt-3 block rounded-xl bg-white/5 px-3 py-2 font-mono text-sm text-accent">OA = (W / (W + d))^2 x 100</code>
                  <p class="mt-3 text-xs leading-6 text-slate-400">{{ $t('toolsPage.formulas.openingAreaDescription') }}</p>
                </div>
              </div>
            </details>
          </div>

          <div class="surface-card overflow-hidden">
            <div class="border-b border-brand-line px-6 py-5">
              <SectionHeading
                :eyebrow="$t('toolsPage.referenceSubtitle')"
                :title="$t('toolsPage.referenceTitle')"
              />
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="bg-brand-surface-strong">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">{{ $t('toolsPage.table.mesh') }}</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">{{ $t('toolsPage.table.aperture') }}</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">{{ $t('toolsPage.table.wire') }}</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">{{ $t('toolsPage.table.openingArea') }}</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">{{ $t('toolsPage.table.useCase') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-brand-line">
                  <tr
                    v-for="row in referenceData"
                    :key="row.mesh"
                    class="cursor-pointer transition-colors hover:bg-brand-surface-strong"
                    :class="{ 'bg-brand-surface-strong': selectedRef === row.mesh }"
                    @click="applyRefRow(row)"
                  >
                    <td class="px-6 py-4 font-semibold text-brand-ink">{{ row.mesh }}</td>
                    <td class="px-6 py-4 font-mono text-primary">{{ row.aperture }}</td>
                    <td class="px-6 py-4 font-mono text-brand-muted">{{ row.wire }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <div class="h-1.5 w-16 overflow-hidden rounded-full bg-brand-line/70">
                          <div class="h-full rounded-full bg-accent/70" :style="`width:${row.oa}%`" />
                        </div>
                        <span class="text-brand-muted">{{ row.oa }}%</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-brand-muted">{{ row.use }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="px-6 pb-5 pt-3 text-xs leading-6 text-brand-muted">{{ $t('toolsPage.tableHint') }}</p>
          </div>
        </div>

        <div class="space-y-5">
          <div class="surface-card p-5">
            <div class="flex items-center gap-3">
              <div class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-surface-strong text-primary">
                <FeatureIcon name="specs" class="h-6 w-6" />
              </div>
              <h3 class="text-lg font-semibold text-brand-ink">{{ $t('toolsPage.materialGuideTitle') }}</h3>
            </div>
            <div class="mt-5 space-y-3">
              <div v-for="mat in materialGuide" :key="mat.name" class="surface-card-inset p-4">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-sm font-semibold text-brand-ink">{{ mat.name }}</span>
                  <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="`level-${mat.level}`">{{ mat.levelText }}</span>
                </div>
                <p class="mt-2 text-xs leading-6 text-brand-muted">{{ mat.note }}</p>
              </div>
            </div>
          </div>

          <div class="surface-card p-5">
            <div class="flex items-center gap-3">
              <div class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-surface-strong text-primary">
                <FeatureIcon name="custom" class="h-6 w-6" />
              </div>
              <h3 class="text-lg font-semibold text-brand-ink">{{ $t('toolsPage.decisionTitle') }}</h3>
            </div>
            <div class="mt-5 space-y-3">
              <div v-for="step in decisionSteps" :key="step.q" class="surface-card-inset p-4">
                <p class="text-sm font-semibold text-brand-ink">{{ step.q }}</p>
                <p class="mt-2 text-xs leading-6 text-primary">{{ step.a }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-[2rem] border border-[#1d3658] bg-[#10233A] p-5 text-white">
            <p class="eyebrow text-blue-300">{{ $t('toolsPage.supportEyebrow') }}</p>
            <p class="mt-3 whitespace-pre-line text-lg font-semibold">{{ $t('toolsPage.supportTitle') }}</p>
            <AppButton to="/contact" size="md" class="mt-5 w-full">
              {{ $t('toolsPage.supportCta') }}
            </AppButton>
            <a
              href="tel:4001234567"
              class="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors duration-200 hover:border-white/20 hover:text-white"
            >
              {{ $t('toolsPage.callCta') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import AppButton from '~/components/common/AppButton.vue'
import FeatureIcon from '~/components/common/FeatureIcon.vue'
import PageHero from '~/components/common/PageHero.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

interface ReferenceRow {
  mesh: number
  aperture: string
  wire: string
  oa: number
  use: string
}

interface MaterialGuideItem {
  name: string
  level: 'excellent' | 'high' | 'medium' | 'low'
  levelText: string
  note: string
}

interface DecisionStep {
  q: string
  a: string
}

const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
const localePath = useLocalePath()
const { t, localeProperties } = useI18n()

usePageSeoMeta({
  title: t('toolsPage.seo.title'),
  description: t('toolsPage.seo.description')
})

const mesh = ref<number | null>(null)
const aperture = ref<number | null>(null)
const wireDia = ref<number>(0.5)
const selectedRef = ref<number | null>(null)

const updateFromMesh = () => {
  if (mesh.value && mesh.value > 0 && wireDia.value > 0) {
    aperture.value = Number((25.4 / mesh.value - wireDia.value).toFixed(3))
  }
}

const updateFromAperture = () => {
  if (aperture.value && aperture.value > 0 && wireDia.value > 0) {
    mesh.value = Number((25.4 / (aperture.value + wireDia.value)).toFixed(1))
  }
}

const openingArea = computed(() => {
  if (aperture.value && wireDia.value && aperture.value > 0) {
    const total = aperture.value + wireDia.value
    return ((Math.pow(aperture.value, 2) / Math.pow(total, 2)) * 100).toFixed(2)
  }
  return '0.00'
})

const pitch = computed(() => {
  if (aperture.value && wireDia.value && aperture.value > 0) {
    return (aperture.value + wireDia.value).toFixed(3)
  }
  return '-'
})

const referenceData = computed<ReferenceRow[]>(() => [
  { mesh: 4, aperture: '4.750', wire: '1.40', oa: 58.3, use: t('toolsPage.referenceRows.row4') },
  { mesh: 6, aperture: '3.350', wire: '0.90', oa: 61.8, use: t('toolsPage.referenceRows.row6') },
  { mesh: 8, aperture: '2.360', wire: '0.80', oa: 57.4, use: t('toolsPage.referenceRows.row8') },
  { mesh: 10, aperture: '1.700', wire: '0.83', oa: 46.7, use: t('toolsPage.referenceRows.row10') },
  { mesh: 12, aperture: '1.400', wire: '0.71', oa: 48.4, use: t('toolsPage.referenceRows.row12') },
  { mesh: 16, aperture: '1.000', wire: '0.60', oa: 45.6, use: t('toolsPage.referenceRows.row16') },
  { mesh: 20, aperture: '0.850', wire: '0.43', oa: 51.6, use: t('toolsPage.referenceRows.row20') },
  { mesh: 30, aperture: '0.600', wire: '0.29', oa: 54.5, use: t('toolsPage.referenceRows.row30') },
  { mesh: 50, aperture: '0.300', wire: '0.23', oa: 43.1, use: t('toolsPage.referenceRows.row50') },
  { mesh: 100, aperture: '0.150', wire: '0.11', oa: 44.9, use: t('toolsPage.referenceRows.row100') },
  { mesh: 200, aperture: '0.075', wire: '0.053', oa: 44.6, use: t('toolsPage.referenceRows.row200') },
  { mesh: 325, aperture: '0.045', wire: '0.036', oa: 41.3, use: t('toolsPage.referenceRows.row325') }
])

const applyRefRow = (row: ReferenceRow) => {
  mesh.value = row.mesh
  aperture.value = Number(row.aperture)
  wireDia.value = Number(row.wire)
  selectedRef.value = row.mesh
}

const materialGuide = computed<MaterialGuideItem[]>(() => [
  { name: 'SUS316L', level: 'excellent', levelText: t('toolsPage.materialLevels.excellent'), note: t('toolsPage.materialGuide.sus316l') },
  { name: 'SUS304', level: 'high', levelText: t('toolsPage.materialLevels.high'), note: t('toolsPage.materialGuide.sus304') },
  { name: '65Mn', level: 'low', levelText: t('toolsPage.materialLevels.low'), note: t('toolsPage.materialGuide.65mn') },
  { name: t('toolsPage.materialGuideLabels.polyurethane'), level: 'high', levelText: t('toolsPage.materialLevels.high'), note: t('toolsPage.materialGuide.polyurethane') },
  { name: t('toolsPage.materialGuideLabels.carbonSteel'), level: 'medium', levelText: t('toolsPage.materialLevels.medium'), note: t('toolsPage.materialGuide.carbonSteel') }
])

const decisionSteps = computed<DecisionStep[]>(() => [
  { q: t('toolsPage.decisions.corrosionQ'), a: t('toolsPage.decisions.corrosionA') },
  { q: t('toolsPage.decisions.impactQ'), a: t('toolsPage.decisions.impactA') },
  { q: t('toolsPage.decisions.dewateringQ'), a: t('toolsPage.decisions.dewateringA') },
  { q: t('toolsPage.decisions.noiseQ'), a: t('toolsPage.decisions.noiseA') },
  { q: t('toolsPage.decisions.foodQ'), a: t('toolsPage.decisions.foodA') }
])

const toolsJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: t('toolsPage.title'),
      url: `${siteUrl}${localePath('/tools')}`,
      applicationCategory: 'EngineeringApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      inLanguage: localeProperties.value.language || 'en',
      description: t('toolsPage.seo.description'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      },
      creator: {
        '@type': 'Organization',
        name: t('brand.name'),
        url: siteUrl
      },
      featureList: [
        t('toolsPage.features.mesh'),
        t('toolsPage.features.wire'),
        t('toolsPage.features.opening'),
        t('toolsPage.features.reference'),
        t('toolsPage.features.material'),
        t('toolsPage.features.decision')
      ],
      about: [
        { '@type': 'Thing', name: 'ASTM E11' },
        { '@type': 'Thing', name: 'ISO 9044' }
      ]
    },
    {
      '@type': 'HowTo',
      name: t('toolsPage.howTo.title'),
      description: t('toolsPage.howTo.description'),
      totalTime: 'PT2M',
      inLanguage: localeProperties.value.language || 'en',
      supply: [{ '@type': 'HowToSupply', name: t('toolsPage.howTo.supply') }],
      tool: [{ '@type': 'HowToTool', name: t('toolsPage.title') }],
      step: [
        { '@type': 'HowToStep', position: 1, name: t('toolsPage.howTo.step1.title'), text: t('toolsPage.howTo.step1.text') },
        { '@type': 'HowToStep', position: 2, name: t('toolsPage.howTo.step2.title'), text: t('toolsPage.howTo.step2.text') },
        { '@type': 'HowToStep', position: 3, name: t('toolsPage.howTo.step3.title'), text: t('toolsPage.howTo.step3.text') },
        { '@type': 'HowToStep', position: 4, name: t('toolsPage.howTo.step4.title'), text: t('toolsPage.howTo.step4.text') }
      ]
    }
  ]
}))

useHead(() => ({
  script: [
    {
      key: 'tools-jsonld',
      type: 'application/ld+json',
      textContent: JSON.stringify(toolsJsonLd.value)
    }
  ]
}))
</script>

<style scoped>
.level-excellent {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}

.level-high {
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
}

.level-medium {
  background: rgba(234, 179, 8, 0.14);
  color: #b45309;
}

.level-low {
  background: rgba(100, 116, 139, 0.14);
  color: #475569;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
