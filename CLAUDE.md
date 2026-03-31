# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

筛网厂企业官网，基于 Nuxt 4 + Vue 3 + Tailwind CSS 构建的 SSR 站点，面向 B2B 工业客户，提供产品展示、应用场景说明、FAQ 和在线询价功能。所有代码位于 `sieve-website/` 子目录。

## 常用命令

所有命令在 `sieve-website/` 目录下执行：

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器 http://localhost:3000
npm run build      # 生产构建（提交前必须通过）
npm run preview    # 预览生产构建
npm run lint       # ESLint 检查
npm run format     # Prettier 格式化
```

暂无自动化测试套件。行为变更需通过 `npm run lint` 并在 `npm run dev` 或 `npm run preview` 中手工验证。

## 环境变量

从 `.env.example` 复制为 `.env`，填写以下四个必填项：

| 变量名 | 用途 |
|--------|------|
| `NUXT_PUBLIC_SITE_URL` | 站点正式域名，用于 SEO/sitemap/JSON-LD |
| `RESEND_API_KEY` | Resend 邮件服务 API Key |
| `NOTIFY_EMAIL` | 企业接收询价通知的邮箱 |
| `FROM_EMAIL` | 官网发件邮箱 |

`resendApiKey`/`notifyEmail`/`fromEmail` 是服务端私有配置，`siteUrl` 通过 `public` 暴露给客户端。

## 架构概览

### 数据层（构建时静态导入）

内容数据存储在 `data/*.json`，在构建时通过 ES import 直接打包进 composable，无运行时 API 调用：

```
data/products.json       → app/composables/useProducts.ts
data/applications.json   → app/composables/useApplications.ts
data/faq.json            → app/composables/useFaq.ts
```

`nuxt.config.ts` 在构建阶段读取这些 JSON 文件生成 sitemap 动态 URL 条目。

**数据关联关系：**
- `Product.applications[]` 引用 `ApplicationScene.id`
- `Product.relatedProducts[]` 引用其他 `Product.id`
- `Product.faqs[]` / `ApplicationScene.faqs[]` 引用 `FAQ.id`
- `ApplicationScene.recommendedProducts[]` 引用 `Product.id`

新增产品或应用场景时，需同步维护 `slug`、SEO 字段、封面图路径、关联 FAQ 和推荐关系，并执行 `npm run build` 验证动态路由和 sitemap 是否正常。

### 服务端 API

`server/api/inquiry.post.ts`（POST `/api/inquiry`）：接收询价表单，服务端做输入清洗和必填校验后通过 Resend SDK 发送 HTML 邮件，返回 `{ success: boolean, message: string }`。

### SEO

- `app/composables/useSeoMeta.ts` — 封装 `useHead` + `useNuxtSeoMeta`，统一设置 title/description/og/twitter；全局 `titleTemplate: '%s | 筛网厂'`
- 产品详情页（`pages/products/[slug].vue`）注入 Schema.org `Product` JSON-LD 结构化数据
- `@nuxt/image` 配置了 `hero`（960×720）和 `card`（800×560）两种图片预设，输出 WebP 格式

### 路由

| 路由 | 说明 |
|------|------|
| `/` | 首页，6 个懒加载 Section 组件 |
| `/products` | 产品列表 |
| `/products/:slug` | 产品详情（含 JSON-LD） |
| `/applications` | 应用场景列表 |
| `/applications/:slug` | 场景详情 |
| `/faq` | 全部 FAQ |
| `/about` | 关于我们 |
| `/contact` | 询价页，支持 `?product=slug` 和 `?scene=slug` 查询参数预填表单 |

### 样式约定

Tailwind 自定义主题色：
- `primary`: `#1a2744`（品牌深蓝）
- `accent`: `#2563eb`（强调亮蓝）
- `neutral`: `#f4f4f0`（浅灰背景）
- `dark`: `#111827`（近黑）

字体优先级：`system-ui` → `PingFang SC` → `Microsoft YaHei` → `sans-serif`

## 代码规范

- TypeScript strict 模式；Prettier 配置为无分号、单引号、无尾随逗号、2 空格缩进
- Vue SFC 文件名 PascalCase；路由相关文件名 kebab-case
- 路径别名：`~/` 指向 `sieve-website/app/`，`~~/` 指向 `sieve-website/`
- 不要编辑或提交 `node_modules/` 和 `.nuxt/` 下的生成文件
