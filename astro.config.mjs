import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from './site.config.mjs';

// slug -> publish date, so each post URL in the sitemap carries a real <lastmod>
const POSTS = path.resolve('src/content/posts');
const lastmod = {};
for (const cat of fs.readdirSync(POSTS)) {
  const dir = path.join(POSTS, cat);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) {
    const m = f.endsWith('.md') && fs.readFileSync(path.join(dir, f), 'utf-8').match(/^date:\s*(\S+)/m);
    if (m) lastmod[`/${cat}/${f.slice(0, -3)}/`] = new Date(m[1]).toISOString();
  }
}


export default defineConfig({
  site: SITE.url,
  integrations: [sitemap({
    serialize(item) {
      const key = new URL(item.url).pathname;
      item.lastmod = lastmod[key] || new Date().toISOString();
      return item;
    },
  })],
  build: { format: 'directory' },
});
