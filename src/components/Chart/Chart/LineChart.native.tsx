import React, { useMemo } from 'react';
import { View, Vertical, Horizontal, Text, useTheme } from 'app-studio';
import { ChartData } from './Chart.type';

// React Native variant of LineChart.
// A faithful line is hard without SVG, so we render a simple bar-style
// fallback (one bar per data point, grouped by series) using only
// app-studio primitives. No raw SVG/DOM (which crashes React Native).
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
  height,
  animationProgress,
  onPointClick,
  views,
}) => {
  const { getColor } = useTheme();

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
    <Horizontal
      width="100%"
      height={plotHeight}
      alignItems="flex-end"
      justifyContent="space-around"
      gap={4}
    >
      {labels.map((label, dataIndex) => {
        const visibleSeries = data.series.filter((s) => !(s as any).hidden);
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
              {visibleSeries.map((series, seriesIndex) => {
                const value = series.data[dataIndex] || 0;
                const barHeight =
                  (value / effectiveMaxValue) *
                  plotHeight *
                  (animationProgress || 1);
                const fillColor = resolveColor(series.color);
                return (
                  <View
                    key={`point-${seriesIndex}-${dataIndex}`}
                    width={8}
                    height={Math.max(barHeight, 1)}
                    backgroundColor={fillColor}
                    borderRadius={3}
                    onPress={
                      onPointClick
                        ? () => onPointClick(series.name, dataIndex)
                        : undefined
                    }
                    {...views?.line}
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
  );
};
