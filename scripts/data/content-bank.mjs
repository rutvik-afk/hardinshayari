/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "english-shayari", lang: "en", keyword: "indian shayari in english",
    title: "Indian Shayari in English",
    lines: ["Our stories are written in two languages,", "but felt in just one — the heart’s."] },
  { category: "sad-shayari", lang: "hi", keyword: "sadgi shayari",
    title: "सादगी शायरी",
    lines: ["सादगी में भी एक खूबसूरत उदासी छुपी होती है,", "जो दिखावे की भीड़ में कहीं खो जाती है।"] },
  { category: "love-shayari", lang: "en", keyword: "sher o shayari in english on love",
    title: "Sher O Shayari in English on Love",
    lines: ["Every verse about love is really about loss,", "because love only becomes poetry once it’s remembered."] },
  { category: "status-captions", lang: "en", keyword: "english shayari status",
    title: "English Shayari Status",
    lines: ["Some days call for silence,", "not status updates."] },
  { category: "two-line-shayari", lang: "hi", keyword: "2 line shayari by famous shayars",
    title: "2 लाइन शायरी मशहूर शायरों के अंदाज़ में",
    lines: ["हर शायर का अपना एक दर्द होता है,", "जो शब्दों में ढलकर सबका दर्द बन जाता है।"] },
  { category: "life-shayari", lang: "hi", keyword: "motivational urdu shayari in hindi",
    title: "मोटिवेशनल उर्दू शायरी हिंदी में",
    lines: ["हार मानने से पहले एक बार और कोशिश कर,", "मंज़िल कभी-कभी बस एक कदम दूर होती है।"] },
  { category: "dosti-shayari", lang: "en", keyword: "friendship shayari in english",
    title: "Friendship Shayari in English",
    lines: ["A true friend doesn’t walk beside you,", "they walk through the same storm without being asked."] },
];
