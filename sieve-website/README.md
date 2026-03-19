# FactoryWeb

当前项目已经按 **Nuxt 4** 目录方式整理完成，前端开发统一围绕 `app/` 展开，不再使用 Nuxt 3 的根目录 `pages/ / layouts/ / components/ / composables/` 结构。

## 目录结构

```text
sieve-website/
├─ app/
│  ├─ app.vue
│  ├─ pages/           # 路由页面
│  ├─ layouts/         # 布局
│  ├─ components/      # UI 组件
│  └─ composables/     # 前端组合式逻辑
├─ data/               # 静态业务数据（JSON）
├─ public/             # 静态资源
├─ server/
│  └─ api/             # 服务端 API
├─ types/              # 共享类型定义
├─ nuxt.config.ts
└─ tailwind.config.ts
```

## 职责边界

### `app/pages`
- 只负责页面组装、SEO、页面级数据读取。
- 页面不要直接写大段业务数据，优先调用 `app/composables/`。

### `app/components`
- 放可复用 UI 组件和页面模块。
- `common/` 放通用组件，`home/` 放首页模块，后续按业务域继续分目录。

### `app/composables`
- 负责把 `data/` 或未来的 `server/api/` 封装成页面可直接使用的读取函数。
- 页面和组件优先依赖 composable，不直接 import JSON。

### `data`
- 只放静态内容源，例如产品、应用场景、FAQ。
- 不放 UI 状态，不放函数，不放运行时逻辑。

### `types`
- 只放共享 TypeScript 数据契约。
- 当前统一使用 `types/index.ts`，后续类型变多再拆分子文件。

### `server/api`
- 只放必须走服务端的接口逻辑，例如表单提交、鉴权、第三方服务转发。
- 如果只是本地静态展示数据，优先放 `data/` 并由 composable 读取，不要先上 API。

## 当前数据流

```text
data/*.json -> app/composables/* -> app/pages/* / app/components/*
```

当前产品、应用场景、FAQ 都应走这条链路。  
只有当数据需要服务端处理时，才改成：

```text
server/api/* -> app/composables/* -> app/pages/* / app/components/*
```

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 当前约定

- 新页面放 `app/pages/`
- 新布局放 `app/layouts/`
- 新组件放 `app/components/`
- 新组合式函数放 `app/composables/`
- 新静态数据放 `data/`
- 新共享类型放 `types/`
- 需要 HTTP 接口时再新增 `server/api/*`
