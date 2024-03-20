/**
OpenAIConnector et Conversation : Le ContentGenerator utilise OpenAIConnector pour interagir avec l'API OpenAI et Conversation pour gérer l'historique des échanges.
generateContentFromPrompt : Cette méthode prend un prompt (instruction) et envoie cette demande à l'API OpenAI. Elle traite ensuite la réponse pour générer du contenu.
Gestion des erreurs : Les erreurs lors des appels API sont capturées et traitées de manière appropriée.
*/
import fs from 'fs';
import path from 'path';

export class Cache {
  private readonly cacheDirectory: string;

  constructor(cacheDirectory = './cache') {
    this.cacheDirectory = cacheDirectory;

    // Créer le répertoire de cache s'il n'existe pas
    if (!fs.existsSync(this.cacheDirectory)) {
      fs.mkdirSync(this.cacheDirectory, { recursive: true });
    }
  }

  public generateCacheKey(prompt: string): string {
    return 'cache_' + prompt.replace(/\W+/g, '_').substring(0, 50); // Créer une clé simple basée sur le prompt
  }

  public getFromCache(cacheKey: string): any | null {
    const cachePath = path.join(this.cacheDirectory, cacheKey);
    if (fs.existsSync(cachePath)) {
      return fs.readFileSync(cachePath, 'utf8');
    }
    return null;
  }

  public getJsonFromCache(cacheKey: string): any {
    const content = this.getFromCache(cacheKey + '.json');
    if (content == '{}') return null;

    return JSON.parse(content);
  }

  public saveJsonToCache(cacheKey: string, content: any): void {
    this.saveToCache(cacheKey + '.json', JSON.stringify(content));
  }

  public saveToCache(cacheKey: string, content: string): void {
    const cachePath = path.join(this.cacheDirectory, cacheKey);

    const folderPath = path.dirname(cachePath);

    // Check if the extracted folder path exists in the cache directory, create it if it doesn't
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(cachePath, content, 'utf8');
  }

  public saveEachJsonToCache(
    cacheKey: string,
    content: any,
    fileNameKey: string
  ): void {
    const cachePath = path.join(this.cacheDirectory, cacheKey + '.json');
    const folderPath = path.dirname(cachePath);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Define a more specific type for existingContent with an index signature
    let existingContent: { [key: string]: any[] } = {};
    if (fs.existsSync(cachePath)) {
      const fileContent = fs.readFileSync(cachePath, 'utf8');
      existingContent = JSON.parse(fileContent);
    }

    // Rest of your method...
    if (!existingContent[fileNameKey]) {
      existingContent[fileNameKey] = []; // Initialize as an array if the key doesn't exist
    }
    existingContent[fileNameKey].push(content); // Append new content to the specific key

    fs.writeFileSync(
      cachePath,
      JSON.stringify(existingContent, null, 2),
      'utf8'
    );
  }

  public cacheExist(cacheKey: string): boolean {
    const cachePath = path.join(this.cacheDirectory, cacheKey);
    // Check if the extracted folder path exists in the cache directory, create it if it doesn't
    return fs.existsSync(cachePath);
  }

  public cacheFolderExist(cacheKey: string): boolean {
    const cachePath = path.join(this.cacheDirectory, cacheKey);
    const folderPath = path.dirname(cachePath);

    // Check if the extracted folder path exists in the cache directory, create it if it doesn't
    return fs.existsSync(folderPath);
  }

  async createFile(
    cacheKey: string,
    fileContent: string = '',
    fileName: string = ''
  ) {
    const cachePath = path.join(this.cacheDirectory, cacheKey);

    if (!fs.existsSync(cachePath)) {
      fs.mkdirSync(cachePath, { recursive: true });
    }

    fs.writeFileSync(cachePath + `/${fileName}.md`, fileContent);

    return cachePath + `/${fileName}.md`;
  }
}
