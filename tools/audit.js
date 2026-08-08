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

// AGLYPH/AGNAME/ACHV 声明在 TRACES 之后,落在上面那段之外,单独再抽一段拼上。
const achvAt = script.indexOf('const AGLYPH');
if (achvAt < 0) { console.error('抽取失败:找不到 AGLYPH 声明'); process.exit(1); }
const achvEnd = achvAt + script.slice(achvAt).indexOf('\n};') + 3;

const body = [script.slice(start, end), script.slice(achvAt, achvEnd)]
  .join('\n').split('\n').filter(l => !l.startsWith('const LAND')).join('\n');

const ctx = {};
vm.createContext(ctx);
const PICK = '({LANES,SPHERES,CIVS,EVENTS,GEO,CHRONO,GL,CHRONO_X,EN,TRACES,ERAS,PLACE,VIDEO,PEOPLE,PGLYPH,PGNAME,PEAK,ACHV,AGLYPH,GEO_CITY,PLACE_LORE})';
let D;
try { vm.runInContext(body, ctx); D = vm.runInContext(PICK, ctx); } catch (e) {
  console.error('数据段解析失败:', e.message); process.exit(1);
}
const { LANES, CIVS, EVENTS, GEO, CHRONO, GL, CHRONO_X, EN, TRACES, PLACE, VIDEO, PEOPLE, PGLYPH, PGNAME, PEAK, ACHV, AGLYPH, GEO_CITY, PLACE_LORE } = D;

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
  if (v.p !== undefined) {
    if (Array.isArray(v.p)) {
      if (v.p.length !== 2 || !(v.p[0] > 0) || !(v.p[1] > 0)) P.push(`[PEAK 人口区间非法] ${k} = ${JSON.stringify(v.p)}`);
      else if (v.p[0] >= v.p[1]) P.push(`[PEAK 人口区间下限不小于上限] ${k} = ${v.p[0]}~${v.p[1]}`);
    } else if (!(v.p > 0)) P.push(`[PEAK 人口非正数] ${k} = ${v.p}`);
  }
  // 官方户口数必须给出年份,否则"户口数"三个字无从核对
  if (v.pc && v.py === undefined) P.push(`[PEAK 标了户口数却无年份] ${k}`);
  // 户口数是确切记录,不该写成估算区间
  if (v.pc && Array.isArray(v.p)) P.push(`[PEAK 户口数不应为区间] ${k}`);
  if (v.an !== undefined && (!Array.isArray(v.an) || v.an.length !== 2 || !v.an[0] || !v.an[1])) P.push(`[PEAK 面积口径说明非双语] ${k}`);
  if (v.w !== undefined && !(v.w > 0 && v.w <= 1)) P.push(`[PEAK 世界占比越界] ${k} = ${v.w},应在 0~1`);
  // 给了占比却没给人口,读者无从判断这个比例是怎么来的
  if (v.w !== undefined && v.p === undefined) P.push(`[PEAK 有占比无人口] ${k}`);
  // ay/py 必须落在该文明自己的存续区间内。年份填到区间外肉眼极难发现——卡片照常渲染,
  // 只是悄悄写着一个这个文明还不存在(或已亡)的年份。
  const civ = CIVS.find(c => c.n === k);
  if (civ && civ.k && civ.k.length) {
    const lo = civ.k[0][0], hi = civ.k[civ.k.length - 1][0];
    for (const f of ['ay', 'py']) {
      if (v[f] !== undefined && (v[f] < lo || v[f] > hi))
        P.push(`[PEAK 年份在存续区间外] ${k}.${f} = ${v[f]},存续 ${lo}~${hi}`);
    }
  }
}

