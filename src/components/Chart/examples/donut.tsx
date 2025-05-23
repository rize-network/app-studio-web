import React from 'react';
import { Chart } from '../Chart';
import { View } from 'app-studio';
import { CHART_COLORS } from '../Chart/ChartColors';

export const DonutChartDemo = () => {
  const dataPoints = [
    { label: 'Completed', value: 65, color: CHART_COLORS.green },
    { label: 'In Progress', value: 25, color: CHART_COLORS.blue },
    { label: 'Pending', value: 10, color: CHART_COLORS.orange },
  ];

  return (
    <View height="300px" width="100%">
      <Chart
        type="donut"
        dataPoints={dataPoints}
        title="Task Status"
        animated
      />
    </View>
  );
};
