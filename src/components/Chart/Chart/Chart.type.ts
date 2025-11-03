import type { ReactNode } from 'react';
import { ViewProps } from 'app-studio';

export type ChartType = 'bar' | 'line' | 'pie' | 'donut' | 'area';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface ChartData {
  labels: string[];
  series: ChartSeries[];
}

export interface ChartTooltipContext {
  type: ChartType;
  /**
   * Label associated with the data point (typically the x-axis label)
   */
  label: string;
  /**
   * Value of the hovered data point
   */
  value: number;
  /**
   * Index of the hovered data point within its series/data set
   */
  dataIndex?: number;
  /**
   * Name of the series (for multi-series charts)
   */
  seriesName?: string;
  /**
   * Index of the series (for multi-series charts)
   */
  seriesIndex?: number;
  /**
   * Percentage representation (for pie/donut charts)
   */
  percentage?: number;
  /**
   * Raw data point reference (useful for pie/donut charts)
   */
  dataPoint?: ChartDataPoint;
}

export type ChartTooltipFormatter = (context: ChartTooltipContext) => ReactNode;

export interface ChartStyles {
  container?: ViewProps;
  chart?: ViewProps;
  legend?: ViewProps;
  legendItem?: ViewProps;
  tooltip?: ViewProps;
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
