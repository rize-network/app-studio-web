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
  padding: '16px',
  backgroundColor: 'color-white',
  borderRadius: '12px',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

// Default styles for chart title
export const ChartTitleStyles: ViewProps = {
  fontSize: '20px',
  fontWeight: '700',
  marginBottom: '24px',
  textAlign: 'left',
  color: 'color-gray-900',
};

// Default styles for chart legend
export const ChartLegendStyles: ViewProps = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  marginTop: '16px',
  gap: '12px',
};

// Default styles for legend items
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

// Default styles for legend color indicator
export const LegendColorStyles: ViewProps = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  marginRight: '8px',
};

// Default styles for legend text
export const LegendTextStyles: ViewProps = {
  fontSize: '13px',
  fontWeight: '500',
  color: 'color-gray-600',
};

// Default styles for tooltip with glassmorphism
export const TooltipStyles: ViewProps = {
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(12px)',
  padding: '12px 16px',
  borderRadius: '10px',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  pointerEvents: 'none',
  zIndex: 50,
  transition: 'all 0.1s ease-out',
};

// Default styles for chart grid
export const GridStyles: ViewProps = {
  stroke: 'color-gray-100',
  strokeWidth: '1px',
  strokeDasharray: '4 4',
};

// Default styles for chart axis
export const AxisStyles: ViewProps = {
  stroke: 'color-gray-200',
  strokeWidth: '1px',
};

// Default styles for axis labels
export const AxisLabelStyles: ViewProps = {
  fontSize: '12px',
  fill: 'color-gray-500',
  fontWeight: '500',
};

// Default styles for bar chart bars
export const BarStyles: ViewProps = {
  rx: '4px',
  ry: '4px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  _hover: {
    filter: 'brightness(1.1)',
  },
};

// Default styles for line chart lines
export const LineStyles: ViewProps = {
  strokeWidth: '3px',
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  transition: 'stroke-width 0.2s ease',
};

// Default styles for line chart points
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

// Default styles for pie chart slices
export const PieSliceStyles: ViewProps = {
  strokeWidth: '2px',
  stroke: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  _hover: {
    transform: 'scale(1.02)',
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
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(4px)',
  borderRadius: '12px',
  zIndex: 10,
  padding: '24px',
  textAlign: 'center',
};

// Default styles for loading overlay
export const LoadingOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
};

// Default styles for error overlay
export const ErrorOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
  backgroundColor: 'rgba(254, 242, 242, 0.8)',
  color: 'color-red-600',
};

// Default styles for no data overlay
export const NoDataOverlayStyles: ViewProps = {
  ...OverlayBaseStyles,
  backgroundColor: 'rgba(249, 250, 251, 0.8)',
  color: 'color-gray-500',
};
