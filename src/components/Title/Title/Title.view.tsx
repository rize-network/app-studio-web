import React from 'react';
import { Element, Text, useInView, useTheme } from 'app-studio';

import { TitleProps } from './Title.props';
import { useTitleState } from './Title.state';
import { HighlightStyles, LineHeights, TitleSizes } from './Title.style';

// Helper function to escape special characters for use in RegExp
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Title View Component
 *
 * Renders a title with optional highlighting and animations for hero sections.
 */
const TitleView: React.FC<TitleProps> = ({
  children,
  highlightText, // Original highlightText, used for initial state in useTitleState
  highlightStyle = 'background',
  highlightColor = 'theme.primary',
  highlightSecondaryColor,
  animation = 'none',
  size = 'xl',
  centered = false,
  views,
  ...props // This includes alternateAnimation, alternateHighlightText, alternateDuration etc.
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
  const {
    displayTextForTypewriter,
    getAnimation,
    finalDisplayedText, // This is the text to display (e.g., "Our Product is Amazing")
    activeHighlightTarget, // This is what to highlight (e.g., "Amazing" or ["multiple", "highlights"])
  } = useTitleState({
    children,
    highlightText,
    animation,
    _isInView: inView,
    ...props, // Pass all other relevant props like alternateAnimation, alternateHighlightText, alternateDuration
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

  // Determine the content to be processed for rendering and potential highlighting
  // If typewriter, it's displayTextForTypewriter. Otherwise, it's finalDisplayedText.
  const textForRenderingAndHighlighting =
    animation === 'typewriter' ? displayTextForTypewriter : finalDisplayedText;

  // If the textForRenderingAndHighlighting is a string and we have activeHighlightTarget
  if (
    typeof textForRenderingAndHighlighting === 'string' &&
    activeHighlightTarget
  ) {
    const text = textForRenderingAndHighlighting; // Current text to display

    // For a single highlight text (string)
    if (typeof activeHighlightTarget === 'string') {
      type TextPart = string | { highlight: boolean; text: string };
      const pattern = new RegExp(
        `(${escapeRegExp(activeHighlightTarget)})`,
        'gi'
      );

      if (pattern.test(text)) {
        pattern.lastIndex = 0; // Reset regex
        const parts: TextPart[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = pattern.exec(text)) !== null) {
          if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
          }
          parts.push({ highlight: true, text: match[0] });
          lastIndex = match.index + match[0].length;
        }
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

    // For multiple highlight texts (array of strings)
    if (Array.isArray(activeHighlightTarget)) {
      type TextPart = string | { highlight: boolean; text: string };
      const pattern = new RegExp(
        `(${activeHighlightTarget.map(escapeRegExp).join('|')})`,
        'gi'
      );

      if (pattern.test(text)) {
        pattern.lastIndex = 0; // Reset regex
        const parts: TextPart[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = pattern.exec(text)) !== null) {
          if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
          }
          parts.push({ highlight: true, text: match[0] });
          lastIndex = match.index + match[0].length;
        }
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

  // Default rendering for non-string children or no (matching) highlighting
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
      {textForRenderingAndHighlighting}
    </Element>
  );
};

export default TitleView;
