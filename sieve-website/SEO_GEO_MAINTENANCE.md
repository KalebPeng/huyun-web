# SEO / GEO Maintenance

这份文档不是讲概念，是讲这个项目现在已经落地了哪些 SEO / GEO 设施，以及后面新增知识库文章、产品内容、应用内容时，哪些地方要同步检查。

## 当前已落地的 SEO / GEO 设施

### 1. 全站 SEO Meta

关键文件：

- `app/composables/useSeoMeta.ts`

当前规则：

- 全站统一输出 `title` / `description`
- 自动输出 `canonical`
- 自动输出中英 `hreflang`
- 自动输出 `og:*` / `twitter:*`
- 未单独指定分享图时，使用默认分享图兜底
- 404 详情页支持显式输出 `noindex, nofollow`

改页面 SEO 时，优先从这个 composable 入手，不要到处手写一坨重复 meta。

### 2. 页面级结构化数据

当前已经做了这些：

- 首页：`Organization`
- 产品列表 / 应用列表 / 知识库列表：`ItemList`
- 产品详情：`Product` + `BreadcrumbList`
- 应用详情：`CollectionPage`
- FAQ：`FAQPage`
- 知识库详情：`TechArticle` + `BreadcrumbList`
- 工具页：`WebApplication` + `HowTo`

如果后面新增整类页面，别只管 meta，不管 JSON-LD。

### 3. 机器入口 `llms.txt`

关键文件：

- `server/routes/llms.txt.ts`

当前规则：

- 中英文入口分开列出
- 产品页、应用页、知识库文章都自动列入
- 已补 `Organization Facts`
- 已补 `Commercial & Selection Guidance`
- 产品条目会带材质、孔径、丝径、目数、定制能力、常见应用这类事实信息

注意：

- 新增知识库文章后，`llms.txt` 会自动收录，不需要手动加文章链接
- 但如果你改的是公司能力、询盘规则、生产能力、服务范围这类“组织事实”，要同步改 `llms.txt.ts`

### 4. 搜索引擎抓取入口

关键文件：

- `server/routes/robots.txt.ts`
- `server/api/__sitemap__/knowledge.ts`
- `nuxt.config.ts`

当前规则：

- `robots.txt` 正常放行并挂 sitemap
- 知识库 sitemap 走动态数据源
- 构建后必须确认 sitemap 和 robots 输出还活着

### 5. GEO 相关页面联动

当前已经做了这些：

- 产品详情页可以直接跳到对应应用页
- 产品详情页有“相关文章与选型指南”区块
- 产品 JSON-LD 会通过 `subjectOf` 关联相关知识文章

关键文件：

- `app/pages/products/[slug].vue`
- `utils/productKnowledge.ts`

## 新增知识库文章时的同步清单

### 必做

1. 在 `content/en/knowledge/` 新建英文 md
2. 在 `content/zh/knowledge/` 新建中文 md
3. 保持 slug 一致
4. frontmatter 至少补齐：
   - `title`
   - `category`
   - `summary`
   - `author`
   - `publishedAt`
   - `tags`
5. 建议补齐：
   - `reviewedAt`
   - `reviewedBy`
   - `applicability`
   - `seoTitle`
   - `seoDescription`
   - `sources`

### 需要同步判断的 GEO 项

#### A. 这篇文章是不是和某个产品强相关？

如果是，比如：

- 65Mn 疲劳寿命
- 聚氨酯筛网选型
- 条缝焊接筛网 / wedge wire / Johnson Screen

那就同步更新：

- `utils/productKnowledge.ts`

目的：

- 让产品页“相关文章与选型指南”能挂上这篇文章
- 让产品 JSON-LD 的 `subjectOf` 自动带上这篇文章

#### B. 这篇文章是不是引入了新的核心术语或标准？

如果是，比如新增：

- 新标准号
- 新材料体系
- 新选型方法
- 新行业别名

那就检查：

- 文章 `tags` 是否足够机器可读
- 标题和摘要里是否明确写出主术语
- 中英文术语是否统一

不要中文写一种、英文写另一种，最后把模型喂懵。

#### C. 这篇文章是不是改变了公司层面的对外说法？

如果文章里首次明确写了这些东西：

- 新的服务能力
- 新的交期承诺
- 新的定制边界
- 新的生产能力
- 新的主打产品方向

那就同步检查：

- `server/routes/llms.txt.ts`
- 必要时 `about` / `contact` 页文案

别让文章里说一套，机器入口里还是旧话术。

## 改产品页时的同步清单

如果你改的是产品详情页内容，至少检查：

1. `usePageSeoMeta` 里的 `title` / `description` / `image`
2. `Product` JSON-LD 有没有跟着变
3. `BreadcrumbList` 有没有被破坏
4. 产品页里的应用场景链接和知识文章链接还在不在
5. 404 场景是不是仍然 `noindex, nofollow`

## 改知识库详情页时的同步清单

如果你改的是知识库详情页模板，至少检查：

1. `TechArticle` JSON-LD 还在不在
2. `BreadcrumbList` 还在不在
3. 作者、审核时间、来源、适用边界这些“可信度块”有没有被删弱
4. 相关文章和联系 CTA 是否仍然存在

## 改 `llms.txt` 时的底线

改 `server/routes/llms.txt.ts` 时，不要把这几样弄丢：

- 中英文入口
- 产品页、应用页、知识库文章分段
- 组织事实
- 商务与选型指导
- `robots` / `sitemap` / `llms.txt` 自身入口

`llms.txt` 不是营销文案页，它是给机器读的。句子可以短，但事实必须稳。

## 每次改完 SEO / GEO 后必须验证

至少执行：

```bash
npm run lint
npm run build
```

如果改了知识库内容或 SEO 路由，建议再手工看：

- `/robots.txt`
- `/sitemap.xml` 或 `sitemap_index.xml`
- `/llms.txt`
- 任意一个产品详情页
- 任意一篇知识库文章页

## 最容易忘的几件事

1. 新增文章后，`llms.txt` 会自动收录，但产品页相关文章不会自动挂，产品强相关文章要改 `utils/productKnowledge.ts`
2. 只改页面文案，不改结构化数据，等于 SEO 做一半
3. 只改中文，不改英文，`hreflang` 和 GEO 一样会变残
4. 把来源、审核、适用边界这些块删了，会直接削弱 GEO 的可信度
5. 改完不跑构建，最容易把 `llms.txt` 或 JSON-LD 弄挂还不知道
