import React from 'react';
import { Chart } from '../Chart';
import { View } from '../../Layout/View/View';

export const LineChartDemo = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Users',
        data: [500, 800, 1200, 1800, 2500, 3000],
        color: 'color.purple.500',
      },
      {
        name: 'Sessions',
        data: [1000, 1600, 2400, 3600, 5000, 6000],
        color: 'color.teal.500',
      },
    ],
  };

  return (
    <View height="300px" width="100%">
      <Chart
        type="line"
        data={data}
        title="Website Traffic"
        showGrid
        animated
        legendPosition="top"
      />
    </View>
  );
};
