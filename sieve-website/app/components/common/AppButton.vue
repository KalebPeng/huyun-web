<template>
  <NuxtLink
    v-if="localizedTo"
    :to="localizedTo"
    :class="buttonClass"
    :aria-label="ariaLabel"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="buttonClass"
    :aria-label="ariaLabel"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  to: undefined,
  type: 'button',
  disabled: false,
  ariaLabel: undefined
})

const localePath = useLocalePath()

const isExternalLink = (value?: string) => {
  if (!value) {
    return false
  }

  return /^(https?:|mailto:|tel:|#)/i.test(value)
}

const localizedTo = computed(() => {
  if (!props.to) {
    return undefined
  }

  if (isExternalLink(props.to)) {
    return props.to
  }

  return localePath(props.to)
})

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border border-accent bg-accent text-white shadow-brand-soft hover:border-blue-700 hover:bg-blue-700 focus-visible:outline-accent disabled:border-blue-300 disabled:bg-blue-300',
  outline:
    'border border-brand-line bg-white text-primary hover:border-primary/30 hover:bg-brand-surface-strong focus-visible:outline-accent',
  ghost:
    'border border-transparent bg-transparent text-primary hover:bg-brand-surface-strong focus-visible:outline-accent'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-12 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base'
}

const buttonClass = computed(() => [
  'inline-flex items-center justify-center rounded-xl whitespace-nowrap font-semibold leading-none transition-all duration-200 cursor-pointer',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-70',
  variantClasses[props.variant],
  sizeClasses[props.size]
])
</script>

<style scoped>
</style>
