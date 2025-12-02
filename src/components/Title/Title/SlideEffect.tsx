import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Element, Text } from 'app-studio';

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

// CSS keyframes injection - done once
const KEYFRAMES_ID = 'slide-effect-keyframes';
const injectKeyframes = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_ID)) return;

  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes slideInUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideOutUp {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(-100%); opacity: 0; }
    }
    @keyframes slideInDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideOutDown {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
};

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

  // Inject keyframes once on mount
  useEffect(() => {
    injectKeyframes();
  }, []);

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

  // Get animation names based on direction
  const isUp = direction === 'up';
  const enterAnim = isUp ? 'slideInUp' : 'slideInDown';
  const exitAnim = isUp ? 'slideOutUp' : 'slideOutDown';

  // Calculate delay for each word
  const getDelay = (index: number, isExit: boolean) => {
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

  // Determine current animation
  const currentAnim = phase === 'exiting' ? exitAnim : enterAnim;
  const isAnimating = phase === 'entering' || phase === 'exiting';

  return (
    <Element as="span" style={containerStyle} {...props}>
      <span style={wordRowStyle}>
        {words.map((word, index) => {
          const delay = getDelay(index, phase === 'exiting');
          const isLast = index === words.length - 1;

          const wordStyle: React.CSSProperties = {
            ...customWordStyle,
            display: 'inline-block',
            marginRight: isLast ? 0 : '0.25em',
            willChange: isAnimating ? 'transform, opacity' : 'auto',
            animation: isAnimating
              ? `${currentAnim} ${duration}ms ease-out ${delay}ms both`
              : 'none',
            transform: phase === 'visible' ? 'translateY(0)' : undefined,
            opacity: phase === 'visible' ? 1 : undefined,
          };

          return (
            <Text
              key={`${animKey}-${index}`}
              as="span"
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