// co:分裂时期的并存政权。规则 24—27
// q(兴衰六问):六键齐全、每键双语。缺一键就等于卡片上少一问,渲染不报错、只是悄悄没有
const QKEYS = ['born', 'rule', 'money', 'power', 'fall', 'legacy'];
CIVS.forEach(c => {
  if (!c.q) return;
  const keys = Object.keys(c.q);
  QKEYS.forEach(k => { if (!keys.includes(k)) P.push(`[q 缺键] ${c.n}.${k}`); });
  keys.forEach(k => { if (!QKEYS.includes(k)) P.push(`[q 未知键] ${c.n}.${k}`); });
  for (const k of keys) { const v = c.q[k]; if (!Array.isArray(v) || v.length !== 2 || !v[0] || !v[1]) P.push(`[q ${k} 非双语] ${c.n}`); }
});
CIVS.forEach(c => {
  // ct(区块标题覆盖)必须双语,且只在有 co 时才有意义
  if (c.ct !== undefined) {
    if (!Array.isArray(c.ct) || c.ct.length !== 2 || !c.ct[0] || !c.ct[1]) P.push(`[ct 非双语] ${c.n}`);
    if (!c.co) P.push(`[有 ct 无 co] ${c.n}——标题覆盖没有作用对象`);
  }
  if (!c.co) return;
  if (!Array.isArray(c.co) || !c.co.length) { P.push(`[co 不是非空数组] ${c.n}`); return; }
  const lo = c.k[0][0], hi = c.k[c.k.length - 1][0];
  const mByGroup = new Map(), xByGroup = new Map();
  c.co.forEach((p, i) => {
    const at = `${c.n}[${i}]${p.n && p.n[0] ? ' ' + p.n[0] : ''}`;
    // 24:双语完整性。单语会在另一种语言下渲染出 undefined
    for (const f of ['n', 'c', 'g', 'x']) {
      if (p[f] === undefined) { if (f === 'n') P.push(`[co 缺政权名] ${at}`); continue; }
      if (!Array.isArray(p[f]) || p[f].length !== 2 || !p[f][0] || !p[f][1]) P.push(`[co ${f} 非双语] ${at}`);
    }
    // 25:年代必须与母条目存续区间有重叠(不要求包含——前赵建于 304,早于东晋十六国的 317)
    // y[0] 允许为 null:老国(战国的秦楚齐燕)不建于该时期,但灭亡年有教学价值,写成「亡于前221」
    if (p.y !== undefined) {
      if (!Array.isArray(p.y) || p.y.length !== 2) P.push(`[co 年代格式非法] ${at}`);
      else if (typeof p.y[1] !== 'number') P.push(`[co 缺终年] ${at}——起始年可省(写 null),终年不可`);
      else if (p.y[0] !== null && !(p.y[0] < p.y[1])) P.push(`[co 年代起止倒置] ${at} = ${p.y[0]}~${p.y[1]}`);
      else if (p.y[1] < lo || (p.y[0] !== null && p.y[0] > hi)) P.push(`[co 年代与母条目无重叠] ${at} = ${p.y[0]}~${p.y[1]},母条目 ${lo}~${hi}`);
    }
    const gk = p.g ? p.g[0] : '';
    // 26:x 是整组共用的,同组写了两个不同的值意味着数据有歧义
    if (p.x) {
      if (xByGroup.has(gk) && xByGroup.get(gk) !== p.x[0]) P.push(`[co 同组 x 不一致] ${c.n} 组「${gk || '(无组)'}」: "${xByGroup.get(gk)}" vs "${p.x[0]}"`);
      else xByGroup.set(gk, p.x[0]);
    }
    // 27:每组最多一个主线
    if (p.m) {
      if (mByGroup.has(gk)) P.push(`[co 同组多个 m:1] ${c.n} 组「${gk || '(无组)'}」: ${mByGroup.get(gk)} 与 ${p.n && p.n[0]}`);
      else mByGroup.set(gk, p.n && p.n[0]);
    }
  });
});

