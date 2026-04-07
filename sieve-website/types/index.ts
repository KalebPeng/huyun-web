import type { LocalizedValue } from '../utils/localized'

export interface ProductSelectionGuide {
  abrasion: 'low' | 'medium' | 'high' | 'excellent'
  corrosion: 'low' | 'medium' | 'high' | 'excellent'
  temperature: 'low' | 'medium' | 'high' | 'excellent'
  moisture: 'low' | 'medium' | 'high' | 'excellent'
  note?: string
}

export interface LocalizedProductSelectionGuide
  extends Omit<ProductSelectionGuide, 'note'> {
  note?: LocalizedValue<string>
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

export interface LocalizedProduct extends Omit<
  Product,
  | 'name'
  | 'category'
  | 'summary'
  | 'description'
  | 'materials'
  | 'sizes'
  | 'tensileStrength'
  | 'hardness'
  | 'standard'
  | 'advantages'
  | 'seoTitle'
  | 'seoDescription'
  | 'selectionGuide'
> {
  name: LocalizedValue<string>
  category: LocalizedValue<string>
  summary: LocalizedValue<string>
  description: LocalizedValue<string>
  materials: LocalizedValue<string[]>
  sizes?: LocalizedValue<string[]>
  tensileStrength?: LocalizedValue<string>
  hardness?: LocalizedValue<string>
  standard?: LocalizedValue<string>
  advantages: LocalizedValue<string[]>
  seoTitle?: LocalizedValue<string>
  seoDescription?: LocalizedValue<string>
  selectionGuide?: LocalizedProductSelectionGuide
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

export interface LocalizedApplicationScene extends Omit<
  ApplicationScene,
  | 'name'
  | 'summary'
  | 'description'
  | 'useCases'
  | 'considerations'
  | 'seoTitle'
  | 'seoDescription'
> {
  name: LocalizedValue<string>
  summary: LocalizedValue<string>
  description: LocalizedValue<string>
  useCases: LocalizedValue<string[]>
  considerations: LocalizedValue<string[]>
  seoTitle?: LocalizedValue<string>
  seoDescription?: LocalizedValue<string>
}

export interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  relatedProductIds?: string[]
  relatedApplicationIds?: string[]
}

export interface LocalizedFAQ extends Omit<FAQ, 'category' | 'question' | 'answer'> {
  category: LocalizedValue<string>
  question: LocalizedValue<string>
  answer: LocalizedValue<string>
}

export interface InquiryForm {
  locale?: 'en' | 'zh'
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
