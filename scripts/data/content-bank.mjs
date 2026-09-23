/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "attitude-shayari", lang: "hi", keyword: "attitude status shayari",
    title: "अटैटीयूड स्टेटस शायरी",
    lines: ["स्टेटस में शायरी लिखना आसान है,", "जीना असली चैलेंज है।"] },
  { category: "gulzar-shayari", lang: "hi", keyword: "zakir khan poetry", styleNote: "Zakir Khan",
    title: "ज़ाकिर खान पोएट्री",
    lines: ["ज़ाकिर खान की पोएट्री में एक अपनापन है,", "जैसे कोई दोस्त बात कर रहा हो।"] },
  { category: "love-shayari", lang: "hi", keyword: "ishq shayari gulzar", styleNote: "Gulzar",
    title: "इश्क़ शायरी गुलज़ार",
    lines: ["गुलज़ार अंदाज़ की इश्क़ शायरी में,", "खामोशी भी बहुत कुछ कह जाती है।"] },
  { category: "sad-shayari", lang: "hi", keyword: "new sad shayri in hindi",
    title: "न्यू सैड शायरी इन हिंदी",
    lines: ["नई शायरी में भी दर्द वही पुराना होता है,", "बस बयां करने का सलीका बदल जाता है।"] },
];
