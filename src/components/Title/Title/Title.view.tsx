import React from 'react';
import { Element, useInView, Text, useTheme } from 'app-studio';
import { AnimationProps } from 'app-studio/dist/utils/constants';
import { TitleProps } from './Title.props';
import { useTitleState } from './Title.state';
import {
  HighlightStyles,
  TitleSizes,
  ResponsiveTypography,
} from './Title.style';
import TypewriterEffect from './TypewriterEffect';
import SlideEffect from './SlideEffect';

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const TitleView: React.FC<TitleProps> = ({
  children,
  highlightText,
  highlightStyle = 'background',
  highlightColor = 'theme.primary',
  highlightSecondaryColor,
  size = 'lg',
  responsive = true,
  views,
  highlightAnimate,
  animate,
  animationLoop = 1,
  highlightAnimationLoop = 1,
  highlightTypewriter: propHighlightTypewriter = false,
  highlightTypewriterDuration = 3000,
  highlightSlide: propHighlightSlide = false,
  highlightSlideDuration = 500,
  highlightSlideStagger = 50,
  highlightSlideSequential = true,
  themeMode: elementMode,
  ...props
}) => {
  const { ref, inView } = useInView();
  const { getColor, themeMode, theme } = useTheme();

  const currentThemeMode = elementMode || themeMode;

  let resolvedHighlightColor = getColor(highlightColor, {
    themeMode: currentThemeMode,
  });

  // Fallback: If getColor returns the token itself (resolution failed), try manual lookup in theme object
  if (
    resolvedHighlightColor === highlightColor &&
    highlightColor.startsWith('theme.') &&
    theme
  ) {
    const tokenPath = highlightColor.replace('theme.', '');
    const value = tokenPath
      .split('.')
      .reduce((acc: any, part) => acc && acc[part], theme);
    if (typeof value === 'string') {
      resolvedHighlightColor = value;
    }
  }

  let resolvedHighlightSecondaryColor = highlightSecondaryColor
    ? getColor(highlightSecondaryColor, { themeMode: currentThemeMode })
    : undefined;

  // Fallback for secondary color
  if (
    highlightSecondaryColor &&
    resolvedHighlightSecondaryColor === highlightSecondaryColor &&
    highlightSecondaryColor.startsWith('theme.') &&
    theme
  ) {
    const tokenPath = highlightSecondaryColor.replace('theme.', '');
    const value = tokenPath
      .split('.')
      .reduce((acc: any, part) => acc && acc[part], theme);
    if (typeof value === 'string') {
      resolvedHighlightSecondaryColor = value;
    }
  }

  const {
    finalDisplayedText,
    activeHighlightTarget,
    highlightTypewriter,
    highlightSlide,
    highlightSlideDuration: stateHighlightSlideDuration,
    highlightSlideStagger: stateHighlightSlideStagger,
    highlightSlideSequential: stateHighlightSlideSequential,
  } = useTitleState({
    children,
    highlightText,
    _isInView: inView,
    highlightTypewriter: propHighlightTypewriter,
    highlightTypewriterDuration,
    highlightSlide: propHighlightSlide,
    highlightSlideDuration,
    highlightSlideStagger,
    highlightSlideSequential,
    ...props,
  });

  // Common style calculations
  const useResponsive = responsive && !props.media;
  const fontSize = TitleSizes[size];
  const responsiveStyles = useResponsive ? ResponsiveTypography[size] : null;

  // Highlight style props
  const highlightProps = HighlightStyles[highlightStyle](
    resolvedHighlightColor,
    resolvedHighlightSecondaryColor
  );

  // Apply loop control to animations
  const applyAnimationLoop = (
    animation: AnimationProps | AnimationProps[] | undefined,
    loopControl: number | 'infinite'
  ): AnimationProps | AnimationProps[] | undefined => {
    if (!animation) return animation;
    if (Array.isArray(animation)) {
      return animation.map((anim) => ({
        ...anim,
        iterationCount: loopControl.toString(),
      }));
    }
    return { ...animation, iterationCount: loopControl.toString() };
  };

  const controlledAnimate = applyAnimationLoop(animate, animationLoop);
  const controlledHighlightAnimate = applyAnimationLoop(
    highlightAnimate,
    highlightAnimationLoop
  );

  // Get the text to display
  const text =
    typeof finalDisplayedText === 'string'
      ? finalDisplayedText
      : typeof children === 'string'
      ? children
      : '';

  // Common container props
  const containerProps = {
    ref,
    as: 'h1' as const,
    fontSize: useResponsive ? undefined : fontSize,
    fontWeight: useResponsive ? responsiveStyles?.fontWeight : 'bold',
    letterSpacing: useResponsive ? responsiveStyles?.letterSpacing : undefined,
    marginBottom: useResponsive ? responsiveStyles?.marginBottom : undefined,
    animate: inView ? controlledAnimate : undefined,
    media: useResponsive ? responsiveStyles?.media : undefined,
  };

  // Render highlighted text content (typewriter, slide, or plain)
  const renderHighlightedContent = (content: string) => {
    // If animations are enabled but not in view, render invisible placeholder
    // This holds layout space and prevents animations (like typewriter) from running off-screen
    if (!inView && (highlightTypewriter || highlightSlide)) {
      return <span style={{ opacity: 0 }}>{content}</span>;
    }

    if (highlightTypewriter) {
      return (
        <TypewriterEffect
          text={content}
          typingSpeed={Math.max(
            30,
            highlightTypewriterDuration / (content.length * 10)
          )}
          showCursor={true}
          cursorColor="currentColor"
          {...highlightProps}
        />
      );
    }
    if (highlightSlide) {
      return (
        <SlideEffect
          text={content}
          duration={stateHighlightSlideDuration}
          stagger={stateHighlightSlideStagger}
          sequential={stateHighlightSlideSequential}
          direction="up"
          fontSize={useResponsive ? undefined : fontSize}
          fontWeight={useResponsive ? responsiveStyles?.fontWeight : 'bold'}
          wordProps={highlightProps}
        />
      );
    }
    return content;
  };

  // Case 1: Has highlight target - render with highlighted parts
  if (typeof text === 'string' && activeHighlightTarget) {
    const pattern = Array.isArray(activeHighlightTarget)
      ? new RegExp(
          `(${activeHighlightTarget
            .map((t) => escapeRegExp(String(t)))
            .join('|')})`,
          'gi'
        )
      : new RegExp(`(${escapeRegExp(String(activeHighlightTarget))})`, 'gi');

    const parts: Array<string | { highlight: boolean; text: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text))) {
      if (match.index > lastIndex)
        parts.push(text.substring(lastIndex, match.index));
      parts.push({ highlight: true, text: match[0] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) parts.push(text.substring(lastIndex));

    return (
      <Element {...containerProps} {...views?.container} {...props}>
        {parts.map((part, idx) =>
          typeof part === 'string' ? (
            part
          ) : (
            <Text
              key={`highlight-${idx}`}
              as="span"
              display="inline"
              animate={inView ? controlledHighlightAnimate : undefined}
              fontSize={useResponsive ? undefined : fontSize}
              {...(!highlightSlide ? highlightProps : {})}
              {...views?.highlight}
            >
              {renderHighlightedContent(part.text)}
            </Text>
          )
        )}
      </Element>
    );
  }

  // Case 2: Has highlight style but no highlight target - apply style to entire title
  if (highlightStyle && !activeHighlightTarget) {
    return (
      <Element {...containerProps} {...views?.container} {...props}>
        <Text
          as="span"
          fontSize={fontSize}
          display="inline"
          animate={inView ? controlledHighlightAnimate : undefined}
          {...(!highlightSlide ? highlightProps : {})}
          {...views?.highlight}
        >
          {renderHighlightedContent(text)}
        </Text>
      </Element>
    );
  }

  // Case 3: Default - no highlighting
  return (
    <Text {...containerProps} {...views?.container} {...props}>
      {text}
    </Text>
  );
};

export default TitleView;