// 29:f['鼎盛'] 与 k 曲线峰值不能各说各话。核查员在法蒂玛、马穆鲁克、渤海三张卡上
// 都手工抓到过这一类,机械化掉。两个必要的收窄,否则会误报:
//   ① 「前1000—前800」这类是**区间**不是两个孤立年份,峰值落在区间内即算一致
//   ② **在世文明豁免**——末帧到 2025 的条目,「鼎盛」本身就是尚未定下的口径,
//      曲线末端不归零是刻意的(见 docs/DATA.md),拿它当峰值比对必然误报
const PEAK_TOL = 80;
CIVS.forEach(c => {
  const f = c.f && c.f['鼎盛'];
  if (!f) return;
  if (c.k[c.k.length - 1][0] >= 2025) return;                 // 在世文明豁免
  // 「9世纪初」「14世纪前期」这类没有 3~4 位数字,但恰恰是最常见的写法——反向注错时
  // 发现只认数字会把渤海、马穆鲁克这类整条跳过,而它们正是要防的场景
  const yrs = [...String(f).matchAll(/(前)?\s?(\d{3,4})(?!\s?世纪)/g)].map(m => (m[1] ? -1 : 1) * (+m[2]));
  // 「6—8世纪」这种跨世纪区间,只匹配单个「N世纪」会把起点丢掉(实测粟特被误报)
  // 跨世纪区间有两种写法:「6—8世纪」与「前7—前4世纪」(破折号后还带一个「前」)
  const spanned = [];
  for (const m of String(f).matchAll(/(前)?(\d{1,2})\s?[—\-~－]\s?(前)?(\d{1,2})\s?世纪/g)) {
    const bce1 = !!m[1] || !!m[3], n1 = +m[2], bce2 = !!m[3] || !!m[1], n2 = +m[4];
    yrs.push(bce1 ? -n1 * 100 : (n1 - 1) * 100, bce2 ? -(n2 - 1) * 100 - 1 : n2 * 100 - 1);
    spanned.push(m[0]);
  }
  // 已被区间吃掉的那段不能再按单个世纪算一遍,否则「前7—前4世纪」会退化成「前4世纪」
  let rest = String(f);
  for (const t of spanned) rest = rest.replace(t, '');
  for (const m of rest.matchAll(/(前)?(\d{1,2})\s?世纪(初|前期|中期|中叶|后期|末)?/g)) {
    const bce = !!m[1], n = +m[2], q = m[3] || '';
    let a = bce ? -n * 100 : (n - 1) * 100, b = bce ? -(n - 1) * 100 - 1 : n * 100 - 1;
    if (q === '初' || q === '前期') b = a + 39;
    else if (q === '末' || q === '后期') a = b - 39;
    else if (q === '中期' || q === '中叶') { a += 30; b -= 30; }
    yrs.push(a, b);
  }
  if (!yrs.length) return;
  let mi = 0; c.k.forEach((k, i) => { if (k[1] > c.k[mi][1]) mi = i; });
  const peak = c.k[mi][0], lo = Math.min(...yrs), hi = Math.max(...yrs);
  if (peak < lo - PEAK_TOL || peak > hi + PEAK_TOL)
    P.push(`[鼎盛年与曲线峰值不符] ${c.n}: 「${f}」→ ${lo}~${hi},但 k 峰值在 ${peak}`);
});

// 30:GEO 的核心点必须落在自己的版图内(容差 1°)。写错一位经纬度,地图上的圆点
// 就会跑到别的大陆去,而肉眼看小图未必发现
Object.entries(GEO).forEach(([n, g]) => {
  if (!g.c || !g.p) return;
  let mnx = 999, mxx = -999, mny = 999, mxy = -999;
  for (const poly of g.p) for (const [x, y] of poly) {
    mnx = Math.min(mnx, x); mxx = Math.max(mxx, x); mny = Math.min(mny, y); mxy = Math.max(mxy, y);
  }
  if (g.c[0] < mnx - 1 || g.c[0] > mxx + 1 || g.c[1] < mny - 1 || g.c[1] > mxy + 1)
    P.push(`[GEO 核心点在版图外] ${n}: 中心 [${g.c}] 不在 [${mnx},${mny}]~[${mxx},${mxy}] 内`);
});

// 31:成就卡(ACHV)结构 + 可达性。渲染端把文明 f['成就'] 按 NSPLIT 拆开、去掉括号后
// 与 ACHV 的键做**精确匹配**,匹配不上就只是一段纯文本——卡片永远点不开,而页面不报
// 任何错。按概念命名(写「科举」而站里原文是「科举制」)就会踩这个,上一轮四张里中了两张。
const NSPLIT_A = /[、,;；]/;
const stripParenA = s => s.replace(/（[^）]*）|\([^)]*\)/g, '').trim();
const civByName = new Map(CIVS.map(c => [c.n, c]));
const achvWords = c => ((c.f && c.f['成就']) || '').split(NSPLIT_A).map(stripParenA).filter(Boolean);

Object.entries(ACHV || {}).forEach(([k, a]) => {
  if (!AGLYPH[a.g]) P.push(`[成就卡类别不存在] ${k}: g=${a.g}`);
  ['n', 't', 's'].forEach(f => {
    if (!Array.isArray(a[f]) || a[f].length !== 2) P.push(`[成就卡字段非中英两项] ${k}.${f}`);
  });
  if (!Array.isArray(a.a) || !a.a.length) P.push(`[成就卡缺 a 条目] ${k}`);
  else a.a.forEach((x, i) => {
    if (!Array.isArray(x) || x.length !== 2) P.push(`[成就卡 a 条目非中英两项] ${k}.a[${i}]`);
  });
  // y 允许两种写法:[起,讫] 区间,或只考订得出一个时点时的单值 [年]。
  // yk='m'(铸造/制成)与 ca(约值)沿用人物卡的词汇,且只在有 y 时才有意义。
  if (a.y) {
    if (!Array.isArray(a.y) || a.y.length < 1 || a.y.length > 2 || a.y.some(v => typeof v !== 'number'))
      P.push(`[成就卡 y 写法非法] ${k}: [${a.y}](只允许 [起,讫] 或单值 [年])`);
    else if (a.y.length === 2 && !(a.y[0] <= a.y[1]))
      P.push(`[成就卡 y 区间倒置] ${k}: [${a.y}]`);
  } else if (a.yk || a.ca) P.push(`[成就卡有 yk/ca 却无 y] ${k}`);
  if (a.yk && a.yk !== 'm') P.push(`[成就卡 yk 取值非法] ${k}: yk=${a.yk}(目前只有 'm')`);
  if (a.yk === 'm' && a.y && a.y.length !== 1)
    P.push(`[成就卡 yk='m' 却给了区间] ${k}: [${a.y}]——「铸于」是一个时点,断代不确定要用 ca 而不是拉成区间`);

  const civ = civByName.get(a.c);
  if (!civ) { P.push(`[成就卡所属文明不存在] ${k} → ${a.c}`); return; }
  if (!achvWords(civ).includes(k))
    P.push(`[成就卡点不出来] ${k}: 「${a.c}」的 f['成就'] 里没有这个整词(现有:${achvWords(civ).join('、') || '空'})`);
});

