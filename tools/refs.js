#!/usr/bin/env node
/* 列出一个文明名在所有数据结构里的引用位置 —— 拆分/改名条目前先跑这个。
 *
 * 存在的理由:拆东周时是手工 grep 找了 8 处;拆罗马时漏了 GL_X(它是追加表,
 * 键找不到对应文明就自己变成一条孤儿数据),靠 audit 才抓出来。手工清点会漏,
 * 这个脚本不会。
 *
 * 用法: node tools/refs.js 亚述·巴比伦
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const name = process.argv[2];
if (!name) { console.error('用法: node tools/refs.js <文明名>'); process.exit(2); }

const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const lines = src.split('\n');

/* 抽常量块跑一遍,拿到真实的数据结构(比正则可靠) */
const script = src.slice(src.indexOf('<script>') + 8, src.lastIndexOf('</script>'));
const start = script.indexOf('const LANES');
const tracesAt = script.indexOf('const TRACES');
const end = tracesAt + script.slice(tracesAt).indexOf('\n];') + 3;
const body = script.slice(start, end).split('\n').filter(l => !l.startsWith('const LAND')).join('\n');
/* WIKI_NAME 定义在渲染代码区、不在上面这段常量块里,单独抽 —— 它也是拆分必改的一处 */
const wStart = lines.findIndex(l => /^\s*const WIKI_NAME = \{/.test(l));
let wBlock = '';
if (wStart >= 0) {
  for (let i = wStart; i < lines.length; i++) { wBlock += lines[i] + '\n'; if (/\};\s*$/.test(lines[i])) break; }
}
const ctx = {};
vm.createContext(ctx);
vm.runInContext(body + '\n' + wBlock + ';globalThis.__D = {LANES,CIVS,EVENTS,GEO,CHRONO,GL,GL_X,CHRONO_X,EN,TRACES,PLACE,VIDEO,PEOPLE,PEAK,WIKI_NAME:(typeof WIKI_NAME!=="undefined"?WIKI_NAME:null)};', ctx);
const D = ctx.__D;

const hits = [];
/* 每个常量的起始行,用于把搜索限定在该表内 —— 否则各表都会返回全文件第一个匹配,
   给出一堆相同且错误的行号(比不给行号更容易误导) */
const declAt = {};
lines.forEach((l, i) => { const m = l.match(/^\s*const ([A-Z_]+[A-Za-z_]*) *= *[{[]/); if (m && !(m[1] in declAt)) declAt[m[1]] = i; });
const at = (needle, tableName) => {
  const from = tableName && declAt[tableName] !== undefined ? declAt[tableName] : 0;
  // 表内搜索:从该 const 起,到下一个 const 声明为止
  const nexts = Object.values(declAt).filter(v => v > from).sort((a, b) => a - b);
  const to = nexts.length ? nexts[0] : lines.length;
  for (let i = from; i < to; i++) if (lines[i].includes(needle)) return i + 1;
  const g = lines.findIndex(l => l.includes(needle));   // 兜底:全文件
  return g < 0 ? '?' : g + 1;
};

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
  hits.push([label, at(`'${name}':`, label.split('.')[0]), n]);
}
// 3. PEOPLE 的 c 字段(反向引用)
const ppl = Object.entries(D.PEOPLE || {}).filter(([, v]) => v.c === name).map(([k]) => k);
if (ppl.length) hits.push(['PEOPLE', at(`c:'${name}'`, 'PEOPLE'), `${ppl.length} 人: ${ppl.join('、')}`]);
// 4. TRACES 节点
const tr = (D.TRACES || []).filter(t => JSON.stringify(t).includes(name));
if (tr.length) hits.push(['TRACES', '?', `${tr.length} 条轨迹提到`]);
// 5. EVENTS
const ev = (D.EVENTS || []).filter(e => JSON.stringify(e).includes(name));
if (ev.length) hits.push(['EVENTS', '?', `${ev.length} 个事件提到`]);

if (!hits.length) { console.log(`没找到「${name}」的任何引用 —— 名字打错了?`); process.exit(1); }

console.log(`\n「${name}」共 ${hits.length} 处引用,拆分/改名时每一处都要动:\n`);
console.log('  结构          行号    内容');
console.log('  ' + '─'.repeat(60));
for (const [label, line, note] of hits) {
  console.log('  ' + label.padEnd(13) + String(line).padStart(5) + '   ' + note);
}
console.log('\n提醒:GL / GL_X / CIVS.gl 是三个独立来源,glHTML 用 "GL[c.n] || c.gl" 取值,');
console.log('     GL_X 再追加上去。只改其中一处会留下孤儿键或让另一处被静默吞掉。\n');
