<template>
  <div class="space-y-4">
    <article
      v-for="item in items"
      :key="item.id"
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <button
        type="button"
        class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        :aria-expanded="isOpen(item.id)"
        :aria-controls="`faq-panel-${item.id}`"
        @click="toggleItem(item.id)"
      >
        <span class="text-base font-bold text-slate-900">
          {{ item.question }}
        </span>
        <span class="shrink-0 text-2xl font-light text-slate-500" aria-hidden="true">
          {{ isOpen(item.id) ? '−' : '+' }}
        </span>
      </button>

      <div
        :id="`faq-panel-${item.id}`"
        class="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        :class="isOpen(item.id) ? 'max-h-80' : 'max-h-0'"
      >
        <div class="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
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

<style scoped>
</style>
