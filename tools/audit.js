#!/usr/bin/env node
/* 文明长河 — 数据结构校验
 * 用法(在仓库根目录): node tools/audit.js
 * 自包含:直接从 index.html 抽数据表,不依赖任何临时文件或外部依赖。
 * 退出码 0 = 全通过,1 = 发现问题。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 抽出 <script> 里从 LANES 到 TRACES 结束的整段常量声明;LAND 是压缩海岸线,体量大且与校验无关,剔除。
const script = src.slice(src.indexOf('<script>') + 8, src.lastIndexOf('</script>'));
const start = script.indexOf('const LANES');
const tracesAt = script.indexOf('const TRACES');
if (start < 0 || tracesAt < 0) { console.error('抽取失败:找不到 LANES 或 TRACES 声明'); process.exit(1); }
const after = script.slice(tracesAt);
const end = tracesAt + after.indexOf('\n];') + 3;
const body = script.slice(start, end).split('\n').filter(l => !l.startsWith('const LAND')).join('\n');

const ctx = {};
vm.createContext(ctx);
const PICK = '({LANES,SPHERES,CIVS,EVENTS,GEO,CHRONO,GL,CHRONO_X,EN,TRACES,ERAS,PLACE,VIDEO})';
let D;
try { vm.runInContext(body, ctx); D = vm.runInContext(PICK, ctx); } catch (e) {
  console.error('数据段解析失败:', e.message); process.exit(1);
}
const { LANES, CIVS, EVENTS, GEO, CHRONO, GL, CHRONO_X, EN, TRACES, PLACE, VIDEO } = D;

const P = [];
const KINDS = ['econ', 'art', 'tech', 'thought'];

CIVS.forEach(c => {
  const y0 = c.k[0][0], y1 = c.k[c.k.length - 1][0];

  // k 关键帧:首帧影响力必须为 0(色带左端收窄);末帧只有已消亡文明才需归零,
  // 存续至今的文明保持非 0 是刻意的(见 docs/DATA.md),故不校验末帧。
  if (c.k[0][1] !== 0) P.push(`[k首帧非0] ${c.n} = ${c.k[0][1]}`);
  for (let i = 1; i < c.k.length; i++) if (c.k[i][0] <= c.k[i - 1][0]) P.push(`[k年份未递增] ${c.n} @${c.k[i][0]}`);

  if (!EN.civ[c.n]) P.push(`[缺英文 EN.civ] ${c.n}`);
  if (!GEO[c.n]) P.push(`[缺版图 GEO] ${c.n}`);

  // CHRONO 与 EN.chrono 按索引对齐,数量必须一致
  const zh = CHRONO[c.n] || [], en = (EN.chrono || {})[c.n] || [];
  if (zh.length !== en.length) P.push(`[大事记中英数量不等] ${c.n}: zh=${zh.length} en=${en.length}`);
  zh.forEach(it => { if (it[0] < y0 || it[0] > y1) P.push(`[大事记越界] ${c.n} ${it[0]} "${it[1]}" (色带 ${y0}~${y1})`); });
  for (let i = 1; i < zh.length; i++) if (zh[i][0] < zh[i - 1][0]) P.push(`[大事记未按年排序] ${c.n} @${zh[i][0]} "${zh[i][1]}"`);

  // CHRONO_X 双语内联,渲染时按年并入 CHRONO
  const x = CHRONO_X[c.n] || [];
  x.forEach(it => {
    if (it[0] < y0 || it[0] > y1) P.push(`[CHRONO_X 越界] ${c.n} ${it[0]} "${it[1][0]}" (色带 ${y0}~${y1})`);
    if (!Array.isArray(it[1]) || it[1].length !== 2 || !it[1][0] || !it[1][1]) P.push(`[CHRONO_X 标题非双语] ${c.n} ${it[0]}`);
    if (it[2] !== undefined && (!Array.isArray(it[2]) || it[2].length !== 2 || !it[2][0] || !it[2][1])) P.push(`[CHRONO_X 描述非双语] ${c.n} ${it[0]}`);
  });
  for (let i = 1; i < x.length; i++) if (x[i][0] < x[i - 1][0]) P.push(`[CHRONO_X 未按年排序] ${c.n} @${x[i][0]}`);
  const zy = new Set(zh.map(i => i[0]));
  x.forEach(it => { if (zy.has(it[0])) P.push(`[CHRONO_X 与 CHRONO 同年重复] ${c.n} ${it[0]} "${it[1][0]}"`); });

  // GL 鼎盛区间
  (GL[c.n] || c.gl || []).forEach(g => {
    if (g.a < y0 || g.b > y1) P.push(`[鼎盛区间越界] ${c.n} ${g.a}~${g.b} ${g.t[0]} (色带 ${y0}~${y1})`);
    if (g.a >= g.b) P.push(`[鼎盛区间 a>=b] ${c.n} ${g.a}~${g.b}`);
    if (!KINDS.includes(g.k)) P.push(`[鼎盛区间 k 非法] ${c.n} "${g.k}" 应为 ${KINDS.join('/')}`);
    if (!Array.isArray(g.t) || g.t.length !== 2 || !g.t[0] || !g.t[1]) P.push(`[鼎盛区间标题非双语] ${c.n} ${g.a}`);
    if (!Array.isArray(g.d) || g.d.length !== 2 || !g.d[0] || !g.d[1]) P.push(`[鼎盛区间描述非双语] ${c.n} ${g.a}`);
  });
});

// 按名索引的补充表里,键必须对得上现有文明名(拆分色带后最容易留下孤儿键)
const names = new Set(CIVS.map(c => c.n));
[['GEO', GEO], ['CHRONO', CHRONO], ['GL', GL], ['CHRONO_X', CHRONO_X], ['EN.chrono', EN.chrono || {}], ['EN.civ', EN.civ]]
  .forEach(([k, o]) => Object.keys(o).filter(n => !names.has(n)).forEach(n => P.push(`[孤儿键 ${k}] ${n}`)));

// PLACE:"中心"里出现的每个古地名都要能换算出今属何处,否则该文明的卡片上就少一行
const SPLIT = /[、,;；→]/;
const placeUsed = new Set();
CIVS.forEach(c => {
  const v = c.f && c.f['中心']; if (!v) { P.push(`[缺"中心"字段] ${c.n}`); return; }
  v.split(SPLIT).map(s => s.trim()).filter(Boolean).forEach(p => {
    if (PLACE[p]) placeUsed.add(p); else P.push(`[PLACE 缺古地名] "${p}" ← ${c.n}`);
  });
  // 中英"中心"的地点数必须一致,否则英文卡片会漏掉某个都城
  const en = EN.civ[c.n] && EN.civ[c.n].f && (EN.civ[c.n].f['Center'] || EN.civ[c.n].f['Centre']);
  if (en) {
    const nz = v.split(SPLIT).filter(s => s.trim()).length, ne = en.split(SPLIT).filter(s => s.trim()).length;
    if (nz !== ne) P.push(`[中心中英地点数不等] ${c.n}: zh=${nz} en=${ne}`);
  }
});
Object.keys(PLACE).forEach(k => {
  if (!placeUsed.has(k)) P.push(`[PLACE 孤儿条目] "${k}" 没有任何文明引用(多半是写法对不上)`);
  const t = PLACE[k];
  if (!Array.isArray(t) || (t.length !== 2 && t.length !== 4)) P.push(`[PLACE 格式错] "${k}" 应为 2 项或 4 项`);
  else if (t.some(x => !x)) P.push(`[PLACE 有空值] "${k}"`);
});

// VIDEO:键必须是现有文明,每条要有 b 或 y,格式合法,标题双语
for (const [k, arr] of Object.entries(VIDEO || {})) {
  if (!names.has(k)) P.push(`[VIDEO 孤儿键] ${k}`);
  if (!Array.isArray(arr)) { P.push(`[VIDEO 非数组] ${k}`); continue; }
  arr.forEach((v, i) => {
    if (!v.b && !v.y) P.push(`[VIDEO 无 b 也无 y] ${k}#${i}`);
    if (v.b && !/^BV[0-9A-Za-z]{10}$/.test(v.b)) P.push(`[VIDEO BV 格式可疑] ${k} "${v.b}"`);
    if (v.y && !/^[\w-]{11}$/.test(v.y)) P.push(`[VIDEO YouTube ID 格式可疑] ${k} "${v.y}"`);
    if (!Array.isArray(v.t) || v.t.length !== 2 || !v.t[0] || !v.t[1]) P.push(`[VIDEO 标题非双语] ${k}#${i}`);
  });
}

if (EN.events && EN.events.length !== EVENTS.length) P.push(`[事件中英数量不等] zh=${EVENTS.length} en=${EN.events.length}`);
const laneIds = new Set(LANES.map(l => l.id));
CIVS.forEach(c => { if (!laneIds.has(c.l)) P.push(`[泳道 id 不存在] ${c.n} → ${c.l}`); });
EVENTS.forEach(e => e.ls.forEach(l => { if (!laneIds.has(l)) P.push(`[事件泳道 id 不存在] ${e.n} → ${l}`); }));

console.log(P.length ? P.join('\n') : '✅ 结构校验全通过');

const nChrono = Object.values(CHRONO).reduce((s, a) => s + a.length, 0);
const nX = Object.values(CHRONO_X).reduce((s, a) => s + a.length, 0);
const nGL = Object.values(GL).reduce((s, a) => s + a.length, 0) + CIVS.filter(c => c.gl).reduce((s, c) => s + c.gl.length, 0);
console.log(`\n文明 ${CIVS.length} · 大事记 ${nChrono + nX}(CHRONO ${nChrono} + CHRONO_X ${nX}) · GL ${nGL} 段,覆盖 ${CIVS.filter(c => GL[c.n] || c.gl).length}/${CIVS.length} · 事件 ${EVENTS.length} · 轨迹 ${TRACES.length}`);
console.log('各泳道大事记:' + LANES.map(l => {
  const cs = CIVS.filter(c => c.l === l.id);
  return `${l.name} ${cs.reduce((s, c) => s + (CHRONO[c.n] || []).length + (CHRONO_X[c.n] || []).length, 0)}`;
}).join(' · '));

process.exit(P.length ? 1 : 0);
