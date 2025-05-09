import { useEffect, useState } from 'react';
import { TitleProps } from './Title.props';

/**
 * Custom hook for managing Title component state and animations
 */
export const useTitleState = (props: TitleProps) => {
  const {
    animation = 'none',
    animationDirection = 'left',
    animationDuration = '1s',
    animationDelay = '0s',
    children,
    _isInView = false,
    alternateHighlightText = [],
    alternateAnimation = false,
    alternateDuration = 3000,
    highlightText,
  } = props;

  // State for typewriter animation
  const [displayText, setDisplayText] = useState<string>('');

  // State for alternating highlight text
  const [currentHighlightText, setCurrentHighlightText] = useState<
    string | string[] | undefined
  >(highlightText);

  // State for the alternating text content
  const [alternatingContent, setAlternatingContent] = useState<
    string | React.ReactNode
  >(children);

  // Handle alternating highlight text animation
  useEffect(() => {
    // Initialize with the provided highlightText
    setCurrentHighlightText(highlightText);

    // If not using alternating animation or no alternateHighlightText provided, return early
    if (
      !alternateAnimation ||
      alternateHighlightText.length === 0 ||
      !_isInView
    ) {
      return () => {};
    }

    // Only proceed if children is a string
    if (typeof children !== 'string') {
      return () => {};
    }

    // Set initial content with the first alternating text
    const baseText = children as string;
    let currentIndex = 0;

    // Function to update the content with the current alternating text
    const updateContent = (index: number) => {
      if (highlightText && typeof highlightText === 'string') {
        // Replace the highlightText with the current alternating text
        const regex = new RegExp(highlightText, 'gi');
        const newContent = baseText.replace(
          regex,
          alternateHighlightText[index]
        );
        setAlternatingContent(newContent);
      }
    };

    // Set initial content
    updateContent(currentIndex);

    // Create interval to cycle through the alternateHighlightText array
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % alternateHighlightText.length;
      updateContent(currentIndex);
    }, alternateDuration);

    return () => clearInterval(interval);
  }, [
    alternateAnimation,
    alternateHighlightText,
    alternateDuration,
    highlightText,
    children,
    _isInView,
  ]);

  // Handle typewriter animation
  useEffect(() => {
    // Only start the typewriter animation when the component is in view
    if (
      animation === 'typewriter' &&
      typeof children === 'string' &&
      _isInView
    ) {
      const text = children as string;
      let currentIndex = 0;
      setDisplayText('');

      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }

    // Reset the text if not in view
    if (animation === 'typewriter' && !_isInView) {
      setDisplayText('');
    }

    return () => {};
  }, [animation, children, _isInView]);

  // Get animation configuration based on animation type
  const getAnimation = () => {
    // For typewriter animation, we handle it separately with useState and useEffect
    if (animation === 'typewriter') {
      return undefined;
    }

    switch (animation) {
      case 'fadeIn':
        return {
          from: { opacity: 0 },
          to: { opacity: 1 },
          duration: animationDuration,
          delay: animationDelay,
          // iterationCount: 'infinite',
          direction: 'alternate',
        };

      case 'slideIn':
        switch (animationDirection) {
          case 'left':
            return {
              from: { transform: 'translateX(-100%)' },
              to: { transform: 'translateX(0)' },
              duration: animationDuration,
              delay: animationDelay,
              // iterationCount: 'infinite',
              direction: 'alternate',
            };
          case 'right':
            return {
              from: { transform: 'translateX(100%)' },
              to: { transform: 'translateX(0)' },
              duration: animationDuration,
              delay: animationDelay,
              // iterationCount: 'infinite',
              direction: 'alternate',
            };
          case 'top':
            return {
              from: { transform: 'translateY(-100%)' },
              to: { transform: 'translateY(0)' },
              duration: animationDuration,
              delay: animationDelay,
              // iterationCount: 'infinite',
              direction: 'alternate',
            };
          case 'bottom':
            return {
              from: { transform: 'translateY(100%)' },
              to: { transform: 'translateY(0)' },
              duration: animationDuration,
              delay: animationDelay,
              // iterationCount: 'infinite',
              direction: 'alternate',
            };
          default:
            return {
              from: { transform: 'translateX(-100%)' },
              to: { transform: 'translateX(0)' },
              duration: animationDuration,
              delay: animationDelay,
              // iterationCount: 'infinite',
              direction: 'alternate',
            };
        }

      case 'bounce':
        return {
          from: { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-30px)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-15px)' },
          '80%': { transform: 'translateY(0)' },
          to: { transform: 'translateY(0)' },
          duration: animationDuration,
          delay: animationDelay,
          iterationCount: '1',
        };

      case 'highlight':
        return {
          from: { backgroundSize: '0 100%' },
          to: { backgroundSize: '100% 100%' },
          duration: animationDuration,
          delay: animationDelay,
        };

      case 'reveal':
        return {
          from: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
          to: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
          duration: animationDuration,
          delay: animationDelay,
        };

      case 'none':
      default:
        return undefined;
    }
  };

  return {
    displayText,
    getAnimation,
    currentHighlightText,
    alternatingContent,
  };
};
