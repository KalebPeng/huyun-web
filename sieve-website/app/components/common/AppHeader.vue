<template>
  <header class="sticky top-0 z-50 px-4 py-3 sm:px-6 lg:px-8">
    <div
      class="mx-auto max-w-7xl rounded-[1.75rem] border border-white/75 bg-white/88 text-brand-ink shadow-brand backdrop-blur-xl transition-all duration-200"
      :class="isScrolled ? 'border-brand-line shadow-[0_18px_45px_rgba(22,48,79,0.12)]' : 'shadow-brand-soft'"
    >
      <div class="flex items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          :aria-label="$t('header.backHome')"
        >
          <span
            class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/10 bg-primary text-sm font-bold tracking-[0.24em] text-white shadow-brand-soft"
            aria-hidden="true"
          >
            HY
          </span>
          <span class="flex min-w-0 flex-col">
            <span class="whitespace-nowrap text-base font-semibold tracking-[0.08em] sm:text-lg">
              {{ $t('brand.name') }}
            </span>
            <span class="mono-meta whitespace-nowrap text-brand-muted">
              {{ $t('brand.tagline') }}
            </span>
          </span>
        </NuxtLink>

        <nav class="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex" :aria-label="$t('header.mainNav')">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="localePath(item.to)"
            class="shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="isActive(item.to) ? 'bg-primary text-white shadow-brand-soft' : 'text-brand-muted hover:bg-brand-surface-strong hover:text-primary'"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden shrink-0 items-center gap-2 lg:flex">
          <LangSwitcher />
          <AppButton to="/contact" size="sm" :aria-label="$t('header.getQuoteAria')">
            {{ $t('common.getQuote') }}
          </AppButton>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-line bg-brand-surface-strong text-primary transition-colors hover:border-primary/20 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-nav-panel"
          :aria-label="mobileMenuOpen ? $t('header.closeMenu') : $t('header.openMenu')"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">
            {{ mobileMenuOpen ? $t('header.closeMenu') : $t('header.openMenu') }}
          </span>
          <svg
            v-if="!mobileMenuOpen"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div
        v-if="mobileMenuOpen"
        id="mobile-nav-panel"
        class="border-t border-brand-line/80 px-4 pb-4 pt-3 lg:hidden"
      >
        <nav class="flex flex-col gap-2" :aria-label="$t('header.mobileNav')">
          <NuxtLink
            v-for="item in navItems"
            :key="`${item.to}-mobile`"
            :to="localePath(item.to)"
            class="rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200"
            :class="isActive(item.to) ? 'bg-primary text-white' : 'text-brand-muted hover:bg-brand-surface-strong hover:text-primary'"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>

          <div class="mt-2">
            <LangSwitcher />
          </div>

          <AppButton
            to="/contact"
            size="lg"
            :aria-label="$t('header.getQuoteAria')"
            class="mt-2 w-full"
            @click="mobileMenuOpen = false"
          >
            {{ $t('common.getQuote') }}
          </AppButton>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import LangSwitcher from '~/components/LangSwitcher.vue'
import AppButton from '~/components/common/AppButton.vue'

interface NavItem {
  label: string
  to: string
}

const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

const navItems = computed<NavItem[]>(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.products'), to: '/products' },
  { label: t('nav.applications'), to: '/applications' },
  { label: t('nav.knowledge'), to: '/knowledge' },
  { label: t('nav.tools'), to: '/tools' },
  { label: t('nav.faq'), to: '/faq' },
  { label: t('nav.about'), to: '/about' }
])

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 12
}

const isActive = (path: string) => {
  const localizedPath = localePath(path)

  if (path === '/') {
    return route.path === localizedPath
  }

  return route.path === localizedPath || route.path.startsWith(`${localizedPath}/`)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  }
)

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<style scoped>
</style>
