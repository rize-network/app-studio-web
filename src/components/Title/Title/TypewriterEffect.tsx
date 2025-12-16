import React, { useEffect, useState } from 'react';
import { Text } from 'app-studio';

interface TypewriterEffectProps {
  text: string | string[];
  typingSpeed?: number;
  pauseTime?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorColor?: string;
  textStyle?: React.CSSProperties;
  as?: React.ElementType;
  [key: string]: any;
}

/**
 * A component that creates a typewriter effect for text
 */
export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  typingSpeed = 50,
  pauseTime = 500,
  onComplete,
  showCursor = true,
  cursorColor = 'currentColor',
  textStyle,
  as,
  ...props
}) => {
  // Convert text to array if it's a string
  const textArray = Array.isArray(text) ? text : [text];

  // State for the currently displayed text
  const [displayedText, setDisplayedText] = useState<string[]>(
    textArray.map(() => '')
  );

  // State to track if typing is complete
  const [isComplete, setIsComplete] = useState(false);

  // State to track which text item we're currently typing
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // State to track the character position within the current text
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText(textArray.map(() => ''));
    setIsComplete(false);
    setCurrentTextIndex(0);
    setCharIndex(0);
  }, [text]);

  useEffect(() => {
    // If all text is typed, call onComplete and return
    if (isComplete) {
      if (onComplete) onComplete();
      return;
    }

    // Get the current text we're typing
    const currentText = textArray[currentTextIndex];

    // If we've typed all characters in the current text
    if (charIndex >= currentText.length) {
      // If we've typed all texts, we're done
      if (currentTextIndex >= textArray.length - 1) {
        setIsComplete(true);
        return;
      }

      // Otherwise, move to the next text after a pause
      const timeout = setTimeout(() => {
        setCurrentTextIndex((prev) => prev + 1);
        setCharIndex(0);
      }, pauseTime);

      return () => clearTimeout(timeout);
    }

    // Type the next character
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
      {displayedText.map((text, index) => (
        <React.Fragment key={index}>
          {text}
          {showCursor && index === currentTextIndex && !isComplete && (
            <Text
              as="span"
              display="inline-block"
              width="0.1em"
              height="1em"
              backgroundColor={cursorColor}
              {...{
                animation: 'blink 1s step-end infinite',
                verticalAlign: 'text-bottom',
                marginLeft: '1px',
                ...textStyle,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default TypewriterEffect;
