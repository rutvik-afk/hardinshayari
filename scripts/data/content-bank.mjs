/* Pre-written queue for the daily GitHub Actions publisher (see
   .github/workflows/daily.yml + scripts/05-publish-daily.mjs). Unlike
   getbiostar's fact-driven pages, shayari has to be freshly composed, so
   this file is a bank of already-written, ready-to-publish posts that the
   workflow pops from N-at-a-time — no AI/API call needed at run time.
   When this list runs low, extend it (a normal Claude Code session can
   pull the next keywords with `node scripts/02-next-keywords.mjs N` and
   write more entries in this shape) and push. */
export const CONTENT_BANK = [
  { category: "gulzar-shayari", lang: "hi", keyword: "shayari munawar faruqui", styleNote: "Munawar Faruqui",
    title: "शायरी मुनव्वर फारूकी स्टाइल",
    lines: ["मुनव्वर का अंदाज़ हंसी में भी गहरी बात कह जाता है,", "यही उनकी पहचान है।"] },
  { category: "sad-shayari", lang: "hi", keyword: "sad shayari long",
    title: "सैड शायरी लॉन्ग",
    lines: ["लंबी शायरी में भी दर्द छोटा नहीं होता,", "बस बयान करने का तरीका बदल जाता है।"] },
  { category: "love-shayari", lang: "hi", keyword: "love shayari ghalib", styleNote: "Ghalib",
    title: "लव शायरी ग़ालिब स्टाइल",
    lines: ["इश्क़ में समझदारी ढूंढना बेकार है,", "यहां दिल ही सबसे बड़ा वकील है।"] },
  { category: "english-shayari", lang: "en", keyword: "bio shayari english",
    title: "Bio Shayari English",
    lines: ["My bio says little,", "because my story isn't meant for everyone."] },
  { category: "attitude-shayari", lang: "hi", keyword: "new shayari attitude",
    title: "न्यू शायरी अटैटीयूड",
    lines: ["नया अंदाज़ हो या पुराना,", "अटैटीयूड हमेशा असली होना चाहिए।"] },
  { category: "gulzar-shayari", lang: "hi", keyword: "gulzar famous shayari", styleNote: "Gulzar",
    title: "गुलज़ार फेमस शायरी स्टाइल",
    lines: ["मशहूर होने के लिए मुश्किल लफ़्ज़ नहीं चाहिए,", "सच्चाई ही सबसे असरदार शायरी है।"] },
  { category: "sad-shayari", lang: "en", keyword: "sadgi quotes in english",
    title: "Sadgi Quotes in English",
    lines: ["Simplicity isn't about having less,", "it's about needing less to feel complete."] },
  { category: "love-shayari", lang: "hi", keyword: "gulzar shayari on one sided love", styleNote: "Gulzar",
    title: "गुलज़ार शायरी ऑन वन साइडेड लव स्टाइल",
    lines: ["एकतरफा मोहब्बत भी मोहब्बत होती है,", "बस कहानी में दूसरा किरदार खामोश रहता है।"] },
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
