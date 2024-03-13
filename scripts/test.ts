import fs from 'fs';

function removeCommentsAndCleanFile(filePath: string) {
  try {
    // Read the content of the file
    let content: string = fs.readFileSync(filePath, 'utf8');

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
    fs.writeFileSync(filePath, content, 'utf8');

    console.log(`Comments and extra newlines removed from '${filePath}'.`);
  } catch (err) {
    console.error(`Error processing file '${filePath}':`, err);
  }
}

// Hardcoded file path
const filePath: string = 'src/components/Button/Button/Button.props.ts';

// Call the function with the specified file path
removeCommentsAndCleanFile(filePath);
