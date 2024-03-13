import * as fs from 'fs';
import * as path from 'path';

// Function to generate index content for a single file
function generateIndexContent(filename: string): string {
  const componentName = path.basename(filename, '.tsx');
  return `export * from './${componentName}';\n`;
}

// Function to generate index content for all files in the directory
function generateIndex(directory: string): string {
  const files = fs.readdirSync(directory);
  let indexContent = '';
  files.forEach((file) => {
    if (file.endsWith('.tsx')) {
      indexContent += generateIndexContent(file);
    }
  });
  return indexContent;
}

// Function to create index file for the directory
function createIndexFile(directory: string): void {
  const indexPath = path.join(directory, 'index.ts');
  const indexContent = generateIndex(directory);
  fs.writeFileSync(indexPath, indexContent);
  console.log(`Index file created at ${indexPath}`);
}

// Function to recursively find all examples directories
function findExamplesDirectories(parentDirectory: string): string[] {
  const examplesDirectories: string[] = [];

  const directories = fs.readdirSync(parentDirectory, { withFileTypes: true });
  directories.forEach((dirent) => {
    const dirPath = path.join(parentDirectory, dirent.name);
    if (dirent.isDirectory()) {
      if (dirent.name === 'examples') {
        examplesDirectories.push(dirPath);
      } else {
        examplesDirectories.push(...findExamplesDirectories(dirPath));
      }
    }
  });

  return examplesDirectories;
}

// Specify the parent directory containing the examples folders
const parentDirectory = 'src/components';

// Find all examples directories recursively
const examplesDirectories = findExamplesDirectories(parentDirectory);

// Create index files for each examples folder
examplesDirectories.forEach((directory) => {
  createIndexFile(directory);
});
