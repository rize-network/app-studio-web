import React from 'react';
import { Chart } from '../Chart';
import { CHART_COLORS } from '../Chart/ChartColors';
import { View } from 'app-studio';

export const ZeroStateDemo = () => {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Revenue',
        data: [0, 0, 0, 0, 0, 0],
        color: CHART_COLORS.blue,
      },
    ],
  };

  const pieDataPoints = [
    { label: 'Mobile', value: 0, color: CHART_COLORS.blue },
    { label: 'Desktop', value: 0, color: CHART_COLORS.green },
    { label: 'Tablet', value: 0, color: CHART_COLORS.purple },
  ];

  const progressData = [
    { label: 'Progress', value: 0, color: CHART_COLORS.blue },
  ];

  const commonStyles = {
    container: {
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'white',
    },
  };

  return (
    <View display="flex" flexDirection="column" gap="16px">
      <View height="300px" width="100%">
        <Chart
          type="bar"
          data={barData}
          title="Zero Revenue (Bar)"
          showGrid
          animated
          views={commonStyles}
        />
      </View>
      <View height="300px" width="100%">
        <Chart
          type="pie"
          dataPoints={pieDataPoints}
          title="Zero Traffic (Pie)"
          animated
          views={commonStyles}
        />
      </View>
      <View height="300px" width="100%">
        <Chart
          type="donut"
          dataPoints={progressData}
          title="Zero Progress (Donut)"
          animated
          views={commonStyles}
        />
      </View>
    </View>
  );
};
