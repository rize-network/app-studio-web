/**
 * CodeBlock Component
 *
 * A component for displaying code with syntax highlighting, line numbers,
 * and a copy button.
 */

import React from 'react';
import { CodeBlockProps } from './CodeBlock/CodeBlock.props';
import { useCodeBlockState } from './CodeBlock/CodeBlock.state';
import { CodeBlockView } from './CodeBlock/CodeBlock.view';

export const CodeBlock: React.FC<CodeBlockProps> = (props) => {
  const { isCopied, copyToClipboard } = useCodeBlockState();

  return (
    <CodeBlockView
      {...props}
      isCopied={isCopied}
      copyToClipboard={copyToClipboard}
    />
  );
};

export type { CodeBlockProps } from './CodeBlock/CodeBlock.props';
