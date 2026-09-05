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
tools/depth.js        # 内容厚度体检:全部带/城同组相对排名,列「最薄 N」清单(不是红灯);`depth.js 唐` 看单条体检表。**表头的带数城数由数据实算,不要往这里写死数**(2026-09-05 修:曾硬编码「172 带/127 城」,数据涨到 191/132 之后表头一直在说谎)
tools/context.js      # **写新内容前必跑**:`context.js <带名|城市名>` 一条命令摊开同卡/同城/同城别带的全部既有字段 + SETTLED 裁决 + depth 体检
tools/lint-content.js # 新写内容的可疑句清单(最高级/现在时/大数字/因果词),只扫 HEAD..工作区 diff(工作区干净时自动退到 HEAD~1);check.js 会顺带打印,不计入退出码。**批量写完 commit 后,用该批第一个 commit 的 sha 再跑一次 `node tools/lint-content.js <sha>~1` 并逐条销账**——它是 warn 通道,不销账就等于没跑(核查员两次抓到「清单当时就报了、没人回头看」)
tools/gap.js          # 城市时间断层诊断:拿补带选题名单 / 补完复核清没清零(node tools/gap.js 150 [城市名])
tools/vocab-check.js  # 词汇覆盖体检:tools/vocab-probes.tsv(词→期望带)全量过真实搜索,零命中/跑偏=退出码1;加新带后跑;页面里搜「??」看真实搜索日志,零命中词就是下一批词表
tools/newband.js      # 新色带内容**插入前**预检(markdown / 钩子重复 / 缺中文 d / f 项数 / PLACE / PEAK)
tools/load.js         # audit/coverage/peakgap/refs 共用的数据加载器(含 GL_X 合并镜像)
tang.html / qin.html  # **六个故事页(唐/秦/汉/宋/明/清)**:「六个问题看懂 X 朝」,唐朝实验的材料,各自独立单文件、
han.html / song.html  #   中文单语、无主站入口(实验期有意不导流)。**不在 check/audit/smoke/lint 的覆盖范围内**,
ming.html / qing.html #   也不在 sw.js 缓存清单、自身不注册 sw(离线打不开——v133 记的已知缺口)。
                      #   实验判据见 docs/TANG-EXPERIMENT.md;改它们不要指望工具兜底
manifest.webmanifest  # PWA 清单
sw.js                 # 离线缓存(network-first);改缓存策略记得升 CACHE 版本号
icons/                # SVG 图标 + apple-touch-icon.png(iOS 主屏用)
docs/ARCH.md          # 数据迁出架构:决策理由、分阶段路线、成功标准(动数据住处前必读)
docs/IDEAS.md         # 产品想法库:想清楚了但现在不做的东西,**带触发条件,到点要主动拿出来讨论**
docs/DESIGN.md        # 设计决策与理由(改视觉/交互前必读)
docs/DATA.md          # 数据模型与增改内容指南(加文明/事件/轨迹前必读)。**动城市馆藏(`mu`)前先看「馆藏三条纪律」**:
                      #   asof 复核时点必填(规则 84)/ 只写原件所在 / 闭馆整修写进 mu 文本
