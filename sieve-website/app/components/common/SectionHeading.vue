<template>
  <div class="section-heading" :class="alignClass">
    <p :class="tone === 'soft' ? 'eyebrow-soft' : 'eyebrow'">
      {{ eyebrow }}
    </p>
    <h2 class="section-title text-balance">
      {{ title }}
    </h2>
    <p v-if="description" class="section-description">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'default' | 'soft'
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  align: 'left',
  tone: 'default'
})

const alignClass = computed(() => (props.align === 'center' ? 'mx-auto text-center' : ''))
</script>
