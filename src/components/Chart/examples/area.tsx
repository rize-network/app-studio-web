import React from 'react';
import { Chart } from '../Chart';
import { View } from 'app-studio';
import { CHART_COLORS } from '../Chart/ChartColors';

export const AreaChartDemo = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      {
        name: 'This Week',
        data: [10, 15, 12, 20, 18, 25, 22],
        color: CHART_COLORS.blue,
      },
      {
        name: 'Last Week',
        data: [8, 12, 10, 15, 14, 20, 17],
        color: CHART_COLORS.green,
      },
      {
        name: 'Two Weeks Ago',
        data: [6, 10, 8, 12, 10, 16, 14],
        color: CHART_COLORS.purple,
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
