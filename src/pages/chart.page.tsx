import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  BarChartDemo,
  LineChartDemo,
  AreaChartDemo,
  PieChartDemo,
  DonutChartDemo,
  CustomChartDemo,
} from 'src/components/Chart/examples';

const ChartPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
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
        </tbody>
      </table>
    </View>
  );
};

export default ChartPage;
