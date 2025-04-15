/**
 * Chart Examples - Design System
 *
 * Showcases the Chart component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React from 'react';
import { Chart } from '../Chart';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Text } from '../../Text/Text';
import { View } from 'app-studio';
import { CHART_COLORS } from '../Chart/ChartColors';

export const DesignSystemCharts = () => {
  // Use the consistent color palette from ChartColors
  const colors = CHART_COLORS;

  // Sample data for bar and line charts
  const timeSeriesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35, 50, 49, 60],
        color: colors.blue,
      },
      {
        name: 'Series 2',
        data: [20, 25, 30, 35, 30, 40],
        color: colors.green,
      },
      {
        name: 'Series 3',
        data: [10, 15, 20, 25, 20, 30],
        color: colors.purple,
      },
    ],
  };

  // Sample data for pie and donut charts
  const pieData = [
    { label: 'Category A', value: 40, color: colors.blue },
    { label: 'Category B', value: 30, color: colors.green },
    { label: 'Category C', value: 20, color: colors.purple },
    { label: 'Category D', value: 10, color: colors.orange },
  ];

  return (
    <Vertical gap={32}>
      {/* Chart Types */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Chart Types with Consistent Colors
        </Text>
        <Vertical gap={24}>
          {/* Bar Chart */}
          <Vertical gap={8}>
            <Text
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Bar Chart
            </Text>
            <View height="250px" width="100%">
              <Chart
                type="bar"
                data={timeSeriesData}
                title="Bar Chart Example"
                showGrid
                animated
                views={{
                  container: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    borderRadius: '8px', // 2 × 4px grid
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid',
                    borderColor: 'color.gray.200',
                    padding: '16px', // 4 × 4px grid
                  },
                  bar: {
                    rx: '4px', // 1 × 4px grid
                    ry: '4px', // 1 × 4px grid
                  },
                  axisLabel: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                  },
                  legend: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  },
                }}
              />
            </View>
          </Vertical>

          {/* Line Chart */}
          <Vertical gap={8}>
            <Text
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Line Chart
            </Text>
            <View height="250px" width="100%">
              <Chart
                type="line"
                data={timeSeriesData}
                title="Line Chart Example"
                showGrid
                animated
                views={{
                  container: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    borderRadius: '8px', // 2 × 4px grid
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid',
                    borderColor: 'color.gray.200',
                    padding: '16px', // 4 × 4px grid
                  },
                  axisLabel: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                  },
                  legend: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  },
                }}
              />
            </View>
          </Vertical>

          {/* Area Chart */}
          <Vertical gap={8}>
            <Text
              fontSize="14px"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            >
              Area Chart
            </Text>
            <View height="250px" width="100%">
              <Chart
                type="area"
                data={timeSeriesData}
                title="Area Chart Example"
                showGrid
                animated
                views={{
                  container: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    borderRadius: '8px', // 2 × 4px grid
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid',
                    borderColor: 'color.gray.200',
                    padding: '16px', // 4 × 4px grid
                  },
                  axisLabel: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                  },
                  legend: {
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  },
                }}
              />
            </View>
          </Vertical>

          {/* Pie and Donut Charts */}
          <Horizontal gap={16} flexWrap="wrap">
            <Vertical gap={8} flex={1} minWidth="300px">
              <Text
                fontSize="14px"
                fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
              >
                Pie Chart
              </Text>
              <View height="250px" width="100%">
                <Chart
                  type="pie"
                  dataPoints={pieData}
                  title="Pie Chart Example"
                  animated
                  views={{
                    container: {
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      borderRadius: '8px', // 2 × 4px grid
                      overflow: 'hidden',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      border: '1px solid',
                      borderColor: 'color.gray.200',
                      padding: '16px', // 4 × 4px grid
                    },
                    legend: {
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    },
                  }}
                />
              </View>
            </Vertical>

            <Vertical gap={8} flex={1} minWidth="300px">
              <Text
                fontSize="14px"
                fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
              >
                Donut Chart
              </Text>
              <View height="250px" width="100%">
                <Chart
                  type="donut"
                  dataPoints={pieData}
                  title="Donut Chart Example"
                  animated
                  views={{
                    container: {
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      borderRadius: '8px', // 2 × 4px grid
                      overflow: 'hidden',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      border: '1px solid',
                      borderColor: 'color.gray.200',
                      padding: '16px', // 4 × 4px grid
                    },
                    legend: {
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    },
                  }}
                />
              </View>
            </Vertical>
          </Horizontal>
        </Vertical>
      </View>

      {/* Color Consistency Showcase */}
      <View>
        <Text
          marginBottom={8}
          fontWeight="600"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Color Consistency Across Chart Types
        </Text>
        <Horizontal gap={16} flexWrap="wrap">
          {Object.entries(colors).map(([name, color]) => (
            <View
              key={name}
              backgroundColor={color}
              width="80px"
              height="80px"
              borderRadius="8px" // 2 × 4px grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            >
              <Text
                color="white"
                fontWeight="600"
                fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
              >
                {name}
              </Text>
            </View>
          ))}
        </Horizontal>
      </View>
    </Vertical>
  );
};
