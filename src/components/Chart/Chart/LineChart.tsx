import React, { useMemo } from 'react';
import { View } from '../../Layout/View/View';
import { Text } from '../../Text/Text';
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
  showTooltip: (x: number, y: number, content: string) => void;
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
    const ticks = [];

    for (let i = 0; i <= tickCount; i++) {
      const value = (maxValue / tickCount) * i;
      ticks.push(value);
    }

    return ticks;
  }, [maxValue]);

  // Generate path for each series
  const generatePath = (series: number[], seriesIndex: number) => {
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
  const generateAreaPath = (series: number[], seriesIndex: number) => {
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
      {data.series.map((series, seriesIndex) => (
        <React.Fragment key={`series-${seriesIndex}`}>
          {/* Area fill (if needed) */}
          <path
            d={generateAreaPath(series.data, seriesIndex)}
            fill={series.color}
            opacity={0.1}
            {...views?.area}
          />

          {/* Line */}
          <path
            d={generatePath(series.data, seriesIndex)}
            stroke={series.color}
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

            const handleMouseEnter = (e: React.MouseEvent) => {
              const tooltipContent = `${series.name}: ${value}`;
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
                fill={series.color}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={hideTooltip}
                onClick={handleClick}
                {...PointStyles}
                {...views?.point}
              />
            );
          })}
        </React.Fragment>
      ))}
    </svg>
  );
};
