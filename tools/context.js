#!/usr/bin/env node
/* 文明长河 — 写作前把「站内已经有什么」摊在眼前(2026-08-18 立)
 *
 * 为什么存在:核查员统计过,必修里一半以上是「站内某处早写对了,新文案写错或把对冲删掉了」,
 * 以及同一座城的故事在四条带里讲四遍。HANDOFF 把这条教训扩成三层——
 *   ① 同卡自己的 b/d/f/q/qh/GL/chrono/人物/成就卡
 *   ② 同城其他年代的 place_lore
 *   ③ 同城不同带的段落
 * 教训写在文件里没用,要在动笔那一刻摊在眼前。这个脚本就是干这个的:一条命令把三层全打出来。
 *
 * 用法:node tools/context.js 秦            文明:三层全打
 *      node tools/context.js 香港          城市:六层内容 + 经过它的每条带在别处怎么写它
 *      node tools/context.js 秦 --brief    只打中文、省略英文对照(快速扫一眼)
 * 末尾附 depth.js 的体检行(薄在哪、同组参照),和 audit SETTLED 哨兵里与它相关的裁决。
 */
const D = require('./load')();
const fs = require('fs'), path = require('path');
const { CIVS, CHRONO, GL, PEOPLE, ACHV, GEO, GEO_CITY, PLACE_LORE, CITY_LORE, CITY_NAMES, CITY_SITES, CITY_PHOTO, CITY_VIDEO, CIV_PHOTO, VIDEO, PLACE } = D;
const args = process.argv.slice(2);
const BRIEF = args.includes('--brief');
const NAME = args.find(a => !a.startsWith('--'));
if (!NAME) { console.error('用法:node tools/context.js <文明名|城市名> [--brief]'); process.exit(2); }

const pair = v => Array.isArray(v) ? (BRIEF ? v[0] : `${v[0]}\n      EN: ${v[1] || '(空)'}`) : (v ?? '(空)');
const fmtY = y => y < 0 ? `前${-y}` : `${y}`;
const H = t => console.log(`\n══ ${t} ══`);
const pip = (lon, lat, poly) => { let inside = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside; } return inside; };
const civsAt = (lon, lat) => CIVS.filter(c => { const g = GEO[c.n]; return g && g.p && g.p.some(p => pip(lon, lat, p)); });

