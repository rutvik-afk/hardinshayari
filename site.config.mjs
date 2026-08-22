export const SITE = {
  name: 'Har Din Shayari',
  nameHi: 'हर दिन शायरी',
  url: 'https://hardinshayari.com',
  tagline: 'हर दिन, हर एहसास',
  taglineEn: 'A new shayari, every single day',
  description: 'Best Hindi & English shayari on attitude, sad, love, dosti, life and more — with free HD photo shayari cards to download and share.',
  descriptionHi: 'अटैटीयूड, सैड, लव, दोस्ती और लाइफ पर बेस्ट हिंदी और इंग्लिश शायरी — डाउनलोड करने के लिए फ्री HD फोटो शायरी कार्ड्स के साथ।',
  twitter: '@hardinshayari',
  totalPostsTarget: 1000,
  postsPerDay: 4,
};

/* Categories: id must match folder-safe slug. `lang` marks hi/en primary audience
   but each category can host both languages (post.lang decides the actual copy). */
export const CATEGORIES = [
  { id: 'attitude-shayari', nameHi: 'अटैटीयूड शायरी', nameEn: 'Attitude Shayari', emoji: '🔥', color: '#c8102e' },
  { id: 'sad-shayari', nameHi: 'सैड शायरी', nameEn: 'Sad Shayari', emoji: '💔', color: '#1e3a5f' },
  { id: 'love-shayari', nameHi: 'लव / इश्क़ शायरी', nameEn: 'Love & Ishq Shayari', emoji: '❤️', color: '#9d174d' },
  { id: 'dosti-shayari', nameHi: 'दोस्ती शायरी', nameEn: 'Dosti Shayari', emoji: '🤝', color: '#0f766e' },
  { id: 'english-shayari', nameHi: 'इंग्लिश शायरी', nameEn: 'English Shayari', emoji: '🖋️', color: '#4338ca' },
  { id: 'life-shayari', nameHi: 'लाइफ / मोटिवेशनल शायरी', nameEn: 'Life & Motivational Shayari', emoji: '🌱', color: '#3f6212' },
  { id: 'status-captions', nameHi: 'स्टेटस और कैप्शन', nameEn: 'Status & Captions', emoji: '📱', color: '#6d28d9' },
  { id: 'two-line-shayari', nameHi: '2 लाइन शायरी', nameEn: '2-Line Shayari', emoji: '✒️', color: '#a16207' },
  { id: 'sorry-shayari', nameHi: 'सॉरी / मिस यू शायरी', nameEn: 'Sorry & Miss You Shayari', emoji: '🙏', color: '#881337' },
  { id: 'gulzar-shayari', nameHi: 'गुलज़ार शायरी', nameEn: 'Gulzar Shayari', emoji: '📖', color: '#075985' },
  { id: 'religious-shayari', nameHi: 'भक्ति / धार्मिक शायरी', nameEn: 'Religious & Bhakti Shayari', emoji: '🕉️', color: '#9a3412' },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

/* Pillar content — a long, original intro + FAQ for the highest-volume
   category pages, so the exact page that ranks for the head keyword
   ("attitude shayari", "sad shayari") has real substance behind it,
   not just a card grid. Added per-category as we build these out. */
export const PILLAR_CONTENT = {
  'attitude-shayari': {
    intro: [
      'अटैटीयूड शायरी सिर्फ़ शब्द नहीं, एक तरीका है अपनी बात बिना झुके कहने का। जब सीधे बोलने से बात पूरी न बने, तो एक तीखी, आत्मविश्वास से भरी शायरी वही काम कर देती है — बिना किसी का नाम लिए, बिना झगड़े के।',
      'इस पेज पर आपको अलग-अलग अंदाज़ की attitude shayari मिलेगी — boys attitude shayari, 2-line attitude shayari, दोस्ती वाला अटैटीयूड, और रोज़मर्रा के लिए status-ready लाइनें। हर शायरी ओरिजिनल है, HD photo card के साथ, ताकि आप सीधे WhatsApp status या Instagram पर share कर सकें।',
    ],
    faq: [
      { q: 'अटैटीयूड शायरी क्या होती है?', a: 'अटैटीयूड शायरी वो शायरी है जो आत्मविश्वास, आत्म-सम्मान और बिना झुके अपनी बात कहने के भाव को दिखाती है। इसका इस्तेमाल WhatsApp status, Instagram caption या किसी को सीधा जवाब देने के लिए होता है।' },
      { q: 'क्या ये शायरी WhatsApp और Instagram के लिए free है?', a: 'हां, हर शायरी के साथ एक फ्री HD photo card मिलता है, जिसे आप बिना किसी झिझक के download करके WhatsApp status, Instagram story या Facebook पर share कर सकते हैं।' },
      { q: 'नई attitude shayari कितनी बार आती है?', a: 'हम रोज़ नई शायरी जोड़ते हैं। अगर आपको आज की पसंद नहीं आई, तो कल फिर से नई लाइनें मिलेंगी — bookmark करके रोज़ चेक करते रहिए।' },
      { q: 'क्या ये शायरी किसी और की कॉपी है?', a: 'नहीं। इस साइट की हर शायरी ओरिजिनल लिखी गई है। हम किसी और shayari website से कॉपी नहीं करते।' },
      { q: 'Boys के लिए अलग attitude shayari मिलेगी?', a: 'जी हां, नीचे दिए गए collection में boys-focused attitude shayari भी शामिल है, साथ ही 2-line और दोस्ती वाले अंदाज़ की शायरी भी।' },
    ],
  },
  'sad-shayari': {
    intro: [
      'हर दर्द को शब्दों में बयां करना आसान नहीं होता, लेकिन कभी-कभी एक शेर वो कह देता है जो घंटों की बात में नहीं कहा जा सकता। Sad shayari उन पलों के लिए है — जब दिल भारी हो और अल्फ़ाज़ कम पड़ जाएं।',
      'इस पेज पर हिंदी और English, दोनों में sad shayari मिलेगी — टूटे दिल की बात, तन्हाई के एहसास, और ज़िंदगी की उन सच्चाइयों की, जिन्हें कहना मुश्किल होता है। हर शायरी के साथ एक free HD photo card भी है, download करके status पर लगाने के लिए तैयार।',
    ],
    faq: [
      { q: 'Sad shayari किन मौकों पर share की जाती है?', a: 'टूटे दिल, तन्हाई, बिछड़ने के दर्द या बस उदास मूड को शब्दों में बयां करने के लिए sad shayari WhatsApp status और Instagram caption के तौर पर share की जाती है।' },
      { q: 'क्या यहाँ English में भी sad shayari मिलेगी?', a: 'हां, इस category में हिंदी और English दोनों भाषाओं में sad shayari है — जो भी भाषा पसंद हो, ऊपर हेडर से चुन सकते हैं।' },
      { q: 'HD photo card कैसे डाउनलोड करें?', a: 'हर शायरी पोस्ट पर "Download HD Photo" बटन मिलेगा — एक क्लिक में फोटो आपके फ़ोन में सेव हो जाएगी, कोई app या login ज़रूरी नहीं।' },
      { q: 'क्या नई sad shayari रोज़ जुड़ती है?', a: 'हां, हम हर दिन नई ओरिजिनल शायरी जोड़ते हैं, ताकि आपको हर बार कुछ नया पढ़ने को मिले।' },
    ],
  },
};
