import React from 'react';
import { Chart } from '../Chart';
import { View } from 'app-studio';

export const PieChartDemo = () => {
  const dataPoints = [
    { label: 'Mobile', value: 45, color: 'color.blue.500' },
    { label: 'Desktop', value: 30, color: 'color.green.500' },
    { label: 'Tablet', value: 15, color: 'color.purple.500' },
    { label: 'Other', value: 10, color: 'color.orange.500' },
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
