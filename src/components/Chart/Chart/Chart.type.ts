import { ViewProps } from 'app-studio';
// Defines the allowed types of charts that can be rendered, such as bar, line, pie, donut, or area.
export type ChartType = 'bar' | 'line' | 'pie' | 'donut' | 'area';
// Defines the structure for a single data point within a chart, typically used for pie or donut charts.
export interface ChartDataPoint {
  // The label or name associated with the data point.
  label: string;
  // The numerical value of the data point.
  value: number;
  // Optional color to be used for rendering this specific data point.
  color?: string;
}
// Defines the structure for a single series of data, often used in bar, line, or area charts.
export interface ChartSeries {
  // The name of the data series, displayed in legends or tooltips.
  name: string;
  // An array of numerical values representing the data points for this series.
  data: number[];
  // Optional color to be used for rendering this entire data series.
  color?: string;
}
// Defines the complete data structure required for rendering a chart, including labels and multiple series.
export interface ChartData {
  // An array of labels for the x-axis or categories.
  labels: string[];
  // An array of data series to be plotted on the chart.
  series: ChartSeries[];
}
// Defines a set of optional styling properties for different parts of the chart component using `ViewProps`.
export interface ChartStyles {
  // Styles for the primary container wrapping the entire chart.
  container?: ViewProps;
  // Styles for the main chart area where data is rendered.
  chart?: ViewProps;
  // Styles for the chart's legend component.
  legend?: ViewProps;
  // Styles for individual items within the legend.
  legendItem?: ViewProps;
  // Styles for the interactive tooltip that appears on hover.
  tooltip?: ViewProps;
  // Styles for the general appearance of chart axes.
  axis?: ViewProps;
  // Styles for the background grid lines of the chart.
  grid?: ViewProps;
  // Styles specifically for bar elements in a bar chart.
  bar?: ViewProps;
  // Styles specifically for line elements in a line chart.
  line?: ViewProps;
  // Styles for individual data points (e.g., markers on a line chart).
  point?: ViewProps;
  // Styles specifically for pie slices or donut segments.
  pie?: ViewProps;
  // Styles specifically for area fills in an area chart.
  area?: ViewProps;
  // Styles for the labels displayed on the chart axes.
  axisLabel?: ViewProps;
  // Styles for the lines representing the chart axes themselves.
  axisLine?: ViewProps;
  // Styles for the tick marks on the chart axes.
  axisTick?: ViewProps;
  // Styles for the overlay displayed when the chart data is loading.
  loadingOverlay?: ViewProps;
  // Styles for the overlay displayed when an error occurs during chart rendering.
  errorOverlay?: ViewProps;
  // Styles for the overlay displayed when there is no data to render in the chart.
  noDataOverlay?: ViewProps;
}
