/* kcheck.js —— 鼎盛段 k 值语义体检（按需跑，**不是 audit 规则**）

   为什么有这个工具（2026-08-22，第三轮对抗核查的「盲区 3 / 4」）：
   audit 只查 k ∈ {econ,art,tech,thought} 的合法性，从不问「这段内容像不像这个 domain」。
   而条上会直接把 k 印成中文标签给孩子看（index.html:`GL_KIND[k].n[li]`），标错了就是
   「思想 · 把中都定在北京」这种读不通的东西。两个真实病例：
     · 孔雀「木头围起来的都城」——整段换成城墙/望楼/壕沟，k 还留在 econ（v304 改 art）
     · 金「把中都定在北京」——讲迁都与营建宫城，k 却是 thought（v305 改 art）
   两者都是「改内容时没回头复审 k」，也都没有任何机制会发现。

   ⚠ 为什么**不**做成 audit 规则：装之前先量过。全站 353 段里这个词表会标出 11 段，
   逐段读完只有 1~2 段是真错，其余是误报（「划船的是自由人，挖矿的是奴隶」里的
   船/矿会撞 tech；凡是写到城/墙/宫/庙的都会撞 art）。精度约两成到四成——
   进 audit 的 warn 通道只会稀释那 16 条既有警告，让人开始整体忽略警告。
   **所以它是一份要人眼过的候选清单，不是红灯。**

   什么时候跑：改完某段的标题或正文之后，跑一次看它有没有进榜。
   怎么读：进榜 ≠ 错。先问「渲染出来的那行中文念得通吗」，念不通再改 k。
   本带各段的标签分布也一并打出来——同一条带四格全同一个标签，通常也是硬凑的信号。

   用法：node tools/kcheck.js            全站扫
         node tools/kcheck.js 金          只看一条带（不进榜也打印，便于改完自查）
*/
const D = require('./load')();
const K = { econ:'经济', life:'生活', art:'艺术', tech:'技术', thought:'思想', inst:'制度' };
const LEX = {
  econ:/贸易|商路|税|钱|银|币|市场|集市|作坊|出口|港|货|粮|租|买|卖|商人|经济/g,
  tech:/技术|工艺|机器|冶|铁|炉|船|水利|渠|历法|测|算|工程|发明|火药|印刷|造/g,
  art:/建筑|宫|庙|塔|门|墙|雕|画|诗|乐|舞|戏|城|陵|壁画|装饰|工匠|美/g,
  thought:/思想|哲学|宗教|经典|学派|信仰|辩论|寺|僧|教义|学问|观念|书院|论/g,
  life:/吃|穿|衣|食|住|睡|饭|米|面|茶|酒|菜|市|夜市|集|节|庆|婚|丧|游戏|玩|孩子|童|家里|屋|巷|街|澡|发型|服饰/g,
  inst:/制度|律|法典|刑|官|吏|考试|科举|征兵|兵制|军制|卫所|旗|府兵|募兵|节度|郡县|分封|税|役|户籍|编户|宪法|条约|政制/g };

const score = g => { const t = g.d[0] + g.t[0], s = {};
  for (const k in LEX) s[k] = (t.match(LEX[k]) || []).length; return s; };
const suspect = g => { const s = score(g);
  const best = Object.keys(s).sort((a, b) => s[b] - s[a])[0];
  return (best !== g.k && s[best] >= (s[g.k] || 0) * 2 && s[best] >= 5) ? best : null; };

const only = process.argv[2];
const all = Object.entries(D.GL);
let n = 0, flagged = 0;

for (const [civ, segs] of all) {
  if (only && civ !== only) continue;
  const rows = [];
  for (const g of segs) { n++;
    const b = suspect(g);
    if (b) { flagged++; rows.push(`  ⚠ 「${K[g.k]} · ${g.t[0]}」  词表倾向 ${K[b]}  ${JSON.stringify(score(g))}`); }
    else if (only) rows.push(`    「${K[g.k]} · ${g.t[0]}」`);
  }
  if (rows.length) console.log(civ + '\n' + rows.join('\n'));
  if (only) { const d = segs.map(g => K[g.k]);
    console.log('  本带标签分布:', d.join(' / '), new Set(d).size === 1 && d.length > 1 ? ' ← 全同,可能是硬凑' : ''); }
}
console.log(`\n扫过 ${n} 段,标出 ${flagged} 段候选。进榜 ≠ 错——先念一遍渲染出来的那行中文,念不通再改。`);
