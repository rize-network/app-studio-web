import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Element, Text, Animation } from 'app-studio';

interface SlideEffectProps {
  text: string;
  duration?: number;
  direction?: 'up' | 'down';
  stagger?: number;
  sequential?: boolean;
  textStyle?: React.CSSProperties;
  as?: React.ElementType;
  wordProps?: any;
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
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [phase, setPhase] = useState<AnimPhase>('entering');
  const [animKey, setAnimKey] = useState(0);

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
  const words = useMemo(() => displayedText.split(' '), [displayedText]);
  const wordCount = words.length;

  const totalEnterDuration = useMemo(() => {
    if (sequential) {
      return wordCount * (duration + stagger);
    }
    return (wordCount - 1) * stagger + duration;
  }, [wordCount, duration, stagger, sequential]);

  const totalExitDuration = useMemo(() => {
    if (sequential) {
      return wordCount * (duration + stagger);
    }
    return (wordCount - 1) * stagger + duration;
  }, [wordCount, duration, stagger, sequential]);

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
      overflow: 'hidden',
      verticalAlign: 'bottom',
      whiteSpace: 'nowrap',
      ...textStyle,
    }),
    [textStyle]
  );

  // Word row container style
  const wordRowStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'inline-flex',
      flexWrap: 'nowrap',
      whiteSpace: 'nowrap',
    }),
    []
  );

  const isAnimating = phase === 'entering' || phase === 'exiting';

  return (
    <Element as="span" style={containerStyle} {...props}>
      <span style={wordRowStyle}>
        {words.map((word, index) => {
          const delay = getDelay(index);
          const isLast = index === words.length - 1;

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
                  fillMode: 'both' 
                })
              : Animation.slideInDown({ 
                  duration: durationStr, 
                  delay: delayStr, 
                  timingFunction: 'ease-out', 
                  fillMode: 'both' 
                });
          } else if (phase === 'exiting') {
            // Custom animation objects for exiting (slideOut not in app-studio yet)
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
            marginRight: isLast ? 0 : '0.25em',
            transform: phase === 'visible' ? 'translateY(0)' : undefined,
            opacity: phase === 'visible' ? 1 : undefined,
          };

          return (
            <Text
              key={`${animKey}-${index}`}
              as="span"
              animate={wordAnimation}
              {...restWordProps}
              style={wordStyle}
            >
              {word}
            </Text>
          );
        })}
      </span>
    </Element>
  );
};

export default SlideEffect;
