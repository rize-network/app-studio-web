/**
 * TypewriterEffect (React Native) — port of the web TypewriterEffect.
 *   - Same state machine (line / charIndex stepping).
 *   - `<br/>` replaced by `\n` so RN's <Text/> wraps lines.
 *   - Cursor blink uses `Animation.flash()` via the `animate` prop, which is
 *     now interpreted by Reanimated on native.
 */

import React, { useEffect, useState } from 'react';
import { Text as DefaultText, Animation } from 'app-studio';

interface TypewriterEffectProps {
  text: string | string[];
  typingSpeed?: number;
  pauseTime?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorColor?: string;
  textStyle?: any;
  as?: any;
  textComponent?: any;
  [key: string]: any;
}

const renderWithLineBreaks = (text: string): string => {
  if (!text || typeof text !== 'string') return text;
  return text.replace(/\|/g, '\n');
};

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  typingSpeed = 50,
  pauseTime = 500,
  onComplete,
  showCursor = true,
  cursorColor = 'currentColor',
  textStyle,
  textComponent,
  as: _as,
  ...props
}) => {
  const TextComponent = textComponent || DefaultText;
  const textArray = Array.isArray(text) ? text : [text];

  const [displayedText, setDisplayedText] = useState<string[]>(
    textArray.map(() => '')
  );
  const [isComplete, setIsComplete] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setDisplayedText(textArray.map(() => ''));
    setIsComplete(false);
    setCurrentTextIndex(0);
    setCharIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (isComplete) {
      if (onComplete) onComplete();
      return;
    }
    const currentText = textArray[currentTextIndex];
    if (charIndex >= currentText.length) {
      if (currentTextIndex >= textArray.length - 1) {
        setIsComplete(true);
        return;
      }
      const timeout = setTimeout(() => {
        setCurrentTextIndex((prev) => prev + 1);
        setCharIndex(0);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setDisplayedText((prev) => {
        const newText = [...prev];
        newText[currentTextIndex] = currentText.substring(0, charIndex + 1);
        return newText;
      });
      setCharIndex((prev) => prev + 1);
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [
    textArray,
    currentTextIndex,
    charIndex,
    isComplete,
    onComplete,
    pauseTime,
    typingSpeed,
  ]);

  return (
    <>
      {displayedText.map((str, index) => (
        <React.Fragment key={index}>
          <TextComponent {...props}>{renderWithLineBreaks(str)}</TextComponent>
          {showCursor && index === currentTextIndex && !isComplete && (
            <TextComponent
              width={2}
              height="1em"
              marginLeft={1}
              backgroundColor={cursorColor}
              animate={Animation.flash({
                duration: '1s',
                iterationCount: 'infinite',
              })}
              {...textStyle}
            >
              {' '}
            </TextComponent>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default TypewriterEffect;
