<template>
  <div class="bg-slate-50">
    <section class="relative isolate overflow-hidden bg-[linear-gradient(135deg,#0f172a,#1e293b)] py-20 text-white sm:py-24">
      <div
        class="absolute inset-0 opacity-30"
        aria-hidden="true"
        style="background-image:
          linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
          radial-gradient(circle at top right, rgba(14,165,233,0.28), transparent 30%); background-size: 28px 28px, 28px 28px, auto;"
      />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
            {{ $t('contentStandardsPage.eyebrow') }}
          </p>
          <h1 class="mt-4 text-4xl font-black sm:text-5xl">
            {{ $t('contentStandardsPage.title') }}
          </h1>
          <p class="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
            {{ $t('contentStandardsPage.description') }}
          </p>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="item in trustHighlights"
            :key="item.title"
            class="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
          >
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
              {{ item.title }}
            </p>
            <p class="mt-3 text-sm leading-7 text-slate-100">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t('contentStandardsPage.rolesEyebrow') }}
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            {{ $t('contentStandardsPage.rolesTitle') }}
          </h2>
          <div class="mt-6 space-y-5 text-sm leading-7 text-slate-600">
            <div v-for="item in roleItems" :key="item.title">
              <p class="font-bold text-slate-900">{{ item.title }}</p>
              <p class="mt-2">{{ item.description }}</p>
            </div>
          </div>
        </article>

        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t('contentStandardsPage.sourcePolicyEyebrow') }}
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            {{ $t('contentStandardsPage.sourcePolicyTitle') }}
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in sourcePolicy"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {{ $t('contentStandardsPage.workflowEyebrow') }}
        </p>
        <h2 class="mt-2 text-3xl font-black text-slate-950">
          {{ $t('contentStandardsPage.workflowTitle') }}
        </h2>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="step in reviewWorkflow"
            :key="step.step"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p class="text-sm font-black text-accent">0{{ step.step }}</p>
            <h3 class="mt-4 text-xl font-bold text-slate-900">
              {{ step.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ step.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t('contentStandardsPage.updateRulesEyebrow') }}
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            {{ $t('contentStandardsPage.updateRulesTitle') }}
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in updateRules"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {{ $t('contentStandardsPage.boundaryEyebrow') }}
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            {{ $t('contentStandardsPage.boundaryTitle') }}
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in boundaryNotes"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-2xl font-black sm:text-3xl">
                {{ $t('contentStandardsPage.ctaTitle') }}
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                {{ $t('contentStandardsPage.ctaDescription') }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                :to="localePath('/knowledge')"
                class="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-slate-100"
              >
                {{ $t('contentStandardsPage.ctaKnowledge') }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/contact')"
                class="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {{ $t('contentStandardsPage.ctaFeedback') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'

interface TrustHighlight {
  title: string
  description: string
}

interface WorkflowStep {
  step: number
  title: string
  description: string
}

interface RoleItem {
  title: string
  description: string
}

const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
const localePath = useLocalePath()
const { t, localeProperties } = useI18n()

const trustHighlights = computed<TrustHighlight[]>(() => [
  { title: t('contentStandardsPage.trustHighlights.namedReview.title'), description: t('contentStandardsPage.trustHighlights.namedReview.description') },
  { title: t('contentStandardsPage.trustHighlights.traceableSources.title'), description: t('contentStandardsPage.trustHighlights.traceableSources.description') },
  { title: t('contentStandardsPage.trustHighlights.clearBoundary.title'), description: t('contentStandardsPage.trustHighlights.clearBoundary.description') },
  { title: t('contentStandardsPage.trustHighlights.correctionTrigger.title'), description: t('contentStandardsPage.trustHighlights.correctionTrigger.description') }
])

const roleItems = computed<RoleItem[]>(() => [
  { title: t('contentStandardsPage.roles.writerTitle'), description: t('contentStandardsPage.roles.writerDescription') },
  { title: t('contentStandardsPage.roles.reviewerTitle'), description: t('contentStandardsPage.roles.reviewerDescription') },
  { title: t('contentStandardsPage.roles.publisherTitle'), description: t('contentStandardsPage.roles.publisherDescription') }
])

const sourcePolicy = computed<string[]>(() => [
  t('contentStandardsPage.sourcePolicy.one'),
  t('contentStandardsPage.sourcePolicy.two'),
  t('contentStandardsPage.sourcePolicy.three'),
  t('contentStandardsPage.sourcePolicy.four')
])

const reviewWorkflow = computed<WorkflowStep[]>(() => [
  { step: 1, title: t('contentStandardsPage.workflow.step1.title'), description: t('contentStandardsPage.workflow.step1.description') },
  { step: 2, title: t('contentStandardsPage.workflow.step2.title'), description: t('contentStandardsPage.workflow.step2.description') },
  { step: 3, title: t('contentStandardsPage.workflow.step3.title'), description: t('contentStandardsPage.workflow.step3.description') },
  { step: 4, title: t('contentStandardsPage.workflow.step4.title'), description: t('contentStandardsPage.workflow.step4.description') }
])

const updateRules = computed<string[]>(() => [
  t('contentStandardsPage.updateRules.one'),
  t('contentStandardsPage.updateRules.two'),
  t('contentStandardsPage.updateRules.three'),
  t('contentStandardsPage.updateRules.four')
])

const boundaryNotes = computed<string[]>(() => [
  t('contentStandardsPage.boundary.one'),
  t('contentStandardsPage.boundary.two'),
  t('contentStandardsPage.boundary.three')
])

const pageTitle = computed(() => t('contentStandardsPage.seo.title'))
const pageDescription = computed(() => t('contentStandardsPage.seo.description'))

usePageSeoMeta({
  title: pageTitle.value,
  description: pageDescription.value
})

useHead(() => ({
  script: [
    {
      key: 'content-standards-jsonld',
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'AboutPage',
            '@id': `${siteUrl}${localePath('/content-standards')}#page`,
            name: pageTitle.value,
            description: pageDescription.value,
            url: `${siteUrl}${localePath('/content-standards')}`,
            inLanguage: localeProperties.value.language || 'zh-CN',
            about: {
              '@id': `${siteUrl}#organization`
            },
            publisher: {
              '@id': `${siteUrl}#organization`
            }
          },
          {
            '@type': 'Organization',
            '@id': `${siteUrl}#organization`,
            name: t('brand.name'),
            url: siteUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/favicon.ico`
            },
            publishingPrinciples: `${siteUrl}${localePath('/content-standards')}`
          }
        ]
      })
    }
  ]
}))
</script>
