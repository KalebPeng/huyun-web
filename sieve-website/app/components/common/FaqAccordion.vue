<template>
  <div class="space-y-4">
    <article
      v-for="item in items"
      :key="item.id"
      class="surface-card overflow-hidden"
    >
      <button
        type="button"
        class="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-brand-surface-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        :aria-expanded="isOpen(item.id)"
        :aria-controls="`faq-panel-${item.id}`"
        @click="toggleItem(item.id)"
      >
        <span class="text-base font-semibold leading-7 text-brand-ink sm:text-lg">
          {{ item.question }}
        </span>
        <span
          class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-line bg-white text-brand-muted transition-all duration-200"
          :class="isOpen(item.id) ? 'rotate-45 border-accent/20 bg-accent/8 text-accent' : ''"
          aria-hidden="true"
        >
          <svg class="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>

      <div
        :id="`faq-panel-${item.id}`"
        class="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        :class="isOpen(item.id) ? 'max-h-80' : 'max-h-0'"
      >
        <div class="border-t border-brand-line bg-brand-surface-strong px-5 py-4 text-sm leading-7 text-brand-muted">
          {{ item.answer }}
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { FAQ } from '~~/types'

interface Props {
  items: FAQ[]
}

defineProps<Props>()

const openIds = ref<string[]>([])

const isOpen = (id: string) => openIds.value.includes(id)

const toggleItem = (id: string) => {
  if (isOpen(id)) {
    openIds.value = openIds.value.filter((itemId) => itemId !== id)
    return
  }

  openIds.value = [...openIds.value, id]
}
</script>
