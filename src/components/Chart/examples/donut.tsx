import React from 'react';
import { Chart } from '../Chart';
import { View } from '../../Layout/View/View';

export const DonutChartDemo = () => {
  const dataPoints = [
    { label: 'Completed', value: 65, color: 'color.green.500' },
    { label: 'In Progress', value: 25, color: 'color.blue.500' },
    { label: 'Pending', value: 10, color: 'color.orange.500' },
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
