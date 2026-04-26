import { ViewProps } from 'app-studio';
import { DEFAULT_CHART_COLORS } from './ChartColors';
// Exports the default color palette used for chart visualization.
export const DEFAULT_COLORS = DEFAULT_CHART_COLORS;
// Defines the base styles for the main chart container, ensuring it fills its parent and establishes a flex column layout.
export const ChartContainerStyles: ViewProps = {
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};
// Specifies styles for the chart's main title, including font size, weight, and alignment.
export const ChartTitleStyles: ViewProps = {
  fontSize: '18px',
  fontWeight: '700',
  marginBottom: '24px',
  textAlign: 'center',
  color: 'color-gray-900',
};
// Sets the display properties for the chart's legend, managing item layout and spacing.
export const ChartLegendStyles: ViewProps = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  marginTop: '16px',
  gap: '12px',
};
// Defines styles for individual items within the chart legend, including layout, padding, and hover effects.
export const LegendItemStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  _hover: {
    backgroundColor: 'color-gray-50',
  },
};
// Specifies styles for the colored indicator preceding each legend item.
export const LegendColorStyles: ViewProps = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  marginRight: '8px',
};
// Defines the textual styles for legend item labels.
export const LegendTextStyles: ViewProps = {
  fontSize: '13px',
  fontWeight: '500',
  color: 'color-gray-600',
};
// Provides styling for the interactive tooltips displayed on hover, including positioning, background, and shadow.
export const TooltipStyles: ViewProps = {
  position: 'absolute',
  backgroundColor: 'color-white',
  padding: '12px 16px',
  borderRadius: '8px',
  boxShadow: '0px 12px 24px rgba(15, 23, 42, 0.18)',
  border: '1px solid color-gray-200',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  pointerEvents: 'none',
  zIndex: 100,
};
// Defines styles for the grid lines within the chart, such as stroke color and pattern.
export const GridStyles: ViewProps = {
  stroke: 'color-gray-100',
  strokeWidth: '1px',
  strokeDasharray: '4 4',
};
// Specifies styles for the chart's axes lines.
export const AxisStyles: ViewProps = {
  stroke: 'color-gray-200',
  strokeWidth: '1px',
};
// Defines styles for the labels displayed along the chart's axes.
export const AxisLabelStyles: ViewProps = {
  fontSize: '12px',
  fill: 'color-gray-500',
  fontWeight: '500',
};
// Sets the visual styles for individual bars in a bar chart, including rounded corners and hover effects.
export const BarStyles: ViewProps = {
  rx: '4px',
  ry: '4px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  _hover: {
    filter: 'brightness(1.1)',
  },
};
// Defines the visual properties for lines in a line chart, such as thickness and line caps.
export const LineStyles: ViewProps = {
  strokeWidth: '3px',
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  transition: 'stroke-width 0.2s ease',
};
// Specifies styles for data points on a line or scatter chart, including size, stroke, and hover animations.
export const PointStyles: ViewProps = {
  r: '5px',
  strokeWidth: '2.5px',
  stroke: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  _hover: {
    r: '7px',
  },
};
// Defines styles for individual slices in a pie chart, including borders and hover transformation.
export const PieSliceStyles: ViewProps = {
  strokeWidth: '2px',
  stroke: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  _hover: {
    transform: 'scale(1.02)',
  },
};
// Establishes a common base style for various chart overlays, providing positioning, background, and alignment.
export const OverlayBaseStyles: ViewProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '4px',
  zIndex: 10,
  padding: '24px',
  textAlign: 'center',
};
// Applies styles for a loading indicator overlay, inheriting from `OverlayBaseStyles`.
export const LoadingOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
};
// Defines styles for an error message overlay, inheriting from `OverlayBaseStyles` and customizing colors for error display.
export const ErrorOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
  backgroundColor: 'rgba(254, 242, 242, 0.8)',
  color: 'color-red-600',
};
// Specifies styles for a 'no data' message overlay, inheriting from `OverlayBaseStyles` and customizing colors.
export const NoDataOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
  backgroundColor: 'rgba(249, 250, 251, 0.8)',
  color: 'color-gray-500',
};
