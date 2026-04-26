import React from 'react';
import { ChartProps } from './Chart/Chart.props';
import { ChartView } from './Chart/Chart.view';
// This file defines the main Chart component, which serves as a simple wrapper that renders the ChartView component, passing all received props directly to it.
const ChartComponent: React.FC<ChartProps> = (props) => {
  return <ChartView {...props} />;
};
export const Chart = ChartComponent;
