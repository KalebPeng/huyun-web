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
import { defineAsyncComponent } from 'vue'

import HeroSection from '~/components/home/HeroSection.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

const ProductSection = defineAsyncComponent(() => import('~/components/home/ProductSection.vue'))
const ApplicationSection = defineAsyncComponent(() => import('~/components/home/ApplicationSection.vue'))
const AdvantageSection = defineAsyncComponent(() => import('~/components/home/AdvantageSection.vue'))
const FactorySection = defineAsyncComponent(() => import('~/components/home/FactorySection.vue'))
const CtaSection = defineAsyncComponent(() => import('~/components/home/CtaSection.vue'))

usePageSeoMeta({
  title: '华云网业 - 专业矿用筛网生产厂家',
  description:
    '华云网业专注于矿用焊接筛网、65锰编织筛网、聚氨酯筛板等高品质矿筛产品，为矿山、骨料和工业过滤提供耐磨、高效的筛分解决方案。'
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '华云网业',
        alternateName: 'Huayun Mesh',
        url: 'https://huayun-mesh.com',
        logo: 'https://huayun-mesh.com/logo.png',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '华云网业',
          addressLocality: '滨州市',
          addressRegion: '山东省',
          addressCountry: 'CN'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+86-13561559016',
          contactType: 'sales',
          areaServed: 'CN',
          availableLanguage: ['Chinese', 'English']
        },
        description: '领先的矿用筛网与高耐磨定制化方案提供商，专注生产焊接条缝筛、65Mn编织筛网及聚氨酯筛板。',
        knowsAbout: ['矿用筛网', '选煤脱水筛', '骨料分级', '高耐磨材质定制']
      })
    }
  ]
}))
</script>
