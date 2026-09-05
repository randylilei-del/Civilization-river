#!/usr/bin/env node
/* 文明长河 — HANDOFF「当前状态」那一行统计数字的唯一来源(2026-09-05 体检立)
 *
 *   node tools/stats.js          打印一行,直接粘进 HANDOFF.md「当前状态」
 *
 * 为什么存在:HANDOFF 那行数字先后两次说谎(一次混着两代数字,一次 172 行/127 城的死数),
 * 根因都是「人手改」。这里全部从 tools/load.js 实算,改完数据跑一次、整行替换,不再手改任何一个数。
 * 口径与 audit.js 统计行 / depth.js 表头一致(GL 段 = data/gl*.js + civs.js 内联 c.gl)。
 */
const D = require('./load')();
const { LANES, CIVS, CHRONO, GL, PEOPLE, ACHV, TRACES, GEO_CITY, CITY_SITES } = D;
const glAll = [...Object.values(GL).flat(), ...CIVS.filter(c => c.gl).flatMap(c => c.gl)];
const sites = Object.values(CITY_SITES).flat();
const n = {
  泳道: LANES.length,
  文明: CIVS.length,
  人物卡: Object.keys(PEOPLE).length,
  成就卡: Object.keys(ACHV).length,
  鼎盛段: glAll.length,
  生活段: glAll.filter(g => g.k === 'life').length,
  大事记: Object.values(CHRONO).reduce((s, a) => s + a.length, 0),
  城: GEO_CITY.length,
  古迹: sites.length,
  馆藏: sites.filter(s => s.mu).length,
  轨迹: TRACES.length,
};
const today = new Date().toISOString().slice(0, 10);
console.log(`- **${n.泳道} 泳道 · ${n.文明} 文明 · ${n.人物卡} 张人物卡 · ${n.成就卡} 张成就卡 · ${n.鼎盛段} 段鼎盛区间(life ${n.生活段})· ${n.大事记} 条大事记 · ${n.城} 城 · ${n.古迹} 处古迹 · ${n.馆藏} 处馆藏 · ${n.轨迹} 轨迹**(${today} 用 \`node tools/stats.js\` 实算;**改数据后重跑整行替换,不手改**)`);
if (process.argv.includes('--json')) console.log(JSON.stringify(n));
