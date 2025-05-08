import React from 'react';
import { Element, Text, useInView, useTheme } from 'app-studio';

import { TitleProps } from './Title.props';
import { useTitleState } from './Title.state';
import { HighlightStyles, LineHeights, TitleSizes } from './Title.style';

/**
 * Title View Component
 *
 * Renders a title with optional highlighting and animations for hero sections.
 */
const TitleView: React.FC<TitleProps> = ({
  children,
  highlightText,
  highlightStyle = 'background',
  highlightColor = 'theme.primary',
  highlightSecondaryColor,
  animation = 'none',
  size = 'xl',
  centered = false,
  views,
  ...props
}) => {
  // Use the inView hook to detect when the component is visible
  const { ref, inView } = useInView();

  // Get theme utilities
  const { getColor, themeMode: contextThemeMode } = useTheme();
  const themeMode = props.themeMode || contextThemeMode;

  // Resolve theme colors
  const resolvedHighlightColor = getColor(highlightColor, { themeMode });
  const resolvedSecondaryColor = highlightSecondaryColor
    ? getColor(highlightSecondaryColor, { themeMode })
    : undefined;

  // Get state and animation functions from custom hook
  const { displayText, getAnimation } = useTitleState({
    children,
    highlightText,
    highlightStyle,
    highlightColor: resolvedHighlightColor,
    animation,
    _isInView: inView,
    ...props,
  });

  // Get animation configuration only when the component is in view
  // For typewriter animation, we don't need an animation config as it's handled by useState/useEffect
  const animationConfig =
    inView && animation !== 'typewriter' ? getAnimation() : undefined;

  // Get highlight styles
  const highlightStyleProps = HighlightStyles[highlightStyle](
    resolvedHighlightColor,
    resolvedSecondaryColor
  );

  // Get font size and line height based on size prop
  const fontSize = TitleSizes[size];
  const lineHeight = LineHeights[size];

  // For typewriter animation, use the displayText state
  const content = animation === 'typewriter' ? displayText : children;

  // If the content is a simple string and we have highlight text
  if (typeof children === 'string' && highlightText) {
    const text = children as string;

    // For a single highlight text
    if (typeof highlightText === 'string') {
      // Define a type for our parts array
      type TextPart = string | { highlight: boolean; text: string };

      // Create a regex pattern to match the highlight text as a word
      // Use word boundaries to ensure we match whole words
      const pattern = new RegExp(`\\b(${highlightText})\\b`, 'gi');

      // Check if the pattern matches anything in the text
      if (pattern.test(text)) {
        // Reset the regex pattern's lastIndex property
        pattern.lastIndex = 0;

        // Split the text by the pattern and keep the matches
        const parts: TextPart[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = pattern.exec(text)) !== null) {
          // Add the text before the match
          if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
          }

          // Add the match as a special part to be highlighted
          parts.push({ highlight: true, text: match[0] });

          lastIndex = match.index + match[0].length;
        }

        // Add any remaining text after the last match
        if (lastIndex < text.length) {
          parts.push(text.substring(lastIndex));
        }

        return (
          <Element
            ref={ref}
            as="h1"
            fontSize={fontSize}
            lineHeight={`${lineHeight}px`}
            fontWeight="bold"
            textAlign={centered ? 'center' : 'left'}
            animate={animationConfig}
            {...props}
            {...views?.container}
          >
            {parts.map((part, index) => (
              <React.Fragment key={index}>
                {typeof part === 'string' ? (
                  part
                ) : (
                  <Text
                    as="span"
                    display="inline"
                    {...highlightStyleProps}
                    {...views?.highlight}
                  >
                    {part.text}
                  </Text>
                )}
              </React.Fragment>
            ))}
          </Element>
        );
      }
    }

    // For multiple highlight texts
    if (Array.isArray(highlightText)) {
      // Define a type for our parts array
      type TextPart = string | { highlight: boolean; text: string };

      // Create a regex pattern to match any of the highlight texts with word boundaries
      const pattern = new RegExp(`\\b(${highlightText.join('|')})\\b`, 'gi');

      // Check if the pattern matches anything in the text
      if (pattern.test(text)) {
        // Reset the regex pattern's lastIndex property
        pattern.lastIndex = 0;

        // Split the text by the pattern and keep the matches
        const parts: TextPart[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = pattern.exec(text)) !== null) {
          // Add the text before the match
          if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
          }

          // Add the match as a special part to be highlighted
          parts.push({ highlight: true, text: match[0] });

          lastIndex = match.index + match[0].length;
        }

        // Add any remaining text after the last match
        if (lastIndex < text.length) {
          parts.push(text.substring(lastIndex));
        }

        return (
          <Element
            ref={ref}
            as="h1"
            fontSize={fontSize}
            lineHeight={`${lineHeight}px`}
            fontWeight="bold"
            textAlign={centered ? 'center' : 'left'}
            animate={animationConfig}
            {...props}
            {...views?.container}
          >
            {parts.map((part, index) => (
              <React.Fragment key={index}>
                {typeof part === 'string' ? (
                  part
                ) : (
                  <Text
                    as="span"
                    display="inline"
                    {...highlightStyleProps}
                    {...views?.highlight}
                  >
                    {part.text}
                  </Text>
                )}
              </React.Fragment>
            ))}
          </Element>
        );
      }
    }
  }

  // Default rendering for non-string children or no highlighting
  return (
    <Element
      ref={ref}
      as="h1"
      fontSize={fontSize}
      lineHeight={`${lineHeight}px`}
      fontWeight="bold"
      textAlign={centered ? 'center' : 'left'}
      animate={animationConfig}
      {...props}
      {...views?.container}
    >
      {content}
    </Element>
  );
};

export default TitleView;
