import React from 'react';
import { Element, Text, useInView, useTheme } from 'app-studio';
import { TitleProps } from './Title.props';
import { useTitleState } from './Title.state';
import { HighlightStyles, LineHeights, TitleSizes } from './Title.style';
import TypewriterEffect from './TypewriterEffect';

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\\]\\/g, '\\$&');
}

const TitleView: React.FC<TitleProps> = ({
  children,
  highlightText,
  highlightStyle = 'background',
  highlightColor = 'theme.primary',
  highlightSecondaryColor,
  size = 'xl',
  centered = false,
  views,
  highlightAnimate,
  animate,
  highlightTypewriter: propHighlightTypewriter = false,
  highlightTypewriterDuration = 3000,
  ...props
}) => {
  const { ref, inView } = useInView();
  const { getColor, themeMode: ctxMode } = useTheme();
  const themeMode = props.themeMode || ctxMode;

  // Resolve colors, handling both theme colors and direct hex values
  const resolveColorValue = (colorValue: string) => {
    // If it's already a hex color, return it directly
    if (colorValue.startsWith('#')) {
      return colorValue;
    }
    // Otherwise, use the theme's getColor function
    return getColor(colorValue, { themeMode });
  };

  const resolvedColor = resolveColorValue(highlightColor);
  const resolvedSecondary = highlightSecondaryColor
    ? resolveColorValue(highlightSecondaryColor)
    : undefined;

  const { finalDisplayedText, activeHighlightTarget, highlightTypewriter } =
    useTitleState({
      children,
      highlightText,
      _isInView: inView,
      highlightTypewriter: propHighlightTypewriter,
      highlightTypewriterDuration,
      ...props,
    });

  const fontSize = TitleSizes[size];
  const lineHeight = LineHeights[size];

  // Get the text to display
  const text =
    typeof finalDisplayedText === 'string'
      ? finalDisplayedText
      : typeof children === 'string'
      ? children
      : '';

  if (typeof text === 'string' && activeHighlightTarget) {
    const pattern = new RegExp(
      `(${escapeRegExp(
        Array.isArray(activeHighlightTarget)
          ? activeHighlightTarget.join('|')
          : activeHighlightTarget
      )})`,
      'gi'
    );

    const parts: Array<string | { highlight: boolean; text: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text))) {
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
        animate={inView ? animate : undefined}
        {...views?.container}
        {...props}
      >
        {parts.map((part, idx) =>
          typeof part === 'string' ? (
            part
          ) : (
            <Text
              key={`${part.text}-${idx}`}
              as="span"
              display="inline"
              animate={inView ? highlightAnimate : undefined}
              {...HighlightStyles[highlightStyle](
                resolvedColor,
                resolvedSecondary
              )}
              {...views?.highlight}
            >
              {highlightTypewriter ? (
                <TypewriterEffect
                  text={part.text}
                  typingSpeed={Math.max(
                    30,
                    highlightTypewriterDuration / (part.text.length * 10)
                  )}
                  showCursor={true}
                  cursorColor="currentColor"
                />
              ) : (
                part.text
              )}
            </Text>
          )
        )}
      </Element>
    );
  }

  // If highlightStyle is provided but no highlightText, apply the style to the entire title
  if (highlightStyle && !activeHighlightTarget) {
    return (
      <Element
        ref={ref}
        as="h1"
        fontSize={fontSize}
        lineHeight={`${lineHeight}px`}
        fontWeight="bold"
        textAlign={centered ? 'center' : 'left'}
        animate={inView ? animate : undefined}
        {...views?.container}
        {...props}
      >
        <Text
          as="span"
          display="inline"
          animate={inView ? highlightAnimate : undefined}
          {...HighlightStyles[highlightStyle](resolvedColor, resolvedSecondary)}
          {...views?.highlight}
        >
          {highlightTypewriter ? (
            <TypewriterEffect
              text={text}
              typingSpeed={Math.max(
                30,
                highlightTypewriterDuration / (text.length * 10)
              )}
              showCursor={true}
              cursorColor="currentColor"
            />
          ) : (
            text
          )}
        </Text>
      </Element>
    );
  }

  // Default case - no highlighting
  return (
    <Element
      ref={ref}
      as="h1"
      fontSize={fontSize}
      lineHeight={`${lineHeight}px`}
      fontWeight="bold"
      textAlign={centered ? 'center' : 'left'}
      animate={inView ? animate : undefined}
      {...views?.container}
      {...props}
    >
      {text}
    </Element>
  );
};

export default TitleView;
