import React from 'react';
import { Chart } from '../Chart';
import { View } from 'app-studio';

export const AreaChartDemo = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      {
        name: 'This Week',
        data: [10, 15, 12, 20, 18, 25, 22],
        color: 'color.blue.500',
      },
      {
        name: 'Last Week',
        data: [8, 12, 10, 15, 14, 20, 17],
        color: 'color.green.500',
      },
      {
        name: 'Two Weeks Ago',
        data: [6, 10, 8, 12, 10, 16, 14],
        color: 'color.purple.500',
      },
    ],
  };

  return (
    <View height="300px" width="100%">
      <Chart
        type="area"
        data={data}
        title="Weekly Performance"
        showGrid
        animated
      />
    </View>
  );
};
