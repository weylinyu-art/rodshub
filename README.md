# RodsHub

B2B 渔竿市场首页，基于 Next.js + Tailwind CSS 构建，支持 GitHub + Cloudflare Pages 自动部署。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

> `build` 前会自动执行热点抓取脚本：`scripts/generate-insight-hot-topics.mjs`，实时拉取社区/趋势话题并生成 `data/insight-hot-topics.generated.ts`，用于 `insights` 批量文章扩展。

手动刷新热点文章种子：

```bash
npm run generate:insight-hot-topics
```

## GitHub + Cloudflare Pages 部署

### 方式一：Cloudflare Git 集成（推荐）

1. 将代码推送到 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
4. 选择 **GitHub** 并授权，选择 `rodshub` 仓库
5. 配置构建设置：
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
6. 点击 **Save and Deploy**

### 方式二：GitHub Actions + Wrangler

需配置 Secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。首次部署前执行：

```bash
npx wrangler pages project create rodshub
```

## 技术栈

- Next.js 15
- Tailwind CSS
- Cloudflare Pages
