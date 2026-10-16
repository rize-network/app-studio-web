import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useMarkdownReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (active) setReduced(value);
      })
      .catch(() => {});
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduced
    );
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);
  return reduced;
}
