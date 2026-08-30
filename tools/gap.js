/* 城市时间断层诊断。用法:node tools/gap.js [阈值,默认150] [城市名]
   对每座 GEO_CITY 求「被任一文明版图盖住」的年份并集,列出内部空档 > 阈值 的城。
   B 类补带的选题就靠它:先跑拿名单,再判断该补哪条带;补完再跑一次看清没清零。

   ⚠ 两个已经踩过的坑(2026-08-16,详见 HANDOFF「断层诊断脚本的两个漏洞」):
   ① 找候选带时**不要用外接框**——「外接框根本没框住」的真画歪会被漏掉
      (敦煌 420—581 曾因此被误判成「站内根本没这段的带」,而 `南北朝` 那条带
      明明存在、只是西界没画到河西走廊)。改判据:时间重叠 + 该带中心点 c 距这座城 < 2000km。
   ② audit 规则 36 的城市基线**只报丢失、不报新增**,而新增恰恰是「补画顺带吞掉
      不该吞的」那个病灶。补画后必须自己把 230 城基线的全部新增列出来逐条确认。
   ⚠ 第三个坑:CHANGELOG 里写「清零」之前,用这个脚本按 k>0.02 口径**真算一遍**。
      v241 与 v246 两次都把「清零/剩 N 年」写错了,而版本史是下一轮决策的依据。 */
/* ⚠ 有意留白·第二批(Ray 2026-08-30 拍板小断层清单,详见 CHANGELOG v343):
 *   非斯 476—622        —— 城 789 年才建,此段是柏柏尔部落与拜占庭边缘,史料黑洞
 *   汉皮 1206—1336      —— 曷萨拉王朝治下,为单城建带体量不足(记 IDEAS 候选)
 *   拉合尔 560—665      —— 嚈哒崩溃后小邦期,真黑洞(v329 拉合尔双带预研时已判)
 *   马六甲/新加坡/吉隆坡 1288—1400 —— 原方案「满者伯夷版图扩半岛」被 v235 反向探针拦下
 *     (马六甲苏丹国 1400 年起家于满者伯夷之衰,1400—1527 两带重叠会「点开看到错的国家」,
 *      探针判词在先,改留白;此改判待 Ray 追认)
 *
/* ⚠ 有意留白(Ray 2026-08-23 拍板,详见 CHANGELOG v331):
   - 摩亨佐达罗 前1300—前550 / 375—622:遗址前 1900 年已废弃,信德这两段是史料黑洞,硬画吠陀或萨珊都站不住
   - 卡霍基亚 1600—1776:清零要为一座废弃遗址城引入整条「新法兰西」殖民带,性价比过低
   这三处出现在本脚本输出里不是缺口,是决定;别再当选题拿。拉萨两处由「西藏诸政权」带处理(v333)。 */
const { GEO, GEO_CITY, CIVS } = require('./load')();
const TH = Number(process.argv[2]) || 150;
const ONLY = process.argv[3];
const NOW = 2025;
const pip = (x, y, p) => { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [xi, yi] = p[i], [xj, yj] = p[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; };
const km = (a, b, c, d) => { const R = 6371, r = Math.PI / 180; const dLat = (d - b) * r, dLon = (c - a) * r; const A = Math.sin(dLat / 2) ** 2 + Math.cos(b * r) * Math.cos(d * r) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(A)); };
/* 用 k 曲线首末年作为色带的存在区间(与 audit / 渲染同一口径) */
const SPAN = {}; for (const c of CIVS) if (c.k && c.k.length) SPAN[c.n] = [c.k[0][0], c.k[c.k.length - 1][0]];
const yr = y => y < 0 ? `前${-y}` : `${y}`;

const rows = [];
for (const [zh, en, lon, lat] of GEO_CITY) {
  if (ONLY && zh !== ONLY) continue;
  const hit = Object.keys(GEO).filter(k => GEO[k].p && SPAN[k] && GEO[k].p.some(p => pip(lon, lat, p)));
  if (!hit.length) { rows.push({ zh, gaps: [['—', '—', 0]], hit, note: '命中 0 条色带(规则 37 会报)' }); continue; }
  const iv = hit.map(k => [SPAN[k][0], SPAN[k][1]]).sort((a, b) => a[0] - b[0]);
  const m = []; for (const s of iv) { const l = m[m.length - 1]; if (l && s[0] <= l[1]) l[1] = Math.max(l[1], s[1]); else m.push([s[0], s[1]]); }
  const gaps = [];
  for (let i = 1; i < m.length; i++) { const g = m[i][0] - m[i - 1][1]; if (g > TH) gaps.push([m[i - 1][1], m[i][0], g]); }
  const tail = NOW - m[m.length - 1][1]; if (tail > TH) gaps.push([m[m.length - 1][1], NOW, tail]);
  rows.push({ zh, gaps, hit, merged: m, lon, lat });
}

if (ONLY) {
  const r = rows[0];
  if (!r) { console.log('没有这座城'); process.exit(1); }
  console.log(`${r.zh} —— 命中 ${r.hit.length} 条色带`);
  r.hit.map(k => [k, SPAN[k]]).sort((a, b) => a[1][0] - b[1][0]).forEach(([k, s]) => console.log(`  ${yr(s[0]).padStart(7)}—${yr(s[1]).padEnd(7)} ${k}`));
  console.log('并集:', (r.merged || []).map(x => `${yr(x[0])}—${yr(x[1])}`).join(' | '));
  console.log('断层:', r.gaps.length ? r.gaps.map(g => `${yr(g[0])}—${yr(g[1])}(${g[2]}年)`).join('  ') : `无(阈值 >${TH} 年)`);
  /* 候选带:不用外接框,按「时间重叠 + 中心点距离」找,见文件头 ⚠① */
  for (const [a, b] of r.gaps) {
    const cand = Object.keys(GEO).filter(k => SPAN[k] && !r.hit.includes(k) && GEO[k].c
      && Math.min(SPAN[k][1], b) - Math.max(SPAN[k][0], a) >= 50
      && km(r.lon, r.lat, GEO[k].c[0], GEO[k].c[1]) < 2000)
      .map(k => `${k}(${yr(SPAN[k][0])}—${yr(SPAN[k][1])},${Math.round(km(r.lon, r.lat, GEO[k].c[0], GEO[k].c[1]))}km)`);
    console.log(`  ${yr(a)}—${yr(b)} 的近处候选带:`, cand.length ? cand.slice(0, 6).join('  ') : '【近处一条都没有 = 确属真缺内容,要新建色带】');
  }
  process.exit(0);
}

const bad = rows.filter(r => r.gaps.length);
console.log(`阈值 >${TH} 年 · 城市 ${rows.length} · 有断层 ${bad.length} · 断层总数 ${bad.reduce((s, r) => s + r.gaps.length, 0)}\n`);
bad.sort((a, b) => Math.max(...b.gaps.map(g => g[2])) - Math.max(...a.gaps.map(g => g[2])));
bad.forEach(r => console.log(`${r.zh.padEnd(7)}${r.gaps.map(g => `${yr(g[0])}—${yr(g[1])}(${g[2]})`).join('  ')}`));
