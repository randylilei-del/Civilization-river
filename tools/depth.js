#!/usr/bin/env node
/* 文明长河 — 内容厚度体检(2026-08-18 立)
 *
 * 为什么存在:Ray 反复提的一类反馈不是「写错了」而是「跟别的比太薄」——唐的交往只有一条、
 * 鼎盛维度不够、三洲商路点开什么都没有、某文明一个人物都没有。audit 查对错,check/smoke 查渲染,
 * 没有任何东西把 172 条带 / 127 座城摆在一起比厚薄。人一次只能点开一张卡,看不见分布;机器看得见。
 *
 * 原则:**不设绝对长度阈值**(v229 教训:机械追长度只会注水),只做**同组相对排名**——
 * 同泳道 × 同影响力档(k 峰值)为一组,组太小则退到全站同档;每个维度算组内百分位,
 * 掉到组内尾部(大档 35% / 中档 25% / 小档 15%)的维度标出来。这是清单不是红灯:薄不薄最终由人判,清单只负责把「先看哪 20 张」排好。
 *
 * 尺子分三层(2026-08-18 Ray 校准后定:他点名的罗马共和国/秦/西晋/吠陀时代/香港,薄的全在正文层):
 *   核心层(权重 3;六问字数 2——v181 起六问有意求短,总字数少不一定薄,最短格更说明问题):大事记条数、六问字数、六问最短格、鼎盛段数、鼎盛非短段数、正文密度
 *   结构层(权重 1):大事记描述率、六问非空格数、交往
 *   素材层(不判薄,只列缺口):照片、视频——外部素材要慢慢补,不该把一条正文很厚的带拖进「薄」名单
 *   绝对缺口(不看组,0 就是缺):人物 0(audit 的 FIGURES_NA 留空名单除外)、成就卡 0
 * 城市同理:核心 = 总结段字数、古迹条数、小段覆盖率、小段均长、小段密度;结构 = 古称条数(新大陆城市天然没有,权重 0.5);素材 = 照片、视频
 *
 * 用法:node tools/depth.js            文明 + 城市各列最薄 20
 *      node tools/depth.js 40         列最薄 40
 *      node tools/depth.js 唐         查单条带 / 单座城的完整体检表(含同组最厚三条做参照)
 *      node tools/depth.js --json     机器可读(供 check.js / newband.js 接入)
 *
 * 维度(文明):大事记条数、大事记描述率、六问总字数、六问空格数、鼎盛段数、鼎盛短段占比、
 *   人物数、成就卡数、交往(同期同泳道的交流事件 + 轨迹站点)、照片、视频、正文密度(每百字具体物:阿拉伯数字/中文数字/站内专名;v285 起中文数字才算进来)
 * 维度(城市):经过它的色带数(分组依据)、总结段字数、古称条数、古迹条数、照片、视频、小段覆盖率、小段均长、小段密度
 */
const D = require('./load')();
const { CIVS, CHRONO, GL, PEOPLE, ACHV, EVENTS, TRACES, CIV_PHOTO, VIDEO, GEO, GEO_CITY, PLACE_LORE, CITY_LORE, CITY_NAMES, CITY_SITES, CITY_PHOTO, CITY_VIDEO } = D;
const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');
const nArg = args.find(a => /^\d+$/.test(a));
const TOP = nArg ? +nArg : 20;
const ONE = args.find(a => !a.startsWith('--') && !/^\d+$/.test(a));
/* 期望随分量走(2026-08-18 Ray 校准:秦、西晋这种分量的朝代,「组内不垫底」不等于够):
   大档带看到组内后 35% 就算薄、中档 25%、小档 15%;分数也按档放大。城市按经过的带数分档同理。 */
const BOTTOM_OF = { 大: 0.35, 中: 0.25, 小: 0.15 };
const TIER_W = { 大: 1.5, 中: 1.25, 小: 1 };

