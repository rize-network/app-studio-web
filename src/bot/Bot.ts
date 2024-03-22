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
    cachePath: string
  ): Promise<Assistant> {
    const cachedResponse = this.cache.getJsonFromCache(
      `${cachePath}_assistant`
    );

    if (cachedResponse) {
      return cachedResponse;
    }

    const Assistant = await this.openAIConnector.createAssistant(
      ProjectPrompt(),
      name + ' - Assistant',
      fileIds
    );

    this.cache.saveJsonToCache(`/${cachePath}_assistant`, Assistant);

    return Assistant;
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

  async addFile(filePath: string) {
    const cachedResponse = this.cache.getJsonFromCache('/doc_file');

    if (cachedResponse) {
      return cachedResponse;
    }

    // Téléchargez le fichier de référence vers OpenAI
    const fileId = await this.fileHandler.uploadFile(filePath, 'assistants');

    this.cache.saveJsonToCache('/doc_file', { fileId });

    return { fileId };
  }

  async response(
    assistantId: string,
    propsPath: string,
    componentFolder: string,
    componentName: string
  ): Promise<any> {
    const componentPath = `${componentFolder}/${componentName}`;

    const cachedResponse = this.cache.getJsonFromCache(
      this.cacheKey + '/props'
    );

    if (!cachedResponse) {
      const files = await this.fileHandler.readFiles(componentPath);

      let propsContent = '';
      let viewContent = '';
      let typeContent = '';

      let propsFound = false;
      let viewFound = false;

      for (const file of files) {
        const filePath = `${componentPath}/${file}`;

        // Check the file type and read content accordingly
        if (file.endsWith('.props.ts')) {
          propsContent = await this.fileHandler.readFile(filePath);
          propsFound = true;
        } else if (file.endsWith('.view.tsx')) {
          viewContent = await this.fileHandler.readFile(filePath);
          viewFound = true;
        } else if (file.endsWith('.type.d.ts')) {
          typeContent = await this.fileHandler.readFile(filePath);
        }
      }

      if (!propsFound || !viewFound) {
        console.error('Error: Props file or View file not found.');
        return; // Exit the function if props or view files are missing
      }

      // console.log({ propsContent }, { viewContent }, { typeContent });
      const thread = await this.openAIConnector.createThread();
      // Set the initial prompt for overall understanding of the folder
      await this.openAIConnector.addMessageToThread(thread.id, {
        role: 'user',
        content: await RespondPrompt(propsContent, viewContent, typeContent),
      });

      // Retrieve and process the response for overall understanding
      const response = await this.openAIConnector.runAssistant(
        assistantId,
        thread.id
      );

      const propsJson = extractJsonCode(response.text.value);

      // Check if propsJson is in JSON format
      if (!this.isObject(propsJson)) {
        console.error('Error: Props format is incorrect.');
        return; // Exit the function if props format is incorrect
      }

      this.cache.saveJsonToCache(this.cacheKey + '/props', propsJson);

      await this.fileHandler.writeFile(
        path.dirname(propsPath),
        path.basename(propsPath),
        propsJson
      );
    }
    console.log('Props file generated successfully');
    await this.MarkdownGeneration(componentFolder, componentName, propsPath);
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  async MarkdownGeneration(
    componentFolder: string,
    componentName: string,
    propsPath: string
  ) {
    // Read component props from JSON file
    const componentProps = await this.fileHandler.readComponentPropsFromJson(
      propsPath
    );

    // Check if componentProps is null or not in JSON format
    if (!componentProps || typeof componentProps !== 'object') {
      console.warn('Warning: Props file does not contain valid JSON data.');
      return; // Exit the function if data is not in the correct format
    }

    let markdown = `# ${componentName}\n\n`;
    markdown += `${componentProps.componentDescription}\n\n`;

    markdown += `### **Import**
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
    } else {
      console.warn('Warning: No default example found.');
    }

    // Generate documentation for each prop
    let examplesFound = false;
    for (const propName of Object.keys(componentProps)) {
      const exampleFilePath = path.resolve(
        `${componentFolder}/examples/${propName}.tsx`
      );

      if (this.fileHandler.pathExists(exampleFilePath)) {
        examplesFound = true;
        const exampleCode = await this.fileHandler.readFile(exampleFilePath);
        markdown += `### **${propName}**\n`;
        markdown += `"${componentProps[propName].description}"\n\n`;
        markdown += '```tsx\n';
        markdown += exampleCode;
        markdown += '\n```\n\n';
      }
    }

    if (!examplesFound) {
      console.warn('Warning: No examples found.');
    }

    // Write markdown content to .mdx file
    await this.fileHandler.writeWithoutCheck(
      `${componentFolder}/${componentName}.md`,
      markdown
    );

    console.log('\nDocumentation generation completed.');
  }
}
