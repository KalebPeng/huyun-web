<template>
  <span :class="badgeClass">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BadgeVariant = 'default' | 'primary' | 'success'

interface Props {
  label: string
  variant?: BadgeVariant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border-brand-line bg-white text-brand-muted',
  primary: 'border-accent/15 bg-accent/8 text-accent',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

const badgeClass = computed(() => [
  'inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.12em]',
  variantClasses[props.variant]
])
</script>

<style scoped>
</style>
