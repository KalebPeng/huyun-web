<template>
  <footer class="bg-dark text-white">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
        <section aria-labelledby="footer-company">
          <h2 id="footer-company" class="text-lg font-semibold tracking-[0.16em] text-white">
            筛网厂
          </h2>
          <p class="mt-4 text-sm leading-7 text-slate-300">
            专注工业筛网、过滤网与定制筛分方案，面向制造、过滤和矿山场景提供稳定交付。
          </p>
        </section>

        <nav aria-labelledby="footer-products">
          <h2 id="footer-products" class="text-sm font-semibold tracking-[0.2em] text-slate-200">
            产品分类
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li v-for="item in productLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
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
            应用场景
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li v-for="item in applicationLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" class="text-sm font-semibold tracking-[0.2em] text-slate-200">
            联系方式
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li><span class="font-medium text-white">电话：</span>400-000-0000</li>
            <li><span class="font-medium text-white">微信：</span>SIEVE-MESH</li>
            <li>
              <span class="font-medium text-white">邮箱：</span>
              <a
                href="mailto:sales@example.com"
                class="transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                sales@example.com
              </a>
            </li>
            <li><span class="font-medium text-white">地址：</span>河北省安平县工业园示例地址</li>
          </ul>
        </section>
      </div>

      <div
        class="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400 sm:text-left"
      >
        2025 筛网厂 版权所有
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  label: string
  to: string
}

const productLinks: FooterLink[] = [
  { label: '不锈钢编织网', to: '/products/stainless-woven-mesh' },
  { label: '电焊网', to: '/products/welded-wire-mesh' },
  { label: '轧花网', to: '/products/crimped-wire-mesh' },
  { label: '矿筛网', to: '/products/mine-screen-mesh' }
]

const applicationLinks: FooterLink[] = [
  { label: '粮食筛分', to: '/applications/grain-screening' },
  { label: '工业过滤', to: '/applications/industrial-filtration' },
  { label: '矿山筛分', to: '/applications/mining-screening' },
  { label: '立即询价', to: '/contact' }
]
</script>

<style scoped>
</style>
