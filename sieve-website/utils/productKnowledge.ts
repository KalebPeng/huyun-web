const DEFAULT_ARTICLE_SLUGS = [
  'iso9044-wire-mesh-selection-guide',
  'opening-area-calculation-and-screen-efficiency'
]

const PRODUCT_KNOWLEDGE_MAP: Record<string, string[]> = {
  '65mn-woven-screen': [
    'analysis-of-65mn-wire-mesh-fatigue-life',
    '65mn-vs-stainless-steel-mesh-comparison',
    'opening-area-calculation-and-screen-efficiency'
  ],
  'stainless-woven-mesh': [
    '65mn-vs-stainless-steel-mesh-comparison',
    'iso9044-wire-mesh-selection-guide',
    'opening-area-calculation-and-screen-efficiency'
  ],
  'polyurethane-screen': [
    'polyurethane-screen-application-guide',
    'opening-area-calculation-and-screen-efficiency',
    'iso9044-wire-mesh-selection-guide'
  ],
  'mining-welded-screen': [
    'welded-screen-johnson-screen-principle',
    'opening-area-calculation-and-screen-efficiency',
    'iso9044-wire-mesh-selection-guide'
  ],
  'crimped-wire-mesh': [
    'opening-area-calculation-and-screen-efficiency',
    'iso9044-wire-mesh-selection-guide',
    'analysis-of-65mn-wire-mesh-fatigue-life'
  ]
}

export const getRelatedKnowledgeSlugs = (productSlug: string) =>
  PRODUCT_KNOWLEDGE_MAP[productSlug] ?? DEFAULT_ARTICLE_SLUGS
