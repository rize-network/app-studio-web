/**
 * Helper function to determine file category from MIME type
 */
export const getFileCategory = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('document') || mimeType.includes('text'))
    return 'document'; // Broadly categorize documents and text files
  return 'application/octet-stream'; // Default for unknown or generic types
};
