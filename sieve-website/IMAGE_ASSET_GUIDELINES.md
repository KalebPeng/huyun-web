# 图片资源规范

这套规范只管站内静态图片资源，目标很直接：路径统一、命名统一、体积可控，别再把微信导出的原图和占位图一锅炖进官网。

## 目录规则

- 产品图片统一放在 `public/images/products/{product-slug}/`
- 每个产品一个目录，不要跨产品共用目录
- 占位图只允许继续放在 `public/images/placeholders/`
- 工厂、场景、通用视觉图继续按现有目录拆分，不要往 `products/` 里乱塞

## 命名规则

- 产品封面图统一命名为 `cover.webp`
- 产品详情图库统一命名为 `gallery-01.webp`、`gallery-02.webp`
- 迁移期允许使用 `cover.jpg` / `cover.jpeg` / `cover.png`
- 迁移期允许 `gallery` 临时复用 `cover.*`，但后续补图时应改成 `gallery-XX.*`
- 不允许保留微信临时文件名、设备默认文件名、`IMG_1234` 这类垃圾命名

## 格式规则

- 照片类产品图优先使用 `webp`
- 透明背景、图标、示意图优先使用 `svg`
- 除非确实有兼容性需求，不新增 `png` 产品实拍图
- `jpg/jpeg` 只作为迁移期兼容格式，后续新图优先转成 `webp`

## 尺寸与体积

- 产品列表封面目标尺寸：`800x560`
- 产品详情大图建议长边：`1200px`
- 封面图目标体积：`<= 200 KB`
- 详情图目标体积：`<= 250 KB`
- 单张图片硬上限：`1 MB`

说明：

- `target` 是优化目标，超过会在校验脚本里给 warning
- `hard limit` 是构建前必须处理的红线，超过直接算错误
- 现在仓库里已有少量历史 `jpg`，先允许活着，但后续补图按 `webp` 走

## 数据字段约束

- `data/products.json` 的 `coverImage` 必须指向封面图
- `data/products.json` 的 `gallery` 必须是当前产品目录下的图片数组
- `coverImage` 不允许指向别的产品目录
- `gallery` 不允许指向别的产品目录
- 没有真实图片时，`coverImage` 才允许继续用 `/images/placeholders/product-cover.svg`
- 没有真实图片时，不要保留伪造的 `gallery` 路径占坑

## 更新流程

1. 拿到原图后先裁切，再压缩，再入库
2. 把图片放到 `public/images/products/{slug}/`
3. 封面命名为 `cover.*`
4. 详情图命名为 `gallery-XX.*`
5. 更新 `data/products.json`
6. 运行 `npm run check:images`
7. 再运行 `npm run build`

## 校验命令

```bash
npm run check:images
```

脚本会检查这些烂活：

- 图片路径是否存在
- 是否落在当前产品自己的目录里
- 文件名是否符合 `cover` / `gallery-XX` 规则
- 是否仍在用占位图
- 是否不是 `webp`
- 是否超出目标体积或硬上限

## 当前过渡策略

- 已有历史图片先不强制一夜之间全转 `webp`
- 真实产品图优先替换占位图
- 新补的产品图按这份规范收口，别再新增野路子路径
