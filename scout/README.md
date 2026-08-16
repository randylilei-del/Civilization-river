# 值不值 · scout

飞书识别助手:拍一张书封面 / 电影海报 / 餐厅门店照发给飞书机器人(文字、语音也行),它联网搜评分,按 `rules.md` 里你定的规则告诉你值不值。

跑在常开机的 Mac mini 上。飞书用**长连接模式**——机器主动连飞书,不需要公网 IP、不需要端口映射。

## 架构(总共就这些)

```
飞书 App(手机拍照发消息)
   ↓ WebSocket 长连接(scout.py 挂着)
scout.py:下载图片/语音 → Claude API(视觉识别 + 内置联网搜索)→ 按 rules.md 出结论
   ↓
回一张飞书卡片(结论 / 评分 / 电子版·排片 / 链接)
```

没有数据库、没有爬虫、没有对外端口。规则全在 `rules.md`,随时改,即时生效。

## 搭建步骤(约 20 分钟)

### 1. 创建飞书应用

1. 打开 [飞书开放平台](https://open.feishu.cn/app) → 创建**企业自建应用**(名字随意,如「值不值」)
2. **权限管理** → 开通:
   - `im:message`(读取消息)
   - `im:message:send_as_bot`(发消息)
   - `im:resource`(下载图片/语音文件)
   - `speech_to_text:speech`(可选,语音消息用;开不了就先只用文字+拍照)
3. **事件与回调** → 订阅方式选「**使用长连接接收事件**」→ 添加事件 `接收消息 im.message.receive_v1`
4. **应用发布** → 创建版本 → 可用范围选自己 → 发布(自建应用自己就能审核通过)
5. 记下 **App ID** 和 **App Secret**(凭证与基础信息页)

### 2. Mac mini 上部署

```bash
git clone <本仓库> && cd Civilization-river/scout   # 或只拷贝 scout/ 目录
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env    # 填入飞书 App ID/Secret 和 Anthropic API Key
python3 scout.py        # 看到「长连接启动」后,在飞书里找到机器人发张照片试试
```

### 3. 设成常驻服务(launchd)

```bash
# 先把 com.ray.scout.plist 里的三处 /PATH/TO 改成实际路径,然后:
cp com.ray.scout.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.ray.scout.plist
# 日志:tail -f /tmp/scout.log   停止:launchctl unload ~/Library/LaunchAgents/com.ray.scout.plist
```

开机自启、崩溃自动拉起。之后改了 `rules.md` 不用动服务;改了 `scout.py` 要 `unload` 再 `load`。

## 成本

每次查询 ≈ 一次模型调用 + 若干次内置搜索,约 ¥0.1–0.5(取决于模型,默认 claude-sonnet-5,可在 .env 用 `SCOUT_MODEL` 换)。自用量级每月几块钱。

## 已知边界(V1 有意不做的)

- **不接大众点评/猫眼**:反爬太强,不值得。餐厅评分靠搜索结果聚合;以后高频再接高德 POI 开放 API(正规、免费额度够用)
- **不精确到排片场次**:只判断「是否在映」
- **查不到就是查不到**:规则里明确要求宁缺毋假
- V2 候选:高德 POI + 定位算距离、微信读书定向查询、查询历史自动记入飞书多维表格(沉淀成个人品味库)
