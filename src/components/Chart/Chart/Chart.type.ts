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
