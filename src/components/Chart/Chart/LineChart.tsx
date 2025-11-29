import React, { useMemo } from 'react';
import { View, useTheme } from 'app-studio';
import { Text } from 'app-studio';
import { ChartData } from './Chart.type';
import {
  LineStyles,
  PointStyles,
  AxisStyles,
  AxisLabelStyles,
  GridStyles,
} from './Chart.style';
interface LineChartProps {
  data: ChartData;
  width: number;
  height: number;
  animationProgress: number;
  showGrid?: boolean;
  onPointClick?: (seriesName: string, index: number) => void;
  showTooltip: (x: number, y: number, content: React.ReactNode) => void;
  hideTooltip: () => void;
  views?: any;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width,
  height,
  animationProgress,
  showGrid = true,
  onPointClick,
  showTooltip,
  hideTooltip,
  views,
}) => {
  // Calculate chart dimensions
  const { getColor } = useTheme();

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

  // Generate y-axis ticks
  const yAxisTicks = useMemo(() => {
    const tickCount = 5;
    const ticks: number[] = [];

    for (let i = 0; i <= tickCount; i++) {
      const value: number = (maxValue / tickCount) * i;
      ticks.push(value);
    }

    return ticks;
  }, [maxValue]);

  // Generate path for each series
  const generatePath = (series: number[]) => {
    const points = series.map((value, index) => {
      const x = padding.left + (index / (data.labels.length - 1)) * chartWidth;
      const y =
        height -
        padding.bottom -
        (value / maxValue) * chartHeight * animationProgress;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  // Generate area path for each series (for area charts)
  const generateAreaPath = (series: number[]) => {
    const startX = padding.left;
    const endX = padding.left + chartWidth;
    const baseY = height - padding.bottom;

    const points = series.map((value, index) => {
      const x = padding.left + (index / (data.labels.length - 1)) * chartWidth;
      const y =
        height -
        padding.bottom -
        (value / maxValue) * chartHeight * animationProgress;
      return `${x},${y}`;
    });

    return `M ${startX},${baseY} L ${points.join(' L ')} L ${endX},${baseY} Z`;
  };

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
        const x =
          padding.left + (index / (data.labels.length - 1)) * chartWidth;
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

      {/* Lines and points */}
      {data.series.map((series, seriesIndex) => {
        const lineColor = series.color ? getColor(series.color) : 'black';

        return (
          <React.Fragment key={`series-${seriesIndex}`}>
            {/* Area fill (if needed) */}
            <path
              d={generateAreaPath(series.data)}
              fill={lineColor}
              opacity={0.1}
              {...views?.area}
            />

            {/* Line */}
            <path
              d={generatePath(series.data)}
              stroke={lineColor}
              {...LineStyles}
              {...views?.line}
            />

            {/* Points */}
            {series.data.map((value, dataIndex) => {
              const x =
                padding.left +
                (dataIndex / (data.labels.length - 1)) * chartWidth;
              const y =
                height -
                padding.bottom -
                (value / maxValue) * chartHeight * animationProgress;

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
              const previousValue =
                dataIndex > 0 && typeof series.data[dataIndex - 1] === 'number'
                  ? series.data[dataIndex - 1]
                  : null;
              const deltaValue =
                typeof previousValue === 'number'
                  ? value - previousValue
                  : null;
              const formattedDelta =
                typeof deltaValue === 'number'
                  ? `${
                      deltaValue >= 0 ? '+' : ''
                    }${deltaValue.toLocaleString()}`
                  : null;

              const handleMouseEnter = (e: React.MouseEvent) => {
                const tooltipContent = (
                  <View display="flex" flexDirection="column" minWidth="200px">
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
                        backgroundColor={lineColor}
                      />
                    </View>
                    <Text
                      marginTop="4px"
                      color="color.gray.500"
                      fontSize="12px"
                    >
                      {categoryLabel}
                    </Text>
                    <View marginTop="8px" display="flex" flexDirection="column">
                      <View display="flex" justifyContent="space-between">
                        <Text color="color.gray.500">Value</Text>
                        <Text fontWeight="medium">
                          {value.toLocaleString()}
                        </Text>
                      </View>
                      {formattedDelta !== null && (
                        <View
                          marginTop="4px"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Text color="color.gray.500">Change</Text>
                          <Text fontWeight="medium">{formattedDelta}</Text>
                        </View>
                      )}
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
                if (onPointClick) {
                  onPointClick(series.name, dataIndex);
                }
              };

              return (
                <circle
                  key={`point-${seriesIndex}-${dataIndex}`}
                  cx={x}
                  cy={y}
                  fill={lineColor}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={hideTooltip}
                  onClick={handleClick}
                  {...PointStyles}
                  {...views?.point}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </svg>
  );
};
