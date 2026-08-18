#!/usr/bin/env node
/* 文明长河 — 内容厚度体检(2026-08-18 立)
 *
 * 为什么存在:Ray 反复提的一类反馈不是「写错了」而是「跟别的比太薄」——唐的交往只有一条、
 * 鼎盛维度不够、三洲商路点开什么都没有、某文明一个人物都没有。audit 查对错,check/smoke 查渲染,
 * 没有任何东西把 172 条带 / 127 座城摆在一起比厚薄。人一次只能点开一张卡,看不见分布;机器看得见。
 *
 * 原则:**不设绝对长度阈值**(v229 教训:机械追长度只会注水),只做**同组相对排名**——
 * 同泳道 × 同影响力档(k 峰值)为一组,组太小则退到全站同档;每个维度算组内百分位,
 * 掉到组内最后 15% 的维度标出来。这是清单不是红灯:薄不薄最终由人判,清单只负责把「先看哪 20 张」排好。
 *
 * 用法:node tools/depth.js            文明 + 城市各列最薄 20
 *      node tools/depth.js 40         列最薄 40
 *      node tools/depth.js 唐         查单条带 / 单座城的完整体检表(含同组最厚三条做参照)
 *      node tools/depth.js --json     机器可读(供 check.js / newband.js 接入)
 *
 * 维度(文明):大事记条数、大事记描述率、六问总字数、六问空格数、鼎盛段数、鼎盛短段占比、
 *   人物数、成就卡数、交往(同期同泳道的交流事件 + 轨迹站点)、照片、视频、正文密度(每百字具体物:年份/数字/站内专名)
 * 维度(城市):经过它的色带数(分组依据)、总结段字数、古称条数、古迹条数、照片、视频、小段覆盖率、小段均长、小段密度
 */
const D = require('./load')();
const { CIVS, CHRONO, GL, PEOPLE, ACHV, EVENTS, TRACES, CIV_PHOTO, VIDEO, GEO, GEO_CITY, PLACE_LORE, CITY_LORE, CITY_NAMES, CITY_SITES, CITY_PHOTO, CITY_VIDEO } = D;
const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');
const nArg = args.find(a => /^\d+$/.test(a));
const TOP = nArg ? +nArg : 20;
const ONE = args.find(a => !a.startsWith('--') && !/^\d+$/.test(a));
const BOTTOM = 0.15;   // 组内最后 15% 算「薄」