/* ── 具体物词典:年份/数字 + 站内专名(文明名、城市名、人物名、成就名)──────────────── */
const NAMES = new Set([...CIVS.map(c => c.n), ...GEO_CITY.map(g => g[0]), ...Object.keys(PEOPLE), ...Object.keys(ACHV)]);
const nameRe = new RegExp([...NAMES].filter(n => n.length >= 2).map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
const zhOf = v => Array.isArray(v) ? (v[0] || '') : (typeof v === 'string' ? v : '');
/* 每百字里有几个「具体的东西」:阿拉伯数字、**中文数字**、站内专名。
   「税关尽在其手」= 0,「1573 年广州第一船白银」= 2.5,「四十字诏,广五十步」= 4.4。
   ⚠ v285(2026-08-22)起把中文数字也算进来。此前只认 /\d{2,4}/,系统性低估了用中文数字写的带——
   秦的正文里「四十字诏」「广五十步」「七百多公里」全是硬锚点,一个都没被看见:密度 1.0 → 2.3。
   **但要说清楚:这不等于此前「冤枉」了秦。** 秦同组(ea·大)的唐、清、明也全用中文数字,一起涨,
   秦的组内百分位 0% → 0%,还是垫底——相对指标本该如此。真正改变相对位置的,是那些**与写法不同的带
   同组竞争**的:古埃及(me·中)25% → 81%、唐(ea·大)29% → 71%。改这条的理由是「量准」,不是「翻案」。
   代价:重排。文明 172 条里 43 条移动 >=15 个百分点,城市 127 座里 18 座(14%)同样移动;
   下降的那些(奥地利·哈布斯堡 2.3→2.3、暹罗 2.4→2.4)密度数值其实没变,只是别人涨上来把它们顶下去了。
   **v285 之前 CHANGELOG 里记过的密度数字与之后不可比。**
   误判量过:全站 1399 处中文数字串里,非计量的只有「一两」×2、「一一」×6,合计 0.6%,可忽略。 */
const CN_NUM = /[零一二两三四五六七八九十百千万亿]{2,}/g;
/* v370:绝对锚点数——密度是比值,写得长会被稀释;这个数不受篇幅影响,专门用来给密度当闸门(见下面 W_CIV 旁注)。 */
const anchors = txt => { if (!txt) return 0; return (txt.match(/\d{2,4}/g) || []).length + (txt.match(CN_NUM) || []).length + (txt.match(nameRe) || []).length; };
const density = txt => { if (!txt) return 0; const nums = (txt.match(/\d{2,4}/g) || []).length; const cn = (txt.match(CN_NUM) || []).length; const names = (txt.match(nameRe) || []).length; return +(100 * (nums + cn + names) / txt.length).toFixed(1); };

/* ── 文明体检 ─────────────────────────────────────────────────────────────── */
const peopleByCiv = {}; for (const [n, p] of Object.entries(PEOPLE)) (peopleByCiv[p.c] = peopleByCiv[p.c] || []).push(n);
const achvByCiv = {}; for (const [n, a] of Object.entries(ACHV)) (achvByCiv[a.c] = achvByCiv[a.c] || []).push(n);
/* v370:全站具体物数的中位,给密度闸门用(实算,不写死——写死数字是这个项目栽过两次的坑)。 */
let ANCHOR_MED = 0;
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
      六问最短格: Math.min(...qTexts.map(t => t.length)),
      鼎盛段数: gl.length,
      鼎盛非短段数: gl.filter(g => zhOf(g.d).length > 20).length,
      人物数: (peopleByCiv[c.n] || []).length,
      成就卡数: (achvByCiv[c.n] || []).length,
      交往: exch,
      照片: (CIV_PHOTO[c.n] || []).length,
      视频: (VIDEO[c.n] || []).length,
      正文密度: density(body),
      具体物数: anchors(body),
    },
  };
});

{ const a = civRows.map(r => r.dims.具体物数).filter(v => v !== undefined).sort((x, y) => x - y);
  ANCHOR_MED = a.length ? a[Math.floor(a.length / 2)] : 0; }

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

/* ── 三层权重 ─────────────────────────────────────────────────────────────── */
const W_CIV = { 大事记条数: 3, 六问字数: 2, 六问最短格: 3, 鼎盛段数: 3, 鼎盛非短段数: 3, 正文密度: 3,
                大事记描述率: 1, 六问非空格数: 1, 交往: 1,
                人物数: 0, 成就卡数: 0, 照片: 0, 视频: 0, 具体物数: 0 };   // 0 = 不参与判薄(人物/成就走绝对缺口,照片/视频走素材缺口)
