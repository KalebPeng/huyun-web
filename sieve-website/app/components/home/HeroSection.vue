<template>
  <section class="page-hero overflow-hidden">
    <div class="section-shell relative py-14 sm:py-16 lg:py-20">
      <div class="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)] lg:gap-12">
        <div class="max-w-3xl">
          <p class="eyebrow">{{ $t('brand.tagline') }}</p>
          <h1 class="mt-5 text-balance text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[3.8rem] lg:leading-[1.02]">
            {{ $t('home.hero.title') }}
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
            {{ $t('home.hero.description') }}
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton
              to="/contact"
              size="lg"
              :aria-label="$t('home.hero.primaryCtaAria')"
              class="w-full sm:w-auto"
            >
              {{ $t('common.getQuote') }}
            </AppButton>
            <AppButton
              to="/products"
              variant="outline"
              size="lg"
              :aria-label="$t('home.hero.secondaryCtaAria')"
              class="w-full sm:w-auto"
            >
              {{ $t('home.hero.secondaryCta') }}
            </AppButton>
          </div>

          <div class="mt-10 grid gap-3 sm:grid-cols-2">
            <div class="surface-card-soft px-5 py-4">
              <p class="mono-meta text-brand-muted">{{ $t('home.hero.capabilityLabel') }}</p>
              <p class="mt-2 text-lg font-semibold text-brand-ink">
                {{ $t('home.hero.capabilityValue') }}
              </p>
            </div>
            <div class="surface-card-soft px-5 py-4">
              <p class="mono-meta text-brand-muted">{{ $t('home.hero.deliveryLabel') }}</p>
              <p class="mt-2 text-lg font-semibold text-brand-ink">
                {{ $t('home.hero.deliveryValue') }}
              </p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="surface-card overflow-hidden p-4 sm:p-5">
            <div class="grid h-full gap-4 sm:grid-cols-[1.12fr_0.88fr]">
              <article class="relative overflow-hidden rounded-[1.75rem] bg-brand-surface-strong">
                <NuxtImg
                  src="/images/products/stainless-woven-mesh/cover.webp"
                  :alt="$t('home.hero.imageAlt')"
                  width="960"
                  height="1120"
                  loading="eager"
                  fetchpriority="high"
                  sizes="100vw lg:44vw"
                  placeholder
                  class="h-full min-h-[360px] w-full object-cover"
                />
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#091322]/85 via-[#091322]/25 to-transparent p-5">
                  <p class="mono-meta text-slate-200">{{ $t('brand.tagline') }}</p>
                  <h2 class="mt-2 text-2xl font-semibold text-white">
                    {{ $t('brand.name') }}
                  </h2>
                </div>
              </article>

              <div class="grid gap-4">
                <article class="relative overflow-hidden rounded-[1.5rem] bg-primary">
                  <NuxtImg
                    src="/images/products/65mn-woven-screen/cover.webp"
                    :alt="$t('home.hero.imageAlt')"
                    width="720"
                    height="560"
                    loading="lazy"
                    fetchpriority="low"
                    sizes="100vw sm:50vw lg:20vw"
                    placeholder
                    class="h-full min-h-[172px] w-full object-cover"
                  />
                </article>
                <article class="relative overflow-hidden rounded-[1.5rem] bg-primary">
                  <NuxtImg
                    src="/images/products/polyurethane-screen/cover.webp"
                    :alt="$t('home.hero.imageAlt')"
                    width="720"
                    height="560"
                    loading="lazy"
                    fetchpriority="low"
                    sizes="100vw sm:50vw lg:20vw"
                    placeholder
                    class="h-full min-h-[172px] w-full object-cover"
                  />
                </article>
                <article class="surface-card-inset px-5 py-4">
                  <p class="mono-meta text-brand-muted">{{ $t('home.hero.capabilityLabel') }}</p>
                  <p class="mt-2 text-base font-semibold text-brand-ink">{{ $t('home.hero.capabilityValue') }}</p>
                  <div class="mt-4 flex items-center gap-3 rounded-2xl border border-brand-line bg-white px-4 py-3">
                    <FeatureIcon name="factory" tone="accent" />
                    <div>
                      <p class="mono-meta text-brand-muted">{{ $t('home.hero.deliveryLabel') }}</p>
                      <p class="mt-1 text-sm font-semibold text-brand-ink">{{ $t('home.hero.deliveryValue') }}</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="metric-tile"
        >
          <p class="metric-value">{{ stat.value }}</p>
          <p class="metric-label">{{ stat.label }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '~/components/common/AppButton.vue'
import FeatureIcon from '~/components/common/FeatureIcon.vue'

interface TrustStat {
  value: string
  label: string
}

const { t } = useI18n()

const stats = computed<TrustStat[]>(() => [
  { value: t('home.hero.statsValues.experience'), label: t('home.hero.stats.experience') },
  { value: '500+', label: t('home.hero.stats.clients') },
  { value: '200+', label: t('home.hero.stats.skus') },
  { value: '48h', label: t('home.hero.stats.response') }
])
</script>
