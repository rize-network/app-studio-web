import contrast from 'contrast';

const HEX_COLOR_REGEX = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

const normalizeHexColor = (value: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  const withoutHash = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;

  if (!HEX_COLOR_REGEX.test(withoutHash)) {
    return undefined;
  }

  const expanded =
    withoutHash.length === 3
      ? withoutHash
          .split('')
          .map((char) => char + char)
          .join('')
      : withoutHash;

  return `#${expanded.toLowerCase()}`;
};

export const getTextColorHex = (
  backgroundColor: string
): string | undefined => {
  const normalizedHex = normalizeHexColor(backgroundColor);

  if (!normalizedHex) {
    return undefined;
  }

  const tone = contrast(normalizedHex);
  return tone === 'light' ? '#000000' : '#FFFFFF';
};

export const getTextColor = (backgroundColor: string): string | undefined =>
  getTextColorHex(backgroundColor);
