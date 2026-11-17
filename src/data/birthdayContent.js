// ✏️ EDIT EVERYTHING HERE. Replace image URLs with /images/yourphoto.jpg (put files in public/images).
const ph = (e, a, b) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='400' height='500' fill='url(#g)'/><text x='200' y='285' font-size='135' text-anchor='middle'>${e}</text></svg>`
  )}`

export const content = {
  name: 'Cutie',
  music: { src: '/music/song.mp3', title: 'Birthday Melody' },
  welcomeSubtitle: 'You fill my life with pure happiness and sweetness everyday 🌸',
  message:
    'Today is a beautiful reminder of how lucky I am to have someone as amazing as you in my life. You bring so much happiness, warmth, and positivity just by being yourself.',
  letterPages: [
    {
      badge: 'Page 1 of 2',
      recipient: 'For My Cutie',
      title: 'Happy Birthday, Cutie 🎂',
      paragraphs: [
        'Today is a beautiful reminder of how lucky I am to have someone as amazing as you in my life.',
        'You bring so much happiness, warmth, and positivity just by being yourself.',
        'Over time, so many wonderful memories and little moments have found a special place in my heart.',
        'No matter where life takes us, I will always cherish those moments and be grateful for having you in my life.',
      ],
    },
    {
      badge: 'Page 2 of 2',
      recipient: 'For My Cutie',
      paragraphs: [
        'I hope your day is filled with love, laughter, happiness, and everything that makes you smile.',
        'Happy Birthday, Cutiepie. You are truly special to me. ❤️',
      ],
      highlightQuote: 'I love you, Cutie.',
      highlightSub: 'Always & forever',
    },
  ],
  photos: [
    { src: '/images/memory-1.jpg', fallback: ph('🫶', '#fbcfe8', '#fde68a'), caption: 'Just us' },
    { src: ph('🧸', '#fde7f3', '#c4b5fd'), caption: 'Cuddly days' },
    { src: ph('🌸', '#fbcfe8', '#ddd6fe'), caption: 'Sweet smiles' },
    { src: ph('🍓', '#fecdd3', '#fef3c7'), caption: 'Sweet moments' },
    { src: ph('✨', '#e9d5ff', '#fbcfe8'), caption: 'Little magic' },
    { src: ph('💗', '#fbcfe8', '#fda4af'), caption: 'Always us' },
  ],
  puzzleImage: '/images/cake-puzzle.jpg',
  quiz: [
    {
      question: 'What comes after H?',
      options: ['K', 'L', 'I', 'J'],
      answer: 'I',
    },
    {
      question: 'What is the most special day of the year?',
      options: ['New Year', 'Your Birthday! 🎂', 'Monday', 'Halloween'],
      answer: 'Your Birthday! 🎂',
    },
    {
      question: 'Who has the cutest smile in the world?',
      options: ['You, obviously! 💕', 'A Grumpy Cat', 'A Penguin', 'The Moon'],
      answer: 'You, obviously! 💕',
    },
    {
      question: 'How much happiness do you deserve today?',
      options: ['A little bit', '100%', 'All the happiness in the universe ✨', 'Just a slice'],
      answer: 'All the happiness in the universe ✨',
    },
    {
      question: 'What does my heart say to you right now?',
      options: ['Happy Birthday, Cutie! ❤️', 'Time for homework', 'Eat vegetables', 'Go to sleep'],
      answer: 'Happy Birthday, Cutie! ❤️',
    },
  ],
  memories: [
    { date: 'Jan 2023', title: 'The day we met', text: 'Something told me this was special.', img: ph('👋', '#fbcfe8', '#e9d5ff') },
    { date: 'Jun 2023', title: 'Our first trip', text: 'Laughing until we cried.', img: ph('🚗', '#ddd6fe', '#fde7f3') },
    { date: 'Dec 2024', title: 'Cozy winter', text: 'Hot chocolate and warm hugs.', img: ph('☕', '#fde7f3', '#c4b5fd') },
  ],
  wishes: [
    'May every dream you hold close come true 💫',
    'May you always be surrounded by love 💗',
    'May your smile never fade 🌸',
    'May this year be your most magical yet ✨',
  ],
  finalCard: {
    badge: 'ONCE AGAIN,',
    title: 'Happy Birthday, Cutie',
    text: 'I hope this little surprise made you smile as much as you make me smile every single day. I love you endlessly! 💕',
    avatar: '/images/final-cat.png',
  },
  final: 'You deserve all the happiness in the world. Happy Birthday! ❤️',
}
