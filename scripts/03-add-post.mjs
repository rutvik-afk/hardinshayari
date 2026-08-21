/* ============================================================
   STEP 3 — add one shayari post to the site: generates its HD
   photo card, writes the content-collection markdown file, and
   marks the source keyword as used in the queue.

   Usage: node scripts/03-add-post.mjs path/to/post.json
   post.json shape:
   {
     "title": "...", "lang": "hi"|"en", "category": "attitude-shayari",
     "keyword": "attitude shayari", "lines": ["...","..."],
     "metaDescription": "...", "tags": ["..."], "body": "markdown paragraph(s)",
     "date": "2026-08-21"   // optional, defaults to today
   }
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { makeCard } from './lib/card.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const QUEUE_FILE = path.join(ROOT, 'data/keyword-queue.json');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 70);
}

function transliterateSlugFallback(keyword, lang) {
  // Hindi/Devanagari keywords need a Latin slug for clean URLs.
  // If the keyword is already Latin (most of our CSV keywords are,
  // even for lang:'hi' rows like "attitude shayari in hindi"), just slugify it.
  const hasDevanagari = /[ऀ-ॿ]/.test(keyword);
  if (!hasDevanagari) return slugify(keyword);
  return null; // caller must supply an explicit slug
}

export async function addPost(spec, { dryRun = false } = {}) {
  const { title, lang, category, keyword, lines, metaDescription, tags = [], body = '', date, slug: slugOverride } = spec;
  if (!title || !lang || !category || !keyword || !lines?.length || !metaDescription) {
    throw new Error('post spec missing required field(s): title, lang, category, keyword, lines, metaDescription');
  }

  let slug = slugOverride || transliterateSlugFallback(keyword, lang);
  if (!slug) throw new Error(`keyword "${keyword}" is Devanagari — pass an explicit Latin "slug" in the spec`);

  const catDir = path.join(POSTS_DIR, category);
  fs.mkdirSync(catDir, { recursive: true });

  // avoid collisions: if slug exists, suffix -2, -3, ...
  let finalSlug = slug, n = 2;
  while (fs.existsSync(path.join(catDir, `${finalSlug}.md`))) finalSlug = `${slug}-${n++}`;

  const image = dryRun ? '/cards/preview.jpg' : await makeCard({ lines, lang, category, keyword, slug: `${category}/${finalSlug}` });

  const publishDate = date || new Date().toISOString().slice(0, 10);
  const frontmatter = {
    title, lang, category, keyword, lines, metaDescription, image, date: publishDate, tags,
  };

  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `lang: ${lang}`,
    `category: ${category}`,
    `keyword: ${JSON.stringify(keyword)}`,
    `lines:`,
    ...lines.map((l) => `  - ${JSON.stringify(l)}`),
    `metaDescription: ${JSON.stringify(metaDescription)}`,
    `image: ${JSON.stringify(image)}`,
    `date: ${publishDate}`,
    `tags: [${tags.map((t) => JSON.stringify(t)).join(', ')}]`,
    '---',
    '',
    body || '',
    '',
  ].join('\n');

  const outFile = path.join(catDir, `${finalSlug}.md`);
  if (!dryRun) fs.writeFileSync(outFile, fm);

  // mark keyword used in queue (best-effort match)
  if (!dryRun && fs.existsSync(QUEUE_FILE)) {
    const q = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf-8'));
    const entry = q.queue.find((k) => k.keyword === keyword && !k.used);
    if (entry) entry.used = true;
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(q, null, 2));
  }

  return { file: outFile, image, slug: finalSlug };
}

// CLI mode
if (import.meta.url === `file://${process.argv[1]}`) {
  const file = process.argv[2];
  if (!file) { console.error('usage: node scripts/03-add-post.mjs post.json'); process.exit(1); }
  const spec = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const specs = Array.isArray(spec) ? spec : [spec];
  for (const s of specs) {
    const res = await addPost(s);
    console.log(`✔ ${res.file}`);
  }
}
