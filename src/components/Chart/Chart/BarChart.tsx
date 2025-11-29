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

interface BarChartProps {
  data: ChartData;
  width: number;
  height: number;
  animationProgress: number;
  showGrid?: boolean;
  onBarClick?: (seriesName: string, index: number) => void;
  showTooltip: (x: number, y: number, content: React.ReactNode) => void;
  hideTooltip: () => void;
  views?: any;
}

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
  const { getColor } = useTheme();
  // Calculate chart dimensions
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find the maximum value in the data
  const maxValue = useMemo(() => {
    let max = 0;
    data.series.forEach((series) => {
      series.data.forEach((value) => {
        max = Math.max(max, value);
      });
    });
    return max;
  }, [data]);

  // Calculate bar width and spacing
  const barCount = data.labels.length;
  const seriesCount = data.series.length;
  const groupWidth = chartWidth / barCount;
  const barWidth = (groupWidth * 0.8) / seriesCount;
  const barSpacing = (groupWidth * 0.2) / (seriesCount + 1);

  // Generate y-axis ticks
  const yAxisTicks = useMemo(() => {
    const tickCount = 5;
    const ticks: any[] = [];

    for (let i = 0; i <= tickCount; i++) {
      const value = (maxValue / tickCount) * i;
      ticks.push(value);
    }

    return ticks;
  }, [maxValue]);

  return (
    <svg width={width} height={height}>
      {/* X-axis */}
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        {...AxisStyles}
        {...views?.axis}
      />

      {/* Y-axis */}
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={height - padding.bottom}
        {...AxisStyles}
        {...views?.axis}
      />

      {/* X-axis labels */}
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
            style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
            }}
          >
            {label}
          </text>
        );
      })}

      {/* Y-axis labels and grid lines */}
      {yAxisTicks.map((tick, index) => {
        const y = height - padding.bottom - (tick / maxValue) * chartHeight;

        return (
          <React.Fragment key={`y-tick-${index}`}>
            <text
              x={padding.left - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              {...AxisLabelStyles}
              {...views?.axisLabel}
              style={{
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
              }}
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

      {/* Bars */}
      {data.series.map((series, seriesIndex) => (
        <React.Fragment key={`series-${seriesIndex}`}>
          {series.data.map((value, dataIndex) => {
            const barHeight =
              (value / maxValue) * chartHeight * animationProgress;
            const x =
              padding.left +
              dataIndex * groupWidth +
              barSpacing * (seriesIndex + 1) +
              barWidth * seriesIndex;
            const y = height - padding.bottom - barHeight;

            const categoryLabel = data.labels[dataIndex];
            const categoryTotal = data.series.reduce((sum, currentSeries) => {
              const seriesValue = currentSeries.data[dataIndex];
              return sum + (typeof seriesValue === 'number' ? seriesValue : 0);
            }, 0);
            const sharePercentage =
              categoryTotal > 0
                ? ((value / categoryTotal) * 100).toFixed(1)
                : null;
            const fillColor = series.color ? getColor(series.color) : 'black';

            const handleMouseEnter = (e: React.MouseEvent) => {
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
                  <Text marginTop="4px" color="color.gray.500" fontSize="12px">
                    {categoryLabel}
                  </Text>
                  <View marginTop="8px" display="flex" flexDirection="column">
                    <View display="flex" justifyContent="space-between">
                      <Text color="color.gray.500">Value</Text>
                      <Text fontWeight="medium">{value.toLocaleString()}</Text>
                    </View>
                    {sharePercentage !== null && (
                      <View
                        marginTop="4px"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Text color="color.gray.500">Share</Text>
                        <Text fontWeight="medium">{`${sharePercentage}%`}</Text>
                      </View>
                    )}
                    <View
                      marginTop="4px"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text color="color.gray.500">Category total</Text>
                      <Text fontWeight="medium">
                        {categoryTotal.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              );

              showTooltip(e.clientX, e.clientY, tooltipContent);
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
                fill={fillColor}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={hideTooltip}
                onClick={handleClick}
                {...BarStyles}
                {...views?.bar}
              />
            );
          })}
        </React.Fragment>
      ))}
    </svg>
  );
};
