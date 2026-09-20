/* One-off: exports N posts as a WordPress eXtended RSS (WXR) file —
   the standard format WordPress's built-in importer (Tools > Import >
   WordPress) reads. Lets the user pull Har Din Shayari content into a
   separate WordPress install without re-typing anything.
   Usage: node scripts/export-wordpress.mjs [count] */
import fs from 'node:fs';
import path from 'node:path';
import { SITE, CATEGORY_MAP } from '../site.config.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');
const count = parseInt(process.argv[2] || '10', 10);

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const fm = {}; const lines = m[1].split('\n'); let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv && kv[2] === '') {
      const arr = []; i++;
      while (i < lines.length && lines[i].startsWith('  - ')) { arr.push(JSON.parse(lines[i].slice(4))); i++; }
      fm[kv[1]] = arr; continue;
    }
    if (kv) {
      let val = kv[2];
      if (val.startsWith('"')) val = JSON.parse(val);
      else if (val.startsWith('[')) val = JSON.parse(val);
      fm[kv[1]] = val;
    }
    i++;
  }
  return { fm, body: m[2].trim() };
}

// Gather one post per category first (diverse sample), then fill up to count.
const byCategory = {};
for (const category of fs.readdirSync(POSTS_DIR)) {
  const catDir = path.join(POSTS_DIR, category);
  if (!fs.statSync(catDir).isDirectory()) continue;
  byCategory[category] = fs.readdirSync(catDir).filter((f) => f.endsWith('.md')).map((f) => path.join(catDir, f));
}
const picked = [];
const cats = Object.keys(byCategory);
let ci = 0;
while (picked.length < count && cats.some((c) => byCategory[c].length)) {
  const c = cats[ci % cats.length];
  if (byCategory[c].length) picked.push(byCategory[c].shift());
  ci++;
}

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const cdata = (s) => `<![CDATA[${String(s ?? '').replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

const items = picked.map((filePath, idx) => {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { fm, body } = parseFrontmatter(raw);
  const cat = CATEGORY_MAP[fm.category];
  const catName = fm.lang === 'hi' ? cat.nameHi : cat.nameEn;
  const slug = path.basename(filePath, '.md');
  const link = `${SITE.url}/${fm.category}/${slug}/`;
  const imageUrl = new URL(fm.image, SITE.url).toString();
  const pubDate = new Date(fm.date).toUTCString();
  const contentHtml = `<img src="${esc(imageUrl)}" alt="${esc(fm.title)}" /><br />\n` +
    fm.lines.map((l) => `<p>${esc(l)}</p>`).join('\n') + `\n<p>${esc(body).replace(/\n\n/g, '</p><p>')}</p>`;

  return `    <item>
      <title>${cdata(fm.title)}</title>
      <link>${esc(link)}</link>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[hardinshayari]]></dc:creator>
      <guid isPermaLink="false">${esc(link)}</guid>
      <description></description>
      <content:encoded>${cdata(contentHtml)}</content:encoded>
      <excerpt:encoded>${cdata(fm.metaDescription)}</excerpt:encoded>
      <wp:post_id>${1000 + idx}</wp:post_id>
      <wp:post_date><![CDATA[${new Date(fm.date).toISOString().slice(0, 19).replace('T', ' ')}]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[${new Date(fm.date).toISOString().slice(0, 19).replace('T', ' ')}]]></wp:post_date_gmt>
      <wp:comment_status><![CDATA[open]]></wp:comment_status>
      <wp:ping_status><![CDATA[open]]></wp:ping_status>
      <wp:post_name><![CDATA[${slug}]]></wp:post_name>
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[post]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
      <category domain="category" nicename="${esc(fm.category)}"><![CDATA[${catName}]]></category>
      ${(fm.tags || []).map((t) => `<category domain="post_tag" nicename="${esc(t)}"><![CDATA[${esc(t)}]]></category>`).join('\n      ')}
    </item>`;
}).join('\n');

const wxr = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
  <title>${esc(SITE.name)}</title>
  <link>${esc(SITE.url)}</link>
  <description>${esc(SITE.description)}</description>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <language>hi</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${esc(SITE.url)}</wp:base_site_url>
  <wp:base_blog_url>${esc(SITE.url)}</wp:base_blog_url>
${items}
</channel>
</rss>
`;

const outDir = path.join(ROOT, 'exports');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'hardinshayari-wordpress-export.xml');
fs.writeFileSync(outFile, wxr);
console.log(`Wrote ${picked.length} posts to ${outFile}`);
