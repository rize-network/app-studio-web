import React from 'react';
import { Chart } from '../Chart';
import { View } from '../../Layout/View/View';

export const BarChartDemo = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Revenue',
        data: [30, 40, 35, 50, 49, 60],
        color: 'color.blue.500',
      },
      {
        name: 'Expenses',
        data: [20, 25, 30, 35, 30, 40],
        color: 'color.red.500',
      },
    ],
  };

  return (
    <View height="300px" width="100%">
      <Chart
        type="bar"
        data={data}
        title="Monthly Revenue vs Expenses"
        showGrid
        animated
        onSeriesClick={(seriesName, index) => {
          console.log(`Clicked on ${seriesName} at index ${index}`);
        }}
      />
    </View>
  );
};
