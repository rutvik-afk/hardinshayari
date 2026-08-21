/* ============================================================
   STEP 1 — turn the raw competitor-export CSVs into one ranked,
   de-duplicated, categorized keyword queue that the daily post
   generator pulls from (data/keyword-queue.json).
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { CATEGORIES } from '../site.config.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const RAW_DIR = path.join(ROOT, 'data/keywords-raw');
const OUT = path.join(ROOT, 'data/keyword-queue.json');

/* --- tiny CSV parser (handles quoted fields with commas/newlines) --- */
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c === '\r') { /* skip */ }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function loadRows(file) {
  const text = fs.readFileSync(file, 'utf-8').replace(/^﻿/, '');
  const table = parseCSV(text);
  const header = table[0];
  const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
  return table.slice(1).filter((r) => r.length > 1).map((r) => ({
    keyword: (r[idx['Keyword']] || '').trim().toLowerCase(),
    volume: parseInt(r[idx['Search Volume']] || '0', 10) || 0,
    kd: parseInt(r[idx['Keyword Difficulty']] || '0', 10) || 0,
    intent: (r[idx['Keyword Intents']] || '').trim(),
  }));
}

/* --- topic classifier: pattern -> category id --- */
const RULES = [
  ['attitude-shayari', ['attitude', 'rangdari', 'badmash', 'royal', 'nawabi', 'khiladi']],
  ['sad-shayari', ['sad', 'dard', 'broken heart', 'breakup', 'tanhai', 'akela', 'alone', 'judai', 'zindagi dard']],
  ['love-shayari', ['love', 'ishq', 'pyar', 'pyaar', 'romantic', 'mohabbat', 'crush', 'propose']],
  ['dosti-shayari', ['dosti', 'friend', 'yaari', 'yaar ', 'yaron']],
  ['gulzar-shayari', ['gulzar', 'zakir khan', 'munawar', 'mohsin naqvi', 'jaun elia', 'ghalib', 'rahat indori', 'faiz ahmed', 'wasim barelvi', 'bashir badr', 'nida fazli']],
  ['sorry-shayari', ['sorry', 'miss you', 'maafi', 'i miss']],
  ['religious-shayari', ['bhakti', 'ram ', 'krishna', 'shiv', 'mahadev', 'allah', 'islamic shayari', 'quotes on god']],
  ['two-line-shayari', ['2 line', 'two line', 'do line', '2-line']],
  ['status-captions', ['status', 'caption', 'bio for', 'whatsapp status', 'instagram caption', 'fb status']],
  ['life-shayari', ['life', 'zindagi', 'motivat', 'success', 'struggle', 'positive thought', 'inspir']],
  ['english-shayari', ['english']],
];

/* word-boundary match — plain .includes() false-positives badly on short
   tokens (e.g. pattern "ram " matches inside "instaGRAM Shayari"). */
