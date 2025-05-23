import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element is in the viewport
 * @returns An object with a ref to attach to the element and a boolean indicating if the element is in view
 */
export const useInView = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when the element enters the viewport
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once the element is in view, we don't need to observe it anymore
          observer.unobserve(element);
        }
      },
      {
        // Element is considered in view when at least 10% is visible
        threshold: 0.1,
        // Start observing when element is 100px from entering the viewport
        rootMargin: '100px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return { ref, isInView };
};
