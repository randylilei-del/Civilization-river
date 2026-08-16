# 值不值 · scout

飞书识别助手:拍一张书封面 / 电影海报 / 餐厅门店照发给飞书机器人(文字、语音也行),它调用**本机的 Claude Code**(无头模式,走你的订阅额度)联网搜评分,按 `rules.md` 里你定的规则告诉你值不值。

跑在常开机的 Mac mini 上。飞书用**长连接模式**——机器主动连飞书,不需要公网 IP、不需要端口映射。**不需要 Anthropic API key,不产生 API 费用。**

## 架构(总共就这些)

```
飞书 App(手机拍照发消息)
   ↓ WebSocket 长连接(scout.py 挂着)
scout.py:图片存到 tmp/ → 起子进程 claude -p「读图 → WebSearch 搜评分 → 按 rules.md 判断」
   ↓        (本机已登录的 Claude Code,订阅额度)
回一张飞书卡片(结论 / 评分 / 电子版·排片 / 链接)
```

没有数据库、没有爬虫、没有对外端口、没有 API 账单。规则全在 `rules.md`,随时改,即时生效。

## 前提

1. Mac mini 已安装并登录 Claude Code(验证:终端跑 `claude -p "说 ok"` 能出结果)
2. 有飞书账号

## 搭建步骤(约 20 分钟)

### 1. 创建飞书应用

1. 打开 [飞书开放平台](https://open.feishu.cn/app) → 创建**企业自建应用**(名字随意,如「值不值」)
2. **添加应用能力** → 添加「**机器人**」(容易漏,没有它机器人不能聊天)
3. **权限管理** → 开通:
   - `im:message`(读取消息)
   - `im:message:send_as_bot`(发消息)
   - `im:resource`(下载图片/语音文件)
   - `speech_to_text:speech`(可选,语音消息用;开不了就先只用文字+拍照)
4. **事件与回调** → 订阅方式选「**使用长连接接收事件**」→ 添加事件 `接收消息 im.message.receive_v1`(页面提示还需开通什么权限就照单开通)
5. **应用发布** → 创建版本 → 可用范围选自己 → 发布(自建应用自己就能审核通过)
6. **凭证与基础信息** → 记下 App ID 和 App Secret

### 2. 本机部署

```bash
cd "本项目目录"
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env    # 填飞书 App ID/Secret;CLAUDE_BIN 填 `which claude` 的输出
python3 scout.py        # 看到「长连接启动」后,在飞书里给机器人发张书封面照试试
```

单次查询约 30–90 秒(要读图 + 联网搜索),回来一张卡片。

### 3. 设成常驻服务(launchd)

```bash
# 先把 com.ray.scout.plist 里的三处 /PATH/TO 改成实际路径,然后:
cp com.ray.scout.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.ray.scout.plist
# 日志:tail -f /tmp/scout.log   停止:launchctl unload ~/Library/LaunchAgents/com.ray.scout.plist
```

开机自启、崩溃自动拉起。**launchd 环境下 `.env` 里的 `CLAUDE_BIN` 必须是完整路径**(launchd 的 PATH 里没有 claude)。改了 `rules.md` 不用动服务;改了 `scout.py` 要 `unload` 再 `load`。

## 成本与额度

查询消耗的是你 Claude 订阅的用量额度(和你平时交互使用共享一个窗口),**没有单独的 API 费用**。自用一天几次的频率基本无感;如果哪天狂查几十次撞到额度上限,等窗口刷新即可。

## 排障

- **`claude: command not found` / 退出码非 0**:`.env` 里 `CLAUDE_BIN` 填 `which claude` 的完整路径
- **回复说没查到评分**:正常兜底行为(规则要求宁缺毋假),换个角度再问或补充文字信息
- **权限类报错**(stderr 提到 permission/tool):Claude Code 版本不同,工具授权 flag 可能有差异,把报错发给本地 Claude Code 让它当场修 `scout.py` 里 `ask_claude` 的命令行参数

## 已知边界(V1 有意不做的)

- **不接大众点评/猫眼**:反爬太强,不值得。餐厅评分靠搜索结果聚合;以后高频再接高德 POI 开放 API
- **不精确到排片场次**:只判断「是否在映」
- **查不到就是查不到**:规则里明确要求宁缺毋假
- V2 候选:高德 POI + 定位算距离、微信读书定向查询、查询历史自动记入飞书多维表格(沉淀成个人品味库)
