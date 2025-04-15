import React from 'react';
import { View } from 'app-studio';
import {
  DefaultDemo,
  AutoPlayDemo,
  IndicatorsDemo,
  NavigationDemo,
  CustomDemo,
  CompoundDemo,
  CustomCompoundDemo,
  StepIndicesDemo,
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

          <tr>
            <td>Compound Pattern</td>
            <td>
              <CompoundDemo />
            </td>
          </tr>

          <tr>
            <td>Custom Compound</td>
            <td>
              <CustomCompoundDemo />
            </td>
          </tr>

          <tr>
            <td>Step Navigation</td>
            <td>
              <StepIndicesDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CarouselPage;
