/**
 * CodeBlock State
 */

import { useState } from 'react';

export const useCodeBlockState = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return {
    isCopied,
    copyToClipboard,
  };
};
