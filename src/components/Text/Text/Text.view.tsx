import React, { useEffect, useRef, useState } from 'react';
import { Element, Typography, View, ViewProps } from 'app-studio';

import { TextProps } from './Text.props';
import { HeadingSizes } from './Text.style';

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
          <View as="sup" {...views?.sup}>
            {children}
          </View>
        )}
        {isSup && (
          <View as="sup" {...views?.sup}>
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
    <View ref={containerRef} {...views?.truncateText}>
      {displayText}
    </View>
  );
};
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
  const headingStyles = heading ? HeadingSizes[heading] : {};

  const noLineBreak = isSub || isSup ? { display: 'inline' } : {};

  const fontSize = Typography.fontSizes[size];

  return (
    <Element
      fontSize={fontSize}
      lineHeight={Typography.lineHeights[size]}
      fontStyle={isItalic ? 'italic' : 'normal'}
      fontWeight={Typography.fontWeights[weight]}
      textDecoration={
        isStriked ? 'line-through' : isUnderlined ? 'underline' : 'none'
      }
      {...noLineBreak}
      {...headingStyles}
      {...props}
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
