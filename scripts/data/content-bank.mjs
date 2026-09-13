/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "english-shayari", lang: "en", keyword: "shayari for girls in english",
    title: "Shayari for Girls in English",
    lines: ["She writes her own story,", "no one else holds the pen."] },
  { category: "attitude-shayari", lang: "hi", keyword: "two line attitude shayari in hindi",
    title: "टू लाइन अटैटीयूड शायरी इन हिंदी",
    lines: ["दो लाइन काफी हैं जवाब देने के लिए,", "बाकी बातें वक़्त खुद दिखा देता है।"] },
  { category: "gulzar-shayari", lang: "hi", keyword: "shayari on life gulzar", styleNote: "Gulzar",
    title: "शायरी ऑन लाइफ गुलज़ार",
    lines: ["ज़िंदगी को गुलज़ार की नज़र से देखो,", "हर पल एक कविता लगने लगेगा।"] },
  { category: "love-shayari", lang: "en", keyword: "love shayari english mein",
    title: "Love Shayari English Mein",
    lines: ["Love, when written in English,", "still sounds like home."] },
];
