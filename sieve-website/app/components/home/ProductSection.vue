<template>
  <section class="page-section">
    <div class="section-shell">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          :eyebrow="$t('home.productSection.eyebrow')"
          :title="$t('home.productSection.title')"
          :description="$t('home.productSection.description')"
        />
        <AppButton
          to="/products"
          variant="outline"
          size="lg"
          :aria-label="$t('home.productSection.ctaAria')"
        >
          {{ $t('home.productSection.cta') }}
        </AppButton>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '~/components/common/AppButton.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import ProductCard from '~/components/product/ProductCard.vue'

const { products } = useProducts()

const featuredProducts = computed(() => products.value.slice(0, 6))
</script>
