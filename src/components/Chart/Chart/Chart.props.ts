import { ViewProps } from 'app-studio';
import {
  ChartType,
  ChartData,
  ChartDataPoint,
  ChartStyles,
} from './Chart.type';

export interface ChartProps extends Omit<ViewProps, 'animationDuration'> {
  /**
   * The type of chart to render
   */
  type: ChartType;

  /**
   * Data for the chart (for multi-series charts like bar, line, area)
   */
  data?: ChartData;

  /**
   * Data points for single series charts (like pie, donut)
   */
  dataPoints?: ChartDataPoint[];

  /**
   * The title of the chart
   */
  title?: string;

  /**
   * Whether to show the legend
   */
  showLegend?: boolean;

  /**
   * Position of the legend
   */
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Whether to show grid lines
   */
  showGrid?: boolean;

  /**
   * Whether to show tooltips on hover
   */
  showTooltips?: boolean;

  /**
   * Whether the chart is animated
   */
  animated?: boolean;

  /**
   * Duration of the animation in milliseconds
   */
  animationDuration?: number;

  /**
   * Whether the chart is responsive
   */
  responsive?: boolean;

  /**
   * The aspect ratio of the chart (width/height)
   */
  aspectRatio?: number;

  /**
   * The width of the chart
   */
  width?: number | string;

  /**
   * The height of the chart
   */
  height?: number | string;

  /**
   * Custom styles for different parts of the chart
   */
  views?: ChartStyles;

  /**
   * Callback when a data point is clicked
   */
  onDataPointClick?: (dataPoint: ChartDataPoint | null, index: number) => void;

  /**
   * Callback when a series is clicked
   */
  onSeriesClick?: (seriesName: string, index: number) => void;
}
