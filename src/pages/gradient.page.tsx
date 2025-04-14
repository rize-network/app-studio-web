import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultDemo,
  TypesDemo,
  DirectionsDemo,
  MulticolorDemo,
  AnimatedDemo,
  WithContentDemo,
  DesignSystemGradients,
} from 'src/components/Gradient/examples';

const GradientPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Design System</td>
            <td>
              <DesignSystemGradients />
            </td>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultDemo />
            </td>
          </tr>

          <tr>
            <td>Types</td>
            <td>
              <TypesDemo />
            </td>
          </tr>

          <tr>
            <td>Directions</td>
            <td>
              <DirectionsDemo />
            </td>
          </tr>

          <tr>
            <td>Multi-color</td>
            <td>
              <MulticolorDemo />
            </td>
          </tr>

          <tr>
            <td>Animated</td>
            <td>
              <AnimatedDemo />
            </td>
          </tr>

          <tr>
            <td>With Content</td>
            <td>
              <WithContentDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default GradientPage;
