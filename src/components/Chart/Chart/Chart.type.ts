import { ViewProps } from 'app-studio';
import React from 'react';

export type ChartType = 'bar' | 'line' | 'pie' | 'donut' | 'area';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  /** Additional metadata to display in tooltip */
  metadata?: Record<string, any>;
}

export interface ChartSeries {
  name: string;
  data: number[];
  color?: string;
  /** Additional metadata to display in tooltip */
  metadata?: Record<string, any>;
}

export interface ChartData {
  labels: string[];
  series: ChartSeries[];
}

export interface TooltipData {
  /** Series or data point name */
  name: string;
  /** Value */
  value: number;
  /** Label (for pie/donut charts) */
  label?: string;
  /** Percentage (for pie/donut charts) */
  percentage?: string;
  /** Data index */
  index: number;
  /** Color of the data point */
  color?: string;
  /** Additional metadata */
  metadata?: Record<string, any>;
}

export interface ChartStyles {
  container?: ViewProps;
  chart?: ViewProps;
  legend?: ViewProps;
  legendItem?: ViewProps;
  tooltip?: ViewProps;
  tooltipContent?: ViewProps;
  axis?: ViewProps;
  grid?: ViewProps;
  bar?: ViewProps;
  line?: ViewProps;
  point?: ViewProps;
  pie?: ViewProps;
  area?: ViewProps;
  axisLabel?: ViewProps;
  axisLine?: ViewProps;
  axisTick?: ViewProps;
  loadingOverlay?: ViewProps;
  errorOverlay?: ViewProps;
  noDataOverlay?: ViewProps;
}
