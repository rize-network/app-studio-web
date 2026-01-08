import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Element, Text as DefaultText, Animation } from 'app-studio';

interface SlideEffectProps {
  text: string;
  duration?: number;
  direction?: 'up' | 'down';
  stagger?: number;
  sequential?: boolean;
  textStyle?: React.CSSProperties;
  as?: React.ElementType;
  wordProps?: any;
  backgroundColor?: string;
  textComponent?: any;
  [key: string]: any;
}

type AnimPhase = 'entering' | 'visible' | 'exiting';

export const SlideEffect: React.FC<SlideEffectProps> = ({
  text,
  duration = 500,
  direction = 'up',
  stagger = 50,
  sequential = false,
  textStyle,
  as: _as,
  wordProps,
  textComponent,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [phase, setPhase] = useState<AnimPhase>('entering');
  const [animKey, setAnimKey] = useState(0);

  const TextComponent = textComponent || DefaultText;

  const pendingTextRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle text changes
  useEffect(() => {
    if (text === displayedText && phase === 'visible') {
      return;
    }

    if (text !== displayedText) {
      // New text arrived
      if (phase === 'entering' || phase === 'visible') {
        // Store the new text and start exit animation
        pendingTextRef.current = text;
        setPhase('exiting');
      } else if (phase === 'exiting') {
        // Already exiting, just update pending text
        pendingTextRef.current = text;
      }
    }
  }, [text, displayedText, phase]);

  // Calculate animation durations
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

  const totalEnterDuration = useMemo(() => {
    if (sequential) {
      return totalWordCount * (duration + stagger);
    }
    return (totalWordCount - 1) * stagger + duration;
  }, [totalWordCount, duration, stagger, sequential]);

  const totalExitDuration = useMemo(() => {
    if (sequential) {
      return totalWordCount * (duration + stagger);
    }
    return (totalWordCount - 1) * stagger + duration;
  }, [totalWordCount, duration, stagger, sequential]);

  // Handle phase transitions
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (phase === 'entering') {
      // After enter animation completes, go to visible
      timeoutRef.current = setTimeout(() => {
        setPhase('visible');
      }, totalEnterDuration + 50);
    } else if (phase === 'exiting') {
      // After exit animation completes, swap text and enter again
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

  // Memoize word props extraction
  const { style: customWordStyle, ...restWordProps } = wordProps || {};

  // Get animation functions based on direction
  const isUp = direction === 'up';

  // Calculate delay for each word
  const getDelay = (index: number) => {
    if (sequential) {
      // Sequential: one word at a time
      return index * (duration + stagger);
    }
    // Parallel with stagger
    return index * stagger;
  };

  // Container styles
  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'inline-block',
      position: 'relative',
      verticalAlign: 'bottom',
      whiteSpace: 'nowrap',
      lineHeight: 'normal',
      ...textStyle,
    }),
    [textStyle]
  );

  const linesContainerStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center', // Center lines relative to each other if they have different widths
    }),
    []
  );

  const lineStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'block',
      whiteSpace: 'nowrap',
    }),
    []
  );

  const isAnimating = phase === 'entering' || phase === 'exiting';
  let globalWordIndex = 0;

  return (
    <Element as="span" style={containerStyle} {...props}>
      <span style={linesContainerStyle}>
        {lines.map((lineWords, lineIndex) => (
          <span key={`line-${lineIndex}`} style={lineStyle}>
            {lineWords.map((word, wordIndex) => {
              const currentGlobalIndex = globalWordIndex++;
              const delay = getDelay(currentGlobalIndex);
              const isLastInLine = wordIndex === lineWords.length - 1;

              // Create animation based on phase and direction
              let wordAnimation;
              const durationStr = `${duration}ms`;
              const delayStr = `${delay}ms`;

              if (phase === 'entering') {
                // Use app-studio animations for entering
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
                // Custom animation objects for exiting
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
