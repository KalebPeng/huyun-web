<template>
  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-primary text-white transition-shadow duration-300"
    :class="{ 'shadow-[0_10px_30px_rgba(15,23,42,0.35)]': isScrolled }"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <NuxtLink
        :to="localePath('/')"
        class="inline-flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        :aria-label="$t('header.backHome')"
      >
        <span
          class="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10 text-sm font-black tracking-[0.25em]"
          aria-hidden="true"
        >
          HY
        </span>
        <span class="flex flex-col">
          <span class="text-lg font-bold tracking-[0.18em]">{{ $t('brand.name') }}</span>
          <span class="text-xs uppercase tracking-[0.32em] text-slate-300">
            {{ $t('brand.tagline') }}
          </span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" :aria-label="$t('header.mainNav')">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="localePath(item.to)"
          class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10"
          :class="isActive(item.to) ? 'bg-white/12 text-white' : 'text-slate-200'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <LangSwitcher />
        <AppButton to="/contact" size="md" :aria-label="$t('header.getQuoteAria')">
          {{ $t('common.getQuote') }}
        </AppButton>
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
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
          class="h-6 w-6"
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
          class="h-6 w-6"
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
      class="border-t border-white/10 bg-primary/95 lg:hidden"
    >
      <nav class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6" :aria-label="$t('header.mobileNav')">
        <NuxtLink
          v-for="item in navItems"
          :key="`${item.to}-mobile`"
          :to="localePath(item.to)"
          class="rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-white/10"
          :class="isActive(item.to) ? 'bg-white/12 text-white' : 'text-slate-200'"
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
