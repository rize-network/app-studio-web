import React, { useEffect, useRef, useState } from 'react';
import { Element, Typography } from 'app-studio';

import { ContentProps, TextProps, TruncateTextProps } from './Text.props';
import { HeadingSizes } from './Text.style';

const TextContent: React.FC<ContentProps> = ({ children, isSub, isSup }) => (
  <>
    {typeof children === 'string' ? (
      <>
        {isSub && <sup>{children}</sup>}
        {isSup && <sup>{children}</sup>}
        {!isSub && !isSup && <>{children}</>}
      </>
    ) : (
      children
    )}
  </>
);

const TruncateText: React.FC<TruncateTextProps> = ({ text, maxLines = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(text);

  useEffect(() => {
    let textContent = content;
    const textNode = containerRef.current;

    if (textNode) {
      const contentHeight = textNode.offsetHeight;

      const comLineHeight = getComputedStyle(textNode).lineHeight;

      const lineHeight: number = comLineHeight !== 'normal' ? parseFloat(comLineHeight) : 20;

      const maxHeight = Math.ceil(lineHeight * maxLines);

      if (contentHeight > maxHeight) {
        textContent = textContent.slice(0, -1);
      } else if (contentHeight === maxHeight) {
        if (content.length !== text.length) {
          textContent = textContent.slice(0, -3) + '...';
        }
      }

      setContent(textContent);
    }
  }, [maxLines, text, containerRef, content]);

  return <div ref={containerRef}>{content}</div>;
};

const TextView: React.FC<TextProps> = ({
  children,
  heading,
  maxLines,
  isItalic = false,
  isUnderlined = false,
  isSub = false,
  isSup = false,
  isStriked = false,
  isTruncated = false,
  weight = 'normal',
  size = 'md',
  ...props
}) => {
  const headingStyles = heading ? HeadingSizes[heading] : {};

  const noLineBreak = isSub || isSup ? { display: 'inline' } : {};

  const fontSize = Typography.fontSizes[size];

  return (
    <Element
      role="text"
      fontSize={fontSize}
      lineHeight={Typography.lineHeights[size]}
      fontStyle={isItalic ? 'italic' : 'normal'}
      fontWeight={Typography.fontWeights[weight]}
      textDecoration={isStriked ? 'line-through' : isUnderlined ? 'underline' : 'none'}
      {...noLineBreak}
      {...headingStyles}
      {...props}
    >
      {isTruncated && maxLines && typeof children === 'string' ? (
        <TruncateText text={children} maxLines={maxLines} />
      ) : (
        <TextContent isSub={isSub} isSup={isSup} {...props}>
          {children}
        </TextContent>
      )}
    </Element>
  );
};

export default TextView;
