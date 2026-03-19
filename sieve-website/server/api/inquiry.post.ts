import { Resend } from 'resend'

import type { InquiryForm } from '~~/types'

interface InquiryResponse {
  success: boolean
  message: string
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

const formatValue = (value: string | boolean | undefined) => {
  if (typeof value === 'boolean') {
    return value ? '是' : '否'
  }

  return value && value.trim() ? value.trim() : '/'
}

const buildInquiryHtml = (payload: InquiryForm) => {
  const rows: Array<[string, string]> = [
    ['姓名', formatValue(payload.name)],
    ['公司名称', formatValue(payload.company)],
    ['联系方式', formatValue(payload.contact)],
    ['用途 / 行业', formatValue(payload.usage)],
    ['所需产品类型', formatValue(payload.productType)],
    ['材质要求', formatValue(payload.material)],
    ['目数或孔径', formatValue(payload.meshOrAperture)],
    ['尺寸规格', formatValue(payload.size)],
    ['需求数量', formatValue(payload.quantity)],
    ['是否需要定制', formatValue(payload.customRequired)],
    ['备注说明', formatValue(payload.remark)]
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
          <h1 style="margin: 0; font-size: 24px; line-height: 1.4;">新询价通知</h1>
          <p style="margin: 8px 0 0; font-size: 14px; color: #cbd5e1;">企业官网收到一条新的询价表单提交。</p>
        </div>
        <div style="padding: 24px 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.7;">
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <p style="margin: 20px 0 0; font-size: 13px; color: #64748b;">
            来源：来自企业官网询价表单
          </p>
        </div>
      </div>
    </div>
  `
}

export default defineEventHandler(async (event): Promise<InquiryResponse> => {
  const config = useRuntimeConfig(event)
  const body = await readBody<Partial<InquiryForm>>(event)

  const payload: InquiryForm = {
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
      statusMessage: '姓名和联系方式不能为空'
    })
  }

  if (!config.resendApiKey || !config.notifyEmail || !config.fromEmail) {
    setResponseStatus(event, 500)

    return {
      success: false,
      message: '发送失败'
    }
  }

  const resend = new Resend(config.resendApiKey)

  try {
    await resend.emails.send({
      from: config.fromEmail,
      to: config.notifyEmail,
      subject: `新询价通知 - ${payload.name}`,
      html: buildInquiryHtml(payload)
    })

    return {
      success: true,
      message: '已收到您的询价'
    }
  } catch (error) {
    console.error('Failed to send inquiry email:', error)
    setResponseStatus(event, 500)

    return {
      success: false,
      message: '发送失败'
    }
  }
})
