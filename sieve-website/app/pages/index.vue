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
  title: '专业筛网生产厂家 - 不锈钢筛网/过滤网/矿筛网定制',
  description:
    '专业筛网生产厂家，提供不锈钢筛网、过滤网、矿筛网等多规格产品与定制化解决方案，服务矿山、粮食、工业、养殖等行业。'
})
</script>