/* ── 具体物词典:年份/数字 + 站内专名(文明名、城市名、人物名、成就名)──────────────── */
const NAMES = new Set([...CIVS.map(c => c.n), ...GEO_CITY.map(g => g[0]), ...Object.keys(PEOPLE), ...Object.keys(ACHV)]);
const nameRe = new RegExp([...NAMES].filter(n => n.length >= 2).map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
const zhOf = v => Array.isArray(v) ? (v[0] || '') : (typeof v === 'string' ? v : '');
/* 每百字里有几个「具体的东西」:年份数字、站内专名。「税关尽在其手」= 0,「1573 年广州第一船白银」= 3 */
const density = txt => { if (!txt) return 0; const nums = (txt.match(/\d{2,4}/g) || []).length; const names = (txt.match(nameRe) || []).length; return +(100 * (nums + names) / txt.length).toFixed(1); };

/* ── 文明体检 ─────────────────────────────────────────────────────────────── */
const peopleByCiv = {}; for (const [n, p] of Object.entries(PEOPLE)) (peopleByCiv[p.c] = peopleByCiv[p.c] || []).push(n);
const achvByCiv = {}; for (const [n, a] of Object.entries(ACHV)) (achvByCiv[a.c] = achvByCiv[a.c] || []).push(n);
const civRows = CIVS.map(c => {
  const y0 = c.k[0][0], y1 = c.k[c.k.length - 1][0];
  const peak = Math.max(...c.k.map(p => p[1]));
  const ch = CHRONO[c.n] || [];
  const gl = GL[c.n] || c.gl || [];
  const q = c.q || {};
  const qTexts = ['born', 'rule', 'money', 'power', 'fall', 'legacy'].map(k => zhOf(q[k]));
  const exch = EVENTS.filter(e => e.y >= y0 && e.y <= y1 && (e.ls || []).includes(c.l)).length
             + TRACES.reduce((n, t) => n + t.stops.filter(s => s.l === c.l && s.y >= y0 && s.y <= y1).length, 0);
  const body = [zhOf(c.d), ...qTexts, ...gl.map(g => zhOf(g.d)), ...ch.map(it => zhOf(it[2]))].join('');
  return {
    n: c.n, lane: c.l, tier: peak >= 0.8 ? '大' : peak >= 0.5 ? '中' : '小', span: y1 - y0,
    dims: {
      大事记条数: ch.length,
      大事记描述率: ch.length ? +(ch.filter(it => it[2] && zhOf(it[2])).length / ch.length).toFixed(2) : 0,
      六问字数: qTexts.reduce((s, t) => s + t.length, 0),
      六问非空格数: qTexts.filter(t => t.length >= 20).length,
      鼎盛段数: gl.length,
      鼎盛非短段数: gl.filter(g => zhOf(g.d).length > 20).length,
      人物数: (peopleByCiv[c.n] || []).length,
      成就卡数: (achvByCiv[c.n] || []).length,
      交往: exch,
      照片: (CIV_PHOTO[c.n] || []).length,
      视频: (VIDEO[c.n] || []).length,
      正文密度: density(body),
    },
  };
});

/* ── 城市体检 ─────────────────────────────────────────────────────────────── */
const pip = (lon, lat, poly) => { let inside = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside; } return inside; };
const cityRows = GEO_CITY.map(g => {
  const [zh, , lon, lat] = g;
  const hits = CIVS.filter(c => { const p = GEO[c.n]; return p && p.p && p.p.some(poly => pip(lon, lat, poly)); });
  const lores = hits.map(c => PLACE_LORE[zh + '|' + c.n]).filter(Boolean);
  const loreTxt = lores.map(l => zhOf(l));
  return {
    n: zh, hits: hits.length, tier: hits.length >= 8 ? '大' : hits.length >= 4 ? '中' : '小',
    dims: {
      总结段字数: zhOf(CITY_LORE[zh]).length,
      古称条数: (CITY_NAMES[zh] || []).length,
      古迹条数: (CITY_SITES[zh] || []).length,
      照片: (CITY_PHOTO[zh] || []).length,
      视频: (CITY_VIDEO[zh] || []).length,
      小段覆盖率: hits.length ? +(lores.length / hits.length).toFixed(2) : 0,
      小段均长: loreTxt.length ? Math.round(loreTxt.reduce((s, t) => s + t.length, 0) / loreTxt.length) : 0,
      小段密度: density(loreTxt.join('')),
    },
  };
});

/* ── 组内百分位 ───────────────────────────────────────────────────────────── */
function rank(rows, groupOf, fallbackOf) {
  const groups = {}; rows.forEach(r => (groups[groupOf(r)] = groups[groupOf(r)] || []).push(r));
  const fb = {}; rows.forEach(r => (fb[fallbackOf(r)] = fb[fallbackOf(r)] || []).push(r));
  for (const r of rows) {
    let g = groups[groupOf(r)]; if (g.length < 5) g = fb[fallbackOf(r)];
    r.group = groupOf(r) + (g === groups[groupOf(r)] ? '' : '(退到全站同档)'); r.groupSize = g.length;
    r.pct = {}; r.thin = [];
    for (const d of Object.keys(r.dims)) {
      const vals = g.map(x => x.dims[d]);
      const below = vals.filter(v => v < r.dims[d]).length, eq = vals.filter(v => v === r.dims[d]).length;
      const p = (below + eq / 2) / vals.length;   // 并列取中位,免得全 0 的维度把整组都判薄
      r.pct[d] = +p.toFixed(2);
      const distinct = new Set(vals).size;
      // 存续不到百年的带(秦 15 年、西晋 51 年)大事记条数和交往天然少,这两维不判薄
      const shortSpan = r.span !== undefined && r.span < 100 && (d === '大事记条数' || d === '交往');
      if (p <= BOTTOM && distinct > 1 && r.dims[d] < Math.max(...vals) && !shortSpan) r.thin.push(d);
    }
    // 综合分:薄维度数 + 最薄的那个有多薄
    const minP = Math.min(...Object.values(r.pct));
    r.score = r.thin.length + (1 - minP);
  }
  return rows;
}
rank(civRows, r => `${r.lane}·${r.tier}`, r => r.tier);
rank(cityRows, r => `${r.tier}城`, r => '全站');

