<template>
  <div class="bg-slate-50">
    <template v-if="application">
      <section class="border-b border-slate-200 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="面包屑导航" class="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <NuxtLink to="/" class="transition-colors hover:text-primary">
              首页
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink to="/applications" class="transition-colors hover:text-primary">
              应用场景
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <span class="font-medium text-slate-900">{{ application.name }}</span>
          </nav>
        </div>
      </section>

      <section class="py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Application Overview
              </p>
              <h1 class="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                {{ application.name }}
              </h1>
              <p class="mt-5 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
                {{ application.description }}
              </p>
            </div>

            <aside class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 class="text-xl font-black text-slate-950">
                常见问题与痛点
              </h2>
              <ul class="mt-5 space-y-4">
                <li
                  v-for="painPoint in painPoints"
                  :key="painPoint"
                  class="flex gap-3 text-sm leading-7 text-slate-600"
                >
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{{ painPoint }}</span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Key Considerations
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-950">
              选型关注点
            </h2>

            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="(consideration, index) in application.considerations"
                :key="consideration"
                class="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {{ index + 1 }}
                </div>
                <h3 class="mt-4 text-lg font-bold text-slate-900">
                  {{ consideration }}
                </h3>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Recommended Products
              </p>
              <h2 class="mt-2 text-2xl font-black text-slate-950">
                适合此场景的产品
              </h2>
            </div>
            <NuxtLink to="/products" class="text-sm font-semibold text-primary transition-colors hover:text-blue-600">
              查看全部产品
            </NuxtLink>
          </div>

          <div
            v-if="recommendedProducts.length"
            class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <ProductCard
              v-for="product in recommendedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <div
            v-else
            class="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm"
          >
            <p class="text-lg font-bold text-slate-900">
              暂无推荐产品
            </p>
            <p class="mt-3 text-sm leading-7 text-slate-500">
              当前场景推荐数据尚未补齐，可以直接联系我们获取人工选型建议。
            </p>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-[linear-gradient(135deg,#111827,#1a2744)] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Usage Advice
            </p>
            <h2 class="mt-2 text-2xl font-black">
              使用建议
            </h2>

            <ol class="mt-8 grid gap-4 md:grid-cols-2">
              <li
                v-for="(item, index) in application.useCases"
                :key="item"
                class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div class="flex items-center gap-4">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-blue-100">
                    {{ index + 1 }}
                  </span>
                  <h3 class="text-base font-semibold text-white">
                    {{ item }}
                  </h3>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section class="pb-16 sm:pb-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 class="text-2xl font-black sm:text-3xl">
                  需要针对这个场景做适配方案？
                </h2>
                <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  把物料特性、设备尺寸和目标产能发给我们，我们会结合当前场景给出更贴合的选型建议。
                </p>
              </div>

              <AppButton
                :to="`/contact?scene=${application.slug}`"
                size="lg"
                :aria-label="`咨询 ${application.name} 适配方案`"
                class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
              >
                咨询适配方案
              </AppButton>
            </div>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="py-24">
      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Scene Not Found
        </p>
        <h1 class="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
          应用场景未找到
        </h1>
        <p class="mt-5 text-base leading-8 text-slate-600">
          当前链接对应的应用场景不存在或已下线，可以返回列表页继续查看其他方案。
        </p>
        <div class="mt-8 flex justify-center">
          <AppButton to="/applications" size="lg" aria-label="返回应用场景列表">
            返回应用场景
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import type { ApplicationScene } from '~~/types'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { getApplicationBySlug } = useApplications()
const { getProductsByIds } = useProducts()

const scenePainPointMap: Record<string, string[]> = {
  'grain-screening': [
    '客户往往先描述粮食品类和杂质情况，却说不清该用哪种筛孔结构。',
    '既想保证筛分效率，又怕粮食破损和堵孔，参数很容易选偏。',
    '设备型号和安装尺寸不统一，常规规格不一定能直接套用。'
  ],
  'industrial-filtration': [
    '过滤精度、压损和清洗频次互相牵扯，选错材料就很容易翻车。',
    '不少工况介质有腐蚀性或温度要求，材质兼容性必须先想明白。',
    '客户常常只有使用目标，没有现成图纸，导致前期选型信息不完整。'
  ],
  'mining-screening': [
    '工况冲击和磨损都重，寿命短往往不是产品烂，是选型和结构没配对。',
    '振动筛张紧方式、开孔尺寸和物料粒径不匹配时，产能会直接掉。',
    '更换停机成本高，备件周期和耐磨寿命必须提前算进去。'
  ]
}

const toAbsoluteUrl = (value: string) => {
  const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
  return value.startsWith('http') ? value : `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`
}

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const application = computed<ApplicationScene | undefined>(() => {
  return slug.value ? getApplicationBySlug(slug.value) : undefined
})

if (!application.value) {
  setResponseStatus(404, 'Application Not Found')
}

const painPoints = computed(() => {
  if (!application.value) {
    return []
  }

  return scenePainPointMap[application.value.slug] ?? application.value.considerations.slice(0, 3)
})

const recommendedProducts = computed(() => {
  if (!application.value) {
    return []
  }

  return getProductsByIds(application.value.recommendedProducts)
})

const articleJsonLd = computed(() => {
  if (!application.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: application.value.name,
    description: application.value.seoDescription || application.value.description,
    image: application.value.coverImage ? [toAbsoluteUrl(application.value.coverImage)] : undefined,
    mainEntityOfPage: `${runtimeConfig.public.siteUrl}/applications/${application.value.slug}`,
    articleSection: '应用场景',
    author: {
      '@type': 'Organization',
      name: '筛网厂'
    },
    publisher: {
      '@type': 'Organization',
      name: '筛网厂'
    }
  }
})

usePageSeoMeta({
  title: application.value ? `${application.value.name} - 推荐产品与选型建议` : '应用场景未找到',
  description:
    application.value?.seoDescription ||
    '当前应用场景不存在或已下线，可返回应用场景列表查看更多筛网解决方案。',
  image: application.value?.coverImage
})

useHead(() => ({
  script: articleJsonLd.value
    ? [
        {
          key: 'application-jsonld',
          type: 'application/ld+json',
          textContent: JSON.stringify(articleJsonLd.value)
        }
      ]
    : []
}))
</script>
