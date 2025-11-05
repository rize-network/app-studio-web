import React, { useEffect, useRef, useState } from 'react';
import { View, ViewProps } from 'app-studio';

interface ChartTooltipProps {
  visible: boolean;
  x: number;
  y: number;
  content: React.ReactNode;
  maxDistance?: number;
  views?: {
    tooltip?: ViewProps;
  };
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  visible,
  x,
  y,
  content,
  maxDistance = 100,
  views,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (!visible || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

    const viewportOffset = 10;
    const cursorOffset = 15;

    // Start position: top-left corner near cursor
    let left = x - cursorOffset;
    let top = y - cursorOffset;

    // Calculate the distance from cursor to tooltip edges
    const distanceX = x - left; // Distance from cursor to left edge
    const distanceY = y - top; // Distance from cursor to top edge

    // If tooltip would be too far on X axis, adjust it
    if (distanceX > maxDistance) {
      left = x - maxDistance;
    }

    // If tooltip would be too far on Y axis, adjust it
    if (distanceY > maxDistance) {
      top = y - maxDistance;
    }

    // Ensure tooltip doesn't go off the right edge of viewport
    if (left + tooltipWidth > window.innerWidth - viewportOffset) {
      left = window.innerWidth - tooltipWidth - viewportOffset;
      // Still respect max distance constraint
      if (x - left > maxDistance) {
        left = x - maxDistance;
      }
    }

    // Ensure tooltip doesn't go off the left edge of viewport
    if (left < viewportOffset) {
      left = viewportOffset;
    }

    // Ensure tooltip doesn't go off the bottom edge of viewport
    if (top + tooltipHeight > window.innerHeight - viewportOffset) {
      top = window.innerHeight - tooltipHeight - viewportOffset;
      // Still respect max distance constraint
      if (y - top > maxDistance) {
        top = y - maxDistance;
      }
    }

    // Ensure tooltip doesn't go off the top edge of viewport
    if (top < viewportOffset) {
      top = viewportOffset;
    }

    setPosition({ left, top });
  }, [visible, x, y, maxDistance]);

  if (!visible) return null;

  return (
    <View
      ref={tooltipRef}
      position="fixed"
      left={`${position.left}px`}
      top={`${position.top}px`}
      backgroundColor="color.white"
      padding="12px 16px"
      borderRadius="8px"
      boxShadow="0px 12px 24px rgba(15, 23, 42, 0.18)"
      border="1px solid color.gray.200"
      fontSize="14px"
      display="flex"
      flexDirection="column"
      pointerEvents="none"
      zIndex={10}
      {...views?.tooltip}
    >
      {content}
    </View>
  );
};
