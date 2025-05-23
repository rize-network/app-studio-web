/**
 * Generates a unique ID with an optional prefix
 * @param prefix Optional prefix for the ID
 * @returns A unique string ID
 */
export const generateId = (prefix: string = 'id') =>
  `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
