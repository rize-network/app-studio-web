import React, { useMemo, useRef, useEffect } from 'react';
import { useTheme, useElementPosition, View } from 'app-studio';
import { Text } from 'app-studio';
import { ChartDataPoint } from './Chart.type';
import { PieSliceStyles, DEFAULT_COLORS } from './Chart.style';
// Defines the shape of props accepted by the PieChart component, ensuring type safety and clarity for component usage.
interface PieChartProps {
  // An array of data points, where each point contains information like value, label, and an optional color, used to render the pie slices.
  dataPoints: ChartDataPoint[];
  // The width of the SVG container for the pie chart.
  width: number;
  // The height of the SVG container for the pie chart.
  height: number;
  // A value between 0 and 1 indicating the current progress of any animation, used to incrementally draw the chart.
  animationProgress: number;
  // Optional boolean to determine if the chart should be rendered as a donut chart (with a hole in the center) or a standard pie chart.
  isDonut?: boolean;
  // Optional callback function triggered when a pie slice is clicked, receiving the clicked data point and its index.
  onSliceClick?: (dataPoint: ChartDataPoint, index: number) => void;
  // A function to display a tooltip at specific screen coordinates with given content, used for interactive slice details.
  showTooltip: (x: number, y: number, content: React.ReactNode) => void;
  // A function to hide the currently displayed tooltip.
  hideTooltip: () => void;
  // Optional property for custom view configurations, allowing for dynamic styling or behavior modifications.
  views?: any;
}
// The main functional component for rendering a Pie Chart or Donut Chart, displaying data points as proportional slices. It handles rendering logic, interactivity, and animation.
export const PieChart: React.FC<PieChartProps> = ({
  dataPoints,
  width,
  height,
  animationProgress,
  isDonut = false,
  onSliceClick,
  showTooltip,
  hideTooltip,
  views,
}) => {
  // Accesses the `getColor` utility from the `useTheme` hook to resolve colors based on the application's theme.
  const { getColor } = useTheme();
  // Utilizes the `useElementPosition` hook to track the position and dimensions of the chart's SVG element, which is crucial for accurate tooltip positioning.
  const { ref: positionRef, relation } = useElementPosition({
    trackChanges: true,
    trackOnHover: true,
    trackOnScroll: true,
    trackOnResize: true,
  });
  // Creates a ref to directly access the SVG element of the chart for DOM manipulations, such as getting its bounding client rectangle.
  const chartRef = useRef<SVGSVGElement>(null);
  // An effect hook that assigns the `chartRef.current` (the SVG element) to the `positionRef.current` from `useElementPosition` once the component mounts or `chartRef`/`positionRef` change, linking the SVG to position tracking.
  useEffect(() => {
    if (chartRef.current && positionRef) {
      (positionRef as any).current = chartRef.current;
    }
  }, [chartRef, positionRef]);
  // Calculates the effective size of the chart by taking the minimum of the provided width and height to ensure it fits within its container.
  const size = Math.min(width, height);
  // Determines the outer radius of the pie chart slices, scaled to 80% of the calculated effective size.
  const radius = (size / 2) * 0.8;
  // Calculates the x-coordinate of the center of the pie chart.
  const centerX = width / 2;
  // Calculates the y-coordinate of the center of the pie chart.
  const centerY = height / 2;
  // Calculates the inner radius for a donut chart; if `isDonut` is false, it defaults to 0, making it a standard pie chart.
  const donutRadius = isDonut ? radius * 0.6 : 0;
  // Memoizes the array of data points that are currently visible (not hidden), optimizing rendering by avoiding recalculations when unnecessary.
  const visibleDataPoints = useMemo(() => {
    return dataPoints.filter((p) => !(p as any).hidden);
  }, [dataPoints]);
  // Memoizes the sum of all values from the `visibleDataPoints`, representing the total for the pie chart.
  const total = useMemo(() => {
    return visibleDataPoints.reduce((sum, point) => sum + point.value, 0);
  }, [visibleDataPoints]);
  // Memoizes the calculation of individual pie slices, including their SVG paths, colors, labels, and angles. It handles both standard pie and donut charts, including a placeholder slice if the total value is zero.
  const slices = useMemo(() => {
    if (total === 0) {
      const path = isDonut
        ? [
            `M ${centerX} ${centerY - radius}`,
            `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY + radius}`,
            `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`,
            `M ${centerX} ${centerY - donutRadius}`,
            `A ${donutRadius} ${donutRadius} 0 1 0 ${centerX} ${
              centerY + donutRadius
            }`,
            `A ${donutRadius} ${donutRadius} 0 1 0 ${centerX} ${
              centerY - donutRadius
            }`,
            'Z',
          ].join(' ')
        : [
            `M ${centerX} ${centerY}`,
            `M ${centerX} ${centerY - radius}`,
            `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY + radius}`,
            `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`,
            'Z',
          ].join(' ');
      return [
        {
          path,
          color: '#E2E8F0',
          label: 'Total',
          value: 0,
          percentage: '0%',
          labelX: centerX,
          labelY: centerY,
          startAngle: 0,
          endAngle: Math.PI * 2,
          index: -1,
        },
      ];
    }
    const result: any[] = [];
    let startAngle = -Math.PI / 2;
    for (let i = 0; i < visibleDataPoints.length; i++) {
      const value = visibleDataPoints[i].value;
      const percentage = value / total;
      const angle = percentage * 2 * Math.PI * animationProgress;
      const gapAngle = 0.02;
      const effectiveAngle = Math.max(0, angle - gapAngle);
      const currentEndAngle = startAngle + effectiveAngle;
      const startX = centerX + Math.cos(startAngle) * radius;
      const startY = centerY + Math.sin(startAngle) * radius;
      const endX = centerX + Math.cos(currentEndAngle) * radius;
      const endY = centerY + Math.sin(currentEndAngle) * radius;
      const innerStartX = centerX + Math.cos(startAngle) * donutRadius;
      const innerStartY = centerY + Math.sin(startAngle) * donutRadius;
      const innerEndX = centerX + Math.cos(currentEndAngle) * donutRadius;
      const innerEndY = centerY + Math.sin(currentEndAngle) * donutRadius;
      const largeArcFlag = effectiveAngle > Math.PI ? 1 : 0;
      let path;
      if (isDonut) {
        path = [
          `M ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L ${innerEndX} ${innerEndY}`,
          `A ${donutRadius} ${donutRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
          'Z',
        ].join(' ');
      } else {
        path = [
          `M ${centerX} ${centerY}`,
          `L ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'Z',
        ].join(' ');
      }
      const labelAngle = startAngle + effectiveAngle / 2;
      const labelRadius = isDonut ? (radius + donutRadius) / 2 : radius * 0.7;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;
      const percentageText = `${(percentage * 100).toFixed(1)}%`;
      const colorValue =
        visibleDataPoints[i].color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      const resolvedColor = getColor(colorValue);
      result.push({
        path,
        color: resolvedColor,
        label: visibleDataPoints[i].label,
        value: visibleDataPoints[i].value,
        percentage: percentageText,
        labelX,
        labelY,
        startAngle,
        endAngle: currentEndAngle,
        index: i,
        originalIndex: dataPoints.findIndex(
          (p) => p.label === visibleDataPoints[i].label
        ),
      });
      startAngle = currentEndAngle;
    }
    return result;
  }, [
    visibleDataPoints,
    total,
    radius,
    centerX,
    centerY,
    donutRadius,
    animationProgress,
    isDonut,
    dataPoints,
  ]);
  return (
    <svg
      ref={chartRef}
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
    >
      {}
      {isDonut && (
        <g pointerEvents="none">
          <circle cx={centerX} cy={centerY} r={donutRadius} fill="white" />
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14px"
            fontWeight="500"
            fill="color-gray-500"
          >
            Total
          </text>
          <text
            x={centerX}
            y={centerY + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20px"
            fontWeight="800"
            fill="color-gray-900"
          >
            {total.toLocaleString()}
          </text>
        </g>
      )}
      {}
      {slices.map((slice, index) => {
        const handleMouseMove = (e: React.MouseEvent) => {
          const numericShare = total > 0 ? (slice.value / total) * 100 : 0;
          const remainingShare =
            total > 0 ? Math.max(0, 100 - numericShare) : null;
          const tooltipContent = (
            <View display="flex" flexDirection="column" minWidth="200px">
              <View
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontWeight="semibold">{slice.label}</Text>
                <View
                  width="12px"
                  height="12px"
                  borderRadius="2px"
                  backgroundColor={slice.color}
                />
              </View>
              <Text marginTop="4px" color="color-gray-500" fontSize="12px">
                Slice {slice.index + 1} of {visibleDataPoints.length}
              </Text>
              <View marginTop="8px" display="flex" flexDirection="column">
                <View display="flex" justifyContent="space-between">
                  <Text color="color-gray-500">Value</Text>
                  <Text fontWeight="medium">
                    {slice.value.toLocaleString()}
                  </Text>
                </View>
                <View
                  marginTop="4px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Text color="color-gray-500">Share</Text>
                  <Text fontWeight="medium">{slice.percentage}</Text>
                </View>
                <View
                  marginTop="4px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Text color="color-gray-500">Total</Text>
                  <Text fontWeight="medium">{total.toLocaleString()}</Text>
                </View>
                {remainingShare !== null && (
                  <View
                    marginTop="4px"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text color="color-gray-500">Remaining</Text>
                    <Text fontWeight="medium">
                      {`${remainingShare.toFixed(1)}%`}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
          let screenX = e.clientX;
          let screenY = e.clientY;
          if (chartRef.current) {
            const svgRect = chartRef.current.getBoundingClientRect();
            screenX = svgRect.left + slice.labelX;
            screenY = svgRect.top + slice.labelY;
          }
          showTooltip(screenX, screenY, tooltipContent);
        };
        const handleClick = () => {
          if (slice.index !== -1 && onSliceClick) {
            onSliceClick(dataPoints[slice.index], slice.index);
          }
        };
        const isPlaceholder = slice.index === -1;
        return (
          <g key={`slice-${index}`}>
            <path
              d={slice.path}
              fill={slice.color}
              onMouseEnter={!isPlaceholder ? handleMouseMove : undefined}
              onMouseMove={!isPlaceholder ? handleMouseMove : undefined}
              onMouseLeave={!isPlaceholder ? hideTooltip : undefined}
              onClick={handleClick}
              {...PieSliceStyles}
              style={{
                ...PieSliceStyles?.style,
                cursor: isPlaceholder ? 'default' : 'pointer',
              }}
              {...views?.pie}
            />
            {}
            {!isPlaceholder && slice.endAngle - slice.startAngle > 0.25 && (
              <text
                x={slice.labelX}
                y={slice.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="11px"
                fontWeight="800"
                pointerEvents="none"
                paintOrder="stroke"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="2px"
              >
                {slice.percentage}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
