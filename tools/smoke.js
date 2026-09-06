#!/usr/bin/env node
/* 文明长河 — headless 渲染层烟测(2026-08-16 立)
 *
 * 为什么存在:audit.js 的 69 条规则全是结构性的,CHANGELOG 里 20 个「audit 全绿仍出事」
 * 案例有 9 个在渲染层——少渲染一行(v218)、色带纯黑(v193)、遮罩关不掉(v226.1)、
 * 标签被切/重叠(v145/147/195)、点轨迹不滚动(v205)、城市面板空行(v203)、列表字号不一(v207.1)。
 * 这些以前全靠 Ray 实机点或把脚本手粘进 claude-in-chrome。本文件把它们固化成断言,
 * 用 playwright-core + 本机 Chrome 无头跑,不下载浏览器,产品 index.html 零依赖不受影响。
 *
 * 用法:node tools/smoke.js          (退出码 0 = 全通过,1 = 有断言失败)
 *      node tools/smoke.js --json   (机器可读输出,供 check.js 汇总)
 *      SMOKE_CHROME=/path/to/chrome 覆盖浏览器路径
 *
 * 纪律(HANDOFF 教训 33):每条断言都要「注入反例必红」验证过一次才算加上;
 * 验证记录写在断言旁的注释里。断言只量真实盒子(getBoundingClientRect / getComputedStyle),
 * 不读 hidden 属性(v226.1)。
 */
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const IDX = 'file://' + (process.env.SMOKE_INDEX ? path.resolve(process.env.SMOKE_INDEX) : path.join(ROOT, 'index.html'));   // SMOKE_INDEX 用于给断言注入反例
const CHROME = process.env.SMOKE_CHROME ||
  ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
   '/Applications/Chromium.app/Contents/MacOS/Chromium',
   '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'].find(fs.existsSync);
const JSON_OUT = process.argv.includes('--json');

let chromium;
try { ({ chromium } = require('playwright-core')); }
catch (e) { console.error('smoke: 缺 playwright-core,先在仓库根目录 npm install'); process.exit(2); }
if (!CHROME) { console.error('smoke: 找不到本机 Chrome,设 SMOKE_CHROME 指到可执行文件'); process.exit(2); }

const P = [];   // 问题清单
const fail = (tag, msg) => P.push(`[${tag}] ${msg}`);
const W = [];   // 警告:已知未清零的旧问题,打印但不亮红灯(HANDOFF 教训 3:清不完的阈值规则只会变成没人看的长期红灯)
const warn = (tag, msg) => W.push(`[${tag}] ${msg}`);
const stats = {};

/* 页面里跑的公共工具:真实盒子 */
const BOX_FN = `window.__box = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
  return { w: r.width, h: r.height, top: r.top, left: r.left, right: r.right, bottom: r.bottom,
           shown: r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.02 }; };`;

async function newPage(browser, { width, height, dark = false }) {
  const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: dark ? 'dark' : 'light' });
  const page = await ctx.newPage();
  const errs = [], ext = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('console.error: ' + m.text()); });
  page.on('request', r => { if (!r.url().startsWith('file://')) ext.push(r.url()); });
  await page.goto(IDX);
  await page.waitForTimeout(500);
  return { page, ctx, errs, ext };
}

