<template>
  <footer class="mt-8 border-t border-brand-line/80 bg-[#10233A] text-white">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_repeat(3,minmax(0,0.9fr))]">
        <section aria-labelledby="footer-company" class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <p class="eyebrow-soft text-blue-200">{{ $t('brand.tagline') }}</p>
          <h2 id="footer-company" class="mt-3 text-2xl font-semibold tracking-[0.04em] text-white">
            {{ $t('brand.name') }}
          </h2>
          <p class="mt-4 max-w-md text-sm leading-7 text-slate-300">
            {{ $t('footer.description') }}
          </p>
        </section>

        <nav aria-labelledby="footer-products">
          <h2 id="footer-products" class="text-sm font-semibold tracking-[0.2em] text-slate-200">
            {{ $t('footer.products') }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li v-for="item in productLinks" :key="item.to">
              <NuxtLink
                :to="localePath(item.to)"
                class="transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-applications">
          <h2
            id="footer-applications"
            class="text-sm font-semibold tracking-[0.2em] text-slate-200"
          >
            {{ $t('footer.services') }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li v-for="item in applicationLinks" :key="item.to">
              <NuxtLink
                :to="localePath(item.to)"
                class="transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" class="text-sm font-semibold tracking-[0.2em] text-slate-200">
            {{ $t('footer.contact') }}
          </h2>
          <ul class="mt-4 space-y-4 text-sm text-slate-300">
            <li><span class="mr-2 font-medium text-white">{{ $t('footer.phone') }}</span>+86 13561559016</li>
            <li><span class="mr-2 font-medium text-white">{{ $t('footer.wechat') }}</span>HUAYUN-MESH</li>
            <li>
              <span class="mr-2 font-medium text-white">{{ $t('footer.email') }}</span>
              <a
                href="mailto:sales@huayun-mesh.com"
                class="transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                sales@huayun-mesh.com
              </a>
            </li>
            <li><span class="mr-2 font-medium text-white">{{ $t('footer.address') }}</span>{{ $t('contactPage.contactItems.addressValue') }}</li>
          </ul>
        </section>
      </div>

      <div
        class="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>{{ $t('footer.copyright') }}</span>
        <span class="mono-meta text-slate-500">Industrial screen systems · OEM / ODM</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface FooterLink {
  label: string
  to: string
}

const localePath = useLocalePath()
const { t } = useI18n()

const productLinks = computed<FooterLink[]>(() => [
  { label: t('footer.productLinks.miningWeldedScreen'), to: '/products/mining-welded-screen' },
  { label: t('footer.productLinks.woven65mnScreen'), to: '/products/65mn-woven-screen' },
  { label: t('footer.productLinks.polyurethaneScreen'), to: '/products/polyurethane-screen' },
  { label: t('footer.productLinks.crimpedWireMesh'), to: '/products/crimped-wire-mesh' }
])

const applicationLinks = computed<FooterLink[]>(() => [
  { label: t('footer.applicationLinks.miningGrading'), to: '/applications/mining-grading' },
  { label: t('footer.applicationLinks.coalDewatering'), to: '/applications/coal-dewatering' },
  { label: t('footer.applicationLinks.knowledge'), to: '/knowledge' },
  { label: t('footer.applicationLinks.getQuote'), to: '/contact' }
])
</script>

<style scoped>
</style>
