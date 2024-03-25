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
    const parts = filePath.split('/');
    const componentName = parts[parts.length - 2];

    // Read the file content
    const codeContent = await this.fileHandler.readFile(filePath);

    const updatedCodeContent = this.splitArrayToJSON(codeContent);

    // Define the prompt
    const prompt = CommentPrompt(
      componentName,
      filePath,
      JSON.stringify(updatedCodeContent)
    );

    // Créez un nouveau thread pour la conversation
    const thread = await this.openAIConnector.createThread();

    // Définissez le prompt initial pour la compréhension globale du dossier
    await this.openAIConnector.addMessageToThread(thread.id, {
      role: 'user',
      content: prompt,
    });

    // Récupérez et traitez la réponse pour la compréhension globale
    const response = await this.openAIConnector.runAssistant(
      assistantId,
      thread.id
    );
    // Process the commented code to extract only the code part
    const codeOnly = extractJsonCode(response.text.value);

    this.cache.saveEachJsonToCache(
      this.cacheKey + `/comments`,
      codeOnly,
      path.basename(filePath)
    );

    // Replace file content with the extracted code
    await this.processComments(filePath, codeContent, codeOnly);
  }

  async processComments(filePath: string, code: string, commentsJson: any) {
    try {
      // Check if commentsJson is already an object or a string that needs parsing
      let commentsObj;
      if (typeof commentsJson === 'object') {
        commentsObj = commentsJson;
      } else {
        try {
          commentsObj = JSON.parse(commentsJson);
        } catch (parseError) {
          console.error('Error parsing comments JSON:', parseError);
          return;
        }
      }

      if (!commentsObj || !Array.isArray(commentsObj.comments)) {
        console.error(
          "Expected 'comments' to be an array in the object, received:",
          commentsObj ? typeof commentsObj.comments : 'null'
        );
        return;
      }
      const updatedCode = this.insertComments(code, commentsObj.comments); // Use commentsObj.comments here
      await this.fileHandler.writeWithoutCheck(filePath, updatedCode);
    } catch (error) {
      console.error('Error processing comments:', error);
    }
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
  }

  async processDirectory(dirPath: string, assistantId: string) {
    const cachedResponse = this.cache.getJsonFromCache(
      this.cacheKey + `/comments`
    );

    if (cachedResponse) {
      return cachedResponse;
    }

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
        // if (
        //   fullPath === 'src/components/Form/ComboBox/ComboBox/ComboBox.view.tsx'
        // ) {
        await this.removeCommentsAndCleanFile(fullPath);
        await this.commentCodeFile(fullPath, assistantId);
        // }
      } else if (stat.isDirectory()) {
        await this.processDirectory(fullPath, assistantId); // Recursively process subdirectories
      }
    }
  }

  splitArrayToJSON(code: string): { line: number; code: string }[] {
    const linesArray = code.split('\n'); // Directly split the input code by new lines

    return linesArray.map((lineCode, index) => ({
      line: index + 1, // Line number starts at 1
      code: lineCode, // The actual code on this line
    }));
  }

  insertComments(code: string, comments: any[]): string {
    const lines = code.split('\n');
    const commentMap = new Map<
      number,
      { comment: string; codeSnippet: string }
    >();

    if (!Array.isArray(comments)) {
      throw new TypeError('Comments must be an array.');
    }

    for (const comment of comments) {
      if (comment.line < 1 || comment.line > lines.length) {
        console.warn(
          `Comment for non-existent line ${comment.line} will be ignored.`
        );
        continue;
      }
      commentMap.set(comment.line, {
        comment: comment.comment,
        codeSnippet: comment.codeSnippet,
      });
    }

    let inBlock = false;
    let blockDepth = 0;

    return lines
      .map((line, index) => {
        const lineNum = index + 1;
        const commentData = commentMap.get(lineNum);

        // Enhanced block detection
        if (
          !inBlock &&
          line.trim().startsWith('<') &&
          !line.trim().endsWith('/>')
        ) {
          inBlock = true;
        }
        if (inBlock) {
          if (line.includes('<') && !line.includes('/>')) {
            blockDepth++;
          }
          if (line.includes('/>') || line.includes('</')) {
            blockDepth--;
            if (blockDepth === 0) {
              inBlock = false;
            }
          }
        }

        // Insert comments outside of JSX blocks
        if (commentData && !inBlock) {
          const { comment, codeSnippet } = commentData;
          if (line.includes(codeSnippet)) {
            return `// ${comment}\n${line}`;
          } else {
            console.warn(
              `Code snippet '${codeSnippet}' does not match the start of line ${lineNum}: '${line.trim()}'`
            );
          }
        }

        return line;
      })
      .join('\n');
  }

  compareStrings(line: string, codeSnippet: string) {
    // Trim, convert to lowercase, and get the first three characters
    const lineStart = line.trim().toLowerCase().substring(0, 3);
    const codeSnippetLine = codeSnippet.trim().toLowerCase().substring(0, 3);

    // Determine the minimum length to compare
    const minLength = Math.min(lineStart.length, codeSnippetLine.length);

    // Compare the substrings based on the minimum length
    return (
      lineStart.substring(0, minLength) ===
      codeSnippetLine.substring(0, minLength)
    );
  }
}
