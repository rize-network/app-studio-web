import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultDemo,
  AutoPlayDemo,
  IndicatorsDemo,
  NavigationDemo,
  CustomDemo
} from 'src/components/Carousel/examples';

const CarouselPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultDemo />
            </td>
          </tr>

          <tr>
            <td>Auto-Play</td>
            <td>
              <AutoPlayDemo />
            </td>
          </tr>

          <tr>
            <td>Indicators</td>
            <td>
              <IndicatorsDemo />
            </td>
          </tr>

          <tr>
            <td>Navigation</td>
            <td>
              <NavigationDemo />
            </td>
          </tr>

          <tr>
            <td>Custom</td>
            <td>
              <CustomDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CarouselPage;