docs/CHANGELOG.md     # 版本史
```

## 修改工作流

1. **写新内容前先 `node tools/context.js <带名|城市名>`**(把站内已有的摊在眼前——核查必修里一半是「站内早写对了、新文案写错或重讲」)。**改数据(30 张内容表全在 `data/`):改 `data/<表名>.js` → `node tools/build.js`**(直接改 index.html 的数据区间会被 audit 规则 45 拦下)。改代码/样式/config 常量:直接改 `index.html`
2. **改完一条命令:`node tools/check.js`**(= build 一致性 → audit → 语法 → headless 烟测,任一红退出码 1;`--quick` 跳过烟测≈3 秒)。首次先在仓库根 `npm install`(只装 `playwright-core`,用本机 Chrome,不下载浏览器;产品 index.html 零依赖不受影响)。三步的判据分别在 `tools/build.js` / `tools/audit.js`(84 条结构规则,含 78c/79b/79c/84;其中若干条走 warn 通道不计退出码——卡片复述母条目、小段与本带正文重合、版图新增命中。**规则 80/81/82 的基线在 `tools/.crossband-baseline.json`(三个键 titles/books/areas),入库而非 gitignore,每条带 why,新增命中即红且不会自动写入**)/ `tools/smoke.js`
3. `tools/smoke.js` 管**渲染层**——以前只能实机点的那些:四态(中英×深浅)零 pageerror 零站外请求、引导层点完真消失(量真实盒子)、322 卡零脏值 + 中英 class 直方图一致(拦「英文卡少一行」)、127 城×中英每行有正文、色带真实填充色非黑、标签中心在色带内且不出视口、选轨迹后站点进视口、列表同列字号一致、iPad 竖屏/手机关键入口可见。**加新断言必须先注入反例看它红**(`SMOKE_INDEX=<反例html> node tools/smoke.js`),验证记录写在断言旁注释里;清不完的旧问题用 warn 不用 fail;标签重叠基线 **5 处冻结在 `smoke.js` 的 `OVERLAP_BASELINE`**(2026-08-18 起),**基线外的新增重叠直接 fail**——新带引入新重叠要么挪标签,要么有意识地加进那张表并在 CHANGELOG 说明
4. 仍需人眼的:iPad 实机手感、史实、中英同义、儿童文风、图片内容——走 adversarial-verifier + Ray 实机。需要在 claude-in-chrome 里看图时:`python3 -m http.server 8777 --bind 127.0.0.1 --directory "<项目路径>"`(后台任务方式起),深色用 `document.documentElement.setAttribute('data-theme','dark')`
5. commit + push → Vercel 自动部署
6. 记录:每版写进 `docs/CHANGELOG.md`(判断依据也写在那里),设计决策进 `docs/DESIGN.md`。(2026-08-15 起不再指向 Plans 库——`06 Plans/learning/world-history-viz.md` 从未建立,原指针失效)

## 铁律

- **可读优先于精确**(Ray 2026-09-01 定):**只要不是明显的事实错误,以便于阅读和理解为优先**。取名、措辞、分段都按这条办——「幕府时代」比「武家日本」好,哪怕严格说江户也是幕府;遇到这种不精确,**不要靠改回学术名词解决,靠在正文里补一句话说清楚**(江户那条带的开头就写明德川家开的也是幕府)。这条不覆盖史实红线:年代、因果、引文、数字仍以准确为准,该 hedge 的照样 hedge。
- **术语要当场解释**:跟 Ray 说话时不许直接用项目内部黑话(钩子/小段/鼎盛段/对冲/LCS 这类),第一次出现就用大白话说明它是什么。他 2026-09-01 明确提过一次。
- **颜色**:8 个文明圈各一色(见 DESIGN.md);新配色必须过色盲校验;文本永远用 ink 色 + surface 描边晕圈
- **泳道顺序**:按经度自东向西,新泳道按经度插位,不要随手排
- **双语**:改中文必改英文——v119–v123 起**英文与中文同条目成对**(EVENTS/CHRONO 的 [zh,en]、CIVS 的 e 块、config 的 en 字段),没有独立的英文字典,也没有「按索引对齐」这回事了;audit 查双语完整性
- **维基链接**:统一搜索跳转(zh/en 随语言);歧义名进 WIKI_NAME(中文)/ CIVS 条目的 e.w(英文)消歧
- **不引入外部资源**:Artifact CSP 与离线场景都不允许;新数据一律内嵌。仅有的两个例外都是「**点了才发请求**」:城市/文明视频(iframe/外链)与城市/文明照片(v202/v204,Wikimedia Commons `<img>`,`data/city_photo.js` / `data/civ_photo.js`)——不点则页面对外零请求

## Roadmap

> **⚠ 主体工程收尾时必读 `docs/IDEAS.md`。** 那里存着 Ray 认定重要、但当时有意押后的产品方向
> (目前 001「从浏览一条长河到回答孩子的问题」——搜索/别名/故事级颗粒三层缺口,分析与实测数据已备)。
> **别让它烂在文件里**:主体待办清空、或唐朝实验出结论时,主动把它拿出来讨论。

- [x] 首次发布:GitHub 仓库已建并推送、Vercel 已部署(`civilization-river.vercel.app`)
- [ ] **国内访问链路仍是断的**(2026-08-14 起卡到现在):Vercel 站国内要挂 VPN;EdgeOne 已部署但平台默认域名未备案,
      国内节点 401。解法=买域名+备案(在 Ray 手里,见 `docs/DEPLOY-CN.md`)。**在这之前给 Jasper 的唯一路径是微信发文件**
      ——index.html 自包含验证过(v148),但那时它 2.36MB,现在 4.24MB,重测一次再当结论用
- [ ] 数据校对:逐泳道核对年代/曲线/版图/大事记/传播节点(Ray 主导,中国史优先)
- [ ] 非中国文明的"鼎盛区间"补齐(机制已就绪,gl 字段)
- [ ] 可选:儿童模式(更大字号/更简语言)、单文明聚焦视图、数据外接(Wikidata/Seshat)
