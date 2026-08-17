/* 新带内容**插入前**预检。用法:node tools/newband.js <band 文件.js>
   band 文件导出 {name, civ, geo, chrono, gl}(字符串),见 HANDOFF「新带的固定流程」。

   为什么要有这一步:下面每一条都是真犯过的错,而 audit 全都能拦——但那是插进
   仓库之后,来回改一次的成本远高于插入前扫一遍。2026-08-16 起用,当场拦下过
   8 次 markdown 残留、多次钩子与正文重复、缺中文 d、英文钩子超词数、
   PLACE 缺古地名、PEAK 未处理。 */
/* 新带内容插入前的自检。用法: node precheck.js band7
   拦的是我反复犯的那几个错——audit 也能拦,但那是插入之后,来回改成本高。
   2026-08-16 起用:markdown 残留犯过 3 次、钩子与正文首句重复犯过 4 次、
   锚点劈条目犯过 2 次(这条脚本拦不了,靠 addband 里取条目开头锚点)。 */
const B = require(require('path').resolve(process.argv[2]));
const src = B.civ + (B.chrono || '') + (B.gl || '') + (B.geo || '');
let bad = 0;
const fail = m => { console.log('❌ ' + m); bad++; };

/* ① markdown 残留(数据层不许有 **) */
const md = src.match(/\*\*/g);
if (md) fail(`markdown 残留 ${md.length} 处 —— 数据层不能有 **粗体**,星号会原样显示在孩子的卡片上`);

/* ② 钩子与正文首句重复(audit 规则:钩子去标点后前 6 字出现在正文前 20 字) */
const qh = {}, q = {};
for (const m of src.matchAll(/(\w+):\['([^']*(?:\\'[^']*)*)','([^']*(?:\\'[^']*)*)'\]/g)) { /* 粗解析,够用 */ }
const qhBlock = (src.match(/qh:\{([\s\S]*?)\n\s*q:\{/) || [])[1] || '';
const qBlock = (src.match(/\n\s*q:\{([\s\S]*)$/) || [])[1] || '';
for (const key of ['born','rule','money','power','fall','legacy']) {
  const h = (qhBlock.match(new RegExp(key + ":\\['([^']*)'")) || [])[1];
  const b = (qBlock.match(new RegExp(key + ":\\['([^']*)'")) || [])[1];
  if (!h || !b) continue;
  const head = h.replace(/[,。;:、?!「」()]/g, '').slice(0, 6);
  if (head && b.replace(/[,。;:、?!「」()]/g, '').slice(0, 20).includes(head)) fail(`钩子与正文首句重复: qh.${key} 「${h}」`);
  if (h.length > 30) fail(`钩子中文过长 qh.${key} ${h.length} 字(上限 30)`);
}
/* 英文钩子词数 */
for (const m of qhBlock.matchAll(/'[^']*','([^']*(?:\\'[^']*)*)'\]/g)) {
  const w = m[1].trim().split(/\s+/).length;
  if (w > 12) fail(`英文钩子 ${w} 词(上限 12): 「${m[1]}」`);
}

/* ③ f 速览中英项数 —— **只查「成就」与「人物」两格**。
   2026-08-16 教训:第一版把「鼎盛」「中心」也查了,一口气报出全站 17 处不等,
   差点据此去改 16 处既有内容。查了 index.html 才确认 NSPLIT 只用在
   linkAchv(成就)/linkNames(人物) 两处——那两格是按位置把英文换回中文键的,
   项数必须相等;「鼎盛」「中心」根本不拆,英文里的逗号无害。
   报警之前先确认它是不是真的。 */
const NS = s => String(s || '').split(/[、,，;；]/).map(x => x.trim()).filter(Boolean).length;
const zhF = (src.match(/\n\s*f:\{([^}]*)\}/) || [])[1] || '';
const enF = (src.match(/f:\{ 'Peak'([^}]*)\}/) || [])[1] || '';
const zhVals = [...zhF.matchAll(/'[^']*':'([^']*)'/g)].map(m => m[1]);
const enVals = [...("'Peak'" + enF).matchAll(/'[^']*':'([^']*(?:\\'[^']*)*)'/g)].map(m => m[1]);
const zhKeys = [...zhF.matchAll(/'([^']*)':'[^']*'/g)].map(m => m[1]);
if (zhVals.length !== enVals.length) fail(`f 速览格数对不上: 中 ${zhVals.length} vs 英 ${enVals.length}`);
else zhKeys.forEach((k, i) => {
  if (k !== '成就' && k !== '人物') return;   // 只有这两格按位置替换,见上面注释
  if (NS(zhVals[i]) !== NS(enVals[i])) fail(`f「${k}」中英项数不等(这两格按位置替换,必须相等): 中 ${NS(zhVals[i])}「${zhVals[i]}」 vs 英 ${NS(enVals[i])}「${enVals[i]}」`);
});

/* ④ 中英混排 */
if (/[\u4e00-\u9fa5]/.test(enF)) fail('英文 f 里混进了汉字');

/* ⑤ 是否写了中文 d(规则 69) */
if (!/\n\s*d:'/.test(B.civ)) fail('缺中文 d —— 渲染会静默回退到一句话的 b(audit 规则 69)');


/* ⑥ PLACE 古地名 / PEAK —— 这两项要读仓库,前几条只看 band 文件 */
const fs_ = require('fs');
const R_ = require('path').join(__dirname, '..');
const placeSrc = fs_.readFileSync(R_ + '/data/place.js', 'utf8');
const centerZh = (src.match(/'中心':'([^']*)'/) || [])[1] || '';
for (const nm of centerZh.split(/[、,，;；]/).map(x => x.trim()).filter(Boolean)) {
  if (!placeSrc.includes("'" + nm + "':")) fail(`PLACE 缺古地名「${nm}」—— f['中心'] 里的每一项都要在 data/place.js 里有今地名映射`);
}
const auditSrc = fs_.readFileSync(R_ + '/tools/audit.js', 'utf8');
const peakSrc = fs_.readFileSync(R_ + '/data/peak.js', 'utf8');
const nm_ = (B.civ.match(/n:'([^']+)'/) || [])[1];
if (nm_ && !peakSrc.includes("'" + nm_ + "'") && !auditSrc.includes("'" + nm_ + "'")) fail(`PEAK 未处理「${nm_}」—— 要么在 data/peak.js 给 a,要么进 audit.js 的 PEAK_NA(并写清是哪一类)`);

console.log(bad ? `\n${bad} 处要先改` : '✅ 预检通过,可以插入');
process.exit(bad ? 1 : 0);
