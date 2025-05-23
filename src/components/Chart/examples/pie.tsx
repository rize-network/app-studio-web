import React from 'react';
import { Chart } from '../Chart';
import { View } from 'app-studio';
import { CHART_COLORS } from '../Chart/ChartColors';

export const PieChartDemo = () => {
  const dataPoints = [
    { label: 'Mobile', value: 45, color: CHART_COLORS.blue },
    { label: 'Desktop', value: 30, color: CHART_COLORS.green },
    { label: 'Tablet', value: 15, color: CHART_COLORS.purple },
    { label: 'Other', value: 10, color: CHART_COLORS.orange },
  ];

  return (
    <View height="300px" width="100%">
      <Chart
        type="pie"
        dataPoints={dataPoints}
        title="Device Distribution"
        animated
        onDataPointClick={(dataPoint, index) => {
          console.log(`Clicked on ${dataPoint?.label} at index ${index}`);
        }}
      />
    </View>
  );
};
