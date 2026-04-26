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

  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
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

  // Calculate effective max value
  const effectiveMaxValue = maxValue || 10;

  // Generate y-axis ticks
  const yAxisTicks = useMemo(() => {
    const tickCount = 5;
    const ticks: number[] = [];

    for (let i = 0; i <= tickCount; i++) {
      const value: number = (effectiveMaxValue / tickCount) * i;
      ticks.push(value);
    }

    return ticks;
  }, [maxValue]);

  // Generate path for each series with smooth curves (Cubic Bezier)
  const generatePath = (series: number[]) => {
    if (series.length < 2) return '';

    const points = series.map((value, index) => ({
      x: padding.left + (index / (data.labels.length - 1)) * chartWidth,
      y:
        height -
        padding.bottom -
        (value / effectiveMaxValue) * chartHeight * animationProgress,
    }));

    let path = `M ${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 === points.length ? i + 1 : i + 2];

      // Catmull-Rom to Cubic Bezier conversion
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return path;
  };

  // Generate area path for each series (for area charts)
  const generateAreaPath = (series: number[]) => {
    if (series.length < 2) return '';

    const linePath = generatePath(series);
    const startX = padding.left;
    const endX = padding.left + chartWidth;
    const baseY = height - padding.bottom;

    return `${linePath} L ${endX},${baseY} L ${startX},${baseY} Z`;
  };

  return (
    <svg width={width} height={height}>
      <defs>
        {data.series.map((series, index) => {
          const color = series.color ? getColor(series.color) : 'black';
          return (
            <linearGradient
              key={`gradient-${index}`}
              id={`gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          );
        })}
      </defs>

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
          >
            {label}
          </text>
        );
      })}

      {/* Y-axis labels and grid lines */}
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

      {/* Lines and points */}
      {data.series.map((series, seriesIndex) => {
        if ((series as any).hidden) return null;

        const lineColor = series.color ? getColor(series.color) : 'black';

        return (
          <React.Fragment key={`series-${seriesIndex}`}>
            {/* Area fill with gradient */}
            <path
              d={generateAreaPath(series.data)}
              fill={`url(#gradient-${seriesIndex})`}
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
                (value / effectiveMaxValue) * chartHeight * animationProgress;

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

              const handleMouseMove = (e: React.MouseEvent) => {
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
                      {formattedDelta !== null && (
                        <View
                          marginTop="4px"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Text color="color-gray-500">Change</Text>
                          <Text fontWeight="medium">{formattedDelta}</Text>
                        </View>
                      )}
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
                const screenY = rect.top + rect.height / 2;

                showTooltip(screenX, screenY, tooltipContent);
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
                  onMouseEnter={handleMouseMove}
                  onMouseMove={handleMouseMove}
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
