import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

interface Comment {
  line: number;
  comment: string;
  codeSnippet: string;
}

function insertCommentsUsingAST(code: string, comments: Comment[]): string {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const commentMap = new Map(
    comments.map((comment) => [comment.line, comment])
  );
  let lines = code.split('\n');

  traverse(ast, {
    JSXElement(path) {
      const loc = path.node.loc;
      if (!loc) return; // Skip if location information is not available

      const startLine = loc.start.line;
      const endLine = loc.end.line;

      for (let line = startLine; line <= endLine; line++) {
        const comment = commentMap.get(line);
        if (
          comment &&
          lines[line - 1].trim().startsWith(comment.codeSnippet.trim())
        ) {
          // Insert the comment directly before the JSX block in the original code
          lines[line - 1] = `// ${comment.comment}\n${lines[line - 1]}`;
        }
      }
    },
  });

  return lines.join('\n');
}

const tsxCode = `
import React from 'react';

const MyComponent: React.FC = () => {
  return <div>Hello, world!</div>;
};

export default MyComponent;
`;

const comments: Comment[] = [
  {
    line: 4,
    comment: 'This is the JSX block of MyComponent',
    codeSnippet: 'return <div>',
  },
];

const modifiedCode = insertCommentsUsingAST(tsxCode, comments);
console.log(modifiedCode);
