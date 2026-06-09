/**
 * TitleView (React Native) — full parity port of the web TitleView.
 *
 *   - Restored: highlightText regex split into segments, animate /
 *     highlightAnimate pass-through (now actually animated by Reanimated),
 *     TypewriterEffect and SlideEffect (their .native.tsx siblings render the
 *     RN-friendly versions), useTitleState (shared, already portable),
 *     useInView (stub returns inView:true, so animations fire on mount).
 *
 *   - Adapted for native: `<br/>` → `\n` (RN Text honours newlines); `as=…`
 *     is stripped; CSS letter-spacing strings are dropped; HighlightStyles
 *     web-only entries (e.g. text-decoration shorthands) are filtered by
 *     app-studio's splitNativeProps.
 */

import React from 'react';
import {
  Element,
  useInView,
  Text as DefaultText,
  AnimationProps,
} from 'app-studio';
import { TitleProps } from './Title.props';
import { useTitleState } from './Title.state';
import {
  HighlightStyles,
  ResponsiveTypography,
  TitleSizes,
} from './Title.style';
import TypewriterEffect from './TypewriterEffect';
import SlideEffect from './SlideEffect';

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// On RN we map the `|` line-break marker to `\n` so RN's Text renders it.
const renderWithLineBreaks = (text: string): string => {
  if (!text || typeof text !== 'string') return text;
  return text.replace(/\|/g, '\n');
};

const TitleView: React.FC<TitleProps> = ({
  children,
  highlightText,
  highlightStyle = 'solid',
  highlightColor = 'theme-primary',
  highlightSecondaryColor,
  size = 'lg',
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
  themeMode: _elementMode,
  responsive: _responsive,
  alternateHighlightText: _alternateHighlightText,
  alternateAnimation: _alternateAnimation,
  alternateDuration: _alternateDuration,
  _isInView,
  ...props
}) => {
  const { ref, inView } = useInView();
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
    alternateHighlightText: _alternateHighlightText,
    alternateAnimation: _alternateAnimation,
    alternateDuration: _alternateDuration,
    ...props,
  });

  const fontSize = TitleSizes[size];
  const baseTextStyles = {
    fontWeight: (size === 'xl' ? 700 : 600) as any,
  };
  const highlightProps = HighlightStyles[highlightStyle](
    highlightColor,
    highlightSecondaryColor
  );

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

  const text =
    typeof finalDisplayedText === 'string'
      ? finalDisplayedText
      : typeof children === 'string'
      ? children
      : '';

  const containerProps = {
    ref,
    animate: inView ? controlledAnimate : undefined,
    fontSize,
    ...(_responsive ? ResponsiveTypography[size] : {}),
    ...baseTextStyles,
  };

  const renderHighlightedContent = (content: string): React.ReactNode => {
    if (!inView && (highlightTypewriter || highlightSlide)) {
      return <DefaultText opacity={0}>{content}</DefaultText>;
    }
    if (highlightTypewriter) {
      return (
        <TypewriterEffect
          text={content}
          typingSpeed={Math.max(
            30,
            highlightTypewriterDuration / (content.length * 10)
          )}
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
          wordProps={highlightProps}
        />
      );
    }
    return renderWithLineBreaks(content);
  };

  // --- Branch 1: there's an active highlight target → split the text ---
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
      <Element
        flexDirection="row"
        flexWrap="wrap"
        alignItems="baseline"
        {...containerProps}
        {...views?.container}
        {...(props as any)}
      >
        {parts.map((part, idx) =>
          typeof part === 'string' ? (
            <DefaultText
              key={`text-${idx}`}
              fontSize={fontSize}
              {...baseTextStyles}
              {...views?.text}
            >
              {renderWithLineBreaks(part)}
            </DefaultText>
          ) : (
            <DefaultText
              key={`highlight-${idx}`}
              fontSize={fontSize}
              animate={inView ? controlledHighlightAnimate : undefined}
              {...baseTextStyles}
              {...(!highlightSlide ? highlightProps : {})}
              {...views?.highlight}
            >
              {renderHighlightedContent(part.text)}
            </DefaultText>
          )
        )}
      </Element>
    );
  }

  // --- Branch 2: no target but a highlight style → wrap whole text ---
  if (highlightStyle && !activeHighlightTarget) {
    return (
      <Element {...containerProps} {...(props as any)} {...views?.container}>
        <DefaultText
          fontSize={fontSize}
          animate={inView ? controlledHighlightAnimate : undefined}
          {...baseTextStyles}
          {...(!highlightSlide ? highlightProps : {})}
          {...views?.highlight}
        >
          {renderHighlightedContent(text)}
        </DefaultText>
      </Element>
    );
  }

  // --- Branch 3: plain title ---
  return (
    <DefaultText
      {...containerProps}
      {...(props as any)}
      {...views?.container}
      {...views?.text}
    >
      {renderWithLineBreaks(text)}
    </DefaultText>
  );
};

export default TitleView;
