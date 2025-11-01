export const getTextColorHex = (backgroundColor: string) => {
  // Simple luminance calculation to determine text color contrast
  const color = backgroundColor.replace('#', '');
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.4 ? 'black' : 'white';
};

export const getTextColor = (backgroundColor: string) => {
  // Use complementary color for better contrast and return as hex
  const color = backgroundColor.replace('#', '');
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate the complementary color
  const complementR = (255 - r).toString(16).padStart(2, '0');
  const complementG = (255 - g).toString(16).padStart(2, '0');
  const complementB = (255 - b).toString(16).padStart(2, '0');

  // Return the color in hex format
  return getTextColorHex(`#${complementR}${complementG}${complementB}`);
};