// 32:成就卡年份与同一文明大事记里同名事件的年份必须对得上。曾经出过成就卡写 605、
// 站内大事记写 587 而两处讲的是同一件事。CHRONO 是 [年,'中文',...],CHRONO_X 是
// [年,[中,英],[中,英]],所以取文本要递归拍平。
const flatTxt = v => Array.isArray(v) ? v.map(flatTxt).join(' ') : String(v);
Object.entries(ACHV || {}).forEach(([k, a]) => {
  if (!a.y) return;
  // 「科举制」→「科举」、「造纸术」→「造纸」:大事记里常用不带后缀的写法
  const alt = /[制术]$/.test(k) && k.length > 2 ? k.slice(0, -1) : null;
  // 单值 y 就拿它自己当区间;标了 ca(约值)的年代本身是模糊的,跟大事记逐年比对没有意义,
  // 给 ±100 年的余量——只用来抓「差了几百年」那种真错,不抓考订上的小出入。
  const [lo, hi] = a.y.length === 2 ? a.y : [a.y[0], a.y[0]];
  const tol = a.ca ? 100 : 0;
  const shown = a.y.length === 2 ? `${a.y[0]}—${a.y[1]}` : `${a.ca ? '约' : ''}${a.y[0]}`;
  // 「X的Y」说明这条大事记讲的是 Y、只是拿 X 作参照,不是在给 X 断代 ——
  // 高棉 1060 年那条讲巴普昂寺、描述写「吴哥窟的预演」,按原来的宽匹配会误报。
  // 反过来「科举制发端」里 X 是主语,那才是真正要查的情形(v67 就是靠它抓到 605/587)。
  const named = (txt, key) => {
    let i = txt.indexOf(key);
    while (i >= 0) {
      if (txt[i + key.length] !== '的') return true;   // 不是「X的…」,算作在给 X 断代
      i = txt.indexOf(key, i + 1);
    }
    return false;
  };
  [...(CHRONO[a.c] || []), ...(CHRONO_X[a.c] || [])].forEach(r => {
    const txt = flatTxt(r.slice(1));
    if (!named(txt, k) && !(alt && named(txt, alt))) return;
    if (r[0] < lo - tol || r[0] > hi + tol)
      P.push(`[成就卡年份与大事记不一致] ${k}: 卡片 ${shown},而「${a.c}」大事记里同名事件在 ${r[0]}(${flatTxt(r[1])})`);
  });
});

