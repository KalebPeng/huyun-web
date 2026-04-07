<template>
  <div class="surface-card p-6 sm:p-8">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="eyebrow">{{ $t('form.inquiry.eyebrow') }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-brand-ink">
          {{ $t('form.inquiry.title') }}
        </h2>
      </div>
      <p class="mono-meta text-brand-muted">
        {{ $t('form.inquiry.requiredHint') }}
      </p>
    </div>

    <div
      v-if="submitStatus === 'success'"
      class="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-medium leading-7 text-emerald-700"
      role="status"
      aria-live="polite"
    >
      {{ $t('form.inquiry.success') }}
    </div>

    <div
      v-if="submitStatus === 'error'"
      class="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium leading-7 text-red-700"
      role="alert"
    >
      {{ $t('form.inquiry.error') }}
    </div>

    <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          <label class="field-label" for="inquiry-name">
            {{ $t('form.inquiry.fields.name') }}
          </label>
          <input
            id="inquiry-name"
            v-model.trim="form.name"
            type="text"
            class="field-input-light"
            :class="errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''"
            :placeholder="$t('form.inquiry.placeholders.name')"
          >
          <p v-if="errors.name" class="mt-2 text-sm text-red-600">
            {{ errors.name }}
          </p>
        </div>

        <div>
          <label class="field-label" for="inquiry-company">
            {{ $t('form.inquiry.fields.company') }}
          </label>
          <input
            id="inquiry-company"
            v-model.trim="form.company"
            type="text"
            class="field-input-light"
            :placeholder="$t('form.inquiry.placeholders.company')"
          >
        </div>

        <div>
          <label class="field-label" for="inquiry-contact">
            {{ $t('form.inquiry.fields.contact') }}
          </label>
          <input
            id="inquiry-contact"
            v-model.trim="form.contact"
            type="text"
            class="field-input-light"
            :class="errors.contact ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''"
            :placeholder="$t('form.inquiry.placeholders.contact')"
          >
          <p v-if="errors.contact" class="mt-2 text-sm text-red-600">
            {{ errors.contact }}
          </p>
        </div>

        <div>
          <label class="field-label" for="inquiry-usage">
            {{ $t('form.inquiry.fields.usage') }}
          </label>
          <select
            id="inquiry-usage"
            v-model="form.usage"
            class="field-input-light"
          >
            <option value="">
              {{ $t('form.inquiry.placeholders.usage') }}
            </option>
            <option v-for="option in usageOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="field-label" for="inquiry-product-type">
            {{ $t('form.inquiry.fields.productType') }}
          </label>
          <input
            id="inquiry-product-type"
            v-model.trim="form.productType"
            type="text"
            class="field-input-light"
            :placeholder="$t('form.inquiry.placeholders.productType')"
          >
        </div>

        <div>
          <label class="field-label" for="inquiry-material">
            {{ $t('form.inquiry.fields.material') }}
          </label>
          <select
            id="inquiry-material"
            v-model="form.material"
            class="field-input-light"
          >
            <option value="">
              {{ $t('form.inquiry.placeholders.material') }}
            </option>
            <option v-for="option in materialOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="field-label" for="inquiry-mesh">
            {{ $t('form.inquiry.fields.meshOrAperture') }}
          </label>
          <input
            id="inquiry-mesh"
            v-model.trim="form.meshOrAperture"
            type="text"
            class="field-input-light"
            :placeholder="$t('form.inquiry.placeholders.meshOrAperture')"
          >
        </div>

        <div>
          <label class="field-label" for="inquiry-size">
            {{ $t('form.inquiry.fields.size') }}
          </label>
          <input
            id="inquiry-size"
            v-model.trim="form.size"
            type="text"
            class="field-input-light"
            :placeholder="$t('form.inquiry.placeholders.size')"
          >
        </div>

        <div>
          <label class="field-label" for="inquiry-quantity">
            {{ $t('form.inquiry.fields.quantity') }}
          </label>
          <input
            id="inquiry-quantity"
            v-model.trim="form.quantity"
            type="text"
            class="field-input-light"
            :placeholder="$t('form.inquiry.placeholders.quantity')"
          >
        </div>

        <div>
          <span class="field-label">
            {{ $t('form.inquiry.fields.customRequired') }}
          </span>
          <div class="grid min-h-12 grid-cols-2 gap-2 rounded-2xl border border-brand-line bg-brand-surface-strong p-2">
            <label class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-brand-muted transition-colors hover:bg-white">
              <input
                v-model="customRequiredValue"
                type="radio"
                value="yes"
                class="h-4 w-4 border-slate-300 text-accent focus:ring-accent"
              >
              <span>{{ $t('common.yes') }}</span>
            </label>
            <label class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-brand-muted transition-colors hover:bg-white">
              <input
                v-model="customRequiredValue"
                type="radio"
                value="no"
                class="h-4 w-4 border-slate-300 text-accent focus:ring-accent"
              >
              <span>{{ $t('common.no') }}</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label class="field-label" for="inquiry-remark">
          {{ $t('form.inquiry.fields.remark') }}
        </label>
        <textarea
          id="inquiry-remark"
          v-model.trim="form.remark"
          rows="4"
          class="field-input-light resize-y py-3"
          :placeholder="$t('form.inquiry.placeholders.remark')"
        />
      </div>

      <AppButton
        type="submit"
        size="lg"
        :disabled="isSubmitting"
        :aria-label="$t('form.inquiry.submitAria')"
        class="w-full"
      >
        {{ isSubmitting ? $t('form.inquiry.submitting') : $t('form.inquiry.submit') }}
      </AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import AppButton from '~/components/common/AppButton.vue'
import type { InquiryForm as InquiryFormPayload } from '~~/types'

interface Props {
  initialProductType?: string
  initialUsage?: string
}

type FormErrors = Partial<Record<'name' | 'contact', string>>
type SubmitStatus = 'idle' | 'success' | 'error'
type CustomRequiredValue = 'yes' | 'no'

interface InquiryResponse {
  success: boolean
  message: string
}

interface SelectOption {
  value: string
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  initialProductType: '',
  initialUsage: ''
})

