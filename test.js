const fs = require('fs').promises;
const path = require('path');

// Define source and target directories
const srcDirectory = path.join(__dirname, 'src', 'components');
const targetDirectory = path.join(__dirname, 'public/static/media');

// Function to move MDX files from src to public
async function moveMdxFiles(srcDir, targetDir) {
  try {
    const files = await fs.readdir(srcDir, { withFileTypes: true });

    for (const file of files) {
      const srcFilePath = path.join(srcDir, file.name);
      const targetFilePath = path.join(targetDir, file.name);

      if (file.isDirectory()) {
        // If it's a directory, recursively move .mdx files from subdirectories
        await moveMdxFiles(srcFilePath, targetDir);
      } else if (file.isFile() && path.extname(file.name) === '.mdx') {
        // If it's a .mdx file, move it to the target directory
        await fs.rename(srcFilePath, targetFilePath);
        console.log(`Moved: ${srcFilePath} -> ${targetFilePath}`);
      }
    }
  } catch (err) {
    console.error('Error moving .mdx files:', err);
  }
}

// Ensure target directory exists before moving files
async function ensureTargetDirectoryExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Ensured target directory exists: ${dir}`);
  } catch (err) {
    console.error('Error ensuring target directory exists:', err);
  }
}

// Execute the script
(async function () {
  await ensureTargetDirectoryExists(targetDirectory);
  await moveMdxFiles(srcDirectory, targetDirectory);
})();
