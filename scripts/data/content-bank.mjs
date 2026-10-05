/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "english-shayari", lang: "en", keyword: "shero shayari in english",
    title: "Shero Shayari in English",
    lines: ["A good sher doesn't need translation,", "the feeling reaches before the words do."] },
  { category: "attitude-shayari", lang: "hi", keyword: "new hindi status attitude",
    title: "न्यू हिंदी स्टेटस अटैटीयूड",
    lines: ["स्टेटस बदलते रहो,", "पर असली पहचान कभी मत बदलना।"] },
  { category: "gulzar-shayari", lang: "hi", keyword: "zindagi gulzar shayari", styleNote: "Gulzar",
    title: "ज़िंदगी गुलज़ार शायरी स्टाइल",
    lines: ["ज़िंदगी एक नज़्म की तरह है,", "हर ठहराव भी अपनी जगह ज़रूरी होता है।"] },
  { category: "sad-shayari", lang: "hi", keyword: "long sad shayari",
    title: "लॉन्ग सैड शायरी",
    lines: ["दर्द को लंबा बयान करने से वो कम नहीं होता,", "बस समझने वाला कोई मिल जाए तो राहत मिलती है।"] },
];
