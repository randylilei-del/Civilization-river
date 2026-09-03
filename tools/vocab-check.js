#!/usr/bin/env node
/* 词汇覆盖体检(v366,Ray:「补两个词治不了根,其他词进来还是找不到」)。
   病根是词汇失配:站里写「河西四郡」,孩子搜「河西走廊」——全文匹配对此无解,
   语义搜索又跑不了(单文件/离线/零外部请求)。根治换个地方使劲:
   **把「猜孩子会搜什么」变成「拿真实词表批量实测」**——跟 audit 同一个哲学。

   词表 tools/vocab-probes.tsv:每行「词 \t 期望带1|期望带2 \t 备注」,# 开头是注释。
   期望带 = 搜索前三名里应当出现的带(多个候选任一命中即过);「-」= 只要非零命中就行。
   跑真实的 sQuery(无头 Chrome 加载 index.html,与 smoke 同一套路),报三类:
   零命中 / 跑偏(前三没有期望带) / 通过。退出码:有零命中或跑偏 = 1。

   用法:node tools/vocab-check.js [--all]   默认只打印问题,--all 连通过的也列。
   新词来源:① 课本/百科/纪录片词表(本文件首批) ② localStorage whviz-sq 的真实零命中
   (页面里搜「??」可以看,见 index.html 搜索框处理)。 */
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright-core');
const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'].find(fs.existsSync);
const IDX = 'file://' + path.resolve(__dirname, '..', process.env.SMOKE_INDEX || 'index.html');
const ALL = process.argv.includes('--all');

const probes = fs.readFileSync(path.join(__dirname, 'vocab-probes.tsv'), 'utf8')
  .split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'))
  .map(l => { const [q, exp, note] = l.split('\t'); return { q, exp: (exp || '-').split('|'), note: note || '' }; });

(async () => {
  const b = await chromium.launch({ headless: true, executablePath: CHROME });
  const p = await b.newPage(); await p.goto(IDX); await p.waitForTimeout(600);
  /* 期望带名必须真实存在——写错的期望会制造假「跑偏」,先拦下来 */
  const names = new Set(await p.evaluate(() => CIVS.map(c => c.n)));
  let bad = 0;
  for (const pr of probes) for (const e of pr.exp)
    if (e !== '-' && e !== '!' && !names.has(e)) { bad++; console.log(`⚠ 词表配置错 「${pr.q}」 期望带「${e}」不存在`); }
  if (bad) { await b.close(); console.log(`vocab-check: ${bad} 条期望带名写错,先修词表`); process.exit(2); }
  let zero = 0, off = 0, ok = 0;
  for (const pr of probes) {
    const r = await p.evaluate(x => { try { return sQuery(x).map(o => o.c.n); } catch (e) { return ['ERR:' + e.message]; } }, pr.q);
    /* 期望「!」= 已知空白:站内确实没有这块内容,零命中是对的;哪天有了内容反而该报,提醒更新词表 */
    if (pr.exp[0] === '!') {
      if (!r.length) { ok++; if (ALL) console.log(`✓ ${pr.q} → (已知空白,零命中符合预期)`); }
      else { off++; console.log(`△ 空白已填?「${pr.q}」 现在命中:${r.slice(0,3).join('、')} —— 把词表里的 ! 换成期望带`); }
      continue;
    }
    if (!r.length) { zero++; console.log(`✗ 零命中  「${pr.q}」 期望:${pr.exp.join('/')}${pr.note ? '  (' + pr.note + ')' : ''}`); continue; }
    if (String(r[0]).startsWith('ERR:')) { zero++; console.log(`✗ 报错   「${pr.q}」 ${r[0]}`); continue; }
    const top3 = r.slice(0, 3);
    const hit = pr.exp[0] === '-' || pr.exp.some(e => top3.includes(e));
    if (!hit) { off++; console.log(`△ 跑偏   「${pr.q}」 前三:${top3.join('、')} 期望:${pr.exp.join('/')}`); }
    else { ok++; if (ALL) console.log(`✓ ${pr.q} → ${top3.join('、')}`); }
  }
  await b.close();
  console.log(`\nvocab-check: ${probes.length} 词 | 通过 ${ok} | 零命中 ${zero} | 跑偏 ${off}`);
  process.exit(zero + off ? 1 : 0);
})();
