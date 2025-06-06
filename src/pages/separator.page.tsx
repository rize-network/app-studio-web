import React from 'react';
import { View } from 'app-studio';
import {
  DefaultSeparator,
  DesignSystemSeparator,
  SeparatorVariants,
  SeparatorThicknesses,
  SeparatorOrientations,
  SeparatorColors,
  SeparatorWithLabel,
  SeparatorInCard,
  CustomizedSeparators,
} from 'src/components/Separator/examples';

const SeparatorPage = () => {
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
              <DesignSystemSeparator />
            </td>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultSeparator />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <SeparatorVariants />
            </td>
          </tr>

          <tr>
            <td>Thicknesses</td>
            <td>
              <SeparatorThicknesses />
            </td>
          </tr>

          <tr>
            <td>Orientations</td>
            <td>
              <SeparatorOrientations />
            </td>
          </tr>

          <tr>
            <td>Colors</td>
            <td>
              <SeparatorColors />
            </td>
          </tr>

          <tr>
            <td>With Label</td>
            <td>
              <SeparatorWithLabel />
            </td>
          </tr>

          <tr>
            <td>In Card</td>
            <td>
              <SeparatorInCard />
            </td>
          </tr>

          <tr>
            <td>Advanced Customization</td>
            <td>
              <CustomizedSeparators />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default SeparatorPage;
