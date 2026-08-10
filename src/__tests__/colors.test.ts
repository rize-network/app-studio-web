import { alphaColor, isColorToken, stripAlphaSuffix } from 'src/utils/colors';

test('stripAlphaSuffix removes an alpha but never a shade', () => {
  expect(stripAlphaSuffix('color-gray-900-50')).toBe('color-gray-900');
  expect(stripAlphaSuffix('color-gray-900')).toBe('color-gray-900');
  expect(stripAlphaSuffix('theme-primary-300')).toBe('theme-primary');
  expect(stripAlphaSuffix('theme-primary')).toBe('theme-primary');
});

test('alphaColor suffixes tokens, replacing any existing alpha', () => {
  expect(alphaColor('color-green-900', 100)).toBe('color-green-900-100');
  expect(alphaColor('color-green-900-300', 100)).toBe('color-green-900-100');
  expect(alphaColor('theme-primary', 250)).toBe('theme-primary-250');
});

test('alphaColor converts raw CSS colors to color-mix instead of garbage', () => {
  // `#22c55e-100` is not a color; Button subtle hit this whenever a caller
  // passed `backgroundColor` as a plain CSS value.
  expect(alphaColor('#22c55e', 100)).toBe(
    'color-mix(in srgb, #22c55e 10%, transparent)'
  );
  expect(alphaColor('rgb(0, 0, 0)', 400)).toBe(
    'color-mix(in srgb, rgb(0, 0, 0) 40%, transparent)'
  );
});

test('isColorToken recognises token prefixes only', () => {
  expect(isColorToken('color-red-500')).toBe(true);
  expect(isColorToken('theme-primary')).toBe(true);
  expect(isColorToken('#fff')).toBe(false);
  expect(isColorToken('rebeccapurple')).toBe(false);
});
