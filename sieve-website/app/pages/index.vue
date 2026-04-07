<template>
  <div>
    <HeroSection />
    <ProductSection />
    <ApplicationSection />
    <AdvantageSection />
    <FactorySection />
    <CtaSection />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

import HeroSection from '~/components/home/HeroSection.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

const ProductSection = defineAsyncComponent(() => import('~/components/home/ProductSection.vue'))
const ApplicationSection = defineAsyncComponent(() => import('~/components/home/ApplicationSection.vue'))
const AdvantageSection = defineAsyncComponent(() => import('~/components/home/AdvantageSection.vue'))
const FactorySection = defineAsyncComponent(() => import('~/components/home/FactorySection.vue'))
const CtaSection = defineAsyncComponent(() => import('~/components/home/CtaSection.vue'))

const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
const { t, localeProperties } = useI18n()

usePageSeoMeta({
  title: t('home.seo.title'),
  description: t('home.seo.description')
})

const organizationJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: t('brand.name'),
  alternateName: 'Huayun Mesh',
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: t('seo.address.street'),
    addressLocality: t('seo.address.locality'),
    addressRegion: t('seo.address.region'),
    addressCountry: 'CN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86-13561559016',
    contactType: 'sales',
    areaServed: 'CN',
    availableLanguage: ['Chinese', 'English']
  },
  description: t('home.seo.description'),
  knowsAbout: [
    t('seo.knowsAbout.miningMesh'),
    t('seo.knowsAbout.dewatering'),
    t('seo.knowsAbout.aggregate'),
    t('seo.knowsAbout.custom')
  ],
  inLanguage: localeProperties.value.language || 'en'
}))

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify(organizationJsonLd.value)
    }
  ]
}))
</script>

