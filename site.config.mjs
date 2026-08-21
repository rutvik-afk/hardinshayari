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