const W_CITY = { 总结段字数: 3, 古迹条数: 3, 小段覆盖率: 3, 小段均长: 3, 小段密度: 3, 古称条数: 0.5, 照片: 0, 视频: 0 };
/* 人物留空名单直接读 audit.js 里的 FIGURES_NA,不另抄一份 */
const FIGURES_NA = (() => { try { const src = require('fs').readFileSync(require('path').join(__dirname, 'audit.js'), 'utf-8');
  const m = src.match(/const FIGURES_NA = \[([\s\S]*?)\];/); return new Set(eval('[' + m[1] + ']')); } catch (e) { return new Set(); } })();

/* ── 组内百分位 ───────────────────────────────────────────────────────────── */
function rank(rows, groupOf, fallbackOf, W) {
  const groups = {}; rows.forEach(r => (groups[groupOf(r)] = groups[groupOf(r)] || []).push(r));
  const fb = {}; rows.forEach(r => (fb[fallbackOf(r)] = fb[fallbackOf(r)] || []).push(r));
  for (const r of rows) {
    let g = groups[groupOf(r)]; if (g.length < 6) g = fb[fallbackOf(r)];
    r.group = groupOf(r) + (g === groups[groupOf(r)] ? '' : '(退到全站同档)'); r.groupSize = g.length;
    r.pct = {}; r.thin = []; r.score = 0;
    for (const d of Object.keys(r.dims)) {
      const vals = g.map(x => x.dims[d]);
      const below = vals.filter(v => v < r.dims[d]).length, eq = vals.filter(v => v === r.dims[d]).length;
      const p = (below + eq / 2) / vals.length;   // 并列取中位,免得全 0 的维度把整组都判薄
      r.pct[d] = +p.toFixed(2);
      const distinct = new Set(vals).size;
      // 存续不到百年的带(秦 15 年、西晋 51 年)大事记条数和交往天然少,这两维不判薄
      const shortSpan = r.span !== undefined && r.span < 100 && (d === '大事记条数' || d === '交往');
      /* v370:正文密度的闸门(Ray 2026-09-05 拍板改判据)。
         密度 = 每百字几个具体物,是**比值**:补厚时写的叙事段落让分子分母一起涨,比值反而掉——
         v368 之后西葡密度 2.1 却有 54 个具体物,比密度 2.8、正文只有 1416 字的唐还多三成,
         却被判「薄」,而唐不算。要把这个数拉上去只能删掉叙事的连接句、把正文压成条目式,
         正好撞铁律「可读优先于精确」;它又是组内百分位,十九条带里永远有垫底的,清不空。
         **改法不是不看密度,是给它加一条绝对闸门**:只有当这条带的具体物**绝对数**也低于全站中位数时,
         密度低才算薄。密度回答「这段话有没有货」,绝对数回答「这条带一共有多少货」——
         两个都低才是真薄(印度河文明 870 字只有 4 个锚点),只有比值低是文体差异,不是欠账。
         2026-09-05 实测:全站锚点数中位 22;加闸门前判薄 130 条带、密度维度出现 41 次,加闸门后 124 条、
         密度 33 次——放行的 8 条正是 v367/v368 补厚过的长文带与同类叙事体(西葡与莫卧儿的薄维度归零),
         而印度河文明(870 字只有 4 个锚点)照旧判薄,说明闸门没有把真信号一起筛掉。 */
      const denseGate = d === '正文密度' && r.dims.具体物数 !== undefined && r.dims.具体物数 > ANCHOR_MED;
      const w = W[d] ?? 1;
      const BOTTOM = BOTTOM_OF[r.tier];
      if (w > 0 && p <= BOTTOM && distinct > 1 && r.dims[d] < Math.max(...vals) && !shortSpan && !denseGate) { r.thin.push(d); r.score += TIER_W[r.tier] * w * (BOTTOM - p + 0.05); }
    }
    // 绝对缺口:不看组
    r.gaps = [];
    if ('人物数' in r.dims && r.dims.人物数 === 0 && !FIGURES_NA.has(r.n)) r.gaps.push('无人物');
    if ('成就卡数' in r.dims && r.dims.成就卡数 === 0) r.gaps.push('无成就卡');
    if ('鼎盛非短段数' in r.dims && r.tier !== '小' && r.dims.鼎盛非短段数 < 2) r.gaps.push('鼎盛不足');
    r.media = [];
    if (r.dims.照片 === 0) r.media.push('无照片');
    if (r.dims.视频 === 0) r.media.push('无视频');
  }
  return rows;
}
rank(civRows, r => `${r.lane}·${r.tier}`, r => r.tier, W_CIV);
rank(cityRows, r => `${r.tier}城`, r => '全站', W_CITY);

