import React from 'react';
import { View } from 'src/components/Layout/View/View';
import {
  DefaultDemo,
  ItemsDemo,
  OnToggleChangeDemo,
  ShapeDemo,
  VariantDemo,
} from 'src/components/ToggleGroup/examples';

const ToggleGroupPage = () => {
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
            <td>Items</td>
            <td>
              <ItemsDemo />
            </td>
          </tr>

          <tr>
            <td>OnToggleChange</td>
            <td>
              <OnToggleChangeDemo />
            </td>
          </tr>

          <tr>
            <td>Shape</td>
            <td>
              <ShapeDemo />
            </td>
          </tr>

          <tr>
            <td>Variant</td>
            <td>
              <VariantDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ToggleGroupPage;
