import React, { useState, useEffect } from 'react';
import { Chart } from '../Chart';
import { View } from 'app-studio';
import { Horizontal } from 'app-studio';
import { Vertical } from 'app-studio';
import { Text } from 'app-studio';
import { Button } from '../../Button/Button';
import { CHART_COLORS } from '../Chart/ChartColors';

export const ChartStatesDemo = () => {
  // State for loading example
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const [showNoData, setShowNoData] = useState(false);

  // Sample data
  const sampleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Revenue',
        data: [30, 40, 35, 50, 49, 60],
        color: CHART_COLORS.blue,
      },
      {
        name: 'Expenses',
        data: [20, 25, 30, 35, 30, 40],
        color: CHART_COLORS.green,
      },
    ],
  };

  // Empty data for no-data state
  const emptyData = {
    labels: [],
    series: [],
  };

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setData(sampleData);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Toggle error state
  const toggleError = () => {
    setHasError(!hasError);
    setShowNoData(false);
    // Make sure data is available when not in error state
    if (hasError) {
      setData(sampleData);
    }
  };

  // Toggle no data state
  const toggleNoData = () => {
    setShowNoData(!showNoData);
    setHasError(false);
    // Make sure data is available when not in no-data state
    if (showNoData) {
      setData(sampleData);
    } else {
      setData(emptyData);
    }
  };

  // Reset to normal state
  const resetChart = () => {
    setHasError(false);
    setShowNoData(false);
    setData(sampleData);
  };

  return (
    <Vertical gap={20}>
      <Horizontal gap={20} alignItems="flex-start">
        {/* Loading State */}
        <View width="300px" height="300px">
          <Chart
            type="bar"
            data={sampleData}
            title="Loading Example"
            isLoading={true}
            aria-label="Loading chart example"
          />
        </View>

        {/* Error State */}
        <View width="300px" height="300px">
          <Chart
            type="line"
            data={sampleData}
            title="Error Example"
            error="Failed to load chart data"
            aria-label="Error chart example"
          />
        </View>

        {/* No Data State */}
        <View width="300px" height="300px">
          <Chart
            type="bar"
            data={emptyData}
            title="No Data Example"
            noData="No data available for this time period"
            aria-label="No data chart example"
          />
        </View>
      </Horizontal>

      {/* Interactive Example */}
      <View
        padding={16}
        borderWidth={1}
        borderColor="color-gray-200"
        borderRadius={8}
      >
        <Vertical gap={16}>
          <Text fontWeight="bold">Interactive State Example</Text>

          <Horizontal gap={10}>
            <Button
              onClick={toggleError}
              variant={hasError ? 'filled' : 'outline'}
            >
              {hasError ? 'Hide Error' : 'Show Error'}
            </Button>
            <Button
              onClick={toggleNoData}
              variant={showNoData ? 'filled' : 'outline'}
            >
              {showNoData ? 'Hide No Data' : 'Show No Data'}
            </Button>
            <Button onClick={resetChart} variant="outline">
              Reset
            </Button>
          </Horizontal>

          <View height="300px">
            <Chart
              type="bar"
              data={data}
              title="Interactive State Demo"
              isLoading={isLoading}
              error={
                hasError ? 'An error occurred while fetching data' : undefined
              }
              noData={
                showNoData
                  ? 'No data available for the selected period'
                  : undefined
              }
              showGrid
              animated
            />
          </View>
        </Vertical>
      </View>

      {/* Custom Indicators Example */}
      <View width="300px" height="300px">
        <Chart
          type="pie"
          dataPoints={[
            { label: 'A', value: 30, color: CHART_COLORS.blue },
            { label: 'B', value: 40, color: CHART_COLORS.green },
            { label: 'C', value: 30, color: CHART_COLORS.purple },
          ]}
          title="Custom Loading Indicator"
          isLoading={true}
          loadingIndicator={
            <Vertical alignItems="center" gap={10}>
              <Text color="color-blue">Custom Loading...</Text>
              <Text color="color-gray-500">
                Please wait while we prepare your data
              </Text>
            </Vertical>
          }
        />
      </View>
    </Vertical>
  );
};
