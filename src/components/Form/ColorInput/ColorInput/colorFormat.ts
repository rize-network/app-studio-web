import { ColorFormat } from './ColorInput.type';

// Pure color-format conversion helpers shared by ColorInput and ColorPicker.
// They understand literal CSS colors (hex, rgb()/rgba(), hsl()/hsla()); theme
// tokens such as 'color-red-500' are not literal colors, so any value that
// cannot be parsed is passed through unchanged.

type Rgb = { r: number; g: number; b: number };

const clampChannel = (channel: number): number =>
  Math.min(255, Math.max(0, Math.round(channel)));

const parseHex = (value: string): Rgb | null => {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return null;
  let hex = match[1];
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
};

const parseRgb = (value: string): Rgb | null => {
  const match =
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+\s*)?\)$/i.exec(
      value.trim()
    );
  if (!match) return null;
  return {
    r: clampChannel(Number(match[1])),
    g: clampChannel(Number(match[2])),
    b: clampChannel(Number(match[3])),
  };
};

const hslToRgb = (h: number, s: number, l: number): Rgb => {
  const hue = ((h % 360) + 360) % 360;
  const saturation = Math.min(100, Math.max(0, s)) / 100;
  const lightness = Math.min(100, Math.max(0, l)) / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness - chroma / 2;
  let rgb: [number, number, number];
  if (hue < 60) rgb = [chroma, x, 0];
  else if (hue < 120) rgb = [x, chroma, 0];
  else if (hue < 180) rgb = [0, chroma, x];
  else if (hue < 240) rgb = [0, x, chroma];
  else if (hue < 300) rgb = [x, 0, chroma];
  else rgb = [chroma, 0, x];
  return {
    r: clampChannel((rgb[0] + m) * 255),
    g: clampChannel((rgb[1] + m) * 255),
    b: clampChannel((rgb[2] + m) * 255),
  };
};

const parseHsl = (value: string): Rgb | null => {
  const match =
    /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/i.exec(
      value.trim()
    );
  if (!match) return null;
  return hslToRgb(Number(match[1]), Number(match[2]), Number(match[3]));
};

const parseColor = (value: string): Rgb | null =>
  parseHex(value) ?? parseRgb(value) ?? parseHsl(value);

const rgbToHsl = ({ r, g, b }: Rgb): { h: number; s: number; l: number } => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;
  if (delta === 0) {
    return { h: 0, s: 0, l: Math.round(lightness * 100) };
  }
  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue: number;
  if (max === red) hue = ((green - blue) / delta) % 6;
  else if (max === green) hue = (blue - red) / delta + 2;
  else hue = (red - green) / delta + 4;
  hue = Math.round(hue * 60);
  if (hue < 0) hue += 360;
  return {
    h: hue,
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
};

const toHexChannel = (channel: number): string =>
  clampChannel(channel).toString(16).padStart(2, '0');

/**
 * Converts a literal CSS color string to the requested format. Values that are
 * not literal colors (theme tokens, empty strings) and calls without a target
 * format return the input unchanged.
 */
export const formatColor = (value: string, format?: ColorFormat): string => {
  if (!format || !value) return value;
  const rgb = parseColor(value);
  if (!rgb) return value;
  switch (format) {
    case 'hex':
      return `#${toHexChannel(rgb.r)}${toHexChannel(rgb.g)}${toHexChannel(
        rgb.b
      )}`;
    case 'rgb':
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'hsl': {
      const { h, s, l } = rgbToHsl(rgb);
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
  }
};
