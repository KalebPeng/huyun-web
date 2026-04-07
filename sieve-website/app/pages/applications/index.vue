<template>
  <div class="bg-slate-50">
    <section class="bg-[linear-gradient(135deg,#111827,#1a2744)] py-16 text-white sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
          {{ $t('applicationsPage.eyebrow') }}
        </p>
        <h1 class="mt-4 text-4xl font-black sm:text-5xl">
          {{ $t('applicationsPage.title') }}
        </h1>
        <p class="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
          {{ $t('applicationsPage.description') }}
        </p>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="application in applications"
            :key="application.id"
            class="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
          >
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {{ $t('applicationsPage.cardEyebrow') }}
            </p>
            <h2 class="mt-3 text-2xl font-black text-slate-950">
              {{ application.name }}
            </h2>
            <p class="summary-clamp mt-4 text-sm leading-7 text-slate-600">
              {{ application.summary }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <Badge
                v-for="tag in application.useCases.slice(0, 3)"
                :key="tag"
                :label="tag"
                variant="primary"
              />
            </div>

            <div class="mt-8">
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

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-2xl font-black sm:text-3xl">
                {{ $t('applicationsPage.ctaTitle') }}
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                {{ $t('applicationsPage.ctaDescription') }}
              </p>
            </div>

            <AppButton
              to="/contact"
              size="lg"
              :aria-label="$t('applicationsPage.ctaAria')"
              class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
            >
              {{ $t('common.getQuote') }}
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'
import Badge from '~/components/common/Badge.vue'

const { t, locale } = useI18n()
const { fetchApplications } = useApplications()
const { data: applications } = await useAsyncData(
  () => `applications-list:${locale.value}`,
  fetchApplications,
  {
    default: () => [],
    watch: [locale]
  }
)

usePageSeoMeta({
  title: t('applicationsPage.seo.title'),
  description: t('applicationsPage.seo.description')
})
</script>

<style scoped>
.summary-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
