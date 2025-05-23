import path from 'path';
import { AiService } from './ai/ai.service'; // Import AiService
import { ProviderType } from './ai/ai.config'; // Import ProviderType
import { Cache } from './Cache';
import { FileHandler } from './FileHandler';
import { APPLICATION_SETTINGS } from './Config'; // Keep config for cache etc.
import { extractJsonCode } from './extractors';
// Removed ProjectPrompt as init is removed: import { ProjectPrompt } from './prompt/1-project';
import { RespondPrompt } from './prompt/2-response';

// Define default model/provider or fetch from config
const DEFAULT_MODEL = 'gpt-4o-mini'; // Example default
const DEFAULT_PROVIDER: ProviderType = 'openai'; // Example default

export class Bot {
  public readonly aiService: AiService; // Use AiService
  public readonly fileHandler: FileHandler;
  private readonly cache: Cache;
  private readonly cacheKey: string = '';

  constructor(cacheKey: string) {
    this.aiService = new AiService(); // Instantiate AiService
    this.cacheKey = cacheKey;
    this.cache = new Cache(APPLICATION_SETTINGS.cacheDirectory);
    this.fileHandler = new FileHandler();
  }

  // Removed init method as it was OpenAI Assistant specific

  // Removed createFile and addFile as they were for OpenAI Assistants

  // Refactored response method
  async generatePropsData(
    componentFolder: string,
    componentName: string,
    model: string = DEFAULT_MODEL,
    provider: ProviderType = DEFAULT_PROVIDER
  ): Promise<any> {
    const componentPath = `${componentFolder}/${componentName}`;
    const cachePath = `${this.cacheKey}/${componentName}/props`; // More specific cache key

    const cachedResponse = this.cache.getJsonFromCache(cachePath);
    if (cachedResponse) {
      console.log(`Props data for ${componentName} retrieved from cache.`);
      return cachedResponse;
    }

    console.log(
      `Generating props data for ${componentName} using ${provider}/${model}...`
    );

    try {
      const files = await this.fileHandler.readFiles(componentPath);

      let propsContent = '';
      let viewContent = '';
      let typeContent = '';

      for (const file of files) {
        const filePath = path.join(componentPath, file); // Use path.join for reliability

        // Check the file type and read content accordingly
        if (file.endsWith('.props.ts')) {
          propsContent = await this.fileHandler.readFile(filePath);
        } else if (file.endsWith('.view.tsx')) {
          viewContent = await this.fileHandler.readFile(filePath);
        } else if (file.endsWith('.type.d.ts') || file.endsWith('.type.ts')) {
          // Allow .type.ts too
          typeContent = await this.fileHandler.readFile(filePath);
        }
      }

      if (!propsContent && !viewContent) {
        // Allow generation even if only one file exists, but log a warning
        console.warn(
          `Warning: Props or View file might be missing for ${componentName}. Proceeding with available content.`
        );
        if (!propsContent && !viewContent && !typeContent) {
          console.error(
            `Error: No relevant files (.props.ts, .view.tsx, .type.d.ts) found for component ${componentName}. Cannot generate props.`
          );
          return null; // Return null or throw error if no files found
        }
      }

      const messages = [
        // {
        //   role: 'system',
        //   content:
        //     "You are a helpful assistant that generates a JSON object containing the component's props data.",
        // },
        {
          role: 'user',
          content: RespondPrompt(propsContent, viewContent, typeContent),
        },
      ];

      // Call AiService.send
      const responseString = await this.aiService.send({
        model: model,
        provider: provider,
        messages: messages,
        temperature: 0.2,
        json: true, // Expecting JSON output
        options: { retries: 3 }, // Add retries
        // temperature: 0.5 // Optional: Set temperature if needed
      });

      // Log the raw response for debugging
      // console.log('Raw AI response for props:', responseString);

      const propsJson =
        extractJsonCode(responseString) || JSON.parse(responseString); // Try direct parse as fallback

      // Validate the response structure
      if (!this.isValidPropsStructure(propsJson)) {
        console.error(
          'Error: Generated props data has incorrect structure.',
          propsJson
        );
        // Optional: Attempt recovery or throw error
        throw new Error(
          `Invalid props JSON structure received from AI for ${componentName}`
        );
      }

      this.cache.saveJsonToCache(cachePath, propsJson);
      console.log(`Props data for ${componentName} generated and cached.`);
      return propsJson;
    } catch (error) {
      console.error(`Error generating props data for ${componentName}:`, error);
      // Decide if to throw or return null/empty object
      // throw error; // Re-throw if caller should handle it
      return null; // Or return null to indicate failure
    }
  }

