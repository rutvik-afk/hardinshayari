/* IndexNow — pushes newly-published URLs straight to Bing/Yandex/Seznam
   (any IndexNow-participating engine) instead of waiting for them to
   crawl the sitemap on their own schedule. Google doesn't consume
   IndexNow directly, but Bing does, and it's a zero-cost, zero-signup
   way to get a second search engine indexing new posts fast. */
import { SITE } from '../../site.config.mjs';

const INDEXNOW_KEY = 'd1be70f25526bc3a179446eac793648c';

export async function submitToIndexNow(urls) {
  if (!urls.length) return;
  const host = new URL(SITE.url).host;
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE.url}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    console.log(`IndexNow: submitted ${urls.length} URL(s), status ${res.status}`);
  } catch (e) {
    // Best-effort — never fail the publish run over a ping to a third party.
    console.log(`IndexNow: submission failed (${e.message}), continuing anyway.`);
  }
}
