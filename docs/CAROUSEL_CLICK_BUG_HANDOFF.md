# 轮播「需点两次才响应」问题交接说明

## 现象（PC 鼠标，非触屏）

- **环境**：PC 浏览器，鼠标点击
- **表现**：商品详情页左侧图片轮播的 **翻页按钮、缩略图、指示点** 都需要 **点击两次** 才切换
- **期望**：单击一次即切换

## 相关文件

- `components/ProductImageGallery.tsx` — 轮播实现（主图、左右箭头、缩略图条、指示点、触摸滑动）

## 已尝试过的方案（均未彻底解决）

1. **onTouchEnd + preventDefault** — 无效（且问题在 PC 点击，非触屏）
2. **addEventListener + passive: false** — 无效
3. **ThumbOrDotButton 等封装** — 无效
4. **touch-manipulation CSS** — 无效
5. **改用 onMouseDown 替代 onClick**（当前实现）— 翻页/缩略图/指示点均用 `onMouseDown` + `onKeyDown`，仍反馈「还是不行」
6. **缩略图内 img 加 pointer-events-none** — 已加，问题仍在

## 可能方向（供后续排查）

1. **桌面端箭头「悬停才显示」**  
   左右箭头使用 `md:opacity-0 md:group-hover/carousel:opacity-100`，桌面端默认透明。  
   假设：第一次点击可能只是在「激活 hover」或改变焦点，第二次才真正命中按钮。  
   可尝试：**桌面端箭头常显**（去掉 `md:opacity-0 md:group-hover/carousel:opacity-100`），验证是否仍要两次点击。

2. **主图区域的 touch 逻辑**  
   主图 div 上有 `onTouchStart` / `onTouchMove` / `onTouchEnd` 做滑动。  
   PC 上不触发 touch，但若存在 pointer 或 click 的复用/拦截，可能影响子按钮。  
   可尝试：在箭头/指示点/缩略图按钮上 `stopPropagation()`，或临时移除主图 touch 逻辑做对比。

3. **事件顺序与默认行为**  
   尝试在 `onPointerDown` 中 `preventDefault()` 并执行切换，同时保留 `onKeyDown` 给键盘；注意不要与 `onClick` 重复导致双次切换。

4. **焦点/无障碍与浏览器差异**  
   在 Chrome / Edge / Firefox 分别测试；检查是否有 `tabIndex`、`focus`、或焦点在其它元素导致第一次点击被「消耗」。

5. **Next.js / React 事件或 hydration**  
   若仅在生产构建或部署后出现，可排查服务端渲染与客户端 hydrate 是否导致首次点击被吞掉；可尝试在按钮上用 `onPointerDown` 并 `e.preventDefault()` 看是否有差异。

## 当前代码要点（ProductImageGallery.tsx）

- 左右箭头：`onMouseDown` + `onKeyDown`（Enter/Space），无 `onClick`
- 指示点：同上
- 缩略图按钮：同上；内部 `<img>` 已加 `pointer-events-none`
- 主图区域：仅 touch 三个 handler，无 click/pointer 处理

## 部署

- 构建：`npm run build`
- 部署：`npx wrangler pages deploy out --project-name=rodshub`
- 托管：Cloudflare Pages

---

请由其他模型或开发者基于上述现象与尝试继续排查，重点验证「桌面端箭头常显」与「主图 touch 是否影响 PC 点击」两条线。
