import React, { useMemo } from 'react';
import { View, useTheme } from 'app-studio';
import { Text } from '../../Text/Text';
import { HoverCard } from '../../HoverCard/HoverCard';
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
    <View position="relative" width={`${width}px`} height={`${height}px`}>
      <svg
        width={width}
        height={height}
        style={{ overflow: 'visible' }}
      >
        {/* Center circle for donut chart (rendered beneath slices so labels remain visible) */}
        {isDonut && (
          <circle
            cx={centerX}
            cy={centerY}
            r={donutRadius}
            fill="white"
            pointerEvents="none"
          />
        )}

        {/* Pie slices */}
        {slices.map((slice, index) => {
          return (
            <g key={`slice-${index}`}>
              <path
                d={slice.path}
                fill={slice.color}
                onClick={() => onSliceClick && onSliceClick(dataPoints[slice.index], slice.index)}
                {...PieSliceStyles}
                {...views?.pie}
                style={{ pointerEvents: 'none' }}
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
                  style={{
                    textShadow:
                      '0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                  }}
                >
                  {slice.percentage}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* HoverCard overlays for each slice */}
      {slices.map((slice, index) => {
        // Calculate the middle angle and a point on the slice for the trigger position
        const midAngle = (slice.startAngle + slice.endAngle) / 2;
        const triggerRadius = isDonut ? (radius + donutRadius) / 2 : radius * 0.65;
        const triggerX = centerX + Math.cos(midAngle) * triggerRadius;
        const triggerY = centerY + Math.sin(midAngle) * triggerRadius;
        const triggerSize = 40; // Size of the hover trigger area

        return (
          <HoverCard key={`hover-${index}`}>
            <HoverCard.Trigger asChild>
              <View
                position="absolute"
                left={`${triggerX - triggerSize / 2}px`}
                top={`${triggerY - triggerSize / 2}px`}
                width={`${triggerSize}px`}
                height={`${triggerSize}px`}
                style={{ cursor: 'pointer' }}
                onClick={() => onSliceClick && onSliceClick(dataPoints[slice.index], slice.index)}
              />
            </HoverCard.Trigger>
            <HoverCard.Content side="top" align="center">
              <View>
                <Text fontWeight="bold" marginBottom="4px">
                  {slice.label}
                </Text>
                <Text fontSize="14px">
                  Value: {slice.value}
                </Text>
                <Text fontSize="14px" color="gray">
                  {slice.percentage}
                </Text>
              </View>
            </HoverCard.Content>
          </HoverCard>
        );
      })}
    </View>
  );
};
