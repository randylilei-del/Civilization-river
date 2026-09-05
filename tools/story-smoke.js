#!/usr/bin/env node
/* 文明长河 — 六个故事页(tang/qin/han/song/ming/qing.html)的 headless 烟测(2026-09-05 体检立)
 *
 *   node tools/story-smoke.js                 六页各:零 pageerror、零 console.error、零站外请求、点「开始」真进第一幕
 *   STORY_DIR=<目录> node tools/story-smoke.js  给断言注入反例用(目录里放改坏的同名页)
 *
 * 为什么存在:六页是唐朝实验的材料,长期「不在 check/audit/smoke 覆盖范围内」,v334.2 那次
 * 「localStorage 抛异常 → 整页脚本挂掉 → 点开始没反应」就是 Ray 在飞书里实测才发现的。
 * 这四条断言恰好覆盖那次的症状:脚本挂了 = pageerror;按钮没绑上 = 点完正文长度不变、按钮文字不变。
 * 退出码:0 全过 / 1 有断言红 / 2 自身没跑起来(缺 playwright-core 或 Chrome)。check.js 在 smoke 之后调它(--quick 跳过)。
 *
 * 反例验证(纪律:加断言先注入反例看它红):2026-09-05 把 tang.html 顶层脚本改成 `throw new Error('x')` 放进临时目录,
 * STORY_DIR 指过去 → 报「pageerror 1」+「点开始后正文没变」,退出码 1;原页恢复后六页全绿。
 */
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const DIR = process.env.STORY_DIR ? path.resolve(process.env.STORY_DIR) : ROOT;
const PAGES = ['tang', 'qin', 'han', 'song', 'ming', 'qing'];
const CHROME = process.env.SMOKE_CHROME ||
  ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
   '/Applications/Chromium.app/Contents/MacOS/Chromium',
   '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'].find(fs.existsSync);
if (!CHROME) { console.error('story-smoke: 找不到本机 Chrome,设 SMOKE_CHROME 指到可执行文件'); process.exit(2); }
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch (e) { console.error('story-smoke: 缺 playwright-core,先在仓库根目录 npm install'); process.exit(2); }

(async () => {
  const t0 = Date.now();
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  const fails = [];
  for (const name of PAGES) {
    const file = path.join(DIR, name + '.html');
    if (!fs.existsSync(file)) { fails.push(`[${name}] 文件不存在 ${file}`); continue; }
    const errs = [], cons = [], ext = [];
    const page = await browser.newPage({ viewport: { width: 820, height: 1180 } });   // iPad 竖屏
    page.on('pageerror', e => errs.push(String(e.message).slice(0, 120)));
    page.on('console', m => { if (m.type() === 'error') cons.push(m.text().slice(0, 120)); });
    page.on('request', r => { if (!r.url().startsWith('file://')) ext.push(r.url()); });
    await page.goto('file://' + file);
    await page.waitForTimeout(300);
    const before = await page.evaluate(() => ({ len: document.body.innerText.length, btn: (document.getElementById('next') || {}).textContent || '' }));
    let clickErr = '';
    await page.click('#next', { timeout: 3000 }).catch(e => { clickErr = e.message.split('\n')[0].slice(0, 80); });
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => ({ len: document.body.innerText.length, btn: (document.getElementById('next') || {}).textContent || '' }));
    if (errs.length) fails.push(`[${name}] pageerror ${errs.length}:${errs[0]}`);
    if (cons.length) fails.push(`[${name}] console.error ${cons.length}:${cons[0]}`);
    if (ext.length) fails.push(`[${name}] 站外请求 ${ext.length}:${ext[0]}`);
    if (clickErr) fails.push(`[${name}] 点不到「开始」按钮:${clickErr}`);
    else if (after.len <= before.len || after.btn === before.btn) fails.push(`[${name}] 点「开始」后正文没变(${before.len}→${after.len},按钮「${before.btn}」→「${after.btn}」)——v334.2 症状`);
    await page.close();
  }
  await browser.close();
  for (const f of fails) console.log('  ✗ ' + f);
  console.log(`story-smoke: ${PAGES.length} 页,${fails.length ? fails.length + ' 条失败' : '全通过'},${Date.now() - t0} ms`);
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('story-smoke: 自身出错', e.message); process.exit(2); });
