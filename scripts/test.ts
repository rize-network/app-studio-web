function insertComments(code: string, comments: any[]): string {
  const lines = code.split('\n');
  const commentMap = new Map<
    number,
    { comment: string; codeSnippet: string }
  >();

  // Prepare comment map with additional check for code snippet
  for (const comment of comments) {
    if (comment.line < 1 || comment.line > lines.length) {
      console.warn(
        `Comment for non-existent line ${comment.line} will be ignored.`
      );
      continue;
    }
    if (commentMap.has(comment.line)) {
      console.warn(`Duplicate comment for line ${comment.line}.`);
    }
    commentMap.set(comment.line, {
      comment: comment.comment,
      codeSnippet: comment.codeSnippet,
    });
  }

  return lines
    .map((line, index) => {
      const lineNum = index + 1;
      const commentData = commentMap.get(lineNum);

      if (commentData) {
        const { comment, codeSnippet } = commentData;
        const lineStart = line.trim().substring(0, 4);
        console.log({ lineNum: lineStart, codeSnippet });
        if (lineStart.toLocaleLowerCase() === codeSnippet) {
          return `// ${comment}\n${line}`;
        } else {
          console.warn(
            `Code snippet '${codeSnippet}' does not match the start of line ${lineNum}.`
          );
        }
      }

      return line;
    })
    .join('\n');
}
// Sample code and comments
const code: string = `import { AlertStyles, Variant } from './Alert.type';
export interface AlertProps {
icon?: React.ReactNode;
title: string;
description: string;
variant?: Variant;
styles?: AlertStyles;
}`;

const comments: any[] = [
  {
    line: 1,
    comment: 'Importing type definitions for Badge component properties.',
    codeSnippet: 'impo',
  },
  {
    line: 2,
    comment: "Defines the structure for the Badge component's props.",
    codeSnippet: 'expo',
  },
  {
    line: 3,
    comment: 'content: Text or number to be displayed within the badge.',
    codeSnippet: 'cont',
  },
  {
    line: 4,
    comment: 'variant: Optional prop to specify the badge style variant.',
    codeSnippet: 'vari',
  },
  {
    line: 5,
    comment:
      'colorScheme: Optional prop to define the color theme of the badge.',
    codeSnippet: 'colo',
  },
  {
    line: 6,
    comment:
      "position: Optional prop to determine the badge's position on the container element.",
    codeSnippet: 'posi',
  },
  {
    line: 7,
    comment: 'size: Optional prop to define the size of the badge.',
    codeSnippet: 'size',
  },
  {
    line: 8,
    comment: 'shape: Optional prop to define the shape of the badge.',
    codeSnippet: 'shap',
  },
  {
    line: 9,
    comment: 'styles: Optional prop to apply custom styles to the badge.',
    codeSnippet: 'styl',
  },
  {
    line: 10,
    comment:
      'Allows additional props not explicitly defined in the type to be included.',
    codeSnippet: '[x: ',
  },
];

// Inserting comments into the code
const result = insertComments(code, comments);
