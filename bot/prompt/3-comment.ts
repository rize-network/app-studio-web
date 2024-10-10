export const CommentPrompt = (
  componentName: string,
  fileName: string,
  codeContent: string
) => `
  The aim of this process is to generate concise and insightful comments that describe the purpose or use of various parts of the code, focusing on descriptions, parameters, and steps involved in the code's functionality.

  **Process Overview:**
  - Analyze a provided array of objects representing code lines, where each object contains a 'line' (the line number) and 'code' (the actual code on that line).
  - Generate comments that enhance understanding of the code, particularly its functionality and structure.

  **Commenting Guidelines:**
  - Exclude Import statements and CSS properties to maintain clarity and relevance.
  - For the "${componentName}.props.ts" and "${componentName}.type.ts" files, include a comment for each property.
  - For the "${componentName}.state.ts" file, provide a single comment summarizing the file's purpose.
  - In "${componentName}.view.tsx" and "${componentName}.tsx" files, comment only on functions and variables, not on properties.
  - Avoid comments within JSX blocks to keep the code structure clear.

  **Format Specifications:**
  - Comments should be in JSON format, with each comment linked to its respective line number and the initial code snippet.
  - The comment should elucidate the component's use or purpose, providing valuable insights.

  **Expected JSON Format:**
  \`\`\`json
  {
    "comments": [
      { "line": [line number], "comment": "[explanatory comment]", "codeSnippet": "[first 4 letters of the code line, excluding spaces]" }
    ]
  }
  \`\`\`

  Ensure a single comment for the "${componentName}.state.ts", "${componentName}.provider.tsx", "${componentName}.context.tsx", and "${componentName}.tsx" codes.

  **Component Name:** ${componentName}
  **File Name:** ${fileName}
  **Code Content:**
  \`\`\`json
  ${codeContent}
  \`\`\`
`;
