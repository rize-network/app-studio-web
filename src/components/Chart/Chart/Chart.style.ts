import { ViewProps } from 'app-studio';
import { DEFAULT_CHART_COLORS } from './ChartColors';

// Default colors for chart series
export const DEFAULT_COLORS = DEFAULT_CHART_COLORS;

// Default styles for chart container
export const ChartContainerStyles: ViewProps = {
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};

// Default styles for chart title
export const ChartTitleStyles: ViewProps = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '16px',
  textAlign: 'center',
};

// Default styles for chart legend
export const ChartLegendStyles: ViewProps = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '16px',
};

// Default styles for legend items
export const LegendItemStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '16px',
  marginBottom: '8px',
};

// Default styles for legend color indicator
export const LegendColorStyles: ViewProps = {
  width: '12px',
  height: '12px',
  borderRadius: '2px',
  marginRight: '6px',
};

// Default styles for legend text
export const LegendTextStyles: ViewProps = {
  fontSize: '14px',
};

// Default styles for tooltip
export const TooltipStyles: ViewProps = {
  position: 'absolute',
  backgroundColor: 'color.white',
  padding: '8px 12px',
  borderRadius: '4px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  fontSize: '14px',
  pointerEvents: 'none',
  zIndex: 10,
};

// Default styles for chart grid
export const GridStyles: ViewProps = {
  stroke: 'color.gray.200',
  strokeWidth: '1px',
};

// Default styles for chart axis
export const AxisStyles: ViewProps = {
  stroke: 'color.gray.300',
  strokeWidth: '1px',
};

// Default styles for axis labels
export const AxisLabelStyles: ViewProps = {
  fontSize: '12px',
  fill: 'color.gray.600',
};

// Default styles for bar chart bars
export const BarStyles: ViewProps = {
  rx: '2px',
  ry: '2px',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  _hover: {
    opacity: 0.8,
  },
};

// Default styles for line chart lines
export const LineStyles: ViewProps = {
  strokeWidth: '2px',
  fill: 'none',
};

// Default styles for line chart points
export const PointStyles: ViewProps = {
  r: '4px',
  strokeWidth: '2px',
  stroke: 'white',
  cursor: 'pointer',
  transition: 'r 0.2s ease',
};

// Default styles for pie chart slices
export const PieSliceStyles: ViewProps = {
  strokeWidth: '1px',
  stroke: 'white',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  _hover: {
    opacity: 0.8,
  },
};

// Default styles for overlay base (shared by loading, error, no data)
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
  padding: '16px',
  textAlign: 'center',
};

// Default styles for loading overlay
export const LoadingOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
};

// Default styles for error overlay
export const ErrorOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
  backgroundColor: 'rgba(255, 235, 238, 0.9)',
  color: 'color.red.700',
};

// Default styles for no data overlay
export const NoDataOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
  backgroundColor: 'rgba(245, 245, 245, 0.8)',
  color: 'color.gray.600',
};
