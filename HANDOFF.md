# 会话交接(2026-08-02)

> 给下一个 Claude 会话:先读本文件 + CLAUDE.md,即可继续,无需原对话记录。

## 项目状态:v1.1,功能完备,待首次部署验证

- 功能全景见 docs/CHANGELOG.md(v0-v11);设计理由见 docs/DESIGN.md;改数据前必读 docs/DATA.md
- 代码已推送 GitHub(main 分支,注意仓库实名是大写 C 的 `Civilization-river`,小写链接自动重定向)
- Ray 本地文件夹定为 **`cc projects/17-civilization-river`**(1-16 已被占用;早先误按 07 clone 的文件夹待删,见 Plans 待办)

## 待办(按优先级)

1. **等 Ray 完成 Vercel 部署**(vercel.com → Add New Project → 选本仓库 → Deploy,零配置)。拿到网址后:远程验证页面加载、PWA manifest、sw.js 离线缓存、iPad 触屏交互,然后指导添加主屏幕
2. **v12 数据校对**:Ray 主导挑错(中国史优先——他刚验收完 v10/v11 的中国拆分,可能带回反馈:曲线形状、大事记取舍、版图轮廓)
3. **非中国文明的鼎盛区间**(gl 字段)补齐:文艺复兴、阿拔斯译经运动、古希腊等
4. 远期:儿童模式、单文明聚焦视图、数据外接(见 CLAUDE.md Roadmap)

## 关键上下文(不在文档里的)

- **最终用户**:Ray 本人 + 他 7 岁的儿子(iPad 使用,已做触屏适配;内容尺度按教科书标准把关)
- **Artifact 预览**:https://claude.ai/code/artifact/75498ea2-5f77-4d44-9646-5ad135ce07fd —— 此 URL 归属旧会话;新会话要更新它必须在 Artifact 调用里传 url 参数,否则会另铸新链接。Vercel 上线后 artifact 可退役
- **Plans 库**(weeklyplans-Ray 仓库,分支 claude/world-history-civilization-viz-2qzd2m):`learning/world-history-viz.md` 是方案记录(含待办清单),只在方案级变化时更新;其中的 world-history-viz.html 是切换前的冻结快照,不再维护
- **Vercel 坑**(来自 Ray 的粤语项目经验):免费版私有仓库要求 committer 为 randy.lilei@gmail.com——本仓库是公开的,不受此限,保持公开即可
- **工作流铁律**见 CLAUDE.md:双语同步、色盲校验、只改 index.html、语法检查+截图验证后再提交
