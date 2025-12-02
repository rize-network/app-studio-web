import { useEffect, useState } from 'react';
import { TitleProps } from './Title.props';

/**
 * Custom hook for managing Title component state
 */
export const useTitleState = (props: TitleProps) => {
  const {
    children, // Original children
    _isInView = false,
    alternateHighlightText = [],
    alternateAnimation = false, // Default to false as per prop definition
    alternateDuration = 3000,
    highlightText: initialHighlightText, // Renamed to avoid confusion with the dynamic target
    highlightTypewriter = false,
    highlightTypewriterDuration = 1500,
    highlightSlide = false,
    highlightSlideDuration = 500,
    highlightSlideStagger = 50,
    highlightSlideSequential = true,
  } = props;

  // State for the final text to be displayed (could be original children or alternating text)
  const [finalDisplayedText, setFinalDisplayedText] =
    useState<React.ReactNode>(children);

  // State for the text that should be actively highlighted (could be initialHighlightText or a word from alternateHighlightText)
  const [activeHighlightTarget, setActiveHighlightTarget] = useState<
    string | string[] | undefined
  >(initialHighlightText);

  // We don't need state for typewriter text anymore as we're using the TypewriterEffect component

  // Handle alternating highlight text animation
  useEffect(() => {
    // If not using alternating animation or conditions not met, reset to initial/non-alternating state
    if (
      !alternateAnimation ||
      alternateHighlightText.length === 0 ||
      !_isInView ||
      typeof children !== 'string' || // Base text must be a string for replacement
      typeof initialHighlightText !== 'string' // Placeholder must be a string
    ) {
      setFinalDisplayedText(children);
      setActiveHighlightTarget(initialHighlightText);
      return () => {};
    }

    // Proceed with alternating animation
    const baseText = children as string;
    const placeholder = initialHighlightText as string;
    let currentIndex = 0;

    // Function to update the state for alternating text
    const updateAlternatingState = (index: number) => {
      const currentWordToHighlight = alternateHighlightText[index];
      // Replace the placeholder in the baseText with the current alternating word
      const regex = new RegExp(placeholder, 'gi');
      const newContent = baseText.replace(regex, currentWordToHighlight);

      setFinalDisplayedText(newContent);
      setActiveHighlightTarget(currentWordToHighlight); // Set the current word as the highlight target
    };

    // Set initial alternating state
    updateAlternatingState(currentIndex);

    // Create interval to cycle through the alternateHighlightText array
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % alternateHighlightText.length;
      updateAlternatingState(currentIndex);
    }, alternateDuration);

    return () => clearInterval(interval);
  }, [
    alternateAnimation,
    alternateHighlightText,
    alternateDuration,
    initialHighlightText, // Depends on the placeholder
    children,
    _isInView,
  ]);

  // We don't need a separate effect for typewriter animation anymore
  // as we're using the TypewriterEffect component directly in the view

  return {
    finalDisplayedText, // This is the text that TitleView should render
    activeHighlightTarget, // This is the text that TitleView should highlight
    highlightTypewriter, // Whether typewriter effect is enabled
    highlightSlide,
    highlightSlideDuration,
    highlightSlideStagger,
    highlightSlideSequential,
  };
};