function hasPattern(keyword, pattern) {
  const escaped = pattern.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}`, 'i').test(keyword);
}

function classify(keyword) {
  for (const [cat, pats] of RULES) {
    if (pats.some((p) => hasPattern(keyword, p))) return cat;
  }
  return null;
}

function detectLang(keyword) {
  if (/\bin english\b|\benglish\b/.test(keyword) && !/hindi/.test(keyword)) return 'en';
  if (/hindi|hindi mein|shayri|shayari in hindi/.test(keyword)) return 'hi';
  return 'hi'; /* default: Hindi audience is the bigger volume pool for this niche */
}

/* --- load + merge, keeping max volume per unique keyword --- */
const merged = new Map();
for (const file of fs.readdirSync(RAW_DIR).filter((f) => f.endsWith('.csv'))) {
  for (const r of loadRows(path.join(RAW_DIR, file))) {
    if (!r.keyword || r.volume < 200) continue; // drop noise / near-zero volume
    const prev = merged.get(r.keyword);
    if (!prev || r.volume > prev.volume) merged.set(r.keyword, r);
  }
}

/* --- hand-picked long-tail supplements for categories the raw exports under-covered.
   These don't have real Search-Volume data behind them (marked volume:0 -> treated as
   "est." in the UI), but they're natural, commonly-searched variants of keywords that
   DID show real volume above, so they're safe to target without guessing wildly. */
const SUPPLEMENT = [
  ['dosti-shayari', 'hi', ['dosti shayari 2 line', 'best friend shayari in hindi', 'purani dosti shayari', 'dosti shayari for whatsapp', 'yaari dosti shayari', 'dosti shayari status', 'true friend shayari hindi', 'dosti shayari on birthday', 'school friend shayari', 'dosti shayari attitude wali']],
  ['dosti-shayari', 'en', ['friendship shayari in english', 'best friend shayari in english', 'dosti shayari english translation', 'friendship status in english']],
  ['sorry-shayari', 'hi', ['sorry shayari for girlfriend', 'sorry shayari for boyfriend', 'maafi shayari hindi', 'sorry shayari for friend', 'miss you shayari hindi', 'miss you dost shayari', 'sorry status hindi', 'galti maaf shayari']],
  ['sorry-shayari', 'en', ['sorry shayari in english for love', 'miss you shayari in english', 'i am sorry shayari english']],
  ['religious-shayari', 'hi', ['ram bhakti shayari', 'krishna shayari hindi', 'mahadev shayari', 'shiv bhakti shayari', 'allah shayari hindi', 'islamic shayari in hindi', 'geeta gyan shayari', 'bhakti shayari status', 'mata rani shayari', 'hanuman ji shayari']],
  ['religious-shayari', 'en', ['god quotes shayari in english', 'spiritual shayari in english']],
  ['life-shayari', 'hi', ['zindagi par shayari', 'motivational shayari hindi', 'success shayari hindi', 'struggle shayari hindi', 'life status hindi', 'zindagi shayari status', 'positive shayari hindi', 'hard work shayari', 'kamyabi shayari']],
  ['life-shayari', 'en', ['motivational shayari in english', 'life shayari in english status', 'success quotes shayari english']],
  ['two-line-shayari', 'hi', ['2 line shayari attitude hindi', '2 line shayari love', '2 line shayari dosti', '2 line shayari zindagi', 'do line shayari status', '2 line shayari sad hindi']],
  ['two-line-shayari', 'en', ['2 line shayari in english love', '2 line shayari in english attitude']],
  ['status-captions', 'hi', ['instagram caption hindi shayari', 'whatsapp status shayari hindi', 'fb status shayari hindi', 'single status shayari', 'attitude caption hindi', 'love caption hindi shayari']],
  ['status-captions', 'en', ['instagram caption shayari english', 'whatsapp status shayari english', 'bio shayari for instagram english']],
  ['gulzar-shayari', 'hi', ['gulzar shayari on zindagi', 'gulzar shayari on dosti', 'gulzar shayari 2 line', 'gulzar sad shayari', 'gulzar shayari status']],
];
for (const [category, lang, keywords] of SUPPLEMENT) {
  for (const keyword of keywords) {
    if (!merged.has(keyword)) merged.set(keyword, { keyword, volume: 0, kd: 15, intent: 'informational', _supplement: true, _cat: category, _lang: lang });
  }
}

const queue = [];
for (const r of merged.values()) {
  if (r._supplement) {
    queue.push({ keyword: r.keyword, volume: 0, kd: r.kd, category: r._cat, lang: r._lang, score: 5, used: false, estimated: true });
    continue;
  }
  const category = classify(r.keyword);
  if (!category) continue; // unassigned keywords are out of scope for v1
  const lang = detectLang(r.keyword);
  /* opportunity score: reward volume, penalize difficulty so easy wins surface first */
  const score = r.volume / (r.kd + 5);
  queue.push({ keyword: r.keyword, volume: r.volume, kd: r.kd, category, lang, score, used: false });
}

/* rank globally by score, but keep category info so the daily picker can balance */
queue.sort((a, b) => b.score - a.score);

/* dedupe near-identical keywords per category (e.g. "attitude shayari" vs "attitude shayari in hindi")
   would both survive — that's fine, they become separate posts targeting separate long-tail terms. */

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), queue }, null, 2));

console.log(`Queue built: ${queue.length} keywords across ${new Set(queue.map(q=>q.category)).size} categories`);
const byCat = {};
for (const q of queue) byCat[q.category] = (byCat[q.category] || 0) + 1;
for (const c of CATEGORIES) console.log(`  ${c.id.padEnd(20)} ${byCat[c.id] || 0}`);
