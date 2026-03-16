# GitHub Actions 部署 Cloudflare Pages 配置说明

部署失败（exit code 1）通常是因为 **GitHub Secrets 未配置或配置错误**。

## 一、在 Cloudflare 创建 API Token

1. 打开 [Cloudflare API Tokens](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. 点击 **Create Token** → **Get started**（创建自定义 Token）
3. 权限设置：
   - **Account** → **Cloudflare Pages** → **Edit**
4. 填写 Token 名称（如 `rodshub-pages-deploy`）
5. 点击 **Continue to summary** → **Create Token**
6. **复制生成的 Token**（只显示一次）

## 二、获取 Account ID

1. 在 Cloudflare 控制台进入任意域名的 **Overview**，或
2. 进入 **Workers & Pages** → 选择 rodshub 项目
3. 右侧边栏可看到 **Account ID**（约 32 位十六进制字符串）

## 三、在 GitHub 添加 Secrets

1. 打开仓库：`https://github.com/weylinyu-art/rodshub`
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**，添加两个 Secret：

| 名称 | 值 |
|------|-----|
| `CLOUDFLARE_API_TOKEN` | 第一步创建的 API Token |
| `CLOUDFLARE_ACCOUNT_ID` | 第二步获取的 Account ID |

**注意**：
- 名称必须**完全一致**（含大小写）
- 必须添加在 **Repository secrets**，不要用 Environment secrets
- `GITHUB_TOKEN` 由 GitHub 自动提供，无需手动添加

## 四、确认 Cloudflare Pages 项目名

确认项目名为 `rodshub`（与 `deploy.yml` 中 `--project-name=rodshub` 一致）。  
若在 Cloudflare 中项目名不同，需修改 workflow 中的 `projectName` 或 `--project-name`。

## 五、验证

配置完成后，push 到 `main` 分支触发部署。若仍失败，在 GitHub Actions 的 `deploy` job 日志中查看 wrangler 的详细报错（会比之前更清晰）。
