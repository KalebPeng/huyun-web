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

export default defineEventHandler(async (event): Promise<InquiryResponse> => {
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

  return {
    success: true,
    message: 'Inquiry received'
  }
})
