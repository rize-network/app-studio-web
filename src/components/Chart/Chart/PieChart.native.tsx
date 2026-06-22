import React, { useMemo } from 'react';
import { View, Vertical, Horizontal, Text, useTheme } from 'app-studio';
import { ChartDataPoint } from './Chart.type';
import { DEFAULT_COLORS } from './Chart.style';

// React Native variant of PieChart / DonutChart.
// Pie geometry needs SVG, so on native we render a readable legend list:
// colored swatch + label + value + percentage per slice. Plus a total.
// Only app-studio primitives are used. No raw SVG/DOM.
interface PieChartProps {
  dataPoints: ChartDataPoint[];
  width: number;
  height: number;
  animationProgress: number;
  isDonut?: boolean;
  onSliceClick?: (dataPoint: ChartDataPoint, index: number) => void;
  showTooltip: (x: number, y: number, content: React.ReactNode) => void;
  hideTooltip: () => void;
  views?: any;
}

export const PieChart: React.FC<PieChartProps> = ({
  dataPoints,
  isDonut = false,
  onSliceClick,
  views,
}) => {
  const { getColor } = useTheme();

  const visibleDataPoints = useMemo(
    () => dataPoints.filter((p) => !(p as any).hidden),
    [dataPoints]
  );

  const total = useMemo(
    () => visibleDataPoints.reduce((sum, point) => sum + point.value, 0),
    [visibleDataPoints]
  );

  const resolveColor = (color?: string, index = 0) =>
    getColor(color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]) ||
    color ||
    'gray';

  return (
    <Vertical width="100%" gap={10} padding={8}>
      <Horizontal justifyContent="space-between" alignItems="center">
        <Text fontWeight="600" color="color-gray-500" fontSize={13}>
          {isDonut ? 'Total' : 'Distribution'}
        </Text>
        <Text fontWeight="800" color="color-gray-900" fontSize={16}>
          {total.toLocaleString()}
        </Text>
      </Horizontal>
      <Vertical gap={8}>
        {visibleDataPoints.map((point, index) => {
          const percentage =
            total > 0 ? ((point.value / total) * 100).toFixed(1) : '0.0';
          const color = resolveColor(point.color, index);
          return (
            <Horizontal
              key={`slice-${index}`}
              alignItems="center"
              justifyContent="space-between"
              gap={8}
              onPress={
                onSliceClick
                  ? () => onSliceClick(dataPoints[index], index)
                  : undefined
              }
              {...views?.pie}
            >
              <Horizontal alignItems="center" gap={8} flex={1}>
                <View
                  width={12}
                  height={12}
                  borderRadius={3}
                  backgroundColor={color}
                />
                <Text fontSize={13} color="color-gray-700">
                  {point.label}
                </Text>
              </Horizontal>
              <Horizontal alignItems="center" gap={8}>
                <Text fontSize={13} fontWeight="500" color="color-gray-900">
                  {point.value.toLocaleString()}
                </Text>
                <Text fontSize={12} color="color-gray-500">
                  {percentage}%
                </Text>
              </Horizontal>
            </Horizontal>
          );
        })}
      </Vertical>
    </Vertical>
  );
};
