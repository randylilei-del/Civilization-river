# 会话交接(2026-08-02)

> 给下一个 Claude 会话:先读本文件 + CLAUDE.md,即可继续,无需原对话记录。

## 任务目标

从史前到现代的世界文明兴衰交互可视化,单文件 PWA。最终用户是 Ray 本人 + 他 7 岁的儿子(iPad 使用)。当前阶段:内容深化与数据校对,等 Vercel 首次部署。

## 项目状态:v13,功能完备,尚未部署

接手时先 `git status` 核实。截至本次会话结束:

- **v13 已完成并 commit,尚未 push**(见下"阻塞项")
- 数据规模:103 个文明 · 657 条大事记 · 124 段鼎盛区间(覆盖 77/103 个文明)· 22 个交流事件 · 10 条传播轨迹
- 功能全景见 docs/CHANGELOG.md(v0-v13);设计理由见 docs/DESIGN.md;改数据前必读 docs/DATA.md
- 仓库实名是大写 C 的 `Civilization-river`(小写链接自动重定向)

## 已完成(本次会话 v13)

全部改在 `index.html` + `docs/`,一个 commit。

1. **8 处校对修正**:勾践卧薪尝胆 -496→-494(前494 夫椒战败后才卧薪尝胆,-496 是檇李之战);二里头宫城 -1900→-1700(碳十四测年);4 条色带起点前移以覆盖越界大事记(西葡 1420→1415、英国 1600→1585、希腊化 -330→-331、拉美 1820→1810);文艺复兴意大利 1494 条目排序(中英两表同步换位);DATA.md 修正"k 首尾必须为 0"的错误表述
2. **CHRONO_X 加密 +99 条**(558→657):20 个"影响力高但大事记少"的文明
3. **GL 鼎盛区间 61→124 段**,覆盖 30→77 个文明

## 进行中 / 下一步

按优先级:

1. **等 Ray 完成 Vercel 部署**(vercel.com → Add New Project → 选本仓库 → Deploy,零配置)。拿到网址后:远程验证页面加载、PWA manifest、sw.js 离线缓存、iPad 触屏交互,然后指导添加主屏幕
2. **继续数据校对**:中国史已由 Claude 逐条核过一遍(24 条色带 ~150 节点,只挑出 2 处存疑,均已改)。**下一轮应转向非中国泳道**——欧洲、中东、南亚的年代与曲线尚未逐条核对
3. **继续加密**:仍薄的方向是撒南非洲(29 条)、东南亚(35 条)、草原·中亚(36 条)三个泳道;GL 还差 26 个文明未覆盖
4. 远期:儿童模式、单文明聚焦视图、数据外接(见 CLAUDE.md Roadmap)

## 试过但失败的路

- **Playwright 渲染验证跑不了**:本机没装 playwright(node、npx、python 三种都查过),`~/.cache/ms-playwright` 也不存在。**替代方案已验证可用**:用 claude-in-chrome MCP 工具。
- **`file://` 被 Chrome 扩展拒绝**(报 "Can't interact with browser-internal or unparseable URLs")。**解法**:起本地静态服务器 `python3 -m http.server 8777 --bind 127.0.0.1 --directory "<项目路径>"`(要用 Bash 工具的 `run_in_background`,`nohup ... &` 写法会被权限拦),然后访问 `http://127.0.0.1:8777/index.html`。
- **深色模式没有页面上的切换按钮**,靠 `prefers-color-scheme`;验证时用 JS 打开:`document.documentElement.setAttribute('data-theme','dark')`。

## 阻塞项 / 等用户决定

1. **v13 是否 push 到 GitHub** —— 已 commit 在本地 main,等 Ray 一句话
2. **GL 标签压在色条上的兜底分支触发率 41%**(渲染器 `glHTML`,当标签在色条左右都放不下时落到 `tx=2`,压在色条上,靠 surface 描边晕圈保可读)。**这是 v11/v12 就有的老行为,不是 v13 引入的**,但 v13 把 GL 段数翻倍,等于把它放大了。DESIGN.md 的铁律明确说"文本永远用 ink 色 + surface 描边晕圈",所以没有擅自改渲染器。Ray 若觉得难看,可选:加宽面板(现 330px)/ 缩短标题 / 允许标签换行。

## 关键上下文

- **验证三件套**(每次改完必跑):
  1. 语法检查 `sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/c.js && node --check /tmp/c.js`
  2. 结构校验:本次会话写了一个覆盖 k 关键帧单调性/大事记越界与排序/中英条目数对齐/CHRONO_X 双语完整性/GL 区间越界与合法性/孤儿键 的脚本,**产物在 scratchpad 未入库**——下次需要请重写(逻辑见上,约 40 行 node)
  3. 浏览器渲染:除截图外,可跑全量扫描 `for (const lang of ['zh','en']) for (const c of CIVS) openCiv(c)`,检查 panel.innerHTML 是否出现 undefined/NaN/[object。v13 跑过 206 次渲染,零问题
- **Artifact 预览**:https://claude.ai/code/artifact/75498ea2-5f77-4d44-9646-5ad135ce07fd —— 此 URL 归属旧会话;新会话要更新它必须在 Artifact 调用里传 url 参数,否则会另铸新链接。Vercel 上线后 artifact 可退役
- **Plans 库**(weeklyplans-Ray 仓库,分支 claude/world-history-civilization-viz-2qzd2m):`learning/world-history-viz.md` 是方案记录,只在方案级变化时更新;其中的 world-history-viz.html 是切换前的冻结快照,不再维护
- **Vercel 坑**(来自 Ray 的粤语项目经验):免费版私有仓库要求 committer 为 randy.lilei@gmail.com——本仓库是公开的,不受此限,保持公开即可
- **工作流铁律**见 CLAUDE.md:双语同步、色盲校验、只改 index.html、语法检查+截图验证后再提交
- **sw.js 是 network-first 且每次 fetch 回写缓存**,改内容不需要升 CACHE 版本号;只有改缓存策略才需要
