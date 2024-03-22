import { FileHandler } from './FileHandler';

import { OpenAIConnector } from './OpenAIConnector';
import { API_CONFIG, APPLICATION_SETTINGS } from './Config';
import { extractJsonCode } from './extractors';
import { CommentPrompt } from './prompt/3-comment';

import path from 'path';
import fs from 'fs';
import { Cache } from './Cache';

export class DocuCode {
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

  async commentCodeFile(filePath: string, assistantId: string) {
    // Read the file content
    const codeContent = this.fileHandler.readFile(filePath);

    // Define the prompt
    const prompt = CommentPrompt(codeContent);

    // Créez un nouveau thread pour la conversation
    const thread = await this.openAIConnector.createThread();

    // console.log('ok threads');

    // Définissez le prompt initial pour la compréhension globale du dossier
    await this.openAIConnector.addMessageToThread(thread.id, {
      role: 'user',
      content: prompt,
    });

    // console.log('ok message');

    // Récupérez et traitez la réponse pour la compréhension globale
    const response = await this.openAIConnector.runAssistant(
      assistantId,
      thread.id
    );

    // console.log('ok run ');

    // Process the commented code to extract only the code part
    const codeOnly = extractJsonCode(response.text.value);
    // console.log('ok run ');

    this.cache.saveEachJsonToCache(
      this.cacheKey + `/comments`,
      codeOnly,
      path.basename(filePath)
    );

    // Replace file content with the extracted code
    await this.processComments(filePath, codeOnly);

    // console.log('commentCodeFile successful');
  }

  async processComments(filePath: string, commentsJson: any) {
    try {
      // Check if commentsJson is already an object or a string that needs parsing
      const commentsObj =
        typeof commentsJson === 'object'
          ? commentsJson
          : JSON.parse(commentsJson);

      if (!Array.isArray(commentsObj.comments)) {
        console.error(
          "Expected 'comments' to be an array, received:",
          typeof commentsObj.comments
        );
        return;
      }

      console.log({ commentsObj });
      // Sort and process comments
      commentsObj.comments.sort(
        (a: { line: number }, b: { line: number }) => b.line - a.line
      );
      console.log({ commentsObj });

      for (const commentObj of commentsObj.comments) {
        await this.insertCommentIntoFile(
          filePath,
          commentObj.line,
          commentObj.comment
        );
      }
      // console.log('processComments successful');
    } catch (error) {
      console.error('Error processing comments:', error);
    }
  }

  async insertCommentIntoFile(filePath: string, line: number, comment: string) {
    console.log({ filePath, line, comment });

    const fileContent = await this.fileHandler.readFile(filePath);
    let lines = fileContent.split('\n');

    console.log(lines.length);

    lines.splice(line, 0, `// ${comment}`); // Insert the comment.

    await this.fileHandler.writeWithoutCheck(filePath, lines.join('\n'));
  }

  async removeCommentsAndCleanFile(filePath: string) {
    // Read the content of the file
    let content: string = this.fileHandler.readFile(filePath);

    // Regular expression to match single line, multi-line, and JSDoc comments
    const singleLineCommentsPattern = /\/\/.*/g;
    const multiLineAndJSDocCommentsPattern = /\/\*[\s\S]*?\*\//g;

    // Remove single-line comments
    content = content.replace(singleLineCommentsPattern, '');

    // Remove multi-line and JSDoc comments
    content = content.replace(multiLineAndJSDocCommentsPattern, '');

    // Regular expression to match more than one newline characters in a row or lines with only whitespace characters
    const extraNewLinesAndWhitespacePattern = /(\r?\n\s*\r?\n)+/g;

    // Replace sequences of two or more newlines or lines with only whitespaces with a single newline
    content = content.replace(extraNewLinesAndWhitespacePattern, '\n');

    // Write the modified content back to the file
    this.fileHandler.writeWithoutCheck(filePath, content);

    // console.log(`Comments and extra newlines removed from '${filePath}'.`);
  }

  async processDirectory(dirPath: string, assistantId: string) {
    // const cachedResponse = this.cache.getJsonFromCache(
    //   this.cacheKey + `/comments`
    // );

    // if (cachedResponse) {
    //   return cachedResponse;
    // }

    const files = await this.fileHandler.readFiles(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = await fs.statSync(fullPath);

      if (path.basename(fullPath) === 'examples') {
        continue;
      }

      if (
        (stat.isFile() && path.extname(file) === '.ts') ||
        path.extname(file) === '.tsx'
      ) {
        if (fullPath === 'src/components/Alert/Alert/Alert.props.ts') {
          await this.removeCommentsAndCleanFile(fullPath);
          await this.commentCodeFile(fullPath, assistantId);
        }
      } else if (stat.isDirectory()) {
        await this.processDirectory(fullPath, assistantId); // Recursively process subdirectories
      }
    }
  }
}
