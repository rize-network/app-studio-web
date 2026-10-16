import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Element, Text as DefaultText, Animation } from 'app-studio';
// Defines the properties accepted by the SlideEffect component.
interface SlideEffectProps {
  // The text content to be displayed and animated. This is a required prop.
  text: string;
  // The duration of the slide animation for each word in milliseconds. Optional, defaults to 500ms.
  duration?: number;
  // The direction of the slide animation, either 'up' or 'down'. Optional, defaults to 'up'.
  direction?: 'up' | 'down';
  // The delay between each word's animation start, creating a staggered effect. Optional, defaults to 50ms.
  stagger?: number;
  // Determines if words animate sequentially (one after another) or in parallel with staggered delays. Optional, defaults to false.
  sequential?: boolean;
  // Custom CSS properties to apply to the overall text container. Optional.
  textStyle?: React.CSSProperties;
  // The HTML element type to use for the main container. Optional, defaults to 'span' implicitly by Element component.
  as?: React.ElementType;
  // Additional props to pass to each individual word component. Optional.
  wordProps?: any;
  // A background color property for the text container. Optional.
  backgroundColor?: string;
  // An optional custom React component to render each word, defaulting to `DefaultText`.
  textComponent?: any;
  // Allows for any additional, unspecified properties to be passed down to the root element.
  [key: string]: any;
}
// Defines the possible animation phases: 'entering' (starting animation), 'visible' (animation complete), or 'exiting' (animation out).
type AnimPhase = 'entering' | 'visible' | 'exiting';
// The main SlideEffect functional component, designed to animate text words sliding in and out.
export const SlideEffect: React.FC<SlideEffectProps> = ({
  // The text content to be animated.
  text,
  // The duration of each word's animation, defaulting to 500ms.
  duration = 500,
  // The animation direction, defaulting to 'up'.
  direction = 'up',
  // The stagger delay between words, defaulting to 50ms.
  stagger = 50,
  // Boolean indicating sequential animation, defaulting to false.
  sequential = false,
  // Custom styles for the text container.
  textStyle,
  as: _as,
  // Additional props to apply to individual words.
  wordProps,
  // The component used to render each word.
  textComponent,
  // Captures any other remaining props to pass to the root element.
  ...props
}) => {
  // Manages the text string that is currently being displayed and animated.
  const [displayedText, setDisplayedText] = useState(text);
  // Tracks the current phase of the animation ('entering', 'visible', 'exiting') to control word animations.
  const [phase, setPhase] = useState<AnimPhase>('entering');
  // A key incremented to force re-rendering of animations when text changes, ensuring re-triggering.
  const [animKey, setAnimKey] = useState(0);
  // Determines the component to render each word, using the provided `textComponent` or the `DefaultText` component.
  const TextComponent = textComponent || DefaultText;
  // Holds the new text value that needs to be displayed after the current exiting animation finishes.
  const pendingTextRef = useRef<string | null>(null);
  // Stores the reference to any active timeout, allowing it to be cleared to prevent memory leaks or incorrect state updates.
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Manages transitions between animation phases based on changes in the input `text` prop.
  useEffect(() => {
    if (text === displayedText && phase === 'visible') {
      return;
    }
    if (text !== displayedText) {
      if (phase === 'entering' || phase === 'visible') {
        pendingTextRef.current = text;
        setPhase('exiting');
      } else if (phase === 'exiting') {
        pendingTextRef.current = text;
      }
    }
  }, [text, displayedText, phase]);
  // Memoizes the processing of the input `displayedText` into an array of words, split by lines, and calculates the total word count for animation timing. Optimizes performance for unchanged text.
  const { lines, totalWordCount } = useMemo(() => {
    const rawLines = displayedText.split('|');
    const processedLines = rawLines.map((line) =>
      line
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0)
    );
    const count = processedLines.reduce((acc, line) => acc + line.length, 0);
    return { lines: processedLines, totalWordCount: count };
  }, [displayedText]);
  // Calculates the total duration required for all words to complete their 'entering' animation, accounting for stagger and sequential options. Memoized for efficiency.
  const totalEnterDuration = useMemo(() => {
    if (sequential) {
      return totalWordCount * (duration + stagger);
    }
    return (totalWordCount - 1) * stagger + duration;
  }, [totalWordCount, duration, stagger, sequential]);
  // Calculates the total duration required for all words to complete their 'exiting' animation, accounting for stagger and sequential options. Memoized for efficiency.
  const totalExitDuration = useMemo(() => {
    if (sequential) {
      return totalWordCount * (duration + stagger);
    }
    return (totalWordCount - 1) * stagger + duration;
  }, [totalWordCount, duration, stagger, sequential]);
  // Manages the progression of animation phases by setting and clearing timeouts after `totalEnterDuration` or `totalExitDuration`.
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (phase === 'entering') {
      timeoutRef.current = setTimeout(() => {
        setPhase('visible');
      }, totalEnterDuration + 50);
    } else if (phase === 'exiting') {
      timeoutRef.current = setTimeout(() => {
        if (pendingTextRef.current !== null) {
          setDisplayedText(pendingTextRef.current);
          pendingTextRef.current = null;
        }
        setAnimKey((k) => k + 1);
        setPhase('entering');
      }, totalExitDuration + 50);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [phase, totalEnterDuration, totalExitDuration]);
  // Extracts custom styles and any other properties specifically intended for individual words from the `wordProps` object.
  const { style: customWordStyle, ...restWordProps } = wordProps || {};
  // A boolean flag indicating if the animation direction is 'up' for easier conditional logic.
  const isUp = direction === 'up';
  // Calculates the animation delay for a given word based on its global index, staggering, and whether the animation is sequential.
  const getDelay = (index: number) => {
    if (sequential) {
      return index * (duration + stagger);
    }
    return index * stagger;
  };
  // Memoized style object for the main container element, combining base styles with any `textStyle` prop, ensuring efficient rendering.
  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'inline-block',
      position: 'relative',
      verticalAlign: 'bottom',
      whiteSpace: 'nowrap',
      ...textStyle,
    }),
    [textStyle]
  );
  // Memoized style object for the container holding all lines of text, configuring it for inline flex display.
  const linesContainerStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
    }),
    []
  );
  // Memoized style object for individual lines of text, ensuring they are block-level and do not wrap.
  const lineStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'block',
      whiteSpace: 'nowrap',
    }),
    []
  );
  // A boolean flag indicating whether the component is currently in an 'entering' or 'exiting' animation phase.
  const isAnimating = phase === 'entering' || phase === 'exiting';
  // A mutable index to track the global position of each word across all lines, used for calculating unique animation delays.
  let globalWordIndex = 0;
  // Renders the animated text, iterating through lines and words to apply individual slide effects.
  return (
    <Element as="span" style={containerStyle} {...props}>
      <span style={linesContainerStyle}>
        {lines.map((lineWords, lineIndex) => (
          <span key={`line-${lineIndex}`} style={lineStyle}>
            {lineWords.map((word, wordIndex) => {
              const currentGlobalIndex = globalWordIndex++;
              const delay = getDelay(currentGlobalIndex);
              const isLastInLine = wordIndex === lineWords.length - 1;
              let wordAnimation;
              const durationStr = `${duration}ms`;
              const delayStr = `${delay}ms`;
              if (phase === 'entering') {
                wordAnimation = isUp
                  ? Animation.slideInUp({
                      duration: durationStr,
                      delay: delayStr,
                      timingFunction: 'ease-out',
                      fillMode: 'both',
                    })
                  : Animation.slideInDown({
                      duration: durationStr,
                      delay: delayStr,
                      timingFunction: 'ease-out',
                      fillMode: 'both',
                    });
              } else if (phase === 'exiting') {
                wordAnimation = isUp
                  ? {
                      from: { transform: 'translateY(0)', opacity: 1 },
                      to: { transform: 'translateY(-100%)', opacity: 0 },
                      duration: durationStr,
                      delay: delayStr,
                      timingFunction: 'ease-in',
                      fillMode: 'both',
                    }
                  : {
                      from: { transform: 'translateY(0)', opacity: 1 },
                      to: { transform: 'translateY(100%)', opacity: 0 },
                      duration: durationStr,
                      delay: delayStr,
                      timingFunction: 'ease-in',
                      fillMode: 'both',
                    };
              }
              const wordStyle: React.CSSProperties = {
                ...customWordStyle,
                display: 'inline-block',
                marginRight: isLastInLine ? 0 : '0.25em',
                transform: phase === 'visible' ? 'translateY(0)' : undefined,
                opacity: phase === 'visible' ? 1 : undefined,
              };
              return (
                <TextComponent
                  key={`${animKey}-${lineIndex}-${wordIndex}`}
                  as="span"
                  animate={wordAnimation}
                  {...restWordProps}
                  {...wordStyle}
                >
                  {word}
                </TextComponent>
              );
            })}
          </span>
        ))}
      </span>
    </Element>
  );
};
export default SlideEffect;
