/* ============================================================
   STEP 2 — picks the next batch of unused keywords for today's
   posts, balanced across categories so no single category runs
   away with the whole queue. Used by the daily automation prompt.

   Usage: node scripts/02-next-keywords.mjs [count]
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const QUEUE_FILE = path.join(ROOT, 'data/keyword-queue.json');
const count = parseInt(process.argv[2] || '4', 10);

const q = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf-8'));
const unused = q.queue.filter((k) => !k.used);

// round-robin across categories present in the unused pool, highest score first within each
const byCat = {};
for (const k of unused) (byCat[k.category] ||= []).push(k);
for (const cat in byCat) byCat[cat].sort((a, b) => b.score - a.score);

const cats = Object.keys(byCat);
const picked = [];
let i = 0;
while (picked.length < count && cats.some((c) => byCat[c].length)) {
  const cat = cats[i % cats.length];
  if (byCat[cat].length) picked.push(byCat[cat].shift());
  i++;
}

console.log(JSON.stringify({
  remainingTotal: unused.length,
  picked,
}, null, 2));
