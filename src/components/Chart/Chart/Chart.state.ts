import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ChartData, ChartDataPoint } from './Chart.type';
import { DEFAULT_COLORS } from './Chart.style';

export interface ChartStateProps {
  data?: ChartData;
  dataPoints?: ChartDataPoint[];
  animated?: boolean;
  animationDuration?: number;
  showTooltips?: boolean;
}

export const useChartState = ({
  data,
  dataPoints,
  animated = true,
  animationDuration = 500,
  showTooltips = true,
}: ChartStateProps) => {
  // State for animation progress (0 to 1)
  const [animationProgress, setAnimationProgress] = useState(animated ? 0 : 1);

  // State for tooltip
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: ReactNode;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  // Reference to animation frame
  const animationRef = useRef<number | null>(null);

  // Reference to chart container
  const containerRef = useRef<HTMLDivElement>(null);

  // Reference to delayed tooltip hide timer
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

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

  useEffect(() => {
    return () => {
      clearHideTimer();
    };
  }, [clearHideTimer]);

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

  // Handle tooltip show
  const showTooltip = useCallback(
    (x: number, y: number, content: ReactNode) => {
      if (!showTooltips) return;

      clearHideTimer();
      setTooltip({
        visible: true,
        x,
        y,
        content,
      });
    },
    [showTooltips, clearHideTimer]
  );

  // Handle tooltip hide
  const hideTooltip = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      setTooltip((prev) => ({
        ...prev,
        visible: false,
      }));
      hideTimerRef.current = null;
    }, 150);
  }, [clearHideTimer]);

  const hideTooltipImmediate = useCallback(() => {
    clearHideTimer();
    setTooltip((prev) => ({
      ...prev,
      visible: false,
    }));
  }, [clearHideTimer]);

  const cancelHideTooltip = useCallback(() => {
    clearHideTimer();
  }, [clearHideTimer]);

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
    hideTooltipImmediate,
    cancelHideTooltip,
    getChartDimensions,
  };
};