// 33:数据里不能残留 markdown 强调标记。渲染端是 `<p>${…}</p>` 直插、不处理 markdown,
// 写了 **强调** 就会把星号原样显示给读者——而读者是个 7 岁小孩。这类错在代码里看着
// 很自然(周围全是带 ** 的注释),在页面上才露馅。v69 因此查出埃塞俄比亚六问里一处既有的。
// 只查数据表,不查 JS 注释——注释里的 ** 是写给开发者看的,不渲染。
// 34:同一个词里混进了别的字母表。西里尔/希腊字母本身是合法的(辽的卡片要讲
// 「俄语 Китай 源自契丹」),但**紧贴着拉丁字母**出现就是输入法或复制粘贴的污染,
// 会原样显示给读者。v71 因此查出卡霍基亚的「南阿palачi山」——本该是「南阿巴拉契亚山」,
// 里面混了西里尔的 а(U+430) 与 ч(U+447),肉眼几乎看不出来。
// v79 补:第一版只查「拉丁字母 ↔ 西里尔/希腊」相邻,漏了「汉字 ↔ 西里尔」——
// 实际手滑打出「佛法второ入藏」时它一声不吭。中日韩汉字与西里尔紧贴同样是污染,
// 而合法用法(辽卡的「俄语 Китай」)前后是空格与顿号,不受影响。
const MIX = /([A-Za-z一-鿿][Ͱ-ϿЀ-ӿ])|([Ͱ-ϿЀ-ӿ][A-Za-z一-鿿])/;
const mdWalk = (v, path) => {
  if (typeof v === 'string') {
    const i = v.indexOf('**');
    if (i >= 0) P.push(`[数据里残留 markdown] ${path}: …${v.slice(Math.max(0, i - 18), i + 26)}…`);
    const m = v.match(MIX);
    if (m) P.push(`[同词里混了别的字母表] ${path}: …${v.slice(Math.max(0, m.index - 18), m.index + 26)}…`);
    return;
  }
  if (Array.isArray(v)) return v.forEach((x, i) => mdWalk(x, `${path}[${i}]`));
  if (v && typeof v === 'object') return Object.entries(v).forEach(([k, x]) => mdWalk(x, `${path}.${k}`));
};
[['CIVS', CIVS], ['PEOPLE', PEOPLE], ['ACHV', ACHV], ['CHRONO', CHRONO], ['CHRONO_X', CHRONO_X],
 ['GL', GL], ['EN', EN], ['PEAK', PEAK], ['PLACE', PLACE], ['EVENTS', EVENTS], ['TRACES', TRACES]]
  .forEach(([n, t]) => mdWalk(t, n));

// 试过但没成的一条(v76,记在这里免得下次重来):
// 「同一双语字段里中英的数字必须一致」——想法出自 v76 的核查(圣索菲亚中文「四十几扇窗」
// 而英文 forty、印加中文「约三万公里」而英文 40,000)。实现过三版,全站命中依次是
// 418 → 347 → 308 → 158,而剩下的**仍然全是噪声**:中文写「1090年代」「9世纪30年代末」
// 「三万」,英文写 the 1090s / the 830s / 30,000 —— 书写习惯的差异与真正写错了的形状
// 完全相同,正则分不出来。再收窄就要连真错一起漏掉。
// **结论:这类问题只能靠人核,不要再花时间做成规则。**

// 35:核心点必须真的落在多边形**内部**,而不只是外接框里。规则 30 查的是外接框,
// 对细长或凹形的版图完全无效——v81 用点在多边形内判定扫了一遍,查出 6 条:
// 大英(伦敦在环外 0.4°)、迦太基、南宋(临安在东界外 0.2°)、日本(东京落在细带子外)、
// 印加(**库斯科**在东界外 0.19°)、瓦里·蒂瓦纳科(核心点正好压在顶点上)。
// 这些在卡片地图上就是「圆点飘在色块外面」,肉眼看小图不一定发现。
const pip = (x, y, poly) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
};
Object.entries(GEO).forEach(([n, g]) => {
  if (!g.c || !g.p) return;
  if (!g.p.some(poly => pip(g.c[0], g.c[1], poly)))
    P.push(`[GEO 核心点不在多边形内] ${n}: [${g.c}] 落在自己的版图之外(外接框查不出这个)`);
});

/* 36. 城市覆盖基线 —— 版图的「洞」用核心点查不出来。
 * 规则 30 只查外接框、规则 35 只查文明自己的核心点,两条都对「版图边界画歪了、
 * 把一整片地方漏在外面」无感。2026-08-08 用 230 座城市实测,漏出来的洞很不小:
 * 福州/厦门/泉州/汕头/香港/宁波 在除南宋外的所有中原王朝里都查不到(东南沿海被
 * 一条从长江口到珠江口的直线切掉了);庆州(新罗故都)、釜山不在朝鲜半岛里;
 * 旧金山/洛杉矶/迈阿密不在美国里;哈瓦那/圣多明各/加拉加斯不在西葡殖民美洲里;
 * 开普敦不在欧洲殖民非洲里;赫尔辛基既不在瑞典帝国也不在俄国里。
 *
 * 下表每行 [城, 经度, 纬度, 基线] —— 基线是修完之后实测的命中数,只查「跌破」,
 * 涨了不报(新增文明本来就会让命中数上升)。基线 0 的六座是站里确实没有对应文明:
 * 悉尼/奥克兰/火奴鲁鲁/复活节岛(全站无大洋洲泳道)、奥斯陆/哥本哈根(无维京·北欧带)。
 * 若确属有意收缩版图,把该城基线改小即可,但改之前先想清楚那片地方真的该空着。
 */
