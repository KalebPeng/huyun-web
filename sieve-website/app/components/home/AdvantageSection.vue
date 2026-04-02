<template>
  <section class="bg-primary py-16 text-white sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
          {{ $t('home.advantageSection.eyebrow') }}
        </p>
        <h2 class="mt-3 text-3xl font-black sm:text-4xl">
          {{ $t('home.advantageSection.title') }}
        </h2>
        <p class="mt-4 text-base leading-8 text-slate-200 sm:text-lg">
          {{ $t('home.advantageSection.description') }}
        </p>
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="advantage in advantages"
          :key="advantage.key"
          class="rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm"
        >
          <div class="flex items-start gap-4">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl"
              :aria-label="$t('home.advantageSection.iconAria', { title: advantage.title })"
            >
              {{ advantage.icon }}
            </span>
            <div>
              <h3 class="text-xl font-bold text-white">
                {{ advantage.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-slate-200">
                {{ advantage.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface AdvantageItem {
  key: string
  icon: string
  title: string
  description: string
}

const { t } = useI18n()

const advantages = computed<AdvantageItem[]>(() => [
  {
    key: 'specs',
    icon: '📏',
    title: t('home.advantageSection.items.specs.title'),
    description: t('home.advantageSection.items.specs.description')
  },
  {
    key: 'custom',
    icon: '🛠️',
    title: t('home.advantageSection.items.custom.title'),
    description: t('home.advantageSection.items.custom.description')
  },
  {
    key: 'factory',
    icon: '🏭',
    title: t('home.advantageSection.items.factory.title'),
    description: t('home.advantageSection.items.factory.description')
  },
  {
    key: 'response',
    icon: '⏱️',
    title: t('home.advantageSection.items.response.title'),
    description: t('home.advantageSection.items.response.description')
  },
  {
    key: 'quality',
    icon: '✅',
    title: t('home.advantageSection.items.quality.title'),
    description: t('home.advantageSection.items.quality.description')
  },
  {
    key: 'delivery',
    icon: '🚚',
    title: t('home.advantageSection.items.delivery.title'),
    description: t('home.advantageSection.items.delivery.description')
  }
])
</script>

<style scoped>
</style>
