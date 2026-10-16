import { ViewProps } from 'app-studio';
import {
  ChartType,
  ChartData,
  ChartDataPoint,
  ChartStyles,
} from './Chart.type';
// Defines the properties for the Chart component, extending basic view properties and omitting its own animationDuration property.
export interface ChartProps extends Omit<ViewProps, 'animationDuration'> {
  // Specifies the type of chart to be rendered (e.g., bar, line, pie).
  type: ChartType;
  // Optional primary data structure for the chart, typically used for simpler charts.
  data?: ChartData;
  // Optional array of individual data points for the chart, offering more granular data representation.
  dataPoints?: ChartDataPoint[];
  // Optional title to display above the chart.
  title?: string;
  // Determines whether the chart legend should be visible.
  showLegend?: boolean;
  // Specifies the position of the chart legend when `showLegend` is true.
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  // Determines whether grid lines should be displayed on the chart.
  showGrid?: boolean;
  // Determines whether interactive tooltips should appear on hover.
  showTooltips?: boolean;
  // Enables or disables animation for the chart's rendering or updates.
  animated?: boolean;
  // Sets the duration of chart animations in milliseconds.
  animationDuration?: number;
  // Determines if the chart should resize automatically to fit its container.
  responsive?: boolean;
  // Defines the aspect ratio (width / height) of the chart when `responsive` is true.
  aspectRatio?: number;
  // Specifies the fixed width of the chart. Can be a number (pixels) or a string (e.g., '100%').
  width?: number | string;
  // Specifies the fixed height of the chart. Can be a number (pixels) or a string (e.g., '100%').
  height?: number | string;
  // Optional styles object to customize the appearance of different chart elements.
  views?: ChartStyles;
  // Callback function triggered when a data point on the chart is clicked.
  onDataPointClick?: (dataPoint: ChartDataPoint | null, index: number) => void;
  // Callback function triggered when a data series (e.g., a line in a line chart) is clicked.
  onSeriesClick?: (seriesName: string, index: number) => void;
  // Indicates if the chart is currently loading data.
  isLoading?: boolean;
  // Optional error message or component to display when an error occurs.
  error?: React.ReactNode;
  // Determines if a 'no data' message should be shown, or provides a custom component for it.
  noData?: boolean | React.ReactNode;
  // Optional custom component to display as a loading indicator.
  loadingIndicator?: React.ReactNode;
  // Optional custom component to display when an error occurs.
  errorIndicator?: React.ReactNode;
  // Optional custom component to display when there is no data.
  noDataIndicator?: React.ReactNode;
  // Provides an accessible label for the chart component, used by screen readers.
  'aria-label'?: string;
}
