<template>
  <div class="bg-slate-50">
    <section class="bg-[linear-gradient(135deg,#111827,#1a2744)] py-16 text-white sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
          Contact Us
        </p>
        <h1 class="mt-4 text-4xl font-black sm:text-5xl">
          联系我们 / 发起询价
        </h1>
        <p class="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
          提交您的产品需求、应用场景和规格信息，我们承诺 48 小时内给出专业响应与报价建议。
        </p>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-8">
        <aside class="space-y-6">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Contact Info
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-950">
              联系方式
            </h2>

            <div class="mt-6 space-y-4">
              <article
                v-for="item in contactItems"
                :key="item.label"
                class="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {{ item.label }}
                </p>
                <component
                  :is="item.href ? 'a' : 'p'"
                  :href="item.href"
                  class="mt-2 block text-base font-semibold text-slate-900 transition-colors duration-200"
                  :class="item.href ? 'hover:text-primary' : ''"
                >
                  {{ item.value }}
                </component>
                <p v-if="item.description" class="mt-2 text-sm leading-7 text-slate-500">
                  {{ item.description }}
                </p>
              </article>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              WeChat
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-950">
              微信咨询
            </h2>
            <div class="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-center">
              <div>
                <p class="text-base font-semibold text-slate-900">
                  微信号：huayun-sieve
                </p>
                <p class="mt-3 text-sm leading-7 text-slate-600">
                  扫码或添加微信可发送图纸、照片和工况说明，方便我们更快判断产品方案。
                </p>
              </div>
              <div class="flex h-32 w-32 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-[10px] font-semibold tracking-wider text-slate-500">
                微信号<br>huayun-sieve
              </div>
            </div>
          </div>
        </aside>

        <InquiryForm
          :initial-product-type="prefilledProductType"
          :initial-usage="prefilledUsage"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import InquiryForm from '~/components/forms/InquiryForm.vue'

interface ContactItem {
  label: string
  value: string
  href?: string
  description?: string
}

const route = useRoute()
const { getProductBySlug } = useProducts()
const { getApplicationBySlug } = useApplications()

const contactItems: ContactItem[] = [
  {
    label: '电话',
    value: '+86 13561559016',
    href: 'tel:+8613561559016',
    description: '欢迎工作时间内直接来电沟通。'
  },
  {
    label: '邮箱',
    value: 'sales@huayun-mesh.com',
    href: 'mailto:sales@huayun-mesh.com',
    description: '图纸、规格单和报价需求建议直接发邮件。'
  },
  {
    label: '地址',
    value: '山东省滨州市华云网业',
    description: '支持预约到厂考察与样品确认。'
  },
  {
    label: 'WhatsApp',
    value: '+86 13561559016',
    href: 'https://wa.me/8613561559016',
    description: '外贸客户可通过 WhatsApp 直接联系。'
  },
  {
    label: '工作时间',
    value: '周一至周六 9:00-18:00'
  }
]

const resolveQueryValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value[0] ?? ''
  }

  return typeof value === 'string' ? value : ''
}

const prefilledProductType = computed(() => {
  const slug = resolveQueryValue(route.query.product)
  return slug ? getProductBySlug(slug)?.name ?? slug : ''
})

const prefilledUsage = computed(() => {
  const slug = resolveQueryValue(route.query.scene)
  return slug ? getApplicationBySlug(slug)?.name ?? '其他' : ''
})

usePageSeoMeta({
  title: '联系我们 / 发起询价',
  description:
    '通过电话、微信、邮箱或在线表单联系我们，提交筛网产品需求、应用场景和规格信息，快速获取报价与选型建议。'
})
</script>
