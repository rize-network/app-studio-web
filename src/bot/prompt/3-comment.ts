export const CommentPrompt = (codeContent: string) =>
  `
  This process aim is to generate short insightful comments purpose for a provided array of object, specifically focusing on descriptions, parameters, and steps involved in the code's functionality.

  Here's how the process works:

  - Each object in the provided reference array corresponds to a specific line in the code, with 'line' indicating the line number and 'code' representing the actual code on that line.
  - The code array: ${codeContent}.

  Important considerations:

  - Do not provide comments for Import statements code or CSS properties code so that to keep the analysis clear and relevant.
  - Identify any retun JSX Block and do not create any comments for the code inside the JSX Block Code.
  - Comments should be formatted in JSON, linking each comment to its respective line number and the initial code snippet.
  - All three key name are required.
  - The comment should indicate the purpose of the code line to give the user feedback.

  The goal is to focus commentary only on significant lines of code, avoiding return blocks and lines that do not significantly contribute to understanding the code's functionality.
  This approach ensures the code structure remains undisturbed.

 Completion: The expected JSON format for comments is:

  \`\`\`json
  {
    "comments": [
      { "line": [line number], "comment": "[explanatory comment]", "codeSnippet": "[first 4 letters of the code line, excluding spaces]" },
      ...
    ]
  }
  \`\`\`
  `;
