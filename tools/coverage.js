/* 地点小段(PLACE_LORE)覆盖率盘点。用法:node tools/coverage.js [城市名]
   给出每座城「点得到的朝代数」与「已有手写内容的数」,按缺口排序。
   写新一批 lore 前先跑这个,别凭印象挑城(2026-08-09 起沿用)。
   数据经 tools/load.js 加载(Phase 3)——原先用正则从 index.html 抽表,
   在缩进上栽过一次(固定两空格的正则抽出 0 个键,盘点全是「零覆盖」);
   现在直接拿对象键,那类坑不存在了。 */
const { GEO, GEO_CITY, PLACE_LORE } = require('./load')();
const KEYS = new Set(Object.keys(PLACE_LORE));
const pip = (x, y, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; };
const only = process.argv[2];
const rows = GEO_CITY.map(([zh, , lon, lat]) => {
  const hit = Object.keys(GEO).filter(k => GEO[k].p && GEO[k].p.some(p => pip(lon, lat, p)));
  return { zh, tot: hit.length, have: hit.filter(h => KEYS.has(zh + '|' + h)).length, miss: hit.filter(h => !KEYS.has(zh + '|' + h)) };
}).sort((a, b) => (b.tot - b.have) - (a.tot - a.have) || b.tot - a.tot);
if (only) { const r = rows.find(x => x.zh === only); console.log(r ? `${r.zh} ${r.have}/${r.tot}` + (r.miss.length ? `\n缺:${r.miss.join(' ')}` : ' ✅ 满') : '没有这座城'); process.exit(0); }
console.log(`条目 ${KEYS.size} · 城市 ${rows.length} · 全满 ${rows.filter(r => r.have === r.tot).length} · 总缺口 ${rows.reduce((s, r) => s + r.tot - r.have, 0)}`);
console.log('\n缺口最大的 20 座:');
rows.slice(0, 20).forEach(r => console.log(`  ${r.zh.padEnd(7)} ${r.have}/${r.tot}  缺 ${r.tot - r.have}`));
