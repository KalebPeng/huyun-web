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
    'bg-accent text-white hover:bg-blue-500 focus-visible:outline-accent disabled:bg-blue-300',
  outline:
    'border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10 focus-visible:outline-white',
  ghost:
    'bg-transparent text-white hover:bg-white/10 focus-visible:outline-white'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base'
}

const buttonClass = computed(() => [
  'inline-flex items-center justify-center rounded-md whitespace-nowrap font-semibold leading-none transition-colors duration-200',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-70',
  variantClasses[props.variant],
  sizeClasses[props.size]
])
</script>

<style scoped>
</style>
