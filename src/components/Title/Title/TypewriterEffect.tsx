import React, { useEffect, useState } from 'react';
import { Text as DefaultText } from 'app-studio';
// Defines the shape of properties accepted by the TypewriterEffect component.
interface TypewriterEffectProps {
  // The text or array of texts to be displayed with the typewriter effect.
  text: string | string[];
  // Optional speed in milliseconds for typing each character. Defaults to 50ms.
  typingSpeed?: number;
  // Optional pause time in milliseconds between typing different lines of text. Defaults to 500ms.
  pauseTime?: number;
  // Optional callback function to be executed once all text has been typed.
  onComplete?: () => void;
  // Optional boolean to control the visibility of the blinking cursor. Defaults to true.
  showCursor?: boolean;
  // Optional color for the blinking cursor. Defaults to 'currentColor'.
  cursorColor?: string;
  // Optional inline CSS styles to be applied to the displayed text.
  textStyle?: React.CSSProperties;
  // Optional HTML element type to render the text as (e.g., 'p', 'h1').
  as?: React.ElementType;
  // Optional custom React component to render the text instead of the default 'Text' component.
  textComponent?: any;
  // Allows the component to accept any additional props that will be spread onto the root element.
  [key: string]: any;
}
// The main TypewriterEffect functional component responsible for animating text with a typing effect.
export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  typingSpeed = 50,
  pauseTime = 500,
  onComplete,
  showCursor = true,
  cursorColor = 'currentColor',
  textStyle,
  textComponent,
  as,
  ...props
}) => {
  // Determines the component to be used for rendering text, defaulting to 'DefaultText' if a custom 'textComponent' is not provided.
  const TextComponent = textComponent || DefaultText;
  // Ensures the 'text' prop is always an array of strings, simplifying iteration and processing.
  const textArray = Array.isArray(text) ? text : [text];
  // State variable to store the portion of text currently displayed on the screen during the typing animation.
  const [displayedText, setDisplayedText] = useState<string[]>(
    textArray.map(() => '')
  );
  // State variable indicating whether the entire typewriter effect, across all text lines, has completed.
  const [isComplete, setIsComplete] = useState(false);
  // State variable tracking the index of the current line of text being typed from the 'textArray'.
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  // State variable tracking the index of the character currently being typed within the 'currentTextIndex' line.
  const [charIndex, setCharIndex] = useState(0);
  // Resets all animation-related state variables when the 'text' prop changes, effectively restarting the typewriter effect.
  useEffect(() => {
    setDisplayedText(textArray.map(() => ''));
    setIsComplete(false);
    setCurrentTextIndex(0);
    setCharIndex(0);
  }, [text]);
  // Manages the core typing animation logic, including character progression, transitioning between lines, and signaling completion.
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
  // A helper function that processes a string to replace '|' characters with HTML line breaks (<br/>) for multi-line display.
  const renderWithLineBreaks = (text: string) => {
    if (!text || typeof text !== 'string') return text;
    const parts = text.split('|');
    if (parts.length === 1) return text;
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };
  return (
    <>
      {displayedText.map((text, index) => (
        <React.Fragment key={index}>
          {renderWithLineBreaks(text)}
          {showCursor && index === currentTextIndex && !isComplete && (
            <TextComponent
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
