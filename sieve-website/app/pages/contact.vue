<template>
  <div class="bg-slate-50">
    <section class="bg-[linear-gradient(135deg,#111827,#1a2744)] py-16 text-white sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
          {{ $t('contactPage.eyebrow') }}
        </p>
        <h1 class="mt-4 text-4xl font-black sm:text-5xl">
          {{ $t('contactPage.title') }}
        </h1>
        <p class="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
          {{ $t('contactPage.description') }}
        </p>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-8">
        <aside class="space-y-6">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {{ $t('contactPage.contactInfoEyebrow') }}
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-950">
              {{ $t('contactPage.contactInfoTitle') }}
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
              {{ $t('contactPage.wechatEyebrow') }}
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-950">
              {{ $t('contactPage.wechatTitle') }}
            </h2>
            <div class="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-center">
              <div>
                <p class="text-base font-semibold text-slate-900">
                  {{ $t('contactPage.wechatLabel') }}
                </p>
                <p class="mt-3 text-sm leading-7 text-slate-600">
                  {{ $t('contactPage.wechatDescription') }}
                </p>
              </div>
              <div class="flex h-32 w-32 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-[10px] font-semibold tracking-wider text-slate-500">
                {{ $t('contactPage.wechatQr') }}
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
const { t } = useI18n()
const { getProductBySlug } = useProducts()
const { getApplicationBySlug } = useApplications()

const contactItems = computed<ContactItem[]>(() => [
  {
    label: t('contactPage.contactItems.phoneLabel'),
    value: '+86 13561559016',
    href: 'tel:+8613561559016',
    description: t('contactPage.contactItems.phoneDescription')
  },
  {
    label: t('contactPage.contactItems.emailLabel'),
    value: 'sales@huayun-mesh.com',
    href: 'mailto:sales@huayun-mesh.com',
    description: t('contactPage.contactItems.emailDescription')
  },
  {
    label: t('contactPage.contactItems.addressLabel'),
    value: t('contactPage.contactItems.addressValue'),
    description: t('contactPage.contactItems.addressDescription')
  },
  {
    label: 'WhatsApp',
    value: '+86 13561559016',
    href: 'https://wa.me/8613561559016',
    description: t('contactPage.contactItems.whatsAppDescription')
  },
  {
    label: t('contactPage.contactItems.hoursLabel'),
    value: t('contactPage.contactItems.hoursValue')
  }
])

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
  title: t('contactPage.seo.title'),
  description: t('contactPage.seo.description')
})
</script>
