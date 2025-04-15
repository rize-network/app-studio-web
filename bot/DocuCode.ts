import { FileHandler } from './FileHandler';
import { APPLICATION_SETTINGS } from './Config';
import { extractJsonCode } from './extractors';
import { CommentPrompt } from './prompt/3-comment';
import path from 'path';
import fs from 'fs';
import { Cache } from './Cache';
import { AiService } from './ai/ai.service';
import { MODEL_INFO, Providers } from './ai/ai.config';

export class DocuCode {
  private readonly fileHandler: FileHandler;
  private readonly cache: Cache;
  private readonly cacheKey: string = '';
  private readonly aiService: AiService;
  private selectedModel: string = 'gpt-4o';
  private selectedProvider: string = 'openai';

  constructor(
    cacheKey: string,
    model: string = 'gpt-4o',
    provider: string = 'openai'
  ) {
    this.cacheKey = cacheKey;
    this.cache = new Cache(APPLICATION_SETTINGS.cacheDirectory);
    this.fileHandler = new FileHandler();
    this.aiService = new AiService();

    // Set model and provider if they are valid
    if (model && MODEL_INFO[model]) {
      this.selectedModel = model;
    }

    if (provider && Providers.includes(provider as any)) {
      this.selectedProvider = provider;
    }
  }

  async commentCodeFile(filePath: string) {
    const parts = filePath.split('/');
    const componentName = parts[parts.length - 2];

    // Read the file content
    const codeContent = await this.fileHandler.readFile(filePath);
    const updatedCodeContent = this.splitArrayToJSON(codeContent);

    // Define the prompt
    const prompt = CommentPrompt(
      componentName,
      path.basename(filePath),
      JSON.stringify(updatedCodeContent)
    );

    // System message
    const systemMessage = {
      role: 'system',
      content:
        'You are an expert code commenter. Analyze code and provide useful comments that explain functionality.',
    };

    // User message with the comment prompt
    const userMessage = {
      role: 'user',
      content: prompt,
    };

    // Send message to AI service
    const response = await this.aiService.send({
      model: this.selectedModel,
      provider: this.selectedProvider as any,
      messages: [systemMessage, userMessage],
      temperature: 0.2,
      json: true,
    });

    // Extract JSON from response
    const codeOnly = extractJsonCode(response) || JSON.parse(response);

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
      await this.fileHandler.writeFileDirect(filePath, updatedCode);
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
    this.fileHandler.writeFileDirect(filePath, content);
  }

  async processDirectory(dirPath: string) {
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
        await this.removeCommentsAndCleanFile(fullPath);
        await this.commentCodeFile(fullPath);
      } else if (stat.isDirectory()) {
        await this.processDirectory(fullPath); // Recursively process subdirectories
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
