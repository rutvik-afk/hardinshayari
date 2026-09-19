/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "english-shayari", lang: "en", keyword: "hasi shayari english",
    title: "Hasi Shayari English",
    lines: ["A real smile doesn't hide anything,", "it just chooses not to show everything."] },
  { category: "gulzar-shayari", lang: "hi", keyword: "ghalib ke sher", styleNote: "Ghalib",
    title: "ग़ालिब के शेर",
    lines: ["ग़ालिब के शेर आज भी उतने ही सच लगते हैं,", "जितने उनके ज़माने में लगते होंगे।"] },
  { category: "love-shayari", lang: "hi", keyword: "love ghazal shayari",
    title: "लव ग़ज़ल शायरी",
    lines: ["ग़ज़ल में मोहब्बत बयां करना,", "एक तहज़ीब है, सीधी बात नहीं।"] },
  { category: "sad-shayari", lang: "en", keyword: "sad shayari in english language",
    title: "Sad Shayari in English Language",
    lines: ["Pain doesn't need a specific language,", "it just needs someone willing to listen."] },
];
