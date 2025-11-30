/**
extractJsonCode : Extrait un bloc de code JSON d'une réponse. Utile si la réponse contient des blocs de code formatés.
extractTextResponse : Nettoie une réponse pour ne garder que le texte, en supprimant les blocs de code et les formattages spéciaux.
extractKeyValuePairs : Extrait des paires clé-valeur d'une réponse. Cette fonction peut être utile pour traiter des réponses formatées comme des listes de propriétés.
 */
// import fetch from 'node-fetch';
// import cheerio from 'cheerio';

export function extractJsonCode(response: string) {
  const jsonCodeRegex = /```json\s*([\s\S]*?)```/; // Allow optional newline after json
  const match = response.match(jsonCodeRegex);
  if (match) {
    const jsonString = match[1].trim();
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      // If direct parsing fails, try removing comments
      try {
        // Naive comment removal - still risky for URLs but better than nothing as fallback
        const cleanedJsonString = jsonString.replace(/\/\/.*$/gm, '');
        return JSON.parse(cleanedJsonString);
      } catch (error2) {
        console.error('Error parsing JSON from code block:', error2);
        return null;
      }
    }
  }
  return null;
}
export const extractTextResponse = (response: string): string => {
  // Supprime les blocs de code et les formattages spéciaux
  const text = response.replace(/```[\s\S]*?```/g, '').trim();
  return text;
};

export const extractKeyValuePairs = (
  response: string
): Record<string, string> => {
  const keyValueRegex = /(\w+):\s*(.+)/g;
  const pairs: Record<string, string> = {};
  let match;

  while ((match = keyValueRegex.exec(response)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    pairs[key] = value;
  }

  return pairs;
};
