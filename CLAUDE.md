# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

这是华云筛网企业官网，代码主目录在 `sieve-website/`，技术栈是：

- Nuxt 4
- Vue 3
- Tailwind CSS
- Nuxt Content
- Nuxt i18n
- Nuxt Image

站点当前是 **SSR 双语 B2B 官网**，面向矿山筛分、工业过滤、定制丝网采购场景，包含：

- 首页与品牌介绍
- 产品列表与详情
- 应用场景列表与详情
- FAQ
- 知识库
- 在线询盘
- 技术工具页

最近已经完成的几块大改动：

- 全站 UI 已统一成浅色轻商务国际站风格
- 产品占位图已基本替换为真实产品图
- SEO / GEO 基础设施已补齐
- 移动端首屏做过一轮基础性能优化

## 常用命令

所有命令都在 `sieve-website/` 目录下执行：

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器 http://localhost:3000
npm run build      # 生产构建（提交前必须通过）
npm run preview    # 预览生产构建
npm run lint       # ESLint 检查
npm run format     # Prettier 格式化
npm run check:images
```

当前没有自动化测试套件。正常改动至少要过：

- `npm run lint`
- `npm run build`

如果改了页面行为，最好再手工打开页面看一眼。

## 环境变量

项目依赖以下环境变量：

| 变量名 | 用途 |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | 站点正式域名，用于 canonical / sitemap / JSON-LD / llms.txt |
| `RESEND_API_KEY` | Resend 发信 API Key |
| `NOTIFY_EMAIL` | 接收询盘通知的邮箱 |
| `FROM_EMAIL` | 官网发件邮箱 |

其中：

- `siteUrl` 在客户端可见
- `resendApiKey` / `notifyEmail` / `fromEmail` 仅服务端使用

## 目录结构

核心目录如下：

```text
sieve-website/
├─ app/                     # 页面、组件、composables、样式
├─ components/              # 由 app/components 自动注册
├─ content/                 # 知识库 markdown 内容
│  ├─ en/knowledge/
│  └─ zh/knowledge/
├─ data/                    # 产品 / 应用 / FAQ 静态 JSON 数据
├─ public/                  # 静态资源
├─ scripts/                 # 工具脚本，如图片校验
├─ server/                  # API、robots.txt、llms.txt、sitemap 数据源
├─ i18n/                    # 中英文文案
├─ nuxt.config.ts
├─ tailwind.config.ts
└─ content.config.ts
```

## 数据来源与内容模型

### 1. 产品 / 应用 / FAQ

这三块仍然走静态 JSON：

```text
data/products.json       -> app/composables/useProducts.ts
data/applications.json   -> app/composables/useApplications.ts
data/faq.json            -> app/composables/useFaq.ts
```

这些数据会在构建时直接打进应用，不走运行时外部 API。

### 2. 知识库

知识库已经不是 `data/articles.json` 了，现在走 Nuxt Content：

```text
content/en/knowledge/**/*.md
content/zh/knowledge/**/*.md
```

对应配置在 `content.config.ts`，集合名是 `knowledge`。

新增知识库文章时：

- 英文放到 `content/en/knowledge/`
- 中文放到 `content/zh/knowledge/`
- 中英文版本建议使用相同文件名，保证 slug 一致
- frontmatter 必须符合 schema

当前 `knowledge` 集合要求的关键字段包括：

- `category`
- `summary`
- `author`
- `publishedAt`
- `tags`

常见可选字段：

- `reviewedAt`
- `reviewedBy`
- `applicability`
- `seoTitle`
- `seoDescription`
- `sources`

注意：

- `content/knowledge/` 下面那批历史文件不要再继续往里加
- 当前知识库正式入口只认 `content/en/knowledge/` 和 `content/zh/knowledge/`

## 页面与路由

主要路由如下：

| 路由 | 说明 |
| --- | --- |
| `/` | 首页 |
| `/products` | 产品列表 |
| `/products/:slug` | 产品详情 |
| `/applications` | 应用场景列表 |
| `/applications/:slug` | 应用场景详情 |
| `/knowledge` | 知识库列表 |
| `/knowledge/:slug` | 知识库详情 |
| `/faq` | FAQ 页面 |
| `/tools` | 技术工具页 |
| `/about` | 关于我们 |
| `/contact` | 联系 / 询盘 |
| `/content-standards` | 内容标准说明页 |

双语策略使用 `prefix_except_default`：

- 英文默认不带前缀
- 中文带 `/zh`

比如：

- `/products/65mn-woven-screen`
- `/zh/products/65mn-woven-screen`

## 组件与样式约定

### 1. 自动注册

`nuxt.config.ts` 里开了 `pathPrefix: false`，所以 `app/components/` 下的组件可以直接按文件名使用，不需要目录前缀。

### 2. 设计系统

当前项目已经有统一的轻商务设计系统，核心样式在：

- `app/assets/css/design-system.css`
- `tailwind.config.ts`

不要再把页面写回原来那种：

- 重阴影
- 大玻璃卡
- emoji 图标
- 风格断层严重的模板感样式

当前视觉基调是：

- 主色：`#16304F`
- 强调色：`#2563EB`
- 背景：`#F5F7FA`
- 分割线：`#D9E2EC`
- 正文：`#1F2937`

