# -*- coding: utf-8 -*-
"""
值不值 · scout —— 飞书识别助手
拍照/发文字给飞书机器人 → 识别书/电影/餐厅 → 联网搜评分 → 按 rules.md 判断值不值 → 回飞书卡片

运行:python3 scout.py(配置见 .env,搭建步骤见 README.md)
"""

import base64
import json
import os
import threading
import time

import requests as http
from dotenv import load_dotenv

import lark_oapi as lark
from lark_oapi.api.im.v1 import (
    GetMessageResourceRequest,
    P2ImMessageReceiveV1,
    ReplyMessageRequest,
    ReplyMessageRequestBody,
)

import anthropic

load_dotenv()
APP_ID = os.environ["FEISHU_APP_ID"]
APP_SECRET = os.environ["FEISHU_APP_SECRET"]
MODEL = os.environ.get("SCOUT_MODEL", "claude-sonnet-5")
RULES_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "rules.md")

claude = anthropic.Anthropic()  # 读 ANTHROPIC_API_KEY 环境变量
feishu = lark.Client.builder().app_id(APP_ID).app_secret(APP_SECRET).build()

# 飞书对未及时 ack 的事件会重推,已处理的 message_id 记下来防止重复回复
_seen: dict[str, float] = {}
_seen_lock = threading.Lock()


def already_handled(message_id: str) -> bool:
    with _seen_lock:
        now = time.time()
        for k in [k for k, t in _seen.items() if now - t > 3600]:
            del _seen[k]
        if message_id in _seen:
            return True
        _seen[message_id] = now
        return False


def system_prompt() -> str:
    with open(RULES_PATH, encoding="utf-8") as f:
        rules = f.read()
    return f"""你是 Ray 的私人「值不值」助手。Ray 发来一张照片(书封面/电影海报/餐厅门店或菜单)或一段文字,你的工作:

1. 识别对象是什么(书名+作者 / 电影名+年份 / 餐厅名+城市)。不确定时用搜索确认,别猜。
2. 联网搜索它的口碑:优先豆瓣评分与评价人数(书/电影),餐厅看地图与点评类来源;顺带看小红书等的讨论风向。
3. 书:查微信读书是否有电子版(免费/付费/无)。电影:若是近一两年的新片,查是否仍在上映。
4. 按下面的规则给出明确结论。

回复用飞书 markdown 卡片,格式紧凑,手机上一屏读完:
- 第一行:**结论**(✅ 值得 / ⚠️ 一般 / ❌ 跳过)+ 一句话理由
- 然后:评分(来源+人数)、电子版/排片情况、一两句真实口碑摘要
- 最后给出豆瓣搜索链接,书再加微信读书搜索链接
- 某项查不到就如实说「未查到」,不要编数字

=== Ray 的判断规则(以此为准) ===
{rules}"""


def ask_claude(user_content) -> str:
    resp = claude.messages.create(
        model=MODEL,
        max_tokens=2000,
        system=system_prompt(),
        tools=[{"type": "web_search_20250305", "name": "web_search", "max_uses": 8}],
        messages=[{"role": "user", "content": user_content}],
    )
    return "".join(b.text for b in resp.content if b.type == "text").strip()


def download_resource(message_id: str, file_key: str, res_type: str) -> bytes:
    req = (
        GetMessageResourceRequest.builder()
        .message_id(message_id)
        .file_key(file_key)
        .type(res_type)
        .build()
    )
    resp = feishu.im.v1.message_resource.get(req)
    if not resp.success():
        raise RuntimeError(f"下载消息资源失败: {resp.code} {resp.msg}")
    return resp.file.read()


def speech_to_text(audio: bytes) -> str:
    """飞书自带语音识别(需开通 speech_to_text 权限);语音消息为 opus 格式。"""
    token_resp = http.post(
        "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
        json={"app_id": APP_ID, "app_secret": APP_SECRET},
        timeout=10,
    ).json()
    r = http.post(
        "https://open.feishu.cn/open-apis/speech_to_text/v1/speech/file_recognize",
        headers={"Authorization": f"Bearer {token_resp['tenant_access_token']}"},
        json={
            "speech": {"speech": base64.b64encode(audio).decode()},
            "config": {"file_id": str(int(time.time())), "format": "opus", "engine_type": "16k_auto"},
        },
        timeout=30,
    ).json()
    if r.get("code") != 0:
        raise RuntimeError(f"语音识别失败: {r}")
    return r["data"]["recognition_text"]


def reply_card(message_id: str, markdown: str) -> None:
    card = json.dumps(
        {
            "config": {"wide_screen_mode": True},
            "elements": [{"tag": "markdown", "content": markdown}],
        },
        ensure_ascii=False,
    )
    req = (
        ReplyMessageRequest.builder()
        .message_id(message_id)
        .request_body(
            ReplyMessageRequestBody.builder().content(card).msg_type("interactive").build()
        )
        .build()
    )
    resp = feishu.im.v1.message.reply(req)
    if not resp.success():
        print(f"[scout] 回复失败: {resp.code} {resp.msg}")


def image_media_type(data: bytes) -> str:
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "image/png"
    if data[:3] == b"GIF":
        return "image/gif"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return "image/jpeg"


def handle(event: P2ImMessageReceiveV1) -> None:
    msg = event.event.message
    if already_handled(msg.message_id):
        return
    # 群里不抢话,只处理和机器人的单聊
    if msg.chat_type != "p2p":
        return

    try:
        content = json.loads(msg.content)
        if msg.message_type == "text":
            user_content = [{"type": "text", "text": content["text"]}]
        elif msg.message_type == "image":
            data = download_resource(msg.message_id, content["image_key"], "image")
            user_content = [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": image_media_type(data),
                        "data": base64.b64encode(data).decode(),
                    },
                },
                {"type": "text", "text": "这是我拍的照片,帮我看看值不值。"},
            ]
        elif msg.message_type == "audio":
            data = download_resource(msg.message_id, content["file_key"], "file")
            text = speech_to_text(data)
            user_content = [{"type": "text", "text": text}]
        else:
            reply_card(msg.message_id, "目前支持:文字、照片、语音。发一张封面/海报/门店照试试?")
            return

        print(f"[scout] 收到 {msg.message_type} 消息,查询中…")
        reply_card(msg.message_id, ask_claude(user_content))
    except Exception as e:  # 任何一步失败都告诉用户,别静默
        print(f"[scout] 处理出错: {e!r}")
        reply_card(msg.message_id, f"这次没查成 😵 ({type(e).__name__}),再发一次试试?")


def on_message(event: P2ImMessageReceiveV1) -> None:
    # 查询要联网搜索,耗时几十秒;开线程处理,让事件回调立刻返回,避免飞书重推
    threading.Thread(target=handle, args=(event,), daemon=True).start()


def main() -> None:
    handler = (
        lark.EventDispatcherHandler.builder("", "")
        .register_p2_im_message_receive_v1(on_message)
        .build()
    )
    ws = lark.ws.Client(APP_ID, APP_SECRET, event_handler=handler, log_level=lark.LogLevel.INFO)
    print("[scout] 长连接启动,等待消息…")
    ws.start()  # 阻塞运行,断线自动重连


if __name__ == "__main__":
    main()
