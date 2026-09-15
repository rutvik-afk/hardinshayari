/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "gulzar-shayari", lang: "hi", keyword: "gulzar poetry on life in hindi", styleNote: "Gulzar",
    title: "गुलज़ार पोएट्री ऑन लाइफ इन हिंदी",
    lines: ["ज़िंदगी को गुलज़ार जैसी नज़र से देखो,", "हर उलझन एक कविता लगने लगेगी।"] },
  { category: "love-shayari", lang: "hi", keyword: "ishq word in hindi",
    title: "इश्क़ वर्ड इन हिंदी",
    lines: ["इश्क़ सिर्फ़ एक शब्द नहीं,", "एक पूरी एहसास की दुनिया है।"] },
  { category: "sad-shayari", lang: "hi", keyword: "ghalib sad shayari", styleNote: "Ghalib",
    title: "ग़ालिब सैड शायरी",
    lines: ["दर्द को ग़ालिब के अंदाज़ में कहना,", "यानी तकलीफ़ को भी खूबसूरत बना देना।"] },
  { category: "attitude-shayari", lang: "hi", keyword: "attitude shayari new",
    title: "अटैटीयूड शायरी न्यू",
    lines: ["नई शायरी, पुराना अंदाज़ नहीं,", "हम बदलते नहीं, बस बेहतर होते हैं।"] },
  { category: "english-shayari", lang: "en", keyword: "online shayari english",
    title: "Online Shayari English",
    lines: ["Online words fade fast,", "but real feelings always find their way back."] },
  { category: "gulzar-shayari", lang: "hi", keyword: "munawar shayari", styleNote: "Munawar Faruqui",
    title: "मुनव्वर शायरी",
    lines: ["मुनव्वर के अंदाज़ में हंसी और दर्द साथ चलते हैं,", "यही उनकी शायरी को खास बनाता है।"] },
  { category: "love-shayari", lang: "hi", keyword: "love ghazal in hindi",
    title: "लव ग़ज़ल इन हिंदी",
    lines: ["ग़ज़ल में मोहब्बत कहना एक फ़न है,", "हर शेर में एक नई कहानी होती है।"] },
  { category: "sad-shayari", lang: "en", keyword: "shayari love sad english",
    title: "Shayari Love Sad English",
    lines: ["Love and sadness often share the same page,", "because loving deeply means feeling deeply too."] },
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
