import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultSeparator,
  SeparatorVariants,
  SeparatorThicknesses,
  SeparatorOrientations,
  SeparatorColors,
  SeparatorWithLabel,
  SeparatorInCard,
} from 'src/components/Separator/examples';

const SeparatorPage = () => {
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
        </tbody>
      </table>
    </View>
  );
};

export default SeparatorPage;
