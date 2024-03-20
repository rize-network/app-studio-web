import { Assistant } from 'openai/resources/beta/index';

import { Cache } from './Cache';
import { FileHandler } from './FileHandler';

import { OpenAIConnector } from './OpenAIConnector';
import { API_CONFIG, APPLICATION_SETTINGS } from './Config';
import { extractJsonCode } from './extractors';
import { ProjectPrompt } from './prompt/1-project';
import { RespondPrompt } from './prompt/2-response';
import path from 'path';

export class Bot {
  private readonly openAIConnector: OpenAIConnector;
  private readonly fileHandler: FileHandler;
  private readonly cache: Cache;
  private readonly cacheKey: string = '';

  constructor(cacheKey: string) {
    this.openAIConnector = new OpenAIConnector(
      API_CONFIG.openaiApiKey,
      API_CONFIG.openaiOrganization
    );

    this.cacheKey = cacheKey;
    this.cache = new Cache(APPLICATION_SETTINGS.cacheDirectory);
    this.fileHandler = new FileHandler(
      API_CONFIG.openaiApiKey,
      API_CONFIG.openaiOrganization
    );
  }

  async init(
    name: string,
    fileIds: string[],
    descriptionPath: string,
    cachePath: string
  ): Promise<Assistant> {
    let description = '';
    const cachedResponse = this.cache.getJsonFromCache(
      this.cacheKey + `/${cachePath}_assistant`
    );

    if (cachedResponse) {
      return cachedResponse;
    }
    if (descriptionPath) {
      description = await this.fileHandler.readFile(descriptionPath);
    }

    const Assistant = await this.openAIConnector.createAssistant(
      ProjectPrompt(name, description),
      name + ' - Assistant',
      fileIds
    );

    this.cache.saveJsonToCache(
      this.cacheKey + `/${cachePath}_assistant`,
      Assistant
    );

    return Assistant;
  }

  async addFiles(componentFolder: string) {
    const cachedResponse = this.cache.getJsonFromCache(this.cacheKey + `file`);

    if (cachedResponse) {
      return cachedResponse;
    }
    // Read the files in the directory
    const files = await this.fileHandler.readFiles(componentFolder);

    // Array to store file IDs
    const fileIds = [];

    for (const file of files) {
      // Check if the file ends with the desired extensions
      if (
        file.endsWith('.props.ts') ||
        file.endsWith('.type.d.ts') ||
        file.endsWith('.view.tsx')
      ) {
        const filePath = `${componentFolder}/${file}`;

        // Upload the file and store the returned file ID
        const fileId = await this.fileHandler.uploadFile(
          filePath,
          'assistants'
        );

        // Store the file ID in the array
        fileIds.push(fileId);
      }
    }
    // Save the array of file IDs to cache
    this.cache.saveJsonToCache(this.cacheKey + `/file`, {
      fileIds,
    });

    return { fileIds };
  }

  async createFile(fileContent: string, fileName: string) {
    const cacheKey = this.cacheKey + '/file/' + fileName;
    const filePath = await this.cache.createFile(
      cacheKey,
      fileContent,
      fileName
    );

    const cachedResponse = this.cache.getJsonFromCache(cacheKey);

    if (cachedResponse) {
      return cachedResponse;
    }

    const fileId = await this.fileHandler.uploadFile(filePath, 'assistants');

    this.cache.saveJsonToCache(cacheKey, { fileId, fileName });

    return { fileId, fileName };
  }

  async response(assistantId: string, propsPath: string): Promise<any> {
    // const cachedResponse = this.cache.getFromCache(
    //   this.cacheKey + '/props.json'
    // );

    // if (cachedResponse) {
    //   return cachedResponse;
    // }

    // Créez un nouveau thread pour la conversation
    const thread = await this.openAIConnector.createThread();

    // Définissez le prompt initial pour la compréhension globale du dossier
    await this.openAIConnector.addMessageToThread(thread.id, {
      role: 'user',
      content: RespondPrompt(),
    });

    // Récupérez et traitez la réponse pour la compréhension globale
    const response = await this.openAIConnector.runAssistant(
      assistantId,
      thread.id
    );

    const propsJson = extractJsonCode(response.text.value);

    // this.cache.saveJsonToCache(this.cacheKey + '/props', propsJson);

    await this.fileHandler.writeFile(
      path.dirname(propsPath),
      path.basename(propsPath),
      propsJson
    );
  }

  async MarkdownGeneration(
    componentFolder: string,
    componentName: string,
    propsPath: string
  ) {
    const componentProps = await this.fileHandler.readComponentPropsFromJson(
      propsPath
    );

    let markdown = `### **Import**
\`\`\`tsx static
import { ${componentName} } from '@app-studio/web';
\`\`\`\n\n`;

    // Check for the Default example
    const defaultExamplePath = path.resolve(
      `${componentFolder}/examples/default.tsx`
    );

    if (this.fileHandler.pathExists(defaultExamplePath)) {
      const defaultExampleCode = await this.fileHandler.readFile(
        defaultExamplePath
      );
      markdown += `### **Default**\n`;
      markdown += '```tsx\n';
      markdown += defaultExampleCode;
      markdown += '\n```\n\n';
    }

    for (const propName of Object.keys(componentProps)) {
      const exampleFilePath = path.resolve(
        `${componentFolder}/examples/${propName}.tsx`
      );

      if (this.fileHandler.pathExists(exampleFilePath)) {
        const exampleCode = await this.fileHandler.readFile(exampleFilePath);
        markdown += `### **${propName}**\n`;
        markdown += `"${componentProps[propName].description}"\n\n`;
        markdown += '```tsx\n';
        markdown += exampleCode;
        markdown += '\n```\n\n';
      }
    }

    await this.fileHandler.writeWithoutCheck(
      `${componentFolder}/${componentName}.mdx`,
      markdown
    );
  }
}
