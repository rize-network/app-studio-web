import { useState, useCallback, useLayoutEffect } from 'react';

/**
 * A hook that returns the DOMRect of an element.
 * @param ref React ref object for the element to measure
 * @returns DOMRect of the element or null if the element is not available
 */
export const useRect = <T extends HTMLElement>(
  ref: React.RefObject<T>
): DOMRect | null => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    updateRect();

    // Update on resize and scroll
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [ref, updateRect]);

  return rect;
};
