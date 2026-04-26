import React, { useEffect, useRef, useState } from 'react';
import { View, ViewProps } from 'app-studio';
import { TooltipStyles } from './Chart.style';

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
    const tooltipWidth = tooltipRect.width || 200; // Fallback width
    const tooltipHeight = tooltipRect.height || 100; // Fallback height

    const offset = 20;
    const viewportPadding = 16;

    // Default: above the element and centered horizontally
    let left = x - tooltipWidth / 2;
    let top = y - tooltipHeight - offset;

    // Smart flip - Vertical (if not enough space above, flip below)
    if (top < viewportPadding) {
      top = y + offset;
    }

    // Smart flip - Horizontal (if going off screen right/left)
    if (left + tooltipWidth > window.innerWidth - viewportPadding) {
      left = window.innerWidth - tooltipWidth - viewportPadding;
    } else if (left < viewportPadding) {
      left = viewportPadding;
    }

    // Final safety clamps
    top = Math.max(
      viewportPadding,
      Math.min(top, window.innerHeight - tooltipHeight - viewportPadding)
    );

    setPosition({ left, top });
  }, [visible, x, y]);

  if (!visible) return null;

  return (
    <View
      ref={tooltipRef}
      position="fixed"
      left={`${position.left}px`}
      top={`${position.top}px`}
      {...TooltipStyles}
      {...views?.tooltip}
      style={{
        ...TooltipStyles?.style,
        pointerEvents: 'none',
        transition: 'all 0.1s ease-out',
      }}
    >
      {content}
    </View>
  );
};
