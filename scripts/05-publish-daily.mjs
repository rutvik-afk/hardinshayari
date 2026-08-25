/* ============================================================
   Daily publisher — pops the next N entries off the pre-written
   content bank (scripts/data/content-bank.mjs) and publishes them
   via publishBatch(). No AI/API call at run time, so this can run
   unattended in GitHub Actions with zero secrets.

   Usage: node scripts/05-publish-daily.mjs [--count 1]

   When the bank is empty, a normal Claude Code session should
   extend scripts/data/content-bank.mjs with more entries (get the
   next keywords via `node scripts/02-next-keywords.mjs N`) and push.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { publishBatch } from './lib/postgen.mjs';
import { CONTENT_BANK } from './data/content-bank.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BANK_FILE = path.join(ROOT, 'scripts/data/content-bank.mjs');

const countArgIdx = process.argv.indexOf('--count');
const count = countArgIdx > -1 ? parseInt(process.argv[countArgIdx + 1], 10) : 1;

if (CONTENT_BANK.length === 0) {
  console.log('Content bank is empty — nothing to publish today. Extend scripts/data/content-bank.mjs.');
  process.exit(0);
}

const toPublish = CONTENT_BANK.slice(0, count);
const remaining = CONTENT_BANK.slice(count);

const { ok, fail } = await publishBatch(toPublish);

// Rewrite the bank file with the published entries removed.
function serializeEntry(e) {
  const lines = [
    '  { category: ' + JSON.stringify(e.category) + ', lang: ' + JSON.stringify(e.lang) + ', keyword: ' + JSON.stringify(e.keyword) + (e.styleNote ? ', styleNote: ' + JSON.stringify(e.styleNote) : '') + ',',
    '    title: ' + JSON.stringify(e.title) + ',',
    '    lines: [' + e.lines.map((l) => JSON.stringify(l)).join(', ') + '] },',
  ];
  return lines.join('\n');
}

const header = `/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with \`node scripts/02-next-keywords.mjs N\` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
${remaining.map(serializeEntry).join('\n')}
];
`;
fs.writeFileSync(BANK_FILE, header);

console.log(`Published ${ok} (failed ${fail}). ${remaining.length} entries left in the bank.`);