### 3. 字体

现在已经移除了 Google Fonts 外链，避免国内移动端访问卡死。字体栈按本地优先 + 系统兜底处理，不要再往全局样式里加 `fonts.googleapis.com` 的 `@import`。

## 图片资源规范

产品图片当前已经按规范收口，详细规则见：

- `sieve-website/IMAGE_ASSET_GUIDELINES.md`

核心要求：

- 产品封面统一放 `public/images/products/{slug}/cover.webp`
- 详情图用 `gallery-01.webp`、`gallery-02.webp`
- 产品图优先 `webp`
- 别再把微信临时文件名、原始大图直接扔进仓库

校验命令：

```bash
npm run check:images
```

这个脚本会检查：

- 文件路径是否存在
- 是否落在当前产品自己的目录下
- 是否仍在用占位图
- 命名是否符合规则
- 体积是否超建议值 / 上限

## SEO / GEO

这项目现在的 SEO 和 GEO 不是裸奔状态，关键入口包括：

- `app/composables/useSeoMeta.ts`
- `server/routes/robots.txt.ts`
- `server/routes/llms.txt.ts`
- `server/api/__sitemap__/knowledge.ts`
- `nuxt.config.ts`

当前已经具备：

- canonical
- hreflang
- OG / Twitter meta
- 默认分享图兜底
- sitemap
- robots.txt
- llms.txt
- 页面级 JSON-LD

`llms.txt` 里已经补了中英文入口，不要再只按英文默认站思路写 GEO 内容。

如果后面继续加 SEO 内容，优先关注：

- 产品页结构化数据
- 文章页结构化数据
- 站内内链
- 中英双语入口一致性

## API 与服务端逻辑

### 询盘接口

`server/api/inquiry.post.ts`

- 路由：`POST /api/inquiry`
- 功能：接收联系表单 / 询盘内容，做基础校验后通过 Resend 发邮件

返回结构是简单的：

```ts
{ success: boolean, message: string }
```

不要随便改接口字段，前端表单已经接上了。

### 其他服务端入口

- `robots.txt`
- `llms.txt`
- `__sitemap__/knowledge`

这些都是 SEO/GEO 关键路径，改动时要顺手验证输出内容，不要只盯页面。

## 当前性能注意点

这站移动端已经做过一轮首屏减负，但还有几个已知点要记住：

1. 首页 Hero 只有主图是高优先级，其他图已经改成懒加载  
不要再把首页首屏图片全改回 `loading="eager"`

2. 全局已去掉 Google Fonts 外链  
不要再引回外链字体

3. 移动端背景滚动做过降级  
`background-attachment: fixed` 只保留在大屏，别又改回全端固定背景

4. 知识库当前仍使用 `queryCollection('knowledge')` 读取  
这块后面还有继续优化空间，尤其是移动端知识库性能，但现在先别在不理解链路的情况下乱改

## 开发注意事项

### 1. Nuxt 路由目录规则

如果同时存在：

- `pages/foo.vue`
- `pages/foo/[slug].vue`

那 `foo.vue` 会被当成父布局，不是独立列表页。正确写法是：

- `pages/foo/index.vue`
- `pages/foo/[slug].vue`

### 2. JSON 文件内容

编辑 `data/*.json` 时，注意：

- 引号要合法转义
- 不要混进 BOM 或非法字符
- 中文内容别用奇怪编码保存

虽然 `nuxt.config.ts` 里对 content 文件做了 BOM 清理，但 JSON 还是老老实实保持 UTF-8 最省心。

### 3. 不要碰生成文件

不要编辑这些目录：

- `.nuxt/`
- `.output/`
- `node_modules/`

### 4. 改完必做验证

常规改动后至少执行：

```bash
npm run lint
npm run build
```

如果涉及图片，还要跑：

```bash
npm run check:images
```

## 目前最容易踩坑的几件事

1. 以为知识库还在 `data/articles.json`  
实际上现在走 `content/en/knowledge` 和 `content/zh/knowledge`

2. 继续往 `content/knowledge/` 加文章  
当前正式内容集合不吃这条路径

3. 给产品图随手塞 `jpg/png` 原图  
会拖慢页面，还会被图片检查脚本骂

4. 把首页图片全改回 eager  
手机首屏会重新变慢

5. 改 SEO 只改页面 meta，不看 `llms.txt` / sitemap / robots  
这会把 GEO 做成半残废

## 推荐工作流

### 新增产品图

1. 把图压好
2. 放进 `public/images/products/{slug}/cover.webp`
3. 更新 `data/products.json`
4. 运行 `npm run check:images`
5. 运行 `npm run build`

### 新增知识库文章

1. 在 `content/en/knowledge/` 新建英文 md
2. 在 `content/zh/knowledge/` 新建对应中文 md
3. 保持文件名一致
4. 补齐 frontmatter
5. 运行 `npm run build`

### 改 SEO / GEO

1. 看 `useSeoMeta.ts`
2. 看 `llms.txt.ts`
3. 看 sitemap / robots
4. 构建验证

---

别扯花活，先保证这站：

- 能构建
- 能访问
- 移动端别卡死
- SEO / GEO 不裸奔
- 图片别乱飞

这才是当前项目的工程底线。
