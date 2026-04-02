<template>
  <div class="tools-page min-h-screen">
    <section class="tools-hero relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16">
      <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div class="hero-glow pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
            <span class="h-1.5 w-1.5 rounded-full bg-accent" />
            {{ $t('toolsPage.eyebrow') }}
          </div>
          <h1 class="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {{ $t('toolsPage.title') }}
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
            {{ $t('toolsPage.description') }}
          </p>
        </div>
      </div>
    </section>

    <section class="relative pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div class="space-y-6">
            <div class="calc-card overflow-hidden rounded-2xl">
              <div class="calc-card-header flex items-center justify-between px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="calc-icon-wrap flex h-9 w-9 items-center justify-center rounded-lg">
                    <svg class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      <path d="M9 9h6M9 12h6M9 15h4" />
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-sm font-bold text-white">{{ $t('toolsPage.converter.title') }}</h2>
                    <p class="text-[11px] text-slate-500">{{ $t('toolsPage.converter.subtitle') }}</p>
                  </div>
                </div>
                <span class="std-badge">ASTM E11</span>
              </div>

              <div class="px-6 pb-6">
                <div class="grid gap-5 sm:grid-cols-3">
                  <div class="field-group">
                    <label class="field-label">{{ $t('meshCalculator.fields.mesh') }}</label>
                    <div class="field-wrap">
                      <input
                        v-model.number="mesh"
                        type="number"
                        min="1"
                        class="field-input"
                        :placeholder="$t('toolsPage.placeholders.mesh')"
                        @input="updateFromMesh"
                      />
                      <span class="field-unit">{{ $t('meshCalculator.units.mesh') }}</span>
                    </div>
                  </div>

                  <div class="field-group">
                    <label class="field-label">{{ $t('meshCalculator.fields.aperture') }}</label>
                    <div class="field-wrap">
                      <input
                        v-model.number="aperture"
                        type="number"
                        step="0.001"
                        min="0"
                        class="field-input"
                        :placeholder="$t('toolsPage.placeholders.aperture')"
                        @input="updateFromAperture"
                      />
                      <span class="field-unit">{{ $t('meshCalculator.units.metric') }}</span>
                    </div>
                  </div>

                  <div class="field-group">
                    <label class="field-label">{{ $t('meshCalculator.fields.wireDiameter') }}</label>
                    <div class="field-wrap">
                      <input
                        v-model.number="wireDia"
                        type="number"
                        step="0.01"
                        min="0.01"
                        class="field-input"
                        :placeholder="$t('toolsPage.placeholders.wire')"
                      />
                      <span class="field-unit">{{ $t('meshCalculator.units.metric') }}</span>
                    </div>
                  </div>
                </div>

                <div class="result-panel mt-5 grid gap-3 sm:grid-cols-2">
                  <div class="result-item">
                    <span class="result-label">{{ $t('meshCalculator.fields.openingArea') }}</span>
                    <div class="result-value-wrap">
                      <span class="result-value">{{ openingArea }}</span>
                      <span class="result-unit">%</span>
                    </div>
                    <div class="result-bar-bg mt-2 overflow-hidden rounded-full">
                      <div
                        class="result-bar-fill h-full rounded-full transition-all duration-700 ease-out"
                        :style="`width:${Math.min(parseFloat(openingArea), 100)}%`"
                      />
                    </div>
                  </div>

                  <div class="result-item">
                    <span class="result-label">{{ $t('toolsPage.pitchLabel') }}</span>
                    <div class="result-value-wrap">
                      <span class="result-value">{{ pitch }}</span>
                      <span class="result-unit">{{ $t('meshCalculator.units.metric') }}</span>
                    </div>
                    <p class="mt-2 text-[11px] text-slate-600">{{ $t('toolsPage.pitchDescription') }}</p>
                  </div>
                </div>

                <details class="formula-details mt-5">
                  <summary class="formula-summary cursor-pointer">{{ $t('toolsPage.formulaSummary') }}</summary>
                  <div class="formula-body mt-3 grid gap-3 sm:grid-cols-2">
                    <div class="formula-card">
                      <p class="formula-name">{{ $t('toolsPage.formulas.apertureTitle') }}</p>
                      <code class="formula-code">W = 25.4 / M − d</code>
                      <p class="formula-desc">{{ $t('toolsPage.formulas.apertureDescription') }}</p>
                    </div>
                    <div class="formula-card">
                      <p class="formula-name">{{ $t('toolsPage.formulas.openingAreaTitle') }}</p>
                      <code class="formula-code">OA = (W / (W + d))² × 100</code>
                      <p class="formula-desc">{{ $t('toolsPage.formulas.openingAreaDescription') }}</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            <div class="calc-card overflow-hidden rounded-2xl">
              <div class="calc-card-header px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="calc-icon-wrap flex h-9 w-9 items-center justify-center rounded-lg">
                    <svg class="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <path d="M3 10h18M3 14h18M10 3v18M14 3v18" />
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-sm font-bold text-white">{{ $t('toolsPage.referenceTitle') }}</h2>
                    <p class="text-[11px] text-slate-500">{{ $t('toolsPage.referenceSubtitle') }}</p>
                  </div>
                </div>
              </div>

              <div class="overflow-x-auto px-0">
                <table class="ref-table min-w-full text-xs">
                  <thead>
                    <tr>
                      <th class="ref-th">{{ $t('toolsPage.table.mesh') }}</th>
                      <th class="ref-th">{{ $t('toolsPage.table.aperture') }}</th>
                      <th class="ref-th">{{ $t('toolsPage.table.wire') }}</th>
                      <th class="ref-th">{{ $t('toolsPage.table.openingArea') }}</th>
                      <th class="ref-th">{{ $t('toolsPage.table.useCase') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="row in referenceData"
                      :key="row.mesh"
                      class="ref-row cursor-pointer"
                      :class="{ 'ref-row-active': selectedRef === row.mesh }"
                      @click="applyRefRow(row)"
                    >
                      <td class="ref-td font-bold text-white">{{ row.mesh }}</td>
                      <td class="ref-td font-mono text-accent">{{ row.aperture }}</td>
                      <td class="ref-td font-mono text-slate-300">{{ row.wire }}</td>
                      <td class="ref-td">
                        <div class="flex items-center gap-2">
                          <div class="h-1.5 w-12 overflow-hidden rounded-full bg-slate-700">
                            <div class="h-full rounded-full bg-accent/70" :style="`width:${row.oa}%`" />
                          </div>
                          <span class="text-slate-300">{{ row.oa }}%</span>
                        </div>
                      </td>
                      <td class="ref-td text-slate-500">{{ row.use }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="px-6 pb-4 pt-2 text-[11px] text-slate-600">{{ $t('toolsPage.tableHint') }}</p>
            </div>
          </div>

          <div class="space-y-5">
            <div class="side-card rounded-2xl p-5">
              <h3 class="side-card-title">{{ $t('toolsPage.materialGuideTitle') }}</h3>
              <div class="mt-4 space-y-3">
                <div v-for="mat in materialGuide" :key="mat.name" class="mat-row">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-white">{{ mat.name }}</span>
                    <span class="mat-badge" :class="`mat-badge-${mat.level}`">{{ mat.levelText }}</span>
                  </div>
                  <p class="mt-1 text-[11px] leading-5 text-slate-500">{{ mat.note }}</p>
                </div>
              </div>
            </div>

            <div class="side-card rounded-2xl p-5">
              <h3 class="side-card-title">{{ $t('toolsPage.decisionTitle') }}</h3>
              <div class="mt-4 space-y-2.5">
                <div v-for="step in decisionSteps" :key="step.q" class="decision-item rounded-xl p-3">
                  <p class="text-[11px] font-semibold text-slate-300">{{ step.q }}</p>
                  <p class="mt-1 text-[11px] text-accent">→ {{ step.a }}</p>
                </div>
              </div>
            </div>

            <div class="cta-card rounded-2xl p-5 text-center">
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-blue-300/70">{{ $t('toolsPage.supportEyebrow') }}</p>
              <p class="mt-2 whitespace-pre-line text-sm font-semibold text-white">{{ $t('toolsPage.supportTitle') }}</p>
              <NuxtLink
                :to="localePath('/contact')"
                class="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                {{ $t('toolsPage.supportCta') }}
              </NuxtLink>
              <a
                href="tel:4001234567"
                class="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors duration-200 hover:border-white/20 hover:text-white"
              >
                {{ $t('toolsPage.callCta') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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
  return '—'
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
      inLanguage: localeProperties.value.language || 'zh-CN',
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
      inLanguage: localeProperties.value.language || 'zh-CN',
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
.tools-page {
  background-color: #0b1120;
  background-image:
    radial-gradient(ellipse 80% 40% at 50% -10%, rgba(37,99,235,0.12) 0%, transparent 60%);
}

.hero-grid {
  background-image:
    linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 70%);
}

.calc-card {
  background: #111827;
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 4px 6px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2);
}

.calc-card-header {
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
}

.calc-icon-wrap {
  background: rgba(37,99,235,0.12);
  border: 1px solid rgba(37,99,235,0.2);
}

.std-badge {
  font-family: monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(147, 197, 253, 0.8);
  background: rgba(37,99,235,0.1);
  border: 1px solid rgba(37,99,235,0.2);
  border-radius: 4px;
  padding: 2px 8px;
}

.field-group { display: flex; flex-direction: column; gap: 6px; }

.field-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #475569;
}

.field-wrap {
  display: flex;
  align-items: center;
  background: #0f172a;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.15s;
}

.field-wrap:focus-within {
  border-color: rgba(37,99,235,0.7);
  box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
}

.field-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 0;
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 600;
  padding: 9px 12px;
  outline: none;
}

.field-input::placeholder { color: #334155; }

.field-unit {
  padding: 0 10px 0 6px;
  font-size: 11px;
  font-weight: 600;
  color: #334155;
  font-family: monospace;
}

.field-input::-webkit-inner-spin-button,
.field-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.field-input { -moz-appearance: textfield; }

.result-panel {
  background: #0f172a;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 16px;
}

.result-item { display: flex; flex-direction: column; }

.result-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #475569;
}

.result-value-wrap { display: flex; align-items: baseline; gap: 6px; margin-top: 6px; }

.result-value {
  font-size: 28px;
  font-weight: 900;
  font-family: monospace;
  color: #60a5fa;
  letter-spacing: -0.02em;
  line-height: 1;
}

.result-unit {
  font-size: 13px;
  font-weight: 700;
  color: #334155;
}

.result-bar-bg {
  height: 4px;
  background: rgba(255,255,255,0.06);
  border-radius: 99px;
}

.result-bar-fill {
  background: linear-gradient(90deg, #1d4ed8, #60a5fa);
}

.formula-details > summary { list-style: none; }
.formula-details > summary::-webkit-details-marker { display: none; }

.formula-summary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  transition: color 0.15s;
}
.formula-summary:hover { color: #64748b; }
.formula-summary::before {
  content: '›';
  font-size: 14px;
  transition: transform 0.2s;
}
details[open] .formula-summary::before { transform: rotate(90deg); }

.formula-card {
  background: #0f172a;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 12px 14px;
}

.formula-name {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #475569;
  margin-bottom: 6px;
}

.formula-code {
  display: block;
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  color: #93c5fd;
  background: rgba(37,99,235,0.08);
  border-radius: 6px;
  padding: 6px 10px;
  margin-bottom: 6px;
}

.formula-desc {
  font-size: 11px;
  color: #334155;
  line-height: 1.5;
}

.ref-table { border-collapse: collapse; }
.ref-th {
  padding: 8px 16px;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #334155;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  white-space: nowrap;
}

.ref-row {
  transition: background-color 0.12s;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.ref-row:hover { background: rgba(37,99,235,0.07); }
.ref-row-active { background: rgba(37,99,235,0.12) !important; }

.ref-td {
  padding: 8px 16px;
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
}

.side-card {
  background: #111827;
  border: 1px solid rgba(255,255,255,0.07);
}

.side-card-title {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #e2e8f0;
}

.mat-badge {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  border-radius: 4px;
  padding: 1px 7px;
}

.mat-badge-excellent { background: rgba(16,185,129,0.15); color: #34d399; }
.mat-badge-high { background: rgba(37,99,235,0.15); color: #60a5fa; }
.mat-badge-medium { background: rgba(234,179,8,0.15); color: #fbbf24; }
.mat-badge-low { background: rgba(100,116,139,0.15); color: #94a3b8; }

.mat-row {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.mat-row:last-child { padding-bottom: 0; border-bottom: none; }

.decision-item {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
}

.cta-card {
  background: linear-gradient(145deg, #1a2744, #1e3a8a);
  border: 1px solid rgba(96,165,250,0.2);
  box-shadow: 0 0 40px rgba(37,99,235,0.12);
}
</style>
