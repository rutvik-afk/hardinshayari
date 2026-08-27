/* ============================================================
   Daily publisher — pops the next N entries off the pre-written
   content bank (scripts/data/content-bank.mjs) and publishes them
   via publishBatch(). No AI/API call at run time, so this can run
   unattended in GitHub Actions with zero secrets.

   GitHub's `schedule` trigger is best-effort — runs can be delayed
   or silently dropped under platform load, especially on low-activity
   repos. So instead of a fixed "1 per run" and a handful of cron
   slots, the workflow fires often (every 2h) and this script is
   quota-aware: it looks at how many posts already carry today's IST
   date and only tops up to --daily-quota, so extra/duplicate fires
   are harmless no-ops and a missed slot gets caught by the next one.

   Usage:
     node scripts/05-publish-daily.mjs --daily-quota 4   (normal/CI use)
     node scripts/05-publish-daily.mjs --count 1         (manual override)

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
const POSTS_DIR = path.join(ROOT, 'src/content/posts');

function todayIST() {
  // IST = UTC+5:30 — compute the date string as seen in India, since
  // that's the audience this "daily" cadence is built around.
  const now = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return now.toISOString().slice(0, 10);
}

function countPublishedToday() {
  const today = todayIST();
  let n = 0;
  for (const category of fs.readdirSync(POSTS_DIR)) {
    const catDir = path.join(POSTS_DIR, category);
    if (!fs.statSync(catDir).isDirectory()) continue;
    for (const file of fs.readdirSync(catDir)) {
      if (!file.endsWith('.md')) continue;
      const raw = fs.readFileSync(path.join(catDir, file), 'utf-8');
      const m = raw.match(/^date:\s*(\S+)/m);
      if (m && m[1] === today) n++;
    }
  }
  return n;
}

const countArgIdx = process.argv.indexOf('--count');
const quotaArgIdx = process.argv.indexOf('--daily-quota');

let count;
if (countArgIdx > -1) {
  count = parseInt(process.argv[countArgIdx + 1], 10);
} else if (quotaArgIdx > -1) {
  const quota = parseInt(process.argv[quotaArgIdx + 1], 10);
  const already = countPublishedToday();
  count = Math.max(0, quota - already);
  console.log(`Today (IST): ${already}/${quota} already published.`);
} else {
  count = 1;
}

if (count === 0) {
  console.log("Today's quota is already met — nothing to do.");
  process.exit(0);
}

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
