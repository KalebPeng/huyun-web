<template>
  <NuxtLink
    :to="targetPath"
    class="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-line bg-brand-surface-strong px-3 py-2 text-[11px] font-semibold tracking-[0.18em] text-primary transition-colors duration-200 hover:border-primary/15 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    :aria-label="t('langSwitcher.switchToAria', { locale: targetLabel })"
  >
    <span>{{ currentCode }}</span>
    <span class="text-brand-muted">/</span>
    <span class="text-accent">{{ targetCode }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const targetLocale = computed<'zh' | 'en'>(() => (locale.value === 'zh' ? 'en' : 'zh'))
const targetPath = computed(() => switchLocalePath(targetLocale.value) || '/')

const resolveLocaleLabel = (code: string) => {
  return code === 'zh' ? t('langSwitcher.zh') : t('langSwitcher.en')
}

const targetLabel = computed(() => resolveLocaleLabel(targetLocale.value))
const currentCode = computed(() => locale.value.toUpperCase())
const targetCode = computed(() => targetLocale.value.toUpperCase())
</script>