const GEO_CITIES = [
  ["伦敦",-0.13,51.51,3], ["巴黎",2.35,48.86,4], ["罗马",12.5,41.9,5], ["雅典",23.73,37.98,6],
  ["马德里",-3.7,40.42,5], ["里斯本",-9.14,38.72,4], ["科尔多瓦",-4.78,37.89,4], ["柏林",13.4,52.52,2],
  ["维也纳",16.37,48.21,2], ["布拉格",14.42,50.09,2], ["华沙",21.01,52.23,2], ["维尔纽斯",25.28,54.69,2],
  ["斯德哥尔摩",18.07,59.33,1], ["奥斯陆",10.75,59.91,0], ["哥本哈根",12.57,55.68,0], ["阿姆斯特丹",4.9,52.37,2],
  ["布鲁塞尔",4.35,50.85,3], ["米兰",9.19,45.46,4], ["威尼斯",12.34,45.44,5], ["佛罗伦萨",11.26,43.77,5],
  ["那不勒斯",14.27,40.85,4], ["巴勒莫",13.36,38.12,5], ["伊斯坦布尔",28.98,41.01,5], ["莫斯科",37.62,55.76,1],
  ["基辅",30.52,50.45,3], ["诺夫哥罗德",31.27,58.52,1], ["都柏林",-6.26,53.35,2], ["爱丁堡",-3.19,55.95,2],
  ["日内瓦",6.14,46.2,4], ["慕尼黑",11.58,48.14,5], ["布达佩斯",19.04,47.5,3], ["贝尔格莱德",20.46,44.79,3],
  ["索菲亚",23.32,42.7,3], ["克拉科夫",19.94,50.06,2], ["里加",24.11,56.95,2], ["巴塞罗那",2.17,41.39,3],
  ["巴格达",44.36,33.31,14], ["大马士革",36.29,33.51,14], ["耶路撒冷",35.21,31.77,14], ["开罗",31.24,30.04,13],
  ["亚历山大",29.92,31.2,11], ["麦加",39.83,21.42,4], ["麦地那",39.61,24.47,4], ["伊斯法罕",51.68,32.65,10],
  ["波斯波利斯",52.89,29.94,8], ["德黑兰",51.39,35.69,10], ["摩苏尔",43.14,36.34,13], ["巴比伦",44.42,32.54,13],
  ["乌尔",46.1,30.96,12], ["安条克",36.16,36.2,12], ["撒马尔罕",66.96,39.65,8], ["布哈拉",64.42,39.77,9],
  ["梅尔夫",62.19,37.66,13], ["喀布尔",69.17,34.53,6], ["巴尔米拉",38.27,34.55,10], ["特洛伊",26.24,39.96,9],
  ["突尼斯",10.32,36.85,6], ["非斯",-5,34.03,5], ["马拉喀什",-8.01,31.63,2], ["的黎波里",13.19,32.89,7],
  ["阿尔及尔",3.06,36.75,5], ["昔兰尼",21.86,32.82,5], ["萨那",44.21,15.35,3], ["特拉布宗",39.72,41,5],
  ["埃里温",44.51,40.18,4], ["第比利斯",44.79,41.72,2], ["巴库",49.87,40.41,6], ["安卡拉",32.85,39.93,9],
  ["德里",77.21,28.61,11], ["孟买",72.88,19.08,5], ["加尔各答",88.36,22.57,6], ["金奈",80.27,13.08,5],
  ["摩亨佐达罗",68.14,27.33,6], ["哈拉帕",72.87,30.63,8], ["巴特那",85.14,25.61,8], ["瓦拉纳西",83.01,25.32,9],
  ["坎大哈",65.71,31.61,5], ["塔克西拉",72.83,33.74,5], ["汉皮",76.46,15.34,6], ["马杜赖",78.12,9.93,4],
  ["拉合尔",74.34,31.55,6], ["达卡",90.41,23.81,6], ["科伦坡",79.86,6.93,1], ["加德满都",85.32,27.72,4],
  ["西安",108.94,34.34,20], ["洛阳",112.45,34.62,22], ["北京",116.4,39.9,17], ["南京",118.8,32.06,20],
  ["杭州",120.15,30.27,18], ["开封",114.31,34.8,22], ["成都",104.07,30.57,19], ["广州",113.26,23.13,17],
  ["昆明",102.83,24.88,11], ["拉萨",91.14,29.65,4], ["乌鲁木齐",87.62,43.83,7], ["敦煌",94.66,40.14,13],
  ["喀什",75.99,39.47,7], ["呼和浩特",111.75,40.84,13], ["哈尔滨",126.53,45.8,7], ["首尔",126.98,37.57,2],
  ["平壤",125.75,39.03,2], ["庆州",129.22,35.86,2], ["东京",139.69,35.69,1], ["京都",135.77,35.01,1],
  ["大阪",135.5,34.69,1], ["福冈",130.4,33.59,1], ["札幌",141.35,43.06,1], ["台北",121.56,25.03,3],
  ["香港",114.17,22.32,17], ["乌兰巴托",106.92,47.92,7], ["哈拉和林",102.83,47.2,7], ["河内",105.85,21.03,11],
  ["顺化",107.58,16.46,3], ["吴哥",103.87,13.41,3], ["曼谷",100.5,13.76,4], ["素可泰",99.82,17.01,3],
  ["蒲甘",94.86,21.17,3], ["仰光",96.16,16.87,3], ["万象",102.6,17.97,2], ["马六甲",102.25,2.19,5],
  ["新加坡",103.82,1.35,5], ["雅加达",106.85,-6.21,4], ["巨港",104.76,-2.99,4], ["日惹",110.2,-7.61,4],
  ["马尼拉",120.98,14.6,2], ["金边",104.92,11.56,3], ["阿克苏姆",38.72,14.13,4], ["亚的斯亚贝巴",38.75,9.03,3],
  ["廷巴克图",-3.01,16.77,4], ["加奥",-0.04,16.27,4], ["巴马科",-8,12.65,4], ["卡诺",8.52,12,2],
  ["贝宁城",5.63,6.34,2], ["伊费",4.56,7.48,2], ["拉各斯",3.38,6.52,2], ["恩贾梅纳",15.05,12.11,3],
  ["大津巴布韦",30.93,-20.27,3], ["基尔瓦",39.55,-8.96,3], ["蒙巴萨",39.67,-4.04,3], ["开普敦",18.42,-33.92,3],
  ["麦罗埃",33.72,16.94,3], ["喀土穆",32.53,15.5,3], ["金沙萨",15.31,-4.32,2], ["罗安达",13.23,-8.84,2],
  ["特奥蒂瓦坎",-98.84,19.69,5], ["墨西哥城",-99.13,19.43,5], ["蒂卡尔",-89.62,17.22,3], ["奇琴伊察",-88.57,20.68,3],
  ["帕伦克",-92.05,17.48,4], ["库斯科",-71.97,-13.53,3], ["马丘比丘",-72.55,-13.16,3], ["利马",-77.04,-12.05,4],
  ["蒂瓦纳科",-68.67,-16.55,3], ["卡拉尔",-77.52,-10.89,5], ["特鲁希略",-79.05,-8.11,6], ["波哥大",-74.07,4.71,2],
  ["基多",-78.47,-0.18,3], ["圣地亚哥",-70.65,-33.45,2], ["布宜诺斯艾利斯",-58.38,-34.6,2], ["里约热内卢",-43.17,-22.91,2],
  ["萨尔瓦多",-38.51,-12.97,2], ["卡霍基亚",-90.06,38.66,2], ["查科峡谷",-107.96,36.06,1], ["纽约",-74.01,40.71,1],
  ["华盛顿",-77.04,38.91,1], ["波士顿",-71.06,42.36,1], ["洛杉矶",-118.24,34.05,1], ["蒙特利尔",-73.57,45.5,1],
  ["哈瓦那",-82.38,23.13,2], ["悉尼",151.21,-33.87,0], ["奥克兰",174.76,-36.85,0], ["火奴鲁鲁",-157.86,21.31,0],
  ["复活节岛",-109.35,-27.12,0], ["圣彼得堡",30.31,59.94,1], ["喀山",49.11,55.79,1], ["阿斯特拉罕",48.03,46.35,3],
  ["塔什干",69.24,41.3,6], ["阿拉木图",76.89,43.24,6], ["符拉迪沃斯托克",131.89,43.12,4], ["伊尔库茨克",104.28,52.29,2],
  ["福州",119.3,26.07,17], ["厦门",118.09,24.48,17], ["泉州",118.59,24.87,17], ["汕头",116.68,23.35,17],
  ["温州",120.7,28,17], ["宁波",121.55,29.87,17], ["海口",110.2,20.04,11], ["桂林",110.29,25.27,17],
  ["长沙",112.94,28.23,18], ["武汉",114.31,30.59,20], ["济南",117.12,36.65,19], ["太原",112.55,37.87,19],
  ["兰州",103.83,36.06,16], ["西宁",101.78,36.62,15], ["银川",106.23,38.49,17], ["沈阳",123.43,41.8,11],
  ["大连",121.62,38.91,16], ["釜山",129.08,35.18,2], ["长春",125.32,43.82,6], ["迈阿密",-80.19,25.76,1],
  ["圣迭戈",-117.16,32.72,1], ["旧金山",-122.42,37.77,1], ["西雅图",-122.33,47.61,1], ["圣多明各",-69.9,18.47,2],
  ["圣胡安",-66.1,18.47,2], ["危地马拉城",-90.51,14.63,4], ["蒙特雷",-100.31,25.69,3], ["加拉加斯",-66.9,10.49,2],
  ["拉巴斯",-68.15,-16.5,2], ["亚松森",-57.58,-25.26,2], ["蒙得维的亚",-56.16,-34.9,2], ["约翰内斯堡",28.05,-26.2,2],
  ["内罗毕",36.82,-1.29,2], ["阿克拉",-0.19,5.56,3], ["达喀尔",-17.44,14.72,2], ["亚丁",45.03,12.79,2],
  ["摩加迪沙",45.34,2.05,2], ["哈拉雷",31.05,-17.83,2], ["卢萨卡",28.28,-15.42,2], ["塞维利亚",-5.98,37.39,4],
  ["图卢兹",1.44,43.6,4], ["科隆",6.96,50.94,4], ["汉堡",9.99,53.55,2], ["赫尔辛基",24.94,60.17,2],
  ["塔林",24.75,59.44,2], ["雅西",27.59,47.16,1], ["塞萨洛尼基",22.94,40.63,5], ["敖德萨",30.73,46.48,2],
  ["塞瓦斯托波尔",33.53,44.62,3], ["卡萨布兰卡",-7.59,33.57,2]
];
GEO_CITIES.forEach(([cn, x, y, floor]) => {
  const hit = Object.entries(GEO).filter(([, g]) => g.p && g.p.some(poly => pip(x, y, poly)));
  if (hit.length < floor)
    P.push(`[版图覆盖跌破基线] ${cn}: 现命中 ${hit.length} 个文明,基线 ${floor}${hit.length ? '(现:' + hit.map(h => h[0]).join('、') + ')' : ''}`);
});

