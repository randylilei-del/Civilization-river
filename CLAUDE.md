# 文明长河 · civilization-river

从史前到现代的世界文明兴衰交互可视化。**单文件 PWA**:全部代码、数据、海岸线都在 `index.html` 里,无构建、无后端、无外部依赖(维基链接除外)。

- **产品形态**:静态站(Vercel 自动部署)+ iPad 添加主屏幕(儿童用户:Ray 的儿子,7 岁)
- **双语**:中/EN 全量双语,所有新增内容必须同时写两种语言
- **数据态度**:影响力/版图是"主观示意",价值在相对形状;所有数值欢迎校对修正

## 文件结构

```
index.html            # 全部:样式 + 数据 + 渲染器(唯一的源文件)
manifest.webmanifest  # PWA 清单
sw.js                 # 离线缓存(network-first);改缓存策略记得升 CACHE 版本号
icons/                # SVG 图标 + apple-touch-icon.png(iOS 主屏用)
docs/DESIGN.md        # 设计决策与理由(改视觉/交互前必读)
docs/DATA.md          # 数据模型与增改内容指南(加文明/事件/轨迹前必读)
docs/CHANGELOG.md     # 版本史
```

## 修改工作流

1. 只改 `index.html`
2. 语法检查:`sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/c.js && node --check /tmp/c.js`
3. 渲染验证:Playwright 打开 file:// 截图,确认无 pageerror、无布局破坏(深浅色都看)
4. commit + push → Vercel 自动部署
5. 同步:Ray 的 Plans 库 `learning/world-history-viz.md` 记录方案级变更

## 铁律

- **颜色**:8 个文明圈各一色(见 DESIGN.md);新配色必须过色盲校验;文本永远用 ink 色 + surface 描边晕圈
- **泳道顺序**:按经度自东向西,新泳道按经度插位,不要随手排
- **双语**:改中文必改英文(EN 字典),条目按索引对齐,数量必须一致
- **维基链接**:统一搜索跳转(zh/en 随语言);歧义名进 WIKI_NAME / EN.civ.w 消歧
- **不引入外部资源**:Artifact CSP 与离线场景都不允许;新数据一律内嵌

## Roadmap

- [ ] 首次发布:Ray 建 GitHub 公开仓库 → 推送 → Vercel 导入 → iPad 主屏(两步待办在 Ray 手里)
- [ ] 数据校对:逐泳道核对年代/曲线/版图/大事记/传播节点(Ray 主导,中国史优先)
- [ ] 非中国文明的"鼎盛区间"补齐(机制已就绪,gl 字段)
- [ ] 可选:儿童模式(更大字号/更简语言)、单文明聚焦视图、数据外接(Wikidata/Seshat)
