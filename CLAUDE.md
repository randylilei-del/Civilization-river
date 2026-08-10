# 文明长河 · civilization-river

从史前到现代的世界文明兴衰交互可视化。**单文件 PWA**:全部代码、数据、海岸线都在 `index.html` 里,无构建、无后端、无外部依赖(维基链接除外)。

- **产品形态**:静态站(Vercel 自动部署)+ iPad 添加主屏幕(儿童用户:Ray 的儿子,7 岁)
- **双语**:中/EN 全量双语,所有新增内容必须同时写两种语言
- **数据态度**:影响力/版图是"主观示意",价值在相对形状;所有数值欢迎校对修正

## 文件结构

```
index.html            # 交付产物 + 代码手写源:样式、渲染器、config 常量(数据表已全部迁出)
data/                 # 全部 23 张内容表的正本(.js 文本片段,性质分类见 docs/DATA.md)
tools/build.js        # 把 data/*.js 注入回 index.html 的标记区间;改 data 后必跑
tools/load.js         # audit/coverage/peakgap/refs 共用的数据加载器(含 GL_X 合并镜像)
manifest.webmanifest  # PWA 清单
sw.js                 # 离线缓存(network-first);改缓存策略记得升 CACHE 版本号
icons/                # SVG 图标 + apple-touch-icon.png(iOS 主屏用)
docs/ARCH.md          # 数据迁出架构:决策理由、分阶段路线、成功标准(动数据住处前必读)
docs/IDEAS.md         # 产品想法库:想清楚了但现在不做的东西,**带触发条件,到点要主动拿出来讨论**
docs/DESIGN.md        # 设计决策与理由(改视觉/交互前必读)
docs/DATA.md          # 数据模型与增改内容指南(加文明/事件/轨迹前必读)
docs/CHANGELOG.md     # 版本史
```

## 修改工作流

1. **改数据(23 张内容表全在 `data/`):改 `data/<表名>.js` → `node tools/build.js`**(直接改 index.html 的数据区间会被 audit 规则 45 拦下)。改代码/样式/config 常量:直接改 `index.html`
2. 语法检查:`sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/c.js && node --check /tmp/c.js`
3. 数据校验:`node tools/audit.js`(自包含,无依赖;查中英条目数对齐、大事记越界与排序、GL 区间合法性、孤儿键等;退出码非 0 即有问题)
4. 渲染验证:浏览器打开确认无 pageerror、无布局破坏(深浅色 × 中英都看)
   - 本机**没装 Playwright**,用 claude-in-chrome MCP 工具;`file://` 会被扩展拒绝,先起本地服务器:
     `python3 -m http.server 8777 --bind 127.0.0.1 --directory "<项目路径>"`(用后台任务方式起,`nohup ... &` 写法会被权限拦)
   - 深色模式没有页面按钮,靠 `prefers-color-scheme`;验证时用 JS 强开:`document.documentElement.setAttribute('data-theme','dark')`
   - 改了数据表就跑全量扫描,比抽查几张卡可靠得多:
     `for (const lang of ['zh','en']) { document.querySelector('[data-l='+lang+']').click(); for (const c of CIVS) openCiv(c) }`
     每次检查 `panel.innerHTML` 是否出现 undefined/NaN/[object
5. commit + push → Vercel 自动部署
6. 同步:Ray 的 Plans 库 `learning/world-history-viz.md` 记录方案级变更

## 铁律

- **颜色**:8 个文明圈各一色(见 DESIGN.md);新配色必须过色盲校验;文本永远用 ink 色 + surface 描边晕圈
- **泳道顺序**:按经度自东向西,新泳道按经度插位,不要随手排
- **双语**:改中文必改英文——v119–v123 起**英文与中文同条目成对**(EVENTS/CHRONO 的 [zh,en]、CIVS 的 e 块、config 的 en 字段),没有独立的英文字典,也没有「按索引对齐」这回事了;audit 查双语完整性
- **维基链接**:统一搜索跳转(zh/en 随语言);歧义名进 WIKI_NAME(中文)/ CIVS 条目的 e.w(英文)消歧
- **不引入外部资源**:Artifact CSP 与离线场景都不允许;新数据一律内嵌

## Roadmap

> **⚠ 主体工程收尾时必读 `docs/IDEAS.md`。** 那里存着 Ray 认定重要、但当时有意押后的产品方向
> (目前 001「从浏览一条长河到回答孩子的问题」——搜索/别名/故事级颗粒三层缺口,分析与实测数据已备)。
> **别让它烂在文件里**:主体待办清空、或唐朝实验出结论时,主动把它拿出来讨论。

- [ ] 首次发布:Ray 建 GitHub 公开仓库 → 推送 → Vercel 导入 → iPad 主屏(两步待办在 Ray 手里)
- [ ] 数据校对:逐泳道核对年代/曲线/版图/大事记/传播节点(Ray 主导,中国史优先)
- [ ] 非中国文明的"鼎盛区间"补齐(机制已就绪,gl 字段)
- [ ] 可选:儿童模式(更大字号/更简语言)、单文明聚焦视图、数据外接(Wikidata/Seshat)
