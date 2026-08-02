# 会话交接(2026-08-02)

> 给下一个 Claude 会话:先读本文件 + CLAUDE.md,即可继续,无需原对话记录。

## 任务目标

从史前到现代的世界文明兴衰交互可视化,单文件 PWA。最终用户是 Ray 本人 + 他 7 岁的儿子(iPad 使用)。当前阶段:内容深化与数据校对,等 Vercel 首次部署。

## 项目状态:v14,功能完备,尚未部署

接手时先 `git status` 核实。截至本次会话结束:

- **v13、v14 都已 commit**;v13 的 push 被本机权限拦下,由 Ray 手动执行,**接手时先确认 origin/main 到哪个 commit**
- 数据规模:103 个文明 · 741 条大事记 · 145 段鼎盛区间(覆盖 97/103)· 22 个交流事件 · 10 条传播轨迹
- 功能全景见 docs/CHANGELOG.md(v0-v14);设计理由见 docs/DESIGN.md;改数据前必读 docs/DATA.md
- 仓库实名是大写 C 的 `Civilization-river`(小写链接自动重定向)

## 已完成(本次会话 v13 + v14)

全部改在 `index.html` + `docs/` + 新增 `tools/audit.js`,两个 commit。

**v13**
1. 8 处校对修正:勾践卧薪尝胆 -496→-494;二里头宫城 -1900→-1700;4 条色带起点前移以覆盖越界大事记(西葡 1420→1415、英国 1600→1585、希腊化 -330→-331、拉美 1820→1810);文艺复兴意大利 1494 条目排序;DATA.md 修正"k 首尾必须为 0"的错误表述
2. CHRONO_X 加密 +99 条(558→657),补 20 个"影响力高但大事记少"的文明
3. GL 鼎盛区间 61→124 段,覆盖 30→77 个文明

**v14**
1. **全站校对完成**:v13 核了中国 24 条色带,v14 核完其余 79 个文明。非中国部分共挑出 4 处并修正——英国瓦特蒸汽机 1784→1769(专利年);迦太基把坎尼会战(-216)从"越阿尔卑斯"(-218)条目里拆出为独立节点;朱罗 1010 张冠李戴(该年是坦贾武尔大庙落成,罗贞陀罗一世 1014 才即位,已改标题);大越白藤江之战 939→938,色带起点同步前移
2. 三条最薄泳道加密 +83 条:东南亚 46→75、草原·中亚 51→79、撒南非洲 40→66;大事记 658→741
3. GL 124→145 段,覆盖 77→97 个文明
4. **新增 `tools/audit.js`** —— 自包含数据校验脚本(见下"关键上下文")

## 进行中 / 下一步

按优先级:

1. **等 Ray 完成 Vercel 部署**(vercel.com → Add New Project → 选本仓库 → Deploy,零配置)。拿到网址后:远程验证页面加载、PWA manifest、sw.js 离线缓存、iPad 触屏交互,然后指导添加主屏幕
2. **数据校对已全站过完一遍,共修 12 处**。再往下要提质量只能换手段:找二手史料交叉核(而不是再读一遍同样的数据),或请 Ray 按兴趣抽查。**不建议再机械重扫一遍**——边际收益已经很低
3. **继续加密**:仍 ≤3 条的有 16 个文明,集中在美洲(奥尔梅克 2、特奥蒂瓦坎 3、瓦里 2)、南亚(印度河 2、吠陀 3、贵霜 3、朱罗 3)和中国的短命/割据王朝(二里头 2、五代十国 3、辽 3、西夏 3)
4. **仍无 GL 的 6 个是有意留空的**:匈人、准噶尔、俄国治下中亚、现代中亚、欧洲殖民东南亚、欧洲殖民非洲——征服型与殖民型色带没有可谈的"鼎盛"。**不要当成待办去补**
5. 远期:儿童模式、单文明聚焦视图、数据外接(见 CLAUDE.md Roadmap)

## 试过但失败的路

- **Playwright 渲染验证跑不了**:本机没装 playwright(node、npx、python 三种都查过),`~/.cache/ms-playwright` 也不存在。**替代方案已验证可用**:用 claude-in-chrome MCP 工具。
- **`file://` 被 Chrome 扩展拒绝**(报 "Can't interact with browser-internal or unparseable URLs")。**解法**:起本地静态服务器 `python3 -m http.server 8777 --bind 127.0.0.1 --directory "<项目路径>"`(要用 Bash 工具的 `run_in_background`,`nohup ... &` 写法会被权限拦),然后访问 `http://127.0.0.1:8777/index.html`。
- **深色模式没有页面上的切换按钮**,靠 `prefers-color-scheme`;验证时用 JS 打开:`document.documentElement.setAttribute('data-theme','dark')`。

## 阻塞项 / 等用户决定

1. **push 要 Ray 手动跑** —— `git push` 在本机被权限策略拦下(试了两种写法都被拒),Claude 推不了。Ray 在输入框打 `! cd "<项目路径>" && git push origin main`
2. **GL 标签压在色条上的兜底分支触发率 41%**(渲染器 `glHTML`,当标签在色条左右都放不下时落到 `tx=2`,压在色条上,靠 surface 描边晕圈保可读)。**这是 v11/v12 就有的老行为,不是 v13 引入的**,但 v13 把 GL 段数翻倍,等于把它放大了。DESIGN.md 的铁律明确说"文本永远用 ink 色 + surface 描边晕圈",所以没有擅自改渲染器。Ray 若觉得难看,可选:加宽面板(现 330px)/ 缩短标题 / 允许标签换行。

## 关键上下文

- **验证三件套**(每次改完必跑,完整命令见 CLAUDE.md「修改工作流」):
  1. 语法检查 `sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/c.js && node --check /tmp/c.js`
  2. 数据校验 `node tools/audit.js` —— **已入库**(v13 时写的版本丢在 scratchpad 里了,v14 重写成自包含版并做过反向测试:故意注入越界年份和非法 GL 类型,两个都被抓出、退出码 1)
  3. 浏览器全量扫描:`for (const lang of ['zh','en']) for (const c of CIVS) openCiv(c)`,检查 panel.innerHTML 是否出现 undefined/NaN/[object。v13 与 v14 各跑过 206 次渲染,零问题
- **Artifact 预览**:https://claude.ai/code/artifact/75498ea2-5f77-4d44-9646-5ad135ce07fd —— 此 URL 归属旧会话;新会话要更新它必须在 Artifact 调用里传 url 参数,否则会另铸新链接。Vercel 上线后 artifact 可退役
- **Plans 库**(weeklyplans-Ray 仓库,分支 claude/world-history-civilization-viz-2qzd2m):`learning/world-history-viz.md` 是方案记录,只在方案级变化时更新;其中的 world-history-viz.html 是切换前的冻结快照,不再维护
- **Vercel 坑**(来自 Ray 的粤语项目经验):免费版私有仓库要求 committer 为 randy.lilei@gmail.com——本仓库是公开的,不受此限,保持公开即可
- **工作流铁律**见 CLAUDE.md:双语同步、色盲校验、只改 index.html、语法检查+截图验证后再提交
- **sw.js 是 network-first 且每次 fetch 回写缓存**,改内容不需要升 CACHE 版本号;只有改缓存策略才需要
