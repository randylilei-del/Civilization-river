# 文明长河 · civilization-river

从史前到现代的世界文明兴衰交互可视化。**单文件 PWA**:全部代码、数据、海岸线都在 `index.html` 里,无构建、无后端、无外部依赖(维基链接除外)。仓库根的 `package.json` 只承载开发期校验工具(`playwright-core`),与产品无关。

- **产品形态**:静态站(Vercel 自动部署)+ iPad 添加主屏幕(儿童用户:Ray 的儿子,7 岁)
- **双语**:中/EN 全量双语,所有新增内容必须同时写两种语言
- **数据态度**:影响力/版图是"主观示意",价值在相对形状;所有数值欢迎校对修正

## 文件结构

```
index.html            # 交付产物 + 代码手写源:样式、渲染器、config 常量(数据表已全部迁出)
data/                 # 全部 30 张内容表的正本(.js 文本片段,性质分类见 docs/DATA.md)
tools/build.js        # 把 data/*.js 注入回 index.html 的标记区间;改 data 后必跑
tools/check.js        # 改完一条命令:build 一致性 → audit → 语法 → smoke;--quick 跳过 smoke
tools/smoke.js        # headless 渲染层烟测(playwright-core + 本机 Chrome),断言清单见「修改工作流」第 3 步
tools/depth.js        # 内容厚度体检:172 带/127 城同组相对排名,列「最薄 N」清单(不是红灯);`depth.js 唐` 看单条体检表
tools/gap.js          # 城市时间断层诊断:拿补带选题名单 / 补完复核清没清零(node tools/gap.js 150 [城市名])
tools/newband.js      # 新色带内容**插入前**预检(markdown / 钩子重复 / 缺中文 d / f 项数 / PLACE / PEAK)
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
2. **改完一条命令:`node tools/check.js`**(= build 一致性 → audit → 语法 → headless 烟测,任一红退出码 1;`--quick` 跳过烟测≈3 秒)。首次先在仓库根 `npm install`(只装 `playwright-core`,用本机 Chrome,不下载浏览器;产品 index.html 零依赖不受影响)。三步的判据分别在 `tools/build.js` / `tools/audit.js`(71 条结构规则,其中规则 71 走 warn 通道不计退出码)/ `tools/smoke.js`
3. `tools/smoke.js` 管**渲染层**——以前只能实机点的那些:四态(中英×深浅)零 pageerror 零站外请求、引导层点完真消失(量真实盒子)、322 卡零脏值 + 中英 class 直方图一致(拦「英文卡少一行」)、127 城×中英每行有正文、色带真实填充色非黑、标签中心在色带内且不出视口、选轨迹后站点进视口、列表同列字号一致、iPad 竖屏/手机关键入口可见。**加新断言必须先注入反例看它红**(`SMOKE_INDEX=<反例html> node tools/smoke.js`),验证记录写在断言旁注释里;清不完的旧问题用 warn 不用 fail(标签重叠 **5 处**是当前基线,2026-08-17 起——v247 新增「勃兰登堡·普鲁士 × 俄罗斯·苏联」一处;基线漂移要显式改这里,不能默认)
4. 仍需人眼的:iPad 实机手感、史实、中英同义、儿童文风、图片内容——走 adversarial-verifier + Ray 实机。需要在 claude-in-chrome 里看图时:`python3 -m http.server 8777 --bind 127.0.0.1 --directory "<项目路径>"`(后台任务方式起),深色用 `document.documentElement.setAttribute('data-theme','dark')`
5. commit + push → Vercel 自动部署
6. 记录:每版写进 `docs/CHANGELOG.md`(判断依据也写在那里),设计决策进 `docs/DESIGN.md`。(2026-08-15 起不再指向 Plans 库——`06 Plans/learning/world-history-viz.md` 从未建立,原指针失效)

## 铁律

- **颜色**:8 个文明圈各一色(见 DESIGN.md);新配色必须过色盲校验;文本永远用 ink 色 + surface 描边晕圈
- **泳道顺序**:按经度自东向西,新泳道按经度插位,不要随手排
- **双语**:改中文必改英文——v119–v123 起**英文与中文同条目成对**(EVENTS/CHRONO 的 [zh,en]、CIVS 的 e 块、config 的 en 字段),没有独立的英文字典,也没有「按索引对齐」这回事了;audit 查双语完整性
- **维基链接**:统一搜索跳转(zh/en 随语言);歧义名进 WIKI_NAME(中文)/ CIVS 条目的 e.w(英文)消歧
- **不引入外部资源**:Artifact CSP 与离线场景都不允许;新数据一律内嵌。仅有的两个例外都是「**点了才发请求**」:城市/文明视频(iframe/外链)与城市/文明照片(v202/v204,Wikimedia Commons `<img>`,`data/city_photo.js` / `data/civ_photo.js`)——不点则页面对外零请求

## Roadmap

> **⚠ 主体工程收尾时必读 `docs/IDEAS.md`。** 那里存着 Ray 认定重要、但当时有意押后的产品方向
> (目前 001「从浏览一条长河到回答孩子的问题」——搜索/别名/故事级颗粒三层缺口,分析与实测数据已备)。
> **别让它烂在文件里**:主体待办清空、或唐朝实验出结论时,主动把它拿出来讨论。

- [ ] 首次发布:Ray 建 GitHub 公开仓库 → 推送 → Vercel 导入 → iPad 主屏(两步待办在 Ray 手里)
- [ ] 数据校对:逐泳道核对年代/曲线/版图/大事记/传播节点(Ray 主导,中国史优先)
- [ ] 非中国文明的"鼎盛区间"补齐(机制已就绪,gl 字段)
- [ ] 可选:儿童模式(更大字号/更简语言)、单文明聚焦视图、数据外接(Wikidata/Seshat)
