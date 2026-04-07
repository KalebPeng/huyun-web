<template>
  <section class="page-section">
    <div class="section-shell">
      <SectionHeading
        :eyebrow="$t('home.advantageSection.eyebrow')"
        :title="$t('home.advantageSection.title')"
        :description="$t('home.advantageSection.description')"
      />

      <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="advantage in advantages"
          :key="advantage.key"
          class="surface-card p-6"
        >
          <FeatureIcon :name="advantage.icon" tone="accent" />
          <h3 class="mt-5 text-2xl font-semibold tracking-tight text-brand-ink">
            {{ advantage.title }}
          </h3>
          <p class="mt-4 text-sm leading-7 text-brand-muted">
            {{ advantage.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import FeatureIcon from '~/components/common/FeatureIcon.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'

interface AdvantageItem {
  key: string
  icon: 'specs' | 'custom' | 'factory' | 'response' | 'quality' | 'delivery'
  title: string
  description: string
}

const { t } = useI18n()

const advantages = computed<AdvantageItem[]>(() => [
  {
    key: 'specs',
    icon: 'specs',
    title: t('home.advantageSection.items.specs.title'),
    description: t('home.advantageSection.items.specs.description')
  },
  {
    key: 'custom',
    icon: 'custom',
    title: t('home.advantageSection.items.custom.title'),
    description: t('home.advantageSection.items.custom.description')
  },
  {
    key: 'factory',
    icon: 'factory',
    title: t('home.advantageSection.items.factory.title'),
    description: t('home.advantageSection.items.factory.description')
  },
  {
    key: 'response',
    icon: 'response',
    title: t('home.advantageSection.items.response.title'),
    description: t('home.advantageSection.items.response.description')
  },
  {
    key: 'quality',
    icon: 'quality',
    title: t('home.advantageSection.items.quality.title'),
    description: t('home.advantageSection.items.quality.description')
  },
  {
    key: 'delivery',
    icon: 'delivery',
    title: t('home.advantageSection.items.delivery.title'),
    description: t('home.advantageSection.items.delivery.description')
  }
])
</script>
