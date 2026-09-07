#!/usr/bin/env node
/* 文明长河 — 「死点」扫描(2026-09-06 立,先当测量工具,不进 check.js)
 *
 * 判据来自 IDEAS 005 / HANDOFF 验收标准:「7 岁孩子乱点十秒能自己悟出玩法」。孩子悟玩法靠的是
 * 「点了 → 页面有反应」这个回路;看起来能点(手型光标 / 按钮 / 小标)却点了什么都不发生的东西,
 * 每一个都在教他「这个东西是坏的」。这里把每个视图里所有看起来能点的东西真点一遍,列出没反应的。
 *
 * 做法:playwright-core + 本机 Chrome(与 smoke.js 同一套),iPad 横屏 1180×820。
 *   1. 每个视图先摆到已知状态(开唐卡 / 开人物卡 / 开地图……),首访引导用 localStorage 预先关掉;
 *   2. 枚举候选:可见、在视口内、中心点真能点到(elementFromPoint 打到它或它的后代),且
 *      手型光标 或 button/summary/[role=button]/a[href];按「标签+class」分组,每组抽 3 个(首/中/尾);
 *   3. 用真鼠标点(pointerdown/up/click 全走,不是 .click()),等 400ms,前后各取一次页面签名
 *      (body.innerHTML 哈希 + 各处滚动位置 + VIEW/GV/NAV/LANG);签名没变 = 死点;
 *   4. 点活了的才复位(先 reset+setup,签名对不上基线就整页重载),死点不用复位。
 *   每个视图先空等 400ms 取两次签名——两次不一样说明视图自己在动,那一视图的结论要打折。
 *
 * 不测的:select(原生下拉在无头里不改 DOM)、文本输入框、站外 a[href](会离开页面)。
 * 「已是当前态」的东西(class 带 on/active/sel、aria-pressed=true、disabled)点了没反应是合理的,
 * 单独归一类,不算死点。
 *
 * 用法:node tools/deadclick.js             全部视图
 *      node tools/deadclick.js --view 文明卡 只跑一个视图
 *      node tools/deadclick.js --all       每组不抽样,全点
 *      node tools/deadclick.js --json
 *      SMOKE_INDEX=... 同 smoke.js
 */
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const IDX = 'file://' + (process.env.SMOKE_INDEX ? path.resolve(process.env.SMOKE_INDEX) : path.join(ROOT, 'index.html'));
const CHROME = process.env.SMOKE_CHROME ||
  ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
   '/Applications/Chromium.app/Contents/MacOS/Chromium',
   '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'].find(fs.existsSync);
const argv = process.argv.slice(2);
const JSON_OUT = argv.includes('--json');
const ALL = argv.includes('--all');
const ONLY = argv.includes('--view') ? argv[argv.indexOf('--view') + 1] : null;
const K = ALL ? Infinity : 3;
const WAIT = 400;

let chromium;
try { ({ chromium } = require('playwright-core')); }
catch (e) { console.error('deadclick: 缺 playwright-core,先在仓库根目录 npm install'); process.exit(2); }
if (!CHROME) { console.error('deadclick: 找不到本机 Chrome,设 SMOKE_CHROME'); process.exit(2); }

