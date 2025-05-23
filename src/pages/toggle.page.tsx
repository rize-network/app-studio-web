import React from 'react';
import { View } from 'app-studio';
import {
  DefaultDemo,
  IsDisabledDemo,
  IsToggledDemo,
  OnToggleDemo,
  ShapeDemo,
  VariantDemo,
} from 'src/components/Toggle/examples';

const TogglePage = () => {
  return (
    <View>
      <table>
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
            <td>IsDisabled</td>
            <td>
              <IsDisabledDemo />
            </td>
          </tr>

          <tr>
            <td>IsToggled</td>
            <td>
              <IsToggledDemo />
            </td>
          </tr>

          <tr>
            <td>OnToggle</td>
            <td>
              <OnToggleDemo />
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

export default TogglePage;
