<template>
  <article
    class="group surface-card flex h-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1"
  >
    <div class="relative h-60 overflow-hidden bg-brand-surface-strong">
      <NuxtImg
        v-if="!imageFailed"
        :src="product.coverImage"
        :alt="$t('productCard.imageAlt', { name: product.name })"
        width="800"
        height="560"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
        sizes="100vw md:50vw xl:33vw"
        placeholder
        @error="imageFailed = true"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#dbe4f0,#f5f7fa)] text-sm font-medium tracking-[0.18em] text-brand-muted"
        :aria-label="$t('productCard.placeholderAria', { name: product.name })"
      >
        {{ $t('productCard.placeholderText') }}
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

    <div class="flex flex-1 flex-col p-6">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="mono-meta text-brand-muted">
            {{ product.category }}
          </p>
          <h3 class="mt-3 text-2xl font-semibold tracking-tight text-brand-ink">
            {{ product.name }}
          </h3>
        </div>
        <Badge
          v-if="product.customSupported"
          :label="$t('productCard.customSupported')"
          variant="primary"
        />
      </div>

      <p class="summary-clamp mt-4 text-sm leading-7 text-brand-muted">
        {{ product.summary }}
      </p>

      <div class="mt-6 flex items-center justify-between border-t border-brand-line/80 pt-4">
        <span class="mono-meta text-brand-muted">
          {{ product.materials.slice(0, 2).join(' / ') }}
        </span>
        <AppButton
          :to="`/products/${product.slug}`"
          size="sm"
          :aria-label="$t('productCard.detailAria')"
        >
          {{ $t('productCard.detailCta') }}
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
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
