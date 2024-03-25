export const CommentPrompt = (codeContent: string) =>
  `
  This process aim is to generate insightful comments for a provided array of object, specifically focusing on descriptions, parameters, and steps involved in the code's functionality.

  Here's how the process works:

  - Each object in the array corresponds to a specific line in the code, with 'line' indicating the line number and 'code' representing the actual code on that line.
  - The code array should be referenced as ${codeContent}.

  Important considerations:

  - Do not provide comments for Import statements code or CSS properties code so thatb to keep the analysis clear and relevant.
  - Avoid adding comments after """render""" or """return""" blocks in the code.
  - Comments should be formatted in JSON, linking each comment to its respective line number and the initial code snippet.

  The goal is to focus commentary only on significant lines of code, avoiding return blocks and lines that do not significantly contribute to understanding the code's functionality.
  This approach ensures the code structure remains undisturbed.

  The expected JSON format for comments is:

  \`\`\`json
  {
    "comments": [
      { "line": [line number], "comment": "[explanatory comment]", "codeSnippet": "[first 4 letters of the code line, excluding spaces]" },
      ...
    ]
  }
  \`\`\`
  `;
