import React from 'react';
import { Chart } from '../Chart';
import { View } from 'app-studio';
import { CHART_COLORS } from '../Chart/ChartColors';

export const LineChartDemo = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Users',
        data: [500, 800, 1200, 1800, 2500, 3000],
        color: CHART_COLORS.blue,
      },
      {
        name: 'Sessions',
        data: [1000, 1600, 2400, 3600, 5000, 6000],
        color: CHART_COLORS.green,
      },
      {
        name: 'Page Views',
        data: [1500, 2400, 3600, 5400, 7500, 9000],
        color: CHART_COLORS.purple,
      },
      {
        name: 'Conversions',
        data: [50, 80, 120, 180, 250, 300],
        color: CHART_COLORS.orange,
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