/* 页面里跑的公共工具 */
const PAGE_FN = `
window.__h = s => { let x = 0; for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) | 0; return x; };
window.__box = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
  return { w: r.width, h: r.height, top: r.top, left: r.left, right: r.right, bottom: r.bottom,
           shown: r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.02 }; };
window.__sig = () => {
  const g = id => document.getElementById(id);
  const sc = el => el ? [el.scrollLeft | 0, el.scrollTop | 0] : null;
  return JSON.stringify({ b: __h(document.body.innerHTML), w: [scrollX | 0, scrollY | 0],
    p: sc(g('panel')), s: sc(g('scroller')), m: sc(g('gvMap')), t: sc(g('tableview')), gvm: sc(g('geoview')),
    lang: typeof LANG === 'string' ? LANG : null, view: typeof VIEW === 'object' ? JSON.stringify(VIEW) : null,
    gv: typeof GV === 'object' ? JSON.stringify(GV) : null, nav: typeof NAV === 'object' ? NAV.length : null });
};
window.__aff = () => {
  const vw = innerWidth, vh = innerHeight;
  const out = [];
  const isAff = el => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'select' || tag === 'textarea' || tag === 'option') return false;
    if (tag === 'input' && !['checkbox', 'radio', 'button', 'submit'].includes(el.type)) return false;
    if (tag === 'button' || tag === 'summary' || tag === 'label') return true;
    if (tag === 'a' && el.getAttribute('href')) return true;
    if (el.getAttribute('role') === 'button') return true;
    return getComputedStyle(el).cursor === 'pointer';
  };
  const desc = el => {
    const t = (el.getAttribute('aria-label') || el.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 22);
    const cls = typeof el.className === 'string' ? el.className : (el.className && el.className.baseVal) || '';
    return { tag: el.tagName.toLowerCase(), id: el.id || '', cls: cls.trim().split(/\\s+/).filter(Boolean).sort().join('.'), t };
  };
  const seen = new Set();
  for (const el of document.querySelectorAll('*')) {
    if (!isAff(el)) continue;
    const b = __box(el); if (!b.shown) continue;
    if (b.right <= 0 || b.left >= vw || b.bottom <= 0 || b.top >= vh) continue;
    const d = desc(el);
    if (d.tag === 'a') { const h = el.getAttribute('href'); if (/^(https?:|mailto:|tel:)/i.test(h) || el.target === '_blank') { out.push({ ...d, skip: '站外链接' }); continue; } }
    // 中心点及左右四分位,找一个真打到它的点(SVG 色带是凹的,中心可能落在别的带上)
    const cx = Math.max(1, Math.min(vw - 1, (b.left + b.right) / 2)), cy = Math.max(1, Math.min(vh - 1, (b.top + b.bottom) / 2));
    let pt = null;
    for (const [x, y] of [[cx, cy], [b.left + b.w * .25, cy], [b.left + b.w * .75, cy], [cx, b.top + b.h * .25], [cx, b.top + b.h * .75]]) {
      const hit = document.elementFromPoint(x, y);
      if (hit && (hit === el || el.contains(hit))) { pt = [Math.round(x), Math.round(y)]; break; }
    }
    if (!pt) { out.push({ ...d, skip: '点不到(被盖住)' }); continue; }
    const cls = (typeof el.className === 'string' ? el.className : (el.className && el.className.baseVal) || '');
    const active = /(^|\\s)(on|active|sel|cur|open)(\\s|$)/.test(cls) || el.getAttribute('aria-pressed') === 'true' || el.disabled === true || el.classList.contains('cur');
    const key = d.tag + (d.id && !/\\d/.test(d.id) ? '#' + d.id : '') + '.' + d.cls + '|' + (el.closest('#panel,#pcard,#geoview,#tableview,#trBar,#searchRes,header,#scroller') || {}).id;
    out.push({ ...d, x: pt[0], y: pt[1], active, key });
  }
  return out;
};
window.__reset = () => {
  try { if (typeof pbStop === 'function') pbStop(); } catch (e) {}
  try { navClear(); } catch (e) {}
  try { document.getElementById('panel').classList.remove('open'); } catch (e) {}
  try { document.getElementById('pcard').hidden = true; } catch (e) {}
  try { closeGeoView(); } catch (e) {}
  try { closeTableView(); } catch (e) {}
  try { hideEvPop(); hideBandPick(); } catch (e) {}
  try { const s = document.getElementById('searchRes'); s.hidden = true; s.innerHTML = ''; document.getElementById('searchIn').value = ''; } catch (e) {}
  try { const sel = document.getElementById('traceSel'); if (sel.value !== '' && sel.value !== '-1') { sel.value = sel.options[0].value; sel.dispatchEvent(new Event('change')); } } catch (e) {}
  try { if (LANG !== 'zh') document.querySelector('[data-l=zh]').click(); } catch (e) {}
  try { zoomReset(); } catch (e) {}
  try { GV.last = null; setGvMini(true); } catch (e) {}
  try { document.getElementById('scroller').scrollLeft = 0; document.getElementById('scroller').scrollTop = 0; scrollTo(0, 0); } catch (e) {}
};
`;

