/* 文明长河 — DOM 等价快照(Phase 4 的验证工具,2026-08-09)
 *
 * 为什么存在:Phase 1-3 的验证靠 byte-diff,Phase 4 要改渲染器,byte-diff 失效。
 * 本脚本把「用户实际看到的渲染产物」逐项算哈希:重构前存基线,重构后重跑比对,
 * **任何一条哈希变了都必须能逐条解释**(纯重构应为零差异)。
 *
 * 用法(不是 node 脚本,是浏览器控制台/claude-in-chrome 里跑的):
 *   1. 本地起服务器打开 index.html(每次快照前先 reload,保证状态干净)
 *   2. 把本文件整段粘进 console 执行,返回 JSON 字符串
 *   3. 存到 scratchpad,和基线 diff(python json.load 逐键比对)
 *
 * 覆盖面(= EN 字典的全部消费路径):
 *   card:{lang}:{文明名}   140×2  panel.innerHTML → cN/cB/cD/cF/chronoOf/lName/sName/wkA(w)
 *   event:{lang}:{事件名}   22×2  openEvent 的 panel → evTitle/evDesc
 *   strings:{lang}               泳道名/文明圈名/时代名/事件类型名的直接拼串
 * 不覆盖:悬停 tooltip(与事件卡同 accessor)、地理视角(PLACE_LORE 内联双语,Phase 4 不碰)。
 */
(() => {
  const hash = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };
  const out = {};
  for (const lang of ['zh', 'en']) {
    document.querySelector('[data-l=' + lang + ']').click();
    for (const c of CIVS) { openCiv(c); out['card:' + lang + ':' + c.n] = hash(document.querySelector('#panel').innerHTML); }
    for (const ev of EVENTS) { openEvent(ev); out['event:' + lang + ':' + (Array.isArray(ev.n) ? ev.n[0] : ev.n)] = hash(document.querySelector('#panel').innerHTML); }
    out['strings:' + lang] = hash([
      LANES.map(l => lName(l.id)).join('|'),
      LANES.map(l => sName(Object.keys(SPHERES)[0])).length ? Object.keys(SPHERES).map(k => sName(k)).join('|') : '',
      ERAS.map((e, i) => LANG === 'zh' ? e.n : (e.en || (typeof EN !== 'undefined' && EN.eras && EN.eras[i]))).join('|'),
      Object.keys(EV_NAME).map(t => evType(t)).join('|'),
    ].join('##'));
  }
  document.querySelector('[data-l=zh]').click();
  return JSON.stringify(out);
})();