/* ── 输出 ─────────────────────────────────────────────────────────────────── */
const bar = p => '▁▂▃▄▅▆▇█'[Math.min(7, Math.floor(p * 8))];
const fmtRow = r => `${r.n.padEnd(14, '　')} ${r.thin.map(d => `${d}${bar(r.pct[d])}(${r.dims[d]})`).join('  ')}`;

if (JSON_OUT) { console.log(JSON.stringify({ civs: civRows, cities: cityRows })); process.exit(0); }

if (ONE) {
  const r = civRows.find(x => x.n === ONE) || cityRows.find(x => x.n === ONE);
  if (!r) { console.error(`depth: 找不到「${ONE}」`); process.exit(2); }
  const pool = civRows.includes(r) ? civRows : cityRows;
  console.log(`${r.n} · 组「${r.group}」共 ${r.groupSize} 条 · 薄维度 ${r.thin.length ? r.thin.join('/') : '无'}${r.gaps.length ? ' · 绝对缺口:' + r.gaps.join('/') : ''}${r.media.length ? ' · 素材:' + r.media.join('/') : ''}`);
  for (const d of Object.keys(r.dims)) console.log(`  ${bar(r.pct[d])} ${String(d).padEnd(8, '　')} ${String(r.dims[d]).padStart(6)}   组内百分位 ${Math.round(r.pct[d] * 100)}%${r.thin.includes(d) ? '  ← 薄' : ''}`);
  const peers = pool.filter(x => x.group.startsWith(r.group.replace(/\(.*\)$/, '')) && x !== r).sort((a, b) => a.thin.length - b.thin.length || b.dims[Object.keys(r.dims)[0]] - a.dims[Object.keys(r.dims)[0]]).slice(0, 3);
  if (peers.length) { console.log('  同组最厚三条(参照):'); peers.forEach(p => console.log(`    ${p.n}: ${Object.entries(p.dims).map(([k, v]) => `${k} ${v}`).join(' · ')}`)); }
  process.exit(0);
}

const thinCivs = civRows.filter(r => r.thin.length).sort((a, b) => b.score - a.score);
const thinCities = cityRows.filter(r => r.thin.length).sort((a, b) => b.score - a.score);
console.log(`depth: ${civRows.length} 带 / ${cityRows.length} 城。「薄」只看正文层(权重见文件头);人物/成就卡走绝对缺口,照片/视频走素材缺口。\n`);
console.log(`── 文明 · 正文薄(${thinCivs.length} 条,列最薄 ${TOP};▁ 最薄 … █ 最厚,括号里是原值)──`);
thinCivs.slice(0, TOP).forEach(r => console.log(fmtRow(r) + `   [组 ${r.group}]`));
console.log(`\n── 城市 · 正文薄(${thinCities.length} 座,列最薄 ${TOP})──`);
thinCities.slice(0, TOP).forEach(r => console.log(fmtRow(r) + `   [${r.hits} 带经过]`));
const noPeople = civRows.filter(r => r.gaps.includes('无人物')), noAchv = civRows.filter(r => r.gaps.includes('无成就卡'));
const glShort = civRows.filter(r => r.gaps.includes('鼎盛不足'));
console.log(`\n── 绝对缺口 ──`);
console.log(`  鼎盛不足(大/中档而非短段 <2)${glShort.length} 条:${glShort.map(r => r.n).join('、')}`);
console.log(`  无人物(留空名单外)${noPeople.length} 条:${noPeople.map(r => r.n).join('、')}`);
console.log(`  无成就卡 ${noAchv.length} 条(先补影响力大的):${noAchv.filter(r => r.tier === '大').map(r => r.n).join('、')}${noAchv.filter(r => r.tier === '大').length ? ' …' : ''}(大档 ${noAchv.filter(r => r.tier === '大').length} / 中档 ${noAchv.filter(r => r.tier === '中').length} / 小档 ${noAchv.filter(r => r.tier === '小').length})`);
console.log(`\n── 素材缺口(慢慢补,不算薄)──`);
console.log(`  文明:无照片 ${civRows.filter(r => r.media.includes('无照片')).length} · 无视频 ${civRows.filter(r => r.media.includes('无视频')).length}    城市:无照片 ${cityRows.filter(r => r.media.includes('无照片')).length} · 无视频 ${cityRows.filter(r => r.media.includes('无视频')).length}`);
