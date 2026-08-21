/* Shared helpers that turn a bare {title, lang, category, keyword, lines}
   entry into a full post spec (meta description, tags, body copy).
   Used by every seed batch and by the daily automation. */
import { addPost } from '../03-add-post.mjs';
import { CATEGORY_MAP } from '../../site.config.mjs';

export function tagsFor(keyword, category) {
  const words = keyword.split(' ').filter((w) => !['in', 'on', 'for', 'the', 'a'].includes(w));
  return [...new Set([...words.slice(0, 4), category.replace('-shayari', '')])];
}

export function bodyFor(post, cat) {
  const catName = post.lang === 'hi' ? cat.nameHi : cat.nameEn;
  const disclaimer = post.styleNote
    ? (post.lang === 'hi'
        ? `\n\n*यह एक ओरिजिनल रचना है, ${post.styleNote} की शैली से प्रेरित — इसे उनका सीधा कोटेशन न समझें।*`
        : `\n\n*This is an original composition inspired by the ${post.styleNote}-style genre — not a verbatim quote.*`)
    : '';
  if (post.lang === 'hi') {
    return `${catName} में इस बार एक नई रचना — "${post.keyword}" खोज रहे पाठकों के लिए खासतौर पर लिखी गई। ऊपर दिया गया HD फोटो कार्ड मुफ़्त डाउनलोड करें और WhatsApp, Instagram या Facebook पर बेझिझक शेयर करें।${disclaimer}`;
  }
  return `A fresh piece for readers searching "${post.keyword}" — original ${catName.toLowerCase()} written for Har Din Shayari. Download the free HD photo card above and share it on WhatsApp, Instagram, or Facebook.${disclaimer}`;
}

export function metaFor(post, cat) {
  const catName = post.lang === 'hi' ? cat.nameHi : cat.nameEn;
  if (post.lang === 'hi') {
    return `${post.title} — ${catName} पढ़ें और मुफ़्त HD फोटो शायरी कार्ड डाउनलोड करें। रोज़ नई शायरी सिर्फ़ Har Din Shayari पर।`;
  }
  return `${post.title} — read original ${catName.toLowerCase()} and download a free HD photo card. New shayari added every day on Har Din Shayari.`;
}

/** Expands a list of bare post entries and publishes them all. */
export async function publishBatch(entries) {
  let ok = 0, fail = 0;
  for (const post of entries) {
    const cat = CATEGORY_MAP[post.category];
    try {
      const res = await addPost({
        title: post.title,
        lang: post.lang,
        category: post.category,
        keyword: post.keyword,
        lines: post.lines,
        metaDescription: metaFor(post, cat),
        tags: tagsFor(post.keyword, post.category),
        body: bodyFor(post, cat),
      });
      console.log(`✔ ${res.file}`);
      ok++;
    } catch (e) {
      console.error(`✘ ${post.keyword}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} published, ${fail} failed.`);
  return { ok, fail };
}
