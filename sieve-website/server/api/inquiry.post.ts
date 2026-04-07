import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'
import { Resend } from 'resend'

import type { InquiryForm } from '~~/types'

interface InquiryResponse {
  success: boolean
  message: string
}

type InquiryLocale = 'en' | 'zh'

interface InquiryCopy {
  yes: string
  no: string
  empty: string
  source: string
  missingRequired: string
  sendFailed: string
  successMessage: string
  subjectPrefix: string
  emailTitle: string
  emailSubtitle: string
  fields: {
    name: string
    company: string
    contact: string
    usage: string
    productType: string
    material: string
    meshOrAperture: string
    size: string
    quantity: string
    customRequired: string
    remark: string
  }
}

const INQUIRY_COPY: Record<InquiryLocale, InquiryCopy> = {
  en: {
    yes: 'Yes',
    no: 'No',
    empty: '/',
    source: 'Source: Website inquiry form',
    missingRequired: 'Name and contact are required',
    sendFailed: 'Failed to send inquiry',
    successMessage: 'Your inquiry has been received',
    subjectPrefix: 'New inquiry notification',
    emailTitle: 'New Inquiry Notification',
    emailSubtitle: 'A new inquiry form has been submitted on the website.',
    fields: {
      name: 'Name',
      company: 'Company',
      contact: 'Contact',
      usage: 'Application / Industry',
      productType: 'Product Type',
      material: 'Material Requirement',
      meshOrAperture: 'Mesh Size or Aperture',
      size: 'Dimensions',
      quantity: 'Quantity',
      customRequired: 'Custom Required',
      remark: 'Additional Notes'
    }
  },
  zh: {
    yes: '是',
    no: '否',
    empty: '/',
    source: '来源：来自企业官网询价表单',
    missingRequired: '姓名和联系方式不能为空',
    sendFailed: '发送失败',
    successMessage: '已收到您的询价',
    subjectPrefix: '新询价通知',
    emailTitle: '新询价通知',
    emailSubtitle: '企业官网收到一条新的询价表单提交。',
    fields: {
      name: '姓名',
      company: '公司名称',
      contact: '联系方式',
      usage: '用途 / 行业',
      productType: '所需产品类型',
      material: '材质要求',
      meshOrAperture: '目数或孔径',
      size: '尺寸规格',
      quantity: '需求数量',
      customRequired: '是否需要定制',
      remark: '备注说明'
    }
  }
}

const sanitizeText = (value: unknown) => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const resolveLocale = (bodyLocale: unknown, event: H3Event): InquiryLocale => {
  if (bodyLocale === 'zh' || bodyLocale === 'en') {
    return bodyLocale
  }

  const referer = getRequestHeader(event, 'referer')

  if (referer) {
    try {
      const pathname = new URL(referer).pathname

      if (pathname === '/zh' || pathname.startsWith('/zh/')) {
        return 'zh'
      }
    } catch {
      // Ignore invalid referer URLs and fall back to headers.
    }
  }

  const acceptLanguage = getRequestHeader(event, 'accept-language')?.toLowerCase() || ''

  return acceptLanguage.startsWith('zh') ? 'zh' : 'en'
}

const formatValue = (value: string | boolean | undefined, copy: InquiryCopy) => {
  if (typeof value === 'boolean') {
    return value ? copy.yes : copy.no
  }

  return value && value.trim() ? value.trim() : copy.empty
}

const buildInquiryHtml = (payload: InquiryForm, copy: InquiryCopy) => {
  const rows: Array<[string, string]> = [
    [copy.fields.name, formatValue(payload.name, copy)],
    [copy.fields.company, formatValue(payload.company, copy)],
    [copy.fields.contact, formatValue(payload.contact, copy)],
    [copy.fields.usage, formatValue(payload.usage, copy)],
    [copy.fields.productType, formatValue(payload.productType, copy)],
    [copy.fields.material, formatValue(payload.material, copy)],
    [copy.fields.meshOrAperture, formatValue(payload.meshOrAperture, copy)],
    [copy.fields.size, formatValue(payload.size, copy)],
    [copy.fields.quantity, formatValue(payload.quantity, copy)],
    [copy.fields.customRequired, formatValue(payload.customRequired, copy)],
    [copy.fields.remark, formatValue(payload.remark, copy)]
  ]

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="width: 160px; padding: 12px 16px; border: 1px solid #e2e8f0; background: #f8fafc; text-align: left; color: #0f172a;">${escapeHtml(label)}</th>
          <td style="padding: 12px 16px; border: 1px solid #e2e8f0; color: #334155;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join('')

  return `
    <div style="font-family: Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
      <div style="max-width: 760px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
        <div style="padding: 24px 28px; background: linear-gradient(135deg, #111827, #1a2744); color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; line-height: 1.4;">${escapeHtml(copy.emailTitle)}</h1>
          <p style="margin: 8px 0 0; font-size: 14px; color: #cbd5e1;">${escapeHtml(copy.emailSubtitle)}</p>
        </div>
        <div style="padding: 24px 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.7;">
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <p style="margin: 20px 0 0; font-size: 13px; color: #64748b;">
            ${escapeHtml(copy.source)}
          </p>
        </div>
      </div>
    </div>
  `
}

export default defineEventHandler(async (event): Promise<InquiryResponse> => {
  const config = useRuntimeConfig(event)
  const body = await readBody<Partial<InquiryForm>>(event)
  const locale = resolveLocale(body?.locale, event)
  const copy = INQUIRY_COPY[locale]

  const payload: InquiryForm = {
    locale,
    name: sanitizeText(body?.name),
    company: sanitizeText(body?.company),
    contact: sanitizeText(body?.contact),
    usage: sanitizeText(body?.usage),
    productType: sanitizeText(body?.productType),
    material: sanitizeText(body?.material),
    meshOrAperture: sanitizeText(body?.meshOrAperture),
    size: sanitizeText(body?.size),
    quantity: sanitizeText(body?.quantity),
    customRequired: typeof body?.customRequired === 'boolean' ? body.customRequired : undefined,
    remark: sanitizeText(body?.remark)
  }

  if (!payload.name || !payload.contact) {
    throw createError({
      statusCode: 400,
      statusMessage: copy.missingRequired
    })
  }

  if (!config.resendApiKey || !config.notifyEmail || !config.fromEmail) {
    setResponseStatus(event, 500)

    return {
      success: false,
      message: copy.sendFailed
    }
  }

  const resend = new Resend(config.resendApiKey)

  try {
    await resend.emails.send({
      from: config.fromEmail,
      to: config.notifyEmail,
      subject: `${copy.subjectPrefix} - ${payload.name}`,
      html: buildInquiryHtml(payload, copy)
    })

    return {
      success: true,
      message: copy.successMessage
    }
  } catch (error) {
    console.error('Failed to send inquiry email:', error)
    setResponseStatus(event, 500)

    return {
      success: false,
      message: copy.sendFailed
    }
  }
})
