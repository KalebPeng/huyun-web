<template>
  <div class="page-shell">
    <PageHero
      :eyebrow="$t('applicationsPage.eyebrow')"
      :title="$t('applicationsPage.title')"
      :description="$t('applicationsPage.description')"
    >
      <template #aside>
        <div class="surface-card-soft p-6">
          <p class="mono-meta text-brand-muted">{{ $t('applicationsPage.cardEyebrow') }}</p>
          <div class="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div class="metric-tile">
              <p class="metric-value">{{ applications.length }}</p>
              <p class="metric-label">{{ $t('nav.applications') }}</p>
            </div>
            <div class="metric-tile">
              <p class="metric-value">48h</p>
              <p class="metric-label">{{ $t('common.getQuote') }}</p>
            </div>
            <div class="metric-tile">
              <p class="metric-value">OEM</p>
              <p class="metric-label">{{ $t('common.supported') }}</p>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="page-section">
      <div class="section-shell">
        <SectionHeading
          :eyebrow="$t('applicationsPage.cardEyebrow')"
          :title="$t('applicationsPage.title')"
          :description="$t('applicationsPage.description')"
        />

        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="application in applications"
            :key="application.id"
            class="group surface-card flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-brand-surface-strong text-primary">
                <FeatureIcon :name="resolveIcon(application.slug)" class="h-7 w-7" />
              </div>
              <span class="mono-meta rounded-full border border-brand-line bg-brand-surface-strong px-3 py-1 text-brand-muted">
                {{ $t('applicationsPage.cardEyebrow') }}
              </span>
            </div>

            <h2 class="mt-6 text-2xl font-semibold tracking-tight text-brand-ink">
              {{ application.name }}
            </h2>
            <p class="summary-clamp mt-4 text-sm leading-7 text-brand-muted">
              {{ application.summary }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <Badge
                v-for="tag in application.useCases.slice(0, 3)"
                :key="tag"
                :label="tag"
                variant="default"
              />
            </div>

            <div class="mt-8 border-t border-brand-line/70 pt-5">
              <AppButton
                :to="`/applications/${application.slug}`"
                size="sm"
                :aria-label="$t('applicationsPage.cardAria', { name: application.name })"
              >
                {{ $t('applicationsPage.cardCta') }}
              </AppButton>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="page-section pt-0">
      <div class="section-shell">
        <CtaBand
          :eyebrow="$t('applicationsPage.eyebrow')"
          :title="$t('applicationsPage.ctaTitle')"
          :description="$t('applicationsPage.ctaDescription')"
          primary-to="/contact"
          :primary-label="$t('common.getQuote')"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'
import Badge from '~/components/common/Badge.vue'
import CtaBand from '~/components/common/CtaBand.vue'
import FeatureIcon from '~/components/common/FeatureIcon.vue'
import PageHero from '~/components/common/PageHero.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const localePath = useLocalePath()
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
const { fetchApplications } = useApplications()
const { data: applications } = await useAsyncData(
  () => `applications-list:${locale.value}`,
  fetchApplications,
  {
    default: () => [],
    watch: [locale]
  }
)

const resolveIcon = (slug: string) => {
  if (slug.includes('mining')) return 'mining'
  if (slug.includes('filtration')) return 'water'
  return 'industry'
}

const applicationListJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: t('applicationsPage.title'),
  description: t('applicationsPage.seo.description'),
  url: `${siteUrl}${localePath('/applications')}`,
  numberOfItems: applications.value.length,
  itemListElement: applications.value.map((application, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${siteUrl}${localePath(`/applications/${application.slug}`)}`,
    name: application.name
  }))
}))

usePageSeoMeta({
  title: t('applicationsPage.seo.title'),
  description: t('applicationsPage.seo.description')
})

useHead(() => ({
  script: applications.value.length
    ? [
        {
          key: 'applications-list-jsonld',
          type: 'application/ld+json',
          textContent: JSON.stringify(applicationListJsonLd.value)
        }
      ]
    : []
}))
</script>

<style scoped>
.summary-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
