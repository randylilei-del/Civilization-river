#!/usr/bin/env node
/* 列出一个文明名在所有数据结构里的引用位置 —— 拆分/改名条目前先跑这个。
 *
 * 存在的理由:拆东周时是手工 grep 找了 8 处;拆罗马时漏了 GL_X(它是追加表,
 * 键找不到对应文明就自己变成一条孤儿数据),靠 audit 才抓出来。手工清点会漏,
 * 这个脚本不会。
 *
 * Phase 3 起数据经 tools/load.js 加载,行号直接在对应的 data/<表>.js 里搜——
 * 旧版为防跨表误报做的「declAt 开窗限定」整个不需要了:一表一文件,天然隔离。
 * 注意 load 会镜像 GL_X 合并,所以「GL」一栏是合并后的口径(与站内 glHTML 一致);
 * 只存在于 GL_X 的键在 data/gl.js 里搜不到行号,会显示 ?,看 GL_X 那一栏即可。
 *
 * 用法: node tools/refs.js 亚述·巴比伦
 */
const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) { console.error('用法: node tools/refs.js <文明名>'); process.exit(2); }

const ROOT = path.join(__dirname, '..');
const D = require('./load')();

/* 表 → 数据文件。行号在该文件里搜,一表一文件,不会串。 */
const FILE = {
  CIVS: 'civs', GEO: 'geo', CHRONO: 'chrono', CHRONO_X: 'chrono_x', GL: 'gl', GL_X: 'gl_x',
  VIDEO: 'video', PEAK: 'peak', WIKI_NAME: 'wiki_name', 'EN.civ': 'en', 'EN.chrono': 'en',
  PEOPLE: 'people', TRACES: 'traces', EVENTS: 'events',
};
const lineCache = {};
const at = (needle, label) => {
  const f = FILE[label];
  if (!f) return '?';
  if (!(f in lineCache)) lineCache[f] = fs.readFileSync(path.join(ROOT, 'data', f + '.js'), 'utf8').split('\n');
  const i = lineCache[f].findIndex(l => l.includes(needle));
  return i < 0 ? '?' : `data/${f}.js:${i + 1}`;
};

const hits = [];
// 1. CIVS 主表(含内联 gl)
const civ = D.CIVS.find(c => c.n === name);
if (civ) {
  hits.push(['CIVS', at(`n:'${name}'`, 'CIVS'), `色带 ${civ.k[0][0]}~${civ.k[civ.k.length - 1][0]}` + (civ.gl ? ` · 内联 gl ${civ.gl.length} 条` : '') + (civ.co ? ` · co ${civ.co.length} 条` : '')]);
}
// 2. 按名索引的各表
const tables = [
  ['GEO', D.GEO], ['CHRONO', D.CHRONO], ['CHRONO_X', D.CHRONO_X],
  ['GL', D.GL], ['GL_X', D.GL_X], ['VIDEO', D.VIDEO], ['PEAK', D.PEAK],
  ['WIKI_NAME', D.WIKI_NAME], ['EN.civ', D.EN.civ], ['EN.chrono', D.EN.chrono],
];
for (const [label, tbl] of tables) {
  if (!tbl || !(name in tbl)) continue;
  const v = tbl[name];
  const n = Array.isArray(v) ? `${v.length} 条` : (typeof v === 'object' ? Object.keys(v).join('/') : String(v));
  hits.push([label, at(`'${name}':`, label), n]);
}
// 3. PEOPLE 的 c 字段(反向引用)
const ppl = Object.entries(D.PEOPLE || {}).filter(([, v]) => v.c === name).map(([k]) => k);
if (ppl.length) hits.push(['PEOPLE', at(`c:'${name}'`, 'PEOPLE'), `${ppl.length} 人: ${ppl.join('、')}`]);
// 4. TRACES 节点
const tr = (D.TRACES || []).filter(t => JSON.stringify(t).includes(name));
if (tr.length) hits.push(['TRACES', at(name, 'TRACES'), `${tr.length} 条轨迹提到`]);
// 5. EVENTS
const ev = (D.EVENTS || []).filter(e => JSON.stringify(e).includes(name));
if (ev.length) hits.push(['EVENTS', at(name, 'EVENTS'), `${ev.length} 个事件提到`]);

if (!hits.length) { console.log(`没找到「${name}」的任何引用 —— 名字打错了?`); process.exit(1); }

console.log(`\n「${name}」共 ${hits.length} 处引用,拆分/改名时每一处都要动:\n`);
console.log('  结构          位置                内容');
console.log('  ' + '─'.repeat(64));
for (const [label, line, note] of hits) {
  console.log('  ' + label.padEnd(12) + String(line).padEnd(20) + note);
}
console.log('\n提醒:GL / GL_X / CIVS.gl 是三个独立来源,glHTML 用 "GL[c.n] || c.gl" 取值,');
console.log('     GL_X 再追加上去。只改其中一处会留下孤儿键或让另一处被静默吞掉。');
console.log('     改完数据文件记得跑 node tools/build.js。\n');
