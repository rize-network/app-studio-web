export const GoogleFonts = ['Mulish'];

export const APP_FONT_FAMILY = "'Mulish', system-ui, sans-serif";

const GOOGLE_FONT_WEIGHTS =
  'ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900';

export const getGoogleFontHref = (font: string) =>
  `https://fonts.googleapis.com/css2?family=${font.replace(
    /\s+/g,
    '+'
  )}:${GOOGLE_FONT_WEIGHTS}&display=swap`;
