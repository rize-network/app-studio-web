import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { ChartData, ChartDataPoint, TooltipData } from './Chart.type';
import { DEFAULT_COLORS } from './Chart.style';

export interface ChartStateProps {
  data?: ChartData;
  dataPoints?: ChartDataPoint[];
  animated?: boolean;
  animationDuration?: number;
  showTooltips?: boolean;
  tooltipOpenDelay?: number;
  tooltipCloseDelay?: number;
}

export const useChartState = ({
  data,
  dataPoints,
  animated = true,
  animationDuration = 500,
  showTooltips = true,
  tooltipOpenDelay = 100,
  tooltipCloseDelay = 100,
}: ChartStateProps) => {
  // State for animation progress (0 to 1)
  const [animationProgress, setAnimationProgress] = useState(animated ? 0 : 1);

  // State for tooltip
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: React.ReactNode;
    data: TooltipData | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: null,
    data: null,
  });

  // Reference to animation frame
  const animationRef = useRef<number | null>(null);

  // Reference to chart container
  const containerRef = useRef<HTMLDivElement>(null);

  // References for tooltip timers (similar to HoverCard)
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle animation
  useEffect(() => {
    if (!animated) {
      setAnimationProgress(1);
      return;
    }

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setAnimationProgress(progress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, animationDuration]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // Process data for charts
  const processedData = useCallback(() => {
    if (data) {
      return {
        ...data,
        series: data.series.map((series, index) => ({
          ...series,
          color: series.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        })),
      };
    }

    if (dataPoints) {
      return dataPoints.map((point, index) => ({
        ...point,
        color: point.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      }));
    }

    return null;
  }, [data, dataPoints]);

  // Handle tooltip show with delay (similar to HoverCard)
  const showTooltip = useCallback(
    (x: number, y: number, content: React.ReactNode, tooltipData: TooltipData) => {
      if (!showTooltips) return;

      // Clear any pending close timer
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      // Clear any pending open timer
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }

      // Set timer to show tooltip after delay
      openTimerRef.current = setTimeout(() => {
        setTooltip({
          visible: true,
          x,
          y,
          content,
          data: tooltipData,
        });
      }, tooltipOpenDelay);
    },
    [showTooltips, tooltipOpenDelay]
  );

  // Handle tooltip hide with delay (similar to HoverCard)
  const hideTooltip = useCallback(() => {
    // Clear any pending open timer
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    // Clear any pending close timer
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    // Set timer to hide tooltip after delay
    closeTimerRef.current = setTimeout(() => {
      setTooltip((prev) => ({
        ...prev,
        visible: false,
      }));
    }, tooltipCloseDelay);
  }, [tooltipCloseDelay]);

  // Calculate chart dimensions
  const getChartDimensions = useCallback(() => {
    if (!containerRef.current) {
      return { width: 0, height: 0 };
    }

    const { width, height } = containerRef.current.getBoundingClientRect();
    return { width, height };
  }, []);

  return {
    animationProgress,
    tooltip,
    containerRef,
    processedData,
    showTooltip,
    hideTooltip,
    getChartDimensions,
  };
};
