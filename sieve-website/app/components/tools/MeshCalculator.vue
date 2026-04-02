<template>
  <div class="calculator-shell overflow-hidden rounded-2xl border border-slate-200/80">
    <div class="calc-header flex items-start justify-between px-5 py-4">
      <div>
        <p class="calc-label text-[10px] font-bold uppercase tracking-[0.28em] text-blue-200/80">
          {{ $t('meshCalculator.eyebrow') }}
        </p>
        <h3 class="mt-0.5 text-base font-bold text-white">
          {{ $t('meshCalculator.title') }}
        </h3>
      </div>
      <div class="calc-badge mt-0.5 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200">
        ASTM E11
      </div>
    </div>

    <div class="calc-body space-y-4 p-5">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="calc-field-label mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {{ $t('meshCalculator.fields.mesh') }}
          </label>
          <div class="calc-input-wrap flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/30">
            <input
              v-model.number="mesh"
              type="number"
              class="h-9 min-w-0 flex-1 border-0 bg-transparent pl-3 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none"
              placeholder="10"
              @input="updateFromMesh"
            />
            <span class="pr-3 text-[11px] font-medium text-slate-400">{{ $t('meshCalculator.units.mesh') }}</span>
          </div>
        </div>

        <div>
          <label class="calc-field-label mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {{ $t('meshCalculator.fields.aperture') }}
          </label>
          <div class="calc-input-wrap flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/30">
            <input
              v-model.number="aperture"
              type="number"
              step="0.01"
              class="h-9 min-w-0 flex-1 border-0 bg-transparent pl-3 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none"
              placeholder="2.00"
              @input="updateFromAperture"
            />
            <span class="pr-3 text-[11px] font-medium text-slate-400">{{ $t('meshCalculator.units.metric') }}</span>
          </div>
        </div>

        <div>
          <label class="calc-field-label mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {{ $t('meshCalculator.fields.wireDiameter') }}
          </label>
          <div class="calc-input-wrap flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/30">
            <input
              v-model.number="wireDia"
              type="number"
              step="0.01"
              class="h-9 min-w-0 flex-1 border-0 bg-transparent pl-3 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none"
              placeholder="0.50"
            />
            <span class="pr-3 text-[11px] font-medium text-slate-400">{{ $t('meshCalculator.units.metric') }}</span>
          </div>
        </div>

        <div>
          <label class="calc-field-label mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {{ $t('meshCalculator.fields.openingArea') }}
          </label>
          <div class="result-display flex h-9 items-center justify-between overflow-hidden rounded-lg border border-accent/25 bg-blue-50 px-3">
            <span class="text-sm font-bold tabular-nums text-accent">{{ openingArea }}</span>
            <span class="text-[11px] font-semibold text-accent/70">%</span>
          </div>
        </div>
      </div>

      <div class="openrate-bar overflow-hidden rounded-full bg-slate-100" style="height:4px">
        <div
          class="h-full rounded-full bg-accent transition-all duration-500"
          :style="`width:${Math.min(parseFloat(openingArea), 100)}%`"
        />
      </div>

      <div class="formula-hint rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
        <p class="text-[11px] leading-5 text-slate-500">
          <span class="font-semibold text-slate-600">{{ $t('meshCalculator.formula.apertureLabel') }}</span>
          {{ $t('meshCalculator.formula.apertureFormula') }}
          <span class="mx-2 text-slate-300">·</span>
          <span class="font-semibold text-slate-600">{{ $t('meshCalculator.formula.openingAreaLabel') }}</span>
          {{ $t('meshCalculator.formula.openingAreaFormula') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const mesh = ref<number | null>(null)
const aperture = ref<number | null>(null)
const wireDia = ref<number>(0.5)

const updateFromMesh = () => {
  if (mesh.value && mesh.value > 0) {
    aperture.value = Number((25.4 / mesh.value - wireDia.value).toFixed(3))
  }
}

const updateFromAperture = () => {
  if (aperture.value && aperture.value > 0) {
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
</script>

<style scoped>
.calculator-shell {
  background: #ffffff;
}

.calc-header {
  background: linear-gradient(135deg, #1a2744, #223060);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.calc-badge {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
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