const { t, locale } = useI18n()

const usageOptions = computed<SelectOption[]>(() => [
  { value: t('form.inquiry.options.usage.grain'), label: t('form.inquiry.options.usage.grain') },
  { value: t('form.inquiry.options.usage.filtration'), label: t('form.inquiry.options.usage.filtration') },
  { value: t('form.inquiry.options.usage.mining'), label: t('form.inquiry.options.usage.mining') },
  { value: t('form.inquiry.options.usage.breeding'), label: t('form.inquiry.options.usage.breeding') },
  { value: t('form.inquiry.options.usage.construction'), label: t('form.inquiry.options.usage.construction') },
  { value: t('form.inquiry.options.usage.other'), label: t('form.inquiry.options.usage.other') }
])

const materialOptions = computed<SelectOption[]>(() => [
  { value: t('form.inquiry.options.material.stainless304'), label: t('form.inquiry.options.material.stainless304') },
  { value: t('form.inquiry.options.material.stainless316'), label: t('form.inquiry.options.material.stainless316') },
  { value: t('form.inquiry.options.material.carbonSteel'), label: t('form.inquiry.options.material.carbonSteel') },
  { value: t('form.inquiry.options.material.galvanized'), label: t('form.inquiry.options.material.galvanized') },
  { value: t('form.inquiry.options.material.other'), label: t('form.inquiry.options.material.other') }
])

const form = reactive<InquiryFormPayload>({
  locale: undefined,
  name: '',
  company: '',
  contact: '',
  usage: '',
  productType: '',
  material: '',
  meshOrAperture: '',
  size: '',
  quantity: '',
  customRequired: undefined,
  remark: ''
})

const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const submitStatus = ref<SubmitStatus>('idle')

const customRequiredValue = computed<CustomRequiredValue | undefined>({
  get: () => {
    if (form.customRequired === true) {
      return 'yes'
    }

    if (form.customRequired === false) {
      return 'no'
    }

    return undefined
  },
  set: (value) => {
    if (value === 'yes') {
      form.customRequired = true
      return
    }

    if (value === 'no') {
      form.customRequired = false
    }
  }
})

const clearErrors = () => {
  errors.name = undefined
  errors.contact = undefined
}

const normalizeUsage = (value: string) => {
  if (!value) {
    return ''
  }

  const validOptions = usageOptions.value.map((option) => option.value)
  return validOptions.includes(value) ? value : t('form.inquiry.options.usage.other')
}

watch(
  () => props.initialProductType,
  (value) => {
    if (value) {
      form.productType = value
    }
  },
  { immediate: true }
)

watch(
  () => props.initialUsage,
  (value) => {
    if (value) {
      form.usage = normalizeUsage(value)
    }
  },
  { immediate: true }
)

const validate = () => {
  clearErrors()

  let isValid = true

  if (!form.name.trim()) {
    errors.name = t('form.inquiry.validation.name')
    isValid = false
  }

  if (!form.contact.trim()) {
    errors.contact = t('form.inquiry.validation.contact')
    isValid = false
  }

  return isValid
}

const resetForm = () => {
  form.locale = undefined
  form.name = ''
  form.company = ''
  form.contact = ''
  form.usage = normalizeUsage(props.initialUsage)
  form.productType = props.initialProductType
  form.material = ''
  form.meshOrAperture = ''
  form.size = ''
  form.quantity = ''
  form.customRequired = undefined
  form.remark = ''
}

const handleSubmit = async () => {
  submitStatus.value = 'idle'

  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    await $fetch<InquiryResponse>('/api/inquiry', {
      method: 'POST',
      body: {
        ...form,
        locale: locale.value === 'zh' ? 'zh' : 'en'
      }
    })

    submitStatus.value = 'success'
    clearErrors()
    resetForm()
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>
