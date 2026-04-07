<template>
  <section class="page-hero">
    <div class="section-shell relative py-14 sm:py-16 lg:py-20">
      <div
        class="grid items-end gap-8"
        :class="hasAside ? 'lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-12' : ''"
      >
        <div :class="centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
          <p class="eyebrow">{{ eyebrow }}</p>
          <h1 class="mt-4 text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            {{ title }}
          </h1>
          <p v-if="description" class="mt-5 max-w-3xl text-base leading-8 text-brand-muted sm:text-lg" :class="centered ? 'mx-auto' : ''">
            {{ description }}
          </p>
          <div v-if="$slots.actions" class="mt-8 flex flex-col gap-3 sm:flex-row" :class="centered ? 'justify-center' : ''">
            <slot name="actions" />
          </div>
        </div>

        <div v-if="hasAside">
          <slot name="aside" />
        </div>
      </div>

      <div v-if="$slots.default" class="mt-10">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  eyebrow: string
  title: string
  description?: string
  centered?: boolean
}

withDefaults(defineProps<Props>(), {
  description: '',
  centered: false
})

const slots = useSlots()
const hasAside = computed(() => Boolean(slots.aside))
</script>
