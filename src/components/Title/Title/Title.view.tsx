import React from 'react';
import { Element, useInView, Text as DefaultText } from 'app-studio';
import { AnimationProps } from 'app-studio/dist/utils/constants';
import { TitleProps } from './Title.props';
import { useTitleState } from './Title.state';
import {
  HighlightStyles,
  ResponsiveTypography,
  TitleSizes,
} from './Title.style';
import TypewriterEffect from './TypewriterEffect';
import SlideEffect from './SlideEffect';
// Defines a utility function to escape special characters in a string, ensuring it can be safely used within a regular expression without unintended behavior.
function escapeRegExp(string: string): string {
  // Replaces all special regex characters (e.g., '.', '*', '+', '?') with their escaped versions using a global regular expression.
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// A utility function that processes a string to replace '|' characters with HTML `<br />` tags, effectively creating line breaks in the rendered text.
const renderWithLineBreaks = (text: string) => {
  // Checks if the input `text` is undefined, null, or not a string; if so, it returns the input as-is to prevent errors.
  if (!text || typeof text !== 'string') return text;
  // Splits the input `text` into an array of substrings wherever a '|' character is encountered.
  const parts = text.split('|');
  // If the `text` does not contain any '|' characters (resulting in a single part), it returns the original text directly.
  if (parts.length === 1) return text;
  // Maps over the array of text `parts`, rendering each part and inserting a `<br />` element between them, unless it's the last part.
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < parts.length - 1 && <br />}
    </React.Fragment>
  ));
};
// Defines the main `TitleView` functional component, responsible for rendering the title with various styling, highlighting, and animation capabilities based on its `TitleProps`.
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
  // Initializes `useInView` hook to detect whether the `Element` component is currently visible in the viewport, providing a `ref` for observation and an `inView` boolean state.
  const { ref, inView } = useInView();
  // Destructures various state variables from the `useTitleState` hook, managing the dynamic text, active highlight targets, and animation flags (typewriter, slide effects) based on props and internal logic.
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
  // Determines the appropriate font size for the title by mapping the `size` prop (e.g., 'lg', 'xl') to predefined values from `TitleSizes`.
  const fontSize = TitleSizes[size];
  // Defines a constant object `baseTextStyles` containing foundational CSS properties like `fontFamily`, `fontWeight`, and `letterSpacing` to be applied to the title text.
  const baseTextStyles = {
    fontFamily: 'Mulish, Inter, Geist, system-ui, sans-serif',
    fontWeight: size === 'xl' ? 700 : 600,
    letterSpacing: size === 'xl' ? '-1.5px' : '-0.01em',
  };
  // Generates dynamic styling properties for highlighted text by invoking a function from `HighlightStyles` based on the specified `highlightStyle`, `highlightColor`, and `highlightSecondaryColor`.
  const highlightProps = HighlightStyles[highlightStyle](
    highlightColor,
    highlightSecondaryColor
  );
  // A helper function designed to modify animation properties by setting the `iterationCount` based on a provided loop control value ('infinite' or a number).
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
    // Returns a new animation object with the `iterationCount` property set to the `loopControl` value, converting it to a string as required.
    return { ...animation, iterationCount: loopControl.toString() };
  };
  // Applies the `animationLoop` value to the main `animate` prop using `applyAnimationLoop` to control how many times the primary text animation repeats.
  const controlledAnimate = applyAnimationLoop(animate, animationLoop);
  // Applies the `highlightAnimationLoop` value to the `highlightAnimate` prop using `applyAnimationLoop`, controlling the repetition count for highlight-specific animations.
  const controlledHighlightAnimate = applyAnimationLoop(
    highlightAnimate,
    highlightAnimationLoop
  );
  // Determines the final `text` string to be displayed, prioritizing `finalDisplayedText` from state, then the `children` prop, defaulting to an empty string if neither is available.
  const text =
    typeof finalDisplayedText === 'string'
      ? finalDisplayedText
      : typeof children === 'string'
      ? children
      : '';
  // Aggregates all properties for the main container `Element`, including the `ref` for `useInView`, animation controls, semantic HTML tag (`as`), font sizing, responsive typography, and base text styles.
  const containerProps = {
    ref,
    animate: inView ? controlledAnimate : undefined,
    as: 'h1' as const,
    fontSize,
    ...(_responsive ? ResponsiveTypography[size] : {}),
    ...baseTextStyles,
  };
  // A function that conditionally renders the content with a specific highlight effect (Typewriter or Slide) if active, or falls back to regular rendering with line breaks.
  const renderHighlightedContent = (content: string) => {
    // If the component is not in view and either typewriter or slide animation is enabled for highlight, it renders the content with zero opacity to prevent premature animation visibility.
    if (!inView && (highlightTypewriter || highlightSlide)) {
      return <span style={{ opacity: 0 }}>{content}</span>;
    }
    // Renders the content using the `TypewriterEffect` component, passing the text, calculated typing speed, cursor color, and highlight-specific props.
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
    // Renders the content using the `SlideEffect` component, configured with text, duration, stagger, sequential behavior, animation direction, font size, and highlight-specific word properties.
    if (highlightSlide) {
      return (
        <SlideEffect
          text={content}
          duration={stateHighlightSlideDuration}
          stagger={stateHighlightSlideStagger}
          sequential={stateHighlightSlideSequential}
          direction="up"
          fontSize={fontSize}
          wordProps={highlightProps}
        />
      );
    }
    // If no specific highlight animation (typewriter or slide) is active, it renders the content using the `renderWithLineBreaks` utility.
    return renderWithLineBreaks(content);
  };
  // This block handles the rendering logic when a specific `activeHighlightTarget` is present, splitting the main text to highlight only the matching portions.
  if (typeof text === 'string' && activeHighlightTarget) {
    // Constructs a regular expression `pattern` to find the `activeHighlightTarget` within the text, safely escaping special characters and handling both single and array-based targets.
    const pattern = Array.isArray(activeHighlightTarget)
      ? new RegExp(
          `(${activeHighlightTarget
            .map((t) => escapeRegExp(String(t)))
            .join('|')})`,
          'gi'
        )
      : new RegExp(`(${escapeRegExp(String(activeHighlightTarget))})`, 'gi');
    // Initializes an array `parts` that will store segmented portions of the text, some marked for highlighting and others as plain text.
    const parts: Array<string | { highlight: boolean; text: string }> = [];
    // Keeps track of the index in the original text where the last processed segment ended, ensuring correct text partitioning.
    let lastIndex = 0;
    // Declares a variable `match` to store the result of each regular expression execution, which will be `null` if no match is found.
    let match: RegExpExecArray | null;
    // Iterates through the `text` using the defined `pattern` to find all occurrences of the `activeHighlightTarget`.
    while ((match = pattern.exec(text))) {
      // If there's unhighlighted text between the `lastIndex` and the current match's starting `index`, that segment is added to the `parts` array.
      if (match.index > lastIndex)
        parts.push(text.substring(lastIndex, match.index));
      // Adds the currently matched text (the highlight target) to the `parts` array, explicitly marking it for highlighting.
      parts.push({ highlight: true, text: match[0] });
      // Updates `lastIndex` to the end of the current match, preparing for the next iteration of text parsing.
      lastIndex = match.index + match[0].length;
    }
    // After the loop, if any text remains after the last match, it is added as a final plain text segment to the `parts` array.
    if (lastIndex < text.length) parts.push(text.substring(lastIndex));
    return (
      <Element {...containerProps} {...views?.container} {...props}>
        {parts.map((part, idx) =>
          typeof part === 'string' ? (
            <DefaultText
              key={`text-${idx}`}
              as="span"
              display="inline"
              {...views?.text}
            >
              {renderWithLineBreaks(part)}
            </DefaultText>
          ) : (
            <DefaultText
              key={`highlight-${idx}`}
              as="span"
              display="inline"
              animate={inView ? controlledHighlightAnimate : undefined}
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
  if (highlightStyle && !activeHighlightTarget) {
    return (
      <Element {...containerProps} {...props} {...views?.container}>
        <DefaultText
          as="span"
          display="inline"
          animate={inView ? controlledHighlightAnimate : undefined}
          {...(!highlightSlide ? highlightProps : {})}
          {...views?.highlight}
        >
          {renderHighlightedContent(text)}
        </DefaultText>
      </Element>
    );
  }
  return (
    <DefaultText
      {...containerProps}
      {...props}
      {...views?.container}
      {...views?.text}
    >
      {renderWithLineBreaks(text)}
    </DefaultText>
  );
};
export default TitleView;