/* 37. 地理视角的城市点(GEO_CITY,v83)——地图上每个可点的城市必须真的能点出东西。
 * 与规则 36 的基线表不同,GEO_CITY 是渲染进页面的交互数据:命中 0 条 = 孩子点了
 * 一个白给的点。另查:中文名唯一(选中态按名高亮)、英文名非空、坐标在显示范围内
 * (纬度显示范围 [-56,78],出界的点画在画布外,永远点不到)。 */
if (GEO_CITY) {
  const seen = new Set();
  GEO_CITY.forEach(([zh, en, lon, lat]) => {
    if (seen.has(zh)) P.push(`[GEO_CITY 重名] ${zh}`);
    seen.add(zh);
    if (!en) P.push(`[GEO_CITY 缺英文名] ${zh}`);
    if (lon < -180 || lon > 180 || lat < -56 || lat > 78)
      P.push(`[GEO_CITY 坐标出显示范围] ${zh}: [${lon},${lat}](纬度显示范围 -56~78,出界的点画在画布外)`);
    if (!Object.values(GEO).some(g => g.p && g.p.some(poly => pip(lon, lat, poly))))
      P.push(`[GEO_CITY 点不出任何文明] ${zh}: [${lon},${lat}] 一条版图都不命中,地图上是个白给的点`);
  });
}

