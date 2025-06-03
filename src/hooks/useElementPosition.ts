import {
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  RefObject,
} from 'react';

/**
 * Position data for an element
 */
export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

/**
 * Available space on all sides of an element
 */
export interface AvailableSpace {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Optimal position result with placement information
 */
export interface OptimalPosition {
  x: number;
  y: number;
  placement: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * Offset configuration
 */
export interface PositionOffset {
  x: number;
  y: number;
}

/**
 * Options for useElementPosition hook
 */
export interface UseElementPositionOptions {
  /** Whether to automatically track position changes */
  trackChanges?: boolean;
  /** Throttle delay for position updates in milliseconds */
  throttleMs?: number;
  /** Whether to include scroll events */
  includeScroll?: boolean;
  /** Whether to include resize events */
  includeResize?: boolean;
  /** Custom offset for calculations */
  offset?: PositionOffset;
  /** Reference to scrollable container */
  scrollContainer?: RefObject<HTMLElement>;
  /** Use fixed positioning relative to viewport */
  useFixedPositioning?: boolean;
}

/**
 * Helper methods for positioning overlays
 */
export interface PositionHelpers {
  getAvailableSpace(): AvailableSpace;
  getOptimalPosition(
    width: number,
    height: number,
    offset?: PositionOffset
  ): OptimalPosition;
  getContextMenuPosition(width: number, height: number): OptimalPosition;
  getTooltipPosition(
    width: number,
    height: number,
    offset?: PositionOffset
  ): OptimalPosition;
  getDropdownPosition(width: number, height: number): OptimalPosition;
  isInViewport(): boolean;
  getViewportOverflow(): AvailableSpace;
}

/**
 * Return type for useElementPosition hook
 */
export interface UseElementPositionReturn {
  ref: RefObject<HTMLElement>;
  position: ElementPosition | null;
  helpers: PositionHelpers;
  updatePosition: () => void;
}

/**
 * Default options for the hook
 */
const DEFAULT_OPTIONS: Required<UseElementPositionOptions> = {
  trackChanges: true,
  throttleMs: 16,
  includeScroll: true,
  includeResize: true,
  offset: { x: 0, y: 0 },
  scrollContainer: { current: null },
  useFixedPositioning: false,
};

/**
 * Throttle function to limit how often a function can be called
 */
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

/**
 * Get the scroll container element (window or custom container)
 */
function getScrollContainer(
  scrollContainer?: RefObject<HTMLElement>
): Element | Window {
  return scrollContainer?.current || window;
}

/**
 * Get viewport dimensions
 */
function getViewportDimensions(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Calculate element position relative to viewport or scroll container
 */
function calculateElementPosition(
  element: HTMLElement,
  options: Required<UseElementPositionOptions>
): ElementPosition {
  const rect = element.getBoundingClientRect();
  const { offset, scrollContainer, useFixedPositioning } = options;

  let x = rect.left + offset.x;
  let y = rect.top + offset.y;

  // If using a custom scroll container and not fixed positioning,
  // adjust coordinates relative to the container
  if (scrollContainer.current && !useFixedPositioning) {
    const containerRect = scrollContainer.current.getBoundingClientRect();
    x =
      rect.left -
      containerRect.left +
      scrollContainer.current.scrollLeft +
      offset.x;
    y =
      rect.top -
      containerRect.top +
      scrollContainer.current.scrollTop +
      offset.y;
  }

  return {
    x,
    y,
    width: rect.width,
    height: rect.height,
    top: y,
    left: x,
    right: x + rect.width,
    bottom: y + rect.height,
  };
}
