import React, { useMemo } from 'react';
import { View, Vertical, Horizontal, Text, useTheme } from 'app-studio';
import { ChartData } from './Chart.type';

// React Native variant of BarChart.
// Renders simple proportional <View> bars using only app-studio primitives.
// No raw SVG/DOM (which crashes React Native).
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
  height,
  animationProgress,
  onBarClick,
  views,
}) => {
  const { getColor } = useTheme();

  // Fixed plotting height (number, not "px" string) for RN.
  const chartHeight =
    typeof height === 'number' && height > 0 ? Math.min(height - 60, 220) : 180;
  const plotHeight = Math.max(chartHeight, 80);

  const maxValue = useMemo(() => {
    let max = 0;
    data.series.forEach((series) => {
      if ((series as any).hidden) return;
      series.data.forEach((value) => {
        max = Math.max(max, value);
      });
    });
    return max;
  }, [data]);

  const effectiveMaxValue = maxValue || 10;
  const labels = data.labels || [];

  const resolveColor = (color?: string) =>
    color ? getColor(color) || color : 'gray';

  return (
    <Vertical width="100%" gap={8}>
      <Horizontal
        width="100%"
        height={plotHeight}
        alignItems="flex-end"
        justifyContent="space-around"
        gap={4}
      >
        {labels.map((label, dataIndex) => {
          const groupTotalBars = data.series.filter((s) => !(s as any).hidden);
          return (
            <Vertical
              key={`group-${dataIndex}`}
              flex={1}
              height="100%"
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
            >
              <Horizontal
                height="100%"
                alignItems="flex-end"
                justifyContent="center"
                gap={2}
              >
                {groupTotalBars.map((series, seriesIndex) => {
                  const value = series.data[dataIndex] || 0;
                  const barHeight =
                    (value / effectiveMaxValue) *
                    plotHeight *
                    (animationProgress || 1);
                  const fillColor = resolveColor(series.color);
                  return (
                    <View
                      key={`bar-${seriesIndex}-${dataIndex}`}
                      width={10}
                      height={Math.max(barHeight, 1)}
                      backgroundColor={fillColor}
                      borderRadius={3}
                      onPress={
                        onBarClick
                          ? () => onBarClick(series.name, dataIndex)
                          : undefined
                      }
                      {...views?.bar}
                    />
                  );
                })}
              </Horizontal>
              <Text fontSize={11} color="color-gray-500">
                {label}
              </Text>
            </Vertical>
          );
        })}
      </Horizontal>
    </Vertical>
  );
};
