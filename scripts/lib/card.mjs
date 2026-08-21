/* ============================================================
   Photo-shayari card generator.
   100% original — gradients, blobs and flourishes drawn in code,
   no stock photos, so there is zero copyright risk. Rendered at
   1080x1350 (Instagram-ideal 4:5) so it's genuinely shareable HD.
   ============================================================ */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { CATEGORY_MAP } from '../../site.config.mjs';

const W = 1080, H = 1350;

/* deep, print-like duotone palettes — one is picked per card from a
   deterministic hash so the same post always renders the same way,
   but the site as a whole shows a rich, varied set of cards. */
const PALETTES = [
  ['#7f1d1d', '#c8102e'], ['#1e1b4b', '#4338ca'], ['#134e4a', '#0f766e'],
  ['#3f2d18', '#a16207'], ['#500724', '#9d174d'], ['#0c1c2e', '#1e3a5f'],
  ['#14532d', '#3f6212'], ['#431407', '#9a3412'], ['#2e1065', '#6d28d9'],
  ['#0c4a6e', '#075985'], ['#4c0519', '#881337'], ['#1c1917', '#44403c'],
  ['#3b0764', '#7e22ce'], ['#052e16', '#166534'], ['#450a0a', '#b91c1c'],
];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Devanagari renders correctly through libvips' SVG rasterizer using this
   macOS system font stack (verified) — Latin falls back to Helvetica. */
const FONT_HI = `'Devanagari Sangam MN','Noto Sans Devanagari',Helvetica,Arial,sans-serif`;
const FONT_EN = `Georgia,'Noto Serif',Helvetica,Arial,sans-serif`;

/* naive line-wrap: our shayari lines are already short (poetic line breaks
   matter), so we only hard-wrap if a single line is unusually long. */
function wrapLine(line, maxChars) {
  if (line.length <= maxChars) return [line];
  const words = line.split(' ');
  const out = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) { out.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) out.push(cur);
  return out;
}

function decorSVG(seed, c1, c2) {
  const blobs = Array.from({ length: 6 }, (_, i) => {
    const cx = ((seed >> (i * 3)) % 100) / 100 * W;
    const cy = ((seed >> (i * 5 + 2)) % 100) / 100 * H;
    const r = 120 + ((seed >> (i * 7)) % 220);
    return `<circle cx="${cx | 0}" cy="${cy | 0}" r="${r}" fill="#fff" opacity="0.045"/>`;
  }).join('');
  return blobs;
}