/* 38. 地点小段手写层(PLACE_LORE,v86)——键是 '城市|文明',三件事都得真:
 * 城市在 GEO_CITY 里、文明在 CIVS 里、且城市坐标真的落在该文明版图内。
 * 第三条最要紧:组合展示的前提是 PIP 命中,城市不在版图里 = 写了一段永远没人看得到的文案,
 * 而且多半说明写的时候把归属想错了。另查双语两条都非空。 */
if (PLACE_LORE) {
  const cityByZh = Object.fromEntries((GEO_CITY || []).map(c => [c[0], c]));
  const civByN = Object.fromEntries(CIVS.map(c => [c.n, c]));
  Object.entries(PLACE_LORE).forEach(([k, v]) => {
    const [cz, cn] = k.split('|');
    const city = cityByZh[cz], civ = civByN[cn];
    if (!city) { P.push(`[PLACE_LORE 城市不存在] ${k}: 「${cz}」不在 GEO_CITY 里`); return; }
    if (!civ) { P.push(`[PLACE_LORE 文明不存在] ${k}: 「${cn}」不在 CIVS 里`); return; }
    const g = GEO[cn];
    if (!g || !g.p || !g.p.some(poly => pip(city[2], city[3], poly)))
      P.push(`[PLACE_LORE 城市不在该文明版图内] ${k}: 这段文案永远展示不出来`);
    if (!Array.isArray(v) || !v[0] || !v[1]) P.push(`[PLACE_LORE 双语不全] ${k}`);
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
