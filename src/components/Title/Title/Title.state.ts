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
  } = props;

  // State for typewriter animation
  const [displayText, setDisplayText] = useState<string>('');

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
  };
};
