#!/usr/bin/env node
/* PEAK 缺口盘点：列出还没有版图数字(a)的色带，附泳道、年限、影响力峰值。
 * 用法: node tools/peakgap.js
 */
const {CIVS,PEAK,LANES}=require('./load')();
const rows=[];
for(const c of CIVS){
  const p=PEAK[c.n];
  if(p&&p.a!=null) continue;
  const ks=c.k||[];
  const y0=ks.length?ks[0][0]:null, y1=ks.length?ks[ks.length-1][0]:null;
  let mi=0,my=null; for(const f of ks){ if(f[1]>mi){mi=f[1];my=f[0];} }
  rows.push({n:c.n,lane:(LANES[c.l]&&(LANES[c.l].n||LANES[c.l]))||c.l,y0,y1,mi,my,
             hasP:!!(p&&p.p!=null),hasW:!!(p&&p.w!=null)});
}
rows.sort((a,b)=>b.mi-a.mi);
const yr=y=>y==null?'?':(y<0?'前'+(-y):''+y);
console.log(`PEAK 缺口 ${rows.length} 条 / 共 ${CIVS.length} 条色带（已有 ${CIVS.length-rows.length}）\n`);
console.log('影响力峰值  泳道        年限                色带');
for(const r of rows){
  console.log(String(r.mi.toFixed(2)).padStart(9),' ',String(r.lane).padEnd(9),
    (yr(r.y0)+'–'+yr(r.y1)).padEnd(18), r.n, r.hasP?'[有人口]':'', r.hasW?'[有占比]':'');
}
