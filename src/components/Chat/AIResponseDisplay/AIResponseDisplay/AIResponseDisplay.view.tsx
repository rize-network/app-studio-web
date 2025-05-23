/**
 * AIResponseDisplay View
 *
 * A component for displaying AI-generated responses with support for
 * code blocks, inline code, links, and other formatting.
 */

import React from 'react';
import { View } from 'app-studio';
import { Text } from '../../../Text/Text';
import { CodeBlock } from '../../CodeBlock/CodeBlock';
import { AIResponseDisplayProps } from './AIResponseDisplay.props';
import {
  containerStyles,
  textStyles,
  inlineCodeStyles,
  linkStyles,
  citationStyles,
} from './AIResponseDisplay.style';

export const AIResponseDisplayView: React.FC<AIResponseDisplayProps> = ({
  content,
  enableSyntaxHighlighting = true,
  enableCitations = true,
  enableMath = false,
  enableLinkDetection = true,
  styles = {},
  ...props
}) => {
  // Parse markdown-like content into React components
  const parseContent = () => {
    if (!content) return [];

    const parts: React.ReactNode[] = [];

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

      // Add code block with enhanced styling
      const language = match[1] || 'plaintext';
      const code = match[2];
      parts.push(
        <CodeBlock
          key={`code-${parts.length}`}
          code={code}
          language={language}
          enableSyntaxHighlighting={enableSyntaxHighlighting}
          // Apply consistent styling from design system
          showLineNumbers={true}
          showCopyButton={true}
          styles={{
            container: styles.codeBlock,
          }}
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

  interface TextPart {
    type: 'code' | 'link';
    placeholder: string;
    element: React.ReactNode;
  }

  // Parse text with inline code and links
  const parseTextWithInlineCode = (text: string) => {
    const parts: TextPart[] = [];

    // First, process inline code with improved styling
    const inlineCodeRegex = /`([^`]+)`/g;
    let processedText = '';
    let lastCodeIndex = 0;
    let codeMatch;

    while ((codeMatch = inlineCodeRegex.exec(text)) !== null) {
      // Add text before inline code
      processedText += text.slice(lastCodeIndex, codeMatch.index);

      // Add a placeholder for the inline code
      const codePlaceholder = `__INLINE_CODE_${parts.length}__`;
      processedText += codePlaceholder;

      // Store the inline code element with enhanced styling
      parts.push({
        type: 'code',
        placeholder: codePlaceholder as string,
        element: (
          <Text
            key={`inline-code-${parts.length}`}
            as="span"
            {...inlineCodeStyles}
            // Apply any custom styles from props
            {...(styles.inlineCode || {})}
          >
            {codeMatch[1]}
          </Text>
        ),
      });

      lastCodeIndex = codeMatch.index + codeMatch[0].length;
    }

    // Add remaining text
    processedText += text.slice(lastCodeIndex);

    // Process citations if enabled
    // This is a simple implementation - could be enhanced for more complex citation formats
    if (enableCitations) {
      // Simple citation pattern: [1], [2], etc.
      const citationRegex = /\[(\d+)\]/g;
      let citationMatch;
      let citationProcessedText = '';
      let lastCitationIndex = 0;

      while ((citationMatch = citationRegex.exec(processedText)) !== null) {
        citationProcessedText += processedText.slice(
          lastCitationIndex,
          citationMatch.index
        );

        const citationPlaceholder = `__CITATION_${parts.length}__`;
        citationProcessedText += citationPlaceholder;

        const citationNumber = citationMatch[1];
        parts.push({
          type: 'link', // Reusing link type
          placeholder: citationPlaceholder,
          element: (
            <Text
              key={`citation-${parts.length}`}
              as="sup"
              {...citationStyles}
              {...(styles.citation || {})}
            >
              [{citationNumber}]
            </Text>
          ),
        });

        lastCitationIndex = citationMatch.index + citationMatch[0].length;
      }

      processedText =
        citationProcessedText + processedText.slice(lastCitationIndex);
    }

    // Now, process links in the processed text if enabled
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    let finalText = '';
    let lastLinkIndex = 0;
    let linkMatch;

    while (
      enableLinkDetection &&
      (linkMatch = linkRegex.exec(processedText)) !== null
    ) {
      // Add text before link
      finalText += processedText.slice(lastLinkIndex, linkMatch.index);

      // Add a placeholder for the link
      const linkPlaceholder = `__LINK_${parts.length}__`;
      finalText += linkPlaceholder;

      // Store the link element with enhanced styling
      const url = linkMatch[1];
      parts.push({
        type: 'link',
        placeholder: linkPlaceholder,
        element: (
          <Text
            key={`link-${parts.length}`}
            as="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            {...linkStyles}
            // Apply any custom styles from props
            {...(styles.link || {})}
          >
            {url}
          </Text>
        ),
      });

      lastLinkIndex = linkMatch.index + linkMatch[0].length;
    }

    // Add remaining text
    finalText += enableLinkDetection
      ? processedText.slice(lastLinkIndex)
      : processedText;

    // Replace all placeholders with their corresponding elements
    let result = finalText;
    const segments: React.ReactNode[] = [];
    let currentIndex = 0;

    // Sort parts by their placeholder position in the final text
    const sortedParts = [...parts].sort((a, b) => {
      return result.indexOf(a.placeholder) - result.indexOf(b.placeholder);
    });

    for (const part of sortedParts) {
      const placeholderIndex = result.indexOf(part.placeholder);
      if (placeholderIndex > currentIndex) {
        segments.push(result.slice(currentIndex, placeholderIndex));
      }
      segments.push(part.element);
      currentIndex = placeholderIndex + part.placeholder.length;
    }

    if (currentIndex < result.length) {
      segments.push(result.slice(currentIndex));
    }

    // If there were no special elements, just return the text
    if (segments.length === 0) {
      return text;
    }

    // Otherwise, return the array of segments
    return (
      <Text key={`text-${Math.random()}`} {...textStyles} {...styles.text}>
        {segments}
      </Text>
    );
  };

  // Parse the content once
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
