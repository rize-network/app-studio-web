import React from 'react';
import { View } from 'app-studio';
import {
  BarChartDemo,
  LineChartDemo,
  AreaChartDemo,
  PieChartDemo,
  DonutChartDemo,
  CustomChartDemo,
  ChartStatesDemo,
  DesignSystemCharts,
} from 'src/components/Chart/examples';

const ChartPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Design System</td>
            <td>
              <DesignSystemCharts />
            </td>
          </tr>

          <tr>
            <td>Bar Chart</td>
            <td>
              <BarChartDemo />
            </td>
          </tr>

          <tr>
            <td>Line Chart</td>
            <td>
              <LineChartDemo />
            </td>
          </tr>

          <tr>
            <td>Area Chart</td>
            <td>
              <AreaChartDemo />
            </td>
          </tr>

          <tr>
            <td>Pie Chart</td>
            <td>
              <PieChartDemo />
            </td>
          </tr>

          <tr>
            <td>Donut Chart</td>
            <td>
              <DonutChartDemo />
            </td>
          </tr>

          <tr>
            <td>Custom Chart</td>
            <td>
              <CustomChartDemo />
            </td>
          </tr>

          <tr>
            <td>Chart States</td>
            <td>
              <ChartStatesDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ChartPage;
