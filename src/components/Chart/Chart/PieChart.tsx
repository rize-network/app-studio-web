import React, { useMemo } from 'react';
import { useTheme } from 'app-studio';
import { ChartDataPoint } from './Chart.type';
import { PieSliceStyles, DEFAULT_COLORS } from './Chart.style';

interface PieChartProps {
  dataPoints: ChartDataPoint[];
  width: number;
  height: number;
  animationProgress: number;
  isDonut?: boolean;
  onSliceClick?: (dataPoint: ChartDataPoint, index: number) => void;
  showTooltip: (x: number, y: number, content: string) => void;
  hideTooltip: () => void;
  views?: any;
}

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
  // Get theme color function
  const { getColor } = useTheme();
  // Calculate chart dimensions
  const size = Math.min(width, height);
  const radius = (size / 2) * 0.8;
  const centerX = width / 2;
  const centerY = height / 2;
  const donutRadius = isDonut ? radius * 0.6 : 0;

  // Calculate total value
  const total = useMemo(() => {
    return dataPoints.reduce((sum, point) => sum + point.value, 0);
  }, [dataPoints]);

  // Generate pie slices
  const slices = useMemo(() => {
    const result: any[] = [];
    let startAngle = -Math.PI / 2; // Start from top (12 o'clock position)

    for (let i = 0; i < dataPoints.length; i++) {
      const value = dataPoints[i].value;
      const percentage = value / total;
      const angle = percentage * 2 * Math.PI * animationProgress;
      const endAngle = startAngle + angle;

      // Calculate path
      const startX = centerX + Math.cos(startAngle) * radius;
      const startY = centerY + Math.sin(startAngle) * radius;
      const endX = centerX + Math.cos(endAngle) * radius;
      const endY = centerY + Math.sin(endAngle) * radius;

      // For donut chart
      const innerStartX = centerX + Math.cos(startAngle) * donutRadius;
      const innerStartY = centerY + Math.sin(startAngle) * donutRadius;
      const innerEndX = centerX + Math.cos(endAngle) * donutRadius;
      const innerEndY = centerY + Math.sin(endAngle) * donutRadius;

      // Create arc flag
      const largeArcFlag = angle > Math.PI ? 1 : 0;

      // Create path
      let path;

      if (isDonut) {
        // Donut slice path
        path = [
          `M ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L ${innerEndX} ${innerEndY}`,
          `A ${donutRadius} ${donutRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
          'Z',
        ].join(' ');
      } else {
        // Regular pie slice path
        path = [
          `M ${centerX} ${centerY}`,
          `L ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          'Z',
        ].join(' ');
      }

      // Calculate label position
      const labelAngle = startAngle + angle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;

      // Calculate percentage
      const percentageText = `${(percentage * 100).toFixed(1)}%`;

      // Get color from dataPoint, DEFAULT_COLORS, or generate a random one
      const colorValue =
        dataPoints[i].color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      // Resolve the color through the theme system
      const resolvedColor = getColor(colorValue);

      result.push({
        path,
        color: resolvedColor,
        label: dataPoints[i].label,
        value: dataPoints[i].value,
        percentage: percentageText,
        labelX,
        labelY,
        startAngle,
        endAngle,
        index: i,
      });

      startAngle = endAngle;
    }

    return result;
  }, [
    dataPoints,
    total,
    radius,
    centerX,
    centerY,
    donutRadius,
    animationProgress,
    isDonut,
  ]);

  return (
    <svg width={width} height={height}>
      {/* Pie slices */}
      {slices.map((slice, index) => {
        const handleMouseEnter = (e: React.MouseEvent) => {
          const tooltipContent = `${slice.label}: ${slice.value} (${slice.percentage})`;
          showTooltip(e.clientX, e.clientY, tooltipContent);
        };

        const handleClick = () => {
          if (onSliceClick) {
            onSliceClick(dataPoints[slice.index], slice.index);
          }
        };

        return (
          <g key={`slice-${index}`}>
            <path
              d={slice.path}
              fill={slice.color}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={hideTooltip}
              onClick={handleClick}
              {...PieSliceStyles}
              {...views?.pie}
            />

            {/* Only show labels for slices that are big enough */}
            {slice.endAngle - slice.startAngle > 0.2 && (
              <text
                x={slice.labelX}
                y={slice.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontWeight="bold"
                pointerEvents="none"
              >
                {slice.percentage}
              </text>
            )}
          </g>
        );
      })}

      {/* Center circle for donut chart */}
      {isDonut && (
        <circle cx={centerX} cy={centerY} r={donutRadius} fill="white" />
      )}
    </svg>
  );
};
