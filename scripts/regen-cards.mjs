/* Regenerates every post's HD card image from its markdown frontmatter —
   run after any visual change to scripts/lib/card.mjs. */
import fs from 'node:fs';
import path from 'node:path';
import { makeCard } from './lib/card.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  const lines = m[1].split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv && kv[2] === '') {
      // array block (lines:)
      const arr = [];
      i++;
      while (i < lines.length && lines[i].startsWith('  - ')) {
        arr.push(JSON.parse(lines[i].slice(4)));
        i++;
      }
      fm[kv[1]] = arr;
      continue;
    }
    if (kv) {
      let val = kv[2];
      if (val.startsWith('"')) val = JSON.parse(val);
      else if (val.startsWith('[')) val = JSON.parse(val);
      fm[kv[1]] = val;
    }
    i++;
  }
  return fm;
}

let n = 0;
for (const category of fs.readdirSync(POSTS_DIR)) {
  const catDir = path.join(POSTS_DIR, category);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const file of fs.readdirSync(catDir).filter((f) => f.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(catDir, file), 'utf-8');
    const fm = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, '');
    await makeCard({ lines: fm.lines, lang: fm.lang, category: fm.category, keyword: fm.keyword, slug: `${category}/${slug}` });
    n++;
  }
}
console.log(`Regenerated ${n} cards.`);
