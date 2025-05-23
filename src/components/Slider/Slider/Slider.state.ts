import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SliderProps } from './Slider.props';

// Clamp value between min and max
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// Calculate value based on position, track dimensions, min, max, step
const calculateValue = (
  position: number,
  trackRect: DOMRect,
  min: number,
  max: number,
  step: number,
  orientation: 'horizontal' | 'vertical',
  stepValues?: number[]
): number => {
  const range = max - min;
  let percentage: number;

  if (orientation === 'horizontal') {
    const trackLength = trackRect.width;
    const relativePosition = position - trackRect.left;
    percentage = clamp(relativePosition / trackLength, 0, 1);
  } else {
    // Vertical: top is max, bottom is min (reversed from the provided code)
    const trackLength = trackRect.height;
    const relativePosition = trackRect.bottom - position; // Y position relative to track bottom
    percentage = clamp(relativePosition / trackLength, 0, 1);
  }

  // If stepValues are provided, find the closest value in the array
  if (stepValues && stepValues.length > 0) {
    const rawValue = min + percentage * range;

    // Find the closest value in stepValues
    let closestValue = stepValues[0];
    let minDistance = Math.abs(rawValue - closestValue);

    for (let i = 1; i < stepValues.length; i++) {
      const distance = Math.abs(rawValue - stepValues[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestValue = stepValues[i];
      }
    }

    return closestValue;
  } else {
    // Use regular step logic
    const rawValue = min + percentage * range;
    const steppedValue = Math.round(rawValue / step) * step;
    // Final clamp to ensure step rounding doesn't exceed bounds
    return clamp(steppedValue, min, max);
  }
};

export const useSliderState = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue = 0,
  defaultValue,
  onChange,
  onDrag,
  orientation = 'horizontal',
  isDisabled = false,
  stepValues,
}: SliderProps) => {
  const initialValue = clamp(controlledValue ?? defaultValue ?? min, min, max);
  const [internalValue, setInternalValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Update internal state if controlled value changes
  useEffect(() => {
    if (isControlled) {
      setInternalValue(clamp(controlledValue, min, max));
    }
  }, [controlledValue, isControlled, min, max]);

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = clamp(newValue, min, max);
      if (!isControlled) {
        setInternalValue(clampedValue);
      }
      if (onChange && clampedValue !== currentValue) {
        onChange(clampedValue);
      }
      if (isDragging && onDrag) {
        onDrag(clampedValue);
      }
    },
    [isControlled, min, max, onChange, currentValue, isDragging, onDrag]
  );

  const handleInteraction = useCallback(
    (event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
      if (isDisabled || !trackRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      let position: number;

      if ('touches' in event) {
        position =
          orientation === 'horizontal'
            ? event.touches[0].clientX
            : event.touches[0].clientY;
      } else {
        position = orientation === 'horizontal' ? event.clientX : event.clientY;
      }

      const newValue = calculateValue(
        position,
        trackRect,
        min,
        max,
        step,
        orientation,
        stepValues
      );
      updateValue(newValue);
    },
    [min, max, step, orientation, updateValue, isDisabled, stepValues]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (isDisabled) return;
      event.preventDefault(); // Prevent text selection during drag
      setIsDragging(true);
      handleInteraction(event); // Update value immediately on click/touch

      const handleMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
        handleInteraction(moveEvent);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
    },
    [handleInteraction, isDisabled]
  );

  // Allow clicking directly on the track
  const handleTrackMouseDown = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      // Prevent triggering if click is on the thumb itself
      if (thumbRef.current && thumbRef.current.contains(event.target as Node)) {
        return;
      }
      handleMouseDown(event);
    },
    [handleMouseDown]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (isDisabled) return;
      let newValue = currentValue;
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = currentValue - step;
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = currentValue + step;
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return; // Exit if key is not handled
      }
      event.preventDefault(); // Prevent page scroll
      updateValue(newValue);
    },
    [currentValue, min, max, step, updateValue, isDisabled]
  );

  const range = max - min;
  const thumbPositionPercent =
    range === 0 ? 0 : ((currentValue - min) / range) * 100;

  return {
    currentValue,
    isDragging,
    isHovered,
    setIsHovered,
    trackRef,
    thumbRef,
    handleThumbMouseDown: handleMouseDown,
    handleTrackMouseDown,
    handleKeyDown,
    thumbPositionPercent,
  };
};
