export const CommentPrompt = (codeContent: string) =>
  `The aim is to generate insightful comments on a given piece of code, specifically focusing on descriptions, parameters, and steps involved in the code's functionality.
This excludes any commentary on whole import statements and css properties to maintain clarity and relevancy.
Do not add comments in code after render or return blocks.

Provide comments in JSON format, where each comment is associated with a line number.
The format of the JSON response should be:
{
comments: [
 { "line": [line number], "comment": "[explanatory comment]" },
 ...
]
} :\n\n` + codeContent;
