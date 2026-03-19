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
import AdvantageSection from '~/components/home/AdvantageSection.vue'
import ApplicationSection from '~/components/home/ApplicationSection.vue'
import CtaSection from '~/components/home/CtaSection.vue'
import FactorySection from '~/components/home/FactorySection.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import ProductSection from '~/components/home/ProductSection.vue'

// Home page
useHead({
  title: '专业筛网生产厂家 - 不锈钢筛网/过滤网/矿筛网定制',
  meta: [
    {
      name: 'description',
      content:
        '专业筛网生产厂家，提供不锈钢筛网、过滤网、矿筛网等多规格产品与定制化解决方案，服务矿山、粮食、工业、养殖等行业。'
    }
  ]
})
</script>
