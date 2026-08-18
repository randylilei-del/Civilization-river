#!/usr/bin/env node
/* 文明长河 — 改完一条命令(2026-08-16 立)
 *
 *   node tools/check.js          build 一致性 → audit → 语法 → headless 烟测(smoke),任一红 → exit 1
 *   node tools/check.js --quick  只跑前三项(≈3 秒;不起浏览器)
 *
 * 为什么存在:以前 CLAUDE.md「修改工作流」第 2–4 步是四条散命令 + 一段手粘进浏览器的脚本,
 * 每步都靠人记得跑、记得看真实退出码(`audit | tail` 会吃掉 $?——HANDOFF 已记过一次)。
 * 这里把它们串成一条,顺序固定、退出码可信,pre-commit 也调它。
 * 各步的具体判据仍在各自文件里(build.js / audit.js / smoke.js),本文件只做编排,不重复实现。
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const QUICK = process.argv.includes('--quick');
const t0 = Date.now();
const steps = [];
const run = (name, fn) => {
  const s = Date.now();
  let ok, note = '';
  try { const r = fn(); ok = r === true || (r && r.ok); note = (r && r.note) || ''; }
  catch (e) { ok = false; note = e.message; }
  steps.push({ name, ok, ms: Date.now() - s, note });
  console.log(`${ok ? '✓' : '✗'} ${name}${note ? ' — ' + note : ''} (${Date.now() - s} ms)`);
  return ok;
};
const node = (args, opts = {}) => spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf-8', ...opts });

/* 1. build 一致性:data/*.js 与 index.html 标记区间必须一致(忘跑 build 直接红) */
run('build 一致性(data/ ↔ index.html)', () => {
  const ok = require('./build').check();
  return { ok, note: ok ? '' : '有表未注入,先跑 node tools/build.js' };
});

/* 2. audit:直接看子进程真实退出码,输出原样透传 */
run('audit(结构规则)', () => {
  const r = node(['tools/audit.js']);
  process.stdout.write(r.stdout.split('\n').filter(l => !/^(文明|各泳道)/.test(l)).join('\n').replace(/\n+$/, '\n'));   // 统计行留给 --verbose 的人自己跑
  if (r.stderr) process.stderr.write(r.stderr);
  return { ok: r.status === 0, note: r.status === 0 ? '' : `退出码 ${r.status}` };
});

/* 3. 语法:抽 index.html 的 <script> 段 node --check(与 CLAUDE.md 第 2 步等价,不再依赖 sed 手敲) */
run('语法(index.html <script>)', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
  const m = html.match(/<script>([\s\S]*?)<\/script>/g);
  if (!m) return { ok: false, note: '找不到 <script> 段' };
  const tmp = path.join(require('os').tmpdir(), 'civriver-check.js');
  fs.writeFileSync(tmp, m.map(x => x.replace(/^<script>|<\/script>$/g, '')).join('\n;\n'));
  const r = node(['--check', tmp]);
  return { ok: r.status === 0, note: r.status === 0 ? `${m.length} 段` : r.stderr.split('\n').slice(0, 3).join(' ') };
});

/* 3.5 lint-content:新写内容的可疑句清单(最高级/现在时/大数字/因果词)。只扫 HEAD..工作区的 data/ diff,
   **不计入退出码**——它是给写的人自己看一眼的,不是规则。 */
{
  const r = node(['tools/lint-content.js']);
  const out = (r.stdout || '').trim();
  if (out && !/没有命中/.test(out)) { console.log('· ' + out.split('\n').join('\n  ')); }
  else console.log('· lint-content:新写内容无可疑句(或没有未提交的 data 改动)');
}

/* 4. smoke:headless 渲染层断言(--quick 跳过) */
if (!QUICK) run('smoke(headless 渲染层)', () => {
  const r = node(['tools/smoke.js']);
  process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status === 2) return { ok: false, note: 'smoke 自身没跑起来(缺 playwright-core / Chrome?),见上' };
  return { ok: r.status === 0, note: r.status === 0 ? '' : '见上' };
});
else console.log('· smoke 已跳过(--quick)');

const bad = steps.filter(s => !s.ok);
console.log(`\ncheck: ${bad.length ? bad.length + ' 步失败:' + bad.map(s => s.name).join(' / ') : '全通过'}(${Date.now() - t0} ms)`);
process.exit(bad.length ? 1 : 0);
