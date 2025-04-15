/**
 * Text View Component
 *
 * Renders text with various styles and states according to the design guidelines.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Element, View, ViewProps } from 'app-studio';

import { TextProps } from './Text.props';
import {
  HeadingSizes,
  FontSizes,
  LineHeights,
  FontWeights,
} from './Text.style';

interface Props extends TextProps {
  views?: {
    container?: ViewProps;
  };
}

interface ContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  isSub?: boolean;
  isSup?: boolean;
  views?: {
    sup?: ViewProps;
  };
}

interface TruncateTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  maxLines?: number;
  views?: {
    truncateText?: ViewProps;
  };
}

/**
 * Renders text content with support for subscript and superscript
 */
const TextContent: React.FC<ContentProps> = ({
  children,
  isSub,
  isSup,
  views,
}) => (
  <>
    {typeof children === 'string' ? (
      <>
        {isSub && (
          <View
            as="sub"
            fontSize="75%"
            lineHeight="0"
            position="relative"
            bottom="-0.25em"
            {...views?.sup}
          >
            {children}
          </View>
        )}
        {isSup && (
          <View
            as="sup"
            fontSize="75%"
            lineHeight="0"
            position="relative"
            top="-0.5em"
            {...views?.sup}
          >
            {children}
          </View>
        )}
        {!isSub && !isSup && <>{children}</>}
      </>
    ) : (
      children
    )}
  </>
);

/**
 * Renders text with truncation after a specified number of lines
 */
const TruncateText: React.FC<TruncateTextProps> = ({
  text,
  maxLines = 1,
  views,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [truncatedLength, setTruncatedLength] = useState(text.length);

  useEffect(() => {
    const textNode = containerRef.current;
    if (!textNode) return;

    const updateTruncatedText = () => {
      const comLineHeight = getComputedStyle(textNode).lineHeight;
      const lineHeight =
        comLineHeight !== 'normal' ? parseFloat(comLineHeight) : 20;
      const maxHeight = lineHeight * maxLines;

      let start = 0;
      let end = text.length;
      let middle;

      while (start <= end) {
        middle = Math.floor((start + end) / 2);
        textNode.innerText = text.substring(0, middle) + '...';
        const currentHeight = textNode.offsetHeight;

        if (currentHeight > maxHeight) {
          end = middle - 1;
        } else {
          start = middle + 1;
        }
      }

      setTruncatedLength(end);
    };

    updateTruncatedText();
  }, [text, maxLines]);

  const displayText =
    text.length > truncatedLength
      ? text.substring(0, truncatedLength) + '...'
      : text;

  return (
    <View
      ref={containerRef}
      overflow="hidden"
      textOverflow="ellipsis"
      {...views?.truncateText}
    >
      {displayText}
    </View>
  );
};

/**
 * Main Text component that renders text with various styles and states
 */
const TextView: React.FC<Props> = ({
  children,
  heading,
  maxLines,
  isItalic = false,
  isUnderlined = false,
  isSub = false,
  isSup = false,
  isStriked = false,
  weight = 'normal',
  size = 'md',
  views,
  ...props
}) => {
  // Apply heading styles if a heading is specified
  const headingStyles = heading ? HeadingSizes[heading] : {};

  // For sub/sup text, use inline display
  const noLineBreak = isSub || isSup ? { display: 'inline' } : {};

  // Get font size, line height, and weight from our design system
  const fontSize = FontSizes[size];
  const lineHeight = LineHeights[size];
  const fontWeight = FontWeights[weight];

  return (
    <Element
      // Apply typography styles according to design guidelines
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontStyle={isItalic ? 'italic' : 'normal'}
      fontWeight={fontWeight}
      letterSpacing="-0.01em"
      textDecoration={
        isStriked ? 'line-through' : isUnderlined ? 'underline' : 'none'
      }
      color="color.gray.900"
      // Apply dark mode styles
      _dark={{
        color: 'color.gray.100',
      }}
      // Apply layout styles
      {...noLineBreak}
      // Apply heading styles if specified
      {...headingStyles}
      // Apply any custom props
      {...props}
      // Apply custom container styles
      {...views?.container}
    >
      {maxLines && typeof children === 'string' ? (
        <TruncateText text={children} maxLines={maxLines} />
      ) : (
        <TextContent isSub={isSub} isSup={isSup}>
          {children}
        </TextContent>
      )}
    </Element>
  );
};

export default TextView;
