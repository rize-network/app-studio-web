/**
API_CONFIG : Un objet contenant les paramètres de configuration pour l'API OpenAI, tels que la clé API et l'organisation. Ces valeurs peuvent être définies directement ou récupérées à partir de variables d'environnement.
APPLICATION_SETTINGS : Un objet pour les paramètres généraux de l'application. Vous pouvez inclure ici des configurations telles que le mode de débogage, les paramètres de journalisation, etc.
*/

export const API_CONFIG = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  openaiOrganization: process.env.OPENAI_ORGANIZATION,
  defaultModel: 'gpt-4-1106-preview', // ou tout autre modèle que vous souhaitez utiliser par défaut
  // Ajoutez d'autres configurations relatives à l'API ici, si nécessaire
};

export const APPLICATION_SETTINGS = {
  // Paramètres généraux de l'application
  // Par exemple: mode de debug, configurations de journalisation, etc.
  debugMode: process.env.DEBUG_MODE === 'true',
  cacheDirectory: process.env.CACHE_DIRECTORY || './cache', // Répertoire de cache par défaut
  // Autres paramètres globaux
};

// Vous pouvez également définir d'autres constantes ou configurations ici,
// telles que des chemins de fichiers, des limites spécifiques, etc.
