#!/usr/bin/env node
/* 文明长河 — 新写内容的「可疑句」清单(2026-08-18 立)
 *
 * 为什么存在:五轮对抗核查里,假最高级(「最早的」「唯一」「从未」)复发 3 次、现在时断言过期
 * (「今天能看到实物」其实闭馆了)反复出现。这些真伪机器判不了,但**把句子挑出来给人看一眼**是纯 node 的事。
 * 只扫「这次新写的行」——扫全站会出几百条没人看;扫 diff 就是十几条,写的人自己过一遍。
 * 这是清单不是红灯:check.js 打印它,不影响退出码。
 *
 * 用法:node tools/lint-content.js            比较工作区 vs HEAD(未 commit 的新内容)
 *      node tools/lint-content.js HEAD~1     比较 HEAD~1..工作区(刚 commit 完想回看)
 *      node tools/lint-content.js --all      扫全站(慎用,只为看分布)
 */
const { execSync } = require('child_process');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const ALL = args.includes('--all');
let REF = args.find(a => !a.startsWith('--')) || 'HEAD';
/* 工作区干净时 HEAD..工作区 是空的,报「无可疑句」是假绿灯(核查员 2026-08-18 抓到:
   同一份规则对 HEAD 跑什么都没有,对上一批的 sha 跑抓到 200 多句)。干净就自动退一格看上一个 commit。 */
if (!args.find(a => !a.startsWith('--'))) {
  try {
    const { execSync: ex } = require('child_process');
    const dirty = ex('git status --porcelain -- data/', { cwd: ROOT, encoding: 'utf-8' }).trim();
    if (!dirty) REF = 'HEAD~1';
  } catch (e) {}
}

const CHECKS = [
  ['最高级', /最早|最大|最长|最高|最强|最富|最先|第一个|第一座|第一次|唯一|从未|从来没有|史上|空前|绝无仅有|\b(first|earliest|largest|biggest|greatest|longest|highest|only|never|unprecedented|the first)\b/i,
    '站内对冲写法是「之一」「同类更早就有」「已知最早」;真是第一要能给出处'],
  ['现在时', /今天|至今|如今|现在仍|仍然|仍在|还能看到|还在|目前|\b(today|still|now|currently|to this day|remains?|survives?)\b/i,
    '现在时会过期(维京船博物馆 2021 闭馆、欧元 20→21 国);带年份口径,或改成不依赖「现在」的说法'],
  ['大数字', /\d{1,3}(,\d{3})+|\d+\s*(万|亿|million|billion|thousand)/i,
    '人口/面积/数量要有出处口径(估算/户口数/哪一年),现代题材带年份'],
  ['因果词', /因此|所以|导致|于是|因为|正是|才有了|使得|\b(because|therefore|so that|led to|caused|thus)\b/i,
    '核查员挑过「倒因为果」(抗美援朝、克洛维受洗):写因果前确认方向与时间顺序'],
];

let lines = [];
if (ALL) {
  for (const f of fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('.js')))
    fs.readFileSync(path.join(ROOT, 'data', f), 'utf-8').split('\n').forEach((l, i) => lines.push({ file: 'data/' + f, no: i + 1, text: l }));
} else {
  let diff = '';
  try { diff = execSync(`git diff ${REF} -- data/`, { cwd: ROOT, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }); }
  catch (e) { console.error('lint-content: git diff 失败:', e.message.split('\n')[0]); process.exit(2); }
  let file = '', no = 0;
  for (const l of diff.split('\n')) {
    if (l.startsWith('+++ b/')) { file = l.slice(6); continue; }
    const h = l.match(/^@@ -\d+(?:,\d+)? \+(\d+)/); if (h) { no = +h[1] - 1; continue; }
    if (l.startsWith('-') || l.startsWith('---')) continue;
    no++;
    if (l.startsWith('+')) lines.push({ file, no, text: l.slice(1) });
  }
}

/* 把一行拆成句子再匹配,输出时只给命中的那句,不给整行(一行 data 常是几百字) */
const sentences = t => t.split(/(?<=[。！？!?;；])|(?<=\.\s)/).map(s => s.trim()).filter(s => s.length > 3);
const hits = [];
for (const { file, no, text } of lines) {
  if (/^\s*(\/\/|\/\*|\*)/.test(text)) continue;   // 注释不扫
  for (const s of sentences(text)) for (const [tag, re, why] of CHECKS) {
    if (tag === '最高级' && /First Emperor|第一帝国|First (Republic|Empire|Reich)/.test(s)) continue;   // 专名不算
    const m = s.match(re); if (m) hits.push({ tag, file, no, m: m[0], s: s.length > 90 ? s.slice(0, 90) + '…' : s, why });
  }
}
if (!hits.length) { console.log(`lint-content: ${ALL ? '全站' : REF + '..工作区'} 的 data/ 里没有命中(扫了 ${lines.length} 行)`); process.exit(0); }
console.log(`lint-content: ${ALL ? '全站' : REF + '..工作区'} 新写的 ${lines.length} 行里,${hits.length} 句值得看一眼(清单不是红灯):`);
const byTag = {}; hits.forEach(h => (byTag[h.tag] = byTag[h.tag] || []).push(h));
for (const [tag, arr] of Object.entries(byTag)) {
  console.log(`\n── ${tag}(${arr.length})—— ${arr[0].why}`);
  arr.slice(0, ALL ? 30 : 60).forEach(h => console.log(`  ${h.file}:${h.no}  [${h.m}]  ${h.s}`));
  if (arr.length > (ALL ? 30 : 60)) console.log(`  … 还有 ${arr.length - (ALL ? 30 : 60)} 句`);
}
