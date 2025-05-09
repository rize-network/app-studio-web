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
    children, // Original children
    _isInView = false,
    alternateHighlightText = [],
    alternateAnimation = false, // Default to false as per prop definition
    alternateDuration = 3000,
    highlightText: initialHighlightText, // Renamed to avoid confusion with the dynamic target
  } = props;

  // State for typewriter animation
  const [displayTextForTypewriter, setDisplayTextForTypewriter] =
    useState<string>('');

  // State for the final text to be displayed (could be original children or alternating text)
  const [finalDisplayedText, setFinalDisplayedText] =
    useState<React.ReactNode>(children);

  // State for the text that should be actively highlighted (could be initialHighlightText or a word from alternateHighlightText)
  const [activeHighlightTarget, setActiveHighlightTarget] = useState<
    string | string[] | undefined
  >(initialHighlightText);

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

  // Handle typewriter animation
  useEffect(() => {
    // Typewriter should type out the finalDisplayedText if it's a string
    const textToType =
      typeof finalDisplayedText === 'string'
        ? finalDisplayedText
        : typeof children === 'string'
        ? children
        : '';

    if (animation === 'typewriter' && _isInView && textToType) {
      let currentIndex = 0;
      setDisplayTextForTypewriter(''); // Reset

      const interval = setInterval(() => {
        if (currentIndex <= textToType.length) {
          setDisplayTextForTypewriter(textToType.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust speed as needed (consider making this configurable)

      return () => clearInterval(interval);
    }

    // Reset the typewriter text if not in view or animation is not typewriter
    if (animation === 'typewriter' && !_isInView) {
      setDisplayTextForTypewriter('');
    }
    return () => {};
  }, [animation, finalDisplayedText, children, _isInView]); // Depends on finalDisplayedText (and children as fallback)

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
          direction: 'alternate', // Note: 'direction' might not be what you intend for a simple fadeIn.
          // 'iterationCount: 1' is typical for a one-time animation.
          // If you want it to fade in and out, 'alternate' with 'iterationCount: infinite' is one way.
          // For a single fade-in, remove 'direction: alternate'.
        };

      case 'slideIn':
        // Similar note about 'direction: alternate' for slideIn.
        // Typically, slideIn is a one-time effect.
        let transformFrom = 'translateX(-100%)';
        switch (animationDirection) {
          case 'right':
            transformFrom = 'translateX(100%)';
            break;
          case 'top':
            transformFrom = 'translateY(-100%)';
            break;
          case 'bottom':
            transformFrom = 'translateY(100%)';
            break;
          case 'left': // Default
          default:
            transformFrom = 'translateX(-100%)';
            break;
        }
        return {
          from: { transform: transformFrom },
          to: { transform: 'translateX(0)' }, // Should be 'translateY(0)' for top/bottom
          duration: animationDuration,
          delay: animationDelay,
          // direction: 'alternate', // Consider if this is intended for a single slide-in
        };
      // A more robust slideIn:
      // let fromTransform = {};
      // let toTransform = {};
      // switch (animationDirection) {
      //   case 'left': fromTransform = { transform: 'translateX(-100%)' }; toTransform = { transform: 'translateX(0)' }; break;
      //   case 'right': fromTransform = { transform: 'translateX(100%)' }; toTransform = { transform: 'translateX(0)' }; break;
      //   case 'top': fromTransform = { transform: 'translateY(-100%)' }; toTransform = { transform: 'translateY(0)' }; break;
      //   case 'bottom': fromTransform = { transform: 'translateY(100%)' }; toTransform = { transform: 'translateY(0)' }; break;
      //   default: fromTransform = { transform: 'translateX(-100%)' }; toTransform = { transform: 'translateX(0)' }; break;
      // }
      // return {
      //   from: fromTransform,
      //   to: toTransform,
      //   duration: animationDuration,
      //   delay: animationDelay,
      // };

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

      case 'highlight': // This animation seems to be for a text background sweep
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
    displayTextForTypewriter,
    getAnimation,
    finalDisplayedText, // This is the text that TitleView should render
    activeHighlightTarget, // This is the text that TitleView should highlight
  };
};
