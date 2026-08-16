# 值不值 · scout

飞书识别助手:Ray 拍照(书封面/电影海报/餐厅门店)或发文字、语音给飞书机器人「查一查」,本服务调用**本机 Claude Code 无头模式**(`claude -p`,走订阅额度,无 API 费用)读图识别、联网搜评分,按 `rules.md` 判断值不值,回飞书卡片。

## 架构

```
飞书消息 → 长连接(lark-oapi ws,无需公网 IP)→ scout.py
  → 秒回「查询中」状态卡(reply)
  → 图片落盘 tmp/ → 子进程 claude -p(Read 读图 + WebSearch/WebFetch 搜评分,rules.md 拼进 prompt)
  → 原地更新状态卡为结果(im.v1.message.patch;失败自动退回发新消息)
```

单文件服务(`scout.py`,~250 行),无数据库、无爬虫、无对外端口。

## 文件

- `scout.py` — 全部逻辑:飞书收发、防重复、调 claude、卡片回复/更新
- `rules.md` — Ray 的判断规则(书/电影/餐厅阈值),**每次查询实时读取,改完即生效,不用重启**
- `.env` — 飞书 App ID/Secret + `CLAUDE_BIN`(claude 完整路径),不入 git
- `com.ray.scout.plist` — launchd 常驻模板

## 开发工作流

1. 改 `scout.py` 后语法检查:`python3 -m py_compile scout.py`
2. 重启服务(二选一):
   - launchd 常驻:`launchctl unload ~/Library/LaunchAgents/com.ray.scout.plist && launchctl load ~/Library/LaunchAgents/com.ray.scout.plist`
   - 终端手动:Ctrl+C 后 `source venv/bin/activate && python3 scout.py`
3. 实测:飞书给「查一查」发一张书封面照,盯 `tail -f /tmp/scout.log`(launchd)或终端输出;预期秒回状态卡,1–3 分钟后原地变结果
4. 改完 commit + push 到 `randylilei-del/scout`(main 分支)

## 已踩过的坑(别再踩)

- **`claude` 子进程必须剔除 `ANTHROPIC_*` 环境变量**(`ask_claude` 里已做):否则 Claude Code 弃用订阅登录改走 API key,报 AuthenticationError
- **launchd 的 PATH 里没有 claude**:靠 `.env` 的 `CLAUDE_BIN` 完整路径解决,别删
- **`--allowedTools "Read,WebSearch,WebFetch"`** 的 flag 写法随 Claude Code 版本可能变化;权限类报错先怀疑这里
- **飞书侧任何权限/事件/能力变更都要「创建新版本并发布」才生效**;接收消息依赖「获取用户在机器人中发送的单聊消息」细分权限
- 图片要落在项目目录内(`tmp/`)claude 的 Read 才读得到;用完即删
- 只响应单聊(`chat_type == "p2p"`),群聊消息有意忽略
- 飞书对未 ack 事件会重推:`already_handled` 按 message_id 去重,处理放子线程让回调秒返回

## V2 候选(按 Ray 实际使用痛点排优先级,先别做)

- 餐厅换高德 POI 开放 API(正规、免费额度)+ 定位算距离
- 微信读书定向查询(现在靠搜索,偶有漏判)
- 查询历史自动记入飞书多维表格 → 沉淀「看过/想看/避雷」个人品味库,并反哺 rules
- 儿童模式 / 给孩子选书的独立规则段
