<template>
  <section class="bg-white py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {{ $t('home.applicationSection.eyebrow') }}
        </p>
        <h2 class="mt-3 text-3xl font-black text-primary sm:text-4xl">
          {{ $t('home.applicationSection.title') }}
        </h2>
        <p class="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
          {{ $t('home.applicationSection.description') }}
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="application in displayedApplications"
          :key="application.slug"
          class="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
        >
          <div class="flex items-start gap-4 border-l-4 border-transparent pl-4 transition-colors duration-200 group-hover:border-primary">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl"
              :aria-label="$t('home.applicationSection.iconAria', { name: application.name })"
            >
              {{ application.icon }}
            </span>
            <div class="min-w-0">
              <h3 class="text-xl font-bold text-slate-900">
                {{ application.name }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                {{ application.summary }}
              </p>
              <NuxtLink
                :to="localePath(`/applications/${application.slug}`)"
                class="mt-5 inline-flex items-center text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                :aria-label="$t('home.applicationSection.detailAria', { name: application.name })"
              >
                {{ $t('home.applicationSection.detail') }}
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useApplications } from '~/composables/useApplications'

const { applications } = useApplications()
const localePath = useLocalePath()

const iconMap: Record<string, string> = {
  'mining-grading': '⛏️',
  'coal-dewatering': '🌊',
  'industrial-grading': '🏭'
}

const displayedApplications = computed(() => {
  return applications.value.map((application) => ({
    id: application.id,
    slug: application.slug,
    name: application.name,
    summary: application.summary,
    icon: iconMap[application.slug] ?? '⚙️'
  }))
})
</script>

<style scoped>
</style>