/* 视图:名字 → 页面里的摆放函数(字符串,evaluate 执行) */
const VIEWS = [
  ['主图', `() => {}`],
  ['文明卡', `() => { openCiv(CIVS.find(c => c.n === '唐')); }`],
  ['人物卡', `() => { openCiv(CIVS.find(c => c.n === '唐')); openPerson(Object.keys(PEOPLE).find(k => PEOPLE[k].c === '唐')); }`],
  ['成就卡', `() => { openCiv(CIVS.find(c => c.n === '唐')); openAchv(Object.keys(ACHV).find(k => ACHV[k].c === '唐')); }`],
  ['地图', `() => { openGeoView(); }`],
  ['列表', `() => { openTableView(); }`],
  ['轨迹', `() => { const sel = document.getElementById('traceSel'); sel.value = String(TRACES.findIndex(t => t.stops.length >= 6)); sel.dispatchEvent(new Event('change')); }`],
  ['搜索', `() => { const i = document.getElementById('searchIn'); i.value = '唐'; sRender(); }`],
];

(async () => {
  const t0 = Date.now();
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 820 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('whviz-hint', '1'); localStorage.setItem('whviz-tour', '1'); } catch (e) {} });
  const page = await ctx.newPage();
  await page.route('**/*', r => r.request().url().startsWith('file://') ? r.continue() : r.abort());   // 与 smoke 同口径:不出站。照片 <img> 在线加载会在点击之外改 DOM,把地图视图判成「自己在动」
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  const shot = () => page.screenshot({ type: 'png', animations: 'disabled', caret: 'hide' });
  /* 等页面静下来:签名+截图连续两次(隔 200ms)相同才算稳,最多等 2.4s。固定等 400ms 不够——
     地图的平滑滚动、面板抽屉的过渡、gvQuery 里的延时渲染都可能跨过 400ms,把「前一下的余波」算成「这一下的反应」(2026-09-06 反例 A 就是这样落错桶的)。 */
  const settle = async () => {
    let prev = null;
    for (let i = 0; i < 12; i++) {
      const cur = { sig: await page.evaluate(() => __sig()), shot: await shot() };
      if (prev && prev.sig === cur.sig && prev.shot.equals(cur.shot)) return { ...cur, stable: true, n: i + 1 };
      prev = cur; await page.waitForTimeout(200);
    }
    return { ...prev, stable: false, n: 12 };
  };
  const load = async () => { try { await page.evaluate(() => localStorage.clear()); } catch (e) {}   // 上一下点击可能把某个开关写进了 localStorage(如藏事件),重载前清掉,不然基线会被悄悄换掉
    await page.goto(IDX); await page.waitForTimeout(600); await page.evaluate(PAGE_FN); };
  await load();

  const report = [];
  for (const [name, setup] of VIEWS) {
    if (ONLY && name !== ONLY) continue;
    const place = async () => { await page.evaluate(`(${setup})()`); await page.waitForTimeout(WAIT); };
    await load(); await page.evaluate(() => __reset()); await place();   // 每个视图从干净的一次加载起算基线:上一视图点过的东西(搜索日志、缩放、导航栈)会留在页面里,基线带着它就会跟重载后的状态对不上
    let st = await settle(); let base = st.sig;
    const idle = st.stable;
    const cands = await page.evaluate(() => __aff());
    // 分组抽样
    const groups = new Map();
    for (const c of cands) { if (c.skip) continue; if (!groups.has(c.key)) groups.set(c.key, []); groups.get(c.key).push(c); }
    const picks = [];
    for (const [key, arr] of groups) {
      const idx = arr.length <= K ? arr.map((_, i) => i) : [0, Math.floor(arr.length / 2), arr.length - 1];
      idx.forEach(i => picks.push({ ...arr[i], n: arr.length }));
    }
    const skipBy = {}; cands.filter(c => c.skip).forEach(c => { skipBy[c.skip] = (skipBy[c.skip] || 0) + 1; });
    const R = { view: name, idle, candidates: cands.length, skipped: cands.filter(c => c.skip).length, skipBy, groups: groups.size, tried: 0, alive: 0, dead: [], activeDead: [], invisible: [], pixOnly: [], errors: [], drift: [] };
    const base0 = base;
    for (const p of picks) {
      // 复位后重新枚举,按同 key 同序号找回它(视图摆放是确定性的)
      await page.mouse.move(p.x, p.y);   // 先悬停:hover 样式先落定,免得把手型/高亮当成反应
      const b0 = await settle(); const before = b0.sig, shot0 = b0.shot;
      const e0 = errs.length;
      await page.mouse.down(); await page.mouse.up();
      await page.waitForTimeout(WAIT);
      const a0 = await settle(); const after = a0.sig, shot1 = a0.shot;
      const domSame = after === before, pixSame = shot0.equals(shot1);
      R.tried++;
      const label = `${p.tag}${p.id ? '#' + p.id : ''}${p.cls ? '.' + p.cls : ''} 「${p.t}」 @${p.x},${p.y}${p.n > 1 ? ` (同组 ${p.n})` : ''}`;
      if (errs.length > e0) R.errors.push(label + ' → ' + errs[e0]);
      if (pixSame) {   // 画面没动 = 对孩子来说没反应;已是当前态的另归一类
        if (p.active) { R.activeDead.push(label); continue; }
        if (domSame) { R.dead.push(label); continue; }
        R.invisible.push(label);   // DOM 动了、画面没动:也当没反应列出来,但要复位
      }
      if (domSame && !pixSame) R.pixOnly.push(label);     // 画面动了、DOM 没动:多半是 :focus 样式,单列供人判
      R.alive++;
      await page.evaluate(() => __reset()); await place();
      const now = (await settle()).sig;
      if (now !== base) {
        await load(); await page.evaluate(() => __reset()); await place(); const nb = (await settle()).sig;   // 重载后也要先 reset 再摆:基线是 reset 之后取的,少这一步坐标全对不上(2026-09-06 主图 6 个「死点」全是这么来的)
        if (nb !== base0) R.drift.push(label);   // 重载+清 localStorage 之后还回不到最初基线:这一下改了什么持久的东西,后面的判定都带着它
        base = nb;
      }
    }
    report.push(R);
    await page.evaluate(() => __reset());
  }
  await browser.close();
  const ms = Date.now() - t0;
  if (JSON_OUT) { console.log(JSON.stringify({ report, ms })); return; }
  for (const R of report) {
    const sk = Object.entries(R.skipBy).map(([k, v]) => `${k} ${v}`).join(',');
    console.log(`\n== ${R.view} == 候选 ${R.candidates}(跳过 ${R.skipped}:${sk})/ 分 ${R.groups} 组 / 点了 ${R.tried} / 有反应 ${R.alive} / 死点 ${R.dead.length} / DOM动画面没动 ${R.invisible.length} / 只有画面动 ${R.pixOnly.length} / 已是当前态 ${R.activeDead.length}${R.idle ? '' : '  ⚠ 视图自身在动,结论打折'}`);
    R.dead.forEach(x => console.log('  ✗ ' + x));
    R.invisible.forEach(x => console.log('  ◌ ' + x));
    R.pixOnly.forEach(x => console.log('  ▫ ' + x));
    R.activeDead.forEach(x => console.log('  · ' + x));
    R.errors.forEach(x => console.log('  ‼ ' + x));
    R.drift.forEach(x => console.log('  ⇢ 点完重载也回不到基线:' + x));
  }
  console.log(`\ndeadclick: ${ms} ms`);
})();
