import React, { useMemo } from 'react';
import { View, useTheme } from 'app-studio';
import { Text } from 'app-studio';
import { ChartData } from './Chart.type';
import {
  BarStyles,
  AxisStyles,
  AxisLabelStyles,
  GridStyles,
} from './Chart.style';
// Defines the shape of props accepted by the BarChart component.
interface BarChartProps {
  // The chart's data, including series values and labels.
  data: ChartData;
  // The overall width of the SVG container for the chart.
  width: number;
  // The overall height of the SVG container for the chart.
  height: number;
  // A value (0-1) representing the animation progress, used to animate bar heights.
  animationProgress: number;
  // Optional flag to determine if the horizontal grid lines should be displayed.
  showGrid?: boolean;
  // Optional callback function triggered when a bar is clicked, providing series name and data index.
  onBarClick?: (seriesName: string, index: number) => void;
  // Function to display a custom tooltip at given screen coordinates with specified content.
  showTooltip: (x: number, y: number, content: React.ReactNode) => void;
  // Function to hide the currently active tooltip.
  hideTooltip: () => void;
  // Optional object to provide custom styles or overrides for different chart elements.
  views?: any;
}
// The BarChart functional component, responsible for rendering a bar chart using SVG elements.
export const BarChart: React.FC<BarChartProps> = ({
  data,
  width,
  height,
  animationProgress,
  showGrid = true,
  onBarClick,
  showTooltip,
  hideTooltip,
  views,
}) => {
  // Hook to access theme-related utilities, specifically a function to retrieve colors.
  const { getColor } = useTheme();
  // Defines the internal padding for the chart area within the SVG canvas.
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  // Calculates the effective width available for drawing the chart bars and axes, considering padding.
  const chartWidth = width - padding.left - padding.right;
  // Calculates the effective height available for drawing the chart bars and axes, considering padding.
  const chartHeight = height - padding.top - padding.bottom;
  // Memoized calculation of the maximum data value across all series, used for Y-axis scaling.
  const maxValue = useMemo(() => {
    let max = 0;
    data.series.forEach((series) => {
      series.data.forEach((value) => {
        max = Math.max(max, value);
      });
    });
    return max;
  }, [data]);
  // Determines the total number of categories (bar groups) based on the provided labels.
  const barCount = data.labels.length;
  // Determines the total number of data series to be displayed in the chart.
  const seriesCount = data.series.length;
  // Calculates the width allocated for each group of bars (one for each label on the X-axis).
  const groupWidth = chartWidth / barCount;
  // Calculates the width of an individual bar within a bar group.
  const barWidth = (groupWidth * 0.8) / seriesCount;
  // Calculates the spacing between individual bars within a single bar group.
  const barSpacing = (groupWidth * 0.2) / (seriesCount + 1);
  // Ensures the maximum value for scaling is at least 10, preventing issues with zero or very small data ranges.
  const effectiveMaxValue = maxValue || 10;
  // Memoized calculation of the values for Y-axis tick marks.
  const yAxisTicks = useMemo(() => {
    const tickCount = 5;
    const ticks: any[] = [];
    for (let i = 0; i <= tickCount; i++) {
      const value = (effectiveMaxValue / tickCount) * i;
      ticks.push(value);
    }
    return ticks;
  }, [maxValue]);
  return (
    <svg width={width} height={height}>
      <defs>
        {data.series.map((series, index) => {
          const color = series.color ? getColor(series.color) : 'black';
          return (
            <linearGradient
              key={`bar-gradient-${index}`}
              id={`bar-gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.7} />
            </linearGradient>
          );
        })}
      </defs>
      {}
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        {...AxisStyles}
        {...views?.axis}
      />
      {}
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={height - padding.bottom}
        {...AxisStyles}
        {...views?.axis}
      />
      {}
      {data.labels.map((label, index) => {
        const x = padding.left + (index + 0.5) * groupWidth;
        const y = height - padding.bottom + 20;
        return (
          <text
            key={`x-label-${index}`}
            x={x}
            y={y}
            textAnchor="middle"
            {...AxisLabelStyles}
            {...views?.axisLabel}
          >
            {label}
          </text>
        );
      })}
      {}
      {yAxisTicks.map((tick, index) => {
        const y =
          height - padding.bottom - (tick / effectiveMaxValue) * chartHeight;
        return (
          <React.Fragment key={`y-tick-${index}`}>
            <text
              x={padding.left - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              {...AxisLabelStyles}
              {...views?.axisLabel}
            >
              {tick.toFixed(0)}
            </text>
            {showGrid && (
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                {...GridStyles}
                {...views?.grid}
              />
            )}
          </React.Fragment>
        );
      })}
      {}
      {data.series.map((series, seriesIndex) => {
        if ((series as any).hidden) return null;
        return (
          <React.Fragment key={`series-${seriesIndex}`}>
            {series.data.map((value, dataIndex) => {
              const barHeight =
                (value / effectiveMaxValue) * chartHeight * animationProgress;
              const x =
                padding.left +
                dataIndex * groupWidth +
                barSpacing * (seriesIndex + 1) +
                barWidth * seriesIndex;
              const y = height - padding.bottom - barHeight;
              const categoryLabel = data.labels[dataIndex];
              const categoryTotal = data.series.reduce((sum, currentSeries) => {
                const seriesValue = currentSeries.data[dataIndex];
                return (
                  sum + (typeof seriesValue === 'number' ? seriesValue : 0)
                );
              }, 0);
              const sharePercentage =
                categoryTotal > 0
                  ? ((value / categoryTotal) * 100).toFixed(1)
                  : null;
              const fillColor = series.color ? getColor(series.color) : 'black';
              const handleMouseMove = (e: React.MouseEvent) => {
                const tooltipContent = (
                  <View display="flex" flexDirection="column" minWidth="180px">
                    <View
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text fontWeight="semibold">{series.name}</Text>
                      <View
                        width="12px"
                        height="12px"
                        borderRadius="2px"
                        backgroundColor={fillColor}
                      />
                    </View>
                    <Text
                      marginTop="4px"
                      color="color-gray-500"
                      fontSize="12px"
                    >
                      {categoryLabel}
                    </Text>
                    <View marginTop="8px" display="flex" flexDirection="column">
                      <View display="flex" justifyContent="space-between">
                        <Text color="color-gray-500">Value</Text>
                        <Text fontWeight="medium">
                          {value.toLocaleString()}
                        </Text>
                      </View>
                      {sharePercentage !== null && (
                        <View
                          marginTop="4px"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Text color="color-gray-500">Share</Text>
                          <Text fontWeight="medium">{`${sharePercentage}%`}</Text>
                        </View>
                      )}
                      <View
                        marginTop="4px"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Text color="color-gray-500">Category total</Text>
                        <Text fontWeight="medium">
                          {categoryTotal.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
                const rect = (
                  e.currentTarget as SVGElement
                ).getBoundingClientRect();
                const screenX = rect.left + rect.width / 2;
                const screenY = rect.top;
                showTooltip(screenX, screenY, tooltipContent);
              };
              const handleClick = () => {
                if (onBarClick) {
                  onBarClick(series.name, dataIndex);
                }
              };
              return (
                <rect
                  key={`bar-${seriesIndex}-${dataIndex}`}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={`url(#bar-gradient-${seriesIndex})`}
                  onMouseEnter={handleMouseMove}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={hideTooltip}
                  onClick={handleClick}
                  {...BarStyles}
                  {...views?.bar}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </svg>
  );
};
