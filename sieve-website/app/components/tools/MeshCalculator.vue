<template>
  <div class="surface-card overflow-hidden">
    <div class="border-b border-brand-line bg-brand-surface-strong px-5 py-4">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="eyebrow">{{ $t('meshCalculator.eyebrow') }}</p>
          <h3 class="mt-2 text-lg font-semibold text-brand-ink">
            {{ $t('meshCalculator.title') }}
          </h3>
        </div>
        <div class="mono-meta rounded-full border border-brand-line bg-white px-3 py-1 text-brand-muted">
          ASTM E11
        </div>
      </div>
    </div>

    <div class="p-5 sm:p-6">
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="field-label">
            {{ $t('meshCalculator.fields.mesh') }}
          </label>
          <div class="field-wrap-light">
            <input
              v-model.number="mesh"
              type="number"
              class="w-full border-0 bg-transparent px-0 text-sm font-medium text-brand-ink outline-none placeholder:text-slate-400"
              placeholder="10"
              @input="updateFromMesh"
            >
            <span class="mono-meta text-brand-muted">{{ $t('meshCalculator.units.mesh') }}</span>
          </div>
        </div>

        <div>
          <label class="field-label">
            {{ $t('meshCalculator.fields.aperture') }}
          </label>
          <div class="field-wrap-light">
            <input
              v-model.number="aperture"
              type="number"
              step="0.01"
              class="w-full border-0 bg-transparent px-0 text-sm font-medium text-brand-ink outline-none placeholder:text-slate-400"
              placeholder="2.00"
              @input="updateFromAperture"
            >
            <span class="mono-meta text-brand-muted">{{ $t('meshCalculator.units.metric') }}</span>
          </div>
        </div>

        <div>
          <label class="field-label">
            {{ $t('meshCalculator.fields.wireDiameter') }}
          </label>
          <div class="field-wrap-light">
            <input
              v-model.number="wireDia"
              type="number"
              step="0.01"
              class="w-full border-0 bg-transparent px-0 text-sm font-medium text-brand-ink outline-none placeholder:text-slate-400"
              placeholder="0.50"
            >
            <span class="mono-meta text-brand-muted">{{ $t('meshCalculator.units.metric') }}</span>
          </div>
        </div>

        <div>
          <label class="field-label">
            {{ $t('meshCalculator.fields.openingArea') }}
          </label>
          <div class="flex min-h-12 items-center justify-between rounded-2xl border border-accent/20 bg-accent/5 px-4">
            <span class="text-2xl font-semibold tracking-tight text-accent">{{ openingArea }}</span>
            <span class="mono-meta text-accent">%</span>
          </div>
        </div>
      </div>

      <div class="mt-5 h-1.5 overflow-hidden rounded-full bg-brand-line/70">
        <div
          class="h-full rounded-full bg-accent transition-all duration-500"
          :style="`width:${Math.min(parseFloat(openingArea), 100)}%`"
        />
      </div>

      <div class="surface-card-inset mt-5 px-4 py-3">
        <p class="text-xs leading-6 text-brand-muted">
          <span class="font-semibold text-brand-ink">{{ $t('meshCalculator.formula.apertureLabel') }}</span>
          {{ $t('meshCalculator.formula.apertureFormula') }}
          <span class="mx-2 text-brand-line">/</span>
          <span class="font-semibold text-brand-ink">{{ $t('meshCalculator.formula.openingAreaLabel') }}</span>
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
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
