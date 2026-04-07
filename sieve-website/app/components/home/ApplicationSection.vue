<template>
  <section class="page-section bg-white/55">
    <div class="section-shell">
      <SectionHeading
        :eyebrow="$t('home.applicationSection.eyebrow')"
        :title="$t('home.applicationSection.title')"
        :description="$t('home.applicationSection.description')"
      />

      <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="application in displayedApplications"
          :key="application.slug"
          class="surface-card flex h-full flex-col p-6"
        >
          <FeatureIcon
            :name="application.icon"
            tone="accent"
            :aria-label="$t('home.applicationSection.iconAria', { name: application.name })"
          />
          <h3 class="mt-5 text-2xl font-semibold tracking-tight text-brand-ink">
            {{ application.name }}
          </h3>
          <p class="mt-4 text-sm leading-7 text-brand-muted">
            {{ application.summary }}
          </p>
          <NuxtLink
            :to="localePath(`/applications/${application.slug}`)"
            class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors duration-200 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            :aria-label="$t('home.applicationSection.detailAria', { name: application.name })"
          >
            {{ $t('home.applicationSection.detail') }}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import FeatureIcon from '~/components/common/FeatureIcon.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { useApplications } from '~/composables/useApplications'

const { applications } = useApplications()
const localePath = useLocalePath()

const iconMap: Record<string, 'mining' | 'water' | 'industry'> = {
  'mining-grading': 'mining',
  'coal-dewatering': 'water',
  'industrial-grading': 'industry'
}

const displayedApplications = computed(() => {
  return applications.value.map((application) => ({
    id: application.id,
    slug: application.slug,
    name: application.name,
    summary: application.summary,
    icon: iconMap[application.slug] ?? 'industry'
  }))
})
</script>
