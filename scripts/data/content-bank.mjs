/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "gulzar-shayari", lang: "hi", keyword: "rahat indori dosti shayari in hindi", styleNote: "Rahat Indori",
    title: "राहत इंदौरी दोस्ती शायरी इन हिंदी स्टाइल",
    lines: ["दोस्त वो जो बिना कहे सब समझ जाए,", "और मुश्किल में बिना बुलाए साथ आ जाए।"] },
  { category: "gulzar-shayari", lang: "hi", keyword: "faiz ahmed faiz poetry love", styleNote: "Faiz Ahmed Faiz",
    title: "फ़ैज़ अहमद फ़ैज़ पोएट्री लव स्टाइल",
    lines: ["इश्क़ भी है और दुनिया के ग़म भी,", "दोनों के बीच दिल का हाल कौन समझे।"] },
  { category: "gulzar-shayari", lang: "hi", keyword: "gulzar shayari on dosti", styleNote: "Gulzar",
    title: "गुलज़ार शायरी ऑन दोस्ती स्टाइल",
    lines: ["दोस्ती वो रिश्ता है जो बिना वजह निभता है,", "बाकी सब रिश्ते तो मतलब से चलते हैं।"] },
  { category: "gulzar-shayari", lang: "hi", keyword: "gulzar shayari 2 line", styleNote: "Gulzar",
    title: "गुलज़ार शायरी 2 लाइन स्टाइल",
    lines: ["रात के साथ कुछ पुरानी बातें भी जाग जाती हैं,", "और चांद चुपचाप सब सुनता रहता है।"] },
];
