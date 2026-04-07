import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const productsFile = path.join(projectRoot, 'data', 'products.json')
const publicRoot = path.join(projectRoot, 'public')
const placeholderCover = '/images/placeholders/product-cover.svg'

const targetBudget = {
  cover: 200 * 1024,
  gallery: 250 * 1024
}

const hardLimit = 1024 * 1024

const stripBom = (value) => value.replace(/^\uFEFF/, '')
const toKb = (value) => `${(value / 1024).toFixed(1)} KB`
const getExt = (filePath) => path.extname(filePath).toLowerCase()

const coverNamePattern = /^cover\.(webp|png|jpe?g|svg)$/i
const galleryNamePattern = /^gallery-\d{2}\.(webp|png|jpe?g)$/i

const errors = []
const warnings = []

const products = JSON.parse(stripBom(readFileSync(productsFile, 'utf8')))

const pushIssue = (collection, productId, field, message) => {
  collection.push(`[${productId}] ${field}: ${message}`)
}

const validateAsset = ({ product, field, assetPath, kind, allowPlaceholder }) => {
  if (typeof assetPath !== 'string' || !assetPath.trim()) {
    pushIssue(errors, product.id, field, '路径为空')
    return
  }

  if (!assetPath.startsWith('/images/')) {
    pushIssue(errors, product.id, field, `必须以 /images/ 开头，当前是 ${assetPath}`)
    return
  }

  if (allowPlaceholder && assetPath === placeholderCover) {
    pushIssue(warnings, product.id, field, '仍在使用占位图，建议尽快补真实图片')
    return
  }

  const expectedPrefix = `/images/products/${product.slug}/`

  if (!assetPath.startsWith(expectedPrefix)) {
    pushIssue(errors, product.id, field, `必须放在 ${expectedPrefix} 目录下，当前是 ${assetPath}`)
    return
  }

  const fileName = path.posix.basename(assetPath)

  if (kind === 'cover' && !coverNamePattern.test(fileName)) {
    pushIssue(errors, product.id, field, `封面命名不合法，必须是 cover.*，当前是 ${fileName}`)
  }

  if (kind === 'gallery' && fileName !== path.posix.basename(product.coverImage) && !galleryNamePattern.test(fileName)) {
    pushIssue(errors, product.id, field, `图库命名不合法，必须是 gallery-XX.*，当前是 ${fileName}`)
  }

  const absolutePath = path.join(publicRoot, assetPath.replace(/^\/+/, '').replaceAll('/', path.sep))

  if (!existsSync(absolutePath)) {
    pushIssue(errors, product.id, field, `文件不存在：${assetPath}`)
    return
  }

  const size = statSync(absolutePath).size

  if (size > hardLimit) {
    pushIssue(errors, product.id, field, `文件体积 ${toKb(size)} 超过硬上限 ${toKb(hardLimit)}`)
    return
  }

  if (size > targetBudget[kind]) {
    pushIssue(warnings, product.id, field, `文件体积 ${toKb(size)} 超过建议值 ${toKb(targetBudget[kind])}`)
  }

  if (getExt(assetPath) !== '.webp' && assetPath !== placeholderCover) {
    pushIssue(warnings, product.id, field, `当前不是 webp：${assetPath}`)
  }
}

for (const product of products) {
  const usesPlaceholderCover = product.coverImage === placeholderCover

  validateAsset({
    product,
    field: 'coverImage',
    assetPath: product.coverImage,
    kind: 'cover',
    allowPlaceholder: true
  })

  if (!Array.isArray(product.gallery) || product.gallery.length === 0) {
    pushIssue(warnings, product.id, 'gallery', '未配置详情图库')
    continue
  }

  if (usesPlaceholderCover) {
    pushIssue(warnings, product.id, 'gallery', '封面仍是占位图，已跳过 gallery 严格校验')
    continue
  }

  const duplicated = new Set()

  product.gallery.forEach((assetPath, index) => {
    const field = `gallery[${index}]`

    if (duplicated.has(assetPath)) {
      pushIssue(warnings, product.id, field, `与同产品其他图库项重复：${assetPath}`)
    }

    duplicated.add(assetPath)

    validateAsset({
      product,
      field,
      assetPath,
      kind: 'gallery',
      allowPlaceholder: false
    })

    if (assetPath === product.coverImage) {
      pushIssue(warnings, product.id, field, '图库暂时复用了封面图，后续建议补 gallery-XX 详情图')
    }
  })
}

if (warnings.length > 0) {
  console.warn('图片资源警告：')
  warnings.forEach((warning) => console.warn(`- ${warning}`))
}

if (errors.length > 0) {
  console.error('图片资源错误：')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`图片资源检查通过：${products.length} 个产品，无阻断错误。`)
if (warnings.length > 0) {
  console.log(`附带 ${warnings.length} 条警告，建议后续清理。`)
}