function cardSVG({ lines, lang, category, keyword }) {
  const cat = CATEGORY_MAP[category];
  const seed = hash(keyword + category);
  const [c1, c2] = PALETTES[seed % PALETTES.length];
  const font = lang === 'hi' ? FONT_HI : FONT_EN;
  const maxChars = lang === 'hi' ? 26 : 34;

  const wrapped = lines.flatMap((l) => wrapLine(l, maxChars));
  const fontSize = wrapped.length <= 3 ? 58 : wrapped.length <= 5 ? 48 : 38;
  const lineHeight = fontSize * 1.55;
  const blockH = wrapped.length * lineHeight;
  const startY = (H - blockH) / 2 + fontSize * 0.55;

  const textEls = wrapped.map((l, i) =>
    `<text x="${W / 2}" y="${(startY + i * lineHeight) | 0}" font-family="${font}" font-size="${fontSize}" font-weight="600" fill="#ffffff" text-anchor="middle" filter="url(#soft)">${esc(l)}</text>`
  ).join('\n');

  const label = (lang === 'hi' ? cat.nameHi : cat.nameEn).toUpperCase();

  /* rotated, oversized emoji silhouette as a subtle full-bleed motif —
     librsvg renders emoji as flat monochrome glyphs (verified), which
     reads as tasteful line-art rather than a garish sticker. */
  const motifRot = 8 + (seed % 10);
  const motifSize = 560 + (seed % 3) * 60;
  const motifX = W * 0.62 + (seed % 5) * 14;
  const motifY = H * 0.72;
  /* strip variation-selector chars (FE0E/FE0F) — some emoji + VS16 crash
     Pango's fallback-font resolution at large sizes on this system. */
  const motifGlyph = cat.emoji.replace(/[︎️]/g, '');

  /* stray light grains for a photographic (not flat-vector) feel */
  const grains = Array.from({ length: 34 }, (_, i) => {
    const gx = ((seed * 7 + i * 131) % 1000) / 1000 * W;
    const gy = ((seed * 13 + i * 257) % 1000) / 1000 * H;
    const gr = 1 + ((seed >> (i % 11)) % 3);
    return `<circle cx="${gx | 0}" cy="${gy | 0}" r="${gr}" fill="#fff" opacity="${0.05 + (i % 4) * 0.02}"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${c1}"/><stop offset="55%" stop-color="${c2}"/><stop offset="100%" stop-color="${c1}"/>
  </linearGradient>
  <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10"/>
    <stop offset="18%" stop-color="#ffffff" stop-opacity="0"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="vign" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#000" stop-opacity="0.4"/>
    <stop offset="28%" stop-color="#000" stop-opacity="0"/>
    <stop offset="68%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
  </linearGradient>
  <radialGradient id="spot" cx="50%" cy="38%" r="65%">
    <stop offset="0%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.35"/>
  </radialGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="3" stdDeviation="7" flood-color="#000" flood-opacity="0.45"/>
  </filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
${decorSVG(seed, c1, c2)}
<g transform="translate(${motifX} ${motifY}) rotate(${motifRot})" opacity="0.16">
  <text x="0" y="0" font-family="Helvetica,Arial,sans-serif" font-size="${motifSize}" text-anchor="middle" dominant-baseline="central">${motifGlyph}</text>
</g>
<rect width="${W}" height="${H}" fill="url(#spot)"/>
<rect width="${W}" height="${H}" fill="url(#sheen)"/>
${grains}
<rect width="${W}" height="${H}" fill="url(#vign)"/>
<rect x="42" y="42" width="${W - 84}" height="${H - 84}" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.5" rx="18"/>
<rect x="70" y="90" width="64" height="4" fill="#ffffff" opacity="0.9"/>
<text x="70" y="70" font-family="Helvetica,Arial,sans-serif" font-size="24" font-weight="700" fill="#ffffff" opacity="0.9" letter-spacing="3">${esc(label)}</text>
<text x="${W / 2}" y="${startY - fontSize * 1.5}" font-family="Georgia,serif" font-size="150" font-weight="700" fill="#ffffff" opacity="0.22" text-anchor="middle">${lang === 'hi' ? '“' : '“'}</text>
${textEls}
<rect x="70" y="${H - 96}" width="46" height="46" fill="#ffffff" opacity="0.18" rx="10"/>
<text x="93" y="${H - 71}" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#ffffff" text-anchor="middle" dominant-baseline="central">✒</text>
<text x="132" y="${H - 78}" font-family="Helvetica,Arial,sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="1">HAR DIN SHAYARI</text>
<text x="132" y="${H - 50}" font-family="Helvetica,Arial,sans-serif" font-size="18" fill="#ffffff" opacity="0.75">hardinshayari.com</text>
</svg>`;
}

/**
 * Render a shayari post to an HD (1080x1350) JPEG card.
 * @returns {Promise<string>} the file path written, relative to /public
 */
export async function makeCard({ lines, lang, category, keyword, slug }) {
  const OUT_DIR = path.resolve(import.meta.dirname, '../../public/cards');
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const svg = cardSVG({ lines, lang, category, keyword });
  await sharp(Buffer.from(svg)).jpeg({ quality: 90, progressive: true }).toFile(outPath);
  return `/cards/${slug}.jpg`;
}