/* audit 里已裁决的措辞哨兵(SETTLED),把 why 里提到本名字的列出来 */
function settledFor(name) {
  try { const src = fs.readFileSync(path.join(__dirname, 'audit.js'), 'utf-8');
    const m = src.match(/const SETTLED = \[([\s\S]*?)\n\];/); if (!m) return [];
    return [...m[1].matchAll(/\[\/(.+?)\/[a-z]*,\s*'([^']*)'\]/g)].map(x => ({ re: x[1], why: x[2] })).filter(x => x.why.includes(name) || x.re.includes(name));
  } catch (e) { return []; }
}
function depthLine(name) {
  try { const r = require('child_process').spawnSync(process.execPath, [path.join(__dirname, 'depth.js'), name], { encoding: 'utf-8' });
    return r.stdout.split('\n').filter(l => l.trim()).slice(0, 1 + (BRIEF ? 0 : 20)).join('\n'); } catch (e) { return ''; }
}

const civ = CIVS.find(c => c.n === NAME);
/* v381 --find:按一样东西的名字直查全库的城市小段与城市总结段,打全文。
   由来:2026-09-06 两轮核查各抓到一次「跨带撞车」——德里铁柱与撒马尔罕的六分仪弧槽,
   两处都写在**别条带**的 place_lore 里,而第③节只列首句、看不见。
   量过两条检测路线都装不成规则(见 CHANGELOG v381),所以不做检测,做直查。 */
if (args.includes('--find')) {
  const kw = args[args.indexOf('--find') + 1];
  if (!kw) { console.error('用法: node tools/context.js --find <词>'); process.exit(2); }
  let n = 0;
  console.log(`# 全库直查「${kw}」—— 城市小段 place_lore\n`);
  for (const k of Object.keys(PLACE_LORE)) if (PLACE_LORE[k][0].includes(kw)) { n++; console.log(`【${k}】${PLACE_LORE[k][0]}\n`); }
  console.log(`# 城市总结段 city_lore\n`);
  for (const k of Object.keys(CITY_LORE)) { const v = CITY_LORE[k]; const t = Array.isArray(v) ? v[0] : v; if (String(t).includes(kw)) { n++; console.log(`【${k}】${t}\n`); } }
  console.log(`共 ${n} 处。鼎盛段/六问/人物卡/成就卡里的同名内容用 grep: grep -n "${kw}" data/*.js`);
  process.exit(0);
}

const cityIdx = GEO_CITY.findIndex(g => g[0] === NAME);

if (civ) {
  const y0 = civ.k[0][0], y1 = civ.k[civ.k.length - 1][0];
  console.log(`# ${civ.n}(${civ.e?.n || ''}) ${fmtY(y0)}—${fmtY(y1)} · 泳道 ${civ.l} · 圈 ${civ.s}`);
  H('① 同卡 · 一句话 b / 叙述 d');
  console.log('b: ' + civ.b); if (!BRIEF && civ.e?.b) console.log('   EN: ' + civ.e.b);
  console.log('d: ' + (civ.d || '(缺,渲染会静默回退到 b)')); if (!BRIEF && civ.e?.d) console.log('   EN: ' + civ.e.d);
  H('① 同卡 · 速览 f');
  for (const [k, v] of Object.entries(civ.f || {})) console.log(`${k}: ${v}`);
  if (!BRIEF) for (const [k, v] of Object.entries(civ.e?.f || {})) console.log(`  EN ${k}: ${v}`);
  H('① 同卡 · 六问 q(钩子 qh 在括号里)');
  for (const k of ['born', 'rule', 'money', 'power', 'fall', 'legacy']) {
    const q = civ.q?.[k], qh = civ.qh?.[k];
    console.log(`[${k}] (钩子:${qh ? qh[0] : '无'})\n  ${pair(q)}`);
  }
  H(`① 同卡 · 鼎盛区间 GL(${(GL[civ.n] || civ.gl || []).length} 段)`);
  for (const g of (GL[civ.n] || civ.gl || [])) console.log(`${fmtY(g.a)}—${fmtY(g.b)} [${g.k}] ${g.t[0]}: ${pair(g.d)}`);
  const ch = CHRONO[civ.n] || [];
  H(`① 同卡 · 大事记 CHRONO(${ch.length} 条)`);
  for (const it of ch) console.log(`${fmtY(it[0])} ${it[1][0]}${it[2] && it[2][0] ? ' —— ' + it[2][0] : ''}${!BRIEF && it[2] && it[2][1] ? '\n      EN: ' + it[2][1] : ''}`);
  const ppl = Object.entries(PEOPLE).filter(([, p]) => p.c === civ.n);
  H(`① 同卡 · 人物(${ppl.length})`);
  for (const [n, p] of ppl) console.log(`${n}: ${p.t ? p.t[0] : ''}${p.a ? ' | ' + p.a.map(a => a[0]).join(' / ') : ''}`);
  const ach = Object.entries(ACHV).filter(([, a]) => a.c === civ.n);
  H(`① 同卡 · 成就卡(${ach.length})`);
  for (const [n, a] of ach) {
    console.log(`${n}: ${a.t ? a.t[0] : ''}`);
    /* v381:要点也打出来。鼎盛段最容易重讲的就是这三条(2026-09-06 帖木儿那段
       把「兀鲁伯天文台」的三条要点按同一顺序讲了一遍,而这里当时只打了 t)。
       全站最长的一条带(古希腊 5 张)放开后约 1200 字,代价可以忽略。 */
    if (a.a) a.a.forEach(x => console.log(`    · ${x[0]}`));
  }
  console.log(`\n照片 ${(CIV_PHOTO[civ.n] || []).length} 张 · 视频 ${(VIDEO[civ.n] || []).length} 条`);

  const cities = GEO_CITY.map((g, i) => [g, i]).filter(([g]) => { const p = GEO[civ.n]; return p && p.p && p.p.some(poly => pip(g[2], g[3], poly)); });
  H(`② 本带版图内的城 · 本带自己的地点小段(${cities.length} 城)`);
  for (const [g] of cities) { const l = PLACE_LORE[g[0] + '|' + civ.n]; console.log(`${g[0]}|${civ.n}: ${l ? pair(l) : '(无小段)'}`); }
  H('③ 同城不同带 · 这些城在别的带里怎么写(只列带名与首句;要全文 context.js <城市名>,或按东西名直查 --find)');
  for (const [g] of cities) {
    const others = civsAt(g[2], g[3]).filter(c => c.n !== civ.n).map(c => { const l = PLACE_LORE[g[0] + '|' + c.n]; return l ? `${c.n}「${l[0].slice(0, 28)}…」` : null; }).filter(Boolean);
    if (others.length) console.log(`${g[0]}: ${others.join(' / ')}`);
  }
  /* v381:上面每条只截 28 字,而真正会撞车的那句常常在 28 字之后——德里铁柱(2026-09-06)
     与撒马尔罕的六分仪弧槽(同日)两次都是这样,判词原话是「跨带的同一件实物没有任何
     一条工具链路会把它并排放」。放开全文最长的带要 3 万字,太贵;改成按东西的名字直查。 */
  console.log(`\n  ⚠ 要写某样具体的东西(一根柱子、一座台、一件出土物)之前,先跑:node tools/context.js --find <那样东西的名字>`);
} else if (cityIdx >= 0) {
  const g = GEO_CITY[cityIdx];
  console.log(`# ${g[0]}(${g[1]}) ${g[2]}, ${g[3]}`);
  H('总结段 city_lore'); console.log(pair(CITY_LORE[g[0]]) || '(无)');
  H('古称 city_names'); for (const n of (CITY_NAMES[g[0]] || [])) console.log(`${n.n[0]}(${n.n[1]}) ${fmtY(n.a)}—${fmtY(n.b)}`);
  H('古迹 city_sites'); for (const s of (CITY_SITES[g[0]] || [])) console.log(`${s.n[0]}(${s.n[1]}) ${fmtY(s.y)} · ${s.e ? s.e[0] : ''}`);
  console.log(`\n照片 ${(CITY_PHOTO[g[0]] || []).length} 张 · 视频 ${(CITY_VIDEO[g[0]] || []).length} 条`);
  const bands = civsAt(g[2], g[3]);
  H(`经过它的 ${bands.length} 条带 · 各自的地点小段(按年代)`);
  for (const c of bands.sort((a, b) => a.k[0][0] - b.k[0][0])) { const l = PLACE_LORE[g[0] + '|' + c.n]; console.log(`${fmtY(c.k[0][0])}—${fmtY(c.k[c.k.length - 1][0])} ${c.n}: ${l ? pair(l) : '(无小段)'}`); }
  H('别的地方提到这座城的字段(civs 速览「中心」/ 人物 / 成就卡)');
  for (const c of CIVS) if ((c.f?.['中心'] || '').includes(g[0])) console.log(`${c.n} 中心: ${c.f['中心']}`);
  for (const [n, p] of Object.entries(PEOPLE)) if (JSON.stringify(p).includes(g[0])) console.log(`人物 ${n}(${p.c})`);
  for (const [n, a] of Object.entries(ACHV)) if (JSON.stringify(a).includes(g[0])) console.log(`成就卡 ${n}(${a.c})`);
} else { console.error(`context: 找不到「${NAME}」(既不是文明名也不是城市名)`); process.exit(2); }

const st = settledFor(NAME);
H(`audit SETTLED 哨兵里与「${NAME}」有关的裁决(${st.length})`);
st.forEach(x => console.log(`/${x.re}/ —— ${x.why}`));
H('depth 体检'); console.log(depthLine(NAME));
