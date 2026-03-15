# 点击追踪 Worker（Cloudflare Workers + KV）

全用户点击数据聚合，用于 Categories / Scenarios / Trending 列表页的排序。

## 部署步骤

1. **安装 Wrangler**（若未安装）
   ```bash
   npm i -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **创建 KV 命名空间**
   ```bash
   cd worker
   wrangler kv namespace create COUNTS
   ```
   输出中会显示 `id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"`，复制该 id。

4. **更新 wrangler.toml**
   将 `[[kv_namespaces]]` 下的 `id = "placeholder"` 替换为上面得到的真实 id。

5. **部署**
   ```bash
   npx wrangler deploy
   ```
   部署成功后会显示 Worker 的 URL，如 `https://rodshub-click-tracker.<account>.workers.dev`。

6. **配置前端**
   在项目根目录 `.env.local` 中添加：
   ```
   NEXT_PUBLIC_CLICK_TRACKER_URL=https://rodshub-click-tracker.<account>.workers.dev
   ```
   将 URL 替换为你的实际 Worker 地址。

## 未配置时

若不配置 `NEXT_PUBLIC_CLICK_TRACKER_URL`，前端会自动回退到 localStorage 单人模式，排序仅基于当前用户的点击。
