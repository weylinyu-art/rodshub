# 采集脚本 TODO - 待办项记录

## 需求来源

采集内容：商品详情页轮播图片、商品标题、商品价格（需转换为目标语言）、商品属性（需转换为目标语言，仅展示网站需要的特性）

## 当前脚本能力

**scrape-product.mjs** 已实现：

| 能力 | 状态 | 说明 |
|------|------|------|
| 轮播图片提取 | ✅ | page.evaluate 中选取 `img[src*="alicdn"], img[src*="cbu01"], img[data-src*="alicdn"]`，过滤 avatar/icon/logo，去重，取前 8 张 |
| 轮播图片下载 | ✅ | `--download-images` 下载到 `output/products/{parentSku}/{parentSku}-1.jpg` 等，最多 6 张，Referer 防盗链 |
| 标题采集 | ✅ | 优先 `.detail-desc-decorate__title`，其次 h1、`[class*="title"]`、document.title |
| 标题翻译 | ✅ | `--translate` 调用 MyMemory API（zh→en），单次最多 450 字 |
| 价格采集 | ✅ | 正则 `¥\s*(\d+\.?\d*)` 解析 body 中所有人民币价格，取最低价 |
| 价格转换 | ✅ | `--cny-rate 7.2`（可配置）将 CNY 转为 USD，输出 `$X.XX/pc` |
| 属性采集 | ⚠️ 部分 | 长度：正则匹配 `长度[：:]\s*(\d+\.?\d*)\s*米`、`(\d+\.?\d*)\s*厘米`，用于 lengthInch |
| 属性翻译 | ⚠️ 部分 | ATTR_ZH_TO_EN 字典覆盖 木纹/线条/碳素/伸缩等，`translateAttr()` 未接入主流程 |

---

## 待办项（按优先级）

### P0 - 必须完成

- [ ] 图片采集：优化主图选择器，确保只取轮播主图而非详情图
  - 现状：当前通过 `naturalWidth<80` 过滤缩略图，按 DOM 顺序取前 8 张
  - 待做：若 1688 改版，需调研主图区 class（如 `.detail-gallery`、`[class*="mainPic"]`）并更新选择器

- [ ] 图片下载：1688 防盗链导致下载失败时的降级策略
  - 现状：仅设置 Referer: detail.1688.com
  - 待做：失败时尝试 `Referer: https://www.1688.com/`，或输出原图 URL 供手动下载

### P1 - 重要

- [ ] 属性采集：从页面 DOM 精确解析 颜色、长度 等属性（而非仅正则 body）
  - 现状：长度从 body 正则提取，颜色未解析
  - 待做：在 page.evaluate 中查找属性区（如 `.mod-detail-attr`、`dd`/`span` 等），提取 颜色、长度 的键值对

- [ ] 属性翻译：将解析到的 颜色、长度 等写入 CSV 或输出
  - 现状：ATTR_ZH_TO_EN 已定义，translateAttr 未接入
  - 待做：属性解析后调用 translateAttr，将英文化结果并入 title 或扩展 CSV 列（若后续支持）

- [ ] 翻译 API：MyMemory 限流/失败时的降级
  - 现状：失败时返回原文
  - 待做：可考虑本地字典优先（ATTR_ZH_TO_EN 扩展为通用词表），再调 API

### P2 - 可选

- [ ] 批量采集：`--batch urls.txt` 时增加并发控制（如最多 2 个并发，避免 1688 封禁）
- [ ] 多语言：支持 `--lang en|es|fr` 等，将标题/属性翻译为指定语言
- [ ] 其他平台：预留 淘宝/京东 等解析分支（当前仅 1688 + generic）
