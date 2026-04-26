import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { ChartData, ChartDataPoint } from './Chart.type';
import { DEFAULT_COLORS } from './Chart.style';
export interface ChartStateProps {
  data?: ChartData;
  dataPoints?: ChartDataPoint[];
  animated?: boolean;
  animationDuration?: number;
  showTooltips?: boolean;
}
// This file defines the `ChartStateProps` interface and implements the `useChartState` custom hook. This hook centralizes all state management and derived logic for the Chart component, including animation progress, tooltip visibility and positioning, data processing, and user interaction handlers for series toggling, offering a comprehensive and reusable state layer.
export const useChartState = ({
  data,
  dataPoints,
  animated = true,
  animationDuration = 500,
  showTooltips = true,
}: ChartStateProps) => {
  const [animationProgress, setAnimationProgress] = useState(animated ? 0 : 1);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: ReactNode;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: null,
  });
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());
  const toggleSeries = useCallback((seriesName: string) => {
    setHiddenSeries((prev) => {
      const next = new Set(prev);
      if (next.has(seriesName)) {
        next.delete(seriesName);
      } else {
        next.add(seriesName);
      }
      return next;
    });
  }, []);
  const processedData = useCallback(() => {
    if (data) {
      return {
        ...data,
        series: data.series.map((series, index) => ({
          ...series,
          color: series.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
          hidden: hiddenSeries.has(series.name),
        })),
      };
    }
    if (dataPoints) {
      return dataPoints.map((point, index) => ({
        ...point,
        color: point.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        hidden: hiddenSeries.has(point.label),
      }));
    }
    return null;
  }, [data, dataPoints, hiddenSeries]);
  const showTooltip = useCallback(
    (x: number, y: number, content: ReactNode) => {
      if (!showTooltips) return;
      setTooltip({
        visible: true,
        x,
        y,
        content,
      });
    },
    [showTooltips]
  );
  const hideTooltip = useCallback(() => {
    setTooltip((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);
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
    toggleSeries,
  };
};
