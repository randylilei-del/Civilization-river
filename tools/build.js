#!/usr/bin/env node
/* 文明长河 — 数据注入构建(设计见 docs/ARCH.md)
 *
 * index.html 里被 /*__DATA:<名>:start__* / … /*__DATA:<名>:end__* / 包住的区间,
 * 内容由 data/<名>.js 的原文覆写。纯字符串拼接:无时间戳、无重排序 → 确定性构建。
 *
 * 用法:
 *   node tools/build.js          改了 data/*.js 之后跑,更新 index.html
 *   (audit 规则 45 调用本文件的 check(),防 index.html 与 data/ 漂移)
 *
 * 约定:
 *   - data/<名>.js 的内容就是原样的 const 声明文本(含表头注释),文件尾一个换行
 *   - 标记名 = 文件名去掉 .js,只允许 [a-z0-9_]
 *   - 双向核对:有标记没文件、有文件没标记、标记不成对,都是硬错误
 * 结构性错误一律 throw(CLI 入口捕获后 exit 1)——不在库代码里直接 exit,
 * 否则 audit require 进来跑 check() 会被连坐杀掉。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IDX = path.join(ROOT, 'index.html');
const DATA_DIR = path.join(ROOT, 'data');

const MARK = /\/\*__DATA:([a-z0-9_]+):start__\*\/\n([\s\S]*?)\n\/\*__DATA:\1:end__\*\//g;

function build() {
  const src = fs.readFileSync(IDX, 'utf8');
  const files = fs.existsSync(DATA_DIR)
    ? fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3))
    : [];
  const seen = [];
  const out = src.replace(MARK, (m, name) => {
    seen.push(name);
    const fp = path.join(DATA_DIR, name + '.js');
    if (!fs.existsSync(fp)) throw new Error(`标记 ${name} 没有对应的 data/${name}.js`);
    // 文件尾的一个换行是文件格式约定,注入时去掉(区间格式:start标记\n 内容 \nend标记)
    const txt = fs.readFileSync(fp, 'utf8').replace(/\n$/, '');
    if (/__DATA:/.test(txt)) throw new Error(`data/${name}.js 内容里出现了 __DATA: 标记字样`);
    return `/*__DATA:${name}:start__*/\n${txt}\n/*__DATA:${name}:end__*/`;
  });
  // 双向核对
  for (const n of files) if (!seen.includes(n)) throw new Error(`data/${n}.js 在 index.html 里没有标记`);
  const dup = seen.find((n, i) => seen.indexOf(n) !== i);
  if (dup) throw new Error(`标记 ${dup} 出现了多次`);
  // 残留检测:成对匹配之外不允许有任何 __DATA: 字样(半个标记、拼错的标记都逃不掉)
  const loose = (out.match(/__DATA:/g) || []).length;
  if (loose !== seen.length * 2) throw new Error(`存在不成对或残留的 __DATA: 标记(匹配到 ${seen.length} 对,但共 ${loose} 处)`);
  return { src, out, tables: seen };
}

/* audit 规则 45 的入口:index.html 是否与 data/ 正本一致 */
function check() {
  const { src, out } = build();
  return src === out;
}

if (require.main === module) {
  try {
    const { src, out, tables } = build();
    if (src === out) {
      console.log(`build: 无变化(${tables.length} 张表与产物一致:${tables.join(' ')})`);
    } else {
      fs.writeFileSync(IDX, out);
      console.log(`build: 已更新 index.html(${tables.length} 张表:${tables.join(' ')})`);
    }
  } catch (e) {
    console.error('build 失败:', e.message);
    process.exit(1);
  }
}

module.exports = { build, check };
