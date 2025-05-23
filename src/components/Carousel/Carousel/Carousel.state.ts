import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { generateId } from '../../../utils/id';

export interface CarouselStateProps {
  defaultActiveIndex?: number;
  activeIndex?: number;
  onChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  infinite?: boolean;
  totalSlides?: number; // Optional for compound component pattern
  stepIndices?: number[]; // Optional specific indices to navigate to
}

export const useCarouselState = ({
  defaultActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onChange,
  autoPlay = false,
  autoPlayInterval = 3000,
  pauseOnHover = true,
  infinite = true,
  totalSlides: initialTotalSlides,
  stepIndices,
}: CarouselStateProps) => {
  // For compound component pattern: track slides dynamically
  const slideCountRef = useRef<number>(initialTotalSlides || 0);
  const [totalSlides, setTotalSlides] = useState(initialTotalSlides || 0);
  const slideRegistry = useRef<Set<number>>(new Set());
  const nextSlideId = useRef<number>(0);
  const contentId = useMemo(() => generateId('carousel-content'), []);
  const [activeIndex, setActiveIndex] = useState(
    controlledActiveIndex !== undefined
      ? controlledActiveIndex
      : defaultActiveIndex
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update internal state when controlled activeIndex changes
  useEffect(() => {
    if (controlledActiveIndex !== undefined) {
      setActiveIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex]);

  // Handle slide change
  const goToSlide = useCallback(
    (index: number) => {
      let newIndex = index;

      // Handle infinite looping
      if (infinite) {
        if (index < 0) {
          newIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
          newIndex = 0;
        }
      } else {
        // Clamp index to valid range
        newIndex = Math.max(0, Math.min(index, totalSlides - 1));
      }

      // If stepIndices is provided, find the closest allowed index
      if (stepIndices && stepIndices.length > 0) {
        // If the exact index is in stepIndices, use it
        if (stepIndices.includes(newIndex)) {
          // Index is already valid
        } else {
          // Find the closest step index
          const closestIndex = stepIndices.reduce((prev, curr) => {
            return Math.abs(curr - newIndex) < Math.abs(prev - newIndex)
              ? curr
              : prev;
          });
          newIndex = closestIndex;
        }
      }

      if (controlledActiveIndex === undefined) {
        setActiveIndex(newIndex);
      }

      if (onChange) {
        onChange(newIndex);
      }
    },
    [controlledActiveIndex, infinite, onChange, totalSlides]
  );

  // Go to next slide
  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  // Handle auto-play
  useEffect(() => {
    if (autoPlay && !isHovered && !isDragging) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [
    autoPlay,
    autoPlayInterval,
    isHovered,
    isDragging,
    nextSlide,
    pauseOnHover,
  ]);

  // Handle mouse enter/leave for pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Handle drag interactions
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);

      if ('touches' in e) {
        setDragStartX(e.touches[0].clientX);
        setDragStartY(e.touches[0].clientY);
      } else {
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
      }
    },
    []
  );

  const handleDragMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;

      let currentX: number;
      let currentY: number;

      if ('touches' in e) {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
      } else {
        currentX = e.clientX;
        currentY = e.clientY;
      }

      const diffX = currentX - dragStartX;
      const diffY = currentY - dragStartY;

      // Determine if horizontal drag is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
        setIsDragging(false);
      }
    },
    [isDragging, dragStartX, dragStartY, nextSlide, prevSlide]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // For compound component pattern: register/unregister slides
  const registerSlide = useCallback(() => {
    const id = nextSlideId.current++;
    slideRegistry.current.add(id);
    const newCount = slideRegistry.current.size;
    slideCountRef.current = newCount;
    setTotalSlides(newCount);
    return id;
  }, []);

  const unregisterSlide = useCallback(
    (id: number) => {
      slideRegistry.current.delete(id);
      const newCount = slideRegistry.current.size;
      slideCountRef.current = newCount;
      setTotalSlides(newCount);

      // Adjust currentIndex if it becomes invalid due to slide removal
      if (newCount > 0 && activeIndex >= newCount) {
        const newIndex = Math.max(0, newCount - 1);
        if (controlledActiveIndex === undefined) {
          setActiveIndex(newIndex);
        }
        if (onChange) {
          onChange(newIndex);
        }
      }
    },
    [activeIndex, controlledActiveIndex, onChange]
  );

  // Calculate if we can navigate
  const canGoPrevious = infinite || activeIndex > 0;
  const canGoNext = infinite || activeIndex < totalSlides - 1;

  return {
    activeIndex,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    canGoNext,
    canGoPrevious,
    handleMouseEnter,
    handleMouseLeave,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    registerSlide,
    unregisterSlide,
    contentId,
    infinite,
  };
};
