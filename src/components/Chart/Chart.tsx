import React from 'react';
import { ChartProps } from './Chart/Chart.props';
import { ChartView } from './Chart/Chart.view';

/**
 * Chart component for data visualization.
 * Supports bar, line, area, pie, and donut chart types.
 */
const ChartComponent: React.FC<ChartProps> = (props) => {
  return <ChartView {...props} />;
};

export const Chart = ChartComponent;
