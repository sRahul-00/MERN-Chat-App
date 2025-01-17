const emojis = [
    '😀', '😄', '😁', '🎉', '🎊', '🎈', '🎁', '🥳', '🤩', '🎧',
    '😆', '😅', '😂', '🤣', '😊', '😇', '🥳', '🎂', '🎆', '🎇',
    '🎸', '🏖️', '🎢', '🎡', '🎠', '🏆', '🏅', '⚽', '🏀', '🎾',
    '🎳', '🎲', '🎯', '🎮', '🕹️', '🚀', '✈️', '🚤', '🛳️', '🏝️',
    '🎡', '🎠', '🎢', '🏖️', '🏝️', '🎆', '🎇', '🎉', '🎊', '🎈',
    '🎁', '🎂', '🏆', '🏅', '🎸', '⚽', '🏀', '🎾', '🎳', '🎲',
    '🎯', '🎮', '🕹️', '🚀', '✈️', '🚤', '🛳️', '🎭', '🎨', '🎤', 
];

const getRandomEmojis = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export default getRandomEmojis;