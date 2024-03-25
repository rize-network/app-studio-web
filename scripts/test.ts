function splitArrayToJSON(array: string[]): { line: number; code: string }[] {
  const linesArray = array.map((item) => item.split('\n')).flat();
  const lineNumbers = linesArray.map((_, index) => index + 1);

  return lineNumbers.map((lineNum, index) => ({
    line: lineNum,
    code: linesArray[index],
  }));
}

function insertComments(code: string, comments: any[]): string {
  const lines = code.split('\n');
  const commentMap = new Map<
    number,
    { comment: string; codeSnippet: string }
  >();

  if (!Array.isArray(comments)) {
    throw new TypeError('Comments must be an array.');
  }

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

  let inBlock = false; // To track if we are inside a JSX block or similar

  return lines
    .map((line, index) => {
      const lineNum = index + 1;
      const commentData = commentMap.get(lineNum);

      // Check if we are entering or leaving a block
      if (line.includes('<') && !line.includes('/>')) {
        inBlock = true;
      }
      if (line.includes('/>') || line.includes('</')) {
        inBlock = false;
      }

      if (commentData && !inBlock) {
        const { comment, codeSnippet } = commentData;
        const lineStart = line.trim().substring(0, 4);

        if (
          lineStart.toLocaleLowerCase() ===
          codeSnippet.trim().substring(0, 4).toLocaleLowerCase()
        ) {
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
}
`;

const comments: any[] = [
  {
    line: 2,
    comment: 'Start of AlertProps interface definition.',
    codeSnippet: 'expo',
  },
  {
    line: 3,
    comment: 'Optional icon property, can be any React node.',
    codeSnippet: 'icon',
  },
  {
    line: 4,
    comment: 'Mandatory title property of type string.',
    codeSnippet: 'titl',
  },
  {
    line: 5,
    comment: 'Mandatory description property of type string.',
    codeSnippet: 'desc',
  },
  {
    line: 6,
    comment: 'Optional variant property with type Variant.',
    codeSnippet: 'vari',
  },
  {
    line: 7,
    comment: 'Optional styles property with type AlertStyles.',
    codeSnippet: 'styl',
  },
  {
    line: 8,
    comment: 'End of AlertProps interface definition.',
    codeSnippet: '}',
  },
];

// Inserting comments into the code
const result = insertComments(code, comments);
console.log(`${result}`);
