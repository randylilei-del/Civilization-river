#!/usr/bin/env node
/* 文明长河 — 数据统一加载器(Phase 3,设计见 docs/ARCH.md)
 *
 * 取代 audit/coverage/peakgap/refs 各自的「从 index.html 切字符串」:
 *   - 数据表:直接求值 data/*.js(按目录枚举,不按位置切——新表落盘即被发现,
 *     「AGLYPH 要在 TRACES 之后单独补一段」那类位置陷阱从根上消失)
 *   - config 表(LANES 等渲染参数,永远留在 index.html):按名字定位 + 括号配平抽取,
 *     任何一个找不到或配不平都大声报错,不存在静默漏掉
 *
 * 用法: const D = require('./load')();   // D.CIVS / D.PEAK / D.LANES / …
 * 求值错误会带上出错文件名(vm 的 filename),比整段拼起来再炸好定位得多。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');

/* index.html 里的 config 表(docs/DATA.md「表的性质与住处」的 config 行)。
   工具需要谁就列谁;列了却抽不到 = 硬错误。 */
const CONFIG_CONSTS = ['LANES', 'SPHERES', 'ERAS', 'EV_NAME', 'PGLYPH', 'PGNAME', 'AGLYPH', 'AGNAME'];

/* 按名字抽一条 const 声明:跳过字符串与注释的括号配平。 */
function grabConst(src, name) {
  const m = new RegExp('^const ' + name + '\\s*=', 'm').exec(src);
  if (!m) throw new Error(`index.html 里找不到 const ${name}`);
  let i = src.indexOf('=', m.index) + 1;
  while (i < src.length && src[i] !== '{' && src[i] !== '[') i++;
  let depth = 0, j = i;
  while (j < src.length) {
    const ch = src[j];
    if (ch === "'" || ch === '"' || ch === '`') {
      const q = ch; j++;
      while (j < src.length && src[j] !== q) { if (src[j] === '\\') j++; j++; }
    } else if (ch === '/' && src[j + 1] === '*') { j = src.indexOf('*/', j) + 1; }
    else if (ch === '/' && src[j + 1] === '/') { j = src.indexOf('\n', j); }
    else if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') { depth--; if (!depth) break; }
    j++;
  }
  if (depth) throw new Error(`const ${name}: 括号不配平(抽取失败)`);
  return src.slice(m.index, j + 1) + ';';
}

function load() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js')).sort();
  const ctx = vm.createContext({});
  // 数据表:逐文件求值。同名重复声明会当场 SyntaxError——这本身就是护栏。
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'), ctx, { filename: 'data/' + f });
  }
  // config 表:从 index.html 按名抽取
  const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  for (const name of CONFIG_CONSTS) {
    vm.runInContext(grabConst(src, name), ctx, { filename: 'index.html#' + name });
  }
  const names = files.map(f => f.slice(0, -3).toUpperCase()).concat(CONFIG_CONSTS);
  const D = vm.runInContext('({' + names.join(',') + '})', ctx);

  /* ⚠ 镜像 index.html 里 GL_X 的合并逻辑(在那边搜「Object.entries(GL_X)」)。
     为什么必须有:旧 audit 的位置切片恰好把这段合并代码也切进去跑了,所以历来
     校验的都是**合并后**的 GL(265 段/140 全覆盖);loader 只求值数据声明,不镜像
     合并的话 GL 会退回合并前(170 段/112 覆盖)——exit 码不变,校验对象却悄悄缩水。
     Phase 3 切换时就是靠对照迁移前后的统计行才逮住的。**index.html 那边改合并
     逻辑,这里要跟**。 */
  for (const [n, v] of Object.entries(D.GL_X)) {
    const c = D.CIVS.find(x => x.n === n);
    const arr = D.GL[n] || (c && c.gl);
    if (arr) arr.push(...v); else D.GL[n] = v.slice();
  }
  D.CIVS.forEach(c => { const g = D.GL[c.n] || c.gl; if (g) g.sort((x, y) => x.a - y.a); });

  return D;
}

module.exports = load;
