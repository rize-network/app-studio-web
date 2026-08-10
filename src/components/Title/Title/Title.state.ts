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
  // Dev-only: a highlight target that never occurs in the sentence highlights
  // nothing, with no error anywhere. This covers the STATIC case — the
  // rotation path below re-checks the placeholder separately because there it
  // disables the animation entirely.
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    if (typeof children !== 'string' || !initialHighlightText) return;
    const targets = Array.isArray(initialHighlightText)
      ? initialHighlightText
      : [initialHighlightText];
    for (const target of targets) {
      if (
        typeof target === 'string' &&
        target.length > 0 &&
        !children.toLowerCase().includes(target.toLowerCase())
      ) {
        console.warn(
          `[Title] highlightText "${target}" is not a substring of \`children\`, so nothing will be highlighted. ` +
            '`children` must be the complete sentence including the highlight, e.g. ' +
            '`<Title highlightText="apps">Build apps fast</Title>`.'
        );
      }
    }
  }, [children, initialHighlightText]);
  useEffect(() => {
    if (
      !alternateAnimation ||
      alternateHighlightText.length === 0 ||
      !_isInView ||
      typeof children !== 'string' ||
      typeof initialHighlightText !== 'string'
    ) {
      if (
        process.env.NODE_ENV !== 'production' &&
        alternateAnimation &&
        alternateHighlightText.length > 0 &&
        (typeof children !== 'string' ||
          typeof initialHighlightText !== 'string')
      ) {
        console.warn(
          '[Title] alternateHighlightText requires `children` to be the full ' +
            'sentence as a string and `highlightText` to be the placeholder ' +
            'word inside it. Rotation is disabled.'
        );
      }
      setFinalDisplayedText(children);
      setActiveHighlightTarget(initialHighlightText);
      return () => {};
    }
    const baseText = children as string;
    const placeholder = initialHighlightText as string;
    // The rotation works by REPLACING `highlightText` inside `children`; when
    // the placeholder is absent, `replace` is a silent no-op and the title
    // renders broken. Fail loudly and keep the static text instead.
    if (!baseText.toLowerCase().includes(placeholder.toLowerCase())) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[Title] \`children\` must contain \`highlightText\` ("${placeholder}") — ` +
            'it is the placeholder the rotating words replace, e.g. ' +
            '`<Title highlightText="apps" alternateHighlightText={["apps", "sites"]}>Build apps fast</Title>`. ' +
            'Rotation is disabled.'
        );
      }
      setFinalDisplayedText(children);
      setActiveHighlightTarget(initialHighlightText);
      return () => {};
    }
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
