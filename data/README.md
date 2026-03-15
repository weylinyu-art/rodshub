# 产品数据 - CSV 批量导入

## 快速上新

1. 编辑 `data/products.csv`
2. 运行 `npm run build` 或 `npm run dev`（会自动从 CSV 生成数据并构建）

## CSV 列说明

| 列 | 必填 | 说明 |
|----|------|------|
| parentSku | 是 | 产品族 SKU，与 R2 图片文件夹名一致 |
| subSku | 是 | 子 SKU，单款填「无」 |
| type | 是 | Spinning / Casting / Telescopic |
| lengthInch | 是 | 伸展长（英寸） |
| collapsedDimensions | 是 | 收缩尺寸，如 37.40*1.18*1.18 |
| weightG | 是 | 重量（克） |
| title | 否 | 详情页标题，含逗号时用双引号包裹 |
| shortTitle | 否 | 列表短标题，每产品族首行填即可 |
| displayPrice | 否 | 展示价，如 $14.50/pc |

## 新增产品

1. 复制任意一行，按模板修改
2. 将产品图片上传至 R2：`products/{parentSku}/{parentSku}-1.jpg` 等
3. 保存 CSV 并重新构建

## 外部产品采集

从 1688、同行站点抓取商品信息，生成 CSV 行。支持：

- **轮播图片**：提取详情页主图，`--download-images` 下载到 `output/products/{sku}/`
- **标题翻译**：`--translate` 将中文标题/属性翻译为英文（MyMemory API）
- **价格转换**：自动解析 ¥ 价格，`--cny-rate 7.2` 转为 $/pc 格式

```bash
# 先安装依赖
npm install puppeteer

# 基础采集（输出 CSV 行，需手动核对后加入 products.csv）
node scripts/scrape-product.mjs "https://detail.1688.com/offer/xxx.html"

# 指定 parentSku（与 R2 图片目录名一致）
node scripts/scrape-product.mjs "链接" --sku TSG31

# 直接追加到 products.csv
node scripts/scrape-product.mjs "链接" --append

# 完整采集：翻译标题 + 下载轮播图 + 价格转美元
node scripts/scrape-product.mjs "链接" --translate --download-images --cny-rate 7.2 --append
```

采集到的 parentSku 默认用 1688 offerId；需与 R2 图片目录一致时请用 `--sku` 指定。下载的图片保存至 `output/products/{sku}/`，需手动上传到 R2 对应目录。
