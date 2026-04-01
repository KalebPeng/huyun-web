<template>
  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-primary text-white transition-shadow duration-300"
    :class="{ 'shadow-[0_10px_30px_rgba(15,23,42,0.35)]': isScrolled }"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="返回首页"
      >
        <span
          class="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10 text-sm font-black tracking-[0.25em]"
          aria-hidden="true"
        >
          HY
        </span>
        <span class="flex flex-col">
          <span class="text-lg font-bold tracking-[0.18em]">华云网业</span>
          <span class="text-xs uppercase tracking-[0.32em] text-slate-300">
            Industrial Mesh
          </span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="主导航">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10"
          :class="isActive(item.to) ? 'bg-white/12 text-white' : 'text-slate-200'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <AppButton to="/contact" size="md" aria-label="跳转到询价页面">
          立即询价
        </AppButton>
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-nav-panel"
        :aria-label="mobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'"
        @click="toggleMobileMenu"
      >
        <span class="sr-only">
          {{ mobileMenuOpen ? '关闭导航菜单' : '打开导航菜单' }}
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
      <nav class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6" aria-label="移动端主导航">
        <NuxtLink
          v-for="item in navItems"
          :key="`${item.to}-mobile`"
          :to="item.to"
          class="rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-white/10"
          :class="isActive(item.to) ? 'bg-white/12 text-white' : 'text-slate-200'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          @click="mobileMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>

        <AppButton
          to="/contact"
          size="lg"
          aria-label="跳转到询价页面"
          class="mt-2 w-full"
          @click="mobileMenuOpen = false"
        >
          立即询价
        </AppButton>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import AppButton from '~/components/common/AppButton.vue'

interface NavItem {
  label: string
  to: string
}

const route = useRoute()

const navItems: NavItem[] = [
  { label: '首页', to: '/' },
  { label: '产品中心', to: '/products' },
  { label: '应用场景', to: '/applications' },
  { label: '技术知识', to: '/knowledge' },
  { label: '技术工具', to: '/tools' },
  { label: '常见问题', to: '/faq' },
  { label: '关于我们', to: '/about' }
]

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 12
}

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
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
