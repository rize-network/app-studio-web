import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SliderProps } from './Slider.props';
// This file encapsulates the core state management logic and utility functions for the Slider component, handling value calculation, user interactions, and controlled/uncontrolled behavior.
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
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
    const trackLength = trackRect.height;
    const relativePosition = trackRect.bottom - position;
    percentage = clamp(relativePosition / trackLength, 0, 1);
  }
  if (stepValues && stepValues.length > 0) {
    const rawValue = min + percentage * range;
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
    const rawValue = min + percentage * range;
    const steppedValue = Math.round(rawValue / step) * step;
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
      event.preventDefault();
      setIsDragging(true);
      handleInteraction(event);
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
  const handleTrackMouseDown = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
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
          return;
      }
      event.preventDefault();
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
