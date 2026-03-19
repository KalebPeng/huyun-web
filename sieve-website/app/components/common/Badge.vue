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
  default: 'border-slate-200 bg-slate-100 text-slate-700',
  primary: 'border-blue-200 bg-blue-50 text-blue-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700'
}

const badgeClass = computed(() => [
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.08em]',
  variantClasses[props.variant]
])
</script>

<style scoped>
</style>
