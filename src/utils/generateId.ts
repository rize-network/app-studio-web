/**
 * Generates a random ID string
 * @returns A random string that can be used as an ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
