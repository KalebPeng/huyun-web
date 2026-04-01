export interface ProductSelectionGuide {
  abrasion: 'low' | 'medium' | 'high' | 'excellent'
  corrosion: 'low' | 'medium' | 'high' | 'excellent'
  temperature: 'low' | 'medium' | 'high' | 'excellent'
  moisture: 'low' | 'medium' | 'high' | 'excellent'
  note?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  summary: string
  description: string
  coverImage: string
  gallery?: string[]
  materials: string[]
  meshRange?: string
  apertureRange?: string
  wireDiameterRange?: string
  sizes?: string[]
  customSupported: boolean
  tensileStrength?: string
  hardness?: string
  standard?: string
  selectionGuide?: ProductSelectionGuide
  applications: string[]
  advantages: string[]
  faqs?: string[]
  relatedProducts?: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface ApplicationScene {
  id: string
  slug: string
  name: string
  summary: string
  description: string
  coverImage: string
  useCases: string[]
  considerations: string[]
  recommendedProducts: string[]
  faqs?: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  relatedProductIds?: string[]
  relatedApplicationIds?: string[]
}

export interface InquiryForm {
  name: string
  company?: string
  contact: string
  usage?: string
  productType?: string
  material?: string
  meshOrAperture?: string
  size?: string
  quantity?: string
  customRequired?: boolean
  remark?: string
}
