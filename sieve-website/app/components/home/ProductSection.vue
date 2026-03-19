<template>
  <section class="bg-neutral py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Core Products
        </p>
        <h2 class="mt-3 text-3xl font-black text-primary sm:text-4xl">
          核心产品
        </h2>
        <p class="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
          聚焦筛分、过滤、防护等高频应用，提供多规格标准品与按图定制能力，覆盖工业、粮食、矿山等场景。
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div class="mt-10 flex justify-center sm:justify-start">
        <AppButton
          to="/products"
          size="lg"
          aria-label="查看全部产品"
        >
          查看全部产品
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '~/components/common/AppButton.vue'
import ProductCard from '~/components/product/ProductCard.vue'

const { products } = useProducts()

const featuredProducts = computed(() => products.value.slice(0, 6))
</script>

<style scoped>
</style>
