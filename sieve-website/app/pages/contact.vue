<template>
  <div class="page-shell">
    <PageHero
      :eyebrow="$t('contactPage.eyebrow')"
      :title="$t('contactPage.title')"
      :description="$t('contactPage.description')"
    >
      <template #aside>
        <div class="surface-card-soft p-6">
          <div class="space-y-4">
            <div class="metric-tile">
              <p class="metric-value">24/7</p>
              <p class="metric-label">{{ $t('contactPage.contactItems.hoursLabel') }}</p>
            </div>
            <div class="metric-tile">
              <p class="metric-value">48h</p>
              <p class="metric-label">{{ $t('contactPage.contactItems.phoneDescription') }}</p>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="page-section">
      <div class="section-shell grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <aside class="space-y-6">
          <div class="surface-card p-6 sm:p-8">
            <SectionHeading
              :eyebrow="$t('contactPage.contactInfoEyebrow')"
              :title="$t('contactPage.contactInfoTitle')"
            />

            <div class="mt-8 space-y-4">
              <article
                v-for="item in contactItems"
                :key="item.label"
                class="surface-card-inset p-4"
              >
                <div class="flex items-start gap-4">
                  <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary">
                    <FeatureIcon :name="item.icon" class="h-6 w-6" />
                  </div>
                  <div class="min-w-0">
                    <p class="mono-meta text-brand-muted">{{ item.label }}</p>
                    <component
                      :is="item.href ? 'a' : 'p'"
                      :href="item.href"
                      class="mt-2 block text-base font-semibold text-brand-ink transition-colors duration-200"
                      :class="item.href ? 'hover:text-primary' : ''"
                    >
                      {{ item.value }}
                    </component>
                    <p v-if="item.description" class="mt-2 text-sm leading-7 text-brand-muted">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div class="surface-card p-6 sm:p-8">
            <SectionHeading
              :eyebrow="$t('contactPage.wechatEyebrow')"
              :title="$t('contactPage.wechatTitle')"
            />
            <div class="mt-8 grid gap-5 sm:grid-cols-[minmax(0,1fr)_140px] sm:items-center">
              <div>
                <p class="text-base font-semibold text-brand-ink">
                  {{ $t('contactPage.wechatLabel') }}
                </p>
                <p class="mt-3 text-sm leading-7 text-brand-muted">
                  {{ $t('contactPage.wechatDescription') }}
                </p>
              </div>
              <div class="flex h-36 w-36 items-center justify-center rounded-[1.5rem] border border-dashed border-brand-line bg-brand-surface-strong p-4 text-center text-[10px] font-semibold tracking-[0.18em] text-brand-muted">
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

import FeatureIcon from '~/components/common/FeatureIcon.vue'
import PageHero from '~/components/common/PageHero.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import InquiryForm from '~/components/forms/InquiryForm.vue'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

interface ContactItem {
  label: string
  value: string
  href?: string
  description?: string
  icon: string
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
    description: t('contactPage.contactItems.phoneDescription'),
    icon: 'phone'
  },
  {
    label: t('contactPage.contactItems.emailLabel'),
    value: 'sales@huayun-mesh.com',
    href: 'mailto:sales@huayun-mesh.com',
    description: t('contactPage.contactItems.emailDescription'),
    icon: 'email'
  },
  {
    label: t('contactPage.contactItems.addressLabel'),
    value: t('contactPage.contactItems.addressValue'),
    description: t('contactPage.contactItems.addressDescription'),
    icon: 'factory'
  },
  {
    label: 'WhatsApp',
    value: '+86 13561559016',
    href: 'https://wa.me/8613561559016',
    description: t('contactPage.contactItems.whatsAppDescription'),
    icon: 'support'
  },
  {
    label: t('contactPage.contactItems.hoursLabel'),
    value: t('contactPage.contactItems.hoursValue'),
    icon: 'response'
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
  return slug ? getApplicationBySlug(slug)?.name ?? t('form.inquiry.options.usage.other') : ''
})

usePageSeoMeta({
  title: t('contactPage.seo.title'),
  description: t('contactPage.seo.description')
})
</script>
