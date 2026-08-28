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
    const r = await p2.evaluate(() => {
      const go = document.getElementById('twGo'); if (go) go.click();
      const skip = document.getElementById('tourSkip'); if (skip && __box(skip).shown) skip.click();
      const need = ['playBtn', 'traceSel', 'langSw', 'searchIn', 'scroller'];
      const vw = innerWidth, vh = innerHeight;
      return need.map(id => { const el = document.getElementById(id); if (!el) return id + ':缺';
        const b = __box(el); if (!b.shown) return id + ':不可见';
        if (b.right < 0 || b.left > vw || b.bottom < 0 || b.top > vh) return id + ':在视口外';
        return null; }).filter(Boolean);
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
