/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "attitude-shayari", lang: "hi", keyword: "attitude shayari hindi to english",
    title: "अटैटीयूड शायरी हिंदी टू इंग्लिश",
    lines: ["भाषा बदलने से अटैटीयूड नहीं बदलता,", "सोच वही रहती है, बस अंदाज़ बदलता है।"] },
  { category: "english-shayari", lang: "en", keyword: "mood off shayari english",
    title: "Mood Off Shayari English",
    lines: ["Some days need no reason to feel heavy,", "they just need permission to feel that way."] },
  { category: "gulzar-shayari", lang: "hi", keyword: "thought gulzar 2 line shayari", styleNote: "Gulzar",
    title: "थॉट गुलज़ार 2 लाइन शायरी",
    lines: ["एक सोच, दो लाइनों में समा जाए,", "यही गुलज़ार अंदाज़ की पहचान है।"] },
  { category: "love-shayari", lang: "hi", keyword: "love gazal hindi",
    title: "लव ग़ज़ल हिंदी",
    lines: ["मोहब्बत की ग़ज़ल लिखना आसान नहीं,", "हर लफ़्ज़ को दिल से तोलना पड़ता है।"] },
];
