/**
 * CodeBlock View
 */

import React from 'react';
import { View } from 'app-studio';
import { Text } from '../../../Text/Text';
import { CodeBlockProps } from './CodeBlock.props';
import {
  containerStyles,
  headerStyles,
  contentStyles,
  copyButtonStyles,
  languageLabelStyles,
} from './CodeBlock.style';

interface Props extends CodeBlockProps {
  isCopied: boolean;
  copyToClipboard: (text: string) => void;
}

export const CodeBlockView: React.FC<Props> = ({
  code,
  language = 'plaintext',
  showLineNumbers = true,
  enableSyntaxHighlighting = true,
  showCopyButton = true,
  showLanguageLabel = true,
  styles = {},
  isCopied,
  copyToClipboard,
  ...props
}) => {
  // Simple syntax highlighting for common languages
  const highlightCode = () => {
    if (!enableSyntaxHighlighting) {
      return <pre>{code}</pre>;
    }

    // This is a very basic implementation
    // In a real app, you would use a library like Prism.js or highlight.js
    const lines = code.split('\n');

    return (
      <pre>
        {lines.map((line, index) => (
          <div key={index} style={{ display: 'flex' }}>
            {showLineNumbers && (
              <span
                style={{
                  color: '#6b7280',
                  marginRight: '16px',
                  userSelect: 'none',
                  textAlign: 'right',
                  minWidth: '32px',
                }}
              >
                {index + 1}
              </span>
            )}
            <span>{line}</span>
          </div>
        ))}
      </pre>
    );
  };

  return (
    <View {...containerStyles} {...props} {...styles.container}>
      {(showLanguageLabel || showCopyButton) && (
        <View {...headerStyles} {...styles.header}>
          {showLanguageLabel && (
            <View {...languageLabelStyles}>
              <Text>{language}</Text>
            </View>
          )}

          {showCopyButton && (
            <View
              {...copyButtonStyles}
              {...styles.copyButton}
              onClick={() => copyToClipboard(code)}
            >
              <Text>{isCopied ? 'Copied!' : 'Copy'}</Text>
            </View>
          )}
        </View>
      )}

      <View {...contentStyles} {...styles.content}>
        {highlightCode()}
      </View>
    </View>
  );
};
