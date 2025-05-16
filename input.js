// File replacement script
const fs = require('fs');
const path = require('path');

/**
 * Parse the output format to extract file paths and their content
 * @param {string} output - The output string containing file information
 * @returns {Array<{filePath: string, content: string}>} Array of file objects
 */
function parseOutput(output) {
  let files = [];

  // Try to parse the format with "================\nFile: path\n================" format
  const fileRegex = /={16}\nFile: (.*?)\n={16}\n([\s\S]*?)(?=\n={16}\n|$)/g;
  let match;

  while ((match = fileRegex.exec(output)) !== null) {
    files.push({
      filePath: match[1],
      content: match[2],
    });
  }

  // If no files were found with the first format, try the TypeScript comment format
  if (files.length === 0) {
    // Look for format like "// File: path\n```typescript\n...content...```"
    const tsFileRegex = /\/\/ File: (.*?)\n```typescript\n([\s\S]*?)```/g;

    while ((match = tsFileRegex.exec(output)) !== null) {
      files.push({
        filePath: match[1],
        content: match[2],
      });
    }
  }

  // Look for directory creation instructions
  const dirRegex = /\/\/ Create directory: (.*?)$/gm;
  while ((match = dirRegex.exec(output)) !== null) {
    files.push({
      filePath: match[1],
      isDirectory: true,
    });
  }

  return files;
}

/**
 * Create or replace files with the provided content
 * @param {Array<{filePath: string, content: string, isDirectory: boolean}>} files - Array of file objects
 */
function replaceFiles(files) {
  files.forEach((file) => {
    // If it's just a directory to create
    if (file.isDirectory) {
      if (!fs.existsSync(file.filePath)) {
        fs.mkdirSync(file.filePath, { recursive: true });
        console.log(`Created directory: ${file.filePath}`);
      }
      return;
    }

    // Create directory if it doesn't exist
    const dirname = path.dirname(file.filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
      console.log(`Created directory: ${dirname}`);
    }

    // Write file content
    fs.writeFileSync(file.filePath.replace(/'`'/g, ''), file.content);
    console.log(`File created/replaced: ${file.filePath}`);
  });
}

/**
 * Main function to process the output and replace files
 * @param {string} outputPath - Path to the file containing the output
 */
function processOutput(outputPath) {
  try {
    // Read the output file
    const output = fs.readFileSync(outputPath, 'utf8');

    // Parse the output to get file information
    const files = parseOutput(output);

    // Check if any files were found
    if (files.length === 0) {
      console.error(
        'No file information found in the output. Check the format.'
      );
      console.log('The script supports the following formats:');
      console.log(
        '1. "================\\nFile: path\\n================" format'
      );
      console.log(
        '2. "// File: path\\n```typescript\\n...content...```" format'
      );
      console.log('3. "// Create directory: path" for directory creation');
      return;
    }

    // Replace the files
    replaceFiles(files);

    const fileCount = files.filter((f) => !f.isDirectory).length;
    const dirCount = files.filter((f) => f.isDirectory).length;
    console.log(
      `Successfully processed ${fileCount} files and ${dirCount} directories.`
    );
  } catch (error) {
    console.error('Error processing the output:', error.message);
  }
}

// Process the output
processOutput('./input.txt');
