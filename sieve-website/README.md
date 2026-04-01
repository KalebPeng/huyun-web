# 华云网业官网

基于 Nuxt 4 构建的企业官网项目，包含首页、产品中心、应用场景、FAQ、关于我们、联系询价和邮件通知接口，并已接入基础 SEO、sitemap 与图片优化配置。

## 本地开发

1. 克隆仓库并进入目录：`cd sieve-website`
2. 安装依赖：`npm install`
3. 复制环境变量模板：`.env.example -> .env`
4. 按实际邮箱服务填写 `.env`
5. 启动开发环境：`npm run dev`
6. 提交前执行：`npm run build`

## Vercel 部署

1. 在 Vercel 中导入仓库，Framework 选择 `Nuxt.js`
2. 安装命令使用 `npm install`
3. 构建命令使用 `npm run build`
4. 输出目录按仓库中的 `vercel.json` 保持为 `.output/public`
5. 在 Vercel 项目设置中配置下表环境变量
6. 部署完成后，把正式域名回填到 `NUXT_PUBLIC_SITE_URL`

## 环境变量

| Key | 说明 | 必填 |
| --- | --- | --- |
| `NUXT_PUBLIC_SITE_URL` | 站点正式域名，用于 SEO、sitemap、JSON-LD | 是 |
| `RESEND_API_KEY` | Resend 邮件服务 API Key | 是 |
| `NOTIFY_EMAIL` | 企业接收询价通知的邮箱 | 是 |
| `FROM_EMAIL` | 官网发件邮箱 | 是 |

## 常用命令

- `npm run dev`：启动本地开发服务器
- `npm run build`：生成生产构建
- `npm run preview`：预览生产构建
- `npm run generate`：生成静态输出
- `npm run lint`：执行 ESLint 检查
- `npm run format`：执行 Prettier 格式化

## 内容更新

- 产品数据：编辑 `data/products.json`
- 应用场景：编辑 `data/applications.json`
- FAQ 数据：编辑 `data/faq.json`
- 类型定义：编辑 `types/index.ts`

新增产品或场景时，至少同步维护 `slug`、SEO 字段、封面图路径、关联 FAQ 和推荐关系。改完静态数据后跑一次 `npm run build`，确认动态路由、结构化数据和 sitemap 没被搞坏。
