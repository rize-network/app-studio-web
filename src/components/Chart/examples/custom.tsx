import React from 'react';
import { Chart } from '../Chart';
import { View } from 'app-studio';
import { CHART_COLORS } from '../Chart/ChartColors';

export const CustomChartDemo = () => {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      {
        name: 'Sales',
        data: [120, 180, 150, 210],
        color: CHART_COLORS.blue,
      },
      {
        name: 'Costs',
        data: [80, 100, 90, 120],
        color: CHART_COLORS.green,
      },
    ],
  };

  return (
    <View height="400px" width="100%">
      <Chart
        type="bar"
        data={data}
        title="Quarterly Sales"
        animated
        views={{
          container: {
            backgroundColor: 'color.gray.50',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
          chart: {
            margin: '16px 0',
          },
          bar: {
            rx: '4px',
            ry: '4px',
            // Using series colors instead of a fixed color
          },
          grid: {
            stroke: 'color.gray.300',
            strokeDasharray: '4',
          },
          axis: {
            stroke: 'color.gray.400',
            strokeWidth: '2px',
          },
          axisLabel: {
            fill: 'color.gray.700',
            fontWeight: 'bold',
          },
          legend: {
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '4px',
          },
          legendItem: {
            padding: '4px 8px',
          },
          tooltip: {
            backgroundColor: 'color.primary',
            color: 'white',
            fontWeight: 'bold',
          },
        }}
      />
    </View>
  );
};
