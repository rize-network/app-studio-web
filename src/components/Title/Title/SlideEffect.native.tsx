/**
 * SlideEffect (React Native) — port of the web word-by-word slide effect.
 *   - Lines are laid out as a Vertical stack; words inside a line are a
 *     Horizontal with flexWrap. (Web uses inline-block + inline-flex which
 *     don't exist on RN.)
 *   - Each word is an animated <View/> with `animate={Animation.slideInUp/
 *     Down(...)}` — Reanimated takes care of timing/stagger via the per-word
 *     `delay`. The same state machine as web drives `entering`/`exiting`
 *     phases.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Element, Text as DefaultText, Animation } from 'app-studio';

interface SlideEffectProps {
  text: string;
  duration?: number;
  direction?: 'up' | 'down';
  stagger?: number;
  sequential?: boolean;
  textStyle?: any;
  as?: any;
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (text === displayedText && phase === 'visible') return;
    if (text !== displayedText) {
      if (phase === 'entering' || phase === 'visible') {
        pendingTextRef.current = text;
        setPhase('exiting');
      } else if (phase === 'exiting') {
        pendingTextRef.current = text;
      }
    }
  }, [text, displayedText, phase]);

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

  const totalDuration = useMemo(() => {
    if (sequential) return totalWordCount * (duration + stagger);
    return (Math.max(1, totalWordCount) - 1) * stagger + duration;
  }, [totalWordCount, duration, stagger, sequential]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (phase === 'entering') {
      timeoutRef.current = setTimeout(() => {
        setPhase('visible');
      }, totalDuration + 50);
    } else if (phase === 'exiting') {
      timeoutRef.current = setTimeout(() => {
        if (pendingTextRef.current !== null) {
          setDisplayedText(pendingTextRef.current);
          pendingTextRef.current = null;
        }
        setAnimKey((k) => k + 1);
        setPhase('entering');
      }, totalDuration + 50);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase, totalDuration]);

  const { style: customWordStyle, ...restWordProps } = wordProps || {};
  const isUp = direction === 'up';

  const getDelay = (index: number) =>
    sequential ? index * (duration + stagger) : index * stagger;

  let globalWordIndex = 0;

  return (
    <Element {...props}>
      {lines.map((lineWords, lineIndex) => (
        <Element
          key={`line-${lineIndex}`}
          flexDirection="row"
          flexWrap="wrap"
          alignItems="flex-end"
          justifyContent="center"
        >
          {lineWords.map((word, wordIndex) => {
            const currentGlobalIndex = globalWordIndex++;
            const delay = getDelay(currentGlobalIndex);
            const isLastInLine = wordIndex === lineWords.length - 1;
            const durationStr = `${duration}ms`;
            const delayStr = `${delay}ms`;

            let wordAnimation: any;
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

            return (
              <Element
                key={`${animKey}-${lineIndex}-${wordIndex}`}
                animate={wordAnimation}
                marginRight={isLastInLine ? 0 : 6}
              >
                <TextComponent {...restWordProps} {...customWordStyle}>
                  {word}
                </TextComponent>
              </Element>
            );
          })}
        </Element>
      ))}
    </Element>
  );
};

export default SlideEffect;
