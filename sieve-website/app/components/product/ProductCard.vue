<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
  >
    <div class="relative h-56 overflow-hidden bg-slate-100">
      <NuxtImg
        v-if="!imageFailed"
        :src="product.coverImage"
        :alt="`${product.name} 封面图`"
        width="800"
        height="560"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
        sizes="100vw md:50vw xl:33vw"
        placeholder
        @error="imageFailed = true"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#dbe4f0,#f4f4f0)] text-sm font-medium tracking-[0.18em] text-slate-500"
        :aria-label="`${product.name} 图片占位`"
      >
        产品图片占位
      </div>

      <div class="absolute left-4 top-4 flex flex-wrap gap-2">
        <Badge
          v-for="material in materialBadges"
          :key="material"
          :label="material"
          variant="default"
        />
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {{ product.category }}
          </p>
          <h3 class="mt-2 text-xl font-bold text-slate-900">
            {{ product.name }}
          </h3>
        </div>
        <Badge
          v-if="product.customSupported"
          label="支持定制"
          variant="success"
        />
      </div>

      <p class="summary-clamp mt-4 text-sm leading-7 text-slate-600">
        {{ product.summary }}
      </p>

      <div class="mt-6">
        <AppButton
          :to="`/products/${product.slug}`"
          size="sm"
          aria-label="查看产品详情"
        >
          查看详情
        </AppButton>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import AppButton from '~/components/common/AppButton.vue'
import Badge from '~/components/common/Badge.vue'
import type { Product } from '~~/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const imageFailed = ref(false)

const materialBadges = computed(() => props.product.materials.slice(0, 3))
</script>

<style scoped>
.summary-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
