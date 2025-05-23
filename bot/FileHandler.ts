import fs from 'fs';
import path from 'path';

export class FileHandler {
  /**
   * Reads the content of a file as a string.
   * @param filePath Path to the file
   * @returns File content as a string
   */
  public readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * Reads all filenames in a directory, creating the directory if it doesn't exist.
   * @param directory Directory path
   * @returns Array of filenames
   */
  public readFiles(directory: string): string[] {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    return fs.readdirSync(directory);
  }

  /**
   * Writes content to a file, creating the parent directory if it doesn't exist.
   * @param filePath Path to the file
   * @param content Content to write
   */
  public writeFile(filePath: string, content: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
  }

  /**
   * Writes content to a file directly without checking or creating directories.
   * @param filePath Path to the file
   * @param content Content to write
   */
  public writeFileDirect(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  /**
   * Checks if a file or directory exists.
   * @param filePath Path to check
   * @returns True if the path exists, false otherwise
   */
  public pathExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Reads and parses a JSON file.
   * @param filePath Path to the JSON file
   * @returns Parsed JSON object
   * @throws Error if the file doesn't exist or contains invalid JSON
   */
  public readJsonFile(filePath: string): any {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Invalid JSON in file: ${filePath}`);
    }
  }
}