(async () => {
  const t0 = Date.now();
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });

  /* ── 1. 四态加载:中/英 × 浅/深,零 pageerror、零对外请求 ─────────────────────
     反例验证:在 index.html 临时插 `<img src="https://x/y.png">` → 报「对外请求」;插 `throw 1` → 报 pageerror(2026-08-16) */
  for (const dark of [false, true]) {
    const { page, ctx, errs, ext } = await newPage(browser, { width: 1180, height: 820, dark });
    for (const lang of ['zh', 'en']) {
      await page.evaluate(l => document.querySelector('[data-l=' + l + ']').click(), lang);
      await page.waitForTimeout(150);
    }
    if (errs.length) fail('pageerror', `${dark ? '深' : '浅'}色:${errs.slice(0, 3).join(' | ')}`);
    if (ext.length) fail('对外请求', `${dark ? '深' : '浅'}色:未点任何东西就发出 ${ext.length} 个站外请求,如 ${ext[0]}`);
    await ctx.close();
  }

  /* 主工作页:桌面浅色 */
  const { page, ctx, errs } = await newPage(browser, { width: 1180, height: 820 });
  await page.evaluate(BOX_FN);

  /* ── 2. 引导层:欢迎屏首访可见;点「准备好了」后欢迎屏真实盒子归零(v226.1 的坑) ─────
     反例验证:把 #tourWelcome 的 CSS 加 display:flex !important → 报「点完仍可见」(2026-08-16) */
  /* 欢迎屏是 setTimeout(450ms) 起、twFade .35s 淡入的,newPage 的 500ms 固定等待在慢机器上
     会正好卡在 opacity 还没起来的那一格 → 误报「首访欢迎屏没显示出来」(2026-08-23 实测:
     hidden=false、display=flex、盒子 1180×820,只有 opacity=0)。这里等它真正淡入,
     **不放宽判据**:等不到就超时落回原来的断言,照样红。
     反例验证:给 #tourWelcome 注入 `opacity:0 !important;animation:none !important` →
     等待超时后仍报「首访欢迎屏没显示出来」、退出码 1(2026-08-23)。 */
  await page.waitForFunction(() => {
    const w = document.getElementById('tourWelcome');
    return !w || (!w.hidden && +getComputedStyle(w).opacity > 0.02);
  }, null, { timeout: 2500 }).catch(() => {});
  const tour = await page.evaluate(() => {
    const w = document.getElementById('tourWelcome');
    if (!w) return { missing: true };
    const before = __box(w).shown;
    const go = document.getElementById('twGo');
    if (go) go.click();
    const after = __box(w).shown;
    // 跳过引导后,遮罩类元素也不能留在屏上
    const skip = document.getElementById('tourSkip'); if (skip && __box(skip).shown) skip.click();
    const leftovers = ['tour', 'tourWelcome', 'tourHole', 'tourBox', 'firstHint']
      .map(id => document.getElementById(id)).filter(el => el && __box(el).shown).map(el => '#' + el.id);
    return { before, after, leftovers };
  });
  if (tour.missing) fail('引导层', '#tourWelcome 不存在');
  else {
    if (!tour.before) fail('引导层', '首访欢迎屏没显示出来');
    if (tour.after) fail('引导层', '点「准备好了」后 #tourWelcome 仍占屏(hidden 被 display 盖掉?)');
    if (tour.leftovers.length) fail('引导层', `跳过引导后仍可见:${tour.leftovers.join(' ')}`);
  }
  await page.waitForTimeout(150);

  /* ── 3. 全部文明卡 × 中英:无 undefined/NaN/[object;且英文卡「行数」不少于中文卡(v218 少一行) ──
     反例验证:上线第一跑就抓到 澳大利亚原住民 e.f 用 'Country' 键致英文卡缺 .today 行(真 bug,当场修);把某 q.money 删掉英文 → 报 undefined(2026-08-16) */
  const cards = await page.evaluate(() => {
    const panel = document.querySelector('#panel');
    // 按 class 直方图比中英两张卡:v218 那类「整行消失」= 某个 class 在英文侧少一个元素;
    // 不比叶子块数(中英 inline 链接数天然不同,噪声太大)
    // 有意的中英差异不比:.bk 是 B 站链接(只中文有);.tv-city 古称→今名的站内链接只在中文侧成链(linkNames 按中文名匹配)
    const SKIP = new Set(['bk', 'tv-city']);
    const hist = h => { const d = document.createElement('div'); d.innerHTML = h; const m = {};
      d.querySelectorAll('[class]').forEach(el => { const k = el.getAttribute('class'); if (!SKIP.has(k)) m[k] = (m[k] || 0) + 1; }); return m; };
    const out = { n: 0, bad: [], fewer: [] };
    const zhRows = {};
    for (const lang of ['zh', 'en']) {
      document.querySelector('[data-l=' + lang + ']').click();
      for (const c of CIVS) {
        openCiv(c); out.n++;
        const h = panel.innerHTML;
        const m = h.match(/\bundefined\b|\bNaN\b|\[object /);
        if (m) out.bad.push(`${lang}:${c.n}:${m[0]}`);
        const r = hist(h);
        if (lang === 'zh') zhRows[c.n] = r;
        else for (const k in zhRows[c.n]) if ((r[k] || 0) < zhRows[c.n][k]) out.fewer.push(`${c.n}: .${k} zh ${zhRows[c.n][k]} 个 / en ${r[k] || 0} 个`);
      }
    }
    document.querySelector('[data-l=zh]').click();
    return out;
  });
  stats.cards = cards.n;
  cards.bad.forEach(x => fail('卡片脏值', x));
  cards.fewer.forEach(x => fail('英文卡少元素', x));

  /* ── 4. 城市面板 × 中英:每城 gvQuery 有命中,每行 gvDetail 有实质正文(v203 119 空行 / Ray 巴塞罗那) ──
     反例验证:把某 place_lore 键改错 → 该城行正文只剩定位句,报「正文过短」(2026-08-16) */
  const city = await page.evaluate(() => {
    const strip = h => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const out = { n: 0, nohit: [], thin: [] };
    for (const lang of ['zh', 'en']) {
      document.querySelector('[data-l=' + lang + ']').click();
      for (let ci = 0; ci < GEO_CITY.length; ci++) {
        const c = GEO_CITY[ci];
        gvQuery(c[2], c[3], ci); out.n++;
        if (!GV.hits.length) { out.nohit.push(`${lang}:${c[0]}`); continue; }
        for (let ri = 0; ri < GV.hits.length; ri++) {
          const txt = strip(String(gvDetail(ri)));
          if (txt.length < 20 || /undefined|NaN|\[object /.test(txt)) out.thin.push(`${lang}:${c[0]}|${GV.hits[ri].c.n}: "${txt.slice(0, 30)}"`);
        }
      }
    }
    document.querySelector('[data-l=zh]').click();
    return out;
  });
  stats.cities = city.n;
  city.nohit.forEach(x => fail('城市无命中', x));
  city.thin.forEach(x => fail('城市行空', x));

  /* ── 4b. 地图近旁点击吸附(v335,Ray/Jasper 实测:点到城市点旁边不该显示「没有文明」) ──
     模拟真实指针事件:在拉萨点旁 20px 处按下抬起,断言吸附选中拉萨。
     反例验证:把 index.html 的 GV_SNAP 改 0 → 报「近旁点击未吸附」(2026-08-28 实测红) */
  const snap = await page.evaluate(() => {
    openGeoView();
    if (GV.mini) setGvMini(false);
    GV.zoom = 1; renderGvMap();
    const svg = gvMap.querySelector('svg'); if (!svg) return { err: '无 svg' };
    const r = svg.getBoundingClientRect();
    const i = GEO_CITY.findIndex(c => c[0] === '拉萨');
    const cx = r.left + (GEO_CITY[i][2] + 180) / 360 * r.width + 20;
    const cy = r.top + (GV_LAT1 - GEO_CITY[i][3]) / (GV_LAT1 - GV_LAT0) * r.height;
    const ev = t => new PointerEvent(t, { clientX: cx, clientY: cy, pointerId: 7, bubbles: true });
    gvMap.dispatchEvent(ev('pointerdown')); gvMap.dispatchEvent(ev('pointerup'));
    const got = GV.last ? GV.last.ci : -9;
    closeGeoView();
    return { want: i, got };
  });
  if (snap.err || snap.got !== snap.want) fail('近旁点击未吸附', JSON.stringify(snap));
  stats.snap = snap.got === snap.want ? 1 : 0;

  /* ── 4c. 轨迹全貌条(v336,Ray:选轨迹只见角落一截箭头,不知道整条线有多长) ──
     选中佛教轨迹 → 屏底全貌条可见、站数齐、点末站主图滚到该站进视口。
     反例验证:把 index.html 的 TR_BAR 改 false → 报「全貌条未出现」(2026-08-28 实测红) */
  const tbar = await page.evaluate(async () => {
    const i = TRACES.findIndex(t => t.n[0] === '佛教');
    traceSel.value = String(i); traceSel.dispatchEvent(new Event('change'));
    await new Promise(r => setTimeout(r, 120));
    const bar = document.getElementById('trBar');
    if (!bar || bar.hidden) return { err: '全貌条未出现' };
    const chips = bar.querySelectorAll('.tb-stop').length;
    const last = bar.querySelector(`.tb-stop[data-ti="${TRACES[i].stops.length - 1}"]`);
    last.click();
    await new Promise(r => setTimeout(r, 700));
    const g = chart.querySelector(`.trstop[data-ti="${TRACES[i].stops.length - 1}"]`);
    const r2 = g ? g.getBoundingClientRect() : null;
    const inView = r2 && r2.top >= 0 && r2.bottom <= window.innerHeight;
    traceSel.value = ''; traceSel.dispatchEvent(new Event('change'));
    zoomReset(); window.scrollTo(0, 0);   // 还原视窗:选轨迹时 zoomTo 过,不还原会污染后面的带/标签统计
    return { chips, want: TRACES[i].stops.length, inView };
  });
  if (tbar.err) fail('全貌条未出现', tbar.err);
  else {
    if (tbar.chips !== tbar.want) fail('全貌条站数不齐', `${tbar.chips}/${tbar.want}`);
    if (!tbar.inView) fail('全貌条点站未滚到', JSON.stringify(tbar));
  }
  stats.trbar = tbar.chips || 0;

  /* ── 4d. 卡内中英对照(v384,Ray:「看英文卡时能对照到中文」) ──
     每段成段文字中英同在(.bi 里 .l0/.l1),当前语言可见;点正文段落 → 另一种展开(.both);
     钩子句在 summary 里,点文字只开合 details、点小标 .bi-t 才展开对照;英文态下中文段默认不可见。
     反例验证(2026-09-06 实测):①把点击处理里的 classList.toggle('both') 换成空操作 → 三条红;
     ②把「html[data-lang] #panel .bi.both …{display:block}」的 html[data-lang] 前缀去掉(特异性输给 display:none)
       → 只红「点段落后英文没有展开」——这正是开发时真踩到的坑。 */
  const bi = await page.evaluate(async () => {
    const out = { err: [] }; const vis = el => el && el.offsetHeight > 0;
    const wait = ms => new Promise(r => setTimeout(r, ms));
    document.querySelector('[data-l=zh]').click(); await wait(150);
    openCiv(CIVS.find(c => c.n === '唐')); await wait(150);
    const panel = document.getElementById('panel');
    out.n = panel.querySelectorAll('.bi').length;
    if (out.n < 5) out.err.push(`.bi 块只有 ${out.n} 个`);
    const body = panel.querySelector('.q-item .bi:not(summary .bi)');
    if (!body) out.err.push('六问正文没有 .bi');
    else {
      body.closest('details').open = true;
      const l1 = body.querySelector('.l1');
      if (vis(l1)) out.err.push('中文态下英文段一开始就可见');
      body.click(); await wait(40);
      if (!body.classList.contains('both')) out.err.push('点段落后没有 .both');
      if (!vis(l1)) out.err.push('点段落后英文没有展开');
      body.click(); await wait(40);
      if (vis(l1)) out.err.push('再点一次没有收起');
    }
    const hook = panel.querySelector('summary .bi');
    if (!hook) out.err.push('没有带 .bi 的钩子句');
    else {
      const det = hook.closest('details'); const was = det.open;
      hook.querySelector('.l0').click(); await wait(40);
      if (hook.classList.contains('both')) out.err.push('点钩子文字不该展开对照');
      if (det.open === was) out.err.push('点钩子文字应当开合 details');
      hook.querySelector('.bi-t').click(); await wait(40);
      if (!hook.classList.contains('both')) out.err.push('点钩子小标没有展开对照');
    }
    const gl = panel.querySelectorAll('p.gl-d[data-gl]');
    if (!gl.length) out.err.push('没有 p.gl-d[data-gl]'); else if ([...gl].some(x => !x.hidden)) out.err.push('gl-d 默认应当 hidden');
    document.querySelector('[data-l=en]').click(); await wait(200);
    if (document.documentElement.dataset.lang !== 'en') out.err.push('data-lang 没跟着切');
    const b2 = panel.querySelector('.q-item .bi:not(summary .bi)');
    if (b2 && vis(b2.querySelector('.l0'))) out.err.push('英文态下中文段一开始就可见');
    /* 英文态展开后,英文要留在上面、中文落在下面(DOM 里中文在前,靠 CSS order 翻过来;
       反例:去掉 order 规则 → 中文跑到英文上面,红) */
    if (b2) { b2.closest('details').open = true; b2.classList.add('both'); await wait(40);
      const t0 = b2.querySelector('.l0').getBoundingClientRect().top, t1 = b2.querySelector('.l1').getBoundingClientRect().top;
      if (!(t1 < t0)) out.err.push(`英文态展开后中文跑到了英文上面(zh top ${t0.toFixed(0)} / en top ${t1.toFixed(0)})`);
      b2.classList.remove('both'); }
    /* 钩子句(summary 里的 strong.q-h)同样要英文在上——它另有 display:block 的规则,flex 容器规则特异性不够时
       order 会静默失效(2026-09-06 实测就是这样),所以单独测一次 */
    const h2 = panel.querySelector('summary .bi');
    if (h2) { h2.classList.add('both'); await wait(40);
      const t0 = h2.querySelector('.l0').getBoundingClientRect().top, t1 = h2.querySelector('.l1').getBoundingClientRect().top;
      if (!(t1 < t0)) out.err.push(`英文态钩子句展开后中文跑到了英文上面(zh top ${t0.toFixed(0)} / en top ${t1.toFixed(0)})`);
      h2.classList.remove('both'); }
    document.querySelector('[data-l=zh]').click(); await wait(150);
    panel.classList.remove('open');
    return out;
  });
  bi.err.forEach(e => fail('中英对照', e));
  stats.bi = bi.n;

  /* ── 4f. 卡内「返回」(v385,Ray:「跳过去很方便,误操作想点回去就没那么方便」) ──
     换掉正开着的卡之前记快照;← 只在有地方可回时出现;× / Esc / 关地图清空。
     反例验证(2026-09-06 实测):①navBack 改成空函数 → 「点←没回到原卡」等红;
     ②去掉 openCiv 里的 navGuard → 「同期文明跳转后没有←」红;③去掉地图换城前的 navPush → 「地图换城后←没出现」红。 */
  const nav = await page.evaluate(async () => {
    const out = { err: [] }; const wait = ms => new Promise(r => setTimeout(r, ms));
    const panel = document.getElementById('panel'); const back = () => panel.querySelector('.p-back');
    const clk = el => el.dispatchEvent(new MouseEvent('click', { bubbles: true }));   // SVG 元素没有 .click()
    document.querySelector('[data-l=zh]').click(); await wait(120);
    navClear(); if (!gv.hidden) closeGeoView();
    const X = CIVS.find(c => c.n === '唐');
    // a) 同期文明圆点/列表 → 另一张卡 → ←
    openCiv(X); await wait(120); panel.scrollTop = 300; const st0 = panel.scrollTop;
    if (back()) out.err.push('刚从时间轴打开的卡不该有←');
    const go = panel.querySelector('[data-goto]');
    if (!go) out.err.push('唐卡里没有 [data-goto]');
    else {
      clk(go); await wait(150);
      if (cur.obj === X) out.err.push('点同期文明后卡没换');
      if (!back()) out.err.push('同期文明跳转后没有←');
      else { clk(back()); await wait(150);
        if (cur.obj !== X) out.err.push('点←没回到原卡');
        if (panel.scrollTop < st0 - 40) out.err.push(`点←后滚动位置没回来(${st0}→${panel.scrollTop})`);
        if (back()) out.err.push('退到底后←还在'); }
    }
    // e) 卡开着时又开另一张(时间轴误点走的就是 openCiv) → ←;同一张不记
    const Y = CIVS.find(c => c.n === '北宋');
    openCiv(X); await wait(80); openCiv(X); await wait(80);
    if (back()) out.err.push('重开同一张卡不该记快照');
    openCiv(Y); await wait(80);
    if (!back()) out.err.push('卡开着时换卡后没有←');
    // g) 切语言不吃掉栈
    const n0 = NAV.length; document.querySelector('[data-l=en]').click(); await wait(200);
    if (NAV.length !== n0) out.err.push(`切语言改变了栈长度 ${n0}→${NAV.length}`);
    if (!back()) out.err.push('切语言后←丢了');
    document.querySelector('[data-l=zh]').click(); await wait(150);
    // f) × 清空
    panel.querySelector('.p-close').click(); await wait(80);
    if (NAV.length) out.err.push('点×后栈没清空');
    openCiv(X); await wait(80); if (back()) out.err.push('清空后新开的卡不该有←');
    // b) 文明卡点「中心」的城 → 地图 → ←
    const cityA = panel.querySelector('a.tv-city');
    if (!cityA) out.err.push('唐卡里没有 a.tv-city');
    else {
      clk(cityA); await wait(400);
      if (gv.hidden) out.err.push('点中心城后地图没开');
      if (panel.classList.contains('open')) out.err.push('点中心城后卡没关');
      const gb = document.getElementById('gvBack');
      if (!gb || gb.hidden) out.err.push('跳到地图后地图上的←没出现');
      else { clk(gb); await wait(300);
        if (!gv.hidden) out.err.push('地图←没关掉地图');
        if (!panel.classList.contains('open') || cur.obj !== X) out.err.push('地图←没回到原来的文明卡');
        if (!gb.hidden) out.err.push('回来后地图←没藏起来'); }
    }
    // c) 人物卡 → 他的文明 → ←(挑一个不属于唐的人)
    openCiv(X); await wait(80);
    const pk = Object.keys(PEOPLE).find(k => PEOPLE[k].c !== X.n && CIVS.some(c => c.n === PEOPLE[k].c));
    openPerson(pk); await wait(120);
    const pgo = pcard.querySelector('[data-pgo]');
    if (!pgo) out.err.push('人物卡里没有 [data-pgo]');
    else { clk(pgo); await wait(150);
      if (cur.obj === X) out.err.push('人物卡跳文明后卡没换');
      if (!back()) out.err.push('人物卡跳文明后没有←');
      else { clk(back()); await wait(120); if (cur.obj !== X) out.err.push('人物卡路径←没回到原卡'); } }
    // d) 地图上点到另一座城 → ← 回到前一座
    panel.querySelector('.p-close') && clk(panel.querySelector('.p-close')); navClear();
    if (gv.hidden) openGeoView(); await wait(200);
    const A = 0; gvQuery(GEO_CITY[A][2], GEO_CITY[A][3], A); await wait(200);
    setGvMini(false); await wait(300);   // gvQuery 每次都会把地图收窄(v199),展开与读矩形必须放在查询之后——第一版顺序反了,点不到
    const svg = gvMap.querySelector('svg'); const r = svg.getBoundingClientRect();
    const pt = i => [r.left + (GEO_CITY[i][2] + 180) / 360 * r.width, r.top + (GV_LAT1 - GEO_CITY[i][3]) / (GV_LAT1 - GV_LAT0) * r.height];
    // 挑一座在视口里、离 A 足够远的城
    let B = -1; for (let i = 1; i < GEO_CITY.length; i++) { const [x, y] = pt(i); const [ax, ay] = pt(A);
      if (x > r.left + 20 && x < Math.min(r.right, innerWidth) - 20 && y > Math.max(r.top, 0) + 20 && y < Math.min(r.bottom, innerHeight) - 20 && Math.hypot(x - ax, y - ay) > 80) { B = i; break; } }
    if (B < 0) out.err.push('地图上找不到可点的第二座城');
    else {
      const [bx, by] = pt(B);
      const ev = (type) => gvMap.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 7, isPrimary: true, clientX: bx, clientY: by, pointerType: 'touch' }));
      ev('pointerdown'); await wait(30); ev('pointerup'); await wait(350);
      if (!GV.last || GV.last.ci !== B) out.err.push(`地图点城没生效(想点 ${GEO_CITY[B][0]},得到 ${GV.last && GV.last.ci >= 0 ? GEO_CITY[GV.last.ci][0] : GV.last && GV.last.ci})`);
      const gb2 = document.getElementById('gvBack');
      if (!gb2 || gb2.hidden) out.err.push('地图换城后←没出现');
      else { clk(gb2); await wait(300);
        if (!GV.last || GV.last.ci !== A) out.err.push('地图←没回到前一座城');
        if (!gb2.hidden) out.err.push('地图退到底后←还在'); }
    }
    // 收尾
    navClear(); closeGeoView(); setGvMini(true);
    return out;
  });
  nav.err.forEach(e => fail('返回键', e));

  /* ── 5. 色带真实填充色:没有一条是纯黑/透明(v193 五条大洋洲带黑了好几版) ─────────────
     反例验证:临时删掉 CSS 里某圈 --c9-a 变量 → 报黑带(2026-08-16) */
  const bands = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('path.band').forEach(p => {
      const f = getComputedStyle(p).fill;
      if (!f || f === 'rgb(0, 0, 0)' || f === 'none' || f === 'transparent') bad.push(`${CIVS[+p.dataset.ci]?.n || p.dataset.ci}: ${f}`);
    });
    return { n: document.querySelectorAll('path.band').length, bad };
  });
  stats.bands = bands.n;
  if (!bands.n) fail('色带', '一条 path.band 都没画出来');
  bands.bad.forEach(x => fail('色带黑/透明', x));

  /* ── 6. 色带标签:可见标签横向落在自己色带内、落在滚动视口内;同一 y 附近两两不重叠(v145/147/195, Ray「东南亚标题不在中间」) ──
     反例验证:把 placeLabels 里 xhi 的 halfW 项去掉 → 报「出视口」(2026-08-16) */
  const labels = await page.evaluate(() => {
    const sc = document.getElementById('scroller');
    const vp = sc.getBoundingClientRect();
    const bandBox = {}; document.querySelectorAll('path.band').forEach(p => { bandBox[p.dataset.ci] = p.getBoundingClientRect(); });
    const vis = [...document.querySelectorAll('text.blabel[data-ci]')].filter(t => getComputedStyle(t).display !== 'none')
      .map(t => ({ ci: t.dataset.ci, n: CIVS[+t.dataset.ci]?.n, r: t.getBoundingClientRect() }));
    const out = { n: vis.length, outside: [], clipped: [], overlap: [] };
    for (const l of vis) {
      const b = bandBox[l.ci]; if (!b) continue;
      const cx = (l.r.left + l.r.right) / 2;   // placeLabels 的设计是「标签中心」落在色带可见段内,窄带两端露出半个标签是允许的
      if (cx < b.left - 1 || cx > b.right + 1) out.outside.push(`${l.n}: 标签中心 ${cx | 0} 色带 ${b.left | 0}–${b.right | 0}`);
      if (l.r.left < vp.left - 1 || l.r.right > vp.right + 1) out.clipped.push(`${l.n}: ${l.r.left | 0}–${l.r.right | 0} 视口 ${vp.left | 0}–${vp.right | 0}`);
    }
    for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
      const a = vis[i].r, b = vis[j].r;
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ox > 4 && oy > 4) out.overlap.push(`${vis[i].n} × ${vis[j].n}`);
    }
    return out;
  });
  stats.labels = labels.n;
  labels.outside.forEach(x => fail('标签出色带', x));
  labels.clipped.forEach(x => fail('标签出视口', x));
  /* 标签重叠:基线冻结(2026-08-18)。基线内 warn(清不完的旧问题不亮红灯),**基线外 fail**——
     v247 新带又多了一处,那时靠「显式改 CLAUDE.md」放过,warn 就是这么一点点变成「多一条也无所谓」的。
     新带引入新重叠必须当场处理:挪标签,或有意识地把它加进这张表。 */
  const OVERLAP_BASELINE = new Set(['北欧诸王国 × 文艺复兴意大利', '勃兰登堡·普鲁士 × 俄罗斯·苏联', '帖木儿帝国 × 北元·蒙古诸部', '马六甲及诸苏丹国 × 暹罗', '南诏·大理 × 吐蕃']);
  labels.overlap.forEach(x => (OVERLAP_BASELINE.has(x) ? warn : fail)(OVERLAP_BASELINE.has(x) ? '标签重叠(基线)' : '标签重叠(新增)', x));

  /* ── 7. 选一条轨迹后,站点要进视口(v205,Ray「点基督教像没反应」) ───────────────────
     反例验证:把 traceSel change 里 window.scrollTo 注释掉 → 报「站点不在视口」(2026-08-16) */
  const trace = await page.evaluate(async () => {
    const sel = document.getElementById('traceSel');
    const opts = [...sel.options].filter(o => o.value !== '');
    const out = { tried: 0, off: [] };
    // 抽样:第一条、中间一条、最后一条——全跑一遍也就 33 条,但每条要等滚动,取三条够拦回归
    const pick = [opts[0], opts[Math.floor(opts.length / 2)], opts[opts.length - 1]].filter(Boolean);
    for (const o of pick) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      sel.value = o.value; sel.dispatchEvent(new Event('change'));
      out.tried++;
      await new Promise(r => setTimeout(r, 700));
      const rs = [...document.querySelectorAll('.trstop')].map(g => g.getBoundingClientRect());
      if (!rs.length) { out.off.push(`${o.textContent.trim()}: 没画出站点`); continue; }
      const vh = innerHeight, inView = rs.filter(r => r.bottom > 60 && r.top < vh).length;
      if (!inView) out.off.push(`${o.textContent.trim()}: ${rs.length} 站全部在视口外`);
    }
    sel.value = ''; sel.dispatchEvent(new Event('change'));
    return out;
  });
  stats.traces = trace.tried;
  trace.off.forEach(x => fail('轨迹不进视口', x));
  /* 7b(v386). 全部轨迹都要把站点摆全:第 7 段只抽三条看「进视口」(每条要等滚动),这里不等滚动。
     数的是屏底全貌条的 .tb-stop(它按全部 stops 画,不裁),主图的 .trstop 会把视口外的裁掉(见渲染器
     「p.x < -20 || p.x > INNER_W + 20 → return」),所以只要求主图至少画出一站。v377 新加的第 35 条轨迹
     当时是另写脚本单独验的,这一层此前没有覆盖。反例(2026-09-06 实测):让全貌条少画一站 → 报「全貌条站数不齐」。 */
  const sweep = await page.evaluate(async () => {
    const sel = document.getElementById('traceSel');
    const out = { n: 0, bad: [] };
    for (let i = 0; i < TRACES.length; i++) {
      sel.value = String(i); sel.dispatchEvent(new Event('change'));
      await new Promise(r => setTimeout(r, 60));
      const drawn = document.querySelectorAll('.trstop').length;
      const bar = document.getElementById('trBar'); const chips = bar && !bar.hidden ? bar.querySelectorAll('.tb-stop').length : -1;
      out.n++;
      if (!drawn) out.bad.push(`${TRACES[i].n[0]}: 主图一站都没画出来`);
      if (chips !== TRACES[i].stops.length) out.bad.push(`${TRACES[i].n[0]}: 全貌条 ${chips} 站 / 应有 ${TRACES[i].stops.length}`);
    }
    sel.value = ''; sel.dispatchEvent(new Event('change'));
    window.scrollTo({ top: 0, behavior: 'auto' });
    return out;
  });
  stats.tracesAll = sweep.n;
  sweep.bad.forEach(x => fail('全貌条站数不齐/主图无站', x));

  /* ── 8. 列表视角:同一列字号一致、行数 = 文明数(Ray「列表字号不一致」) ─────────────
     反例验证:给某个 td 加 style="font-size:20px" → 报(2026-08-16) */
  const table = await page.evaluate(() => {
    if (typeof openTableView !== 'function') return { skip: true };
    openTableView();
    const tv = document.getElementById('tableview');
    const rows = [...tv.querySelectorAll('tbody tr')];
    const out = { rows: rows.length, shown: __box(tv).shown, mixed: [] };
    const cols = rows[0] ? rows[0].children.length : 0;
    for (let c = 0; c < cols; c++) {
      const sizes = new Set(rows.map(r => r.children[c] && getComputedStyle(r.children[c]).fontSize).filter(Boolean));
      if (sizes.size > 1) out.mixed.push(`第 ${c + 1} 列字号 ${[...sizes].join('/')}`);
    }
    const close = document.getElementById('tvClose'); if (close) close.click();
    return out;
  });
  if (!table.skip) {
    stats.tableRows = table.rows;
    if (!table.shown) fail('列表', '#tableview 打开后不可见');
    if (table.rows && table.rows < stats.cards / 2 * 0.9) fail('列表', `行数 ${table.rows} 明显少于文明数 ${stats.cards / 2}`);
    table.mixed.forEach(x => fail('列表字号', x));
  }

  if (errs.length) fail('pageerror', '主工作页:' + errs.slice(0, 3).join(' | '));
  await ctx.close();

  /* ── 9. 窄视口:iPad 竖屏 / 手机,关键入口可见可点(Ray「手机点开没找到时间穿梭」) ──────
     反例验证:给 #playBtn 加 @media (max-width:500px){display:none} → 手机档报(2026-08-16) */
  for (const vp of [{ name: 'iPad竖', width: 820, height: 1180 }, { name: '手机', width: 390, height: 844 }]) {
    const { page: p2, ctx: c2, errs: e2 } = await newPage(browser, vp);
    await p2.evaluate(BOX_FN);
    const r = await p2.evaluate(async () => {
      const wait = ms => new Promise(r => setTimeout(r, ms));
      const go = document.getElementById('twGo'); if (go) go.click();
      const skip = document.getElementById('tourSkip'); if (skip && __box(skip).shown) skip.click();
      const need = ['playBtn', 'traceSel', 'langSw', 'searchIn', 'scroller'];
      const vw = innerWidth, vh = innerHeight;
      const errs = need.map(id => { const el = document.getElementById(id); if (!el) return id + ':缺';
        const b = __box(el); if (!b.shown) return id + ':不可见';
        if (b.right < 0 || b.left > vw || b.bottom < 0 || b.top > vh) return id + ':在视口外';
        return null; }).filter(Boolean);
      /* v386:今天新加的三样在窄视口也得点得到——卡片 ←(v385)、对照小标(v384)、地图 ←(v385)。
         桌面视口的 4d/4f 段不管这层;反例:给 .p-back 加 @media(max-width:900px){display:none} → iPad竖/手机档报。 */
      const inVp = b => b.shown && b.right > 0 && b.left < vw && b.bottom > 0 && b.top < vh;
      const clk = el => el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      openCiv(CIVS.find(c => c.n === '唐')); await wait(400);   // 窄屏下 #panel 是 0.25s 滑入的底部抽屉,没等它到位量出来全是「视口外」(第一版就栽在这)
      const panel = document.getElementById('panel');
      const jump = panel.querySelector('[data-goto]'); if (jump) clk(jump); await wait(400);   // 上面已有 const go = twGo,别撞名
      const back = panel.querySelector('.p-back');
      if (!back) errs.push('跳转后卡上没有←'); else if (!inVp(__box(back))) errs.push('卡上的←不在视口内/不可见');
      const det = panel.querySelector('.q-item'); if (det) det.open = true;
      const chip = panel.querySelector('.q-item .bi:not(summary .bi) .bi-t');
      panel.scrollTop = 0; if (chip) chip.scrollIntoView({ block: 'center' });
      if (!chip) errs.push('卡里没有对照小标'); else if (!inVp(__box(chip))) errs.push('对照小标不在视口内/不可见');
      const cityA = panel.querySelector('a.tv-city'); if (cityA) clk(cityA); await wait(400);
      const gb = document.getElementById('gvBack');
      if (!gb || gb.hidden) errs.push('跳到地图后地图←没出现'); else if (!inVp(__box(gb))) errs.push('地图←不在视口内/不可见');
      navClear(); closeGeoView();
      return errs;
    });
    r.forEach(x => fail(`窄视口 ${vp.name}`, x));
    if (e2.length) fail('pageerror', `${vp.name}:` + e2[0]);
    await c2.close();
  }

  await browser.close();
  const ms = Date.now() - t0;
  if (JSON_OUT) { console.log(JSON.stringify({ ok: !P.length, problems: P, warnings: W, stats, ms })); }
  else {
    console.log(`smoke: ${stats.cards} 卡 / ${stats.cities} 城×行 / ${stats.bands} 带 / ${stats.labels} 标签 / ${stats.traces} 轨迹 / 表 ${stats.tableRows ?? '-'} 行,${ms} ms`);
    if (P.length) { console.log(`smoke: ${P.length} 个问题`); P.forEach(x => console.log('  ' + x)); }
    else console.log('smoke: 全通过');
    if (W.length) { console.log(`smoke: ${W.length} 个警告(不影响退出码)`); W.forEach(x => console.log('  ' + x)); }
  }
  process.exit(P.length ? 1 : 0);
})().catch(e => { console.error('smoke 崩了:', e.message); process.exit(2); });
