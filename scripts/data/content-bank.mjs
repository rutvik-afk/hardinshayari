/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "english-shayari", lang: "en", keyword: "english me shayari",
    title: "English Me Shayari",
    lines: ["Every heartbreak taught me a lesson,", "every lesson made me someone stronger."] },
  { category: "sad-shayari", lang: "en", keyword: "sad shayari english mein",
    title: "Sad Shayari English Mein",
    lines: ["I learned to smile through the ache,", "because some pain doesn't need an audience."] },
  { category: "love-shayari", lang: "hi", keyword: "ishq quotes in hindi",
    title: "इश्क़ कोट्स हिंदी में",
    lines: ["इश्क़ में जीतना हारना नहीं होता,", "बस साथ चलना और साथ रहना होता है।"] },
  { category: "two-line-shayari", lang: "en", keyword: "two line shayari in english on life",
    title: "Two Line Shayari in English on Life",
    lines: ["Life isn't about avoiding the storm,", "it's about finding shelter within yourself."] },
  { category: "status-captions", lang: "hi", keyword: "hindi status text",
    title: "हिंदी स्टेटस टेक्स्ट",
    lines: ["स्टेटस बदलने से मूड नहीं बदलता,", "मूड बदलने से स्टेटस अपने आप बदल जाता है।"] },
];