  // Helper to validate the expected structure loosely
  isValidPropsStructure(data: any): boolean {
    if (!this.isObject(data)) return false;
    if (typeof data.componentDescription !== 'string') {
      console.warn(
        "Warning: 'componentDescription' is missing or not a string."
      );
      // Allow missing description but log it
    }
    // Check if other keys (props) are objects
    for (const key in data) {
      if (key !== 'componentDescription' && !this.isObject(data[key])) {
        console.error(`Error: Prop '${key}' is not an object.`);
        return false;
      }
      // Could add more checks here for type, typeValues etc. if needed
    }
    return true;
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  // Updated MarkdownGeneration to accept propsData directly
  async generateMarkdown(
    componentFolder: string,
    componentName: string,
    propsData: any, // Accept generated props data
    outputFilePath: string // Specify output file path
  ): Promise<void> {
    if (!this.isValidPropsStructure(propsData)) {
      console.error(
        `Cannot generate Markdown for ${componentName}: Invalid props data provided.`
      );
      return;
    }

    try {
      let markdown = `# ${componentName}\n\n`;
      // Use componentDescription safely
      markdown += `${
        propsData.componentDescription || 'No description provided.'
      }\n\n`;

      markdown += `### **Import**\n\`\`\`tsx\nimport { ${componentName} } from '@app-studio/web';\n\`\`\`\n\n`;

      // Check for the Default example
      const defaultExamplePath = path.resolve(
        componentFolder,
        'examples',
        'default.tsx'
      ); // Use path.resolve and join

      if (this.fileHandler.pathExists(defaultExamplePath)) {
        const defaultExampleCode = await this.fileHandler.readFile(
          defaultExamplePath
        );
        markdown += `### **Default**\n`;
        markdown += '```tsx\n';
        markdown += defaultExampleCode.trim(); // Trim content
        markdown += '\n```\n\n';
      } else {
        console.warn(`Warning: No default example found for ${componentName}.`);
      }

      // Generate documentation for each prop found in examples
      let examplesFound = false;
      const exampleFiles = this.fileHandler.readFiles(
        path.join(componentFolder, 'examples')
      );

      for (const propName in propsData) {
        if (propName === 'componentDescription') continue; // Skip description

        const propDetails = propsData[propName];
        // Find corresponding example file (case-insensitive check might be good)
        const exampleFileName = `${propName}.tsx`;
        const exampleFilePath = path.resolve(
          componentFolder,
          'examples',
          exampleFileName
        );

        if (this.fileHandler.pathExists(exampleFilePath)) {
          examplesFound = true;
          const exampleCode = await this.fileHandler.readFile(exampleFilePath);
          markdown += `### **${propName}**\n`;
          // Safely access description, provide fallback
          markdown += `${
            propDetails.description || 'No description available.'
          }\n\n`;
          // Add type and default value info if available
          if (propDetails.type)
            markdown += `- **Type:** \`${propDetails.type}\`\n`;
          if (
            propDetails.defaultValue !== undefined &&
            propDetails.defaultValue !== null &&
            propDetails.defaultValue !== ''
          )
            markdown += `- **Default:** \`${propDetails.defaultValue}\`\n`;
          if (propDetails.typeValues)
            markdown += `- **Possible Values:** \`${
              Array.isArray(propDetails.typeValues)
                ? propDetails.typeValues.join(', ')
                : propDetails.typeValues
            }\`\n`;
          markdown += '\n```tsx\n';
          markdown += exampleCode.trim();
          markdown += '\n```\n\n';
        }
      }

      if (
        !examplesFound &&
        exampleFiles.filter((f) => f !== 'default.tsx').length === 0
      ) {
        // Only warn if there are no example files other than default
        console.warn(
          `Warning: No specific prop examples found for ${componentName}.`
        );
      }

      // Write markdown content to specified file
      await this.fileHandler.writeFileDirect(
        outputFilePath, // Use the parameter
        markdown
      );

      console.log(
        `\nMarkdown documentation for ${componentName} generated successfully at ${outputFilePath}.`
      );
    } catch (error) {
      console.error(`Error generating Markdown for ${componentName}:`, error);
      // Decide how to handle errors, maybe throw
    }
  }
}
