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
const PICK = '({LANES,SPHERES,CIVS,EVENTS,GEO,CHRONO,GL,CHRONO_X,EN,TRACES,ERAS,PLACE,VIDEO,PEOPLE,PGLYPH,PGNAME,PEAK})';
let D;
try { vm.runInContext(body, ctx); D = vm.runInContext(PICK, ctx); } catch (e) {
  console.error('数据段解析失败:', e.message); process.exit(1);
}
const { LANES, CIVS, EVENTS, GEO, CHRONO, GL, CHRONO_X, EN, TRACES, PLACE, VIDEO, PEOPLE, PGLYPH, PGNAME, PEAK } = D;

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

// 人物:中英「人物」必须逐个对齐——linkNames 靠位置把英文名换回中文键,错位就会张冠李戴
const bi = (v, n) => Array.isArray(v) && v.length === 2 && v[0] && v[1] ? '' : n;
CIVS.forEach(c => {
  const z = c.f && c.f['人物']; if (!z) return;
  const ef = EN.civ[c.n] && EN.civ[c.n].f;
  const e = ef && (ef['Figures'] || ef['People']);
  if (!e) { P.push(`[缺英文 Figures] ${c.n}`); return; }
  const nz = z.split(SPLIT).filter(s => s.trim()).length, ne = e.split(SPLIT).filter(s => s.trim()).length;
  if (nz !== ne) P.push(`[人物中英条数不等] ${c.n}: zh=${nz}(${z}) en=${ne}(${e})`);
});
// PEOPLE 本身:键必须真的出现在某文明的「人物」里,否则这张卡永远弹不出来
const figIndex = new Map();
CIVS.forEach(c => (c.f && c.f['人物'] || '').split(SPLIT).map(s => s.trim().replace(/[(（].*/, '')).filter(Boolean)
  .forEach(nm => { if (!figIndex.has(nm)) figIndex.set(nm, []); figIndex.get(nm).push(c.n); }));
for (const [k, p] of Object.entries(PEOPLE || {})) {
  const where = figIndex.get(k);
  if (!where) { P.push(`[PEOPLE 弹不出来] "${k}" 不在任何文明的「人物」字段里`); continue; }
  if (!names.has(p.c)) P.push(`[PEOPLE 文明名不存在] ${k} → ${p.c}`);
  else if (!where.includes(p.c)) P.push(`[PEOPLE 归属对不上] ${k} 标为 ${p.c},但只出现在 ${where.join('/')} 的人物里`);
  if (!PGLYPH[p.g]) P.push(`[PEOPLE 类别非法] ${k} "${p.g}" 应为 ${Object.keys(PGLYPH).join('/')}`);
  P.push(...[bi(p.n, `[PEOPLE 姓名非双语] ${k}`), bi(p.t, `[PEOPLE 身份句非双语] ${k}`), bi(p.s, `[PEOPLE「意义」非双语] ${k}`)].filter(Boolean));
  if (!Array.isArray(p.a) || !p.a.length) P.push(`[PEOPLE 缺「三件事」] ${k}`);
  else p.a.forEach((x, i) => P.push(...[bi(x, `[PEOPLE「三件事」非双语] ${k}#${i}`)].filter(Boolean)));
  if (!Array.isArray(p.y) || p.y.length !== 2 || p.y.some(n => typeof n !== 'number')) P.push(`[PEOPLE 生卒非法] ${k}`);
  else if (p.y[0] >= p.y[1]) P.push(`[PEOPLE 生年不早于卒年] ${k} ${p.y[0]}~${p.y[1]}`);
  if (p.yk && !['r', 'a'].includes(p.yk)) P.push(`[PEOPLE yk 非法] ${k} "${p.yk}" 应为 r(在位)/a(活跃)`);
  // yk 已经声明 y 不是生卒了,再给 r 就自相矛盾(会渲染出"在位 X · 在位 Y")
  if (p.yk && p.r) P.push(`[PEOPLE yk 与 r 并存] ${k} y 已声明为${p.yk === 'r' ? '在位' : '活跃'}年代,不应再给 r`);
  if (p.r) {
    if (!Array.isArray(p.r) || p.r.length !== 2 || p.r[0] >= p.r[1]) P.push(`[PEOPLE 在位区间非法] ${k}`);
    else if (p.r[0] < p.y[0] || p.r[1] > p.y[1]) P.push(`[PEOPLE 在位超出生卒] ${k} 在位 ${p.r[0]}~${p.r[1]} 生卒 ${p.y[0]}~${p.y[1]}`);
  }
}
Object.keys(PGLYPH).forEach(g => { if (!PGNAME[g]) P.push(`[PGNAME 缺类别名] ${g}`); });

// PEAK:鼎盛期硬数字。孤儿键会静默失效(那张卡永远看不到这行数字)
for (const [k, v] of Object.entries(PEAK || {})) {
  if (!names.has(k)) P.push(`[PEAK 孤儿键] ${k}`);
  if (!v.a && !v.p && !v.w) P.push(`[PEAK 三项全空] ${k},应直接删掉这条`);
  if (v.a !== undefined && !(v.a > 0)) P.push(`[PEAK 版图非正数] ${k} = ${v.a}`);
  if (v.p !== undefined && !(v.p > 0)) P.push(`[PEAK 人口非正数] ${k} = ${v.p}`);
  if (v.w !== undefined && !(v.w > 0 && v.w <= 1)) P.push(`[PEAK 世界占比越界] ${k} = ${v.w},应在 0~1`);
  // 给了占比却没给人口,读者无从判断这个比例是怎么来的
  if (v.w !== undefined && v.p === undefined) P.push(`[PEAK 有占比无人口] ${k}`);
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
