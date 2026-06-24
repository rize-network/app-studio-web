export const GoogleFonts = ['Mulish'];

// App default is the system stack so the home page's critical render path never
// waits on a web font. The Mulish brand font is applied to the component gallery
// only (see AppLayout) via MULISH_FONT_FAMILY, keeping it off the home page.
export const APP_FONT_FAMILY =
  "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const HERO_FONT_FAMILY = APP_FONT_FAMILY;

export const MULISH_FONT_FAMILY = "'Mulish', system-ui, sans-serif";

// Only the weights the UI actually renders (regular → extra-bold). Kept in sync
// with the static <link> in index.html so the browser dedupes to one request.
const GOOGLE_FONT_WEIGHTS = 'wght@400;500;600;700;800';

export const getGoogleFontHref = (font: string) =>
  `https://fonts.googleapis.com/css2?family=${font.replace(
    /\s+/g,
    '+'
  )}:${GOOGLE_FONT_WEIGHTS}&display=swap`;
