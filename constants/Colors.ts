const lightBackground = '#F7F7FA';
const darkBackground = '#181828';
const lightCard = '#fff';
const darkCard = '#23233a';
const accent = '#222';
const textLight = '#111';
const textDark = '#fff';

export default {
  light: {
    text: textLight,
    background: lightBackground,
    tint: accent,
    tabIconDefault: '#bbb',
    tabIconSelected: accent,
    card: lightCard,
    accent,
  },
  dark: {
    text: textDark,
    background: darkBackground,
    tint: textDark,
    tabIconDefault: '#bbb',
    tabIconSelected: textDark,
    card: darkCard,
    accent: textDark,
  },
};