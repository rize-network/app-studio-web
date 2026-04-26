import React, { useEffect, useRef, useState } from 'react';
import { View, ViewProps } from 'app-studio';
import { TooltipStyles } from './Chart.style';
// Defines the shape of properties accepted by the ChartTooltip component.
interface ChartTooltipProps {
  // Determines whether the tooltip should be displayed.
  visible: boolean;
  // Specifies the X-coordinate for positioning the tooltip's anchor.
  x: number;
  // Specifies the Y-coordinate for positioning the tooltip's anchor.
  y: number;
  // The content to be rendered inside the tooltip.
  content: React.ReactNode;
  // An optional property indicating the maximum distance from the anchor point (not directly used in this code snippet).
  maxDistance?: number;
  // An optional object to pass custom props to internal View components.
  views?: {
    // Optional props to apply to the main tooltip View component.
    tooltip?: ViewProps;
  };
}
// The ChartTooltip component displays a customizable tooltip at specified coordinates, adjusting its position to stay within the viewport.
export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  // Destructures the 'visible' prop from ChartTooltipProps.
  visible,
  // Destructures the 'x' prop from ChartTooltipProps.
  x,
  // Destructures the 'y' prop from ChartTooltipProps.
  y,
  // Destructures the 'content' prop from ChartTooltipProps.
  content,
  // Destructures the 'maxDistance' prop, providing a default value if not specified.
  maxDistance = 100,
  // Destructures the 'views' prop from ChartTooltipProps.
  views,
}) => {
  // Creates a ref to attach to the tooltip's DOM element for direct measurements.
  const tooltipRef = useRef<HTMLDivElement>(null);
  // Initializes state to store the calculated `left` and `top` CSS positions of the tooltip.
  const [position, setPosition] = useState({ left: 0, top: 0 });
  // A React hook to recalculate and update the tooltip's position whenever its visibility or coordinates change.
  useEffect(() => {
    // Exits the effect if the tooltip is not visible or the ref to its DOM element is not yet available.
    if (!visible || !tooltipRef.current) return;
    // Gets the current DOM element of the tooltip.
    const tooltip = tooltipRef.current;
    // Obtains the size and position of the tooltip relative to the viewport.
    const tooltipRect = tooltip.getBoundingClientRect();
    // Determines the tooltip's width, falling back to 200px if not available.
    const tooltipWidth = tooltipRect.width || 200;
    // Determines the tooltip's height, falling back to 100px if not available.
    const tooltipHeight = tooltipRect.height || 100;
    // Defines a spacing offset for positioning the tooltip relative to its anchor point.
    const offset = 20;
    // Defines a padding value to keep the tooltip away from the viewport edges.
    const viewportPadding = 16;
    // Calculates the initial horizontal position to center the tooltip around the `x` coordinate.
    let left = x - tooltipWidth / 2;
    // Calculates the initial vertical position, placing the tooltip above the `y` coordinate.
    let top = y - tooltipHeight - offset;
    // Checks if the tooltip's calculated top position is too high (collides with the top viewport padding).
    if (top < viewportPadding) {
      // If the tooltip is too high, repositions it to appear below the `y` coordinate.
      top = y + offset;
    }
    // Checks if the tooltip extends beyond the right edge of the viewport.
    if (left + tooltipWidth > window.innerWidth - viewportPadding) {
      // Adjusts the `left` position to ensure the tooltip remains within the right viewport boundary.
      left = window.innerWidth - tooltipWidth - viewportPadding;
      // Checks if the tooltip extends beyond the left edge of the viewport.
    } else if (left < viewportPadding) {
      // Adjusts the `left` position to ensure the tooltip remains within the left viewport boundary.
      left = viewportPadding;
    }
    // Clamps the `top` position to ensure the tooltip stays within the vertical viewport boundaries.
    top = Math.max(
      viewportPadding,
      Math.min(top, window.innerHeight - tooltipHeight - viewportPadding)
    );
    // Updates the component's state with the final calculated `left` and `top` positions, triggering a re-render.
    setPosition({ left, top });
    // Dependencies array for `useEffect`, ensuring the position recalculation runs when `visible`, `x`, or `y` change.
  }, [visible, x, y]);
  // If the `visible` prop is false, the component renders nothing.
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
