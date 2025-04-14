/**
 * AIResponseDisplay View
 */

import React from 'react';
import { View } from 'app-studio';
import { Text } from '../../../Text/Text';
import { CodeBlock } from '../../CodeBlock/CodeBlock';
import { AIResponseDisplayProps } from './AIResponseDisplay.props';
import {
  containerStyles,
  textStyles,
  codeBlockStyles,
  inlineCodeStyles,
  citationStyles,
} from './AIResponseDisplay.style';

export const AIResponseDisplayView: React.FC<AIResponseDisplayProps> = ({
  content,
  enableSyntaxHighlighting = true,
  enableCitations = true,
  enableMath = false,
  styles = {},
  ...props
}) => {
  // Simple parser for markdown-like content
  const parseContent = () => {
    if (!content) return [];

    const parts: React.ReactNode[] = [];
    let currentText = '';

    // Split content by code blocks
    const codeBlockRegex = /```([a-z]*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      const textBeforeCode = content.slice(lastIndex, match.index);
      if (textBeforeCode) {
        parts.push(parseTextWithInlineCode(textBeforeCode));
      }

      // Add code block
      const language = match[1] || 'plaintext';
      const code = match[2];
      parts.push(
        <CodeBlock
          key={`code-${parts.length}`}
          code={code}
          language={language}
          enableSyntaxHighlighting={enableSyntaxHighlighting}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(parseTextWithInlineCode(content.slice(lastIndex)));
    }

    return parts;
  };

  // Parse text with inline code
  const parseTextWithInlineCode = (text: string) => {
    const parts: React.ReactNode[] = [];
    let currentText = '';

    // Split by inline code
    const inlineCodeRegex = /`([^`]+)`/g;
    let lastIndex = 0;
    let match;

    while ((match = inlineCodeRegex.exec(text)) !== null) {
      // Add text before inline code
      const textBeforeCode = text.slice(lastIndex, match.index);
      if (textBeforeCode) {
        parts.push(textBeforeCode);
      }

      // Add inline code
      const code = match[1];
      parts.push(
        <Text
          key={`inline-code-${parts.length}`}
          as="span"
          fontFamily="monospace"
          backgroundColor="color.gray.100"
          padding="0 4px"
          borderRadius="sm"
        >
          {code}
        </Text>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // If there were no inline codes, just return the text
    if (parts.length === 0) {
      return text;
    }

    // Otherwise, return the array of parts
    return (
      <Text key={`text-${Math.random()}`} {...textStyles} {...styles.text}>
        {parts}
      </Text>
    );
  };

  const parsedContent = parseContent();

  return (
    <View {...containerStyles} {...props} {...styles.container}>
      {parsedContent.length > 0 ? (
        parsedContent
      ) : (
        <Text {...textStyles} {...styles.text}>
          {content}
        </Text>
      )}
    </View>
  );
};