/* ── 输出 ─────────────────────────────────────────────────────────────────── */
const bar = p => '▁▂▃▄▅▆▇█'[Math.min(7, Math.floor(p * 8))];
const fmtRow = r => `${r.n.padEnd(14, '　')} ${r.thin.map(d => `${d}${bar(r.pct[d])}(${r.dims[d]})`).join('  ')}`;

if (JSON_OUT) { console.log(JSON.stringify({ civs: civRows, cities: cityRows })); process.exit(0); }

if (ONE) {
  const r = civRows.find(x => x.n === ONE) || cityRows.find(x => x.n === ONE);
  if (!r) { console.error(`depth: 找不到「${ONE}」`); process.exit(2); }
  const pool = civRows.includes(r) ? civRows : cityRows;
  console.log(`${r.n} · 组「${r.group}」共 ${r.groupSize} 条 · 薄维度 ${r.thin.length ? r.thin.join('/') : '无'}`);
  for (const d of Object.keys(r.dims)) console.log(`  ${bar(r.pct[d])} ${String(d).padEnd(8, '　')} ${String(r.dims[d]).padStart(6)}   组内百分位 ${Math.round(r.pct[d] * 100)}%${r.thin.includes(d) ? '  ← 薄' : ''}`);
  const peers = pool.filter(x => x.group.startsWith(r.group.replace(/\(.*\)$/, '')) && x !== r).sort((a, b) => a.thin.length - b.thin.length || b.dims[Object.keys(r.dims)[0]] - a.dims[Object.keys(r.dims)[0]]).slice(0, 3);
  if (peers.length) { console.log('  同组最厚三条(参照):'); peers.forEach(p => console.log(`    ${p.n}: ${Object.entries(p.dims).map(([k, v]) => `${k} ${v}`).join(' · ')}`)); }
  process.exit(0);
}

const thinCivs = civRows.filter(r => r.thin.length).sort((a, b) => b.score - a.score);
const thinCities = cityRows.filter(r => r.thin.length).sort((a, b) => b.score - a.score);
console.log(`depth: ${CIVS.length} 条带里 ${thinCivs.length} 条至少一个维度在组内最后 ${BOTTOM * 100}%;${GEO_CITY.length} 座城里 ${thinCities.length} 座。下面各列最薄 ${TOP}(▁ 最薄 … █ 最厚,括号里是原值):\n`);
console.log('── 文明 ──');
thinCivs.slice(0, TOP).forEach(r => console.log(fmtRow(r) + `   [组 ${r.group}]`));
console.log('\n── 城市 ──');
thinCities.slice(0, TOP).forEach(r => console.log(fmtRow(r) + `   [${r.hits} 带经过]`));
/* 全站维度分布,给「哪一类内容整体最薄」一个感觉 */
console.log('\n── 全站:各维度为 0 的条数 ──');
const zeros = {}; civRows.forEach(r => Object.entries(r.dims).forEach(([d, v]) => { if (!v) zeros[d] = (zeros[d] || 0) + 1; }));
console.log('  文明:' + Object.entries(zeros).sort((a, b) => b[1] - a[1]).map(([d, n]) => `${d} ${n}`).join(' · '));
const zc = {}; cityRows.forEach(r => Object.entries(r.dims).forEach(([d, v]) => { if (!v) zc[d] = (zc[d] || 0) + 1; }));
console.log('  城市:' + Object.entries(zc).sort((a, b) => b[1] - a[1]).map(([d, n]) => `${d} ${n}`).join(' · '));
