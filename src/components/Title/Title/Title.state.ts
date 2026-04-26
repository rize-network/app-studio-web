import { useEffect, useState } from 'react';
import { TitleProps } from './Title.props';
// This file defines the `useTitleState` hook, which manages the dynamic state for the Title component, including text content, active highlight targets, and animation logic for alternating and highlighting text based on component props.
export const useTitleState = (props: TitleProps) => {
  const {
    children,
    _isInView = false,
    alternateHighlightText = [],
    alternateAnimation = false,
    alternateDuration = 3000,
    highlightText: initialHighlightText,
    highlightTypewriter = false,
    highlightTypewriterDuration = 1500,
    highlightSlide = false,
    highlightSlideDuration = 500,
    highlightSlideStagger = 50,
    highlightSlideSequential = true,
  } = props;
  const [finalDisplayedText, setFinalDisplayedText] =
    useState<React.ReactNode>(children);
  const [activeHighlightTarget, setActiveHighlightTarget] = useState<
    string | string[] | undefined
  >(initialHighlightText);
  useEffect(() => {
    if (
      !alternateAnimation ||
      alternateHighlightText.length === 0 ||
      !_isInView ||
      typeof children !== 'string' ||
      typeof initialHighlightText !== 'string'
    ) {
      setFinalDisplayedText(children);
      setActiveHighlightTarget(initialHighlightText);
      return () => {};
    }
    const baseText = children as string;
    const placeholder = initialHighlightText as string;
    let currentIndex = 0;
    const updateAlternatingState = (index: number) => {
      const currentWordToHighlight = alternateHighlightText[index];
      const escapedPlaceholder = placeholder.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
      );
      const regex = new RegExp(escapedPlaceholder, 'gi');
      const newContent = baseText.replace(regex, currentWordToHighlight);
      setFinalDisplayedText(newContent);
      setActiveHighlightTarget(currentWordToHighlight);
    };
    updateAlternatingState(currentIndex);
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % alternateHighlightText.length;
      updateAlternatingState(currentIndex);
    }, alternateDuration);
    return () => clearInterval(interval);
  }, [
    alternateAnimation,
    alternateHighlightText,
    alternateDuration,
    initialHighlightText,
    children,
    _isInView,
  ]);
  return {
    finalDisplayedText,
    activeHighlightTarget,
    highlightTypewriter,
    highlightSlide,
    highlightSlideDuration,
    highlightSlideStagger,
    highlightSlideSequential,
  };
};
